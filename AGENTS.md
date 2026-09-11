# AGENTS.md - AI Coding Agent Guide for Portfolio

## Project Overview
A **Next.js 14** (App Router) portfolio website showcasing Full-Stack engineering work. Built with TypeScript, Tailwind CSS, Framer Motion, and Lucide React. The site displays rich project case studies with detailed metrics, architecture diagrams (Mermaid), and multimedia galleries.

**Tech Stack**: Next.js 14, React 18.3, TypeScript 5, Tailwind CSS, Framer Motion, Mermaid, Nodemailer

---

## Critical Architecture Patterns

### 1. **Client/Server Component Boundary**
- All interactive components use `'use client'` directive (Framer Motion requires this)
- Root layout (`layout.tsx`) is Server Component wrapping with `ThemeProvider` and `ClientLayoutWrapper`
- SSR-safe: `useEffect` in `ThemeProvider` prevents hydration mismatch via `localStorage`
- **Example**: `Hero.tsx`, `ProjectsGrid.tsx` are Client Components with motion animations

### 2. **The Core Data Model: `Project` Type**
Located in `src/lib/projects.ts` - **CRITICAL to understand this structure**:

```typescript
export type Project = {
  slug: string,              // URL identifier
  title: string,             // Full project title
  short: string,             // One-line elevator pitch
  overview: string,          // Comprehensive overview (2-3 paragraphs)
  problem: string,           // Problem statement solved
  solution: string,          // Solution approach
  features: string[],        // Feature list (8-12 items)
  tech: string[],            // Short tech tags for cards
  
  // Rich content
  techStack: {frontend, backend, mobile?, ai?, infrastructure?},
  mermaidDiagrams?: [       // System architectures, flows (sequence/flowchart)
    {title, code, type: 'sequence'|'flowchart'|'class'|'state'|'er'|'journey'|'gantt'}
  ],
  architectureDetails?: [{layer, technology, purpose}],
  challenges?: [{title, description, solution}],
  
  // Media
  hero: string,              // Hero image path (required)
  webDesigns?: string[],     // Web mockups
  mobileDesigns?: string[],  // Mobile screenshots
  
  // Metadata
  platforms?: ('web'|'mobile')[],
  metrics?: [{label, value}],
  highlights?: string[],
  projectGoals?: string[],
  individualContributions?: string[],
  
  // Links
  demo?: string, live?: string, github?: string
}
```

This is used to generate dynamic project pages at `/projects/[slug]`. **Every project extends this fully** - AI agents should maintain this parity when adding projects.

### 3. **Theme System (Dark/Light Mode)**
**Pattern**: CSS variables + `data-theme` attribute + React Context

1. **CSS Variables** in `globals.css`:
   - Dark (`:root`): `--color-bg: #0b0b0d`, `--color-accent-solid: #CFFFDC`
   - Light (`[data-theme="light"]`): `--color-bg: #f8fafc`, `--color-accent-solid: #4f46e5`

2. **ThemeProvider** manages state:
   ```typescript
   // Store in localStorage, set document.documentElement.setAttribute('data-theme', theme)
   ```

3. **Usage**: Use CSS variables in Tailwind: `bg-[var(--color-bg)]`, or hex directly

**When adding UI**: Always use CSS variable colors via Tailwind's arbitrary values, test both light/dark themes locally.

### 4. **Animation Pattern (Framer Motion)**
- Scroll-triggered animations: `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}`
- Hover effects: `whileHover={{ scale: 1.05 }}`
- Staggered children: Use `delay: i * 0.1` for sequential animations
- **Key principle**: Keep `initial` state offscreen/invisible, animate to final state

**Example**:
```typescript
motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
```

### 5. **Component Structure**
- **Page Layout**: Sections with `id` attributes for scroll navigation (e.g., `id="about"`, `id="projects"`)
- **Grid Layouts**: `grid gap-8 sm:grid-cols-2 lg:grid-cols-3` (responsive)
- **Glass Morphism**: Use `.glass` class (custom utility) or inline gradient + `backdrop-filter: blur(...)`

---

## Key Conventions & Patterns

### Styling
- **Tailwind first**: Use `className` with Tailwind utilities
- **CSS Variables for colors**: `bg-[var(--color-accent-solid)]`, `text-[var(--color-text)]`
- **Glass effects**: `.glass` class handles gradient + blur + border
- **Border colors**: `border-[rgba(255,255,255,0.1)]` for contrast on dark bg
- **Hover states**: Always include transitions: `transition` or `transition-all duration-300`

### Icons
- Use **Lucide React**: `import { Icon1, Icon2 } from 'lucide-react'`
- Size: `w-4 h-4` (small), `w-6 h-6` (medium)
- Color: `text-[var(--color-accent-solid)]`

### Images
- Use **Next.js Image**: `import Image from 'next/image'`
- Provide `width`, `height`, `alt`, `fill` (for containers), `sizes`
- Round: `rounded-full` (circles), `rounded-xl` (cards)

### TypeScript
- **Strict mode enabled**: All types must be explicit
- Define interfaces for props: `interface ComponentProps { ... }`
- Use `React.FC<Props>` or function with return type annotation

---

## Development Workflow

### Commands
```bash
npm run dev      # Start local dev server (http://localhost:3000)
npm run build    # Production build (must pass lint)
npm run start    # Start prod server
npm run lint     # Run ESLint (Next.js core-web-vitals + TypeScript rules)
```

### Pre-Deployment Checklist
1. Run `npm run lint` - no errors allowed
2. Test both dark/light themes: Check `data-theme` attribute switching
3. Test responsive: Desktop, tablet, mobile viewports
4. Verify images load: Check `/public` paths are correct
5. Test motion animations: Scroll and hover interactions work smoothly

### File Locations
- **Components**: `src/components/*.tsx`
- **Pages**: `src/app/page.tsx` (home), `src/app/projects/[slug]/page.tsx` (dynamic)
- **Styling**: `src/app/globals.css` (global + theme variables)
- **Data**: `src/lib/projects.ts` (project definitions)
- **Public Assets**: `/public/{images,favIcons,projectFolders}/`

---

## Common Tasks & How-To

### Add a New Project
1. Add entry to `projects[]` in `src/lib/projects.ts` with full `Project` type
2. Add hero image to `/public/{projectName}/`, update `hero: '/projectName/hero.png'`
3. Add other assets to `/public/{projectName}/{webImages,mobileImages,diagrams}/`
4. Dynamic page `/projects/[slug]` auto-renders via route parameters
5. **Mermaid diagrams**: Include in `mermaidDiagrams[]` with proper syntax

### Update Theme Colors
1. Edit `:root` and `[data-theme="light"]` in `globals.css`
2. Update CSS variable names in Tailwind `extend.colors` (if used in arbitrary values)
3. Test both themes by toggling in components

### Add Animations
1. Import `motion` from `framer-motion`
2. Wrap JSX with `motion.div/section/...`
3. For scroll: Use `whileInView` + `viewport={{ once: true }}`
4. Always include `duration` in `transition`

### Fix Type Errors
- Run `npm run lint` to see errors
- Check imports: `import type { T } from './file'` for types-only imports
- Hover in IDE for type hints

---

## External Services Integrated

1. **LinkedIn/GitHub Links**: Updated in `Hero.tsx` - just change URLs
2. **Email (Contact)**: Uses Nodemailer via API route `/api/contact`
3. **Resume PDF**: Served from `/public/personal/Talha-Atif.pdf`
4. **Three.js (if used)**: Installed but not yet implemented - check `VisualCarousel.tsx`

---

## Decision Context: Why It's Built This Way

- **App Router (stable)**: Modern Next.js with better DX, natural file-based routing
- **TypeScript strict**: Catches errors early, enables confident refactoring
- **Tailwind + CSS variables**: Flexible theming without CSS-in-JS complexity
- **Framer Motion**: Smooth, performant animations out-of-the-box
- **Structured Project Data**: Central source of truth enables dynamic pages, consistency
- **No databases**: Static generation with `next build` for fast deployment to Vercel

---

## Troubleshooting Reference

| Issue | Solution |
|-------|----------|
| Hydration mismatch (theme) | Ensure `useEffect` in ThemeProvider runs after mount; check `localStorage` access |
| Motion animations don't trigger | Use `whileInView` + `viewport={{ once: true }}`; check component is actually rendered |
| Images not loading | Verify path starts with `/public/` in `src/` attributes; use Next.js `Image` component |
| Tailwind classes not applied | Check `content:` in `tailwind.config.js` includes your file path |
| Type errors in components | Run `npm run lint`, check imports, ensure props match interface definitions |
| Theme colors not updating | Check CSS variable names match in `globals.css` and implementations; clear browser cache |


