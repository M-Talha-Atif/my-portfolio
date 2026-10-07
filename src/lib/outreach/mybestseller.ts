import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20and%20Integrations%20Engineer%20-%20Talha%20Atif%20(Mybestseller)'

export const mybestsellerOutreach: OutreachPage = {
  slug: 'mybestseller',

  company: {
    name: 'Mybestseller',
    role: 'Backend and Integrations Engineer (informational)',
  },

  hero: {
    headline: 'Backend integrations that help **every white-label partner launch their own publishing shop faster**.',
    subtext:
      'A short technical introduction prepared specifically for Mybestseller, after reading about the self-publishing platform and its private-label model for bookstores, publishers and universities.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Async batch engine for 5,000+ items with progress', 'Event pipelines that never silently drop work', 'gRPC migration cutting latency by 50%'],

  keyStats: [
    { value: '2010', label: 'Year Mijnbestseller launched' },
    { value: '5,000+', label: 'Users per operation in my async batch engine' },
    { value: '0', label: 'Events silently lost in my approval pipelines' },
    { value: '50%', label: 'Lower inter-service latency after REST to gRPC' },
  ],

  whatYouAreSolving: {
    points: [
      'Standing out against **KDP, IngramSpark and Lulu** through the white-label model, where partners run their own branded shop on your platform',
      'Making it **fast to onboard a new partner**, with a clean API for catalog, orders and print fulfilment',
      'Making sure **no author order is lost or stuck** when a printer or payment service has a bad day',
    ],
  },

  relevantEvidence: {
    intro:
      "A white-label platform is only as good as its seams, the places where a partner's shop, your platform and a printer exchange orders. When one side is down, the order has to wait and not vanish.",
    companyProblem:
      "Mybestseller's edge is that partners **run their own publishing shop on one platform**, so partner onboarding and order reliability across systems decide how fast that model can grow.",
    myExperience:
      'At Intimec I built an **async batch engine for bulk operations on 5,000+ users**, with chunked processing, real-time progress and a failure reason for each item, on top of Kafka pipelines with dead-letter queues across 8+ microservices.',
    overlap:
      "**Transferable experience.** Importing a partner's catalog and moving orders between systems have the same needs, durable delivery, progress, retries and a record of what happened. **I haven't built e-commerce, print-on-demand or publishing systems**, so print fulfilment APIs would be new ground.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Synchronous bulk role assignment timed out above 500 users, and nobody could see which users had succeeded or failed.',
    decision:
      'Chunked async processing at 500 records per chunk, chosen after testing 100, 500 and 1000, with a job table recording progress so a crash resumes from the last completed chunk.',
    tradeoff:
      'More implementation complexity, a job table and chunk coordination, than a single bulk insert, in exchange for visibility and recoverability.',
    result:
      '**Operations that timed out now complete for 5,000+ users**, with real-time progress and a failure reason for each user.',
  },

  cultureFit: {
    intro: "None of this is a personality test. It's what actually happened on the projects I've worked on.",
    traits: [
      {
        trait: 'Ownership',
        description:
          'Built the Intimec Access Portal from scratch on a 2-person engineering team, and built Moodly and Memingo end to end alone.',
      },
      {
        trait: 'Reliability thinking',
        description:
          'Chose Kafka over REST for approval workflows because reliability mattered more than speed, and named the failure scenario it handles, a downstream service being down.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Split communication by need, gRPC for synchronous lookups and Kafka for events that can wait, instead of using one transport for everything.',
      },
      {
        trait: 'Partner-friendly engineering',
        description:
          'Wrote complete onboarding documentation for a codebase that had none, so the next engineer, or partner, gets started in hours.',
      },
      {
        trait: 'Communication',
        description:
          'Explained backend trade-offs directly to a non-technical CEO in plain language.',
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

  relevantProjects: ['intimec', 'memingo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This is a direct introduction rather than an application to a posted role. **I haven't built e-commerce, print-on-demand or publishing systems**, so that domain would be new ground. Reliable batch processing and event pipelines that never lose work are things I've shipped, and I'd welcome a conversation about where they could help Mybestseller's partners.",
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
    title: 'Talha Atif -> Mybestseller (Backend and Integrations Engineer)',
    description: 'A technical introduction prepared for Mybestseller, a self-publishing platform with a white-label model.',
  },
}
