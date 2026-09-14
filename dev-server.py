#!/usr/bin/env python3
"""Run the live-reload dev server.

Thin entry point; the server itself lives in the devserver package.

    python3 dev-server.py                 # http://127.0.0.1:5173
    python3 dev-server.py --port 8080
    python3 dev-server.py --no-open       # don't launch a browser
"""

import argparse

from devserver import serve


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--host", default=None, help="interface to bind (default 127.0.0.1)")
    parser.add_argument("--port", type=int, default=None, help="port to serve on (default 5173)")
    parser.add_argument(
        "--no-open", action="store_true", help="do not open a browser on start"
    )
    return parser.parse_args()


def main():
    args = parse_args()
    return serve(host=args.host, port=args.port, open_browser=not args.no_open)


if __name__ == "__main__":
    raise SystemExit(main())
