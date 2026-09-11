'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GitPullRequest, Search, X } from 'lucide-react'
import {
  openSourceContributions,
  getAllTechnologies,
  getAllCategories,
} from '@/lib/opensource'
import posthog from 'posthog-js'

export default function OpenSourcePage() {
  const [query, setQuery] = useState('')
  const [activeTechs, setActiveTechs] = useState<string[]>([])
  const [activeCategories, setActiveCategories] = useState<string[]>([])

  const allTechnologies = useMemo(() => getAllTechnologies(), [])
  const allCategories = useMemo(() => getAllCategories(), [])

  const toggleTech = (tech: string) => {
    setActiveTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    )
  }

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setQuery('')
    setActiveTechs([])
    setActiveCategories([])
  }

  const hasActiveFilters = query.trim() !== '' || activeTechs.length > 0 || activeCategories.length > 0

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return openSourceContributions.filter((c) => {
      const matchesQuery =
        q === '' ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.impact.toLowerCase().includes(q) ||
        c.repo.toLowerCase().includes(q) ||
        c.technologies.some((t) => t.toLowerCase().includes(q))

      const matchesTechs =
        activeTechs.length === 0 || activeTechs.every((t) => c.technologies.includes(t))

      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(c.category)

      return matchesQuery && matchesTechs && matchesCategory
    })
  }, [query, activeTechs, activeCategories])

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)] transition-all group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to portfolio</span>
      </Link>

      <div className="max-w-2xl mx-auto text-center mt-10 mb-10">
        <h1 className="text-4xl font-bold mb-4">Open Source Contributions</h1>
        <p className="text-subtext text-lg">
          Every merged pull request listed here, across projects I don&apos;t own, where the
          discipline is working within someone else&apos;s conventions and verifying real behavior
          before changing anything.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, repo, or technology..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-heading placeholder:text-subtext focus:outline-none focus:border-[var(--color-accent-solid)] transition-colors"
        />
      </div>

      {/* Technology filters */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="text-xs font-medium uppercase tracking-wide text-subtext mb-3 text-center">
          Filter by technology
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allTechnologies.map((tech) => {
            const active = activeTechs.includes(tech)
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  active
                    ? 'bg-[var(--color-accent-solid)] text-onaccent border-[var(--color-accent-solid)] font-medium'
                    : 'border-[var(--color-border)] text-subtext hover:border-[var(--color-accent-solid)]/40'
                }`}
              >
                {tech}
              </button>
            )
          })}
        </div>
      </div>

      {/* Category filters */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-xs font-medium uppercase tracking-wide text-subtext mb-3 text-center">
          Filter by category
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allCategories.map((category) => {
            const active = activeCategories.includes(category)
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  active
                    ? 'bg-[var(--color-accent-solid)] text-onaccent border-[var(--color-accent-solid)] font-medium'
                    : 'border-[var(--color-border)] text-subtext hover:border-[var(--color-accent-solid)]/40'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-xs text-subtext hover:text-[var(--color-accent-solid)] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
        </div>
      )}

      <div className="text-center text-sm text-subtext mb-6">
        {filtered.length} contribution{filtered.length === 1 ? '' : 's'}
      </div>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((c, i) => (
            <motion.a
              key={c.slug}
              href={c.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.05 }}
              onClick={() => posthog.capture('opensource_pr_clicked', { pr: c.slug, source: 'listing_page' })}
              className="group glass p-6 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent-solid)]/40 hover:shadow-[0_0_30px_var(--color-accent-solid)]/10 transition-all text-left flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                <GitPullRequest className="w-4 h-4 text-[var(--color-accent-solid)] flex-shrink-0" />
                <span className="text-sm font-medium text-heading">{c.repo}</span>
                <span className="text-xs text-subtext">{c.prNumber}</span>
                {(c.linesAdded > 0 || c.linesRemoved > 0) && (
                  <span className="ml-auto text-xs font-mono">
                    <span className="text-green-400">+{c.linesAdded}</span>{' '}
                    <span className="text-red-400">-{c.linesRemoved}</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold text-heading group-hover:text-[var(--color-accent-solid)] transition-colors mb-2">
                {c.title}
              </h3>

              <p className="text-sm text-subtext leading-relaxed mb-3">{c.summary}</p>

              <div className="text-xs text-subtext/80 leading-relaxed mb-4 border-l-2 border-[var(--color-accent-solid)]/30 pl-3">
                {c.impact}
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {c.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="text-center text-subtext py-16">
          No contributions match those filters.
        </div>
      )}
    </div>
  )
}
