'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import {
    Code2,
    Layers,
    Zap,
    Shield,
    Database,
    Compass,
    Boxes,
    TrendingUp
} from 'lucide-react'

const coreValues = [
    {
        icon: Layers,
        title: 'Clean Architecture',
        description: 'Building scalable systems with proper separation of concerns, maintainable code, and clear component hierarchies.',
        color: 'blue'
    },
    {
        icon: Compass,
        title: 'Navigation Flow',
        description: 'Crafting intuitive user journeys with seamless transitions and thoughtful state persistence across platforms.',
        color: 'green'
    },
    {
        icon: Database,
        title: 'State Management',
        description: 'Implementing robust state solutions with proper data flow, predictable updates, and efficient synchronization.',
        color: 'purple'
    },
    {
        icon: Zap,
        title: 'Performance & Caching',
        description: 'Optimizing with smart caching strategies, lazy loading, and efficient data fetching for blazing-fast experiences.',
        color: 'yellow'
    },
    {
        icon: Shield,
        title: 'Security First',
        description: 'Prioritizing authentication, authorization, input validation, and security best practices in every implementation.',
        color: 'red'
    },
    {
        icon: TrendingUp,
        title: 'Optimization',
        description: 'Continuously improving performance metrics, reducing bundle sizes, and enhancing user experience across devices.',
        color: 'cyan'
    },
    {
        icon: Boxes,
        title: 'Cross-Platform Consistency',
        description: 'Ensuring seamless experiences across web, iOS, and Android with unified design systems and shared logic.',
        color: 'orange'
    },
    {
        icon: Code2,
        title: 'Problem-First Thinking',
        description: 'Solving challenges based on the problem itself, not the stackadapting technology to fit the need.',
        color: 'pink'
    }
]

const highlightClassName = 'text-white font-medium'

const developerJourneyParagraphs: { id: string, content: ReactNode }[] = [
    {
        id: 'freelance-android',
        content: <>
            I started out building <span className={highlightClassName}>Android apps</span> as a freelancer, small projects like a plant care app, learning how real software gets built by actually shipping things to users.
        </>
    },
    {
        id: 'digital-upgraders',
        content: <>
            That led me to <span className={highlightClassName}>Digital Upgraders</span> where I joined as a <span className={highlightClassName}>full stack engineer</span> on a social media platform. The problems there were real and immediate. Feed loading was taking 3 seconds so I fixed it down to <span className={highlightClassName}>700ms</span> through query optimization, indexing, and caching. Notifications were duplicating because of race conditions in non-transactional queries, fixed that too. I migrated the whole infrastructure from <span className={highlightClassName}>AWS to Fly.io</span> without downtime, cleaned up a frontend codebase that had grown into 3000-line files, and fixed rendering bugs users were feeling on Android, iOS, and Safari. It was fast-paced and it taught me how to find problems that matter and fix them properly.
        </>
    },
    {
        id: 'microtechx-iga',
        content: <>
            Now at Microtechx I am building an <span className={highlightClassName}>Identity Governance and Administration</span> product in partnership with Intimec. IGA is what enterprises use to control who has access to what, track approvals, enforce policies, and stay compliant. I joined early and own significant parts of the product. I built the entire <span className={highlightClassName}>Access Portal</span> feature end to end, the <span className={highlightClassName}>entitlement rule engine</span>, the business roles catalog with hierarchy and cycle detection, workflow and debugging analytics, and the auditing system. Before writing a single line I ask what the use case is, what the edge cases are, and what business value it actually delivers. I care that features make the product better and drive real value, not just that they work technically.
        </>
    },
    {
        id: 'current-stack',
        content: <>
            Full stack across the whole journey, <span className={highlightClassName}>Java Spring Boot and Next.js React TypeScript</span> today, with <span className={highlightClassName}>distributed systems</span>, event-driven architecture, PostgreSQL, Kafka, OpenSearch, and gRPC in between.
        </>
    }
]

const getColorClasses = (color: string) => {
    const colors = {
        blue: {
            icon: 'text-blue-400',
            border: 'border-blue-500/20',
            bg: 'bg-blue-500/5',
            hover: 'hover:border-blue-500/40'
        },
        green: {
            icon: 'text-green-400',
            border: 'border-green-500/20',
            bg: 'bg-green-500/5',
            hover: 'hover:border-green-500/40'
        },
        purple: {
            icon: 'text-purple-400',
            border: 'border-purple-500/20',
            bg: 'bg-purple-500/5',
            hover: 'hover:border-purple-500/40'
        },
        yellow: {
            icon: 'text-yellow-400',
            border: 'border-yellow-500/20',
            bg: 'bg-yellow-500/5',
            hover: 'hover:border-yellow-500/40'
        },
        red: {
            icon: 'text-red-400',
            border: 'border-red-500/20',
            bg: 'bg-red-500/5',
            hover: 'hover:border-red-500/40'
        },
        cyan: {
            icon: 'text-cyan-400',
            border: 'border-cyan-500/20',
            bg: 'bg-cyan-500/5',
            hover: 'hover:border-cyan-500/40'
        },
        orange: {
            icon: 'text-orange-400',
            border: 'border-orange-500/20',
            bg: 'bg-orange-500/5',
            hover: 'hover:border-orange-500/40'
        },
        pink: {
            icon: 'text-pink-400',
            border: 'border-pink-500/20',
            bg: 'bg-pink-500/5',
            hover: 'hover:border-pink-500/40'
        }
    }
    return colors[color as keyof typeof colors] || colors.blue
}

export default function Journey() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12 md:py-16"
        >
            {/* === Section Header === */}
            <div className="text-center mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-4">My Journey</h2>
                    <p className="text-subtext text-lg max-w-2xl mx-auto">
                        From Android native to full-stack engineering driven by principles, not just stacks
                    </p>
                </motion.div>
            </div>

            {/* === Dev Journey Narrative === */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass p-8 md:p-10 rounded-2xl border border-[rgba(255,255,255,0.05)] mb-8 md:mb-12 relative overflow-hidden"
            >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-solid)]/5 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-[var(--color-accent-solid)]/10 border border-[var(--color-accent-solid)]/30">
                            <Code2 className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        </div>
                        <h3 className="text-2xl font-semibold">Career Journey</h3>
                    </div>

                    <div className="space-y-4 text-subtext leading-relaxed">
                        {developerJourneyParagraphs.map((paragraph) => (
                            <p key={paragraph.id}>{paragraph.content}</p>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* === Core Values === */}
            <div className="mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h3 className="text-2xl font-semibold mb-3">Core Engineering Values</h3>
                    <p className="text-subtext max-w-2xl mx-auto">
                        The fundamental principles that guide my approach to software engineering, regardless of technology stack
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coreValues.map((value, idx) => {
                        const Icon = value.icon
                        const colors = getColorClasses(value.color)

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                whileHover={{ y: -4 }}
                                className={`glass p-6 rounded-xl border ${colors.border} ${colors.bg} ${colors.hover} transition-all duration-300`}
                            >
                                <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border} w-fit mb-4`}>
                                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                                </div>

                                <h4 className="text-lg font-semibold mb-2 text-white">
                                    {value.title}
                                </h4>

                                <p className="text-sm text-subtext leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* === Philosophy Statement === */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-12 p-6 rounded-xl bg-[var(--color-accent-solid)]/5 border border-[var(--color-accent-solid)]/20"
            >
                <p className="text-lg text-subtext italic">
                    &ldquo;Technology stacks evolve, but engineering fundamentals remain constant.
                    <span className="text-white font-medium"> I adapt tools to solve problems, not problems to fit tools.</span>&rdquo;
                </p>
            </motion.div>
        </motion.section>
    )
}