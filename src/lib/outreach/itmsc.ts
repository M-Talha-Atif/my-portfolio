import { OutreachPage } from './types'

const CONTACT_MAILTO = 'mailto:talhaatif573@gmail.com?subject=Software%20Developer%20-%20Talha%20Atif%20(ITMSC)'

export const itmscOutreach: OutreachPage = {
  slug: 'itmsc',

  company: {
    name: 'ITMSC',
    role: 'Software Developer',
  },

  hero: {
    headline: 'You listed frontend, backend, AI integration, PostgreSQL, Docker, and CI/CD as one role. I have shipped in all of them, in production, not as separate resume bullets.',
    subtext: 'A technical introduction prepared specifically for ITMSC, based on the live Software Developer posting.',
    ctaLabel: 'See the relevant evidence ↓',
    ctaTarget: '#evidence',
    profileImage: '/personal/profileImage.png',
  },

  heroHighlights: ['Full stack across AI, backend, frontend, and mobile', 'Production PostgreSQL, Docker, GitHub Actions CI/CD', 'Gemini and Hugging Face AI integration shipped, not a demo'],

  keyStats: [
    { value: '15,000', label: 'Employee scale, real production system' },
    { value: '12', label: 'Backend domain modules, zero circular dependencies' },
    { value: '67%', label: 'API latency cut by redesigning the query layer' },
  ],

  whatYouAreSolving: {
    points: [
      'Building and maintaining **web and software applications end to end**, responsive frontends backed by scalable services, not a frontend developer and a backend developer stitched together after the fact',
      'Integrating **REST APIs and third party services**, including AI APIs, reliably enough that a single upstream failure does not become an app wide outage',
      'Working across **PostgreSQL, Docker, CI/CD, and microservices** as daily tools, with the judgment to know when a query needs redesigning instead of just an index',
    ],
  },

  relevantEvidence: {
    intro:
      "ITMSC's own pitch is custom software, AI solutions, and cloud and automation work for US clients. That is not one specialization, it is breadth under one roof, which is exactly how my production experience is shaped.",
    companyProblem:
      'The role wants JavaScript or TypeScript, a modern frontend framework, a backend language, relational databases, REST API integration, Docker, and CI/CD, with AI API integration and microservices called out as preferred, not required, extras.',
    myExperience:
      'At Intimec I own an Identity Governance backend in **Java and Spring Boot on PostgreSQL**, with a **React and Next.js frontend**, gRPC between services, and a GitHub Actions pipeline gating every merge. On GovHub, a municipal HR platform for 15,000 employees, I designed **12 NestJS backend modules with zero circular dependencies**, a **Next.js 14 admin panel**, and a **Flutter mobile app**, all on **PostgreSQL through Prisma**, Dockerized, deployed through CI/CD. On Memingo I integrated the **Gemini API** for AI generated learning content and a **TensorFlow Lite** object detection model into a **Flask backend**, a **React frontend**, and a **native Kotlin and Jetpack Compose Android app**, one project touching AI, backend, frontend, and mobile at once. On Moodly I built a standalone **FastAPI inference service** wrapping Hugging Face models for image and voice emotion detection.',
    overlap:
      '**Direct overlap on JavaScript and TypeScript, React and Next.js, Node and Python backends, PostgreSQL, Docker, CI/CD, REST API integration, AI API integration, and mobile**, essentially the full requirements list plus every preferred qualification. **Honest note, my professional experience is just over 2 years against the 3 plus years listed.** What I can show instead of years is a project like Memingo that alone spans every domain this posting asks for.',
    projectImage: '/jbmarksProject/hero/hero.png',
    caseStudyLabel: 'Case study →',
    caseStudyUrl: '/projects/jb-marks-govhub',
  },

  realDecision: {
    problem:
      "Memingo's leaderboard calculated each user's score with a separate query per user, so response time grew with the user base and exceeded 5 seconds under load.",
    decision:
      'Rewrote the calculation as a MongoDB aggregation pipeline, combining scoring logic from multiple collections into one server side pass instead of looping and querying per user in application code.',
    tradeoff:
      'An aggregation pipeline is harder to write and debug than a simple loop, and it pushes computation onto the database engine instead of the app server. That cost was worth paying once the loop itself was the bottleneck, not the database.',
    result:
      'Average response time dropped from 5.2 seconds to 450 milliseconds, a 67 percent improvement, with no added infrastructure.',
  },

  cultureFit: {
    intro:
      'None of this is a personality test. It is what actually happened, and it maps directly to a role that spans frontend, backend, AI integration, and infrastructure.',
    traits: [
      {
        trait: 'Genuinely full stack, not frontend-leaning or backend-leaning',
        description:
          'Owned backend services in Java, Node, and Python, frontends in React and Next.js, and a native Android app in Kotlin and Jetpack Compose, sometimes on the same project.',
      },
      {
        trait: 'AI integration that shipped, not a side experiment',
        description:
          'Gemini API for production content generation on Memingo, a TensorFlow Lite object detection model driving a live learning feature, and a standalone FastAPI service wrapping Hugging Face models for Moodly.',
      },
      {
        trait: 'Query and architecture judgment, not just working code',
        description:
          'Diagnosed a per-user N+1 query pattern and redesigned it as a single aggregation pipeline instead of adding a cache on top of a broken query shape.',
      },
      {
        trait: 'Production infrastructure ownership',
        description:
          'PostgreSQL through Prisma, Dockerized services, and GitHub Actions CI/CD gating lint, type-check, and migration validation on every merge to main.',
      },
      {
        trait: 'Defensive, failure-aware integration design',
        description:
          'Third party API integrations built with timeouts, circuit breakers, and exponential backoff retries so one unreliable upstream provider cannot take down the whole app.',
      },
      {
        trait: 'Direct communication',
        description:
          'Comfortable naming an honest gap, like years of experience, directly instead of hoping it goes unnoticed.',
      },
    ],
  },

  hiringPaths: [
    {
      tier: 'Premium',
      title: 'Direct Interview',
      message: 'Skip the resume screen. Give me a technical conversation about the AI, backend, frontend, and mobile work above.',
      ctaLabel: "Let's talk",
      ctaTarget: '#schedule',
    },
    {
      tier: 'Silver',
      title: 'Hands-on Evaluation',
      message: 'Give me a real ticket or a short technical exercise across any part of the stack.',
      ctaLabel: 'Test my skills',
      ctaTarget: CONTACT_MAILTO,
    },
    {
      tier: 'Bronze',
      title: 'Traditional Process',
      message: 'Take me through the standard application and interview process.',
      ctaLabel: 'Start the process',
      ctaTarget: CONTACT_MAILTO,
    },
  ],

  relevantProjects: ['jb-marks-govhub', 'memingo', 'intimec'],

  scheduling: {
    url: 'https://calendly.com/talhaatif573',
    heading: 'Book time directly',
    subtext: 'No back and forth over email, pick a slot that works for you.',
  },

  closing: {
    note:
      "I want to name one thing honestly. **My professional experience is just over 2 years, against the 3 plus years listed in this posting.** What I can offer instead is unusually wide production coverage for that experience level, AI integration, backend services in three languages, frontend, and native mobile, all shipped, not just studied.",
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
    title: 'Talha Atif -> ITMSC (Software Developer)',
    description: "A technical introduction prepared for ITMSC's Software Developer role.",
  },
}
