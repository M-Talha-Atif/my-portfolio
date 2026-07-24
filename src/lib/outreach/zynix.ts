import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20Engineer%20-%20Talha%20Atif%20(Zynix%20AI)'

export const zynixOutreach: OutreachPage = {
  slug: 'zynix',

  company: {
    name: 'Zynix AI',
    role: 'Backend Engineer',
  },

  hero: {
    headline: 'Backend engineering for AI agents that have to prove what they did, not just complete it.',
    subtext: "A short technical introduction prepared specifically for Zynix AI, after reading Gautamdev Chowdary's own posts on governed autonomy and execution write-back.",
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  whatYouAreSolving: {
    points: [
      "Building AI agents that don't just recommend care actions but execute them, with audit trails, escalation paths, and write-back to the system of record",
      'Closing the small, compounding operational gaps (retries, scheduling, documentation) across a population of thousands of patients',
      'Growing a 60+ person, physician-led, engineer-driven team already supporting ~1M patients and $300M+ in shared savings',
    ],
  },

  relevantEvidence: {
    intro:
      "Gautamdev's posts keep circling one idea: autonomy without auditability is just risk. That's not an abstract concern to me, it's the exact problem I hit refactoring an audit schema that had to prove who did what without leaking personal data.",
    companyProblem:
      "Zynix AI's care-execution agents have to log what they were allowed to do, what data they used, when they escalated, and what got written back, not just complete the task.",
    myExperience:
      'At Intimec, I built a Kafka-based approval pipeline with dead-letter queues so failures were caught and retried instead of silently lost, and separately refactored an entire audit log schema to remove PII while preserving full forensic traceability.',
    overlap:
      "Direct overlap with the 'governed autonomy' pattern Gautamdev writes about: reliable retries, audit trails, and write-back completeness. I haven't built for healthcare or ACO workflows specifically, so the clinical domain would be new, but the underlying reliability and audit discipline is the same problem.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Synchronous REST calls between services meant one service going down broke the entire approval chain, with no replay and no audit trail.',
    decision:
      'Designed an event-driven pipeline using Kafka for approval, rejection, and provisioning events, with dead-letter queues catching failures instead of losing them silently.',
    tradeoff:
      'More operational complexity than a direct synchronous call, in exchange for a system that survives individual service downtime and never silently drops a request.',
    result:
      'Approval workflows now survive service outages, with a full audit trail of what was requested, approved, and provisioned.',
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
          'Every architecture call I make names the trade-off accepted: Kafka with dead-letter queues over a direct synchronous call, PII-free audit references over raw identity data, alias-based reindexing over a maintenance-window rebuild.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) with FastAPI and Hugging Face models, and use LangGraph and CrewAI in personal exploration, the same "AI has to be trustworthy enough to act on, with a record of what it did" problem Zynix solves for care execution.',
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
      "I haven't built specifically for ACOs or value-based care workflows, so that clinical domain would be new ground. But the reliability and audit discipline underneath governed autonomy, the thing that keeps showing up in your posts, is something I've built before, and I'd welcome a conversation about where that transfers.",
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
    title: 'Talha Atif -> Zynix AI (Backend Engineer)',
    description: 'A technical introduction prepared for Zynix AI, an agentic AI platform for value-based care.',
  },
}
