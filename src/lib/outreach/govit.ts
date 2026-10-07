import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20Engineer%20-%20Talha%20Atif%20(govIT)'

export const govitOutreach: OutreachPage = {
  slug: 'govit',

  company: {
    name: 'govIT GmbH',
    role: 'Backend Engineer (informational)',
  },

  hero: {
    headline: 'Audit-safe backend engineering for **sovereign software that public agencies can trust**.',
    subtext:
      'A short technical introduction prepared specifically for govIT, after reading about SovereignDesk, the open source approach and the focus on digital sovereignty for German public administration.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['PII-free audit schema with full traceability', 'Compliance-critical bugs caught before production', 'LangGraph and RAG integrations'],

  keyStats: [
    { value: 'EUPL', label: 'Open source licence behind SovereignDesk' },
    { value: 'PII-free', label: 'Audit schema I built, with forensic traceability kept' },
    { value: '2', label: 'Compliance-critical bugs caught before production' },
    { value: '50%', label: 'Lower inter-service latency after REST to gRPC' },
  ],

  whatYouAreSolving: {
    points: [
      'Making **SovereignDesk the obvious choice** over openDesk and Microsoft setups, with AI agents that staff actually use every day',
      'Running AI features that meet public-sector expectations for **data sovereignty, auditability and European-only infrastructure**',
      'Fitting into the **systems municipalities already run**, so adoption does not mean a rip and replace',
    ],
  },

  relevantEvidence: {
    intro:
      "Public agencies buy software they can explain to an auditor. In that world, an audit trail that can't be trusted, or that exposes personal data, is a defect and not a footnote.",
    companyProblem:
      "govIT's customers need **AI and collaboration features that stay auditable, sovereign and explainable** to a public authority.",
    myExperience:
      'At Intimec I refactored an entire **audit log schema to remove PII while keeping full forensic traceability**, and I fixed a Spring AOP self-invocation bug that **silently skipped the audit advice** on some methods.',
    overlap:
      "**Direct match on audit and compliance design.** **I haven't worked inside German public administration, or with BSI IT-Grundschutz or C5 requirements**, so that compliance and procurement context would be new ground.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Spring AOP audit advice was silently not firing on certain methods, because they were called from inside the same bean and bypassed the proxy.',
    decision:
      'Extracted the audited methods into a separate Spring bean, a small targeted fix, instead of moving the whole codebase to AspectJ weaving.',
    tradeoff: 'Slightly more classes in the codebase, versus one consolidated service class.',
    result:
      '**The audit trail can no longer be skipped** by an internal detail of how a method is called, which matters because auditing was a compliance requirement.',
  },

  cultureFit: {
    intro: "None of this is a personality test. It's what actually happened on the projects I've worked on.",
    traits: [
      {
        trait: 'Compliance mindset',
        description:
          'Caught two compliance-critical bugs before production, a rule engine operator leak and a lost attribution in audit logs, by designing tests meant to break assumptions.',
      },
      {
        trait: 'Ownership',
        description:
          'Built the Intimec Access Portal from scratch on a 2-person engineering team and owned the audit infrastructure refactor.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI pipeline with FastAPI and Hugging Face models, and I use LangGraph, CrewAI and RAG in my own projects.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Every decision names its trade-off, including a small targeted fix over a large architectural change when the small fix solves the real problem.',
      },
      {
        trait: 'Documentation',
        description:
          'Wrote complete onboarding docs for a previously undocumented codebase, because documentation debt compounds.',
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

  relevantProjects: ['intimec', 'jb-marks-govhub', 'moodly'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This is a direct introduction rather than an application to a posted role. **I haven't worked inside German public administration or against BSI and C5 requirements**, so that context would be new ground. Audit-safe backends and AI integrations with proper failure handling are things I've shipped, and I'd welcome a conversation about where they could help govIT.",
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
    title: 'Talha Atif -> govIT (Backend Engineer)',
    description: 'A technical introduction prepared for govIT GmbH, a provider of sovereign digital workplaces for public administration.',
  },
}
