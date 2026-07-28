'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import type { OutreachPage } from '@/lib/outreach/types'
import { getRelevantProjects } from '@/lib/outreach'
import CalendlyModal from '@/components/CalendlyModal'
import Footer from '@/components/Footer'
import XLogo from '@/components/icons/XLogo'

const TIER_STYLES: Record<OutreachPage['hiringPaths'][number]['tier'], string> = {
  Premium: 'bg-[var(--color-accent-solid)] text-black',
  Silver: 'border border-[rgba(255,255,255,0.2)] text-white/90',
  Bronze: 'border border-[rgba(255,255,255,0.2)] text-white/90',
}

// Fixed identity, not company-specific — same reach-out channels on every
// outreach page, so it lives here rather than being duplicated per company.
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/M-Talha-Atif', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-talha-atif/', Icon: Linkedin },
  { label: 'X', href: 'https://x.com/talhaAtif195901', Icon: XLogo },
  { label: 'Email', href: 'mailto:talhaatif573@gmail.com', Icon: Mail },
]

// `ctaTarget === '#schedule'` is the signal value meaning "open the scheduler
// modal" instead of navigating — used by hiring-path and closing CTAs.
function CtaAction({
  target,
  label,
  className,
  onOpenScheduler,
}: {
  target: string
  label: string
  className: string
  onOpenScheduler: () => void
}) {
  if (target === '#schedule') {
    return (
      <button type="button" onClick={onOpenScheduler} className={className}>
        {label}
      </button>
    )
  }
  return (
    <a href={target} className={className}>
      {label}
    </a>
  )
}

export default function OutreachTemplate({ data }: { data: OutreachPage }) {
  const relevantProjects = getRelevantProjects(data.relevantProjects)
  const [schedulerOpen, setSchedulerOpen] = useState(false)

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">
      {/* BACK TO PORTFOLIO */}
      <a
        href={data.backToPortfolio.href}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)] transition-all group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>{data.backToPortfolio.label.replace(/^←\s*/, '')}</span>
      </a>

      {/* SECTION 1 — HERO */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14 py-16 md:py-20"
      >
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">{data.hero.headline}</h1>
          <p className="mt-5 text-subtext text-lg max-w-xl mx-auto md:mx-0">
            {data.hero.subtext.replace('[Company]', data.company.name)}
          </p>
          <a
            href={data.hero.ctaTarget}
            className="inline-block mt-8 text-sm font-medium text-[var(--color-accent-solid)] hover:underline underline-offset-4"
          >
            {data.hero.ctaLabel}
          </a>
        </div>

        <div className="flex-shrink-0">
          <div className="w-40 h-40 md:w-48 md:h-48">
            <Image
              src={data.hero.profileImage}
              alt="Talha Atif"
              width={192}
              height={192}
              className="rounded-full border-4 border-[var(--color-accent-solid)] shadow-soft w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* SECTION 2 — WHAT YOU'RE SOLVING */}
      <section className="py-10 border-t border-[rgba(255,255,255,0.06)]">
        <h2 className="text-xl font-semibold mb-6">What {data.company.name} is solving</h2>
        <ul className="space-y-4 max-w-2xl">
          {data.whatYouAreSolving.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-solid)] flex-shrink-0" />
              <span className="text-subtext leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 3 — RELEVANT EVIDENCE */}
      <section id="evidence" className="py-10 border-t border-[rgba(255,255,255,0.06)]">
        <h2 className="text-xl font-semibold mb-4">Relevant evidence</h2>
        <p className="text-subtext leading-relaxed max-w-3xl mb-8">{data.relevantEvidence.intro}</p>

        <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 md:border-r border-[rgba(255,255,255,0.06)]">
              <div className="text-xs font-medium uppercase tracking-wide text-subtext mb-3">
                Your problem
              </div>
              <p className="text-white/90 leading-relaxed">{data.relevantEvidence.companyProblem}</p>
            </div>
            <div className="p-6 md:p-8">
              <div className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent-solid)] mb-3">
                My experience
              </div>
              <p className="text-white/90 leading-relaxed">{data.relevantEvidence.myExperience}</p>
            </div>
          </div>

          <div className="px-6 md:px-8 py-6 border-t border-[rgba(255,255,255,0.06)]">
            <p className="text-sm text-subtext leading-relaxed">{data.relevantEvidence.overlap}</p>
          </div>

          {data.relevantEvidence.projectImage && (
            <div className="px-6 md:px-8 pt-2">
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)]">
                <Image
                  src={data.relevantEvidence.projectImage}
                  alt={`${data.company.name} evidence visual`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="px-6 md:px-8 py-6">
            <a
              href={data.relevantEvidence.caseStudyUrl}
              className="text-sm font-medium text-[var(--color-accent-solid)] hover:underline underline-offset-4"
            >
              {data.relevantEvidence.caseStudyLabel}
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4 — A REAL DECISION */}
      <section id="decision" className="py-10 border-t border-[rgba(255,255,255,0.06)]">
        <h2 className="text-xl font-semibold mb-6">A real decision</h2>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111114] p-6 md:p-8 font-mono text-sm leading-relaxed">
          <p>
            <span className="text-subtext">problem</span>
            <span className="text-white/40"> → </span>
            <span className="text-white/90">{data.realDecision.problem}</span>
          </p>
          <p className="mt-4">
            <span className="text-subtext">decision</span>
            <span className="text-white/40"> → </span>
            <span className="text-white/90">{data.realDecision.decision}</span>
          </p>
          <p className="mt-4">
            <span className="text-subtext">trade-off</span>
            <span className="text-white/40"> → </span>
            <span className="text-white/90">{data.realDecision.tradeoff}</span>
          </p>
          <p className="mt-4">
            <span className="text-[var(--color-accent-solid)]">result</span>
            <span className="text-white/40"> → </span>
            <span className="text-white/90">{data.realDecision.result}</span>
          </p>
        </div>
      </section>

      {/* SECTION 5 — CULTURE FIT (visually distinct from the evidence section) */}
      <section
        className="py-10 mt-2 rounded-2xl border"
        style={{
          background: 'color-mix(in srgb, var(--color-accent-solid) 5%, transparent)',
          borderColor: 'color-mix(in srgb, var(--color-accent-solid) 25%, transparent)',
        }}
      >
        <div className="px-6 md:px-10">
          <h2 className="text-xl font-semibold mb-2">Working style</h2>
          <p className="text-subtext leading-relaxed max-w-2xl mb-8">{data.cultureFit.intro}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.cultureFit.traits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--color-accent-solid)]/10 border border-[var(--color-accent-solid)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[var(--color-accent-solid)] text-xs font-bold">{idx + 1}</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-1">{item.trait}</div>
                  <p className="text-subtext text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — HIRING PATHS */}
      <section className="py-10 border-t border-[rgba(255,255,255,0.06)] mt-2">
        <h2 className="text-xl font-semibold mb-2">
          {data.hiringPathsHeading ?? "How you'd like to evaluate me"}
        </h2>
        <p className="text-subtext text-sm mb-8 max-w-2xl">
          {data.hiringPathsSubtext ??
            'All three are equally welcome, this is just about whatever gets you comfortable fastest.'}
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {data.hiringPaths.map((path) => (
            <div
              key={path.tier}
              className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 flex flex-col h-full"
            >
              <span
                className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${TIER_STYLES[path.tier]}`}
              >
                {path.tier}
              </span>
              <h3 className="font-medium text-white mb-2">{path.title}</h3>
              <p className="text-sm text-subtext leading-relaxed flex-grow">{path.message}</p>
              <CtaAction
                target={path.ctaTarget}
                label={path.ctaLabel}
                onOpenScheduler={() => setSchedulerOpen(true)}
                className="mt-6 inline-flex justify-center px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.15)] text-sm font-medium text-white hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)] transition-all"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — PROJECT EXPLORATION */}
      {relevantProjects.length > 0 && (
        <section className="py-10 border-t border-[rgba(255,255,255,0.06)]">
          <h2 className="text-xl font-semibold mb-6">Relevant projects</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {relevantProjects.map((project) => (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] overflow-hidden hover:border-[var(--color-accent-solid)]/40 transition-colors group"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image src={project.hero} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-subtext leading-relaxed mb-3">{project.short}</p>
                  <span className="text-sm font-medium text-[var(--color-accent-solid)] group-hover:underline underline-offset-4">
                    Explore the work →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 8 — CLOSING NOTE */}
      <section className="py-14 border-t border-[rgba(255,255,255,0.06)] text-center max-w-lg mx-auto">
        <p className="text-subtext leading-relaxed">{data.closing.note}</p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CtaAction
            target={data.closing.scheduleCtaTarget}
            label={data.closing.scheduleCtaLabel}
            onOpenScheduler={() => setSchedulerOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--color-accent-solid)] text-black text-sm font-medium hover:brightness-110 transition text-center"
          />
          <CtaAction
            target={data.closing.emailCtaTarget}
            label={data.closing.emailCtaLabel}
            onOpenScheduler={() => setSchedulerOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.15)] text-sm font-medium text-white hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)] transition-all text-center"
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              title={label}
              className="p-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)]/50 transition-all"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 9 — FOOTER (shared component, consistent across every page) */}
      <div className="mt-10">
        <Footer />
      </div>

      <CalendlyModal
        open={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
        url={data.scheduling.url}
        heading={data.scheduling.heading}
        subtext={data.scheduling.subtext}
      />
    </div>
  )
}
