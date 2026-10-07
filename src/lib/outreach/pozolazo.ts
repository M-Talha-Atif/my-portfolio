import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20and%20E-commerce%20Engineer%20-%20Talha%20Atif%20(Pozolazo)'

export const pozolazoOutreach: OutreachPage = {
  slug: 'pozolazo',

  company: {
    name: 'Pozolazo',
    role: 'Backend and E-commerce Engineer (informational)',
  },

  hero: {
    headline: 'Backend engineering so Pozolazo **never loses a customer to a sold out sign**.',
    subtext:
      'A short technical introduction prepared specifically for Pozolazo, after looking at the store, the sold-out and pre-order items, and the wholesale program.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Notification race condition fixed on a live platform', 'Leaderboard API cut from 30s to 90ms with Redis', 'Zero-downtime infrastructure migration'],

  keyStats: [
    { value: '3', label: 'Core dishes, pozole, menudo and birria' },
    { value: '333x', label: 'Faster leaderboard API in Memingo, 30s to 90ms' },
    { value: '77%', label: 'Feed API latency cut on a live platform' },
    { value: '0', label: 'Duplicate notifications after my transactional fix' },
  ],

  whatYouAreSolving: {
    points: [
      'Turning **sold-out and pre-order items into captured demand**, with back-in-stock alerts and waitlists, instead of visitors leaving with nothing',
      'Growing a **direct-to-consumer Shopify store** beyond one-off orders, with subscriptions and repeat purchase flows for ready-to-eat meals',
      'Making the **wholesale program** easy for buyers to join, reorder from and check availability, without email back and forth',
    ],
  },

  relevantEvidence: {
    intro:
      "A sold-out sign only costs you a sale if the customer has nowhere to leave their email. Fixing that means sending the right notification exactly once, which sounds simple until two requests arrive at the same moment.",
    companyProblem:
      "Pozolazo's bestsellers show as sold out or pre-order, so **demand arrives faster than stock**, and every visitor who leaves without a restock alert is a lost sale.",
    myExperience:
      'On a live social platform, users got **duplicate notifications under concurrent load**. I traced it to two requests both passing an existence check before either one wrote, wrapped the check and the create in a **database transaction with a unique constraint as a second line of defence**, and the duplicates stopped.',
    overlap:
      "**Direct match on the notification logic.** Back-in-stock alerts have exactly the same race condition. **I haven't built on Shopify or worked in food retail**, so Shopify's app and webhook model would be new ground.",
    projectImage: '/cunocovoProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/cunocovo',
  },

  realDecision: {
    problem: 'Users received duplicate notifications intermittently under concurrent load.',
    decision:
      'Wrapped the check and the create in a database transaction, and added a unique constraint as a second line of defence.',
    tradeoff:
      'Fixed it at the transaction boundary instead of patching the logic, so the database enforces the rule even if the application code gets it wrong.',
    result: '**The race condition was eliminated entirely**, with no duplicate notifications after the rewrite.',
  },

  cultureFit: {
    intro: "None of this is a personality test. It's what actually happened on the projects I've worked on.",
    traits: [
      {
        trait: 'Ownership',
        description:
          'Built Memingo and Moodly end to end alone, from data model to deployed app, including the Redis caching that took the Memingo leaderboard from 30 seconds to 90ms.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'For the leaderboard I precomputed the result ahead of read time instead of tuning the calculation, because reads were frequent. Every call I make names its trade-off.',
      },
      {
        trait: 'Production responsibility',
        description:
          'Led a migration of a live platform from AWS EC2 to Fly.io with zero user-facing downtime, keeping the old instance as a fallback until the cutover was verified.',
      },
      {
        trait: 'Speed on a small team',
        description:
          'Took a 3 second feed API to 700ms by profiling first and fixing four separate causes, not one, on a live platform with real users.',
      },
      {
        trait: 'Communication',
        description:
          'Worked directly with a non-technical CEO on product decisions and explained backend trade-offs in plain language.',
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

  relevantProjects: ['memingo', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This is a direct introduction rather than an application to a posted role. **I haven't built on Shopify or worked in food retail**, so that part would be new ground. Reliable notifications, fast APIs and safe migrations on a live product are things I've shipped, and I'd welcome a conversation about where they could help Pozolazo.",
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
    title: 'Talha Atif -> Pozolazo (Backend and E-commerce Engineer)',
    description: 'A technical introduction prepared for Pozolazo, a direct-to-consumer Mexican food brand.',
  },
}
