import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20Engineer%20-%20Talha%20Atif%20(QFEX)'

export const qfexOutreach: OutreachPage = {
  slug: 'qfex',

  company: {
    name: 'QFEX',
    role: 'Backend Engineer',
  },

  hero: {
    headline: 'I cut inter-service latency by 50 percent through a REST to gRPC migration, and I already tune systems with real load until the numbers stop being interesting.',
    subtext: 'A technical introduction prepared specifically for QFEX, based on the live Backend Engineer opening.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['gRPC latency cut by 50 percent, real', 'Kafka and Python already in daily use', 'Three honest gaps named directly upfront'],

  keyStats: [
    { value: '50%', label: 'Inter-service latency cut via a gRPC migration' },
    { value: '9', label: 'Merged PRs on a Rust and Python observability tool' },
    { value: '0', label: 'Duplicate notifications since a concurrency fix' },
  ],

  whatYouAreSolving: {
    points: [
      'Designing fault tolerant, low latency services and tuning them with load tests and chaos suites until **p99 stops being interesting**',
      'Setting up automated test suites and CI/CD that keep technical debt from piling up as the exchange scales across more asset classes',
      'Building a culture of tests, metrics, and graceful degradation, where decisions get made in minutes instead of days',
    ],
  },

  relevantEvidence: {
    intro:
      "QFEX's own bar is blunt, tune until p99 is boring. That kind of standard usually comes from someone who has already been burned by a slow or fragile production system and fixed it properly, not just made it faster once.",
    companyProblem:
      'The role wants 3 or more years on real time production exchanges or HFT systems, fluency in Rust, C, or C++, a STEM degree from a top ranked university, and the ability to make decisions in minutes, not days.',
    myExperience:
      'At MicroTechX I migrated synchronous REST calls to gRPC and cut inter-service latency by 50 percent. At Digital Upgraders I traced and fixed a duplicate notification race condition under concurrent load using a database transaction and a unique constraint, and tuned chunk sizes and Kafka consumer counts directly against measured throughput instead of guessing. I also contribute to **OpenSRE, a production observability tool built in Rust and Python**, with 9 merged pull requests on its Python side.',
    overlap:
      '**Real overlap on gRPC, Kafka, Python, and a measurement first approach to reliability.** Three honest gaps, stated directly. I have not written Rust, C, or C++ in production. I do not have direct experience on real time exchange or HFT systems. And this role is on-site in London, while I am currently based in Lahore, Pakistan, with no settled relocation answer yet.',
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Users received duplicate notifications intermittently under concurrent load, the kind of bug that erodes trust fast in a system people depend on.',
    decision:
      'Traced the root cause to non-transactional writes where two concurrent requests both passed an existence check before either wrote, then wrapped the check and create in a database transaction with a unique constraint as a second line of defense.',
    tradeoff:
      'A unique constraint alone would have thrown ugly errors under the race, and a transaction alone still left a narrow window without the constraint. Doing both cost a small amount of complexity for a guarantee that actually holds under load.',
    result:
      '**Race condition eliminated entirely**, with no duplicate notifications since, the same standard a 24/7 exchange needs from every service, not just the fast ones.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it lines up closely with what QFEX says it needs from this role.',
    traits: [
      {
        trait: 'Tunes until the numbers are boring',
        description:
          'Cut inter-service latency by 50 percent through a REST to gRPC migration, and tuned chunk sizes and Kafka consumer counts by testing against real load rather than guessing.',
      },
      {
        trait: 'Reliability under concurrency',
        description:
          'Fixed a duplicate notification race condition with a transaction plus unique constraint, closing the exact kind of gap that erodes trust in an always on system.',
      },
      {
        trait: 'Comfortable in someone else\'s codebase',
        description:
          'Contributing to OpenSRE, a production Rust and Python observability tool, with 9 merged pull requests, the same discipline needed to work inside an unfamiliar codebase without breaking its conventions.',
      },
      {
        trait: 'Zero downtime under real constraints',
        description:
          'Led a zero downtime migration from AWS to Fly.io on a live platform, reworking infrastructure, CI/CD, and DNS while the service stayed up.',
      },
      {
        trait: 'Direct, fast decisions',
        description:
          'Translated backend tradeoffs directly for a non technical CEO on product decisions, and prefers direct language over hedged claims.',
      },
      {
        trait: 'Honest about real gaps',
        description:
          'Named the Rust and C++ gap, the lack of direct exchange or HFT experience, and the London relocation question directly on this page rather than glossing over them.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Founder Call',
      message: 'Skip straight to the founder call. Talk to me directly about the latency and reliability work I have already shipped.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Pair Programming',
      message: 'Give me a real problem and pair with me on it, the same on-site deep dive format you already run.',
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

  relevantProjects: ['intimec', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      'I want to name three things plainly. **I have not written Rust, C, or C++ in production, and I do not have direct experience on real time exchange or HFT systems**, both of which this role asks for at 3 plus years. This role is also on-site in London, and I do not have a settled relocation answer yet. What I can say honestly is that the gRPC latency work, the concurrency fix, and the habit of tuning against real load instead of guessing are already real and already built, and I pick up new languages quickly when the problem demands it.',
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
    title: 'Talha Atif -> QFEX (Backend Engineer)',
    description: 'A technical introduction prepared for QFEX, built around gRPC latency work and reliability under concurrency, with the Rust, HFT, and relocation gaps named directly.',
  },
}
