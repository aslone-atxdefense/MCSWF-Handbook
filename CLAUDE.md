# Working Instructions

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

`aslone-atxdefense/ambers_notes` is public on GitHub. Anything committed here
is readable by anyone on the internet, permanently — git history keeps files
even after they are deleted in a later commit.

**Never add to this repo:**
- Source documents (`.docx`, `.pdf`, internal handbooks)
- Personal notes or scratch files
- Anything with names, contact details, locations, or internal procedures
- Credentials, tokens, keys, `.env` files

**Those belong in `../ambers_notes_private/`** — a sibling folder outside the
repository, not tracked by git:

```
developer/
├── ambers_notes/          ← public repo; only what the site needs
└── ambers_notes_private/  ← never committed
    ├── source-documents/  MCSWF Handbook (.docx and .md)
    └── notes/             markdown-cheatsheet.md, scratch files
```

If a task needs one of those files, read it from `../ambers_notes_private/`.
Do not copy it into the repo.

---

## 4. What belongs in this repo

Only what the published site needs:

| File | Purpose |
| --- | --- |
| `mcswf-site.html` | Source fragment — **edit this** to change the site |
| `seal.png` | Site icon and image asset |
| `build-site.py` | Build entry point |
| `sitegen/` | Build modules |
| `.github/workflows/pages.yml` | Deploys to GitHub Pages on push to `main` |

`dist/` is build output and is gitignored — the Pages workflow rebuilds it.

---

## 5. Build and deploy

```bash
python3 build-site.py     # rebuild dist/ (stdlib only, no dependencies)
```

Deployment is automatic: pushing to `main` triggers
[.github/workflows/pages.yml](.github/workflows/pages.yml), which runs the
build and publishes `dist/` to
<https://aslone-atxdefense.github.io/ambers_notes/>.

**Amber pushes. Claude does not** — see rule 1.

The site is set to `noindex, nofollow` with a disallowing `robots.txt`
(configured in [sitegen/config.py](sitegen/config.py)). It is reachable by URL
but kept out of search engines. Do not change this without being asked.
