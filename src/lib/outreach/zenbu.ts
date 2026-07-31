import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Zenbu.js%20Open%20Source%20-%20Talha%20Atif'
const ZENBU_ISSUES_URL = 'https://github.com/zenbu-labs/zenbu.js/issues'

export const zenbuOutreach: OutreachPage = {
  slug: 'zenbu',

  company: {
    name: 'Zenbu',
    role: 'Open Source Contributor',
  },

  hero: {
    headline: 'React Scan, the Next.js team, and now the IDE you actually wanted for working with agents. That is a **rare, real throughline**.',
    subtext: 'A note prepared for Rob Pruzan and Zenbu. This is not a job pitch, just genuine interest in Zenbu.js and a direct question about contributing.',
    ctaLabel: 'See why it resonates ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Not a job pitch, genuine interest', '13 open issues, 16 open PRs read', 'Real offer to help the backlog'],

  keyStats: [
    { value: '253', label: 'Stars on zenbu-labs/zenbu.js' },
    { value: '13', label: 'Open issues right now' },
    { value: '16', label: 'Open pull requests right now' },
  ],

  whatYouAreSolving: {
    points: [
      'Running several coding agents in parallel and trusting what they changed without anyone reviewing it by hand line by line',
      'Giving every developer and team a way to shape the IDE itself around how they actually work, instead of accepting one fixed workflow',
      'Keeping an extensible, plugin first architecture coherent as real community contributions start arriving **faster than one founder can review them**',
    ],
  },

  relevantEvidence: {
    intro:
      'Zenbu.js is a genuinely well scoped idea. Hackable software where the real source code ships to production instead of a frozen bundle, tracked by git on the user\'s machine, with plugins hot reloading the same way application code does. I read through the repo, the docs, and your blog before writing this.',
    companyProblem:
      'Zenbu.js ships raw source code to production and keeps it git tracked on the user\'s machine, with plugins hot reloading the same way application code does. It is still **Alpha on Electron**, with Node, Tauri, and browser native all marked as work in progress, and fault isolation for the plugin and injection layer is an open item on the roadmap.',
    myExperience:
      'I work inside Claude, Copilot, and Cursor daily, use LangGraph and CrewAI for multi agent orchestration, and currently contribute to **OpenTracer, an AI agent observability project**. The problem underneath Zenbu, trusting and managing what a coding agent actually changed, is one I think about often, not just as a user of these tools.',
    overlap:
      'I noticed **13 open issues and 16 open pull requests** on zenbu-labs/zenbu.js right now, several from real outside contributors, sitting open for a while against what looks like a small core team. I am not raising that as a criticism, open source moving this fast tends to outrun one person\'s review bandwidth, and that is a good problem to have. I wanted to ask directly, **do you accept outside help** working through some of that backlog, because I would genuinely like to contribute rather than just star the repo.',
    projectImage: '/moodlyProject/hero/moodly-hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/moodly',
  },

  realDecision: {
    problem:
      'Synchronous REST calls between services meant one service going down broke the entire approval chain, with no replay and no audit trail.',
    decision:
      'Designed an event driven pipeline using Kafka for approval, rejection, and provisioning events, with dead letter queues isolating individual failures instead of letting them cascade through the chain.',
    tradeoff:
      'Chose reliability and fault isolation over raw latency, since approval workflows are reliability sensitive, not latency sensitive.',
    result:
      '**Approval workflows now survive individual service downtime**, with failures caught and isolated instead of taking down the whole chain, the same instinct behind hardening an injection layer for fault isolation.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it is why this message exists instead of a starred repo.',
    traits: [
      {
        trait: 'Reads before it writes',
        description:
          'Went through the zenbu.js README, the open issues, the open pull requests, and your blog before writing this, rather than sending a templated message.',
      },
      {
        trait: 'Reliability and fault isolation instinct',
        description:
          'Built a Kafka based approval pipeline with dead letter queues specifically so one failure could not cascade through the whole chain, the same instinct behind hardening an injection layer for fault isolation.',
      },
      {
        trait: 'Daily AI agent workflow',
        description:
          'Claude, Copilot, and Cursor are daily tools, I use LangGraph and CrewAI for multi agent orchestration, and I contribute to OpenTracer, an AI agent observability project.',
      },
      {
        trait: 'Comfortable in unfamiliar codebases',
        description:
          'Reverse engineered and documented a completely undocumented codebase at a previous job, the same discipline needed to pick up an unfamiliar open source repo and contribute usefully rather than just skim it.',
      },
      {
        trait: 'Genuine, not transactional',
        description:
          'This message has no ask attached to a job or a sale, just real appreciation for the work and an honest question about whether help is wanted.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Point Me At Something Real',
      message: 'Tell me which open issue or pull request actually needs help first, and I will pick it up.',
      ctaLabel: 'See the open issues',
      ctaTarget: ZENBU_ISSUES_URL,
    },
    {
      tier: 'Silver',
      title: 'Let Me Try A Small One First',
      message: 'If you would rather test the waters, give me one smaller open PR to review or one issue to reproduce, and I will report back.',
      ctaLabel: 'See the open pull requests',
      ctaTarget: 'https://github.com/zenbu-labs/zenbu.js/pulls',
    },
    {
      tier: 'Bronze',
      title: 'Just A Conversation',
      message: 'No commitment either way, I would still like to talk about Zenbu.js and how you are thinking about the plugin and injection model.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
  ],

  hiringPathsHeading: 'Ways I could help',
  hiringPathsSubtext: 'No pressure either way, this is genuine interest, not an ask for anything in return.',

  relevantProjects: ['intimec', 'moodly'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      'This was written because Zenbu.js is genuinely interesting engineering, not because I am looking for a role. If there is a real backlog you would want outside help on, I would like to be useful rather than just admire it from the outside.',
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
    title: 'Talha Atif -> Zenbu (Open Source)',
    description: 'A genuine note of appreciation for Zenbu.js and a direct question about contributing to open issues and pull requests.',
  },
}
