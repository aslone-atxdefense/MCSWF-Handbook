"""Build orchestration: read the fragment, render the page, place the assets."""

from . import config
from .assets import copy_assets, write_robots
from .template import render_document, split_fragment


def build():
    """Build the site into dist/. Returns the list of files written."""
    source = config.SOURCE.read_text(encoding="utf-8")
    head, body = split_fragment(source)

    document = render_document(
        head,
        body,
        description=config.DESCRIPTION,
        lang=config.LANG,
        robots_meta=config.ROBOTS_META,
        icon=config.ICON,
    )

    config.DIST.mkdir(exist_ok=True)
    index = config.DIST / "index.html"
    index.write_text(document, encoding="utf-8")

    written = [index]
    written += copy_assets(config.ASSETS, config.DIST)
    written.append(write_robots(config.DIST, config.ROBOTS_TXT))
    return written
