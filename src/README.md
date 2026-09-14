# Editing the Site

Everything you edit lives in this `src/` folder. The site is assembled from
these pieces by `python3 build-site.py`.

**You never edit `dist/`.** That folder is generated output — anything you
change there is erased on the next build.

---

## Which file do I edit?

| I want to change... | Open this |
| --- | --- |
| The words in a handbook section | `sections/` — the matching file |
| Colors, fonts, spacing | `styles.css` |
| The sidebar menu list | `scripts.js` (the `SECTIONS` list at the top) |
| The big title area at the top | `layout/hero.html` |
| The left sidebar | `layout/sidebar.html` |
| The bar across the top on phones | `layout/topbar.html` |
| The bottom of the page | `layout/footer.html` |
| The order things appear on the page | `layout/frame.html` |

**95% of edits are in `sections/`.** Start there.

---

## The folder map

```
src/
├── README.md          ← you are here
├── styles.css         ← all colors, fonts, spacing
├── scripts.js         ← menu list, search, interactivity
├── layout/
│   ├── frame.html     ← the page skeleton (rarely edited)
│   ├── topbar.html    ← mobile top bar
│   ├── sidebar.html   ← left navigation panel
│   ├── hero.html      ← big title block
│   └── footer.html    ← bottom of page
└── sections/          ← THE HANDBOOK CONTENT — one file per section
    ├── 01-dayone.html
    ├── 02-mission.html
    └── ...
```

### The sections

Files are numbered, and **the number sets the order on the page**.

| File | Section on the page |
| --- | --- |
| `01-dayone.html` | Your first two weeks |
| `02-mission.html` | Mission & Values |
| `03-welcome.html` | Welcome letter |
| `04-conduct.html` | Code of Conduct |
| `05-appearance.html` | Standards of Appearance |
| `06-fitness.html` | Fitness & Medical Readiness |
| `07-discipline.html` | Discipline & Academics |
| `08-tracks.html` | Training tracks |
| `09-onsite.html` | Onsite & logistics |
| `10-tad.html` | Temporary duty (TAD) |
| `11-resources.html` | Resources |
| `12-directory.html` | Directory & references |

---

## How to make a change

### Edit text in a section

1. Open the file in `sections/`.
2. Change the words **between** the tags. Leave the tags alone.
3. Save, then run `python3 build-site.py`.
4. Open `dist/index.html` in your browser to check it.

```html
<p>Change this sentence.</p>
   ^^^^^^^^^^^^^^^^^^^^^  edit here, not the <p> or </p>
```

### Reorder sections

Rename the number prefix. To move Resources above Onsite, renumber the files so
`resources` has the lower number. Keep the prefixes two digits (`08`, not `8`)
so they sort correctly.

Then update the order of the `SECTIONS` list in `scripts.js` to match, or the
menu will list them in the old order.

### Add a new section

**This takes two steps — the second is easy to forget.**

**Step 1.** Create the file, e.g. `sections/13-mynewsection.html`. Copy an
existing short one like `08-tracks.html` as a starting point and change the
`id`:

```html
      <!-- ===== MY NEW SECTION ===== -->
      <section id="mynewsection">
        <div class="sec-head">
          <div class="num">ARTICLE 12</div>
          <h2>My new section</h2>
        </div>
        <p>Your content here.</p>
      </section>
```

**Step 2.** Add a matching line to the `SECTIONS` list in `scripts.js` so it
appears in the sidebar menu:

```javascript
{id:"mynewsection", n:"12", t:"My new section", k:"search keywords here"},
```

The `id` must match **exactly** between the two files. `t` is the menu label;
`k` is the list of words the sidebar search box matches on.

> **Why two places?** The sidebar menu is built by JavaScript from that list.
> A section file with no matching entry still appears on the page, but nothing
> in the menu links to it.

### Change colors

Open `styles.css` and look at the `TOKENS` block at the very top. The colors
are defined once there and reused everywhere, so changing a token restyles the
whole site consistently.

---

## Build and preview

```bash
python3 build-site.py
```

Then open `dist/index.html` in a browser. No installation, no dependencies —
just Python 3.

In VS Code, right-click `dist/index.html` → **Open with Live Server** (if you
have that extension) for auto-refresh, or just double-click the file.

When it looks right, commit and push — GitHub Actions rebuilds and publishes it
automatically.

---

## About `layout/frame.html`

This is the page skeleton. The `{{DOUBLE_BRACE}}` words are **slots** — the
build replaces each one with the contents of another file:

| Slot | Filled with |
| --- | --- |
| `{{STYLES}}` | `styles.css` |
| `{{TOPBAR}}` | `layout/topbar.html` |
| `{{SIDEBAR}}` | `layout/sidebar.html` |
| `{{HERO}}` | `layout/hero.html` |
| `{{SECTIONS}}` | every file in `sections/`, in number order |
| `{{FOOTER}}` | `layout/footer.html` |
| `{{SCRIPTS}}` | `scripts.js` |

Each slot must stay **alone on its own line**. You rarely need to touch this
file — only to move a whole block (say, put the footer above the sections).

---

## If the build fails

The error message names the problem. The common ones:

| Message | What it means | Fix |
| --- | --- | --- |
| `missing source file: ...` | A file the build expects was renamed or deleted | Restore the name, or update `sitegen/config.py` |
| `no section files found` | `sections/` is empty | Put the section files back |
| `{{X}} is not in frame.html` | A slot token was deleted from the frame | Put the token back on its own line |
| `still has an unfilled slot token` | A typo'd token like `{{HEROO}}` | Fix the spelling |

**If the page looks broken after an edit**, you most likely deleted a closing
tag. Every `<section>` needs a `</section>`, every `<div>` a `</div>`. VS Code
highlights the matching tag when you click one.

**Nothing you can break here is permanent** — the original single-file version
is archived outside the repo at
`../MCSWF-Handbook-private/source-documents/mcswf-site.ORIGINAL.html`.
