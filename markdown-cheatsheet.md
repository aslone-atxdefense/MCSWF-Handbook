# Markdown Cheat Sheet

## What is Markdown?

Markdown is **plain text that formats itself**. You type a few punctuation
characters, and a program turns them into headings, bold text, lists, and links.

The file is just text — you can open it in any editor, forever. No hidden
formatting, no proprietary file format, no "this document was made in an older
version of Word."

Files end in `.md` (or `.markdown`). Most editors (VS Code, GitHub, Obsidian,
Notion, Slack, Reddit, Discord) render it automatically.

> **Tip for VS Code:** press `Cmd+Shift+V` to open a live preview of the file
> you're editing. Or `Cmd+K V` to open the preview side-by-side.

---

## The 30-Second Version

If you only learn five things, learn these:

| You type | You get |
| --- | --- |
| `# Big Title` | A heading |
| `**important**` | **important** |
| `- milk` | A bullet point |
| `[Google](https://google.com)` | A [link](https://google.com) |
| `` `code` `` | `code` |

Everything below is detail.

---

## Headings

Use `#` symbols. More `#` = smaller heading.

```markdown
# Heading 1 — the document title
## Heading 2 — major section
### Heading 3 — subsection
#### Heading 4
##### Heading 5
###### Heading 6
```

**Rules:**
- You need a space after the `#`. `#Heading` does not work; `# Heading` does.
- Use one `#` per document (the title), then nest logically.
- Put a blank line before and after a heading.

---

## Emphasis (bold, italic, strikethrough)

```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~strikethrough~~
```

Renders as:

*italic* · **bold** · ***bold italic*** · ~~strikethrough~~

**Tip:** prefer `*` for italic and `**` for bold. Underscores break inside
words — `snake_case_name` would accidentally italicize. Asterisks don't.

---

## Lists

### Bulleted (unordered)

```markdown
- First item
- Second item
  - Nested item (indent 2 spaces)
    - Deeper still
- Third item
```

`-`, `*`, and `+` all work. **Pick one and stay consistent** — `-` is the most
common.

### Numbered (ordered)

```markdown
1. First step
2. Second step
3. Third step
```

**The lazy trick:** you can write all `1.` and Markdown renumbers for you:

```markdown
1. First step
1. Second step
1. Third step
```

This is genuinely useful — insert a step in the middle without renumbering
everything below it.

### Checklists (task lists)

```markdown
- [ ] Not done yet
- [x] Done
- [ ] Also not done
```

Renders as clickable checkboxes on GitHub and in most note apps.

### Lists with paragraphs under them

Indent the continuation to line up with the text above it:

```markdown
1. Install the thing.

   This paragraph belongs to step 1 because it's indented 3 spaces.

2. Configure the thing.
```

---

## Links

```markdown
[link text](https://example.com)
[with a tooltip](https://example.com "Hover text here")
[relative link to another note](./meeting-notes.md)
[jump to a heading in this file](#lists)
```

**Bare URLs:** `<https://example.com>` makes a clickable link. On GitHub, a
plain `https://example.com` auto-links too, but the angle brackets are safer.

**Reference-style links** — good when the same link appears many times, or when
a giant URL makes the sentence unreadable:

```markdown
Check the [docs][1] and the [changelog][1] for details.

[1]: https://example.com/very/long/url/that/would/clutter/the/text
```

**Anchor links:** to link to a heading, lowercase it, replace spaces with
hyphens, and drop punctuation. `## My Great Section` → `#my-great-section`.

---

## Images

Same as a link, with a `!` in front:

```markdown
![alt text describing the image](./path/to/image.png)
![alt text](https://example.com/image.png "Optional tooltip")
```

The alt text is what screen readers announce and what shows if the image fails
to load. Write a real description, not "image".

**Make an image clickable** by nesting it in a link:

```markdown
[![alt text](./thumbnail.png)](https://example.com)
```

---

## Code

### Inline

Wrap in single backticks: `` `like this` ``.

Use it for filenames, commands, variable names — anything you'd type literally.

### Blocks

Wrap in triple backticks. Add a language name for syntax highlighting:

````markdown
```python
def hello(name):
    return f"Hello, {name}"
```
````

Common language tags: `python`, `javascript`, `typescript`, `bash`, `sql`,
`json`, `yaml`, `html`, `css`, `diff`, `text`.

**No language?** Leave it blank — you still get the monospace box, just no
colors.

**Showing backticks inside code?** Use more backticks on the outside than you
use on the inside. Four outer backticks can wrap a three-backtick block (that's
exactly how this cheat sheet is written).

---

## Blockquotes

```markdown
> This is a quote.
> It can span multiple lines.
>
> > And quotes can nest.
```

> This is a quote.
> It can span multiple lines.

Use them for actual quotes, callouts, notes, and warnings. You can put anything
inside — lists, code, headings.

**GitHub callouts** (also works in VS Code preview and many other tools):

```markdown
> [!NOTE]
> Useful information the reader should know.

> [!TIP]
> A helpful suggestion.

> [!IMPORTANT]
> Critical information.

> [!WARNING]
> Urgent — risk of something going wrong.

> [!CAUTION]
> Serious risk — negative consequences.
```

These render as colored, icon-labeled boxes.

---

## Tables

```markdown
| Name | Role | Location |
| --- | --- | --- |
| Amber | Engineer | Austin |
| Sam | Designer | Remote |
```

| Name | Role | Location |
| --- | --- | --- |
| Amber | Engineer | Austin |
| Sam | Designer | Remote |

**Alignment** is set by colons in the separator row:

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| a    | b      | c     |
```

**Good news:** the pipes don't have to line up in the source. This ugly version
renders identically:

```markdown
| Name | Role |
| --- | --- |
| Amber | Engineer |
```

Your editor probably has a "format document" command that tidies them for you.

---

## Horizontal Rule

Three or more hyphens on their own line, with a blank line above:

```markdown
---
```

Use it to separate major sections. `***` and `___` also work.

---

## Line Breaks — the #1 Thing That Confuses People

Markdown **ignores single line breaks**. These two lines:

```markdown
This is line one.
This is line two.
```

...render as one paragraph: "This is line one. This is line two."

**To get a new paragraph**, leave a blank line:

```markdown
This is paragraph one.

This is paragraph two.
```

**To force a line break inside a paragraph** (for an address, a poem), end the
line with **two trailing spaces**, or use a backslash:

```markdown
123 Main Street··
Austin, TX 78701
```

(The `··` above represents two spaces — invisible in your editor, which is why
most people just use blank lines instead.)

---

## Escaping — When You Want the Literal Character

Put a backslash in front:

```markdown
\*not italic\*
\# not a heading
2 \* 3 = 6
```

Characters worth escaping: ``\ ` * _ { } [ ] ( ) # + - . ! |``

---

## Footnotes

```markdown
Here's a claim that needs a source.[^1]

[^1]: The source, down at the bottom of the document.
```

Supported on GitHub and most note apps, but not universally. The footnote
definition can live anywhere in the file — it always renders at the bottom.

---

## Raw HTML

Most Markdown renderers let you drop in HTML when Markdown can't do what you
need:

```markdown
<details>
<summary>Click to expand</summary>

Hidden content goes here. Great for long logs or optional detail.

</details>
```

<details>
<summary>Click to expand</summary>

Hidden content goes here.

</details>

Other common ones: `<br>` for a line break, `<kbd>Cmd</kbd>` for keyboard keys,
`<sub>`/`<sup>` for subscript and superscript.

**Caveat:** HTML is stripped by some renderers for security. Don't depend on it
for anything essential.

---

## Front Matter (metadata)

Many tools (static site generators, Obsidian, Jekyll) read a YAML block at the
very top of the file:

```markdown
---
title: My Note
date: 2026-09-14
tags: [markdown, reference]
---
```

It must be the **first thing** in the file, fenced by `---` above and below.
Tools that don't understand it usually just display it as text, so only add it
if your tool wants it.

---

## Flavors — Why Markdown Sometimes Behaves Differently

There is no single Markdown. The original 2004 spec was small; everyone added
things:

| Flavor | Where you'll meet it | Adds |
| --- | --- | --- |
| **CommonMark** | The strict, standardized base | Nothing — it's the reference spec |
| **GitHub Flavored (GFM)** | GitHub, most dev tools | Tables, task lists, strikethrough, autolinks |
| **Obsidian / Wiki** | Obsidian, Foam, Logseq | `[[wiki links]]`, embeds, callouts |
| **MDX** | React docs sites | JSX components inside Markdown |

**Practical rule:** headings, bold, italic, lists, links, code, and blockquotes
work *everywhere*. Tables and task lists work almost everywhere. Footnotes,
callouts, and HTML are where things get tool-specific.

---

## Common Gotchas

| Problem | Cause | Fix |
| --- | --- | --- |
| Heading doesn't render | No space after `#` | `# Title`, not `#Title` |
| Two lines merged into one | Single line break | Add a blank line between them |
| List doesn't render | No blank line before it | Blank line between paragraph and list |
| Word randomly italicized | `snake_case` underscores | Use backticks or `*` for emphasis |
| Nested list ignored | Wrong indent | Use 2 (or 4) spaces, consistently |
| Table broken | Missing the `\| --- \|` separator row | Every table needs it under the header |
| Code block never ends | Unmatched backticks | Count your fences — 3 open, 3 close |

---

## Practice

Open a new `.md` file and try to reproduce this, checking your preview as you go:

```markdown
# Grocery Run

Going to **HEB** after work. Budget: `$60`.

## Need
- [ ] Coffee — the *dark* roast
- [ ] Eggs
- [x] Bread (already got it)

## Recipe I'm trying
See the [full recipe](https://example.com) — takes ~20 min.

> Don't skip the resting step.
```

---

## Keep Handy

- **CommonMark spec & live tester:** <https://spec.commonmark.org/dingus/>
- **GitHub's Markdown guide:** <https://docs.github.com/get-started/writing-on-github>
- **Markdown Guide (best reference site):** <https://www.markdownguide.org/>
