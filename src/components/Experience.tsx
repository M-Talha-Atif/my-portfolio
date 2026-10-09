'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Experience() {
  const timeline = [
    {
      role: "Full Stack Engineer",
      company: "MicroTechX",
      logo: "/companyLogos/microtechx.png",
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
      logo: "/companyLogos/digitalupgraders.png",
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
      logo: "/companyLogos/hannsoft.png",
      location: "Remote",
      period: "September 2023 - April 2025",
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

      <div className="relative max-w-6xl mx-auto space-y-8 md:space-y-10">
        {timeline.map((item, i) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <div className="glass rounded-2xl backdrop-blur-md border border-[var(--color-border)] shadow-soft overflow-hidden transition-colors hover:border-[var(--color-border-strong)]">
              <div className="grid md:grid-cols-[260px_1px_1fr]">
                {/* meta column: index, company badge, role, period */}
                <div className="p-6 md:p-7 flex md:flex-col gap-4 md:gap-5">
                  <div className="flex items-center gap-4 md:gap-0 md:flex-col md:items-start">
                    <span
                      aria-hidden
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-[var(--color-border)] p-2 flex items-center justify-center overflow-hidden"
                    >
                      <Image
                        src={item.logo}
                        alt={`${item.company} logo`}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </span>
                    <span className="hidden md:block mt-4 text-xs font-mono tracking-widest text-subtext/70">
                      {String(i + 1).padStart(2, '0')} / {String(timeline.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-heading leading-snug">{item.role}</h3>
                    <p className="text-[var(--color-accent-solid)] font-medium mt-1">{item.company}</p>
                    <p className="text-sm text-subtext mt-0.5">{item.location}</p>
                    <span className="inline-block mt-3 text-xs font-medium text-subtext bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-3 py-1 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* divider */}
                <div className="hidden md:block bg-[var(--color-border)]" />
                <div className="md:hidden h-px bg-[var(--color-border)] mx-6" />

                {/* achievements column */}
                <div className="p-6 md:p-7">
                  {Array.isArray(item.desc) ? (
                    <ul className="space-y-4">
                      {item.desc.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-solid)]" />
                          <span className="text-[15px] text-subtext leading-[1.7]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[15px] text-subtext leading-[1.7]">{item.desc}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}