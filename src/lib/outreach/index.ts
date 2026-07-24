import { OutreachPage } from './types'
import { projectsMetadata } from '@/lib/projects/index'

// Lightweight metadata for future listing/internal use (NOT publicly linked or navigated to)
export const outreachPagesMetadata = [
  {
    slug: 'atomic',
    company: 'Atomic',
    role: 'Backend Engineer',
  },
  {
    slug: 'vendra',
    company: 'Vendra',
    role: 'Full Stack Engineer',
  },
  {
    slug: 'rebolt',
    company: 'Rebolt',
    role: 'Founding Backend Software Engineer',
  },
  {
    slug: 'inblick',
    company: 'Inblick',
    role: 'Backend / Applied AI Engineer',
  },
  {
    slug: 'ellipsis',
    company: 'Ellipsis',
    role: 'Founding AI Engineer',
  },
  {
    slug: 'zynix',
    company: 'Zynix AI',
    role: 'Backend Engineer',
  },
]

// Dynamic import function, mirrors src/lib/projects/index.ts
export async function getOutreachPage(slug: string): Promise<OutreachPage | null> {
  try {
    if (slug === 'atomic') {
      const { atomicOutreach } = await import('./atomic')
      return atomicOutreach
    }
    if (slug === 'vendra') {
      const { vendraOutreach } = await import('./vendra')
      return vendraOutreach
    }
    if (slug === 'rebolt') {
      const { reboltOutreach } = await import('./rebolt')
      return reboltOutreach
    }
    if (slug === 'inblick') {
      const { inblickOutreach } = await import('./inblick')
      return inblickOutreach
    }
    if (slug === 'ellipsis') {
      const { ellipsisOutreach } = await import('./ellipsis')
      return ellipsisOutreach
    }
    if (slug === 'zynix') {
      const { zynixOutreach } = await import('./zynix')
      return zynixOutreach
    }
    return null
  } catch (error) {
    console.error('Error loading outreach page:', error)
    return null
  }
}

// Resolves an outreach page's `relevantProjects` slugs against the existing
// project registry (src/lib/projects), preserving the given order, instead
// of duplicating project title/description/image data in outreach content.
export function getRelevantProjects(slugs: string[]) {
  return slugs
    .map((slug) => projectsMetadata.find((project) => project.slug === slug))
    .filter((project): project is (typeof projectsMetadata)[number] => Boolean(project))
}
