"""Paths and site-wide constants. Edit here rather than in the build logic."""

from pathlib import Path

# sitegen/ lives at the repo root, so the project root is one level up.
ROOT = Path(__file__).resolve().parent.parent

DIST = ROOT / "dist"

# --- Editable source pieces (see src/README.md) ----------------------------
SRC = ROOT / "src"
FRAME = SRC / "layout" / "frame.html"
SECTIONS_DIR = SRC / "sections"

# Slot token {{NAME}} in frame.html -> the file whose contents replace it.
# SECTIONS is handled separately: every file in SECTIONS_DIR, in filename order.
SLOT_FILES = {
    "STYLES": SRC / "styles.css",
    "SCRIPTS": SRC / "scripts.js",
    "TOPBAR": SRC / "layout" / "topbar.html",
    "SIDEBAR": SRC / "layout" / "sidebar.html",
    "HERO": SRC / "layout" / "hero.html",
    "FOOTER": SRC / "layout" / "footer.html",
}

# Copied verbatim into dist/ alongside the rendered page.
ASSETS = [ROOT / "seal.png"]

LANG = "en"

DESCRIPTION = (
    "Member Standards Handbook for the U.S. Marine Corps Software Factory - "
    "standards, training tracks, and check-in for new members."
)

# The site is reachable by URL but deliberately kept out of search engines.
# Set ROBOTS_META to "index, follow" and ROBOTS_TXT to "User-agent: *\nAllow: /\n"
# if the site should become discoverable.
ROBOTS_META = "noindex, nofollow"
ROBOTS_TXT = "User-agent: *\nDisallow: /\n"

ICON = "seal.png"
