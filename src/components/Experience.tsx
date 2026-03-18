'use client'
import { motion } from 'framer-motion'

export default function Experience() {
  const timeline = [
    {
      role: "Full Stack Engineer",
      company: "MicroTechX",
      period: "December 2025 — Present",
      desc: [
        "Built a self-service IAM portal using React and TypeScript where users request access to platform tiles, assign roles to team members, and track request lifecycle from submission to provisioning.",
        "Developed Spring Boot REST APIs for access request management, tile configuration, and department scoping with Hibernate/JPA entity mappings and MySQL as the primary data store.",
        "Architected Kafka event-driven pipelines for audit trails and provisioning workflows across 8+ microservices, configuring consumer concurrency, retry windows, and dead-letter queues.",
        "Implemented gRPC inter-service calls for user identity and manager resolution between distributed Spring Boot services.",
        "Refactored an O(n²) access-request lookup to O(n) using a Java Collections map-based strategy, eliminating a bottleneck in the role-assignment approval flow.",
        "Enforced Spring Security authentication, JWT validation, and RBAC policies across all API endpoints.",
        "Wrote JUnit unit and integration tests for tile, cart, and request modules; maintained GitHub Actions CI/CD pipelines for automated build, test, and deploy cycles.",
        "Consolidated 50+ color variables into design tokens, migrated 30+ drill-down modals to slide-in sheets, and reduced initial bundle size by 15% through component consolidation.",
        "Collaborated with React frontend engineers to align API contracts, resolve integration issues, and deliver features iteratively across Agile/Scrum sprints.",
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
            key={i}
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
                    {item.desc.map((point, index) => (
                      <li key={index} className="flex items-start">
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