import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Associate%20Software%20Engineer%20-%20Talha%20Atif%20(Precisely)'

export const preciselyOutreach: OutreachPage = {
  slug: 'precisely',

  company: {
    name: 'Precisely',
    role: 'Associate Software Engineer, MDM',
  },

  hero: {
    headline: 'I already treat unverified output, whether from a teammate or an AI agent, as **a claim to check, not a fact to accept**. That is the same discipline data integrity requires.',
    subtext: 'A technical introduction prepared specifically for Precisely, based on the live Associate Software Engineer, Master Data Management posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Concurrency bug fixed, verified', 'Adversarial test design experience', 'AI-first, verification built in'],

  keyStats: [
    { value: '12,000+', label: 'Organizations Precisely serves' },
    { value: '26', label: 'Person adversarial test dataset built' },
    { value: '0', label: 'Duplicate notifications since the fix' },
  ],

  whatYouAreSolving: {
    points: [
      'Keeping Master Data Management correct and trustworthy across integrations, workflows, and analytics, the **same single source of truth problem** as an identity governance platform, just aimed at business data instead of identities',
      'Building full stack features in **Java and React or Angular** that stay reliable under concurrent load, not just correct on the happy path',
      'Working **AI first**, using coding agents to move faster while still personally validating every AI generated suggestion against real behavior before it ships',
    ],
  },

  relevantEvidence: {
    intro:
      "Precisely's own pitch is trust in data at scale, **12,000plus organizations, 95 of the Fortune 100**. That claim holds up best when the people building the platform have already worked somewhere data correctness was a strict, non negotiable requirement, not a nice to have.",
    companyProblem:
      'The role builds full stack features in **Java and React or Angular**, designs REST APIs and service integrations for MDM workflows, and expects a **test driven mindset** covering thread safety, mocking, and test quality gates, inside an AI first engineering culture that uses coding agents daily.',
    myExperience:
      'At Intimec I owned the Access Portal end to end on a **Java and Spring Boot backend** with a **React and Next.js frontend**, tuned Kafka consumer counts for throughput without contention, and caught a compliance critical rule engine bug by building a deliberate adversarial test dataset rather than trusting code review alone. At Digital Upgraders I **traced and fixed a duplicate notification race condition** under concurrent load. Claude and GitHub Copilot are daily tools for me, and I validate every AI suggested change against real call sites before merging it.',
    overlap:
      '**Direct overlap on Java, React, REST APIs, concurrency, and daily AI assisted engineering** with a verification habit already built in. **Honest note, my production experience is in identity governance, not Master Data Management specifically**, though the underlying problem, keeping a single source of truth correct under strict rules, is the same shape.',
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Users received duplicate notifications intermittently under concurrent load.',
    decision:
      'Traced the root cause to non-transactional writes where two concurrent requests both passed an existence check before either wrote, then wrapped the check-and-create in a database transaction with a unique constraint as a second line of defense.',
    tradeoff:
      'A unique constraint alone would have thrown ugly errors under the race, and a transaction alone still left a narrow window without the constraint. Doing both cost a small amount of complexity for a guarantee that actually holds under concurrent load.',
    result:
      '**Race condition eliminated entirely**, with no duplicate notifications since.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it maps closely to what this role and an AI first engineering culture actually need.',
    traits: [
      {
        trait: 'Concurrency and correctness first',
        description:
          'Fixed a duplicate notification race condition with a transaction plus unique constraint, and tuned Kafka consumer counts by testing 1, 3, and 5 directly to find the throughput ceiling without contention.',
      },
      {
        trait: 'Test driven, adversarial mindset',
        description:
          'Built a deliberate 26 employee, 7 category adversarial test dataset specifically to expose a multi group rule engine bug that normal testing missed.',
      },
      {
        trait: 'AI first, but verifying, not just accepting',
        description:
          'Claude and GitHub Copilot are daily tools, and every AI suggested change gets checked against real call sites and edge cases before it merges, not accepted because it compiles.',
      },
      {
        trait: 'Full stack ownership across Java and React',
        description:
          'Owned the Access Portal end to end, Spring Boot service layer through the React and Next.js frontend, on a 2 person engineering team.',
      },
      {
        trait: 'Defensive, failure-atomic design',
        description:
          'Designed cart operations as transactional units so partial failures never corrupt request state, and built Kafka dead letter queues so one failure could not cascade through the chain.',
      },
      {
        trait: 'Direct communication',
        description:
          'Translated backend trade offs directly for a non technical CEO on product decisions, and prefer direct language over hedged claims.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the take-home. Give me a technical conversation about the concurrency and data integrity problems I have already solved.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real ticket or a live coding session in an AI-assisted development environment.',
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

  relevantProjects: ['intimec', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      'I want to name one thing honestly. **My production experience is in identity governance, not Master Data Management specifically.** What I can say is that the underlying discipline, keeping a single source of truth correct under strict rules, catching what a quick look would miss, and verifying rather than assuming, is one I already practice daily, on code and on AI output alike.',
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
    title: 'Talha Atif -> Precisely (Associate Software Engineer, MDM)',
    description: "A technical introduction prepared for Precisely's Associate Software Engineer, MDM role.",
  },
}
