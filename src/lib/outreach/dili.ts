import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Founding%20Engineer%20-%20Talha%20Atif%20(Dili)'

export const diliOutreach: OutreachPage = {
  slug: 'dili',

  company: {
    name: 'Dili',
    role: 'Founding Engineer, Full Stack',
  },

  hero: {
    headline: 'Full-stack and LLM document engineering for a compliance platform built to **move faster than the paperwork**.',
    subtext: 'A technical introduction prepared specifically for Dili, based on the live Founding Engineer, Full Stack posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Python + React stack match', 'Zero-downtime migration at 5M+ scale', 'Structured document extraction experience'],

  keyStats: [
    { value: '5M+', label: 'Documents migrated, zero downtime' },
    { value: '100K+', label: 'Logs handled per cycle' },
    { value: '0', label: 'Downtime during the cutover' },
  ],

  whatYouAreSolving: {
    points: [
      'Turning prevailing-wage and apprenticeship compliance, dense regulatory paperwork that gates federal clean-energy funding, into something a project team can actually keep up with',
      'Building **real-time UX (websockets/SSE)** on top of an **LLM-driven document-extraction pipeline** across a Python/Django backend and React frontend',
      'Joining as the **founding engineer**, defining engineering culture rather than inheriting one',
    ],
  },

  relevantEvidence: {
    intro:
      "Dili started as an AI copilot for PE/VC due diligence and has since moved into a much more concrete, physical-world problem: keeping clean-energy projects compliant with prevailing-wage and apprenticeship rules so funding doesn't get pulled. That pivot itself is a signal, going from a general 'AI reads documents' pitch to a specific, high-stakes compliance workflow real project teams depend on.",
    companyProblem:
      'The Founding Engineer role spans **real-time UX (websockets/SSE)**, an **LLM-driven document-extraction pipeline**, and specialized agents for metric extraction, on a Python/Django backend with a React frontend, AWS deployed via Terraform.',
    myExperience:
      "I built Moodly's AI inference pipeline with FastAPI and Hugging Face models, and separately built full products with React and backend systems handling structured data extraction and validation at Intimec.",
    overlap:
      "**Direct overlap on Python and React**, and on the underlying problem, extracting structured, trustworthy data from messy documents. **Django specifically and Terraform would both be new ground** for me, I've used Spring Boot, FastAPI, and Express, plus Docker and GitHub Actions but not Terraform, so I want to name that honestly rather than imply otherwise.",
    projectImage: '/moodlyProject/hero/moodly-hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/moodly',
  },

  realDecision: {
    problem:
      'Analytics queries worked locally but crashed in production due to schema drift between environments, with mapping conflicts on high-cardinality fields.',
    decision:
      'Diagnosed the mismatch and executed a zero-downtime migration using alias switching: build a new index with the correct mapping, reindex in the background, then atomic alias swap.',
    tradeoff:
      'More steps and temporary duplicate storage during reindexing, versus a faster but downtime-requiring in-place migration.',
    result:
      '**5M+ documents migrated with zero downtime**, analytics handling **100K+ logs per cycle** without failure.',
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
          'Every architecture call I make names the trade-off accepted: alias-based reindexing over a maintenance-window rebuild, gRPC over REST for synchronous paths, chunked async processing over a single bulk insert.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) with FastAPI and Hugging Face models, and use LangGraph and CrewAI in personal exploration, the same "extract structured, trustworthy data from messy real-world input" problem Dili solves for compliance documents.',
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
      "**I haven't worked with Django or Terraform specifically**, so I want to name that as real new ground rather than glossing over it. But the core problem, getting structured, trustworthy data out of messy documents at scale, is one I've built for before, and I'd welcome a conversation about where that transfers.",
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
    title: 'Talha Atif -> Dili (Founding Engineer, Full Stack)',
    description: "A technical introduction prepared for Dili's Founding Engineer, Full Stack role.",
  },
}
