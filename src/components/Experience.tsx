'use client'
import { motion } from 'framer-motion'

export default function Experience() {
  const timeline = [
    {
      role: "Full Stack Engineer",
      company: "MicroTechX",
      period: "December 2025 — Present",
      desc: [
        "Built a self-service Access Portal in Next.js and TypeScript covering tile catalog, cart, multi-user role requests, approval tracking, and provisioning status, owning the full request lifecycle from UI to API integration.",
        "Engineered an entitlement rule builder with grouped AND/OR conditions, inter-group operators, and negation support; fixed a full re-render storm on every keystroke by switching to uncontrolled mode with useRef and controlled remount via builderKey.",
        "Built workflow and debugging analytics dashboards with 8 KPI drill-down types, paginated modals, per-section independent loading states, and CSV export, wired to real backend APIs replacing mock data across all charts.",
        "Re-architected the Roles Hierarchy from a full client-side in-memory grouping model to a backend-driven summary-first approach, cutting initial page load data to aggregate counts only and moving search and filtering server-side.",
        "Built a reusable component system across the platform including StandardTabs, IconTabs, PageHeader, BadgeEditor, CustomPagination, and a centralized risk color utility, standardizing UI patterns across 78+ files.",
        "Built an entitlement assignment rule engine in Spring Boot with grouped conditions stored as JSONB in PostgreSQL, JPA Criteria API for dynamic predicate building, and IMMEDIATE/CRON/MANUAL/ONE_TIME scheduler with a global tenant-level schedule config.",
        "Designed an async bulk role assignment pipeline using Kafka workers, a Batch Job table for real-time status tracking, and chunk-based persistence to control memory pressure; refactored permission API from one-to-one to many-to-many with O(1) Set-based duplication checks.",
        "Implemented Spring AOP auditing across the role lifecycle enforcing one user action equals one audit event, with backend diff computation capturing entitlement and child-role adds and removes in a single consolidated audit record.",
        "Built a bulk application lookup endpoint eliminating N+1 cross-service calls in the entitlements module, collapsing per-record API calls into a single request with resilient fallback defaulting resourceName to Unknown on dependency failure.",
        "Resolved a production OpenSearch crisis by reindexing 5M+ documents using index templates and alias switching with zero downtime, migrated high-cardinality fields from text+keyword to keyword type, and fixed the 10k result-window limit by redesigning deep pagination queries as aggregation-based queries."
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "Digital Upgraders LLC",
      period: "September 2025 — January 2026",
      desc: [
        "Built Reported Posts and Reported Comments systems end to end schema design in Supabase, REST APIs in Express.js with popularity ranking logic, and an admin moderation panel in React.",
        "Eliminated a 2-second comment button latency by removing a redundant API pre-check call, and reduced notification page load by consolidating fragmented calls into single enriched payloads.",
        "Implemented rate limiting on all authentication and high-frequency post endpoints to prevent abuse, and resolved 20+ production bugs across auth flows, notification lifecycle, and cache invalidation.",
        "Executed full production migration to Fly.io Docker configuration, Supabase production setup, Namecheap DNS, Plunk email migration, and environment variable management with zero downtime.",
        "Refactored 3000+ line monolithic files into modular components using custom React hooks, improving code maintainability and reducing component coupling across the codebase.",
        "Resolved Android and iOS Safari rendering issues causing input lag and scroll jank by identifying and fixing client-side execution bottlenecks.",
        "Added Open Graph metadata for social sharing, pull-to-refresh with draft state preservation, and referral system with domain reuse prevention.",
        "Maintained unit test coverage across critical API flows and validated all fixes against edge cases before deployment.",
        "Worked directly with the product team in async remote sprints, handling production deployments, hotfixes, and feature delivery across web and mobile breakpoints.",
      ],
    },
  ]

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 relative overflow-hidden"
    >
      {/* gradient orb bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-3xl rounded-full opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Experience</h2>
        <p className="text-subtext text-lg max-w-2xl mx-auto">
          A snapshot of my journey building impactful mobile and web applications from Android development to AI-powered web solutions. Each role strengthened my technical foundation and problem-solving approach.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* vertical timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-accent-solid)]/60 to-transparent" />

        {timeline.map((item, i) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative pl-12 mb-10"
          >
            {/* glowing timeline dot */}
            <span className="absolute left-[6px] top-2 w-3 h-3 bg-[var(--color-accent-solid)] rounded-full shadow-[0_0_10px_var(--color-accent-solid)]" />

            <div className="glass p-6 rounded-2xl backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-soft">
              <h3 className="text-lg font-semibold text-white">{item.role}</h3>
              <p className="text-sm text-subtext mb-2">
                {item.company} · {item.period}
              </p>
              <div className="text-sm text-subtext leading-relaxed">
                {Array.isArray(item.desc) ? (
                  <ul className="space-y-2">
                    {item.desc.map((point) => (
                      <li key={point} className="flex items-start">
                        <span className="text-[var(--color-accent-solid)] mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.desc}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}