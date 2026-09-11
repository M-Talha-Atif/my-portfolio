import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Founding%20Engineer%20-%20Talha%20Atif%20(ProhostAI)'

export const prohostaiOutreach: OutreachPage = {
  slug: 'prohostai',

  company: {
    name: 'ProhostAI',
    role: 'Founding Engineer, Full Stack',
  },

  hero: {
    headline: 'I already shipped an AI powered feature end to end, React and TypeScript frontend, Python backend, RabbitMQ decoupling the AI inference from the core app, the same shape ProhostAI\'s stack runs on.',
    subtext: 'A technical introduction prepared specifically for ProhostAI, based on the live Founding Engineer, Full Stack posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['RabbitMQ and Python backend, already shipped', 'React and TypeScript frontend, production', 'One honest note on location, upfront'],

  keyStats: [
    { value: '9', label: 'Merged PRs on an AI agent observability tool' },
    { value: '0', label: 'Downtime during a live AWS to Fly.io migration' },
    { value: '2+', label: 'Years across React, TypeScript, Python, and AWS' },
  ],

  whatYouAreSolving: {
    points: [
      'Owning both ends of the stack, Python backend services and a React and TypeScript frontend, for a product hosts actually depend on to run their business',
      'Shipping AI and LLM powered features that feel delightful throughout the product, not bolted on as an afterthought',
      'Being one of a small founding team, where **speed and product judgment matter as much as raw code**',
    ],
  },

  relevantEvidence: {
    intro:
      "ProhostAI's mission, making every host a 5 star host through AI, is the kind of problem that only works if the AI features are genuinely reliable, not just a demo. I have already shipped an AI feature that had to hold up in production, not just in a pitch.",
    companyProblem:
      'The role wants 2+ years on the front end with React, TypeScript, and PWAs, 2+ years on the back end with Python, RabbitMQ, and microservices, AI/LLM powered features throughout the product, and comfort with AWS, Docker, Postgres, Redis, and NoSQL.',
    myExperience:
      'I built Moodly\'s AI inference pipeline solo end to end, FastAPI, Hugging Face models, and a **RabbitMQ pipeline decoupling AI inference from the core booking engine** so one slow inference call never blocked the rest of the app. On the web side, I shipped production React and Next.js frontends on Postgres backed platforms, including a Kafka based microservices architecture at Intimec. I led a zero downtime migration from AWS to Fly.io on a live platform, and Claude and GitHub Copilot are daily tools, the same category of LLM tooling this role asks engineers to build with.',
    overlap:
      '**Direct overlap on Python, RabbitMQ, microservices, React, TypeScript, Postgres, Redis, and AI powered feature work already shipped in production.** One honest note. I am currently based in Lahore, Pakistan, not the US, and this role is hybrid in San Francisco. The posting says sponsorship is available, which is promising, but I do not have a settled answer yet on relocation timing.',
    projectImage: '/moodlyProject/hero/moodly-hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/moodly',
  },

  realDecision: {
    problem:
      'Running AI model inference synchronously inside the main request path meant one slow inference call could stall the flow for every user, not just the one waiting on it.',
    decision:
      'Decoupled AI inference into its own service behind a RabbitMQ queue, so the core app published a job and moved on instead of blocking on the model.',
    tradeoff:
      'Added the operational overhead of running and monitoring a queue and a worker service, in exchange for a core flow that never waits on a model, even when inference is slow.',
    result:
      '**AI powered features shipped without ever blocking the core product**, the same pattern a host facing product needs once AI starts showing up throughout the experience.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it lines up closely with what a small founding team shipping AI features actually needs.',
    traits: [
      {
        trait: 'Ships AI features without breaking the core product',
        description:
          'Decoupled AI inference behind a RabbitMQ queue so a slow model call never blocked the main app, the exact pattern needed once AI features run throughout a product.',
      },
      {
        trait: 'Full stack across the whole ask',
        description:
          'Production experience spans React and TypeScript frontends, Python backend services, Postgres, Redis, and Kafka based microservices, matching this role\'s stack directly.',
      },
      {
        trait: 'Builds with LLM tooling daily, not occasionally',
        description:
          'Claude and GitHub Copilot are daily tools, and I contribute to OpenTracer, an AI agent observability platform, with 9 merged pull requests.',
      },
      {
        trait: 'Comfortable owning infrastructure, not just app code',
        description:
          'Led a zero downtime migration from AWS to Fly.io on a live platform, reworking infrastructure, CI/CD, and DNS while the service stayed up.',
      },
      {
        trait: 'Small team, product minded',
        description:
          'Built the entitlement rule engine and access portal from zero on a 2 person team, and translated backend tradeoffs directly for a non technical CEO.',
      },
      {
        trait: 'Honest about the one real gap',
        description:
          'Named the San Francisco hybrid location and current relocation timeline directly on this page rather than letting it surface later.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'CEO / CTO Conversation',
      message: 'Skip straight to that conversation. Talk to me directly about the AI feature and full stack work I have already shipped.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Take-home or Real Problem',
      message: 'Give me a real product problem or take-home and see how fast I actually move.',
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

  relevantProjects: ['moodly', 'intimec'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      'I want to name one thing plainly. **I am currently based in Lahore, Pakistan, not the US, and this role is hybrid in San Francisco.** Sponsorship being available is genuinely promising, but I do not have a settled relocation timeline yet. What I can say honestly is that the AI feature shipping, the full stack React, TypeScript, and Python work, and the infrastructure ownership behind this page are already real and already built.',
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
    title: 'Talha Atif -> ProhostAI (Founding Engineer, Full Stack)',
    description: 'A technical introduction prepared for ProhostAI, built around a shipped AI inference pipeline, RabbitMQ, and full stack React, TypeScript, and Python overlap.',
  },
}
