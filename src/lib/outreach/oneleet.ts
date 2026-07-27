import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20Engineer%20-%20Talha%20Atif%20(Oneleet)'

export const oneleetOutreach: OutreachPage = {
  slug: 'oneleet',

  company: {
    name: 'Oneleet',
    role: 'Backend Engineer',
  },

  hero: {
    headline: 'I have built the exact compliance grade systems you are now selling as a platform, and I know where the theater usually hides.',
    subtext: 'A technical introduction prepared for Oneleet, built around the direct overlap between your product, access reviews, audit trails, risk management, and the IAM and compliance systems I have actually owned.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  whatYouAreSolving: {
    points: [
      'Growing engineering quickly after a $33M Series A, while keeping the real security you are selling against rather than the theater the product is explicitly built to replace',
      "Backend and fullstack roles that own real compliance surfaces end to end, access reviews, audit trails, risk mapping, not ticket execution against someone else's spec",
      'Hiring engineers who have actually lived the compliance problem from the inside, not just wired up an API that returns a checkbox',
    ],
  },

  relevantEvidence: {
    intro:
      "Oneleet's own pitch is that most compliance platforms are theater, and real security is what you are actually selling. That claim holds up best when the people building it have actually built compliance sensitive systems before, not just read about SOC 2 in a spec sheet.",
    companyProblem:
      'The open backend and fullstack roles center on Go, PostgreSQL, and third party integrations, building the access review, audit, and risk infrastructure the platform runs on, inside a fast moving Series A engineering team.',
    myExperience:
      'At Intimec I owned an enterprise IAM platform end to end on a two person team, including the entitlement rule engine and the access request and audit pipeline underneath it. I refactored the entire audit log schema to remove raw personal data while preserving full forensic traceability, the same compliance versus utility trade off your platform is built around.',
    overlap:
      'Direct domain overlap on access governance, audit trails, and compliance sensitive data modeling, the exact surface area of Access Reviews and Risk Management. Honest gap, my production backend work has been in Java, Node, and Python, not Go, so the language itself would be new, though the systems I have built map closely to what this role actually owns.',
    projectImage: '/intimecProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/intimec',
  },

  realDecision: {
    problem:
      'Audit logs at Intimec contained raw personal identity data directly, creating real compliance exposure the moment anyone reviewed the schema closely.',
    decision:
      'Refactored the audit schema to reference identity IDs and operation metadata instead of raw personal data, rather than stripping out the detail an investigator would actually need later.',
    tradeoff:
      'Removing personal data outright would have been faster but would have broken forensic traceability during a real investigation. Keeping raw personal data was the easy path but left exactly the exposure a real audit would flag.',
    result:
      'Restored compliance alignment while preserving the audit detail needed for investigation, treating compliance and forensic usefulness as compatible rather than a trade off where one side has to lose.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it lines up closely with what you are building.',
    traits: [
      {
        trait: 'Ownership of compliance sensitive systems',
        description:
          'Owned an enterprise IAM platform end to end at Intimec, entitlement rules, access requests, provisioning, and the audit trail underneath all of it, on a two person team.',
      },
      {
        trait: 'Adversarial verification instinct',
        description:
          'Built a deliberate 26 employee adversarial test dataset specifically to expose a multi group rule engine bug that normal testing missed, the same instinct behind refusing to trust a green checkmark as proof a system is actually secure.',
      },
      {
        trait: 'Compliance versus utility trade off thinking',
        description:
          'Refactored a PII exposed audit schema to remove personal data while preserving full forensic traceability, treating compliance and usefulness as compatible rather than opposed.',
      },
      {
        trait: 'Fast moving startup execution',
        description:
          'Owned features end to end on small teams, requirements through deployment, at Intimec and on personal AI integrated products, the same shape of ownership a scrappy Series A team needs.',
      },
      {
        trait: 'Willingness to learn in public',
        description:
          'No production Go experience today, named directly rather than glossed over. Comfortable picking up a new primary language quickly when the underlying systems problem is one I already understand deeply.',
      },
      {
        trait: 'Direct communication with founders',
        description:
          'Translated backend trade offs directly for a non technical CEO on product decisions at a previous company, and prefer direct, unpadded communication over hedged language.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the resume screen. Talk to me directly about the access review and audit systems I have already built.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real ticket in Go, or a live pairing session, and see how fast I actually pick up a new primary language.',
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
      'I do not have production Go experience today, and I want to name that plainly rather than imply otherwise. But the systems knowledge underneath this role, access governance, audit integrity, compliance versus usability trade offs, is not new to me, it is what I have already built. I would welcome a direct conversation about where that transfers.',
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
    title: 'Talha Atif -> Oneleet (Backend Engineer)',
    description: "A technical introduction prepared for Oneleet's Backend Engineer role, built around direct IAM and compliance systems overlap.",
  },
}
