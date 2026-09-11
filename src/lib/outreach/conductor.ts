import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Software%20Engineer%20-%20Talha%20Atif%20(Conductor)'

export const conductorOutreach: OutreachPage = {
  slug: 'conductor',

  company: {
    name: 'Conductor',
    role: 'Software Engineer',
  },

  hero: {
    headline: 'I already run several coding agents in parallel every day and contribute to an AI agent observability project. Conductor is the interface I have been missing.',
    subtext: 'A technical introduction prepared specifically for Conductor, based on the live Software Engineer opening.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Daily multi agent workflow, already lived', 'AI agent observability contributor', 'Honest note on location, upfront'],

  keyStats: [
    { value: '9', label: 'Merged PRs on an AI agent observability tool' },
    { value: '5+', label: 'Companies like Linear and Stripe using Conductor' },
    { value: '2', label: 'Person team, IAM platform owned end to end' },
  ],

  whatYouAreSolving: {
    points: [
      'Building the **human interface to AI organizations**, so one engineer can run a team of coding agents without losing track of what each one actually changed',
      'Making that parallelized workflow trustworthy, not just fast, the same problem an observability layer for AI agents has to solve',
      'Shipping this fast as a small, in person founding team, where **the corners you cut matter as much as the ones you do not**',
    ],
  },

  relevantEvidence: {
    intro:
      "Conductor's own users describe a huge amount of their work becoming wildly parallelized. I read that as recognizable, because running Claude, GitHub Copilot, and Cursor at once, and orchestrating multiple agents with LangGraph and CrewAI, is already how I work day to day.",
    companyProblem:
      'The role wants a developer who has built and scaled web applications at fast growing startups, someone who knows which corners to cut. Tech stack experience with TypeScript, Tauri, or React is explicitly not required, strong engineering judgment is.',
    myExperience:
      "Claude, Copilot, and Cursor are daily tools, not occasional ones, and I currently contribute to **OpenTracer (Tracer Cloud's opensre), an AI agent observability platform**, with 9 merged pull requests. At Intimec I owned an enterprise IAM platform end to end on a 2 person team, Java and Spring Boot backend, Next.js and TypeScript frontend, with no existing spec to inherit. I also built Moodly's AI inference pipeline solo, FastAPI, Hugging Face, RabbitMQ.",
    overlap:
      '**Direct overlap on daily multi agent workflows, AI agent observability, and full stack ownership on a small team shipping fast.** One honest note upfront. I am currently based in Lahore, Pakistan, and this role is in person in San Francisco. I do not have a settled answer on relocation yet, but wanted that on the table immediately rather than have it surface later.',
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Bulk role assignment jobs started failing once a team passed 500 users, with no clear signal yet on where the actual bottleneck was.',
    decision:
      'Tested chunk sizes directly against real load instead of guessing, then tuned Kafka consumer counts against the throughput ceiling that testing revealed.',
    tradeoff:
      'Smaller chunks added overhead per job, larger chunks let one slow record stall the whole batch. Picked the size the measurements actually supported, not a comfortable default.',
    result:
      '**Bulk operations now hold up well past 500 users**, tuned against a measured ceiling instead of a guess, the same instinct behind knowing which corners are safe to cut.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it maps closely to what a small, fast moving founding team actually needs.',
    traits: [
      {
        trait: 'Already lives in a multi agent workflow',
        description:
          'Claude, Copilot, and Cursor are daily tools, and I use LangGraph and CrewAI to orchestrate multiple agents together, not just to run one at a time.',
      },
      {
        trait: 'Builds the trust layer, not just the agent',
        description:
          'Contributing to OpenTracer, an AI agent observability platform, with 9 merged pull requests, the same discipline Conductor needs to make parallelized agent work trustworthy.',
      },
      {
        trait: 'Full stack ownership on a tiny team',
        description:
          'Owned the Intimec IGA platform end to end on a 2 person team, backend through frontend, with no existing spec to inherit and no one else to hand the hard calls to.',
      },
      {
        trait: 'Judges tradeoffs with data, not defaults',
        description:
          'Tested chunk sizes and Kafka consumer counts directly against real load rather than guessing, then picked the setting the numbers actually supported.',
      },
      {
        trait: 'Comfortable across the startup stages',
        description:
          'Startup experience spans an enterprise IAM platform, a fast moving social platform migration, and a solo AI product built from zero.',
      },
      {
        trait: 'Honest about real constraints, upfront',
        description:
          'Named the San Francisco in person requirement directly on this page rather than letting it surface later in a conversation.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Conversation',
      message: 'Skip the formal process. Talk to me directly about the multi agent workflows and observability work I already do daily.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real piece of the product to build and see how fast I actually move.',
      ctaLabel: 'Test my skills',
      ctaTarget: CONTACT_MAILTO,
    },
    {
      tier: 'Bronze',
      title: 'Traditional Process',
      message: 'Take me through whatever process you would normally run for this.',
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
      'I want to name one thing plainly. **I am currently based in Lahore, Pakistan, and this role is in person in San Francisco.** I do not have a settled answer on relocation yet, but I would rather say that directly than have it come up after the fact. What I can say honestly is that the daily multi agent workflow and the AI agent observability work behind this page are already real and already built.',
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
    title: 'Talha Atif -> Conductor (Software Engineer)',
    description: 'A technical introduction prepared for Conductor, built around daily multi agent workflows and AI agent observability contributions.',
  },
}
