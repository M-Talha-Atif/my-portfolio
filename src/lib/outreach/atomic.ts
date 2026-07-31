import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Atomic%20Backend%20Engineer%20-%20Talha%20Atif'

export const atomicOutreach: OutreachPage = {
  slug: 'atomic',

  company: {
    name: 'Atomic',
    role: 'Backend Engineer',
  },

  hero: {
    headline: 'Backend engineering for systems where **reliability matters**.',
    subtext: 'A short technical introduction prepared specifically for Atomic, based on the Backend Engineer role.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['gRPC + distributed systems', 'Zero-downtime migration at scale', '2-person team, full ownership'],

  keyStats: [
    { value: '50%', label: 'Inter-service latency cut via gRPC' },
    { value: '5M+', label: 'Documents migrated, zero downtime' },
    { value: '2', label: 'Person team, full ownership' },
    { value: '0', label: 'Downtime during the cutover' },
  ],

  whatYouAreSolving: {
    points: [
      'Running **gRPC services** across a **distributed, Kubernetes-based** backend, where keeping many services predictable together matters more than any single service in isolation',
      'Moving financial data through **async pipelines (Kinesis)** where correctness under load is not negotiable',
      'Scaling a **Go and PostgreSQL** backend as a small engineering team without losing operational discipline as headcount grows',
    ],
  },

  relevantEvidence: {
    intro:
      "Atomic isn't choosing gRPC because it's trendy. It's choosing it because Go services talking to other services across Kubernetes need a contract that survives ambiguity, not just a fast one. I've sat on the other side of that exact argument, the day REST latency got expensive enough to justify migrating three services to gRPC. Different codebase, same reasoning.",
    companyProblem:
      "Atomic's backend runs **gRPC services** across a **distributed, Kubernetes-based** architecture, where the hard part is keeping many services predictable together, not writing any one of them.",
    myExperience:
      'At Intimec, I migrated inter-service identity lookups from REST to gRPC, **cutting inter-service latency in half**, and separately led a **zero-downtime migration of a 5M+ document search index** using an alias-based cutover so production traffic was never at risk during the switch.',
    overlap:
      "**Direct experience with gRPC** and with the reliability discipline distributed backends require. **Go and Kubernetes ownership specifically would be new ground** for me, I've built this discipline on Java/Spring Boot and Node, not Go, so that part is transferable rather than direct.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Auth Service needed fast identity and manager resolution on every login, while Identity Service also needed to broadcast lifecycle changes to other services.',
    decision:
      'Split the communication pattern by actual requirement: gRPC with Protocol Buffers for the synchronous identity lookup path, Kafka retained for lifecycle events that could tolerate eventual consistency.',
    tradeoff:
      "Two different communication patterns to maintain instead of one, and gRPC's binary format is not human-readable without the shared .proto schema.",
    result:
      '**Inter-service latency on the synchronous path dropped by 50%**, and lifecycle events kept processing safely even when Auth Service was down.',
  },

  cultureFit: {
    intro:
      "None of this is a personality test. It's what actually happened on the last two teams I worked with.",
    traits: [
      {
        trait: 'Ownership',
        description:
          'Built the Intimec Access Portal end to end, tile catalog through provisioning, as the owner, not a contributor to someone else\'s design, on a 2-person engineering team.',
      },
      {
        trait: 'Working through ambiguity',
        description:
          'The entitlement rule engine had no existing spec. I designed the grouped condition evaluation model myself and iterated as multi-group edge cases surfaced.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Every architecture call I make names the trade-off accepted, gRPC over REST for sync paths, Kafka kept for async, alias-based reindexing over a maintenance-window rebuild, not just the outcome.',
      },
      {
        trait: 'AI-assisted engineering',
        description:
          'Claude, Copilot, and Cursor are daily engineering tools for me, not occasional helpers, the same way this outreach page was built.',
      },
      {
        trait: 'Communication',
        description:
          'Authored onboarding documentation for a previously undocumented codebase and translated backend trade-offs directly for a non-technical CEO on product decisions.',
      },
      {
        trait: 'Learning speed',
        description:
          'Reverse-engineered a codebase with no setup guide and no seed data from configuration files alone, then wrote the onboarding docs so the next engineer would not repeat the same friction.',
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
      message: 'Take me through the traditional 3-4 round interview process.',
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
      "I'm not claiming to have solved Atomic's exact problems, **Go and Kubernetes would both be new ground for me**. But the underlying discipline, splitting sync from async by real requirement, migrating safely with zero downtime, is the same regardless of language. Happy to talk through where that does and does not transfer.",
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
    title: 'Talha Atif -> Atomic (Backend Engineer)',
    description: "A technical introduction prepared for Atomic's Backend Engineer role.",
  },
}
