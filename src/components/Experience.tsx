'use client'
import { motion } from 'framer-motion'

export default function Experience() {
  const timeline = [
    {
      role: "Full Stack Engineer",
      company: "MicroTechX",
      period: "December 2025 - Present",
      desc: [
        "Migrated synchronous service-to-service communication from REST to gRPC, reducing inter-service latency by 50%.",
        "Resolved Spring AOP self-invocation bypass, restoring audit guarantee across affected service methods.",
        "Refactored audit log schema to be PII-free, restoring compliance alignment without losing forensic traceability.",
        "Architected the generic rule-based engine for assigning roles, entitlements, and access items to identities through grouped condition evaluation, CRON and event-based scheduling.",
        "Standardised the frontend theme, color system, and shared component library across the Next.js dashboard, documenting conventions that improved consistency and reduced UI drift across the team.",
      ],
    },
    {
      role: "Full Stack Engineer",
      company: "Digital Upgraders LLC",
      period: "September 2025 - January 2026",
      desc: [
        "Cut feed load time from 3s to 700ms by fixing query, indexing, payload, and caching bottlenecks.",
        "Fixed duplicate notifications by redesigning concurrent writes with proper transactions.",
        "Resolved Android, iOS, and Safari rendering issues by tracing client-side performance bottlenecks and restoring consistent cross-platform behaviour.",
        "Led a zero-downtime migration from AWS to Fly.io, reworking infrastructure, CI/CD, DNS, and service configuration on a live platform.",
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