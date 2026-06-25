# M. Talha Atif, Portfolio

<<<<<<< HEAD
A modern engineering portfolio built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and rich project case studies. The site presents professional experience, production-impact engineering work, architecture diagrams, metrics, visual galleries, and a contact flow backed by Nodemailer.
=======
## Getting Started, up.
>>>>>>> bcec471 (Update README.md)

## Highlights

- **App Router architecture** with route-based pages for the home page, dynamic project case studies, and contact API.
- **Rich project case studies** powered by structured TypeScript data, including metrics, architecture layers, challenges, diagrams, galleries, demos, and links.
- **Dark/light theme system** using CSS variables, `data-theme`, and a React context provider.
- **Motion-first UI** with Framer Motion scroll and hover animations.
- **Mermaid architecture diagrams** rendered client-side for project flows and system design visuals.
- **Contact API route** using Nodemailer and SMTP environment variables.
- **Static-friendly deployment** designed for Vercel-style hosting with minimal external infrastructure.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16, React 18, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS, CSS variables, custom glass utilities |
| Animation | Framer Motion |
| Icons | Lucide React |
| Diagrams | Mermaid |
| Email | Nodemailer, SMTP |
| Tooling | ESLint 9, Next.js ESLint config, PostCSS, Autoprefixer |

## Application Structure

```text
src/
  app/
	page.tsx                 # Home page composition
	layout.tsx               # Root layout with ThemeProvider and ClientLayoutWrapper
	globals.css              # Theme variables, fonts, Tailwind layers, shared utilities
	api/contact/route.ts     # Contact form email endpoint
	projects/[slug]/page.tsx # Dynamic project case-study page
  components/
	Hero.tsx                 # Intro, resume link, social links, achievement cards
	Experience.tsx           # Timeline-style professional experience
	Journey.tsx              # Developer journey and engineering values
	ProjectsGrid.tsx         # Project listing cards
	MermaidDiagram.tsx       # Client-side Mermaid renderer
	VisualCarousel.tsx       # Case-study image gallery
	ThemeProvider.tsx        # Theme context and localStorage persistence
  lib/projects/
	index.ts                 # Lightweight project metadata + dynamic imports
	types.ts                 # Project case-study data model
	memingo.ts               # Memingo detailed case study
	moodly.ts                # Moodly detailed case study
public/
  personal/                  # Resume and profile assets
  memingoProject/            # Memingo project images and diagrams
  moodlyProject/             # Moodly project images
  achievements/              # Achievement images
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Main portfolio page with hero, projects, experience, journey, skills, achievements, contact, and footer sections. |
| `/projects/[slug]` | Dynamic project case-study page loaded from `src/lib/projects`. |
| `/api/contact` | POST endpoint that sends contact form submissions through Nodemailer. |

## Project Data Model

Projects are defined in `src/lib/projects`. The listing page uses lightweight metadata from `projectsMetadata`, while full case-study data is loaded dynamically with `getProject(slug)`.

Each project can include:

- overview, problem, solution, features, and results
- technology stack by category
- web and mobile design galleries
- metrics, highlights, goals, and individual contributions
- architecture details and challenges
- Mermaid diagrams for system design and flows
- live, demo, GitHub, and APK links

This keeps the home page lightweight while allowing detailed project pages to render rich case-study content only when needed.

## Theme System

The theme system is based on:

- CSS variables in `src/app/globals.css`
- a `data-theme` attribute on `document.documentElement`
- localStorage persistence in `ThemeProvider`

Use CSS variables for theme-aware styling:

```tsx
className="bg-[var(--color-bg)] text-[var(--color-text)] border-[rgba(255,255,255,0.1)]"
```

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.13+ recommended
- npm 10+

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Environment Variables

The contact form uses `src/app/api/contact/route.ts` and requires SMTP configuration.

Create `.env.local`:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
CONTACT_EMAIL=you@example.com
```

Do not commit `.env.local` or real credentials.

## Adding a New Project

1. Add lightweight metadata in `src/lib/projects/index.ts`.
2. Create a detailed project file in `src/lib/projects/{slug}.ts` using the `Project` type from `types.ts`.
3. Add project assets under `public/{projectFolder}/`.
4. Update `getProject(slug)` to dynamically import the new project.
5. Visit `/projects/{slug}` to verify the dynamic case-study page.

## Deployment Notes

This project is suitable for Vercel or any platform that supports Next.js App Router deployments.

Before deployment:

```bash
npm run lint
npm run build
```

Also configure the SMTP environment variables in the deployment platform so the contact form can send email.

## Repository Notes

- `AGENTS.md` documents coding-agent conventions for this codebase.
- Public assets are referenced from `/public` paths such as `/personal/Talha-Atif.pdf` and `/memingoProject/hero/heroMemingo.png`.
- Interactive or animated components use the `'use client'` directive because Framer Motion, Mermaid rendering, and local browser APIs require client-side execution.
