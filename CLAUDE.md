# Working Instructions — MCSWF Handbook

Standing rules for this repository. Read before making changes.

---

## 1. Never commit, push, or sync

**Do not run `git commit`, `git push`, `git pull`, or any other syncing
command.** Amber handles all version control herself.

Make changes in the working tree and stop there. When work is done, summarize
what changed and let her review, stage, and commit it on her own schedule.

This applies to every change, no matter how small or how obviously correct.

---

## 2. Write modular code

Split work into focused modules with a single clear responsibility each, rather
than one long script.

The site build is the reference example — see [sitegen/](sitegen/):

| Module | Responsibility |
| --- | --- |
| `config.py` | Paths and settings. No logic. |
| `page.py` | Assembles the fragment from the pieces in `src/`. |
| `template.py` | HTML assembly and fragment parsing. |
| `assets.py` | Copying static files into `dist/`. |
| `build.py` | Orchestration — calls the others, owns no details. |
| `__init__.py` | The public surface (`build`, `FragmentError`). |

`build-site.py` at the root is a **thin entry point only**: argument handling,
error reporting, exit codes. No build logic belongs in it.

When adding a feature, prefer a new module over growing an existing one.
Constants and paths go in `config.py`, never hardcoded in logic.

---

## 3. This repository is PUBLIC

`aslone-atxdefense/MCSWF-Handbook` is public on GitHub. Anything committed here
is readable by anyone on the internet, permanently — git history keeps files
even after they are deleted in a later commit.

**Never add to this repo:**
- Source documents (`.docx`, `.pdf`, internal handbooks)
- Personal notes or scratch files
- Anything with names, contact details, locations, or internal procedures
- Credentials, tokens, keys, `.env` files

**Those belong in `../MCSWF-Handbook-private/`** — a sibling folder outside the
repository, not tracked by git:

```
developer/
├── MCSWF-Handbook/          ← public repo; only what the site needs
└── MCSWF-Handbook-private/  ← never committed
    ├── source-documents/    MCSWF Handbook (.docx and .md)
    └── notes/               markdown-cheatsheet.md, scratch files
```

If a task needs one of those files, read it from `../MCSWF-Handbook-private/`.
Do not copy it into the repo.

---

## 4. What belongs in this repo

Only what the published site needs:

| File | Purpose |
| --- | --- |
| `src/sections/` | One file per handbook section — **most edits go here** |
| `src/layout/` | Page frame: header, sidebar, hero, footer |
| `src/styles.css` | All styling |
| `src/scripts.js` | Nav list, search, interactivity |
| `src/README.md` | Editing guide written for a non-developer |
| `seal.png` | Site icon and image asset |
| `build-site.py` | Build entry point |
| `sitegen/` | Build modules |
| `dev-server.py` | Live-preview entry point (`npm run dev`) |
| `devserver/` | Dev-server modules — watch, rebuild, push to the browser |
| `package.json` | `npm run dev` / `npm run build` shortcuts; no dependencies |
| `.github/workflows/pages.yml` | Deploys to GitHub Pages on push to `main` |

The site was originally one 1,284-line `mcswf-site.html`; it is now assembled
from `src/`. Adding a section means adding the file **and** an entry in the
`SECTIONS` array in `src/scripts.js` — see `src/README.md`.

`dist/` is build output and is gitignored — the Pages workflow rebuilds it.

---

## 5. Build and deploy

```bash
python3 build-site.py     # rebuild dist/ (stdlib only, no dependencies)
python3 dev-server.py     # live preview at :5173, rebuilds and pushes on save
```

Both are also reachable as `npm run build` and `npm run dev`; package.json only
shells out to these, so nothing needs installing either way.

Deployment is automatic: pushing to `main` triggers
[.github/workflows/pages.yml](.github/workflows/pages.yml), which runs the
build and publishes `dist/` to
<https://aslone-atxdefense.github.io/MCSWF-Handbook/>.

**Amber pushes. Claude does not** — see rule 1.

The site is set to `noindex, nofollow` with a disallowing `robots.txt`
(configured in [sitegen/config.py](sitegen/config.py)). It is reachable by URL
but kept out of search engines. Do not change this without being asked.
