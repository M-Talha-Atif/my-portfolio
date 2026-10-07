import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Full%20Stack%20Engineer%20-%20Talha%20Atif%20(Nordisk%20Robotparkering)'

export const nordiskRobotparkeringOutreach: OutreachPage = {
  slug: 'nordisk-robotparkering',

  company: {
    name: 'Nordisk Robotparkering AB',
    role: 'Full Stack Engineer (informational)',
  },

  hero: {
    headline: 'A **quote and layout tool** that turns an architect\'s plot size into a recommended parking system.',
    subtext:
      'A short technical introduction prepared specifically for Nordisk Robotparkering, after reading about the TrendVario range and how architects and developers currently find and specify the systems.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Built an enterprise catalog, cart and request portal', 'Transactional request handling', 'Full stack, from database to interface'],

  keyStats: [
    { value: '60+', label: 'Years of Klaus Multiparking experience behind your systems' },
    { value: '1M+', label: 'Parking spaces Klaus has delivered' },
    { value: '3', label: 'TrendVario models, 6100, 6200 and 6300' },
    { value: '8+', label: 'Microservices in the enterprise portal I built' },
  ],

  whatYouAreSolving: {
    points: [
      'Helping **architects and developers choose a system early**, with plot size, car count and EV charging in one calculator, instead of asking for every option by phone or email',
      'Turning website visits into **complete quote requests** with the project details your team needs to respond',
      'Giving customers a place to **log service requests and see maintenance history** after a system is installed',
    ],
  },

  relevantEvidence: {
    intro:
      "Choosing a parking system comes down to a few questions, how many cars, how much space and which lift type. That is a catalog, a few rules and a request form, which is the shape of software I've built before.",
    companyProblem:
      'Nordisk sells **multi-level automated parking systems to architects and developers**, and the site has no calculator, configurator or quote form, so every specification starts with a phone call or an email.',
    myExperience:
      'At Intimec I built the Access Portal from scratch, a **tile catalog, cart and multi-user requests** with department scoping, and designed the cart operations as **transactional units** so a partial failure never corrupts a request.',
    overlap:
      "**Transferable experience.** A catalog with a configuration cart and a request is the same shape as a quote configurator. **I haven't worked with parking, hardware or BIM data**, so the engineering rules for the systems would come from your team.",
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Employees had no structured way to request access to internal tools, and everything was manual and untracked.',
    decision:
      'Designed the cart operations as transactional units, so a partial failure never corrupts the state of a request.',
    tradeoff:
      'Treating every cart change as one unit of work takes more care up front, so that a failed change never leaves a half-saved request behind.',
    result: '**A working self-service system that the company now uses for all access management.**',
  },

  cultureFit: {
    intro: "None of this is a personality test. It's what actually happened on the projects I've worked on.",
    traits: [
      {
        trait: 'Ownership',
        description:
          'Built the Intimec Access Portal end to end on a 2-person engineering team, from the catalog through approvals and provisioning.',
      },
      {
        trait: 'Full stack range',
        description:
          'Built Moodly alone, a React Native app, NestJS backend and FastAPI service, and worked as a full stack contributor on a live production platform.',
      },
      {
        trait: 'Respect for real constraints',
        description:
          'In unfamiliar domains I ask for the rules first. In an undocumented codebase I reverse-engineered the setup and wrote it down for the next person.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Every call names its trade-off, and I keep the first version small enough to test with real users before adding more.',
      },
      {
        trait: 'Communication',
        description:
          'Worked directly with a non-technical CEO and explained technical trade-offs in plain language.',
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

  relevantProjects: ['intimec', 'jb-marks-govhub', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This is a direct introduction rather than an application to a posted role. **I haven't worked with parking systems, hardware or BIM data**, so the engineering rules would come from your team. A catalog, a configuration cart and a reliable request flow are things I've shipped, and I'd welcome a conversation about where they could help Nordisk.",
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
    title: 'Talha Atif -> Nordisk Robotparkering (Full Stack Engineer)',
    description: 'A technical introduction prepared for Nordisk Robotparkering AB, a Nordic supplier of automated parking systems.',
  },
}
