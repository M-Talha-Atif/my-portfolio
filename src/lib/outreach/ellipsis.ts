import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Founding%20AI%20Engineer%20-%20Talha%20Atif%20(Ellipsis)'

export const ellipsisOutreach: OutreachPage = {
  slug: 'ellipsis',

  company: {
    name: 'Ellipsis',
    role: 'Founding AI Engineer',
  },

  hero: {
    headline: 'AI engineering for a code-review tool that already merges PRs **13% faster**.',
    subtext: "A short technical introduction prepared specifically for Ellipsis, based on Hunter Brooks' own Founding AI Engineer posting.",
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['4 of 5 stack technologies match', 'Adversarial test design experience', 'Applied AI product built solo'],

  keyStats: [
    { value: '13%', label: 'Faster PR merges, Ellipsis claim' },
    { value: '19,000', label: 'Codebases Ellipsis reviews' },
    { value: '4/5', label: 'Stack technologies matched directly' },
  ],

  whatYouAreSolving: {
    points: [
      'Turning a GitHub PR into an automated review that catches logic errors, not just style nits, across **100+ companies and 19,000 codebases**',
      'Building the Founding AI Engineer stack directly: **Python, FastAPI, Hatchet, Postgres, TypeScript, and Next.js**',
      'Shipping as one of the first engineering hires at a fast-moving, **YC-backed** dev-tools company',
    ],
  },

  relevantEvidence: {
    intro:
      "Ellipsis isn't just catching style nits, it's trying to make an AI reliable enough that a real engineering team trusts it to review production code. That's the exact problem I keep running into with agentic workflows: getting an AI's output from 'plausible' to 'actually trustworthy' for someone who has to ship on top of it.",
    companyProblem:
      "Ellipsis's Founding AI Engineer role is built on **Python, FastAPI, Hatchet, Postgres, TypeScript, and Next.js**.",
    myExperience:
      'I built Moodly, an AI inference pipeline, **solo end to end** with FastAPI on the backend and async processing via RabbitMQ, and separately built full products with Node.js, TypeScript, and Next.js/React.',
    overlap:
      "**Direct overlap on four of the five listed technologies** (Python/FastAPI, Postgres, TypeScript, Next.js). **Hatchet specifically would be new to me**, though I've built comparable async task orchestration with Kafka and RabbitMQ, so the underlying pattern isn't unfamiliar.",
    projectImage: '/moodlyProject/hero/moodly-hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/moodly',
  },

  realDecision: {
    problem:
      'A rule engine needed to evaluate nested, multi-group conditions correctly, but the initial single-operator design silently broke on real-world policy complexity.',
    decision:
      'Built a deliberate 26-employee, 7-category adversarial test dataset specifically designed to expose edge cases, rather than trusting code review alone to catch the logic bug.',
    tradeoff:
      'More upfront time spent designing adversarial cases instead of shipping the happy path faster, in exchange for catching a compliance-critical bug before production.',
    result:
      '**Caught the bug before it caused incorrect access grants**, and introduced a proper interGroupOperator field with a backward-compatible migration.',
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
          'Every architecture call I make names the trade-off accepted: adversarial test design over trusting code review alone, gRPC over REST for synchronous paths, alias-based reindexing over a maintenance-window rebuild.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) with FastAPI and Hugging Face models, and use LangGraph and CrewAI in personal exploration, the same "make AI output something you can actually trust" problem Ellipsis solves for code review.',
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
      "**I know the role is listed on-site in New York, and I'm based in Pakistan**, so I want to name that gap directly rather than skip past it. But four of the five stack technologies are a direct match, and I'd welcome a conversation about whether a remote arrangement could work.",
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
    title: 'Talha Atif -> Ellipsis (Founding AI Engineer)',
    description: "A technical introduction prepared for Ellipsis's Founding AI Engineer role.",
  },
}
