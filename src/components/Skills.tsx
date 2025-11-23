'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Smartphone, Globe, Server, Database, Cloud, Cpu } from 'lucide-react'

const skillCategories = [
    {
        id: 'mobile',
        name: 'Mobile',
        icon: Smartphone,
        color: 'orange',
        skills: [
            'Kotlin',
            'Jetpack Compose',
            'React Native',
            'Expo',
            'Android SDK',
            'CameraX',
            'Material Design 3',
            'Hilt',
            'Retrofit',
            'Room DB'
        ]
    },
    {
        id: 'web',
        name: 'Web',
        icon: Globe,
        color: 'blue',
        skills: [
            'React.js',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'Tailwind CSS',
            'HTML/CSS',
            'Three.js',
            'Framer Motion',
            'Redux',
            'Zustand'
        ]
    },
    {
        id: 'backend',
        name: 'Backend',
        icon: Server,
        color: 'green',
        skills: [
            'Node.js',
            'NestJS',
            'Flask',
            'Express.js',
            'REST APIs',
            'GraphQL',
            'JWT',
            'OAuth 2.0',
            'WebSocket',
            'Microservices'
        ]
    },
    {
        id: 'database',
        name: 'Database',
        icon: Database,
        color: 'purple',
        skills: [
            'MongoDB',
            'PostgreSQL',
            'Redis',
            'Prisma',
            'Firebase',
            'SQL',
            'NoSQL',
            'Database Design'
        ]
    },
    {
        id: 'cloud',
        name: 'Cloud & DevOps',
        icon: Cloud,
        color: 'cyan',
        skills: [
            'Vercel',
            'AWS',
            'Git & GitHub',
            'Docker',
            'CI/CD',
            'Nginx',
            'Linux',
            'Jira'
        ]
    },
    {
        id: 'ai',
        name: 'AI & ML',
        icon: Cpu,
        color: 'pink',
        skills: [
            'OpenAI APIs',
            'Google Gemini',
            'TensorFlow Lite',
            'Prompt Engineering',
            'Computer Vision',
            'ML Model Integration',
            'Web Speech API'
        ]
    }
]

const getColorClasses = (color: string) => {
    const colors = {
        orange: {
            border: 'border-orange-500/30',
            text: 'text-orange-400',
            bg: 'bg-orange-500/10',
            hover: 'hover:border-orange-500/50'
        },
        blue: {
            border: 'border-blue-500/30',
            text: 'text-blue-400',
            bg: 'bg-blue-500/10',
            hover: 'hover:border-blue-500/50'
        },
        green: {
            border: 'border-green-500/30',
            text: 'text-green-400',
            bg: 'bg-green-500/10',
            hover: 'hover:border-green-500/50'
        },
        purple: {
            border: 'border-purple-500/30',
            text: 'text-purple-400',
            bg: 'bg-purple-500/10',
            hover: 'hover:border-purple-500/50'
        },
        cyan: {
            border: 'border-cyan-500/30',
            text: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            hover: 'hover:border-cyan-500/50'
        },
        pink: {
            border: 'border-pink-500/30',
            text: 'text-pink-400',
            bg: 'bg-pink-500/10',
            hover: 'hover:border-pink-500/50'
        }
    }
    return colors[color as keyof typeof colors] || colors.blue
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-20"
        >
            {/* === Section Header === */}
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
                    <p className="text-subtext text-lg max-w-2xl mx-auto">
                        Technologies I work with across the full stack
                    </p>
                </motion.div>
            </div>

            {/* === Category Filter === */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-5 py-2 rounded-full border transition-all ${
                        activeCategory === null
                            ? 'bg-[var(--color-accent-solid)] text-black border-[var(--color-accent-solid)] font-medium'
                            : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.3)]'
                    }`}
                >
                    All
                </button>
                {skillCategories.map((category) => {
                    const Icon = category.icon
                    const colors = getColorClasses(category.color)
                    return (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                            className={`px-5 py-2 rounded-full border transition-all flex items-center gap-2 ${
                                activeCategory === category.id
                                    ? `${colors.bg} ${colors.text} ${colors.border} font-medium`
                                    : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.3)]'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{category.name}</span>
                        </button>
                    )
                })}
            </div>

            {/* === Skills Grid === */}
            <div className="grid gap-8">
                {skillCategories
                    .filter(cat => activeCategory === null || cat.id === activeCategory)
                    .map((category, catIdx) => {
                        const Icon = category.icon
                        const colors = getColorClasses(category.color)
                        
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                                        <Icon className={`w-6 h-6 ${colors.text}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                                        <p className="text-xs text-subtext">{category.skills.length} technologies</p>
                                    </div>
                                </div>

                                {/* Skills List */}
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {category.skills.map((skill, idx) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            whileHover={{ y: -2 }}
                                            className={`glass px-4 py-3 rounded-lg border ${colors.border} ${colors.hover} transition-all duration-200 text-center`}
                                        >
                                            <span className="text-sm text-white font-medium">{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
            </div>
        </motion.section>
    )
}