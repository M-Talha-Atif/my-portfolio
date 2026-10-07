import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20and%20Automation%20Engineer%20-%20Talha%20Atif%20(neo%20communication)'

export const neoCommunicationOutreach: OutreachPage = {
  slug: 'neo-communication',

  company: {
    name: 'neo communication ag',
    role: 'Backend and Automation Engineer (informational)',
  },

  hero: {
    headline: "Workflow automation so neo's certified translators **spend their time on language, not on process**.",
    subtext:
      'A short technical introduction prepared specifically for neo communication, after reading how the team combines translation, system integration and ISO 17100 and 18587 certified post-editing.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Kafka pipelines with retries and dead-letter queues', 'LLM and RAG integrations with fallback logic', 'Wrote onboarding docs for an undocumented codebase'],

  keyStats: [
    { value: '332', label: 'Translators neo works with' },
    { value: '24', label: 'Target languages' },
    { value: 'ISO 18587', label: 'Machine translation post-editing audit passed' },
    { value: '0', label: 'Events silently lost in my approval pipelines' },
  ],

  whatYouAreSolving: {
    points: [
      'Staying ahead of **machine translation pressure from tools like DeepL and Lengoo**, by making the human plus machine workflow faster and easier to trust',
      'Connecting client content systems and **SharePoint** to translation jobs, so work flows in and out without manual copying',
      'Running **terminology and quality checks** across 24 languages and 68 specialist fields in a way a certified process can audit',
    ],
  },

  relevantEvidence: {
    intro:
      "A translation agency with 332 translators is really a workflow business. Jobs move between people, tools and clients, and a lost or stuck job is a missed deadline. I've built that kind of reliability layer before.",
    companyProblem:
      'neo has to **move multilingual jobs between clients, translators and machine translation reliably**, while keeping a certified and auditable process.',
    myExperience:
      'At Intimec I built a **Kafka-based approval pipeline with dead-letter queues and retry windows** across 8+ microservices, so a service going down never silently lost a request.',
    overlap:
      "**Transferable experience.** Approval events and translation jobs are both long-running, multi-step workflows that have to survive failure. **I haven't built translation or localization tools**, and I haven't worked with CAT tools or translation memories, so that domain would be new ground.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Synchronous REST calls between services meant one service going down broke the entire approval chain, with no replay and no audit trail.',
    decision:
      'Designed an event-driven pipeline on Kafka for approval, rejection and provisioning events, with dead-letter queues catching failures.',
    tradeoff:
      'Took on the operational complexity of running Kafka and gave up the simplicity of a direct call, because reliability mattered more than speed.',
    result:
      '**Approval workflows now survive individual service downtime**, and failures land in a dead-letter queue instead of disappearing.',
  },

  cultureFit: {
    intro: "None of this is a personality test. It's what actually happened on the projects I've worked on.",
    traits: [
      {
        trait: 'Ownership',
        description:
          'Built the Intimec Access Portal from scratch on a 2-person engineering team, from the catalog through approval routing and provisioning.',
      },
      {
        trait: 'Documentation',
        description:
          'Joined a codebase with no documentation, reverse-engineered the setup and wrote complete onboarding docs, so nobody after me hits the same wall.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal AI pipeline with Hugging Face models behind FastAPI, a Gemini-powered tutor in Memingo, and I use LangGraph and CrewAI in my own projects, with error handling and fallbacks around the model calls.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Chose Kafka for reliability-sensitive workflows and gRPC for synchronous lookups, and named the trade-off of each, instead of using one tool everywhere.',
      },
      {
        trait: 'Communication',
        description:
          'Worked directly with a non-technical CEO and translated technical trade-offs into language each side could act on.',
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

  relevantProjects: ['intimec', 'moodly', 'memingo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This is a direct introduction rather than an application to a posted role. **I haven't built translation or localization tools**, so that domain would be new ground. Reliable multi-step workflows and AI integrations with proper failure handling are things I've shipped, and I'd welcome a conversation about where they could help neo.",
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
    title: 'Talha Atif -> neo communication (Backend and Automation Engineer)',
    description: 'A technical introduction prepared for neo communication ag, a Swiss translation and language services company.',
  },
}
