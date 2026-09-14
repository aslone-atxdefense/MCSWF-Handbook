"""Paths and site-wide constants. Edit here rather than in the build logic."""

from pathlib import Path

# sitegen/ lives at the repo root, so the project root is one level up.
ROOT = Path(__file__).resolve().parent.parent

SOURCE = ROOT / "mcswf-site.html"
DIST = ROOT / "dist"

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
