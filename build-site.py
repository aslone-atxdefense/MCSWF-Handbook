#!/usr/bin/env python3
"""Build the standalone site into dist/.

Thin entry point; the build itself lives in the sitegen package. Edit the
pieces in src/, then re-run this to refresh dist/.
"""

import sys

from sitegen import FragmentError, build


def main():
    try:
        written = build()
    except (FragmentError, FileNotFoundError) as err:
        sys.exit(f"build failed: {err}")

    for path in written:
        print(f"{path.relative_to(path.parent.parent)}  {path.stat().st_size:,} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
