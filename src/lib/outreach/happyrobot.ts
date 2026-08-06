import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Forward%20Deployed%20Engineer%20-%20Talha%20Atif%20(HappyRobot)'

export const happyrobotOutreach: OutreachPage = {
  slug: 'happyrobot',

  company: {
    name: 'HappyRobot',
    role: 'Forward Deployed Engineer',
  },

  hero: {
    headline: 'I have already sat in direct client meetings translating raw requirements into shipped features, and I use AI agent tooling daily, not just to code faster, but to orchestrate agents myself.',
    subtext: 'A technical introduction prepared specifically for HappyRobot, based on the live Forward Deployed Engineer posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Direct client facing engineering, real', 'Full stack across React, Node.js, Python', 'One honest note on voice AI, upfront'],

  keyStats: [
    { value: '9', label: 'Merged PRs on an AI agent observability tool' },
    { value: '3s → 700ms', label: 'Feed load time fixed across 4 real bottlenecks' },
    { value: '2', label: 'Person team, shipped a platform end to end' },
  ],

  whatYouAreSolving: {
    points: [
      'Sitting with customers from onboarding through ongoing usage, translating what they actually need into features that ship, not just a support ticket',
      'Building and tuning the AI layer itself, LLM prompting, voices, transcribers, so the agent actually improves as customers use it',
      'Managing integrations and APIs across third party systems so the AI agent fits into how a customer already runs their operations',
    ],
  },

  relevantEvidence: {
    intro:
      "HappyRobot's own manifesto bets on voice becoming a real interface for digital systems. That only works if the person building it can also sit with the customer and translate what they actually need, not just ship a feature in isolation.",
    companyProblem:
      'The role wants strong full stack across React, TypeScript, and Node.js, hands-on Python, experience building AI/ML applications including LLM prompting and tuning, API integration work, and the communication skills to work directly with customers under tight deadlines.',
    myExperience:
      'I started in direct client facing work, sitting in requirement meetings myself on early freelance projects, and that habit carried through, translating backend tradeoffs directly for a non technical CEO on product decisions. I build full stack with **React, TypeScript, Next.js, and NestJS**, and Python through FastAPI. I contribute to **OpenSRE, an AI agent observability platform**, with 9 merged pull requests, and I use LangGraph and CrewAI to orchestrate multiple agents together, alongside Claude and Copilot daily.',
    overlap:
      '**Direct overlap on full stack development, API integrations, customer facing communication, and daily AI agent tooling.** One honest note. My AI and ML experience is in using and orchestrating LLM tools and contributing to an observability platform around them, not in voice specific work like tuning transcribers or voices, or in Kubernetes, Rust, or PyTorch model training, which this posting also lists.',
    projectImage: '/cunocovoProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/cunocovo',
  },

  realDecision: {
    problem:
      'A social feed was taking 3 seconds to load, and users were already comparing it against fast consumer apps, not internal tools.',
    decision:
      'Traced the slowness across four separate layers one at a time, the query itself, missing indexes, oversized response payloads, and no caching, instead of guessing at a single fix.',
    tradeoff:
      'Fixing all four took longer than shipping one quick patch, but a single fix would have left the feed slow again the moment another layer became the new bottleneck.',
    result:
      '**Feed load time dropped from 3 seconds to 700 milliseconds**, the kind of iteration a customer facing product needs when the bar is set by consumer apps, not internal tools.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it lines up closely with what a forward deployed, customer facing engineering role actually needs.',
    traits: [
      {
        trait: 'Customer facing from day one',
        description:
          'Sat in direct client meetings on early freelance projects, and translated backend tradeoffs directly for a non technical CEO on product decisions.',
      },
      {
        trait: 'Iterates under real pressure',
        description:
          'Traced a 3 second feed load time across four separate bottlenecks, one at a time, and cut it to 700 milliseconds.',
      },
      {
        trait: 'Full stack across the exact ask',
        description:
          'Production experience across React, TypeScript, Next.js, NestJS, and Python through FastAPI, matching this role\'s stack directly.',
      },
      {
        trait: 'Builds and orchestrates AI agents, not just uses them',
        description:
          'Contributing to OpenSRE, an AI agent observability platform, with 9 merged pull requests, and using LangGraph and CrewAI to orchestrate multiple agents together.',
      },
      {
        trait: 'Manages integrations and APIs',
        description:
          'Worked across Kafka, gRPC, OpenSearch, and third party service integrations, keeping systems talking to each other reliably under load.',
      },
      {
        trait: 'Honest about the one real gap',
        description:
          'Named the voice specific AI work, and the Kubernetes, Rust, and PyTorch stack gap, directly on this page rather than glossing over them.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Conversation',
      message: 'Skip the formal process. Talk to me directly about the customer facing and AI tooling work I have already done.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real customer onboarding problem or integration to solve and see how fast I actually move.',
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

  relevantProjects: ['cunocovo', 'moodly'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      'I want to name one thing plainly. **My AI and ML experience is in using and orchestrating LLM tools, not in voice specific work like tuning transcribers, or in Kubernetes, Rust, and PyTorch model training**, which this posting also lists. What I can say honestly is that the full stack work, the customer facing habit, and the daily AI agent tooling behind this page are already real and already built, and I pick up new tools quickly when a customer needs it.',
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
    title: 'Talha Atif -> HappyRobot (Forward Deployed Engineer)',
    description: 'A technical introduction prepared for HappyRobot, built around customer facing engineering, full stack work, and hands on AI agent tooling, with the voice AI and deep ML stack gap named directly.',
  },
}
