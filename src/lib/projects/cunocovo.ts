import { Project } from './types'

export const cunocovoProject: Project = {
  slug: 'cunocovo',
  title: 'Cunocovo, Social Platform for Creative Professionals',
  short: 'Connecting photographers, videographers, and creative professionals through a production-grade social platform',

  overview: 'Cunocovo is a production social networking platform built specifically for photographers, videographers, and creative professionals. The platform enables creatives to share their work, engage with a community of like-minded professionals, discover talent, and build their professional presence. Unlike generic social platforms, Cunocovo is purpose-built for visual creatives with features including content moderation, a reporting system with popularity-based ranking, real-time interactions, and a full admin moderation infrastructure. The platform was built and maintained across a full production lifecycle including AWS deployment, migration to Fly.io, and ongoing feature development serving real users daily.',

  problem: 'Creative professionals lack a dedicated space that understands their workflow and content needs. Generic platforms like Instagram and LinkedIn are either too casual or too corporate. Photographers and videographers need a platform where their work is the primary signal, where they can engage with a community that understands their craft, and where content quality is maintained through thoughtful moderation. Existing platforms have no concept of experience-level filtering, no content moderation infrastructure that scales without engineering involvement, and no tooling for platform administrators to manage reported content, user approvals, and moderation queues efficiently. Additionally, the onboarding experience on generic platforms creates significant friction for new creative professionals trying to establish their presence.',

  solution: 'Cunocovo provides a purpose-built social platform for creative professionals with a full stack Next.js and Node.js architecture. The platform features a content feed optimised for visual work, a JWT and OAuth-based authentication system, a complete content moderation pipeline with reported posts and comments, an admin panel for user approval workflows and moderation queues, real-time interactions via WebSockets, and a production infrastructure that was migrated from AWS EC2 to Fly.io with zero downtime. The backend is built with Node.js and Express.js with Supabase and PostgreSQL as the primary data layer using Drizzle ORM for type-safe queries.',

  projectGoals: [
    'Build a production-grade social platform serving real creative professionals with reliable uptime',
    'Implement a complete content moderation system reducing spam and low-quality content without manual engineering intervention',
    'Achieve sub-second feed loading through database optimisation and caching',
    'Build a full admin infrastructure enabling non-technical team members to manage users, content, and reports',
    'Migrate from AWS EC2 to Fly.io with zero downtime and no user-facing disruption',
    'Implement real-time features including notifications and live interactions using WebSockets',
    'Establish JWT and Google OAuth authentication with secure session management',
    'Maintain platform reliability and data consistency under concurrent user load'
  ],

  features: [
    'Content Feed: Optimised social feed for visual content with popularity ranking, real-time interactions, and infinite scroll',
    'Authentication: JWT-based authentication with automatic token refresh and Google OAuth 2.0 social login',
    'Content Moderation: Reported Posts and Comments systems with popularity ranking thresholds and duplicate-report prevention',
    'Admin Panel: Full moderation dashboard with user approval workflows, content queues, and search',
    'Real-Time Interactions: WebSocket-powered live notifications, comment updates, and interaction events',
    'Notification System: Transaction-backed notification delivery with duplication prevention and lifecycle management',
    'Rate Limiting: IP-based rate limiting across authentication and high-frequency post endpoints',
    'Cross-Platform Rendering: Consistent UI across Android, iOS, and Safari with resolved scroll lag and input handling',
    'Email Infrastructure: Transactional email system migrated to Plunk with delivery observability',
    'Referral System: Admin bypass referral codes with configurable usage limits'
  ],

  individualContributions: [
    'Optimised feed API from 3 seconds to 700ms by diagnosing bottlenecks across query structure, missing composite indexes on read-heavy columns, unused DTO fields, and cache absence, then fixing each layer independently',
    'Built Reported Posts and Comments systems end to end including PostgreSQL schema design, REST APIs with popularity ranking logic, admin moderation UI, and duplicate-report prevention with accurate count validation',
    'Fixed a notification duplication bug caused by non-transactional concurrent writes by replacing non-atomic query patterns with proper database transactions, restoring data consistency under concurrent load',
    'Resolved cross-platform rendering failures on Android, iOS, and Safari by tracing client-side execution bottlenecks causing scroll lag and input handling failures using passive event listeners and Intersection Observer',
    'Led zero-downtime infrastructure migration from AWS EC2 to Fly.io covering Docker configuration, DNS cutover, Supabase production environment, email provider migration to Plunk, and environment variable management',
    'Built full admin panel with user approval workflows, reported content moderation queues, search and filter functionality across approved, pending, and rejected states',
    'Implemented IP-based rate limiting across all authentication endpoints and high-frequency post APIs to prevent abuse',
    'Refactored 3000+ line monolithic React and Next.js components into modular architecture with custom hooks for validation and state management, reducing component coupling across the frontend codebase',
    'Fixed notification deletion lifecycle so notifications are correctly removed when parent comments are deleted',
    'Migrated email infrastructure to Plunk with structured delivery observability and transactional email reliability'
  ],

  architectureDetails: [
    {
      layer: 'Client Application',
      technology: 'Next.js 14 (App Router)',
      purpose: 'User-facing web interface for feed, profiles, content creation, and real-time interactions'
    },
    {
      layer: 'Admin Panel',
      technology: 'Next.js (admin panel)',
      purpose: 'Separate admin interface for user approval, content moderation, and platform management'
    },
    {
      layer: 'API Layer',
      technology: 'Node.js + Express.js',
      purpose: 'Primary REST API handling all business logic, authentication, and data access'
    },
    {
      layer: 'Authentication',
      technology: 'JWT + Google OAuth 2.0',
      purpose: 'Session management, token refresh, and social login via Google'
    },
    {
      layer: 'ORM and Query Layer',
      technology: 'Drizzle ORM',
      purpose: 'Type-safe PostgreSQL queries with schema-first database management'
    },
    {
      layer: 'Database',
      technology: 'Supabase + PostgreSQL',
      purpose: 'Primary relational data store for users, posts, notifications, and moderation data'
    },
    {
      layer: 'Real-Time Layer',
      technology: 'WebSockets',
      purpose: 'Live notifications, comment updates, and real-time interaction events'
    },
    {
      layer: 'Email Service',
      technology: 'Plunk (migrated from Nodemailer)',
      purpose: 'Transactional emails for account verification, notifications, and platform communications'
    },
    {
      layer: 'Infrastructure (v1)',
      technology: 'AWS EC2',
      purpose: 'Initial production deployment of backend API services'
    },
    {
      layer: 'Infrastructure (v2)',
      technology: 'Fly.io + Docker',
      purpose: 'Production infrastructure after zero-downtime migration, containerised deployment'
    },
    {
      layer: 'CI/CD',
      technology: 'GitHub Actions',
      purpose: 'Automated build, test, and deployment pipelines'
    },
    {
      layer: 'DNS and Domains',
      technology: 'Custom DNS configuration',
      purpose: 'Public platform and admin panel routing to their respective services'
    }
  ],

  challenges: [
    {
      title: 'Feed API Loading 3 Seconds on Production',
      description: 'The content feed was taking 3 seconds to load on production, causing users to abandon before content appeared. The issue was invisible in local development where the dataset was small and no network latency existed between the application and database.',
      solution: 'Diagnosed the bottleneck in four layers. First, the PostgreSQL query was filtering by user_id and ordering by created_at without a composite index, forcing a full table scan on every request. Second, the SELECT query was fetching 15 columns but the frontend only consumed 6, adding unnecessary serialisation overhead. Third, there was no caching so every user hitting the feed triggered a fresh database query. Added a composite index on (user_id, created_at DESC), removed 9 unused columns from the DTO, optimised the query structure, and added a 5-minute TTL in-memory cache keyed by user_id. Feed loading dropped from 3 seconds to 700ms, a 77 percent reduction.'
    },
    {
      title: 'Notification Duplication Under Concurrent Load',
      description: 'Users were receiving duplicate notifications for the same events, particularly on likes and comments. The duplication was intermittent and only appeared under concurrent load, making it difficult to reproduce in development and almost impossible to trace from logs alone.',
      solution: 'Traced the root cause to non-transactional write patterns. Two concurrent requests checking whether a notification existed and then creating it would both pass the existence check before either had written to the database, resulting in two notifications being created for the same event. Fixed by wrapping the check and create operations in a proper database transaction with a unique constraint on the notification table for the event type and source combination. This made the operation atomic and eliminated the race condition entirely.'
    },
    {
      title: 'Zero-Downtime Migration from AWS EC2 to Fly.io',
      description: 'The platform needed to migrate from AWS EC2 to Fly.io to reduce operational overhead and costs. The challenge was that real users were actively using the platform and any downtime would be immediately visible. The migration involved DNS changes, environment variables, Supabase connection strings, Docker configuration, and email provider cutover, all of which had to happen in the correct sequence.',
      solution: 'Planned the migration in phases. First built and tested the Docker configuration locally confirming the application ran correctly in the container. Then deployed to Fly.io with a temporary subdomain, ran smoke tests against the production database connection, and confirmed all services were functioning. Then cut over DNS from AWS EC2 to Fly.io while keeping the EC2 instance running as a fallback. Simultaneously migrated the email provider from Nodemailer to Plunk. DNS TTL had been lowered 24 hours before to speed up propagation. The full migration completed with no user-facing downtime and the EC2 instance was decommissioned once DNS had fully propagated globally.'
    },
    {
      title: 'Content Moderation at Scale Without Engineering Bottleneck',
      description: 'As the platform grew, spam posts and low-quality content were being reported by users but there was no system to handle these reports. Admins had to contact engineering to manually remove content, creating a bottleneck that caused reported content to stay visible for days.',
      solution: 'Built the Reported Posts and Reported Comments systems end to end. Designed the PostgreSQL schema to track reports with a unique constraint per user per post to prevent spam reporting. Built REST APIs that implemented a popularity ranking threshold so posts with enough reports relative to their engagement dropped out of the popular feed automatically without admin intervention. Built the admin moderation UI with a moderation queue, one-click approve and remove actions, and search across reported content. The entire moderation workflow from report to resolution now runs without engineering involvement.'
    },
    {
      title: 'Cross-Platform Rendering Failures on Mobile and Safari',
      description: 'Users on Android, iPhone, and Safari were reporting that the feed scrolled choppily, buttons were slow to respond, and input fields sometimes did not register taps. Desktop Chrome worked perfectly, making the issue difficult to reproduce in development.',
      solution: 'Opened Safari and Chrome mobile developer tools and profiled the main thread during scroll. Found that scroll event handlers were running synchronously on every scroll event, blocking the main thread. Added passive: true to scroll event listeners which tells the browser to scroll immediately without waiting for JavaScript. Added requestAnimationFrame wrapping for expensive scroll logic to defer it to the next paint cycle. For iOS Safari tap failures, traced the issue to custom button components built as div elements which iOS Safari does not treat as natively tappable. Switched to button elements. For image loading jank, implemented Intersection Observer to defer image loading until elements entered the viewport, eliminating getBoundingClientRect calls on every scroll event.'
    },
    {
      title: '2-Second Comment Button Latency',
      description: 'Users experienced a 2-second delay between clicking the comment button and seeing the comment count update. The delay was consistent and reproducible, making the comment interaction feel broken.',
      solution: 'Traced the frontend click handler and found it was making an API call to pre-fetch the comment count before opening the comment sheet, even though the comment count was already available in the current post state. The API call added 1.8 to 2 seconds of latency before the comment sheet opened. Removed the redundant pre-check entirely. The comment count was already in the component state from the feed fetch. Comment button response time dropped to 0ms with zero regression on comment state accuracy.'
    }
  ],

  techStack: {
    frontend: [
      'Next.js 14 (App Router)',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn UI',
      'React Hooks',
      'Custom Hooks',
      'React Context',
      'WebSockets (client)',
      'Intersection Observer API',
      'Passive Event Listeners'
    ],
    backend: [
      'Node.js',
      'Express.js',
      'TypeScript',
      'Drizzle ORM',
      'PostgreSQL',
      'Supabase',
      'JWT (jsonwebtoken)',
      'Google OAuth 2.0',
      'WebSockets',
      'Plunk (email)',
      'Rate Limiting',
      'IP-based throttling'
    ],
    infrastructure: [
      'Docker',
      'Fly.io',
      'AWS EC2 (previous)',
      'GitHub Actions',
      'Custom DNS',
      'CI/CD Pipelines'
    ]
  },

  tech: [
    'Next.js',
    'Node.js',
    'Express.js',
    'TypeScript',
    'Supabase',
    'PostgreSQL',
    'Drizzle ORM',
    'JWT',
    'Google OAuth',
    'WebSockets',
    'Docker',
    'Fly.io',
    'GitHub Actions'
  ],

  mermaidDiagrams: [
    {
      title: 'Post Report and Moderation Flow',
      type: 'sequence',
      code: `sequenceDiagram
    actor User
    participant Frontend as Next.js Frontend
    participant API as Node.js API
    participant DB as Supabase PostgreSQL
    participant Admin as Admin Panel

    Note over User,Admin: Phase 1: User Reports Content
    User->>Frontend: Clicks report on post or comment
    Frontend->>API: POST /reports/post/:postId
    API->>DB: Check if user already reported this post
    
    alt Already reported
        DB-->>API: Existing report found
        API-->>Frontend: 409 Already reported
        Frontend-->>User: Show already reported message
    else First report
        DB-->>API: No existing report
        API->>DB: Insert report record
        API->>DB: Increment post report count
        DB-->>API: Updated report count
        API->>DB: Check report count vs popularity threshold
        
        alt Report count exceeds threshold
            API->>DB: Remove post from popular feed
            DB-->>API: Feed updated
        end
        
        API-->>Frontend: 201 Report submitted
        Frontend-->>User: Show confirmation
    end

    Note over User,Admin: Phase 2: Admin Reviews Reports
    Admin->>Admin: Opens admin panel
    Admin->>API: GET /admin/reports?status=pending
    API->>DB: Query reported posts with report counts
    DB-->>API: Reported posts list
    API-->>Admin: Moderation queue

    Admin->>Admin: Reviews reported content
    
    alt Admin removes post
        Admin->>API: DELETE /admin/posts/:postId
        API->>DB: Delete post and associated reports
        API->>DB: Delete related notifications
        DB-->>API: Deleted
        API-->>Admin: Post removed
    else Admin dismisses report
        Admin->>API: PATCH /admin/reports/:reportId/dismiss
        API->>DB: Update report status to dismissed
        API->>DB: Restore post to feed if removed
        DB-->>API: Updated
        API-->>Admin: Report dismissed
    end`
    },
    {
      title: 'System Architecture Overview',
      type: 'flowchart',
      code: `graph TB
    subgraph Clients["Client Layer"]
        Web["Next.js Web App\n(cunocovo.com)"]
        AdminPanel["Next.js Admin Panel"]
    end

    subgraph APILayer["API Layer"]
        ExpressAPI["Node.js + Express.js\nREST API"]
    end

    subgraph Auth["Authentication"]
        JWT["JWT Token Validation"]
        GoogleOAuth["Google OAuth 2.0"]
    end

    subgraph RealTime["Real-Time Layer"]
        WSServer["WebSocket Server\nLive Notifications"]
    end

    subgraph DataLayer["Data Layer"]
        DrizzleORM["Drizzle ORM\nType-safe queries"]
        Supabase[("Supabase\nPostgreSQL")]
    end

    subgraph EmailLayer["Email Layer"]
        Plunk["Plunk\nTransactional Email"]
    end

    subgraph Infra["Infrastructure"]
        Docker["Docker\nContainerisation"]
        FlyIO["Fly.io\nProduction Hosting"]
        GHActions["GitHub Actions\nCI/CD Pipelines"]
        AWSEC2["AWS EC2\n(Previous)"]
    end

    Web -->|HTTPS REST| ExpressAPI
    AdminPanel -->|HTTPS REST| ExpressAPI

    ExpressAPI --> JWT
    ExpressAPI --> GoogleOAuth
    JWT -->|Validate| ExpressAPI
    GoogleOAuth -->|Token Exchange| ExpressAPI

    ExpressAPI --> DrizzleORM
    DrizzleORM --> Supabase

    Web <-->|WebSocket| WSServer
    WSServer --> ExpressAPI

    ExpressAPI --> Plunk

    ExpressAPI --> Docker
    Docker --> FlyIO
    GHActions --> Docker
    AWSEC2 -.->|Migrated to| FlyIO

    style Clients fill:#e1f5ff
    style APILayer fill:#f0f9ff
    style Auth fill:#fce7f3
    style RealTime fill:#fef3c7
    style DataLayer fill:#d1fae5
    style EmailLayer fill:#f3e8ff
    style Infra fill:#dbeafe`
    }
  ],

  webDesigns: [
    '/cunocovoProject/hero/hero.png?v=20260625',
    '/cunocovoProject/signUp.png',
    '/cunocovoProject/signUp-Validation.png',
    '/cunocovoProject/postCreate.png',
    '/cunocovoProject/about.png',
    '/cunocovoProject/alertDialog.png',
    '/cunocovoProject/emailSend.png'
  ],

  highlights: [
    'Feed API optimised from 3 seconds to 700ms through composite indexing, DTO cleanup, query optimisation, and in-memory caching',
    'Comment button latency eliminated from 2 seconds to 0ms by removing a redundant API pre-check',
    'Zero-downtime migration from AWS EC2 to Fly.io with full DNS cutover, Docker containerisation, and email provider migration',
    'Notification duplication bug eliminated through database transaction wrapping of previously non-atomic concurrent writes',
    'Cross-platform rendering fixed on Android, iOS, and Safari using passive event listeners and Intersection Observer',
    'Complete content moderation system built end to end removing engineering bottleneck from report to resolution',
    'Admin panel built at dedicated subdomain enabling non-technical moderation of users, posts, and comments',
    'IP-based rate limiting implemented across all authentication and high-frequency endpoints'
  ],

  metrics: [
    { label: 'Registered Users', value: '2,000+' },
    { label: 'Feed Load Time', value: '700ms' },
    { label: 'Feed Improvement', value: '77%' },
    { label: 'Comment Latency', value: '0ms' },
    { label: 'Migration Downtime', value: '0' },
    { label: 'Notification Duplication', value: 'Eliminated' },
    { label: 'Cross-Platform Issues', value: 'Resolved' },
    { label: 'Moderation Without Eng', value: '100%' },
    { label: 'Rate Limited Endpoints', value: 'All auth' }
  ],

  results: 'Built and maintained a production social platform serving real creative professionals with consistent reliability. Reduced feed loading from 3 seconds to 700ms through systematic multi-layer optimisation. Eliminated a 2-second comment button latency by identifying and removing a redundant API call. Fixed a notification duplication race condition through proper database transaction design. Resolved cross-platform rendering failures on Android, iOS, and Safari affecting scroll behaviour and tap interactions. Led a complete zero-downtime infrastructure migration from AWS EC2 to Fly.io. Built a full content moderation system that removed engineering from the report-to-resolution workflow. The platform operates with reliable uptime serving a community of photographers, videographers, and creative professionals.',

  platforms: ['web'],
  live: 'https://uppercase.cc/',
  instagram: 'https://www.instagram.com/uppercase.cc/',
  hero: '/cunocovoProject/hero/hero.png?v=20260625'
}



