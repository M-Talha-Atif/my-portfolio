import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20%2B%20Applied%20AI%20Engineer%20-%20Talha%20Atif%20(Inblick)'

export const inblickOutreach: OutreachPage = {
  slug: 'inblick',

  company: {
    name: 'Inblick',
    role: 'Backend / Applied AI Engineer',
  },

  hero: {
    headline: "Backend and applied-AI engineering for an insights platform built for people who **aren't data analysts**.",
    subtext: "A short technical introduction prepared specifically for Inblick, after seeing Andreas Kaltenbach's own call for full-stack developers who want to work more with AI.",
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Backend + Applied AI overlap', 'Auth/RBAC production experience', 'AI product built solo, end to end'],

  keyStats: [
    { value: '0', label: 'PII exposure after audit refactor' },
    { value: '3', label: 'Shipped together: backend, AI, auth' },
    { value: '1', label: 'AI pipeline built solo, end to end' },
  ],

  whatYouAreSolving: {
    points: [
      'Turning scattered organizational data, across schools, municipalities, and private companies, into **plain-language, auto-generated insights**',
      'Integrating **GPT-5 and Grok AI** into a production BI product alongside PhenixID login, admin controls, and Slack-delivered updates',
      'Building as a **small, founder-led team** where one engineer covers real ground across backend, AI integration, and infrastructure',
    ],
  },

  relevantEvidence: {
    intro:
      "Inblick is built on the idea that BI tools are boring and most people aren't data analysts, so the product does the analysis and hands back an answer in plain language instead. That's the same problem I keep circling with RAG and agentic workflows, making an AI-powered system trustworthy enough that a non-technical person can act on what it tells them.",
    companyProblem:
      'Inblick 1.1 shipped **GPT-5 and Grok AI-powered insights**, PhenixID login, and stronger admin controls, on a small, founder-led team.',
    myExperience:
      'I built Moodly, an AI inference pipeline, **solo end to end** with FastAPI and Hugging Face models, and separately built production backend systems handling **authentication, RBAC, and audit logging** (Java, Spring Security, JWT, OAuth 2.0) at Intimec.',
    overlap:
      "**Direct overlap with backend plus AI integration plus auth/admin-control work**, the same three things Inblick 1.1 shipped together. **I haven't worked with GPT-5, Grok, or PhenixID specifically**, so those exact integrations would be new ground, but the underlying pattern, wiring an LLM API into a product with real access control, is one I've built before.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Audit logs contained raw personal identity data, creating compliance risk for a system handling sensitive access records.',
    decision:
      'Refactored the audit schema to reference identity IDs and operation metadata instead of raw personal data.',
    tradeoff:
      "More indirection when reading a raw log entry, since resolving 'who did what' requires a join instead of reading a name directly, in exchange for real compliance safety.",
    result:
      '**Restored compliance alignment without losing the forensic detail** needed for investigation.',
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
          'Every architecture call I make names the trade-off accepted: PII-free audit references over raw identity data, gRPC over REST for synchronous paths, alias-based reindexing over a maintenance-window rebuild.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) using Hugging Face models with async processing, and use LangGraph and CrewAI in personal exploration, the same "make AI output trustworthy for non-experts" problem Inblick solves for schools and municipalities.',
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
      "**I haven't worked with GPT-5, Grok, or PhenixID specifically**, so I want to be upfront that part would be new ground. But the underlying pattern, wiring an LLM into a product non-experts can trust, plus the backend and auth discipline around it, is something I've built before, and I'd welcome a conversation about where that does and doesn't transfer.",
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
    title: 'Talha Atif -> Inblick (Backend / Applied AI Engineer)',
    description: 'A technical introduction prepared for Inblick, an AI-powered BI platform.',
  },
}
