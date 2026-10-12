import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20Software%20Engineer%20-%20Talha%20Atif%20(Speedy%20Labs)'

export const speedyOutreach: OutreachPage = {
  slug: 'speedy',

  company: {
    name: 'Speedy Labs',
    role: 'Backend Software Engineer',
  },

  hero: {
    headline:
      'Backend engineering so **every rebate is calculated, reconciled and explainable**, from messy ERP data to the final payment.',
    subtext:
      "A short technical introduction prepared specifically for Speedy Labs' Backend Software Engineer role, after reading the posting and how the platform replaces spreadsheets for manufacturers and distributors.",
    ctaLabel: 'See the problem and my approach ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Rule engine with grouped conditions and audit trail', 'Async batch engine for 5,000+ items with failure reasons', 'Production query tuning, 3s to 700ms'],

  keyStats: [
    { value: '$1T', label: 'Rebates exchanged yearly in North America, per Speedy' },
    { value: '5,000+', label: 'Users per operation in my async batch engine' },
    { value: '~99%', label: 'Validation latency cut, 800ms-2s to under 5ms' },
    { value: '2', label: 'Compliance-critical bugs caught before production' },
  ],

  whatYouAreSolving: {
    points: [
      'Replacing **error-prone spreadsheets** that miss rebate opportunities with a platform that tracks rebate payments and their performance',
      'Connecting **ERP platforms and third-party services** reliably, so siloed financial data becomes insight a finance team can trust',
      'Keeping a **Python, Django and PostgreSQL backend fast and dependable** on high-traffic systems, as an early team member who owns backend components end to end',
    ],
  },

  relevantEvidence: {
    intro:
      "A rebate platform is only useful if its numbers can be trusted. The rules that decide a rebate, the data that feeds them and the audit trail behind each result all have to be exact, or finance stops believing the dashboard.",
    companyProblem:
      'The hard part of rebate management is **correctness over messy data**. Agreements carry many conditions, ERP exports disagree with each other, and every payout has to be explainable to a finance team.',
    myExperience:
      'At Intimec I built a **rule engine with grouped conditions, CRON scheduling and event triggers**, and caught a **logic bug with an adversarial 26-employee test dataset** before it reached production. I also refactored an **audit schema** that kept full traceability, and built an **async batch engine for 5,000+ users** with progress and a failure reason for every item.',
    overlap:
      "**Transferable experience.** Rebate agreements and entitlement rules are the same shape, grouped conditions evaluated over data with an audit trail. **I haven't shipped a Django production system, built ERP integrations or worked in finance or rebate software**, and I've used FastAPI and Spring more than Django, so those would be new ground.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Synchronous bulk operations timed out above 500 items, and nobody could see which items had succeeded or failed.',
    decision:
      'Chunked asynchronous processing at 500 records per chunk, chosen after testing 100, 500 and 1000, with a job table recording progress so a crash resumes from the last completed chunk.',
    tradeoff:
      'More implementation complexity, a job table and chunk coordination, than a single bulk insert, in exchange for visibility and the ability to recover from partial failure.',
    result:
      '**Operations that timed out now complete for 5,000+ users**, with real-time progress and a failure reason for each one. A month-end rebate run has the same shape.',
  },

  cultureFit: {
    intro:
      "Your posting asks for self-driven ownership, comfort as an early team member and a feel for performance. Here is the evidence for each. And in the first weeks I'd start by tracing one rebate from source data to payout end to end, then make every step of that path observable.",
    traits: [
      {
        trait: 'Ownership from design to implementation',
        description:
          'Built the Intimec Access Portal from scratch on a 2-person engineering team, and built Moodly and Memingo end to end alone.',
      },
      {
        trait: 'Early-team ambiguity',
        description:
          'Joined a codebase with no documentation or seed data, reverse-engineered the setup and wrote complete onboarding docs, and designed the grouped condition model for the rule engine with no existing spec.',
      },
      {
        trait: 'Correctness mindset',
        description:
          'Caught two compliance-critical bugs before production, a rule engine operator leak and a lost attribution in audit logs, by designing tests meant to break assumptions.',
      },
      {
        trait: 'Performance under real load',
        description:
          'Took a production feed API from 3s to 700ms by profiling query plans with EXPLAIN ANALYZE and fixing four separate causes, and cut a validation step from 800ms-2s to under 5ms with a set-based lookup.',
      },
      {
        trait: 'Reliable third-party integrations',
        description:
          'Built integrations with timeouts, circuit breakers and exponential backoff retries so one unreliable provider could not cascade into an outage.',
      },
      {
        trait: 'Working with LLMs',
        description:
          'Built a Gemini-powered tutor with session context and structured output parsing, and an async AI pipeline that cut perceived AI wait from 4-8s to under 1s.',
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

  relevantProjects: ['intimec', 'cunocovo', 'memingo', 'moodly'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "I'm applying for the posted role directly. **I haven't shipped a Django production system or built ERP integrations**, and my backend experience is mostly Java and Spring Boot, Node and FastAPI, so Django would be new ground. Rule-driven systems with audit trails, batch processing that never loses work and query performance on real load are things I've shipped, and I'd welcome a conversation about where they could help Speedy Labs.",
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
    title: 'Talha Atif -> Speedy Labs (Backend Software Engineer)',
    description: 'A technical introduction prepared for Speedy Labs, an AI-powered rebate management platform.',
  },
}
