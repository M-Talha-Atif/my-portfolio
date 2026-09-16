import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Full%20Stack%20Engineer%2C%20AI%20-%20Talha%20Atif%20(Oslo%20Client)'

export const ifindtechOsloOutreach: OutreachPage = {
  slug: 'ifindtech-oslo',

  company: {
    name: 'iFindTech (Oslo AI Fintech Client)',
    role: 'Full Stack Engineer, AI',
  },

  hero: {
    headline: 'You listed TypeScript, React, Next.js, Node.js, PostgreSQL, Redis, and LLM orchestration as one stack. That is close to exactly what I have already shipped in production.',
    subtext: 'A technical introduction prepared specifically for the Oslo AI fintech role shared by iFindTech.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Production TypeScript, React, Next.js, Node.js', 'PostgreSQL and Redis in production, not a demo', 'Hands-on LLM agent orchestration, honestly labeled'],

  keyStats: [
    { value: '15,000', label: 'Employee scale, real production system' },
    { value: '88%', label: 'Recommendation latency cut with Redis caching' },
    { value: '50%', label: 'Inter-service latency cut, REST to gRPC' },
  ],

  whatYouAreSolving: {
    points: [
      'Owning **frontend, APIs, and the data layer end to end** for a small, fast-moving team, not one narrow slice of the stack',
      'Getting genuinely hands-on with **LLM powered workflows**, agents, tool calling, streaming, and orchestration, rather than a single chatbot wrapper bolted onto a form',
      'Running **PostgreSQL and Redis in production** reliably, on infrastructure that a small team can actually operate without a dedicated platform group',
    ],
  },

  relevantEvidence: {
    intro:
      "An AI-native platform automating complex financial workflows lives or dies on the same thing an Identity Governance platform does, a single source of truth that has to stay correct under real load and real compliance pressure. That is the exact shape of problem my production experience is in.",
    companyProblem:
      'The role wants strong TypeScript, React, and Node.js, production Next.js and Express experience, hands-on LLM and AI development, full stack comfort, and ownership, with cloud infrastructure, Redis, or fintech experience called out as a bonus, not a requirement.',
    myExperience:
      'On GovHub, a municipal HR platform for 15,000 employees, I built the **NestJS backend and Next.js 14 admin panel in TypeScript end to end**, on **PostgreSQL through Prisma**, with **Redis backing BullMQ** for async job processing, Dockerized and deployed through GitHub Actions CI/CD. On Moodly I used **Redis to pre-compute and cache AI-driven recommendations**, cutting response latency from 3.2s to 380ms. On Intimec I migrated synchronous REST calls to gRPC across core services, cutting inter-service latency by 50%. On the LLM side, I actively build multi-step agent workflows with **LangGraph and CrewAI**, exploring tool use, state, and orchestration, and I use **Claude Code daily as a structured, tool-using part of my own engineering workflow**, planning task boundaries up front and verifying every generated step before it ships.',
    overlap:
      '**Direct overlap on TypeScript, React, Next.js, Node.js, PostgreSQL, Redis, Docker, and CI/CD.** **Two honest notes.** My LangGraph and CrewAI agent work is personal exploration, not a production system I have shipped, so I would be learning production LLM orchestration patterns on the job, quickly, not arriving with them already proven. And per the stack list, I have not owned **Terraform or infrastructure as code** in production, my infrastructure experience is Docker and CI/CD rather than provisioning cloud infrastructure declaratively.',
    projectImage: '/jbmarksProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/jb-marks-govhub',
  },

  realDecision: {
    problem:
      "Moodly's mood-based recommendation endpoint queried the database on every request, adding latency exactly where a first impression mattered most.",
    decision:
      'Pre-computed mood-to-experience mappings and cached them in Redis with a 5-minute TTL, explicitly invalidated whenever the underlying experience data changed, instead of hitting the database on every read.',
    tradeoff:
      'A cache adds invalidation complexity and a small staleness window that a direct query never has. That cost was worth paying once the read path itself, not the database schema, was the bottleneck.',
    result:
      'Recommendation latency dropped from 3.2 seconds to 380 milliseconds, an 88 percent improvement.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it maps closely to a small team wanting real ownership across frontend, backend, and AI.',
    traits: [
      {
        trait: 'Genuinely full stack in TypeScript',
        description:
          'Owned NestJS backends and Next.js frontends end to end on the same project, not a frontend specialist who can also write an API route.',
      },
      {
        trait: 'Redis and PostgreSQL as daily production tools',
        description:
          'Redis-backed caching and job queues, PostgreSQL through Prisma with migration validation gated in CI, used to solve real latency and reliability problems, not just installed.',
      },
      {
        trait: 'LLM curious, honestly labeled',
        description:
          'Personal LangGraph and CrewAI agent workflows plus daily structured use of Claude Code as an engineering tool, named as exploration rather than overstated as shipped production LLM orchestration.',
      },
      {
        trait: 'Ownership under a small team, not a large org',
        description:
          'At HannSoft, owned independent client engagements end to end as the only engineer on each one, from data modeling through delivery.',
      },
      {
        trait: 'Direct communication',
        description:
          'Comfortable naming an honest gap, like Terraform or production LLM orchestration, directly instead of hoping it goes unnoticed.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: "Skip the resume screen. Let's talk about the TypeScript, Redis, and AI integration work above, and where I'd be learning fastest on the LLM orchestration side.",
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real ticket or a short technical exercise across the stack.',
      ctaLabel: 'Test my skills',
      ctaTarget: CONTACT_MAILTO,
    },
    {
      tier: 'Bronze',
      title: 'Traditional Process',
      message: 'Take me through the standard application and interview process.',
      ctaLabel: 'Start the process',
      ctaTarget: CONTACT_MAILTO,
    },
  ],

  relevantProjects: ['jb-marks-govhub', 'moodly', 'memingo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "Two things I want to name honestly rather than let a job description imply otherwise. My LLM and agent orchestration experience is real but comes from personal exploration with LangGraph and CrewAI, not a production system I have shipped. And I have not owned Terraform or infrastructure as code in production, my infrastructure experience is Docker and CI/CD. Everything else in the stack, TypeScript, React, Next.js, Node.js, PostgreSQL, and Redis, is production experience, not a study list.",
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
    title: 'Talha Atif -> Oslo AI Fintech (Full Stack Engineer, AI)',
    description: 'A technical introduction prepared for the Oslo AI fintech Full Stack Engineer role shared by iFindTech.',
  },
}
