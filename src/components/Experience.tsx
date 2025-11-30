'use client'
import { motion } from 'framer-motion'

export default function Experience() {
  const timeline = [
    {
      role: 'Software Engineer',
      company: 'Digital Upgraders LLC',
      period: 'September 2025 — On going',
      desc: [
        'Engineered a full-stack, cross-platform web applications using Next.js, React, and Express.js to serve as a centralized hub for wedding planning and social interaction',
        'Designed and developed a complete set of REST APIs with Express.js to manage user data, posts, comments, and vendor information',
        'Implemented WebSocket connections to facilitate real-time features, including instant post liking and live comment streams, enhancing user engagement',
        'Built a responsive and modern user interface with React components, styled with Tailwind CSS and shadcn/ui library',
        'Integrated Supabase for backend-as-a-service, handling user authentication and real-time database operations',
        'Configured Stripe for secure payment processing and Twilio for in-app messaging and SMS notifications'
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