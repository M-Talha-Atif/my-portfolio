'use client'
import { motion } from 'framer-motion'

export default function Experience() {
  const timeline = [
    {
      role: "Full Stack Engineer",
      company: "MicroTechX",
      location: "Malaysia",
      period: "December 2025 - June 2026",
      desc: [
        "Migrated synchronous service-to-service communication from REST to gRPC across Auth, Identity, and Access Portal, cutting inter-service latency by 50%, with retries and a circuit breaker handling downstream failures, and deliberately prioritizing consistency over availability so the system never serves stale identity or access data.",
        "Architected a rule engine evaluating dynamic, attribute-based condition groups, so new categories can be added per identity without touching the engine, triggered on CRON schedules or Kafka events to assign roles, entitlements, and access items, replacing fully manual access provisioning as the platform's core decision system.",
        "Refactored the audit log schema to be PII-free, restoring compliance alignment without losing forensic traceability, and resolved a Spring AOP self-invocation bypass that was silently skipping audit advice on critical methods.",
        "Built a shared component library and standardized the theme and color system across the Next.js dashboard, replacing ad hoc, duplicated UI code with components the whole team adopted, cutting UI code duplication by 50% and eliminating visual drift across every new feature.",
        "Diagnosed a schema drift issue causing production analytics failures on a 5M+ document OpenSearch index, then executed a zero-downtime migration using alias switching, new index, background reindex, verify, atomic swap, restoring analytics to handle 100K+ logs per cycle without failure.",
        "Designed an event-driven Kafka pipeline for approval, rejection, and provisioning workflows, replacing synchronous REST calls where one service outage could break the entire approval chain, with dead letter queues catching failures instead of losing them silently.",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "Digital Upgraders LLC",
      location: "Dubai",
      period: "May 2025 - December 2025",
      desc: [
        "Cut feed load time from 3s to 700ms by fixing query structure, indexing, payload size, and caching bottlenecks across the production feed system.",
        "Fixed duplicate notifications by redesigning concurrent write flows with proper database transactions, restoring consistency across the notification system.",
        "Fixed inconsistent scroll-to-hide header behaviour across Android, iOS, and Safari by tracing how each platform actually fired scroll events, since Safari's scroll mechanism diverged sharply from Android's.",
        "AWS's operational cost and infrastructure overhead had become hard to justify and manage at the platform's scale, so I led a zero-downtime migration to Fly.io, reworking infrastructure, CI/CD, DNS, and service configuration on a live production platform without disrupting real users.",
        "Fixed a production authentication bug where the OAuth token and JWT token were both being stored under the same cookie key, silently overwriting each other and dropping user sessions, tracing the root cause through production logs and redesigning token storage so each token persists under its own key.",
        "Refactored the frontend codebase by applying separation-of-concerns design patterns, splitting logic into hooks, types, and components instead of one tangled structure, so the codebase could actually scale without repeatedly re-touching the same files.",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "HannSoft",
      location: "Remote",
      period: "February 2024 - April 2025",
      desc: [
        "Engineered third party API integrations, including library and sports data providers and Firebase Cloud Messaging, to degrade gracefully under real world failure, applying timeouts, circuit breakers, and exponential backoff retries so a single unreliable upstream provider couldn't cascade into an app wide outage.",
        "Structured client applications around MVVM to keep business logic, state, and UI concerns independently testable and resilient to configuration changes, while delivering integration heavy production features such as Fridge Buddy's scan to recipe flow, combining barcode scanning with Gemini based AI content generation.",
        "Owned the full technical lifecycle of independent client products end to end, from data modeling and access control design through native client delivery, architecting Firestore and Realtime Database schemas alongside the Firestore security rules and RBAC model that enforced authorization at the data layer rather than trusting the client.",
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
      className="py-12 md:py-16 relative overflow-hidden"
    >
      {/* gradient orb bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-3xl rounded-full opacity-70" />
      </div>

      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-4xl font-bold mb-4">Experience</h2>
        <p className="text-subtext text-lg max-w-2xl mx-auto">
          A snapshot of my journey building impactful mobile and web applications from Android development to AI-powered web solutions. Each role strengthened my technical foundation and problem-solving approach.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* vertical timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-accent-solid)]/60 to-transparent" />

        {timeline.map((item, i) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-12 mb-10"
          >
            {/* glowing timeline dot */}
            <span className="absolute left-[6px] top-2 w-3 h-3 bg-[var(--color-accent-solid)] rounded-full shadow-[0_0_10px_var(--color-accent-solid)]" />

            <div className="glass p-6 md:p-7 rounded-2xl backdrop-blur-md border border-[var(--color-border)] shadow-soft">
              {/* header row: role/company on the left, period as a badge on the right */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4 pb-4 border-b border-[var(--color-border)]">
                <div>
                  <h3 className="text-lg font-semibold text-heading">{item.role}</h3>
                  <p className="text-sm text-[var(--color-accent-solid)] font-medium">
                    {item.company} <span className="text-subtext font-normal">· {item.location}</span>
                  </p>
                </div>
                <span className="text-xs font-medium text-subtext bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-3 py-1 whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              <div className="text-sm text-subtext leading-relaxed">
                {Array.isArray(item.desc) ? (
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
                    {item.desc.map((point) => (
                      <li key={point} className="flex items-start">
                        <span className="text-[var(--color-accent-solid)] mr-2 mt-0.5 flex-shrink-0">•</span>
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