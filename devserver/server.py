"""The HTTP side: serve dist/, plus the three dev-only URLs the client uses."""

import mimetypes
import posixpath
import queue
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

from . import client, config


class DevHandler(BaseHTTPRequestHandler):
    """Serves the built site with no caching, and the dev-only endpoints."""

    protocol_version = "HTTP/1.1"
    server_version = "mcswf-dev"

    # --- routing ------------------------------------------------------------
    def do_GET(self):
        path = urlparse(self.path).path
        if path == config.EVENTS_URL:
            return self._serve_events()
        if path == config.CSS_URL:
            return self._serve_text(config.CSS_SOURCE.read_text(encoding="utf-8"), "text/css")
        if path == config.CLIENT_URL:
            return self._serve_text(client.client_script(), "text/javascript")
        return self._serve_file(path)

    def do_HEAD(self):
        self.do_GET()

    # --- the live event stream ----------------------------------------------
    def _serve_events(self):
        if self.command == "HEAD":
            return self._send(b"", "text/event-stream")  # never hold a HEAD open
        events = self.server.hub.subscribe()
        try:
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Connection", "keep-alive")
            self.end_headers()
            self.wfile.write(b": connected\n\n")
            self.wfile.flush()
            while True:
                try:
                    message = events.get(timeout=config.HEARTBEAT)
                except queue.Empty:
                    message = b": ping\n\n"  # keeps an idle connection open
                self.wfile.write(message)
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError, OSError):
            pass  # the page navigated away or was closed
        finally:
            self.server.hub.unsubscribe(events)
            self.close_connection = True

    # --- static files -------------------------------------------------------
    def _serve_file(self, url_path):
        target = self._resolve(url_path)
        if target is None:
            return self.send_error(404, "Not Found")

        try:
            body = target.read_bytes()
        except OSError:
            return self.send_error(404, "Not Found")

        if target.name == config.INDEX:
            body = client.inject(body.decode("utf-8")).encode("utf-8")

        content_type = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        if content_type.startswith("text/") or content_type in ("application/javascript",):
            content_type += "; charset=utf-8"
        self._send(body, content_type)

    def _resolve(self, url_path):
        """Map a URL to a file inside dist/, or None if it escapes or is missing."""
        clean = posixpath.normpath(unquote(url_path))
        parts = [p for p in clean.split("/") if p not in ("", ".", "..")]
        target = config.SERVE_DIR.joinpath(*parts)
        if target.is_dir():
            target = target / config.INDEX
        try:
            target.relative_to(config.SERVE_DIR)
        except ValueError:
            return None
        return target if target.is_file() else None

    # --- replies ------------------------------------------------------------
    def _serve_text(self, text, content_type):
        self._send(text.encode("utf-8"), f"{content_type}; charset=utf-8")

    def _send(self, body, content_type):
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        # Dev only: the page must never come from cache, or edits look lost.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.end_headers()
        if self.command != "HEAD":
            try:
                self.wfile.write(body)
            except (BrokenPipeError, ConnectionResetError):
                self.close_connection = True

    def log_message(self, fmt, *args):
        pass  # the runner prints what matters; request noise is not it

    def log_error(self, fmt, *args):
        pass


class DevServer(ThreadingHTTPServer):
    """Threaded so a held-open event stream never blocks a page load."""

    daemon_threads = True
    allow_reuse_address = True

    def __init__(self, address, hub):
        super().__init__(address, DevHandler)
        self.hub = hub


def create(host, port, hub):
    """Bind the dev server. Raises OSError if the port is taken."""
    return DevServer((host, port), hub)
