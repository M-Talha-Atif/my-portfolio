# Coding guidelines

The rules for changing this repo. Humans and AI agents follow the same ones. For the layout of the codebase see
[architecture.md](./architecture.md).

## Before you start

1. Read [architecture.md](./architecture.md) so you know where the change belongs.
2. Match the file next to the one you are editing: naming, comment density, idiom.
3. Work on a branch. Never commit to `main` directly. One concern per pull request.

## TypeScript

- Strict mode. No `any`. Use `import type` for type-only imports.
- Model content with the existing types (`Project`, `Article`, `Block`). If the data does not fit, extend the type first,
  then the data, then the renderer.
- Prefer small pure functions and derived values over state.

## React

- Server component by default. Add `'use client'` only for state, effects, Framer Motion or browser APIs.
- The React Compiler lint rules are on and enforced in CI. In particular:
  - Do not reassign a variable declared outside the callback inside `useMemo` or during render. Derive with
    `map`/`reduce` instead.
  - Do not call `setState` synchronously inside an effect. Defer it (timeout, event) or derive the value.
  - Declare memoised values before any effect or callback that reads them.
- Effects that start timers, listeners or requests must clean them up.
- Time-based UI uses wall-clock time (`performance.now()` with `setInterval`), not frame counting, so it survives
  throttled tabs.

## Styling

- Tailwind utilities. Colours come from CSS variables: `bg-[var(--color-bg)]`, `text-[var(--color-text)]`,
  `border-[var(--color-border)]`, accent `var(--color-accent-solid)`. Never hard-code hex values in components.
- Check both themes (`data-theme` dark and light) and mobile width (375px) for any UI change.
- Respect `prefers-reduced-motion`. Motion must never be the only way to read information.
- Keep it plain. No decoration that does not carry meaning: no glow, gradient fills, emoji or generic "AI" card
  styling. Numbers go in monospace with `tabular-nums`.
- `ImageResponse` (Satori) crashes on `undefined` style values. Use conditional spreads, never `prop: cond ? x : undefined`.

## Accessibility

- Interactive elements are real `button` or `a` elements. Toggles use `role="switch"` and `aria-checked`.
- Images need `alt` (empty string for decorative). Live values use `aria-live="polite"`.
- Focus must be visible. Do not remove outlines without a replacement.

## Content and claims

This site is evidence for hiring decisions, so accuracy is the product.

- Every number must trace to a measurement. If a figure is illustrative or split from a measured total, say so on the
  page (see the note under the feed demo).
- Keep dates, durations and experience totals consistent across the site (Experience, Hero, About, metadata). When one
  changes, search for the others.
- Do not invent clients, quotes, metrics or links. Do not include personal data of third parties in screenshots.
- Plain English, short sentences. Explain jargon the first time it appears.

## Dependencies and supply chain

- Add a dependency only when the platform and existing packages cannot do it. Check the package, its maintainers and its
  last release first.
- Never add `preinstall`/`install`/`postinstall` scripts or enable a new build script in `pnpm.onlyBuiltDependencies`
  without owner review.
- Pin GitHub Actions to a full commit SHA with the version in a comment.
- Do not weaken an override or an advisory ignore to make CI pass. An ignore needs a reason and an expiry.
- Do not add network hosts, config-file code, or executable files outside `scripts/security/`. The tripwire will fail
  the build.

## Security hygiene

- Never commit secrets or `.env*`. Contact form credentials live in Vercel.
- Do not edit `.vscode/`, `.husky/`, `.github/` or `scripts/` casually. They are code-executing surfaces and are owned
  in `CODEOWNERS`.
- Do not bypass hooks (`--no-verify`) or the tripwire. If a check blocks you, fix the cause.

## Checks that must pass

Run these before opening a pull request:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm security:check
pnpm build
```

CI runs the same plus ClamAV (tree and installed dependencies), Gitleaks, OSV-Scanner, `pnpm audit` and Semgrep.
A pull request is not ready while any of them is red.

## Commits and pull requests

- Imperative, specific subject line ("Add feed latency demo to the Cunocovo case study").
- The body says why, and what was verified. Call out anything you could not verify.
- Keep generated or incidental files out of the commit (for example tool-written `AGENTS.md` changes).

## When adding common things

| Task | Where |
|---|---|
| New project case study | `src/lib/projects/<name>.ts`, register in `index.ts`, assets under `public/<name>Project/` |
| New article | `src/lib/articles/<slug>.ts`, register in `index.ts`, check the generated `/og` image |
| New outreach page | `src/lib/outreach/<company>.ts`, register in `index.ts` |
| New interactive section | `src/components/<Name>.tsx` as a client component, mount it where it belongs |
