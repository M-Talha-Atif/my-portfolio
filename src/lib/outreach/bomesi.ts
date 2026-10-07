import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Data%20and%20Platform%20Engineer%20-%20Talha%20Atif%20(BOMESI)'

export const bomesiOutreach: OutreachPage = {
  slug: 'bomesi',

  company: {
    name: 'BOMESI Collective',
    role: 'Data and Platform Engineer (informational)',
  },

  hero: {
    headline: 'Data engineering so every BOMESI member can **see how their inventory performs**, without an ad ops team.',
    subtext:
      'A short technical introduction prepared specifically for BOMESI Collective, after reading about the ecosystem, education and economic empowerment programs and the work to bring diverse-owned media into programmatic.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Zero-downtime OpenSearch migration of 5M+ documents', 'Analytics handling 100K+ logs per cycle', 'Bulk operations with per-item failure reasons'],

  keyStats: [
    { value: '300+', label: 'BOMESI community members' },
    { value: '4', label: 'Accelerator cohorts since 2023' },
    { value: '5M+', label: 'Documents I migrated with zero downtime' },
    { value: '100K+', label: 'Logs per cycle in the analytics I fixed' },
  ],

  whatYouAreSolving: {
    points: [
      'Helping **diverse-owned publishers get paid for their inventory** in programmatic, alongside efforts like Group Black with Magnite and Reset Digital',
      'Giving members **clear reporting on inventory and revenue**, without each one needing its own ad operations team',
      'Scaling mentorship, workshops and accelerator cohorts with **a member platform** that keeps up with 300+ members',
    ],
  },

  relevantEvidence: {
    intro:
      "Members can only act on numbers they can see and trust. Analytics that crash in production, or disagree between environments, are worse than no analytics, and I've had to fix exactly that.",
    companyProblem:
      'BOMESI connects publishers, brands and ad tech, so members need **trustworthy, readable data on inventory and performance** across many sources.',
    myExperience:
      'At Intimec, analytics queries worked locally but crashed in production because of **schema drift on a 5M+ document index**. I redesigned the mapping and migrated it with an **alias switch and zero downtime**, and analytics now handle **100K+ logs per cycle**.',
    overlap:
      "**Transferable experience.** Ad reporting and audit logging are both high-volume event data that has to stay queryable. **I haven't worked in ad tech or programmatic**, so SSPs, DSPs and ad server data formats would be new ground.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'A production OpenSearch index had mapping conflicts on high-cardinality fields that broke aggregation queries, and 5M+ documents had to move without downtime.',
    decision:
      'Built a new index with the correct mapping, reindexed in the background, verified it, then switched an alias atomically, instead of an in-place change that OpenSearch does not support.',
    tradeoff:
      'More steps and more careful verification, comparing document counts and query results before the cutover, versus a simple rebuild with a maintenance window.',
    result:
      '**5M+ documents migrated with zero downtime**, and if the reindex had failed, production traffic would have stayed on the old index untouched.',
  },

  cultureFit: {
    intro: "None of this is a personality test. It's what actually happened on the projects I've worked on.",
    traits: [
      {
        trait: 'Ownership',
        description:
          'Owned the OpenSearch diagnosis and migration end to end, from finding the schema drift to the verified cutover.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'For bulk operations I tested chunk sizes of 100, 500 and 1000 before choosing 500, and tested consumer counts of 1, 3 and 5, instead of guessing.',
      },
      {
        trait: 'Making data usable',
        description:
          'Precomputed an expensive leaderboard ahead of read time in Memingo, taking a 30 second response to 90ms, so the answer is there when people ask for it.',
      },
      {
        trait: 'Communication',
        description:
          'Explained backend trade-offs directly to a non-technical CEO and wrote onboarding documentation for a codebase that had none.',
      },
      {
        trait: 'Mission fit, shown not claimed',
        description:
          'I would rather show what I can build for members than say I care. The case study and projects below are the evidence.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the assignment. Give me a 1-hour technical interview and evaluate me directly.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real hands-on assignment or live coding session in an AI-assisted development environment.',
      ctaLabel: 'Test my skills',
      ctaTarget: CONTACT_MAILTO,
    },
    {
      tier: 'Bronze',
      title: 'Traditional Process',
      message: 'Take me through the traditional interview process.',
      ctaLabel: 'Start the process',
      ctaTarget: CONTACT_MAILTO,
    },
  ],

  relevantProjects: ['intimec', 'memingo', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This is a direct introduction rather than an application to a posted role. **I haven't worked in ad tech or programmatic advertising**, so that part would be new ground. Analytics that stay correct at volume and migrations that never take the product down are things I've shipped, and I'd welcome a conversation about where they could help BOMESI members.",
    scheduleCtaLabel: 'Book a call directly',
    scheduleCtaTarget: '#schedule',
    emailCtaLabel: 'Email me directly',
    emailCtaTarget: CONTACT_MAILTO,
  },

  backToPortfolio: {
    label: "← Back to Talha's portfolio",
    href: '/',
  },

  metadata: {
    title: 'Talha Atif -> BOMESI Collective (Data and Platform Engineer)',
    description: 'A technical introduction prepared for BOMESI Collective, a community advancing diverse-owned media.',
  },
}
