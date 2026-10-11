@AGENTS.md
@docs/architecture.md
@docs/codingguidelines.md

# Claude Code notes

- The three imports above are the project's source of truth. Follow them before general habits.
- Before editing, read the file you are changing and its neighbours, and match their style.
- Use `pnpm` (never `npm` or `yarn`). Do not run install scripts: `pnpm install --ignore-scripts`.
- Before reporting work as finished, run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm security:check` and `pnpm build`,
  and state which ones you ran and their results.
- Treat `.github/`, `.husky/`, `.vscode/`, `scripts/` and `package.json` as sensitive. Explain any change to them in the
  pull request. See `SECURITY.md`.
- Commit messages and pull request descriptions follow the attribution lines given by the session, and never contain
  secrets.
