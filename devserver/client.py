"""The browser half of the dev server: the client script and its injection.

The served page is the real built page with two additions — an id on its
inlined <style> so CSS can be swapped in place, and a script tag that opens
the event stream. Neither reaches dist/ through a normal build.
"""

from . import config

CLIENT_JS = config.ROOT / "devserver" / "client.js"

_BOOTSTRAP = """<script>window.__HMR__={{eventsUrl:"{events}",cssUrl:"{css}",styleId:"{style_id}"}};</script>
<script src="{client}" defer></script>
"""


def client_script():
    """The client script source, read fresh so edits to it need no restart."""
    return CLIENT_JS.read_text(encoding="utf-8")


def inject(html):
    """Return the page with the dev-server hooks added."""
    html = _tag_style(html)
    bootstrap = _BOOTSTRAP.format(
        events=config.EVENTS_URL,
        css=config.CSS_URL,
        style_id=config.STYLE_ID,
        client=config.CLIENT_URL,
    )
    if "</body>" in html:
        return html.replace("</body>", bootstrap + "</body>", 1)
    return html + bootstrap


def _tag_style(html):
    """Give the page's first <style> an id so its text can be replaced live.

    That first block is the one holding src/styles.css; the reset block the
    build appends after it is left alone.
    """
    if "<style>" not in html:
        return html
    return html.replace("<style>", f'<style id="{config.STYLE_ID}">', 1)
