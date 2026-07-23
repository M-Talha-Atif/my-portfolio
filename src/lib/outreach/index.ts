import { OutreachPage } from './types'
import { projectsMetadata } from '@/lib/projects/index'

// Lightweight metadata for future listing/internal use (NOT publicly linked or navigated to)
export const outreachPagesMetadata = [
  {
    slug: 'atomic',
    company: 'Atomic',
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
