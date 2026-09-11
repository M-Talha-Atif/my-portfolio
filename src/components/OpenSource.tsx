'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GitPullRequest, ArrowRight } from 'lucide-react'
import { getFeaturedContributions } from '@/lib/opensource'
import posthog from 'posthog-js'

export default function OpenSource() {
    const contributions = getFeaturedContributions()

    return (
        <motion.section
            id="opensource"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12 md:py-16"
        >
            <div className="max-w-6xl mx-auto text-center mb-8 md:mb-10">
                <h2 className="text-4xl font-bold mb-4">Open Source</h2>
                <p className="text-subtext text-lg max-w-2xl mx-auto">
                    Merged pull requests across projects I don&apos;t own, where the discipline is
                    working within someone else&apos;s conventions, not just my own.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
                {contributions.map((c, i) => (
                    <motion.a
                        key={c.slug}
                        href={c.prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        onClick={() => posthog.capture('opensource_pr_clicked', { pr: c.slug })}
                        className="group glass p-6 rounded-2xl border border-[var(--color-border)] hover:shadow-[0_0_30px_var(--color-accent-solid)]/20 transition-all text-left"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <GitPullRequest className="w-4 h-4 text-[var(--color-accent-solid)] flex-shrink-0" />
                            <h3 className="text-base font-semibold text-heading group-hover:text-[var(--color-accent-solid)] transition-colors">
                                {c.repo}
                            </h3>
                            <span className="text-sm text-subtext">{c.prNumber}</span>
                        </div>
                        <p className="text-sm text-subtext leading-relaxed">{c.summary}</p>
                    </motion.a>
                ))}
            </div>

            <div className="text-center mt-8">
                <Link
                    href="/open-source"
                    onClick={() => posthog.capture('opensource_view_all_clicked')}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-solid)] hover:underline underline-offset-4"
                >
                    View all open source contributions
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.section>
    )
}
