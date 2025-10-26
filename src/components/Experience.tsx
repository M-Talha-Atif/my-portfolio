'use client'
import { motion } from 'framer-motion'

export default function Experience() {
  const timeline = [
    {
      role: 'Android Developer Intern',
      company: 'HiSkyTech',
      period: 'Aug 2024 — Sept 2024',
      desc: 'Developed Android applications using Kotlin, XML layouts, and the native Android SDK. Built a budget tracker and job portal with API integration and role-based access management, strengthening backend communication and UI design skills.',
    },
    {
      role: 'Software Engineering Fellow',
      company: 'Headstarter',
      period: 'July 2024 — Sept 2024',
      desc: 'Completed hands-on projects including Rate My Professor, AI Educational Chatbot, and Pantry Tracker. Gained experience in AI integration, real-world problem solving, and full-stack development through 4 mock interviews and collaborative coding sessions.',
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
              <p className="text-sm text-subtext leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
