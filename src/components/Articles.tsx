'use client'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function Articles() {
    const posts = [
        {
            title: 'Localhost: Talking to Yourself in the Digital World',
            link: 'https://medium.com/@talhaatif573/localhost-talking-to-yourself-in-the-digital-world-bd84682df4f9',
            date: 'Feb 2025',
        },
    ]

    return (
        <motion.section
            id="articles"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-20"
        >
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Articles & Insights</h2>

                <p className="text-subtext text-lg max-w-2xl mx-auto">
                    Insights, tutorials, and technical deep dives sharing practical lessons from building real-world applications,
                    exploring emerging technologies, and enhancing the modern developer experience.
                </p>

            </div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {posts.map((p, i) => (
                    <motion.a
                        key={p.title}
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="group glass p-6 rounded-2xl block border border-[rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_var(--color-accent-solid)]/20 transition-all"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold text-white group-hover:text-[var(--color-accent-solid)] transition-colors">
                                {p.title}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-subtext group-hover:text-[var(--color-accent-solid)] transition" />
                        </div>

                        <p className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] text-[var(--color-accent-solid)]">
                            {p.date}
                        </p>
                    </motion.a>
                ))}
            </div>
        </motion.section>
    )
}
