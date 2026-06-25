import { Project } from './types'

export const intimecProject: Project = {
  slug: 'intimec',
  title: 'Intimec IGA, Enterprise Identity Governance and Administration Platform',
  short: 'Production IAM platform for access management, entitlement policies, and compliance-grade audit infrastructure',

  overview: 'Intimec IGA is an enterprise Identity Governance and Administration platform managing access requests, role assignments, entitlements, and compliance audit trails across large organisations. The platform provides a self-service Access Portal, a generic rule-based engine that assigns roles and entitlements to identities, an event-driven workflow service handling approvals and provisioning, and a compliance-grade audit infrastructure where every state transition is traceable, ACID-compliant, and PII-free. Built across 8+ Spring Boot microservices with Kafka event-driven pipelines and gRPC inter-service communication.',

  problem: 'Enterprise access management runs on email and spreadsheets. Employees cannot self-serve access requests. Bulk operations require engineering involvement. Compliance teams cannot define or schedule policies. Audit trails are incomplete or inconsistent. Service communication relies on REST calls adding cumulative latency across distributed workflows.',

  solution: 'A Next.js Access Portal connected to Spring Boot microservices through an API Gateway, with event-driven approval workflows on Kafka, generic rule-based assignment for roles and entitlements, ACID-compliant transactional flows with automatic rollback on failure, PII-free audit logs structured for compliance, and gRPC for low-latency service-to-service communication.',

  projectGoals: [
    'Replace manual access workflows with a self-service portal employees use without engineering involvement',
    'Build a generic rule-based engine assigning roles, entitlements, and access items to identities through configurable policy',
    'Enforce ACID-compliant transactional flows with automatic rollback when downstream operations fail',
    'Deliver PII-free audit logs structured for compliance requirements across every state transition',
    'Decouple approval and assignment workflows through event-driven architecture with dead-letter queue recovery',
    'Reduce inter-service latency through gRPC for synchronous calls between Auth, Identity, and Access Portal services'
  ],

  features: [
    'Access Portal: Tile catalog, cart-based selection, multi-user scoped requests, validity period, and justification',
    'Workflow Service: Approval orchestration, rejection handling, role and entitlement assignment via Identity Service, generic event publishing consumed by all dependent services',
    'Rule-Based Engine: Generic policy engine assigning roles, entitlements, and access items to identities with grouped condition evaluation, CRON and event-based scheduling',
    'Application Permissions Service: Per-application permission scoping and resource-level access controls',
    'Identity Service: User identities, role assignments, entitlement persistence, and lifecycle event publishing',
    'Audit Infrastructure: Spring AOP capturing stateBefore and stateAfter for every event, PII-free structured logging, configurable log levels per service',
    'Dead-Letter Queue: Failed Kafka events routed to DLQ for manual recovery without silent data loss',
    'ACID Transactional Flows: Automatic rollback across distributed operations when any downstream step fails',
    'Workflow Analytics: Real-time visibility into approval pipelines, assignment activity, and audit trail trends across OpenSearch',
    'Centralised Logging Service: Configurable log levels per service (info, debug, warn, error) controllable at runtime'
  ],

  individualContributions: [
    'Owned the Access Portal end to end including cart, multi-user requests, validity scoping, and submission flow through to Workflow Service handoff',
    'Designed the validation layer ensuring each requested role is not already assigned before publishing the Kafka event, optimising the lookup by 50% through set-based duplication checks instead of nested iteration',
    'Built the event-driven integration between Access Portal Service and Workflow Service using Kafka, with the Access Portal listening to generic workflow events for approvals, rejections, and assignment completion',
    'Architected the generic rule-based engine for assigning roles, entitlements, and access items to identities through grouped condition evaluation, CRON and event-based scheduling',
    'Implemented Spring AOP audit logging with Around Advice capturing stateBefore and stateAfter for every event, ensuring complete audit coverage across the platform',
    'Diagnosed and fixed a self-invocation bypass bug where AOP audit advice was silently skipped because internal method calls were not going through the Spring proxy, resolved by restructuring the bean boundary',
    'Refactored audit log schema to remove personal identity data from audit payloads, restoring compliance alignment and industry-standard PII handling',
    'Identified missing audit coverage for critical lifecycle events and introduced a structured event publishing layer ensuring every state transition is logged consistently',
    'Migrated Auth, Identity, and Access Portal service-to-service communication from REST to gRPC reducing inter-service latency by 50% on synchronous identity and manager resolution',
    'Diagnosed an OpenSearch schema issue that was breaking analytics logs by tracing datatype mismatches in the index mapping, then redesigned the schema so the existing 100K+ logs continued working without clearing live logging data',
    'Designed configurable logging architecture allowing log levels to be switched at runtime per service across info, debug, warn, and error without redeployment',
    'Authored the onboarding documentation, environment setup guides, and seed test datasets for the platform, eliminating the friction new engineers faced when joining a codebase with no prior documentation',
    'Standardised the entire frontend theme, color system, and component library across the Next.js dashboard and documented the conventions for consistent UI delivery across the team'
  ],

  architectureDetails: [
    {
      layer: 'Client Application',
      technology: 'Next.js (TypeScript)',
      purpose: 'Self-service Access Portal, admin workflows, rule engine builder, and analytics dashboard'
    },
    {
      layer: 'API Gateway',
      technology: 'Spring Boot',
      purpose: 'Request routing, JWT validation, RBAC enforcement, and rate limiting across all downstream services'
    },
    {
      layer: 'Auth Service',
      technology: 'Spring Security + JWT',
      purpose: 'Authentication, token issuance, refresh, and session management'
    },
    {
      layer: 'Access Portal Service',
      technology: 'Spring Boot + PostgreSQL',
      purpose: 'Tile catalog, cart, request lifecycle, validation, and event publishing to Workflow Service'
    },
    {
      layer: 'Workflow Service',
      technology: 'Spring Boot + Kafka',
      purpose: 'Approval orchestration, rejection handling, role and entitlement assignment via Identity Service, generic event publishing for downstream services'
    },
    {
      layer: 'Identity Service',
      technology: 'Spring Boot + gRPC + PostgreSQL',
      purpose: 'Identities, role assignments, entitlement persistence, and lifecycle event publishing'
    },
    {
      layer: 'Application Permissions Service',
      technology: 'Spring Boot + PostgreSQL',
      purpose: 'Per-application permission scoping and resource-level access controls'
    },
    {
      layer: 'Core Service',
      technology: 'Spring Boot + Spring AOP',
      purpose: 'Audit logs, centralised logging, and configurable log level management across services'
    },
    {
      layer: 'Event Pipeline',
      technology: 'Apache Kafka + Dead-Letter Queue',
      purpose: 'Async event distribution with retry windows, consumer concurrency, and DLQ recovery for failed events'
    },
    {
      layer: 'Inter-Service Communication',
      technology: 'gRPC + Protocol Buffers',
      purpose: 'Low-latency synchronous calls between Auth, Identity, and Access Portal services'
    },
    {
      layer: 'Database',
      technology: 'PostgreSQL',
      purpose: 'Primary relational data store with ACID-compliant transactional flows and automatic rollback'
    },
    {
      layer: 'Search and Analytics',
      technology: 'OpenSearch',
      purpose: 'Structured audit log indexing supporting 100K+ logs per cycle and real-time analytics queries'
    },
    {
      layer: 'Infrastructure',
      technology: 'Docker + GitHub Actions + Dokploy',
      purpose: 'Containerised service deployment with automated CI/CD pipelines and self-hosted production orchestration'
    }
  ],

  challenges: [
    {
      title: 'Joined Codebase With No Documentation or Setup',
      description: 'There was no onboarding documentation, no local environment setup guide, and no seed test data when I joined. The codebase had grown organically and the only path to running it locally was tribal knowledge held by one engineer.',
      solution: 'Reverse-engineered the environment from configuration files and service dependencies. Documented the full local setup including Docker Compose configuration, environment variables, database seed scripts, and mock data fixtures. Authored an onboarding guide covering service boundaries, request flows, and common debugging scenarios so future engineers could be productive without dependency on tribal knowledge.'
    },
    {
      title: 'Inter-Service Latency Compounding Across Workflows',
      description: 'Auth, Identity, and Access Portal services communicated through REST. Every synchronous call carried HTTP overhead, JSON serialisation cost, and connection establishment latency. Across a single request that touched multiple services, this latency compounded visibly in user-facing flows.',
      solution: 'Evaluated gRPC versus REST trade-offs for internal service-to-service communication. Migrated synchronous identity and manager resolution calls to gRPC with Protocol Buffers in a shared common-protos repository. Binary serialisation and HTTP/2 multiplexing eliminated the cumulative latency. Inter-service call latency dropped by 50% across the workflows that previously chained REST calls.'
    },
    {
      title: 'Audit Logs Contained Personal Identity Data',
      description: 'Audit log payloads included raw user identity fields and personal data, violating PII handling requirements and creating compliance risk for the platform.',
      solution: 'Refactored the audit log schema to exclude PII while preserving the traceability needed for compliance. State transitions now reference identity IDs and operation metadata rather than raw personal data. Restored compliance alignment without losing the audit detail required for forensic investigation.'
    },
    {
      title: 'Critical Events Missing From Audit Coverage',
      description: 'The audit infrastructure was capturing some events but missing others. Critical lifecycle events such as entitlement updates and role removals were silently uncovered, creating gaps in the compliance trail.',
      solution: 'Introduced a structured event publishing layer ensuring every state transition fires an audit event through a consistent contract. Mapped every lifecycle operation across services to a defined audit event type and validated coverage by running test workflows against the audit table.'
    },
    {
      title: 'Spring AOP Self-Invocation Bypass',
      description: 'AOP audit advice was silently skipped on certain operations. Audit logs were missing entries for methods that should have been intercepted, undermining the audit guarantee.',
      solution: 'Diagnosed the root cause as Spring AOP proxy bypass on self-invocation. When a method inside a bean calls another method on the same bean, the call goes through the real object not the proxy, so the aspect never fires. Restructured the bean boundary by extracting the audited methods into a separate Spring bean so all calls route through the proxy and the aspect fires consistently.'
    },
    {
      title: 'Rule Engine Inter-Group Operator Bug',
      description: 'The generic rule-based assignment engine was matching identities incorrectly under multi-group conditions with mixed operators. The bug was invisible in simple single-group rules and only surfaced when groups used differing internal operators.',
      solution: 'Built a deliberate test dataset of 26 employees across 7 categories with known expected matches. Traced the discrepancy to a single operator field per group being used for both intra-group and inter-group chaining. Introduced a separate inter-group operator field and a backward-compatible migration wrapping existing flat-condition rules into the new grouped structure.'
    },
    {
      title: 'OpenSearch Production Schema Drift',
      description: 'Analytics queries were crashing in production while working locally. The cause was OpenSearch schema drift between environments where production was running an older schema incompatible with new analytics queries supporting 100K+ logs per cycle.',
      solution: 'Diagnosed the schema mismatch and redesigned the index mapping to support both legacy and new analytics workloads. Migrated 5M+ documents through alias switching with zero impact to the analytics dashboard. Production analytics now process 100K+ logs per cycle smoothly.'
    },
    {
      title: 'Unconfigurable Logging Across Services',
      description: 'Log verbosity was hardcoded per service. Debugging required redeploying with elevated log levels which was slow and disruptive in production.',
      solution: 'Designed a configurable logging architecture where each service exposes its log level through a runtime configuration endpoint. Engineers can switch between info, debug, warn, and error per service without redeployment, accelerating production debugging.'
    },
    {
      title: 'No Frontend Standardisation Across the Dashboard',
      description: 'Theme, colors, and component patterns were inconsistent across the Next.js dashboard. Different pages used different conventions, making the UI feel fragmented and slowing feature delivery.',
      solution: 'Standardised the entire frontend theme, color system, and shared component library. Documented the conventions in a frontend standards guide so engineers across the team apply the same patterns. Subsequent feature work shipped with consistent UI without requiring design review per change.'
    }
  ],

  techStack: {
    frontend: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn UI',
      'React Hook Form',
      'Zod',
      'TanStack Query',
      'Recharts'
    ],
    backend: [
      'Java',
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'Spring Data JPA',
      'Spring AOP',
      'JPA Criteria API',
      'Maven',
      'gRPC + Protocol Buffers',
      'Apache Kafka',
      'PostgreSQL',
      'OpenSearch',
      'JWT',
      'RBAC',
      'JUnit'
    ],
    infrastructure: [
      'Docker',
      'GitHub Actions',
      'Dokploy'
    ]
  },

  tech: [
    'Java',
    'Spring Boot',
    'Spring AOP',
    'Spring Security',
    'Kafka',
    'gRPC',
    'PostgreSQL',
    'OpenSearch',
    'Next.js',
    'TypeScript',
    'Docker',
    'GitHub Actions',
    'Dokploy'
  ],

  mermaidDiagrams: [
    {
      title: 'Access Request Flow: Submission to Assignment',
      type: 'sequence',
      code: `sequenceDiagram
    actor Employee
    participant Portal as Next.js Dashboard
    participant AccessPortal as Access Portal Service
    participant DB as PostgreSQL
    participant Kafka as Kafka
    participant Workflow as Workflow Service
    participant Identity as Identity Service
    participant Audit as Audit (Spring AOP)

    Note over Employee,Audit: Phase 1: Cart and Submission
    Employee->>Portal: Browses Access Portal tiles
    Employee->>Portal: Adds tiles to cart
    Portal->>AccessPortal: Add to cart
    AccessPortal->>DB: Persist cart items

    Employee->>Portal: Submits request
    Portal->>AccessPortal: Submit request

    Note over Employee,Audit: Phase 2: Validation
    AccessPortal->>DB: Set-based lookup: does each user already have these roles?
    DB-->>AccessPortal: Existing assignments

    alt User already has role
        AccessPortal-->>Portal: 409 already assigned
        Portal-->>Employee: Show conflict message
    else No conflict
        AccessPortal->>Kafka: Publish ACCESS_REQUEST_SUBMITTED
        AccessPortal-->>Portal: 202 Accepted
    end

    Note over Employee,Audit: Phase 3: Workflow Orchestration
    Kafka->>Workflow: Consume ACCESS_REQUEST_SUBMITTED
    Workflow->>DB: Persist approval tasks
    Workflow->>Workflow: Route to approvers
    
    Employee->>Portal: Approver approves
    Portal->>Workflow: Approve task
    Workflow->>DB: Update approval state

    Note over Employee,Audit: Phase 4: Assignment via Identity Service
    Workflow->>Identity: Assign role or entitlement to identity
    Identity->>DB: Persist assignment (ACID transactional)
    
    alt Assignment fails
        Identity->>DB: Rollback transaction
        Identity-->>Workflow: Failure
        Workflow->>Kafka: Publish to DLQ
    else Assignment succeeds
        Identity-->>Workflow: Success
        Workflow->>Kafka: Publish generic ASSIGNMENT_COMPLETED event
    end

    Note over Employee,Audit: Phase 5: Generic Event Consumption
    Kafka->>AccessPortal: Consume ASSIGNMENT_COMPLETED
    AccessPortal->>DB: Update request state

    Note over Employee,Audit: Phase 6: Audit Trail
    AccessPortal->>Audit: Spring AOP captures stateBefore and stateAfter
    Workflow->>Audit: Spring AOP captures stateBefore and stateAfter
    Identity->>Audit: Spring AOP captures stateBefore and stateAfter
    Audit->>DB: Persist PII-free audit entries`
    },
    {
      title: 'System Architecture Overview',
      type: 'flowchart',
      code: `graph TB
    subgraph ClientLayer["Client Layer"]
        WebApp["Next.js Dashboard"]
    end

    subgraph Gateway["API Gateway"]
        APIGateway["Spring Boot API Gateway"]
    end

    subgraph Services["Core Microservices"]
        AuthService["Auth Service"]
        AccessPortal["Access Portal Service"]
        Workflow["Workflow Service"]
        Identity["Identity Service"]
        AppPermissions["Application Permissions Service"]
        Core["Core Service\nAudit Logs + Logging"]
    end

    subgraph EventPipeline["Event-Driven Layer"]
        Kafka["Apache Kafka"]
        DLQ["Dead-Letter Queue"]
    end

    subgraph DataLayer["Data Layer"]
        PostgreSQL[("PostgreSQL\nACID Transactional")]
        OpenSearch[("OpenSearch\n100K+ logs per cycle")]
    end

    subgraph Infra["Infrastructure"]
        Docker["Docker"]
        GHActions["GitHub Actions"]
        Dokploy["Dokploy"]
    end

    WebApp -->|HTTPS REST| APIGateway

    APIGateway --> AuthService
    APIGateway --> AccessPortal
    APIGateway --> Workflow
    APIGateway --> AppPermissions

    AuthService <-->|gRPC| Identity
    AccessPortal <-->|gRPC| Identity
    Workflow <-->|gRPC| Identity

    AccessPortal -->|Publish| Kafka
    Workflow -->|Publish| Kafka
    Identity -->|Publish| Kafka

    Kafka -->|Consume| Workflow
    Kafka -->|Consume| AccessPortal
    Kafka -->|Consume| Core
    Kafka --> DLQ

    AccessPortal --> PostgreSQL
    Workflow --> PostgreSQL
    Identity --> PostgreSQL
    AppPermissions --> PostgreSQL
    Core --> PostgreSQL
    Core --> OpenSearch

    Docker --> Dokploy
    GHActions --> Docker

    style ClientLayer fill:#e1f5ff
    style Gateway fill:#f0f9ff
    style Services fill:#dbeafe
    style EventPipeline fill:#fef3c7
    style DataLayer fill:#d1fae5
    style Infra fill:#f3e8ff`
    }
  ],

  highlights: [
    'Migrated synchronous service-to-service communication from REST to gRPC reducing inter-service latency by 50%',
    'Refactored audit log schema to be PII-free, restoring compliance alignment without losing forensic traceability',
    'Designed configurable per-service log levels enabling runtime debug switching without redeployment',
    'Redesigned OpenSearch index supporting 100K+ logs per cycle after diagnosing production schema drift',
    'Authored full onboarding documentation, environment setup, and seed test data from scratch',
    'Caught a critical rule engine inter-group operator bug pre-production through deliberate test dataset design',
    'Resolved Spring AOP self-invocation bypass restoring audit guarantee across affected service methods',
    'Standardised the entire frontend theme and component library with documented conventions for the team'
  ],

  metrics: [
    { label: 'Microservices', value: '8+' },
    { label: 'User Scale', value: '5K+' },
    { label: 'Inter-Service Latency Reduction', value: '50%' },
    { label: 'Audit Events Coverage', value: 'PII-free, complete' },
    { label: 'Analytics Throughput', value: '100K+ logs per cycle' },
    { label: 'Transactional Guarantee', value: 'ACID with rollback' },
    { label: 'Event Recovery', value: 'DLQ-backed' },
    { label: 'Onboarding Time', value: 'Days to hours' }
  ],

  results: 'Owned the Access Portal and contributed to the platform-wide architecture across audit, logging, inter-service communication, and rule-based assignment. Migrated service-to-service communication to gRPC reducing latency by 50%. Refactored audit infrastructure to be PII-free and structurally complete across every critical event. Redesigned OpenSearch schema enabling smooth analytics at 100K+ logs per cycle. Built the platform documentation, onboarding, and frontend standardisation that the engineering team now depends on.',

  platforms: ['web'],
  demo: 'https://youtu.be/OK640zuXBr8',
  hero: '/intimecProject/hero/hero.png',
  webDesigns: Array.from(
    { length: 25 },
    (_, i) => `/intimecProject/image-${i + 1}.png`
  )
}
