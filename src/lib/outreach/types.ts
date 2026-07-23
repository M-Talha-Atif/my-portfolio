export type HiringPathTier = 'Premium' | 'Silver' | 'Bronze'

export type OutreachPage = {
  slug: string

  company: {
    name: string
    role: string
    logo?: string
  }

  hero: {
    headline: string
    subtext: string
    ctaLabel: string
    ctaTarget: string
    profileImage: string
  }

  whatYouAreSolving: {
    points: string[]
  }

  relevantEvidence: {
    intro: string
    companyProblem: string
    myExperience: string
    overlap: string
    projectImage?: string
    caseStudyLabel: string
    caseStudyUrl: string
  }

  realDecision: {
    problem: string
    decision: string
    tradeoff: string
    result: string
  }

  cultureFit: {
    intro: string
    traits: {
      trait: string
      description: string
    }[]
  }

  hiringPaths: {
    tier: HiringPathTier
    title: string
    message: string
    ctaLabel: string
    ctaTarget: string
  }[]

  scheduling: {
    url: string
    heading: string
    subtext?: string
  }

  // Slugs referencing src/lib/projects — only the projects relevant to this
  // company/role are listed here, resolved against the existing project data.
  relevantProjects: string[]

  closing: {
    note: string
    // Two clear, professional reach-out paths — e.g. "Book a call directly"
    // (ctaTarget '#schedule' opens the scheduler modal) and "Email me
    // directly" (a mailto: link). Kept as two distinct actions rather than
    // one ambiguous CTA.
    scheduleCtaLabel: string
    scheduleCtaTarget: string
    emailCtaLabel: string
    emailCtaTarget: string
  }

  backToPortfolio: {
    label: string
    href: string
  }

  metadata: {
    title: string
    description: string
  }
}
