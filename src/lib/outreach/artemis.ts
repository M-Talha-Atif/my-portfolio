import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20Engineer%20-%20Talha%20Atif%20(Artemis%20Security)'

export const artemisOutreach: OutreachPage = {
  slug: 'artemis',

  company: {
    name: 'Artemis Security',
    role: 'Backend Engineer (informational, not a role match)',
  },

  hero: {
    headline: 'A note from an engineer who is honestly **not a fit for your open role yet**, written anyway.',
    subtext: "A short technical introduction prepared for Artemis, after reading about the ClickHouse-powered detection pipeline and the Slack-native coding agent.",
    ctaLabel: 'See why I wrote this anyway ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Honest gap, not a role pitch', 'Reliability-at-scale experience', 'AI-native engineering habits'],

  keyStats: [
    { value: '15,000+', label: 'TB/day Artemis processes' },
    { value: '69x', label: 'Faster detection queries, their claim' },
    { value: '2yr', label: 'My experience vs their 4+ ask' },
  ],

  whatYouAreSolving: {
    points: [
      'Processing **15,000+ TB of security telemetry a day**, with detection queries running **69x faster** on ClickHouse',
      "Building AI agents that hunt threats and investigate findings fast enough to matter against AI-powered attackers",
      'Shipping product changes through a Slack-native coding agent that opened **1,500+ PRs in a month**',
    ],
  },

  relevantEvidence: {
    intro:
      "I want to be upfront about something most outreach like this pretends isn't true: the open Product Engineer role asks for **4+ years of experience** and a founder background, and the team appears to require US work authorization with on-site relocation to NYC. **I'm at about 2 years, based in Pakistan.** That's a real gap, not a technicality.",
    companyProblem:
      'Artemis runs detection at a scale (**15,000+ TB/day**, **69x faster** ClickHouse queries) and an AI-native engineering culture (a Slack-native coding agent shipping PRs directly) that most companies at this stage never reach.',
    myExperience:
      'At Intimec, I built a **Kafka-based event pipeline with dead-letter queues** for reliability at scale, and led a **zero-downtime OpenSearch migration across 5M+ documents** with 100K+ logs per cycle, the same order of "make this system fast and correct under real load" problem, just a different domain and a different scale tier.',
    overlap:
      "**I'm not claiming parity with a 4+ years, founder-background bar.** What I can say honestly: the reliability-at-scale and AI-native engineering instincts are real and demonstrated, even if the specific seniority and work-authorization requirements here don't line up yet.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Synchronous REST calls between services meant one service going down broke the entire approval chain, with no replay and no audit trail.',
    decision:
      'Designed an event-driven pipeline using Kafka for approval, rejection, and provisioning events, with dead-letter queues catching failures instead of losing them silently.',
    tradeoff:
      'More operational complexity than a direct synchronous call, in exchange for a system that survives individual service downtime and never silently drops a request.',
    result:
      '**Approval workflows now survive service outages**, with a full audit trail of what was requested, approved, and provisioned.',
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
          'Every architecture call I make names the trade-off accepted: Kafka with dead-letter queues over a direct synchronous call, alias-based reindexing over a maintenance-window rebuild, gRPC over REST for synchronous paths.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI inference pipeline (Moodly) with FastAPI and Hugging Face models, and use Claude, Copilot, and Cursor as daily engineering tools, the same AI-native instinct Artemis has built its own engineering culture around.',
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
      title: 'Direct Conversation',
      message: "Not asking for an interview against the current req, just a short conversation about where this could go.",
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Stay in Touch',
      message: 'If a role opens up that fits a ~2-year backend engineer, I would welcome being considered.',
      ctaLabel: 'Email me directly',
      ctaTarget: CONTACT_MAILTO,
    },
    {
      tier: 'Bronze',
      title: 'No Response Needed',
      message: "If the fit genuinely isn't there right now, no need to reply, I appreciate you reading this far.",
      ctaLabel: 'No action needed',
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
      "**This isn't a pitch that I'm secretly qualified for the current Product Engineer req. I'm not, not yet.** But the reliability-at-scale work I've actually shipped is real, and I wanted Artemis on my radar honestly rather than force-fitting a résumé to a role that says 4+ years and founder background.",
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
    title: 'Talha Atif -> Artemis Security',
    description: 'An honest, informational technical introduction to Artemis Security.',
  },
}
