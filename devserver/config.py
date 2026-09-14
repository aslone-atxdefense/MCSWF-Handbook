"""Paths and settings for the live-reload dev server. No logic."""

from pathlib import Path

# devserver/ lives at the repo root, so the project root is one level up.
ROOT = Path(__file__).resolve().parent.parent

# The build entry point the server shells out to on every change.
BUILD_SCRIPT = ROOT / "build-site.py"

# What the server hands to the browser.
SERVE_DIR = ROOT / "dist"
INDEX = "index.html"

HOST = "127.0.0.1"
PORT = 5173

# --- Watching ---------------------------------------------------------------
# Files and folders whose changes trigger a rebuild. Directories are walked.
WATCH_PATHS = [
    ROOT / "src",
    ROOT / "sitegen",
    ROOT / "seal.png",
    BUILD_SCRIPT,
]

# Only these extensions count as a change; everything else is ignored.
WATCH_SUFFIXES = {".html", ".css", ".js", ".py", ".png", ".svg", ".md"}

# Directory names never walked while watching.
WATCH_IGNORE_DIRS = {"__pycache__", ".git", "dist", "node_modules"}

# Seconds between filesystem scans, and how long changes are pooled before
# a rebuild so a multi-file save produces one build, not five.
POLL_INTERVAL = 0.25
DEBOUNCE = 0.15

# --- Hot swapping -----------------------------------------------------------
# A change to this file alone is swapped into the live page without a reload.
# Anything else triggers a full reload.
CSS_SOURCE = ROOT / "src" / "styles.css"

# id added to the page's inlined <style> so the client can replace its text.
STYLE_ID = "hmr-style"

# Server-owned URLs, injected into the served page.
EVENTS_URL = "/__hmr"
CSS_URL = "/__hmr/styles.css"
CLIENT_URL = "/__hmr/client.js"

# Seconds between SSE keep-alive comments.
HEARTBEAT = 15.0
