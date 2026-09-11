'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import type { OutreachPage } from '@/lib/outreach/types'
import { getRelevantProjects } from '@/lib/outreach'
import { captureAnalyticsEvent } from '@/lib/analytics'
import CalendlyModal from '@/components/CalendlyModal'
import Footer from '@/components/Footer'
import XLogo from '@/components/icons/XLogo'

const TIER_STYLES: Record<OutreachPage['hiringPaths'][number]['tier'], string> = {
  Premium: 'bg-[var(--color-accent-solid)] text-onaccent',
  Silver: 'border border-[var(--color-border)] text-heading',
  Bronze: 'border border-[var(--color-border)] text-heading',
}

// Fixed identity, not company-specific — same reach-out channels on every
// outreach page, so it lives here rather than being duplicated per company.
const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/M-Talha-Atif', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-talha-atif/', Icon: Linkedin },
  { label: 'X', href: 'https://x.com/talhaAtif195901', Icon: XLogo },
  { label: 'Email', href: 'mailto:talhaatif573@gmail.com', Icon: Mail },
]

// Renders "**bold**" spans inside content strings as emphasized text, so
// each page's copy can be selectively highlighted for skim readers without
// changing the data schema.
function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-heading">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

// Fires outreach_scroll_depth once per threshold per page view, so PostHog
// shows exactly how far each visitor got before dropping off.
function useScrollDepthTracking(slug: string) {
  useEffect(() => {
    const thresholds = [25, 50, 75, 90, 100]
    const fired = new Set<number>()

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      // Page shorter than the viewport counts as fully read.
      const pct = scrollable <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100))
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t)
          captureAnalyticsEvent('outreach_scroll_depth', { page: slug, depth_pct: t })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])
}

// Fires outreach_section_viewed once per section per page view, so PostHog
// shows which sections were actually seen and where visitors stop.
function useSectionViewTracking(slug: string) {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-track-section]')
    if (sections.length === 0) return
    const seen = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const name = (entry.target as HTMLElement).dataset.trackSection
          if (name && !seen.has(name)) {
            seen.add(name)
            captureAnalyticsEvent('outreach_section_viewed', { page: slug, section: name })
          }
        }
      },
      { threshold: 0.1 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [slug])
}

// `ctaTarget === '#schedule'` is the signal value meaning "open the scheduler
// modal" instead of navigating — used by hiring-path and closing CTAs.
function CtaAction({
  target,
  label,
  className,
  slug,
  location,
  onOpenScheduler,
}: {
  target: string
  label: string
  className: string
  slug: string
  location: string
  onOpenScheduler: () => void
}) {
  const track = () =>
    captureAnalyticsEvent('outreach_cta_clicked', { page: slug, cta: label, location, target })

  if (target === '#schedule') {
    return (
      <button
        type="button"
        onClick={() => {
          track()
          onOpenScheduler()
        }}
        className={className}
      >
        {label}
      </button>
    )
  }
  return (
    <a href={target} onClick={track} className={className}>
      {label}
    </a>
  )
}

export default function OutreachTemplate({ data }: { data: OutreachPage }) {
  const relevantProjects = getRelevantProjects(data.relevantProjects)
  const [schedulerOpen, setSchedulerOpen] = useState(false)

  useScrollDepthTracking(data.slug)
  useSectionViewTracking(data.slug)

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">
      {/* BACK TO PORTFOLIO */}
      <a
        href={data.backToPortfolio.href}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)] transition-all group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>{data.backToPortfolio.label.replace(/^←\s*/, '')}</span>
      </a>

      {/* SECTION 1 — HERO */}
      <motion.section
        data-track-section="hero"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-14 py-10 md:py-14"
      >
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <Emphasis text={data.hero.headline} />
          </h1>
          <p className="mt-4 text-subtext text-lg max-w-xl mx-auto md:mx-0">
            <Emphasis text={data.hero.subtext.replace('[Company]', data.company.name)} />
          </p>

          {data.heroHighlights && data.heroHighlights.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
              {data.heroHighlights.map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--color-accent-solid)]/40 bg-[var(--color-accent-solid)]/10 text-heading"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          <a
            href={data.hero.ctaTarget}
            onClick={() =>
              captureAnalyticsEvent('outreach_cta_clicked', {
                page: data.slug,
                cta: data.hero.ctaLabel,
                location: 'hero',
                target: data.hero.ctaTarget,
              })
            }
            className="inline-block mt-6 text-sm font-medium text-[var(--color-accent-solid)] hover:underline underline-offset-4"
          >
            {data.hero.ctaLabel}
          </a>
        </div>

        <div className="flex-shrink-0">
          <div className="w-36 h-36 md:w-48 md:h-48">
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

      {/* KEY STATS — the 5-second read */}
      {data.keyStats && data.keyStats.length > 0 && (
        <section
          data-track-section="key-stats"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10"
        >
          {data.keyStats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl border border-[var(--color-border)] p-5 text-center hover:border-[var(--color-accent-solid)]/30 transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-accent-solid)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-subtext leading-snug">{stat.label}</div>
            </div>
          ))}
        </section>
      )}

      {/* SECTION 2 — WHAT YOU'RE SOLVING */}
      <section
        data-track-section="what-you-are-solving"
        className="py-8 border-t border-[var(--color-border)]"
      >
        <h2 className="text-xl font-semibold mb-5">What {data.company.name} is solving</h2>
        <ul className="space-y-3 max-w-2xl">
          {data.whatYouAreSolving.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-solid)] flex-shrink-0" />
              <span className="text-subtext leading-relaxed">
                <Emphasis text={point} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 3 — RELEVANT EVIDENCE */}
      <section
        id="evidence"
        data-track-section="evidence"
        className="py-8 border-t border-[var(--color-border)]"
      >
        <h2 className="text-xl font-semibold mb-3">Relevant evidence</h2>
        <p className="text-subtext leading-relaxed max-w-3xl mb-6">
          <Emphasis text={data.relevantEvidence.intro} />
        </p>

        <div className="glass rounded-2xl border border-[var(--color-border)] overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 md:border-r border-[var(--color-border)]">
              <div className="text-xs font-medium uppercase tracking-wide text-subtext mb-3">
                Your problem
              </div>
              <p className="text-heading leading-relaxed">
                <Emphasis text={data.relevantEvidence.companyProblem} />
              </p>
            </div>
            <div className="p-6 md:p-8">
              <div className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent-solid)] mb-3">
                My experience
              </div>
              <p className="text-heading leading-relaxed">
                <Emphasis text={data.relevantEvidence.myExperience} />
              </p>
            </div>
          </div>

          <div className="px-6 md:px-8 py-6 border-t border-[var(--color-border)]">
            <p className="text-sm text-subtext leading-relaxed">
              <Emphasis text={data.relevantEvidence.overlap} />
            </p>
          </div>

          {data.relevantEvidence.projectImage && (
            <div className="px-6 md:px-8 pt-2">
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-[var(--color-border)]">
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
              onClick={() =>
                captureAnalyticsEvent('outreach_cta_clicked', {
                  page: data.slug,
                  cta: data.relevantEvidence.caseStudyLabel,
                  location: 'evidence',
                  target: data.relevantEvidence.caseStudyUrl,
                })
              }
              className="text-sm font-medium text-[var(--color-accent-solid)] hover:underline underline-offset-4"
            >
              {data.relevantEvidence.caseStudyLabel}
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 4 — A REAL DECISION */}
      <section
        id="decision"
        data-track-section="real-decision"
        className="py-8 border-t border-[var(--color-border)]"
      >
        <h2 className="text-xl font-semibold mb-5">A real decision</h2>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[#111114] p-6 md:p-8 font-mono text-sm leading-relaxed">
          <p>
            <span className="text-[var(--color-subtext-on-dark)]">problem</span>
            <span className="text-[var(--color-subtext-on-dark)]"> → </span>
            <span className="text-[var(--color-text-on-dark)]">
              <Emphasis text={data.realDecision.problem} />
            </span>
          </p>
          <p className="mt-4">
            <span className="text-[var(--color-subtext-on-dark)]">decision</span>
            <span className="text-[var(--color-subtext-on-dark)]"> → </span>
            <span className="text-[var(--color-text-on-dark)]">
              <Emphasis text={data.realDecision.decision} />
            </span>
          </p>
          <p className="mt-4">
            <span className="text-[var(--color-subtext-on-dark)]">trade-off</span>
            <span className="text-[var(--color-subtext-on-dark)]"> → </span>
            <span className="text-[var(--color-text-on-dark)]">
              <Emphasis text={data.realDecision.tradeoff} />
            </span>
          </p>
          <p className="mt-4">
            <span className="text-[var(--color-accent-solid)]">result</span>
            <span className="text-[var(--color-subtext-on-dark)]"> → </span>
            <span className="text-[var(--color-text-on-dark)]">
              <Emphasis text={data.realDecision.result} />
            </span>
          </p>
        </div>
      </section>

      {/* SECTION 5 — CULTURE FIT (visually distinct from the evidence section) */}
      <section
        data-track-section="working-style"
        className="py-8 mt-2 rounded-2xl border"
        style={{
          background: 'color-mix(in srgb, var(--color-accent-solid) 5%, transparent)',
          borderColor: 'color-mix(in srgb, var(--color-accent-solid) 25%, transparent)',
        }}
      >
        <div className="px-6 md:px-10">
          <h2 className="text-xl font-semibold mb-2">Working style</h2>
          <p className="text-subtext leading-relaxed max-w-2xl mb-6">
            <Emphasis text={data.cultureFit.intro} />
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.cultureFit.traits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--color-accent-solid)]/10 border border-[var(--color-accent-solid)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[var(--color-accent-solid)] text-xs font-bold">{idx + 1}</span>
                </div>
                <div>
                  <div className="text-heading font-medium text-sm mb-1">{item.trait}</div>
                  <p className="text-subtext text-sm leading-relaxed">
                    <Emphasis text={item.description} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — HIRING PATHS */}
      <section
        data-track-section="hiring-paths"
        className="py-8 border-t border-[var(--color-border)] mt-2"
      >
        <h2 className="text-xl font-semibold mb-2">
          {data.hiringPathsHeading ?? "How you'd like to evaluate me"}
        </h2>
        <p className="text-subtext text-sm mb-6 max-w-2xl">
          {data.hiringPathsSubtext ??
            'All three are equally welcome, this is just about whatever gets you comfortable fastest.'}
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {data.hiringPaths.map((path) => (
            <div
              key={path.tier}
              className="glass rounded-2xl border border-[var(--color-border)] p-6 flex flex-col h-full"
            >
              <span
                className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${TIER_STYLES[path.tier]}`}
              >
                {path.tier}
              </span>
              <h3 className="font-medium text-heading mb-2">{path.title}</h3>
              <p className="text-sm text-subtext leading-relaxed flex-grow">
                <Emphasis text={path.message} />
              </p>
              <CtaAction
                target={path.ctaTarget}
                label={path.ctaLabel}
                slug={data.slug}
                location={`hiring-path-${path.tier.toLowerCase()}`}
                onOpenScheduler={() => setSchedulerOpen(true)}
                className="mt-6 inline-flex justify-center px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium text-heading hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)] transition-all"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — PROJECT EXPLORATION */}
      {relevantProjects.length > 0 && (
        <section
          data-track-section="relevant-projects"
          className="py-8 border-t border-[var(--color-border)]"
        >
          <h2 className="text-xl font-semibold mb-5">Relevant projects</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {relevantProjects.map((project) => (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                onClick={() =>
                  captureAnalyticsEvent('outreach_cta_clicked', {
                    page: data.slug,
                    cta: 'Explore the work',
                    location: 'relevant-projects',
                    target: `/projects/${project.slug}`,
                  })
                }
                className="glass rounded-2xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent-solid)]/40 transition-colors group"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image src={project.hero} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-heading mb-1">{project.title}</h3>
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
      <section
        data-track-section="closing"
        className="py-12 border-t border-[var(--color-border)] text-center max-w-lg mx-auto"
      >
        <p className="text-subtext leading-relaxed">
          <Emphasis text={data.closing.note} />
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <CtaAction
            target={data.closing.scheduleCtaTarget}
            label={data.closing.scheduleCtaLabel}
            slug={data.slug}
            location="closing"
            onOpenScheduler={() => setSchedulerOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--color-accent-solid)] text-onaccent text-sm font-medium hover:brightness-110 transition text-center"
          />
          <CtaAction
            target={data.closing.emailCtaTarget}
            label={data.closing.emailCtaLabel}
            slug={data.slug}
            location="closing"
            onOpenScheduler={() => setSchedulerOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[var(--color-border)] text-sm font-medium text-heading hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)] transition-all text-center"
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
              className="p-2.5 rounded-lg border border-[var(--color-border)] text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)]/50 transition-all"
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
