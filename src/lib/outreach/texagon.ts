import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Jr.%20Software%20Engineer%20-%20Talha%20Atif%20(Texagon)'

export const texagonOutreach: OutreachPage = {
  slug: 'texagon',

  company: {
    name: 'Texagon',
    role: 'Jr. Software Engineer',
  },

  hero: {
    headline: 'A Junior Software Engineer based in Pakistan, exactly the profile you posted for.',
    subtext: "A short introduction prepared for Muhammad Ahmed's post about the Jr. Software Engineer opening at Texagon (Tech Finds Tech).",
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  whatYouAreSolving: {
    points: [
      'A fully remote Jr. Software Engineer role, fresh graduate to 1 year of experience, Pakistan-based, no relocation or timezone mismatch to manage',
      'Real production experience already, not just coursework, without an inflated seniority ask',
      'Full-stack coverage: Java/Spring Boot and Node.js on the backend, React on the front end',
    ],
  },

  relevantEvidence: {
    intro:
      "Most \"Jr. Software Engineer, remote, Pakistan\" posts get flooded with generic applicants. I wanted to make it easy to see actual evidence instead of just a resume line.",
    companyProblem:
      'Texagon (hiring via Tech Finds Tech) is looking for a Jr. Software Engineer, fresh graduate to 1 year of experience, fully remote, Pakistan-based.',
    myExperience:
      'At Intimec I built an enterprise access-management platform end to end on a 2-person team (Java, Spring Boot, Kafka, PostgreSQL), and separately shipped production features at Digital Upgraders using Node.js and React, including a 77% latency reduction on a core feed API.',
    overlap:
      "Directly within the fresh-grad-to-1-year band you're hiring for, already comfortable with Java/Spring Boot and Node/React specifically, not a stretch pitch.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem: 'Feed API took 3 seconds to load, causing visible user drop-off.',
    decision:
      'Profiled the query with EXPLAIN ANALYZE and fixed four separate issues instead of guessing at one: missing index, unused DTO fields, no caching, unoptimized query structure.',
    tradeoff:
      'Took longer upfront than shipping one quick fix, in exchange for actually solving the problem instead of masking a single symptom.',
    result: '3 seconds down to 700ms, a 77% reduction.',
  },

  cultureFit: {
    intro:
      "None of this is a personality test. It's what actually happened on the last two teams I worked with.",
    traits: [
      {
        trait: 'Ownership',
        description:
          "Built the Intimec Access Portal end to end, tile catalog through provisioning, as the owner, not a contributor to someone else's design, on a 2-person engineering team.",
      },
      {
        trait: 'Debugging discipline',
        description:
          'Fixed the feed API by profiling first and finding four separate bottlenecks, rather than applying one fix and calling it done.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Every architecture call I make names the trade-off accepted: composite indexing and caching over a quick patch, gRPC over REST for synchronous paths.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) with FastAPI and Hugging Face models, and use Claude, Copilot, and Cursor as daily engineering tools.',
      },
      {
        trait: 'Communication',
        description:
          'Authored onboarding documentation for a previously undocumented codebase and translated backend trade-offs directly for a non-technical CEO on product decisions.',
      },
      {
        trait: 'Learning speed',
        description:
          'Reverse-engineered a codebase with no setup guide and no seed data from configuration files alone, then wrote the onboarding docs so the next engineer would not repeat the same friction.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the take-home. Give me a short technical interview and evaluate me directly.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real hands-on assignment or live coding session.',
      ctaLabel: 'Test my skills',
      ctaTarget: CONTACT_MAILTO,
    },
    {
      tier: 'Bronze',
      title: 'Traditional Process',
      message: 'Take me through the normal interview process.',
      ctaLabel: 'Start the process',
      ctaTarget: CONTACT_MAILTO,
    },
  ],

  relevantProjects: ['intimec', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This role is exactly the band I'm looking for right now, fresh-grad-to-1-year, remote, Pakistan-based, not a stretch pitch in either direction. Happy to talk whenever works.",
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
    title: 'Talha Atif -> Texagon (Jr. Software Engineer)',
    description: 'A short introduction prepared for the Jr. Software Engineer opening at Texagon.',
  },
}
