import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Full%20Stack%20Engineer%20-%20Talha%20Atif%20(Dawnguard)'

export const dawnguardOutreach: OutreachPage = {
  slug: 'dawnguard',

  company: {
    name: 'Dawnguard',
    role: 'Medior Software Engineer, Full Stack',
  },

  hero: {
    headline: 'I have already lived what shift left security looks like from the inside, an access decision that has to be **explainable after the fact**, not just fast.',
    subtext: 'A technical introduction prepared specifically for Dawnguard, based on the live Medior Software Engineer, Full Stack posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Security-by-design experience, real', 'TypeScript + NestJS/Express match', '4 honest gaps named directly'],

  keyStats: [
    { value: '2+', label: 'Years experience vs 3-5 asked' },
    { value: '4', label: 'Honest gaps named directly' },
    { value: '0', label: 'PII exposure after audit refactor' },
  ],

  whatYouAreSolving: {
    points: [
      'Embedding security into system architecture **before a single line of code is written**, validating design and generating production ready Infrastructure as Code across AWS, Azure, and GCP',
      'Building stable, typed APIs and frontends on top of NoSQL data transformations that a small full stack team owns end to end',
      'Using AI agents to write **secure, stable, and maintainable TypeScript**, not just to move faster, but to move faster without cutting corners on the thing you are actually selling',
    ],
  },

  relevantEvidence: {
    intro:
      "Dawnguard's pitch is that security should be proactive and built into architecture before code exists, not bolted on afterward. That claim holds up best when the people building it have already worked somewhere security and auditability were a real, day to day requirement, not a slide in a pitch deck.",
    companyProblem:
      'The role spans **TypeScript APIs** the frontend depends on, performant data transformations for a NoSQL database, **Pulumi Infrastructure as Code** for customer environments, CI/CD and Docker, and an **Angular frontend** translating product designs into working screens, all inside a small core team.',
    myExperience:
      'At Intimec I owned an enterprise Identity Governance and Access Management platform end to end, including the **Next.js and TypeScript** operational UI, a **Kafka based event driven approval pipeline** with dead letter queues, and an **audit log schema I refactored to remove personal data** while preserving forensic traceability. Separately, I built Moodly\'s backend in **NestJS** with an async RabbitMQ pipeline. Claude and GitHub Copilot are daily tools for me, not occasional ones.',
    overlap:
      '**Direct overlap on TypeScript, NestJS and Express style backend services**, event driven design, and daily AI assisted engineering. **Four honest gaps named directly.** My frontend production experience is in React and Next.js, not Angular. My infrastructure as code exposure has been lighter touch than owning a Pulumi codebase directly. I am at two plus years of experience against the three to five this posting asks for. And I do not currently hold independent EU work authorization, which this posting requires.',
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Audit logs contained raw personal identity data directly, creating real compliance exposure the moment anyone reviewed the schema closely.',
    decision:
      'Refactored the audit schema to reference identity IDs and operation metadata instead of raw personal data, rather than stripping out detail an investigator would actually need later.',
    tradeoff:
      'Removing personal data outright would have been faster but would have broken forensic traceability during a real investigation. Keeping raw personal data was the easy path but left exactly the exposure a real security review would flag.',
    result:
      '**Restored compliance alignment while preserving the audit detail** needed for investigation, the same proactive, security first thinking Dawnguard embeds into architecture before code is written.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it lines up closely with the values Dawnguard states directly.',
    traits: [
      {
        trait: 'Security by design, not bolted on',
        description:
          'Refactored a PII exposed audit schema to remove personal data while preserving full forensic traceability, treating compliance and usefulness as compatible rather than opposed.',
      },
      {
        trait: 'Event driven systems at real scale',
        description:
          'Built a Kafka based approval pipeline with dead letter queues for failure recovery, and a separate async RabbitMQ pipeline decoupling AI inference from a booking engine.',
      },
      {
        trait: 'Direct, low ego communication',
        description:
          'Translated backend trade offs directly for a non technical CEO on product decisions, and prefer direct language over hedged claims, the same honesty Dawnguard says it values even when it is hard.',
      },
      {
        trait: 'Daily AI-native workflow',
        description:
          'Claude and GitHub Copilot are how I build, every day, the same approach Dawnguard wants applied to writing secure, stable, maintainable TypeScript.',
      },
      {
        trait: 'Ownership without a spec',
        description:
          'Built the entitlement rule engine and access portal from zero on a two person team, with no existing spec to inherit and no one else to hand the hard decisions to.',
      },
      {
        trait: 'Honest about real gaps',
        description:
          'Named the Angular, Pulumi, seniority, and work authorization gaps directly on this page rather than glossing over them, the same honesty Dawnguard says it values even when it is hard.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the take-home. Give me a technical conversation about the security and event driven systems I have already built.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real ticket or a live coding session in an AI-assisted development environment.',
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
      'I want to name four things plainly rather than gloss over them. **My frontend production experience is in React and Next.js, not Angular.** My infrastructure as code exposure has been lighter touch than owning a Pulumi codebase directly. I am at two plus years of experience against the three to five you are looking for. **And I do not currently hold independent EU work authorization**, which this posting requires. What I can say honestly is that the underlying problem, security built into a system before code exists, is one I have already lived on a compliance heavy platform, and I pick up new frameworks quickly.',
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
    title: 'Talha Atif -> Dawnguard (Full Stack Engineer)',
    description: "A technical introduction prepared for Dawnguard's Medior Software Engineer, Full Stack role.",
  },
}
