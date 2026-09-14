"""Assemble the page fragment from the editable pieces in src/.

src/layout/frame.html is the page skeleton. It contains slot tokens like
{{HERO}}, each sitting alone on its own line; this module replaces every token
with the contents of the matching file. Sections are concatenated in filename
order, which is why they are numbered.

Adding a section: drop a new numbered file in src/sections/ and add a matching
entry to the SECTIONS array in src/scripts.js so it appears in the nav.
"""

from . import config


class SlotError(ValueError):
    """A slot token is missing, unknown, or has no content to fill it."""


def _read_file(path):
    """Read a source file, with a clear error if it is missing."""
    if not path.exists():
        raise SlotError(f"missing source file: {path}")
    return path.read_text(encoding="utf-8")


def _read(path):
    """Read a slot piece, dropping the single trailing newline it ends with.

    A slot token sits alone on its own line in the frame, so the replacement
    text must not carry a newline of its own or every slot would gain a blank
    line beneath it.
    """
    text = _read_file(path)
    return text[:-1] if text.endswith("\n") else text


def section_files():
    """Every section, in filename order. The NN- prefix sets page order."""
    files = sorted(config.SECTIONS_DIR.glob("*.html"))
    if not files:
        raise SlotError(f"no section files found in {config.SECTIONS_DIR}")
    return files


def collect_slots():
    """Map each slot name to the text that replaces it."""
    slots = {name: _read(path) for name, path in config.SLOT_FILES.items()}
    slots["SECTIONS"] = "\n\n".join(_read(f) for f in section_files())
    return slots


def assemble():
    """Return the complete page fragment."""
    # The frame keeps its trailing newline; only slot pieces are trimmed.
    fragment = _read_file(config.FRAME)
    for name, content in collect_slots().items():
        token = "{{" + name + "}}"
        if token not in fragment:
            raise SlotError(
                f"{token} is not in {config.FRAME.name}; the piece in src/ has "
                f"nowhere to go"
            )
        fragment = fragment.replace(token, content)

    leftover = [t for t in ("{{", "}}") if t in fragment]
    if leftover:
        raise SlotError(
            f"{config.FRAME.name} still has an unfilled slot token after "
            f"assembly; check it against the slot names in sitegen/config.py"
        )
    return fragment
