"""The set of connected browsers, and the events pushed to them.

Each open page holds one server-sent-events connection; the hub hands every
connection a queue and fans messages out to all of them.
"""

import json
import queue
import threading


class Hub:
    """Fan-out of dev-server events to every connected page."""

    def __init__(self):
        self._clients = []
        self._lock = threading.Lock()
        self._last_error = None

    # --- connections --------------------------------------------------------
    def subscribe(self):
        """Register a page. Returns the queue its events arrive on."""
        client = queue.SimpleQueue()
        with self._lock:
            self._clients.append(client)
            error = self._last_error
        # A page that connects while the build is broken sees the error at once.
        if error is not None:
            client.put(error)
        return client

    def unsubscribe(self, client):
        with self._lock:
            if client in self._clients:
                self._clients.remove(client)

    @property
    def count(self):
        with self._lock:
            return len(self._clients)

    # --- events -------------------------------------------------------------
    def send(self, event, data=None):
        """Push one event to every connected page."""
        message = _frame(event, data or {})
        with self._lock:
            clients = list(self._clients)
        for client in clients:
            client.put(message)

    def build_failed(self, message):
        """Remember the failure so late-connecting pages also see the overlay."""
        payload = _frame("build-error", {"message": message})
        with self._lock:
            self._last_error = payload
            clients = list(self._clients)
        for client in clients:
            client.put(payload)

    def build_succeeded(self):
        with self._lock:
            self._last_error = None


def _frame(event, data):
    """Encode one server-sent event."""
    return f"event: {event}\ndata: {json.dumps(data)}\n\n".encode("utf-8")
