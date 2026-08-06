import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Founding%20Engineer%20-%20Talha%20Atif%20(The%20Company%20Company)'

export const theCompanyCompanyOutreach: OutreachPage = {
  slug: 'the-company-company',

  company: {
    name: 'The Company Company',
    role: 'Founding Engineer',
  },

  hero: {
    headline: 'I already built a rule engine from scratch, grouped condition evaluation, CRON and event based scheduling, the same harness thinking this role needs for agent memory and actors.',
    subtext: 'A technical introduction prepared specifically for The Company Company, based on the live Founding Engineer posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Built a rule engine framework, from zero', 'AI agent observability contributor, real', 'One honest note on stack tools, upfront'],

  keyStats: [
    { value: '9', label: 'Merged PRs on an AI agent observability tool' },
    { value: '7', label: 'Categories of conditions in a rule engine I built' },
    { value: '2', label: 'Person team that shipped the platform end to end' },
  ],

  whatYouAreSolving: {
    points: [
      'Building the agent harness itself, memory, actors, integrations, permissions, and sandboxes, the infrastructure underneath the agent, not just a wrapper around an API call',
      'Keeping strict typing and clean abstractions intact as the system grows complex enough to run real companies',
      'Shipping end to end fast enough that **the agent can review its own pull requests and ship changes to itself**',
    ],
  },

  relevantEvidence: {
    intro:
      "The last agent your company will ever need is a strong claim, and it only holds up if the harness underneath it, memory, actors, permissions, sandboxes, is built with the same rigor as the agent itself. I have already built that kind of system, just not called an agent yet.",
    companyProblem:
      'The role wants production ready distributed backend systems, strong TypeScript with a willingness to learn Effect-TS, strict typing and clean abstractions, a track record of shipping end to end, and a real passion for AI, ideally with agent, runtime, or harness experience already.',
    myExperience:
      'At Intimec I designed a **generic rule based engine from scratch**, evaluating grouped conditions across 7 categories to assign roles, entitlements, and access items, driven by both CRON and event based scheduling, on top of a Kafka event driven pipeline with dead letter queues for failure isolation, all on a 2 person team with no existing spec to inherit. I use TypeScript daily across Next.js and NestJS, and I contribute to **OpenSRE, an AI agent observability platform**, with 9 merged pull requests, alongside using LangGraph and CrewAI to orchestrate multiple agents together.',
    overlap:
      '**Direct overlap on distributed backend systems, a self built rule engine framework, TypeScript, and hands on AI agent tooling.** One honest note. I have not worked with Effect-TS, Bun, Drizzle, or the rest of this specific stack yet, though I pick up new frameworks quickly and the posting itself only asks for willingness to learn Effect-TS, not mastery. This posting also lists Remote without a country restriction and offers sponsorship, so location may be less of an obstacle here than on some other roles, though I do not have that confirmed either way.',
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Synchronous REST calls between services meant one service going down broke the entire approval chain, with no replay and no audit trail once a message was lost.',
    decision:
      'Redesigned the pipeline around Kafka events for approval, rejection, and provisioning, with dead letter queues isolating individual failures instead of letting them cascade through the chain.',
    tradeoff:
      'Chose reliability and failure isolation over raw latency, since a permissions and approval system is reliability sensitive, not latency sensitive, the same tradeoff a durable actor runtime has to make.',
    result:
      '**Approval workflows now survive individual service downtime**, failures caught and replayable instead of silently lost, the same durability a harness running real company operations needs.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it maps closely to what building the harness underneath an agent actually needs.',
    traits: [
      {
        trait: 'Builds the harness, not just the feature',
        description:
          'Designed a generic rule engine from scratch, evaluating grouped conditions across 7 categories, driven by CRON and event based scheduling, with no existing spec to inherit.',
      },
      {
        trait: 'Distributed systems that survive failure',
        description:
          'Redesigned an approval pipeline around Kafka events with dead letter queues, so one service failing never took down the whole chain.',
      },
      {
        trait: 'Lives inside AI agent tooling daily',
        description:
          'Claude, Copilot, and Cursor are daily tools, I contribute to OpenSRE with 9 merged pull requests, and I use LangGraph and CrewAI to orchestrate multiple agents together.',
      },
      {
        trait: 'Strong TypeScript across the stack',
        description:
          'TypeScript daily across Next.js and NestJS, with a working habit of strict typing and clean abstractions rather than loose, ad hoc types.',
      },
      {
        trait: 'Ships end to end, solo when needed',
        description:
          'Built Moodly end to end solo, AI pipeline included, and owned the Intimec platform on a 2 person team with no one else to hand the hard calls to.',
      },
      {
        trait: 'Honest about the one real gap',
        description:
          'Named the Effect-TS, Bun, and Drizzle gap directly on this page rather than overstating familiarity with a stack I have not used yet.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Conversation',
      message: 'Skip the formal process. Talk to me directly about the rule engine and distributed systems work I have already built.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real piece of the harness or actor runtime and see how fast I actually move.',
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
      'I want to name one thing plainly. **I have not worked with Effect-TS, Bun, or Drizzle yet, and the rest of this specific stack is new to me.** What I can say honestly is that the underlying skill, building a strictly typed distributed system from scratch with no existing spec to lean on, is one I have already done, and I pick up new frameworks quickly when the problem demands it.',
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
    title: 'Talha Atif -> The Company Company (Founding Engineer)',
    description: 'A technical introduction prepared for The Company Company, built around a self built rule engine, distributed systems work, and hands on AI agent tooling.',
  },
}
