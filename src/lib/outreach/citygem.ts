import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Backend%20and%20Mobile%20Engineer%20-%20Talha%20Atif%20(CityGem)'

export const citygemOutreach: OutreachPage = {
  slug: 'citygem',

  company: {
    name: 'CityGem',
    role: 'Backend and Mobile Engineer (informational)',
  },

  hero: {
    headline: 'Backend and AI engineering to help CityGem **open new cities faster**, without the app slowing down.',
    subtext:
      'A short technical introduction prepared specifically for CityGem, after looking at how the app delivers routes, audio guides and group walks across 100+ French cities and a growing list of countries.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['React Native app with an AI service, shipped solo', 'API latency cut from 3s to 700ms in production', 'Zero-downtime migration of a live platform'],

  keyStats: [
    { value: '100+', label: 'French cities CityGem already covers' },
    { value: '<1s', label: 'AI wait time in Moodly, down from 4-8s' },
    { value: '77%', label: 'Feed API latency cut on a live platform' },
    { value: '0', label: 'Downtime during a live AWS to Fly.io migration' },
  ],

  whatYouAreSolving: {
    points: [
      'Delivering **thousands of routes with audio descriptions** in every new city as CityGem expands from France into Spain, Italy, Germany, the UK, the US and Japan, without needing a large local content team in each one',
      'Keeping a **GPS-driven mobile experience** (nearby point-of-interest alerts, step tracking, achievement badges) fast and dependable on real phones as usage grows across countries',
      'Turning a free app into **lasting engagement and revenue**, through group walking events and premium experiences that people come back to',
    ],
  },

  relevantEvidence: {
    intro:
      "CityGem gets harder with every city it adds, because each one needs routes, audio and points of interest that feel local. I met the mobile side of that problem building Moodly alone, a React Native app that has to react instantly to the user while an AI service does slow work in the background.",
    companyProblem:
      'CityGem has to **produce and refresh route content in every new city** while the mobile experience, GPS guidance, nearby alerts and audio, stays quick and dependable on a phone in the street.',
    myExperience:
      'I built Moodly solo, end to end: a **React Native app, a NestJS backend and a FastAPI AI service**, with a **RabbitMQ pipeline** so the AI work runs asynchronously. That cut the perceived AI wait from **4-8 seconds to under 1 second**.',
    overlap:
      "**Transferable experience.** Moodly is a mobile app with an AI service behind it, which is the same shape as AI-assisted route and audio drafting behind CityGem's app. **I haven't built a GPS or maps product, and I haven't worked in tourism**, so route geometry and location services would be new ground.",
    projectImage: '/moodlyProject/hero/moodly-hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/moodly',
  },

  realDecision: {
    problem:
      'Synchronous bulk operations timed out above 500 items, and nobody could see which items had succeeded or failed.',
    decision:
      'Moved the work to chunked asynchronous processing at 500 records per chunk, after testing 100, 500 and 1000, with a job table recording progress so a crash resumes from the last completed chunk.',
    tradeoff:
      'More moving parts (a job table and chunk coordination) than a single bulk insert, in exchange for visibility and the ability to recover from partial failure.',
    result:
      '**Operations that used to time out now complete for 5,000+ users**, with real-time progress and a failure reason for each item. The same pattern fits generating and reviewing a whole city of routes in batches.',
  },

  cultureFit: {
    intro:
      "None of this is a personality test. It's what actually happened on the teams and projects I've worked on.",
    traits: [
      {
        trait: 'Ownership',
        description:
          'Built Moodly end to end alone, mobile app, backend, AI service and AWS deployment, and built the Intimec Access Portal from scratch on a 2-person engineering team.',
      },
      {
        trait: 'Working through ambiguity',
        description:
          'Moodly had no spec. I found the audio format mismatch between Expo (.m4a) and the FastAPI service (.wav) only at integration, and now test the seams between services early.',
      },
      {
        trait: 'Performance on real devices',
        description:
          'Fixed choppy scrolling and failed taps on Android, iOS and Safari using passive event listeners, requestAnimationFrame batching and Intersection Observer, with no visual changes.',
      },
      {
        trait: 'Technical decision-making',
        description:
          'Every call names its trade-off. For the feed API I profiled first and found four separate causes, a missing index, unused fields, no caching and an unoptimised query, instead of applying one fix and moving on.',
      },
      {
        trait: 'Applied AI',
        description:
          'Built a multimodal inference pipeline with Hugging Face models behind FastAPI, and a Gemini-powered tutor in Memingo, and I use LangGraph and CrewAI in my own projects.',
      },
      {
        trait: 'Communication',
        description:
          'Wrote complete onboarding documentation for a previously undocumented codebase and explained backend trade-offs directly to a non-technical CEO.',
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

  relevantProjects: ['moodly', 'memingo', 'cunocovo'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "This is a direct introduction rather than an application to a posted role. **I haven't built GPS or maps features and I haven't worked in tourism**, so that part would be new ground. A mobile app with an AI service behind it, kept fast under real load, is something I've built and shipped, and I'd welcome a conversation about where that could help CityGem.",
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
    title: 'Talha Atif -> CityGem (Backend and Mobile Engineer)',
    description: 'A technical introduction prepared for CityGem, a gamified walking app for exploring cities.',
  },
}
