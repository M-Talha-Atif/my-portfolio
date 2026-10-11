# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot) working in this repository. Humans can read it too.

## Read these first

| Document | Read it when |
|---|---|
| [docs/architecture.md](docs/architecture.md) | Before changing structure, routes, data or the build pipeline |
| [docs/codingguidelines.md](docs/codingguidelines.md) | Before writing or reviewing any code |
| [SECURITY.md](SECURITY.md) | Before touching `.github/`, `.husky/`, `.vscode/`, `scripts/`, `package.json`, `.npmrc` or any config file |

If these documents disagree with the code, the code is right: fix the document in the same change.

## What this is

Personal portfolio and case-study site for Muhammad Talha Atif (Full Stack / Backend Engineer), deployed on Vercel at
`talhaatif.tech`. Next.js 16 App Router, React 18.3, TypeScript strict, Tailwind with CSS variables, Framer Motion.
Content is typed data in `src/lib/` (projects, articles, outreach pages, open source). There is no database.

## Commands

Use pnpm (version pinned in `package.json`). Install scripts are disabled on purpose.

```bash
pnpm install --ignore-scripts   # install
pnpm dev                        # runs the security tripwire, then next dev
pnpm lint                       # ESLint (React Compiler rules are errors)
pnpm exec tsc --noEmit          # typecheck
pnpm security:check             # repo tripwire (also runs before dev and build)
pnpm security:scan              # ClamAV over tracked files, if ClamAV is installed
pnpm build                      # tripwire, then production build
```

Run lint, typecheck, `security:check` and build before saying work is done. Report anything you could not run.

## Rules for agents

1. **Work on a branch and keep changes small.** One concern per pull request. Do not push to `main`.
2. **Follow the existing patterns.** Match naming, comment density and idiom of the file you are editing.
3. **Do not weaken security.** Never add install scripts, new build-script allowances, unpinned GitHub Actions,
   executable files outside `scripts/security/`, or new network hosts in config files. Do not use `--no-verify`.
   Do not remove an advisory ignore or add one without a reason and an expiry.
4. **Do not hand-edit the lockfile.** Change `package.json`, then run `pnpm install --ignore-scripts`.
5. **Never invent facts.** Metrics, dates, roles and links must come from the owner or existing data. Label anything
   illustrative as illustrative. Keep experience totals and dates consistent across the site.
6. **Secrets stay out of the repo.** No `.env*`, tokens or keys in code, docs or commit messages.
7. **Keep unrelated churn out.** `next dev` may rewrite the managed block below. Do not commit unrelated diffs to this file.
8. **Ask before outward-facing or irreversible actions** (force-push, deleting branches, publishing, changing repo access).

## Where things live

| Need | Go to |
|---|---|
| Add or edit a project case study | `src/lib/projects/` (see architecture.md, "Data model") |
| Add or edit an article | `src/lib/articles/` |
| Add an outreach page | `src/lib/outreach/` |
| Site-wide metadata and URLs | `src/lib/seo.ts` |
| Theme colours | `src/app/globals.css` (CSS variables, dark and light) |
| Security tooling | `scripts/security/`, `.github/workflows/security.yml`, `.husky/` |

`src/lib/projects.ts` is legacy and unused. Edit `src/lib/projects/*` instead.

## Definition of done

- Lint, typecheck, `security:check` and build pass locally.
- Checked in dark and light themes and at 375px width if the change is visual.
- Docs updated when behaviour, structure or rules changed.
- The pull request says what changed, why, and what was verified.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
