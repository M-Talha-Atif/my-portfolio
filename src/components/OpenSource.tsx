'use client'
import { motion } from 'framer-motion'
import { GitPullRequest } from 'lucide-react'

export default function OpenSource() {
    const contributions = [
        {
            repo: 'Apache Checkstyle',
            pr: '#18807',
            link: 'https://github.com/checkstyle/checkstyle/pull/18807',
            description:
                'Documentation contribution to a Java static analysis tool used by thousands of production projects.',
        },
        {
            repo: 'OpenSRE (Tracer Cloud)',
            pr: '#3702',
            link: 'https://github.com/Tracer-Cloud/opensre/pull/3702',
            description:
                'Refactored scattered exception handling into a centralized, named exception hierarchy with a single safe_execute() boundary, improving auditability of fallback behavior in the agent harness.',
        },
        {
            repo: 'OpenSRE (Tracer Cloud)',
            pr: '#3620',
            link: 'https://github.com/Tracer-Cloud/opensre/pull/3620',
            description:
                'Fixed stale documentation paths after an internal module reorganization, scoped precisely to the reported issue.',
        },
        {
            repo: 'OpenSRE (Tracer Cloud)',
            pr: '#3618',
            link: 'https://github.com/Tracer-Cloud/opensre/pull/3618',
            description:
                'Removed a legacy constant no longer in use while preserving backward-compatible migration support for older installs, with care taken not to break uninstall cleanup.',
        },
    ]

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
                        key={c.link}
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="group glass p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_var(--color-accent-solid)]/20 transition-all text-left"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <GitPullRequest className="w-4 h-4 text-[var(--color-accent-solid)] flex-shrink-0" />
                            <h3 className="text-base font-semibold text-white group-hover:text-[var(--color-accent-solid)] transition-colors">
                                {c.repo}
                            </h3>
                            <span className="text-sm text-subtext">{c.pr}</span>
                        </div>
                        <p className="text-sm text-subtext leading-relaxed">{c.description}</p>
                    </motion.a>
                ))}
            </div>
        </motion.section>
    )
}
