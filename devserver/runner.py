"""Orchestration: build, watch, serve, and decide what each change means.

Owns no details — the pieces live in builder, watcher, hub and server.
"""

import threading
import webbrowser

from . import builder, config, server as http, watcher
from .hub import Hub


def _log(message):
    """Print unbuffered, so the log is live even when piped (npm run dev)."""
    print(message, flush=True)


def _describe(paths):
    """A short 'src/styles.css, src/sections/01-dayone.html' for the log line."""
    names = sorted(str(p.relative_to(config.ROOT)) for p in paths)
    if len(names) > 3:
        return f"{', '.join(names[:3])} +{len(names) - 3} more"
    return ", ".join(names)


def _css_only(paths):
    """True when the only thing that changed is the stylesheet."""
    return paths == {config.CSS_SOURCE}


def _rebuild(hub, paths, log):
    """Rebuild, then tell every open page how to catch up."""
    log(f"changed: {_describe(paths)}")
    result = builder.run_build()

    if not result.ok:
        hub.build_failed(result.output)
        log(f"build failed\n{result.output}")
        return

    hub.build_succeeded()
    hub.send("build-ok")
    if _css_only(paths):
        hub.send("css")
        log(f"css swapped in {result.seconds * 1000:.0f}ms")
    else:
        hub.send("reload")
        log(f"rebuilt in {result.seconds * 1000:.0f}ms")


def serve(host=None, port=None, open_browser=True, log=_log):
    """Run the dev server until interrupted. Returns an exit code."""
    host = host or config.HOST
    port = config.PORT if port is None else port

    first = builder.run_build()
    if not first.ok:
        log(f"initial build failed\n{first.output}")
        log("starting anyway — fix the source and the page will recover")

    hub = Hub()
    try:
        server = http.create(host, port, hub)
    except OSError as err:
        log(f"cannot serve on {host}:{port} — {err}")
        return 1

    if not first.ok:
        hub.build_failed(first.output)

    watcher_thread, stop = _start_watcher(hub, log)
    url = f"http://{host}:{port}/"
    log(f"serving {config.SERVE_DIR.relative_to(config.ROOT)}/ at {url}")
    log("watching src/ and sitegen/ — edit a file and the page follows along")
    log("ctrl-c to stop")

    if open_browser:
        threading.Timer(0.4, webbrowser.open, args=(url,)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        log("\nstopping")
    finally:
        stop.set()
        server.shutdown()
        server.server_close()
        watcher_thread.join(timeout=1)
    return 0


def _start_watcher(hub, log):
    def on_change(paths):
        try:
            _rebuild(hub, paths, log)
        except Exception as err:  # a watcher crash must not end the session
            log(f"rebuild error: {err}")

    return watcher.spawn(on_change)
