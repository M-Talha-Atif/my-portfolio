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
  {
    slug: 'dili',
    company: 'Dili',
    role: 'Founding Engineer, Full Stack',
  },
  {
    slug: 'artemis',
    company: 'Artemis Security',
    role: 'Backend Engineer (informational)',
  },
  {
    slug: 'texagon',
    company: 'Texagon',
    role: 'Jr. Software Engineer',
  },
  {
    slug: 'bloomy',
    company: 'Bloomy',
    role: 'Founding Engineer',
  },
  {
    slug: 'oneleet',
    company: 'Oneleet',
    role: 'Backend Engineer',
  },
  {
    slug: 'wildcard',
    company: 'Wildcard',
    role: 'Founding Engineer',
  },
  {
    slug: 'zenbu',
    company: 'Zenbu',
    role: 'Open Source Contributor',
  },
  {
    slug: 'dawnguard',
    company: 'Dawnguard',
    role: 'Medior Software Engineer, Full Stack',
  },
  {
    slug: 'precisely',
    company: 'Precisely',
    role: 'Associate Software Engineer, MDM',
  },
  {
    slug: 'conductor',
    company: 'Conductor',
    role: 'Software Engineer',
  },
  {
    slug: 'qfex',
    company: 'QFEX',
    role: 'Backend Engineer',
  },
  {
    slug: 'prohostai',
    company: 'ProhostAI',
    role: 'Founding Engineer, Full Stack',
  },
  {
    slug: 'the-company-company',
    company: 'The Company Company',
    role: 'Founding Engineer',
  },
  {
    slug: 'happyrobot',
    company: 'HappyRobot',
    role: 'Forward Deployed Engineer',
  },
  {
    slug: 'itmsc',
    company: 'ITMSC',
    role: 'Software Developer',
  },
  {
    slug: 'ifindtech-oslo',
    company: 'iFindTech (Oslo AI Fintech Client)',
    role: 'Full Stack Engineer, AI',
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
    if (slug === 'dili') {
      const { diliOutreach } = await import('./dili')
      return diliOutreach
    }
    if (slug === 'artemis') {
      const { artemisOutreach } = await import('./artemis')
      return artemisOutreach
    }
    if (slug === 'texagon') {
      const { texagonOutreach } = await import('./texagon')
      return texagonOutreach
    }
    if (slug === 'bloomy') {
      const { bloomyOutreach } = await import('./bloomy')
      return bloomyOutreach
    }
    if (slug === 'oneleet') {
      const { oneleetOutreach } = await import('./oneleet')
      return oneleetOutreach
    }
    if (slug === 'wildcard') {
      const { wildcardOutreach } = await import('./wildcard')
      return wildcardOutreach
    }
    if (slug === 'zenbu') {
      const { zenbuOutreach } = await import('./zenbu')
      return zenbuOutreach
    }
    if (slug === 'dawnguard') {
      const { dawnguardOutreach } = await import('./dawnguard')
      return dawnguardOutreach
    }
    if (slug === 'precisely') {
      const { preciselyOutreach } = await import('./precisely')
      return preciselyOutreach
    }
    if (slug === 'conductor') {
      const { conductorOutreach } = await import('./conductor')
      return conductorOutreach
    }
    if (slug === 'qfex') {
      const { qfexOutreach } = await import('./qfex')
      return qfexOutreach
    }
    if (slug === 'prohostai') {
      const { prohostaiOutreach } = await import('./prohostai')
      return prohostaiOutreach
    }
    if (slug === 'the-company-company') {
      const { theCompanyCompanyOutreach } = await import('./thecompanycompany')
      return theCompanyCompanyOutreach
    }
    if (slug === 'happyrobot') {
      const { happyrobotOutreach } = await import('./happyrobot')
      return happyrobotOutreach
    }
    if (slug === 'itmsc') {
      const { itmscOutreach } = await import('./itmsc')
      return itmscOutreach
    }
    if (slug === 'ifindtech-oslo') {
      const { ifindtechOsloOutreach } = await import('./ifindtech-oslo')
      return ifindtechOsloOutreach
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
