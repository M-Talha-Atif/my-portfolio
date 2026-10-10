import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Full%20Stack%20Engineer%20-%20Talha%20Atif%20(Pogo)'

export const pogoOutreach: OutreachPage = {
  slug: 'pogo',

  company: {
    name: 'Pogo',
    role: 'Full Stack Engineer',
  },

  hero: {
    headline:
      "Full stack engineering for the part of Pogo's AI research product that brands never see, **the chain from a verified purchase to a finished interview**.",
    subtext:
      "A short technical introduction prepared specifically for Pogo's Full Stack Engineer role, after reading the posting, the AI research platform launch and how Pogo's purchase-verified panel works.",
    ctaLabel: 'See the problem and my approach ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Kafka pipelines where no event is silently lost', 'Never-twice notification fix on a live platform', 'Two AI products built solo, end to end'],

  keyStats: [
    { value: '3M+', label: 'Opted-in US users Pogo reports' },
    { value: '$470B+', label: 'Annual transaction value Pogo reports' },
    { value: '0', label: 'Events silently lost in my approval pipelines' },
    { value: '<1s', label: 'AI wait in Moodly, down from 4-8s' },
  ],

  whatYouAreSolving: {
    points: [
      "Shipping **AI agents that run interviews and surveys** with purchase-verified buyers, reliably enough that brands trust what comes back, which is the product this role builds, from agents to APIs to web UIs",
      'Getting the **right question to the right buyer at the right moment**, from purchase signals across cards, receipts and e-receipts, without ever contacting the same person twice',
      'Building **internal tools with GTM, finance and support**, so the manual work around studies, quality review and payouts disappears',
    ],
  },

  relevantEvidence: {
    intro:
      "Pogo's edge is that every respondent is backed by a real purchase. That only holds if the path from purchase signal to finished interview is exact. Nobody can be invited twice, nobody can be invited for a purchase that never happened, and no step can quietly drop a respondent. My most recent production work has been exactly that kind of reliability problem.",
    companyProblem:
      "The hardest part of the AI research product is not the interview itself. It is the **chain behind it**, purchase signal, eligibility, invitation, AI-moderated conversation, verification and delivery to a brand, run across millions of opted-in users, where every break in the chain costs a brand's trust. In my read, this is the part that decides whether the product can scale.",
    myExperience:
      "**My approach, and where I've built each piece before.** First, treat every purchase as an event and run it through a rules engine that decides eligibility, the grouped-condition engine I built at Intimec. Second, make the invite idempotent with a unique constraint as a second line of defence, the fix that ended duplicate notifications at Digital Upgraders. Third, run the interview as a stateful agent with session context and structured output on every turn, as in the Memingo tutor. Fourth, process it asynchronously with retries and a dead-letter queue so nothing is lost silently, as in my Kafka and RabbitMQ pipelines. Fifth, give GTM and support a console that shows why any invite or interview failed, the way my bulk engine reports a failure reason for each of 5,000+ users.",
    overlap:
      "**Transferable experience.** A purchase-triggered research invite has the same shape as an approval event, a targeting rule and a never-twice notification. **I haven't worked with Plaid, card transaction data or a consumer panel at millions of users**, and my largest scale so far is 5,000+ users per operation and 5M+ documents, so the fintech data layer and that scale would be new ground.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem: 'Users received duplicate notifications intermittently under concurrent load.',
    decision:
      'Traced it to two concurrent requests both passing an existence check before either wrote, then wrapped the check and the create in one database transaction and added a unique constraint as a second line of defence.',
    tradeoff:
      'Fixed it at the transaction boundary instead of patching the application logic, so the database enforces the rule even when the code gets it wrong.',
    result:
      '**The race condition was eliminated entirely.** For Pogo, the same principle is what keeps a verified buyer from being invited twice.',
  },

  cultureFit: {
    intro:
      "Your posting names calculated speed, ownership and comfort with ambiguity. Here is the evidence for each. And if we worked together, week one would be the thinnest end-to-end slice, one purchase signal to one finished, verified interview, shipped and measured, then widened from there.",
    traits: [
      {
        trait: 'Owning a whole part of the product',
        description:
          'Built the Intimec Access Portal end to end on a 2-person engineering team, and built Moodly alone across the mobile app, the backend and the AI service.',
      },
      {
        trait: 'Frontend and backend, as needed',
        description:
          'Moodly spans React Native, NestJS and FastAPI, and I fixed scroll jank and tap failures on Android, iOS and Safari without changing the design.',
      },
      {
        trait: 'Heavy AI tool user',
        description:
          'Claude, GitHub Copilot and Cursor are daily engineering tools for me, and I work with LangGraph, CrewAI and RAG in my own projects.',
      },
      {
        trait: 'Working through ambiguity',
        description:
          'The Intimec entitlement rules had no spec. I designed the grouped condition model myself, then built a 26-employee adversarial test dataset that caught a compliance-critical bug before production.',
      },
      {
        trait: 'Internal tools that remove manual work',
        description:
          'Replaced a fully manual, untracked access process with a self-service portal the company now uses for all access management.',
      },
      {
        trait: 'Clear communication',
        description:
          'Worked directly with a non-technical CEO on product decisions, and wrote complete onboarding documentation for a codebase that had none.',
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

  relevantProjects: ['intimec', 'moodly', 'memingo', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "I read the posting and I'm applying for it directly. **I haven't worked with Plaid or card transaction data, and I'm based in Pakistan**, so I'd need to understand whether a remote arrangement works for this role. The reliability problems underneath the product, never-twice invites, events that are never lost and agents that stay on track, are ones I've shipped solutions for, and I'd welcome a conversation about where that helps Pogo.",
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
    title: 'Talha Atif -> Pogo (Full Stack Engineer)',
    description: 'A technical introduction prepared for Pogo, a consumer fintech app with an enterprise AI research product.',
  },
}
