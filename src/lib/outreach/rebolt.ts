import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20Engineer%20-%20Talha%20Atif%20(Rebolt)'

export const reboltOutreach: OutreachPage = {
  slug: 'rebolt',

  company: {
    name: 'Rebolt',
    role: 'Founding Backend Software Engineer',
  },

  hero: {
    headline: 'Backend engineering for an AI agent platform that builds real full-stack apps.',
    subtext: 'A short technical introduction prepared specifically for Rebolt, based on the Founding Backend Software Engineer posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  whatYouAreSolving: {
    points: [
      'Building an AI agent platform that turns a conversation into a deployed, custom full-stack application',
      'Working across Python/FastAPI and TypeScript/Next.js, backend, frontend, and the AI layer, as one of the first engineering hires',
      'Shaping the technical architecture and culture of a fast-moving, just-launched YC startup',
    ],
  },

  relevantEvidence: {
    intro:
      "Rebolt is letting people build their own internal tools by talking to an AI agent instead of stitching together a one-size-fits-all SaaS product. That's the same shape of problem I keep gravitating toward, taking something that used to require a dedicated engineering team and making it something one person can own end to end.",
    companyProblem:
      "Rebolt's Founding Backend role asks for 2+ years of backend experience, fluency in Python and TypeScript, and hands-on work with FastAPI and Next.js, building an AI agent platform from 0 to 1.",
    myExperience:
      'I built Moodly, an AI inference pipeline, solo end to end using FastAPI on the backend with async processing via RabbitMQ and Hugging Face models on the AI side, and separately built full products with Node.js and Next.js/React.',
    overlap:
      "Direct experience with Python/FastAPI and Node/TypeScript/Next.js, plus applied AI work with LangChain, LangGraph, and RAG. I haven't built a full agentic code-generation platform specifically, so that exact problem is new ground, but the underlying stack is a direct match.",
    projectImage: '/moodlyProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/moodly',
  },

  realDecision: {
    problem:
      'Synchronous, one-by-one role assignment timed out above 500 users, with no visibility into progress or failures.',
    decision:
      'Redesigned it as an async, Kafka-based batch engine with 500-record chunks, after testing 100, 500, and 1000 to find the sweet spot.',
    tradeoff:
      'More moving parts than a single bulk insert, in exchange for real progress tracking and the ability to resume from the last completed chunk instead of restarting from zero.',
    result:
      'Operations that previously timed out now complete for 5,000+ users, with real-time progress tracking and per-user failure reasons.',
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
          'Every architecture call I make names the trade-off accepted: chunked async processing over a single bulk insert, gRPC over REST for synchronous paths, alias-based reindexing over a maintenance-window rebuild.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) with FastAPI and Hugging Face models, and use LangGraph and CrewAI in personal exploration outside of work.',
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

  relevantProjects: ['moodly', 'intimec'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "I'm not claiming to have built an agentic code-generation platform before, that part would be new ground. But the backend and applied-AI stack underneath it is a direct match, and I'd welcome a conversation about where that does and doesn't transfer.",
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
    title: 'Talha Atif -> Rebolt (Founding Backend Software Engineer)',
    description: "A technical introduction prepared for Rebolt's Founding Backend Software Engineer role.",
  },
}
