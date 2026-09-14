"""Turn the Artifact-format fragment into a standalone HTML document.

The assembled fragment is authored for the Artifact runtime, which supplies the
<!doctype>/<head>/<body> skeleton and a small CSS reset at publish time.
Serving the page over plain HTTP means supplying both here instead.
"""


class FragmentError(ValueError):
    """The source fragment was not in the shape the build expects."""


# Mirrors what the Artifact runtime injects; needed only when self-hosting.
RUNTIME_RESET = """
<style>
  /* Supplied by the Artifact runtime when published there; needed when self-hosted. */
  :root{color-scheme:light dark}
  html,body{margin:0;padding:0}
  img{max-width:100%}
  [hidden]{display:none!important}
</style>"""


def split_fragment(source):
    """Split the fragment at the end of its final <style> block.

    Everything up to and including </style> belongs in <head>; the rest is
    the page body. Returns (head, body).
    """
    if "</style>" not in source:
        raise FragmentError(
            "expected a </style> in the source fragment; the page's CSS marks "
            "where <head> content ends and the body begins"
        )
    head, body = source.split("</style>", 1)
    return head + "</style>", body


def render_document(head, body, *, description, lang, robots_meta, icon):
    """Assemble the full standalone HTML document."""
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{description}">
<meta name="robots" content="{robots_meta}">
<meta name="referrer" content="no-referrer">
<link rel="icon" href="{icon}" type="image/png">
<link rel="apple-touch-icon" href="{icon}">
{head}{RUNTIME_RESET}
</head>
<body>
{body}
</body>
</html>
"""
