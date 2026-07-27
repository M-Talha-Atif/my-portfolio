import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Founding%20Engineer%20-%20Talha%20Atif%20(Wildcard)'

export const wildcardOutreach: OutreachPage = {
  slug: 'wildcard',

  company: {
    name: 'Wildcard',
    role: 'Founding Engineer',
  },

  hero: {
    headline: 'I have built the same kind of trustworthy structured data systems you built at Scale AI, just aimed at identity and access instead of ecommerce SKUs.',
    subtext: 'A technical introduction prepared specifically for Wildcard, based on the live Founding Engineer posting and the enrichment engine work you did at Scale AI.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  whatYouAreSolving: {
    points: [
      'Being engineer number one at a company growing 50 percent month over month, owning frontend, backend, queues, browser automation, and reliability with no existing team to hand decisions to',
      'Making agentic commerce data trustworthy at scale, the same shape of problem as making 2.8 million attributes across hundreds of taxonomies trustworthy, just aimed at a different domain',
      'Building the reliability and observability layer, queues, retries, evals, that a fast moving AI native product needs before real ecommerce brands can trust it',
    ],
  },

  relevantEvidence: {
    intro:
      "Wildcard's core problem, structured data at scale that has to be trustworthy enough for a real business decision, is the same shape of problem you solved at Scale AI with 400,000 SKUs and 2.8 million attributes across hundreds of taxonomies. I have solved that shape of problem before, aimed at identity instead of ecommerce.",
    companyProblem:
      'The Founding Engineer role owns the full stack, frontend, backend, queues, browser automation, and reliability, plus the AI agent and MCP layer that makes the product agent native, as engineer number one at a company growing 50 percent month over month.',
    myExperience:
      'At Intimec I owned an enterprise IAM platform end to end, including an entitlement rule engine built across 7 categories of conditions, and a Kafka based approval pipeline with dead letter queues for reliability. I also migrated a 5 million document OpenSearch index with zero downtime after a schema drift issue caused mapping conflicts on high cardinality fields, structurally the same problem as keeping large scale attribute data consistent and trustworthy. I am also contributing to OpenTracer, an AI agent observability platform, the same layer of the stack as the evals and orchestration tooling this role needs.',
    overlap:
      'Direct overlap on reliability, queues, and structured data at scale, plus applied AI agent tooling through OpenTracer. Two honest gaps named directly. I have not built browser automation or scraping infrastructure specifically, and my production experience has been remote, not onsite in the US, so the citizenship or visa requirement on this posting is a real open question I do not have an answer to yet.',
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Analytics queries worked locally but crashed in production due to schema drift between environments, with mapping conflicts on high cardinality fields inside a 5 million document index.',
    decision:
      'Diagnosed the mismatch and executed a zero downtime migration using alias switching, build a new index with the correct mapping, reindex in the background, verify, then atomic alias swap.',
    tradeoff:
      'More steps and temporary duplicate storage during reindexing, versus a faster but downtime requiring in place migration.',
    result:
      '5 million plus documents migrated with zero downtime, analytics handling 100,000 plus logs per cycle without failure afterward.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it lines up closely with what engineer number one at Wildcard actually needs to do.',
    traits: [
      {
        trait: 'Ownership of ambiguous, high stakes systems',
        description:
          'Built the entitlement rule engine and access portal from zero on a 2 person team, with no existing spec to inherit and no one else to hand the hard decisions to.',
      },
      {
        trait: 'Reliability instinct under real scale',
        description:
          'Built a Kafka approval pipeline with dead letter queues for failure recovery, and tuned chunked async bulk role assignment by testing chunk sizes directly rather than guessing.',
      },
      {
        trait: 'Structured data at scale',
        description:
          'Executed an alias based zero downtime OpenSearch migration for 5 million plus documents after mapping conflicts on high cardinality fields broke production analytics.',
      },
      {
        trait: 'Applied AI and agent tooling',
        description:
          "Contributing to OpenTracer, an AI agent observability platform, and built Moodly's AI inference pipeline solo end to end, FastAPI, Hugging Face, RabbitMQ.",
      },
      {
        trait: 'High schlep tolerance',
        description:
          'Reverse engineered and documented a completely undocumented codebase, and redesigned bulk operations after they started failing above 500 users.',
      },
      {
        trait: 'Direct, low ego communication',
        description:
          'Translated backend trade offs directly for a non technical CEO on product decisions, and prefer direct language over hedged claims.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the resume screen. Talk to me directly about the reliability and structured data problems I have already solved.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real piece of the browser automation or queue infrastructure and see how fast I actually move.',
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
      'I want to be direct about two things. I have not built browser automation or scraping infrastructure specifically, and I do not yet know whether the citizenship or visa requirement on this posting rules me out. The reliability, structured data, and applied AI experience underneath this role is real and already built. I would welcome a direct conversation about whether the rest can work.',
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
    title: 'Talha Atif -> Wildcard (Founding Engineer)',
    description: "A technical introduction prepared for Wildcard's Founding Engineer role, built around direct structured data and reliability overlap.",
  },
}
