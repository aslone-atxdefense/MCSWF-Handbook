"""Poll the source tree and report which files changed.

Polling rather than a native watcher keeps this to the standard library and
behaves the same on every platform; the tree is small enough that a scan every
quarter second costs nothing.
"""

import threading

from . import config


def _walk(path):
    """Yield every watchable file under path (or path itself, if it is a file)."""
    if path.is_file():
        if path.suffix in config.WATCH_SUFFIXES:
            yield path
        return
    if not path.is_dir():
        return
    for child in path.iterdir():
        if child.is_dir():
            if child.name in config.WATCH_IGNORE_DIRS:
                continue
            yield from _walk(child)
        elif child.suffix in config.WATCH_SUFFIXES:
            yield child


def snapshot():
    """Map every watched file to its modification time and size."""
    state = {}
    for root in config.WATCH_PATHS:
        for path in _walk(root):
            try:
                stat = path.stat()
            except OSError:
                continue
            state[path] = (stat.st_mtime_ns, stat.st_size)
    return state


def changed_paths(before, after):
    """Paths that were added, removed, or edited between two snapshots."""
    return {p for p in before.keys() | after.keys() if before.get(p) != after.get(p)}


def watch(on_change, stop_event):
    """Call on_change(paths) whenever the tree settles after an edit.

    Blocks until stop_event is set. Changes arriving within DEBOUNCE of each
    other are pooled into a single call, so saving several files at once is one
    rebuild rather than one per file.
    """
    state = snapshot()
    while not stop_event.wait(config.POLL_INTERVAL):
        current = snapshot()
        changes = changed_paths(state, current)
        if not changes:
            continue

        # Let the burst finish before reporting it.
        while True:
            state = current
            if stop_event.wait(config.DEBOUNCE):
                return
            current = snapshot()
            more = changed_paths(state, current)
            if not more:
                break
            changes |= more

        state = current
        on_change(changes)


def spawn(on_change):
    """Start watching on a daemon thread. Returns (thread, stop_event)."""
    stop_event = threading.Event()
    thread = threading.Thread(
        target=watch, args=(on_change, stop_event), name="watcher", daemon=True
    )
    thread.start()
    return thread, stop_event
