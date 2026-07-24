import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Full%20Stack%20Engineer%20-%20Talha%20Atif%20(Vendra)'

export const vendraOutreach: OutreachPage = {
  slug: 'vendra',

  company: {
    name: 'Vendra',
    role: 'Full Stack Engineer',
  },

  hero: {
    headline: 'Full-stack engineering for a manufacturing platform that has to get sourcing right.',
    subtext: 'A short technical introduction prepared specifically for Vendra, based on the Full Stack Engineer (Security and Cloud) posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  whatYouAreSolving: {
    points: [
      'Building the frontend, backend, APIs, and data systems behind an RFQ-to-delivery sourcing platform for aerospace and defense hardware teams',
      'Keeping a fast-moving, high-ownership engineering surface reliable while the company scales past its first enterprise customers',
      'Bringing AI workflows into a process that used to run on manual quoting and spreadsheets',
    ],
  },

  relevantEvidence: {
    intro:
      "Vendra is automating something that used to be a slow, manual RFQ process for hardware teams. That's the same shape of problem I keep running into: replacing an ad hoc manual process with a structured, auditable system without losing the trust that made the manual process work in the first place.",
    companyProblem:
      "Vendra's Full Stack role spans frontend, backend, APIs, data systems, infrastructure, and AI workflows, with real ownership expected from day one.",
    myExperience:
      'At Intimec I built an access request system from scratch, tile catalog, cart, multi-user requests, department scoping, as the sole owner on a 2-person engineering team, and separately built an AI inference pipeline (Moodly) end to end, from data model to deployed mobile UI.',
    overlap:
      "Direct experience owning a full product surface end to end, plus backend work with Java/Spring Boot, Node.js, PostgreSQL, and REST APIs. I haven't touched ITAR or defense-specific compliance work, so I want to be upfront about that rather than imply otherwise.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Employees needed a self-service way to request access to internal tools, but a partial failure mid-cart could leave a multi-item request half-finished and corrupt.',
    decision:
      'Designed cart operations as transactional units, so a failure partway through never left the system in a half-finished state.',
    tradeoff:
      'More upfront complexity in the transaction boundaries compared to a simpler per-item write, in exchange for never having to reconcile corrupted requests later.',
    result:
      'A working self-service system the company still uses for all access management, with no data-integrity incidents since launch.',
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
        trait: 'Working through ambiguity',
        description:
          'The entitlement rule engine had no existing spec. I designed the grouped condition evaluation model myself and iterated as multi-group edge cases surfaced.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Every architecture call I make names the trade-off accepted: transactional cart writes over simpler per-item writes, gRPC over REST for synchronous paths, alias-based reindexing over a maintenance-window rebuild.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) using Hugging Face models with async processing, and use LangGraph and CrewAI in personal exploration outside of work.',
      },
      {
        trait: 'Communication',
        description:
          'Authored onboarding documentation for a previously undocumented codebase and translated backend trade-offs directly for a non-technical CEO on product decisions.',
      },
      {
        trait: 'Startup execution',
        description:
          'Owned an enterprise IAM platform from scratch on a 2-person engineering team, shipped a live production social platform, and built two AI-integrated products solo, requirements through deployment.',
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

  relevantProjects: ['intimec', 'moodly'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "I'm not claiming ITAR-cleared or defense-compliance experience, and I'd rather say that directly than let it come up later. But if there's non-restricted engineering work, on the platform, integrations, or AI workflows, where a remote full-stack engineer could help, I'd welcome a short conversation.",
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
    title: 'Talha Atif -> Vendra (Full Stack Engineer)',
    description: "A technical introduction prepared for Vendra's Full Stack Engineer role.",
  },
}
