"""Live-reload dev server for the MCSWF handbook.

    python3 dev-server.py        # or: npm run dev

Serves dist/ on localhost, rebuilds on every edit under src/ and sitegen/, and
pushes the result to the open page: a stylesheet edit is swapped in place, and
anything else reloads. Standard library only, no dependencies.

Modules:
    config    paths, port, watch settings
    builder   runs build-site.py and reports success or failure
    watcher   polls the source tree for changes
    hub       connected pages and the events sent to them
    client    the injected browser script and its insertion
    server    HTTP: dist/ plus the dev-only URLs
    runner    orchestration
"""

from .runner import serve

__all__ = ["serve"]
