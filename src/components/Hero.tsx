'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import posthog from 'posthog-js'
import { Linkedin, Github, Code, Hammer, RefreshCw, Rocket, ArrowRight } from 'lucide-react'
import XLogo from '@/components/icons/XLogo'

export default function Hero() {
  const techStack = [
    'Java',
    'Spring Boot',
    'Kafka',
    'Python',
    'FastAPI',
    'React',
    'Next.js',
    'NestJS',
    'Node.js',
    'React Native',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'Docker',
    'AWS',
    'gRPC',
  ]

  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-10">
      {/* === Left: Info Section === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          M. Talha Atif
        </h1>
        <div className="text-lg text-subtext mb-6 space-y-3">
          <p>
            As a full stack engineer, I own product outcomes end to end, translating customer and business problems into reliable systems that deliver measurable value.
          </p>
          <p>
            I design for failure, continuously challenging assumptions through resilience testing, observability, and chaos engineering.
          </p>
          <p>
            I take responsibility beyond deployment, ensuring the product remains correct, available, and adaptable under real-world conditions.
          </p>
        </div>

        {/* === Buttons === */}
        <div className="flex gap-4 justify-center md:justify-start mb-8">
          <a
            href="/personal/M.Talha-Atif-Full-Stack.pdf"
            download
            onClick={() => posthog.capture('resume_downloaded')}
            className="px-6 py-3 text-onaccent rounded-[12px] bg-[var(--color-accent-solid)] text-sm font-medium hover:brightness-110 transition"
          >
            Download My Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-[12px] border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-border)] transition"
          >
            Contact Me
          </a>
        </div>

        {/* === Tech Stack Tags === */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-[10px] bg-[var(--color-surface)] border border-[var(--color-border)] text-subtext hover:border-[var(--color-accent-solid)] transition"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* === Links: horizontal row === */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5 text-subtext text-sm">

          {/* LeetCode */}
          <a
            href="https://leetcode.com/u/TalhaAtif/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('hero_social_link_clicked', { platform: 'leetcode' })}
            className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-lg border border-[var(--color-nav-border)] hover:border-[var(--color-accent-solid)]/50 hover:text-[var(--color-accent-solid)] transition-all shadow-sm"
          >
            <Code className="w-4 h-4 text-[var(--color-accent-solid)]" />
            <span className="font-medium">LeetCode</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/M-Talha-Atif"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('hero_social_link_clicked', { platform: 'github' })}
            className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-lg border border-[var(--color-nav-border)] hover:border-[var(--color-accent-solid)]/50 hover:text-[var(--color-accent-solid)] transition-all shadow-sm"
          >
            <Github className="w-4 h-4 text-[var(--color-accent-solid)]" />
            <span className="font-medium">GitHub</span>
          </a>

          {/* X */}
          <a
            href="https://x.com/talhaAtif195901"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('hero_social_link_clicked', { platform: 'x' })}
            className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-lg border border-[var(--color-nav-border)] hover:border-[var(--color-accent-solid)]/50 hover:text-[var(--color-accent-solid)] transition-all shadow-sm"
          >
            <XLogo className="w-4 h-4 text-[var(--color-accent-solid)]" />
            <span className="font-medium">X</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/muhammad-talha-atif/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture('hero_social_link_clicked', { platform: 'linkedin' })}
            className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-lg border border-[var(--color-nav-border)] hover:border-[var(--color-accent-solid)]/50 hover:text-[var(--color-accent-solid)] transition-all shadow-sm"
          >
            <Linkedin className="w-4 h-4 text-[var(--color-accent-solid)]" />
            <span className="font-medium">LinkedIn</span>
          </a>
        </div>

      </motion.div>

      {/* === Right: Profile Image + Stats === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 flex flex-col items-center"
      >
        <div className="w-56 h-56 mx-auto mb-6"> {/* Fixed container */}
          <Image
            src="/personal/profileImage.png"
            alt="Profile"
            width={220}
            height={220}
            className="rounded-full border-4 border-[var(--color-accent-solid)] shadow-soft w-full h-full object-cover"
          />
        </div>

        {/* === Build / Iterate / Ship diagram === */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass w-full max-w-[420px] rounded-2xl border border-[var(--color-border)] p-5 shadow-lg"
        >
          <div className="flex items-center justify-between gap-2">
            {[
              { label: 'Build', Icon: Hammer },
              { label: 'Iterate', Icon: RefreshCw },
              { label: 'Ship', Icon: Rocket },
            ].map(({ label, Icon }, idx, arr) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent-solid)]/10 border border-[var(--color-accent-solid)]/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[var(--color-accent-solid)]" />
                  </div>
                  <span className="text-xs font-medium text-heading">{label}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-subtext flex-shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-subtext">
            Continuous delivery, not a one-time release.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
