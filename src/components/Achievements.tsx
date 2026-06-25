'use client'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function Achievements() {
    const achievements = [
        // {
        //   title: 'Runner-up — PuCon Hackathon',
        //   image: '/achievements/pucon.png',
        //   link: 'https://example.com/pucon',
        //   learning: [
        //     'Built a full-stack Flutter and Firebase based backend app under 8 hours',
        //     'Enhanced team coordination, presentation skills and fast API integration skills',
        //   ],
        // },
        {
            title: 'Calico Berkeley - Speed Coding Competition',
            image: '/achievements/Calico.png',
            link: 'https://github.com/M-Talha-Atif/Coding-Contests',
            learning: [
                'Sharpened algorithmic thinking by solving complex coding challenges under timed conditions',
                'Strengthened data structure mastery and decision-making speed through competitive coding rounds',
            ],
        },
        {
            title: 'ICPC Asia Topi Online Round',
            image: '/achievements/ICPC.png',
            link: 'https://github.com/M-Talha-Atif/Coding-Contests',
            learning: [
                'Enhanced problem-solving depth through large-scale algorithmic contests with optimized runtime solutions',
                'Gained experience in debugging and implementing efficient algorithms in real-time competition settings',
            ],
        },

    ]

    return (
        <motion.section
            id="achievements"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12 md:py-16"
        >
            <div className="max-w-6xl mx-auto text-center mb-8 md:mb-10">
                <h2 className="text-4xl font-bold mb-4">Achievements</h2>
                <p className="text-subtext text-lg max-w-2xl mx-auto">
                    Recognitions and milestones that reflect my technical growth, teamwork, and
                    contribution to impactful projects.
                </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {achievements.map((a, i) => (
                    <motion.div
                        key={a.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="group relative glass p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_var(--color-accent-solid)]/20 transition-all"
                    >
                        {/* Image */}
                        <div className="h-40 mb-4 rounded-xl overflow-hidden flex items-center justify-center bg-[rgba(255,255,255,0.02)] relative">
                            <Image
                                src={a.image}
                                alt={a.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                                priority={i === 0} // prioritize first image for better LCP
                            />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-[var(--color-accent-solid)] transition-colors">
                            {a.title}
                            {a.link && (
                                <a
                                    href={a.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block ml-2 text-[var(--color-accent-solid)] hover:underline align-middle"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </h3>

                        {/* Learnings */}
                        <ul className="text-sm text-subtext text-left space-y-1">
                            {a.learning.map((point) => (
                                <li key={`${a.title}-${point}`} className="leading-relaxed before:content-['•'] before:mr-2">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}
