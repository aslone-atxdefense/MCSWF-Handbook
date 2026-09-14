"""Run the site build in a subprocess and report what happened.

A subprocess rather than an in-process call so that edits to sitegen/ itself
take effect without restarting the server; it also keeps a crashing build from
taking the server down with it.
"""

import subprocess
import sys
import time
from collections import namedtuple

from . import config

BuildResult = namedtuple("BuildResult", "ok output seconds")


def run_build():
    """Rebuild dist/. Returns a BuildResult; never raises on build failure."""
    started = time.monotonic()
    try:
        proc = subprocess.run(
            [sys.executable, str(config.BUILD_SCRIPT)],
            cwd=str(config.ROOT),
            capture_output=True,
            text=True,
            timeout=60,
        )
    except subprocess.TimeoutExpired:
        return BuildResult(False, "build timed out after 60s", time.monotonic() - started)
    except OSError as err:
        return BuildResult(False, f"could not start the build: {err}", time.monotonic() - started)

    seconds = time.monotonic() - started
    if proc.returncode == 0:
        return BuildResult(True, proc.stdout.strip(), seconds)

    message = (proc.stderr.strip() or proc.stdout.strip()) or f"build exited {proc.returncode}"
    return BuildResult(False, message, seconds)
