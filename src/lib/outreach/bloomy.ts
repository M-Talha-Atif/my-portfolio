import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Founding%20Engineer%20-%20Talha%20Atif%20(Bloomy)'

export const bloomyOutreach: OutreachPage = {
  slug: 'bloomy',

  company: {
    name: 'Bloomy',
    role: 'Founding Engineer',
  },

  hero: {
    headline: 'The engineer who builds the harness that catches what the agent fleet gets wrong, **before a sixth grader does**.',
    subtext: 'A technical introduction prepared specifically for Bloomy, based on the live Founding Engineer posting and the gap you named directly: an engineer who can turn a fleet of coding agents into something you can trust in front of a real classroom.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Verification-first engineering habit', 'Solo AI product, real users', 'Non-technical founder communication'],

  keyStats: [
    { value: '26', label: 'Person adversarial test dataset built' },
    { value: '1', label: 'AI product owned solo, end to end' },
    { value: '500', label: 'User threshold where bulk ops broke' },
  ],

  whatYouAreSolving: {
    points: [
      "Being the first technical hire under a non-technical founder who is already shipping production code and curriculum through orchestrated coding-agent fleets, and needs someone to turn that into a real engineering practice, **specs, harnesses, QA gates**, not just more prompting",
      "Closing the loop between student telemetry, every answer, retry, and tutor conversation, and the instruction itself, **in days instead of textbook-revision cycles**",
      "Joining at the exact moment Bloomy goes from one founder's product to a real engineering team, on a stack (**React, TypeScript, Supabase, Postgres**) I already work in daily",
    ],
  },

  relevantEvidence: {
    intro:
      "Bloomy's model is unusual, and from the outside the hard part is obvious: you're shipping a large share of production code and curriculum through orchestrated coding agents, with one founder as the entire engineering org until now. That only works if someone builds the verification layer, specs, harnesses, QA gates, that lets you trust what a dozen concurrent agents produce enough to put it in front of real students the next school day.",
    companyProblem:
      "The Founding Engineer role splits roughly into shipping product across a **React/TypeScript/Supabase** stack, running and extending the agent fleet's infrastructure, and turning conversations with teachers and students into roadmap. All three need the same underlying skill: taking something ambiguous and making it trustworthy and shippable.",
    myExperience:
      "I own an enterprise IAM platform end to end at Intimec on a **2-person engineering team**, and separately built Moodly, a **solo AI inference product** (FastAPI, Hugging Face, async processing via RabbitMQ) that real users interacted with, requirements through deployment, alone. Claude, Copilot, and Cursor are daily tools for me, not occasional ones, and I'm currently contributing to **OpenTracer, an AI-agent observability platform**, the same 'can I actually trust what the agent did' problem your fleet runs into every day.",
    overlap:
      "**Direct stack overlap on React, TypeScript, and Postgres/Supabase-adjacent systems.** The harness instinct is already real, not theoretical: I built a deliberate 26-employee adversarial test dataset specifically to catch a compliance-critical bug in a rule engine that ordinary code review would have missed, the same discipline a QA gate needs against agent output. **Honest gap: I haven't personally run a fleet of concurrent coding agents at Bloomy's scale**, only single-agent and pair workflows, so the orchestration-infrastructure side would be new ground, though the verification mindset underneath it isn't.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      "The entitlement rule engine's SQL predicate builder used one operator field for both intra-group and inter-group logic. It passed every simple test and quietly produced incorrect access grants the moment a rule spanned multiple groups, exactly the kind of failure normal testing doesn't catch because it only proves the happy path.",
    decision:
      "Instead of trusting code review to catch it, I built a deliberate 26-employee, 7-category adversarial test dataset designed specifically to expose every operator combination, then introduced a separate interGroupOperator field with a backward-compatible migration for existing rules.",
    tradeoff:
      "Building an adversarial dataset upfront costs real time versus shipping on green tests and hoping review catches edge cases. I chose the slower path because a wrong access grant is a compliance failure, not just a bug.",
    result:
      '**Caught the bug before it reached production**, preventing incorrect access grants across a compliance-critical system.',
  },

  cultureFit: {
    intro:
      "None of this is a personality test. It's what actually happened, and it maps closely to what you said you need.",
    traits: [
      {
        trait: 'High-agency execution',
        description:
          'Took ambiguous access-management requirements at Intimec and turned them into a working, self-service system, tile catalog through provisioning, with no spec handed to me, on a 2-person team.',
      },
      {
        trait: 'Building for verification, not just speed',
        description:
          "Every system I've shipped that mattered got a deliberate test harness built around it, the rule-engine adversarial dataset, purpose-built load tests for bulk role assignment, because 'it passed the happy path' and 'it's trustworthy' are different claims.",
      },
      {
        trait: 'Solo AI product ownership',
        description:
          "Built Moodly's entire AI inference pipeline alone, FastAPI, Hugging Face, async processing via RabbitMQ, requirements through deployment, the same shape of ownership as being the second engineer at Bloomy.",
      },
      {
        trait: 'Schlep tolerance',
        description:
          'Redesigned bulk role assignment after it started timing out above 500 users, chunk size tuned by testing 100, 500, and 1000 directly rather than guessing, the unglamorous kind of work that usually wins.',
      },
      {
        trait: 'Communicating with a non-technical founder',
        description:
          "Translated backend trade-offs directly for a non-technical CEO on product decisions at a previous company. Working for a founder who isn't an engineer by training isn't a hypothetical for me.",
      },
      {
        trait: 'Daily AI-native workflow',
        description:
          "Claude, Copilot, and Cursor are how I build, every day, and I'm contributing to OpenTracer, an AI-agent observability platform, because 'can I trust what the agent did' is a problem I find genuinely interesting, not just necessary.",
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the take-home. Give me a technical conversation and a look at how the agent fleet\'s harnesses actually work today.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real ticket or a live session inside your actual agent-orchestrated workflow.',
      ctaLabel: 'Test my skills',
      ctaTarget: CONTACT_MAILTO,
    },
    {
      tier: 'Bronze',
      title: 'Traditional Process',
      message: 'Take me through whatever process you\'d normally run for this.',
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
      "**I haven't personally run a fleet of concurrent coding agents at Bloomy's scale**, so I want to name that honestly rather than imply otherwise. But the harder problem underneath it, building the verification layer that lets you trust what gets shipped, is one I've built for before, under real compliance stakes, and I'd like to talk about where that transfers to a classroom of real kids.",
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
    title: 'Talha Atif -> Bloomy (Founding Engineer)',
    description: "A technical introduction prepared for Bloomy's Founding Engineer role.",
  },
}
