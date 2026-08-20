import { Project } from './types'

export const govHubProject: Project = {
  slug: 'jb-marks-govhub',

  title: 'GovHub — Municipal HR Platform for JB Marks Local Municipality',

  short: 'Enterprise HR and workforce management platform serving 15,000 municipal employees across attendance, leave, payroll, and compliance workflows.',

  overview: 'GovHub is a full-stack enterprise HR platform built for JB Marks Local Municipality to replace paper-based and spreadsheet-driven HR processes. It serves up to 15,000 employees across a Flutter mobile app and a Next.js admin panel, with a NestJS microservice-style backend handling attendance tracking, multi-level leave approvals, study assistance, shift enforcement, and compliance reporting. The platform is designed to scale to additional South African municipalities with zero architectural changes.',

  problem: 'JB Marks Municipality managed attendance, leave, and HR workflows entirely through paper forms and disconnected spreadsheets, creating approval bottlenecks that delayed employee requests by weeks, made compliance reporting impossible to automate, and gave HR and Finance no real-time visibility into workforce status. With 15,000 employees across multiple departments and operational roles, the manual process could not scale and introduced significant audit risk.',

  solution: 'Built a modular NestJS backend with domain-driven module boundaries covering auth, attendance, leave, study, notifications, employee import, and analytics. Each domain owns its own service, controller, DTO layer, and audit trail. A configurable multi-level approval chain engine drives leave, study, and acting assignment workflows without hardcoding role logic. The Flutter mobile app handles daily clock-in and clock-out with offline sync, while the Next.js admin panel provides role-scoped dashboards for HR, Finance, Directors, and Municipal Managers. A dedicated read-only Analytics module queries PostgreSQL directly via Prisma with Redis caching for cross-domain aggregations powering the Executive Dashboard.',

  features: [
    'Configurable Approval Chain Engine: multi-level approval routing for leave, study, and acting assignments driven by a database-backed chain config, supporting fallback to HR Admin when levels are unresolvable',
    'Phase 1 Shift Rule Enforcement: clock-in and clock-out validated against the global shift (07:45 to 16:00) via a getEffectiveShift abstraction designed to swap in Phase 2 roster assignment without touching any validation logic',
    'Offline Attendance Sync: Flutter mobile app queues clock-in and clock-out events locally when offline and syncs via POST /attendance/sync on reconnection, with supervisor-mark fallback for employees without smartphones',
    'Bulk Employee Import: AES-256-GCM encrypted file upload to Cloudflare R2, BullMQ async processing with per-row status tracking, retry with exponential backoff, and full audit trail per imported user',
    'Role-Scoped Admin Panel: twelve-page Next.js 14 admin panel with per-role sidebar visibility, backend 403 guards, and data scoping so supervisors see only their team while HR Admin sees the full organisation',
    'Read-Only Analytics Module: separate NestJS analytics module querying Prisma directly without calling domain services, serving five executive KPI endpoints with Redis TTL caching and a recursive CTE for org chain depth analysis',
    'Immutable Audit Log: every state-changing operation across all modules writes to a single append-only audit_logs table via a shared AuditService, with before and after snapshots and IP address capture',
    'Leave Balance Engine: entitlement calculation supporting carryover caps, cycle-based sick leave (3-year rolling), contractor restrictions, probation blocking, and half-day splits across nine leave types',
    'Cloudflare R2 Storage: all uploaded files (profile images, leave documents, study documents) routed through a shared StorageService with public URL and signed URL modes, folder-based key organisation, and old-file deletion on replace',
    'CI/CD Pipeline: GitHub Actions pipeline with lint, type-check, Prisma migration validation, and Docker build stages gating every merge to main, with zero-downtime deployment to Render',
  ],

  tech: [
    'NestJS',
    'Next.js 14',
    'Flutter',
    'PostgreSQL',
    'Prisma ORM',
    'Redis',
    'BullMQ',
    'Cloudflare R2',
    'Docker',
    'GitHub Actions',
  ],

  hero: '/jbmarksProject/hero/hero.png',

  platforms: ['web', 'mobile'],

  webDesigns: [
    '/jbmarksProject/webImages/bursary-analytics.png',
    '/jbmarksProject/webImages/shift-settings.png',
    '/jbmarksProject/webImages/leave-types-config.png',
    '/jbmarksProject/webImages/workforce-analytics.png',
    '/jbmarksProject/webImages/notifications.png',
  ],

  mobileDesigns: [
    '/jbmarksProject/mobileImages/home-dashboard-light.jpeg',
    '/jbmarksProject/mobileImages/home-dashboard-dark.jpeg',
    '/jbmarksProject/mobileImages/attendance-ready-light.jpeg',
    '/jbmarksProject/mobileImages/attendance-ready-dark.jpeg',
    '/jbmarksProject/mobileImages/attendance-clocked-in-late-dark.jpeg',
    '/jbmarksProject/mobileImages/attendance-correction-request-dark.jpeg',
    '/jbmarksProject/mobileImages/attendance-correction-datepicker-dark.jpeg',
    '/jbmarksProject/mobileImages/leave-overview-light.jpeg',
    '/jbmarksProject/mobileImages/leave-overview-dark.jpeg',
    '/jbmarksProject/mobileImages/apply-leave-schedule-light.jpeg',
    '/jbmarksProject/mobileImages/apply-leave-schedule-dark.jpeg',
    '/jbmarksProject/mobileImages/apply-leave-justification-dark.jpeg',
    '/jbmarksProject/mobileImages/apply-leave-review-dark.jpeg',
    '/jbmarksProject/mobileImages/leave-details-draft-dark.jpeg',
    '/jbmarksProject/mobileImages/leave-details-loading-dark.jpeg',
    '/jbmarksProject/mobileImages/leave-approval-transparency-dark.jpeg',
    '/jbmarksProject/mobileImages/leave-calendar-dark.jpeg',
    '/jbmarksProject/mobileImages/notifications-dark.jpeg',
    '/jbmarksProject/mobileImages/profile-menu-dark.jpeg',
  ],

  techStack: {
    frontend: [
      'Next.js 14 App Router',
      'TypeScript strict mode',
      'Tailwind CSS',
      'shadcn/ui',
      'TanStack Query v5',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Recharts',
    ],
    backend: [
      'NestJS 10',
      'TypeScript',
      'Prisma ORM',
      'PostgreSQL 15',
      'Redis 7',
      'BullMQ',
      'Passport JWT',
      'class-validator',
      'Pino structured logging',
    ],
    mobile: [
      'Flutter',
      'Offline-first local queue sync',
    ],
    infrastructure: [
      'Docker',
      'GitHub Actions CI/CD',
      'Render (API hosting)',
      'Fly.io (frontend)',
      'Cloudflare R2 (object storage)',
      'Brevo (SMS/OTP delivery)',
      'Firebase Cloud Messaging (push notifications)',
    ],
  },

  architectureDetails: [
    {
      layer: 'Mobile App',
      technology: 'Flutter (iOS + Android)',
      purpose: 'Employee-facing clock-in/out with offline queue, leave requests, study applications, and approval queues for manager roles',
    },
    {
      layer: 'Admin Panel',
      technology: 'Next.js 14 App Router + TypeScript',
      purpose: 'Role-scoped HR administration across twelve pages covering employee management, approvals, attendance, analytics, and system configuration',
    },
    {
      layer: 'API Gateway',
      technology: 'NestJS + Passport JWT + RolesGuard',
      purpose: 'Stateless JWT authentication with role-based access control enforced at controller level across all domain modules',
    },
    {
      layer: 'Domain Modules',
      technology: 'NestJS modular DDD, 12 bounded contexts',
      purpose: 'Auth, Users, Departments, Attendance, Leave, Study, Notifications, Employee Import, Theme, Approval Chain Config, Storage, Analytics — each with its own service, controller, DTO, and constants layer',
    },
    {
      layer: 'Approval Chain Engine',
      technology: 'Database-driven config + recursive chain resolution',
      purpose: 'Configurable per-role multi-level approval routing with acting assignment resolution and HR Admin fallback, shared across leave, study, and overtime modules',
    },
    {
      layer: 'Analytics Layer',
      technology: 'Dedicated read-only NestJS module + Redis cache',
      purpose: 'Cross-domain aggregations for Executive Dashboard and department KPIs querying Prisma directly without domain service coupling, cached with 60-300 second TTL',
    },
    {
      layer: 'Async Processing',
      technology: 'BullMQ + Redis',
      purpose: 'Bulk employee import processed asynchronously with per-row status tracking, retry with exponential backoff, and AES-256-GCM encrypted file storage on R2',
    },
    {
      layer: 'Database',
      technology: 'PostgreSQL 15 + Prisma ORM',
      purpose: 'Single source of truth for all HR data with Prisma-managed migrations, immutable audit_logs table, and recursive CTE queries for org hierarchy depth analysis',
    },
    {
      layer: 'Object Storage',
      technology: 'Cloudflare R2 (S3-compatible)',
      purpose: 'Stores profile images, leave documents, study documents, and encrypted import files with folder-based key organisation and automatic old-file deletion on replace',
    },
    {
      layer: 'CI/CD Pipeline',
      technology: 'GitHub Actions + Docker',
      purpose: 'Lint, TypeScript type-check, Prisma migration validation, and Docker build stages gate every merge to main with zero-downtime deployment to Render',
    },
  ],

  challenges: [
    {
      title: 'Configurable approval chain that works across three modules without duplicating routing logic',
      description: 'Leave, study, and acting assignments all needed multi-level approval but with different chain depths per role and different fallback rules. Hardcoding role logic in each module would have made the system impossible to reconfigure without code changes.',
      solution: 'Built a single approval_chain_configs table storing max_levels and level_roles per role. A shared chain resolution service walks the supervisor hierarchy at request time, detects acting assignments, and falls back to HR Admin when a level is unresolvable. All three modules call this single resolver. HR Admin can reconfigure any chain from the admin panel without a deployment.',
    },
    {
      title: 'Phase 1 shift enforcement designed so Phase 2 roster does not require rewriting validation logic',
      description: 'Attendance validation needed to enforce the global shift in Phase 1 but allow per-employee roster overrides in Phase 2 without touching clock-in logic. Adding an if/else in the attendance service for roster would have coupled two unrelated domains.',
      solution: 'Extracted a private getEffectiveShift(userId) method that currently always returns the single seeded global shift. All validation logic (late detection, early departure, overtime flagging) reads only from the object this method returns. Phase 2 adds one roster lookup inside this method only. Zero other files change.',
    },
    {
      title: 'Cross-domain Executive Dashboard analytics without circular module dependencies',
      description: 'The Executive Dashboard needed data from Users, Attendance, Leave, and Approvals simultaneously. Calling domain services from an analytics controller would have created circular imports or forced unwanted module coupling.',
      solution: 'Created a dedicated read-only Analytics NestJS module that imports SharedModule for PrismaService only and never calls any domain service. Each analytics sub-folder has its own queries file with named pure async functions accepting the Prisma client. Redis caching with 60-300 second TTL prevents expensive cross-table aggregations from running on every request.',
    },
    {
      title: 'Bulk employee import with per-row failure isolation and encrypted file storage',
      description: 'Importing thousands of employees from a CSV needed to handle individual row failures without failing the whole file, survive process restarts mid-import, and store the source file securely since it contains PII.',
      solution: 'Implemented AES-256-GCM encryption before R2 upload with key version tracking. BullMQ processes the import job asynchronously with per-row status tracking in employee_import_rows so retries resume from the last failed row rather than restarting. The upload endpoint returns immediately after queuing so the HR Admin is never blocked waiting.',
    },
    {
      title: 'Immutable audit trail across twelve domain modules without duplicate logging code',
      description: 'Every state-changing operation needed to be audited with before and after snapshots. Implementing audit logging inside each service would have made the pattern inconsistent and easy to forget.',
      solution: 'Created a single AuditService in SharedModule that is the only writer to audit_logs. Every domain service injects AuditService and calls audit.log() after every mutation. The audit_logs table has no update or delete operations anywhere in the codebase. Pino structured logging with field redaction for sensitive values runs alongside the audit trail for operational observability.',
    },
  ],

  projectGoals: [
    'Replace paper-based HR workflows for up to 15,000 employees with a real-time digital platform',
    'Build a configurable approval chain engine that HR Admin can reconfigure without code changes',
    'Design the attendance shift enforcement so Phase 2 roster assignment requires changes to exactly one method',
    'Achieve sub-200ms response time on all standard CRUD endpoints under normal load',
    'Maintain zero circular dependencies across twelve NestJS domain modules',
    'Implement immutable audit logging on every state-changing operation across all modules',
  ],

  individualContributions: [
    'Designed and implemented the entire NestJS domain module architecture across twelve bounded contexts with zero circular dependencies',
    'Built the configurable multi-level approval chain engine used by leave, study, and acting assignments from schema design through to admin panel configuration UI',
    'Implemented the getEffectiveShift abstraction in the attendance service with Phase 2 roster extensibility built in from day one',
    'Architected the read-only Analytics module with Redis caching and recursive CTE org chart queries',
    'Built all twelve admin panel pages in Next.js 14 with role-scoped routing, TanStack Query data fetching, and a reusable component library including resizable drawers, skeleton loaders, and inline tooltips',
    'Implemented AES-256-GCM encrypted bulk employee import with BullMQ async processing and per-row failure isolation',
    'Set up the GitHub Actions CI/CD pipeline with lint, type-check, Prisma migration validation, and Docker build stages gating all merges to main',
    'Integrated Cloudflare R2 as the shared storage layer with a single StorageService handling profile images, leave documents, study documents, and encrypted import files',
  ],

  highlights: [
    '15,000-employee scale with domain-driven NestJS architecture and zero circular module dependencies',
    'Configurable approval chain engine driving leave, study, and acting assignments from a single shared resolver',
    'AES-256-GCM encrypted bulk import with BullMQ async processing and per-row failure isolation',
    'Immutable audit trail across all twelve modules via a single append-only AuditService',
    'getEffectiveShift abstraction isolates Phase 2 roster changes to exactly one method',
    'CI/CD pipeline with lint, type-check, Prisma migration validation, and Docker build gating every merge',
  ],

  metrics: [
    { label: 'Target Users', value: '15,000' },
    { label: 'Domain Modules', value: '12' },
    { label: 'Admin Pages', value: '12' },
    { label: 'Leave Types', value: '9' },
    { label: 'Analytics APIs', value: '43' },
    { label: 'Approval Levels', value: '4' },
  ],

  results: 'GovHub replaced manual paper-based HR workflows for JB Marks Municipality with a real-time platform handling attendance, leave, study assistance, notifications, and compliance reporting across up to 15,000 employees. The configurable approval chain engine eliminated hardcoded role logic and allows HR Admin to reconfigure approval workflows without a deployment. The Phase 1 shift enforcement architecture was designed so the Phase 2 roster module introduction requires changes to exactly one method. The CI/CD pipeline with automated type-checking, Prisma migration validation, and Docker build gating ensures production deployments are reliable and repeatable.',
}
