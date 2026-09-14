#!/usr/bin/env python3
"""Wrap the Artifact-format handbook fragment into a standalone site in dist/.

mcswf-site.html is authored for the Artifact runtime, which supplies the
<!doctype>/<head>/<body> skeleton and a small reset at publish time. Serving it
over plain HTTP needs those supplied here instead. Edit mcswf-site.html, then
re-run this to refresh dist/.
"""
import pathlib, shutil, sys

ROOT = pathlib.Path(__file__).parent
SRC  = ROOT / "mcswf-site.html"
DIST = ROOT / "dist"

src = SRC.read_text(encoding="utf-8")
if "</style>" not in src:
    sys.exit("expected a </style> in the source fragment")
head, body = src.split("</style>", 1)
head += "</style>"

DESC = ("Member Standards Handbook for the U.S. Marine Corps Software Factory - "
        "standards, training tracks, and check-in for new members.")

RESET = """
<style>
  /* Supplied by the Artifact runtime when published there; needed when self-hosted. */
  :root{color-scheme:light dark}
  html,body{margin:0;padding:0}
  img{max-width:100%}
  [hidden]{display:none!important}
</style>"""

doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{DESC}">
<meta name="robots" content="noindex, nofollow">
<meta name="referrer" content="no-referrer">
<link rel="icon" href="seal.png" type="image/png">
<link rel="apple-touch-icon" href="seal.png">
{head}{RESET}
</head>
<body>
{body}
</body>
</html>
"""

DIST.mkdir(exist_ok=True)
(DIST / "index.html").write_text(doc, encoding="utf-8")
shutil.copy2(ROOT / "seal.png", DIST / "seal.png")
(DIST / "robots.txt").write_text("User-agent: *\nDisallow: /\n", encoding="utf-8")

print(f"dist/index.html  {len(doc):,} bytes")
print(f"dist/seal.png    {(DIST / 'seal.png').stat().st_size:,} bytes")
print("dist/robots.txt")
