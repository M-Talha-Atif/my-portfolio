# Architecture

How this site is put together and why. Read this before changing structure. For how to write code in it, see
[codingguidelines.md](./codingguidelines.md). For the security model, see [../SECURITY.md](../SECURITY.md).

## At a glance

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 18.3, TypeScript (strict) |
| Styling | Tailwind CSS 3 driven by CSS variables, Framer Motion for motion |
| Content | Typed TypeScript modules in `src/lib/`. No database, no CMS |
| Rendering | Statically generated where possible. Interactive pieces are client components |
| Hosting | Vercel, production domain `talhaatif.tech` |
| Analytics | Vercel Analytics and PostHog (proxied through `/ingest`) |
| Package manager | pnpm 10 with install scripts disabled |

The site is a content site. Almost every change is "add or edit typed data", so the data shape matters more than the
components.

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Single page of sections: Hero, Projects, Experience, Featured Writing, Journey, Skills, Achievements, Open Source, Contact |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Client page. Reads one project from `src/lib/projects/` |
| `/open-source` | `src/app/open-source/page.tsx` | Data in `src/lib/opensource/` |
| `/writing` | `src/app/writing/page.tsx` | Article index with search, filters, sort |
| `/writing/[slug]` | `src/app/writing/[slug]/page.tsx` | Statically generated from `generateStaticParams` |
| `/writing/[slug]/og` | `.../og/route.tsx` | Branded 1200x630 share image, `ImageResponse`, `force-static` |
| `/writing/feed.xml` | `src/app/writing/feed.xml/route.ts` | RSS. Advertised in `<head>` only, not shown as a visible link |
| `/r/[slug]` | `src/app/r/[slug]/page.tsx` | Unlisted outreach pages (`noindex`), data in `src/lib/outreach/` |
| `/api/contact` | `src/app/api/contact/route.ts` | Contact form, sends mail through Nodemailer using `SMTP_*` env vars |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `robots.ts` | Built from project and article metadata |

## Data model

Content lives in code so it is type-checked and reviewed like code.

```
src/lib/
  projects/        one file per case study + types.ts + index.ts (registry)
  articles/        one file per article + types.ts + index.ts + format.ts
  outreach/        one file per company page + types.ts + index.ts
  opensource/      merged pull requests
  seo.ts           SITE_URL, SITE_NAME, social links, default OG image
  analytics.ts, posthog-server.ts
```

- **Projects.** `src/lib/projects/types.ts` defines `Project`. `index.ts` exports `projectsMetadata` (light, used by lists
  and the sitemap) and `getProject(slug)` (full). Adding a project means: a new file, an entry in both exports, assets in
  `public/<name>Project/`.
- **Articles.** A typed block list (`h2`, `h3`, `p`, `ul`, `ol`, `code`, `callout`, `jargon`, `diagram`, `table`,
  `metrics`). `ArticleBody` renders blocks, `Inline` parses `` `code` ``, `**bold**` and `[label](url)` inside text.
  `ogLines`, `ogDescription` and optional `ogPhones` drive the generated header image.
- **Outreach pages.** Per-company pages rendered by one template, registered in `src/lib/outreach/index.ts`.
- **Legacy.** `src/lib/projects.ts` is an old single-file copy of the project data. Nothing imports it. The source of
  truth is `src/lib/projects/`. Do not edit the legacy file.

## UI structure

```
src/components/
  *.tsx              page sections and shared UI (Hero, Experience, ProjectsGrid, Navbar, ...)
  articles/          article rendering, cards, search/filter browser, reading progress
  outreach/          OutreachTemplate
  FeedLatencyDemo.tsx  interactive Cunocovo feed replay (used on the Cunocovo case study)
```

- `layout.tsx` is a server component. It wraps the app in `ThemeProvider` and `ClientLayoutWrapper`.
- Anything using state, effects, Framer Motion or browser APIs is a client component (`'use client'`).
- Theme: CSS variables in `globals.css` switch on `data-theme`. Components use variables, never hard-coded colours.

## Client-side behaviours worth knowing

- **Writing browser** syncs search, category, tag and sort to the URL with `history.replaceState`, restoring them after
  hydration so a filtered view can be shared.
- **Reading progress** listens to scroll events directly (no `requestAnimationFrame` throttle, so it also updates in
  background panes).
- **Feed latency demo** is timed with `setInterval` and `performance.now()` (wall clock), so a throttled tab still ends on
  the correct value. It respects `prefers-reduced-motion`.

## Build, security and delivery pipeline

```
developer machine                      GitHub                         Vercel
-----------------                      ------                         ------
pre-commit: tripwire, ClamAV, audit -> push -> Actions "security" -----> build gate
pre-push:   tripwire, ClamAV (all)                 |                       (tripwire runs first)
                                                   +- tripwire (tree + every branch tip)
                                                   +- ClamAV (tree + installed deps)
                                                   +- Gitleaks (secrets, full history)
                                                   +- OSV-Scanner + pnpm audit
                                                   +- Semgrep
                                                   +- lint + build (no install scripts)
                                                   +- security-gate (single required check)
```

- `pnpm dev` and `pnpm build` run `scripts/security/check-repo.mjs` first, so a poisoned commit fails before it can run
  or deploy.
- Dependencies install with `--ignore-scripts`. Only `sharp`, `core-js` and `unrs-resolver` may run build scripts.
- `.npmrc` refuses packages published in the last three days.
- Every GitHub Action is pinned to a full commit SHA. Dependabot proposes updates.
- Accepted advisories live in `osv-scanner.toml` and `package.json` (`pnpm.auditConfig`), each with a reason and an
  expiry. Remove them when a fixed version exists.

## Environment

| Variable | Used by | Notes |
|---|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | `/api/contact` | Set in Vercel. Never commit |
| PostHog keys | `instrumentation-client.ts`, `posthog-server.ts` | Public project key is expected in the client |

Secrets belong in Vercel project settings, never in the repo. Gitleaks scans full history in CI.

## Known gaps

- Branch protection cannot be enabled while the repo is private on a free plan. `scripts/security/enable-branch-protection.sh`
  is ready for when that changes.
- `SITE_URL` in `src/lib/seo.ts` points at `talha-atif.vercel.app` while the primary domain is `talhaatif.tech`.
  Canonical URLs, the sitemap and the RSS feed use it. Decide which host is canonical before changing it.
- `src/lib/projects.ts` is dead code kept for now.
