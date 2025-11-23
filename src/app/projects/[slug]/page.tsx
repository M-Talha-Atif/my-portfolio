'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../../../lib/projects'
import { use } from 'react'
import VisualCarousel from '@/components/VisualCarousel'
import MermaidDiagram from '@/components/MermaidDiagram'
import { 
    Monitor, 
    Smartphone, 
    ExternalLink, 
    Github, 
    Download, 
    Award,
    TrendingUp,
    Zap,
    Target,
    CheckCircle2,
    Code2,
    Users,
    Server,
    AlertCircle,
    Network
} from 'lucide-react'
import Link from "next/link"

interface Props {
    params: Promise<{ slug: string }>
}

export default function ProjectPage({ params }: Props) {
    const { slug } = use(params)
    const project = projects.find(p => p.slug === slug)
    // const [view, setView] = useState<'web' | 'mobile'>('web')
    const [view, setView] = useState<'web' | 'mobile'>(
    project?.platforms?.includes('web') ? 'web' : 'mobile'
)

    if (!project) return <div className="p-8">Project not found</div>

    const hasBoth = project.platforms?.includes('web') && project.platforms?.includes('mobile')

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-6 pt-24 pb-24"
        >
            {/* === Back Button === */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)] transition-all mb-6 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>Back to Home</span>
            </Link>

            {/* === Header with Platform Badges === */}
            <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-4xl font-bold">{project.title}</h1>
                    <div className="flex gap-2">
                        {project.platforms?.includes('web') && (
                            <div className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium flex items-center gap-1.5">
                                <Monitor className="w-3.5 h-3.5" />
                                Web
                            </div>
                        )}
                        {project.platforms?.includes('mobile') && (
                            <div className="px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-medium flex items-center gap-1.5">
                                <Smartphone className="w-3.5 h-3.5" />
                                Mobile
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-subtext text-lg">{project.short}</p>
            </header>

            {/* === Key Metrics Grid === */}
            {project.metrics && project.metrics.length > 0 && (
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                    {project.metrics.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-5 rounded-xl border border-[rgba(255,255,255,0.05)] text-center hover:border-[var(--color-accent-solid)]/30 transition-colors"
                        >
                            <div className="flex justify-center mb-2">
                                <TrendingUp className="w-4 h-4 text-[var(--color-accent-solid)]" />
                            </div>
                            <div className="text-xl font-bold text-[var(--color-accent-solid)] mb-1">
                                {metric.value}
                            </div>
                            <div className="text-[10px] text-subtext leading-tight">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </section>
            )}

            {/* === Overview === */}
            <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2 mb-4">
                    {/* <Target className="w-5 h-5 text-[var(--color-accent-solid)]" /> */}
                    <h2 className="text-2xl font-semibold">Project Overview</h2>
                </div>
                <p className="text-subtext leading-relaxed">{project.overview}</p>
            </section>

            {/* === Problem / Solution === */}
            <section className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="glass p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        {/* <span className="text-2xl">🎯</span> */}
                        Problem Statement
                    </h3>
                    <p className="text-subtext relative z-10 leading-relaxed">{project.problem}</p>
                </div>
                <div className="glass p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        {/* <span className="text-2xl">✨</span> */}
                        Solution
                    </h3>
                    <p className="text-subtext relative z-10 leading-relaxed">{project.solution}</p>
                </div>
            </section>

            {/* === Project Goals === */}
            {project.projectGoals && project.projectGoals.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Target className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Project Goals</h3>
                    </div>
                    <div className="space-y-3">
                        {project.projectGoals.map((goal, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                            >
                                <div className="w-6 h-6 rounded-full bg-[var(--color-accent-solid)]/10 border border-[var(--color-accent-solid)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[var(--color-accent-solid)] text-xs font-bold">{idx + 1}</span>
                                </div>
                                <p className="text-subtext text-sm leading-relaxed">{goal}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* === Technical Highlights === */}
            {project.highlights && project.highlights.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Zap className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Technical Highlights</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {project.highlights.map((highlight, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-accent-solid)]/30 transition-colors"
                            >
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-solid)] flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-subtext leading-relaxed">{highlight}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* === Platform Switcher === */}
            {hasBoth && (
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setView('web')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${
                            view === 'web'
                                ? 'bg-[var(--color-accent-solid)] text-black font-medium border-[var(--color-accent-solid)] shadow-lg shadow-[var(--color-accent-solid)]/20'
                                : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.2)]'
                        }`}
                    >
                        <Monitor className="w-4 h-4" /> Web Platform
                    </button>
                    <button
                        onClick={() => setView('mobile')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${
                            view === 'mobile'
                                ? 'bg-[var(--color-accent-solid)] text-black font-medium border-[var(--color-accent-solid)] shadow-lg shadow-[var(--color-accent-solid)]/20'
                                : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.2)]'
                        }`}
                    >
                        <Smartphone className="w-4 h-4" /> Mobile App
                    </button>
                </div>
            )}

            {/* === Visual Designs === */}
            <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {view === 'mobile' ? (
                        <Smartphone className="w-5 h-5 text-[var(--color-accent-solid)]" />
                    ) : (
                        <Monitor className="w-5 h-5 text-[var(--color-accent-solid)]" />
                    )}
                    Visual Designs — {view === 'mobile' ? 'Mobile App' : 'Web Platform'}
                </h3>
                <VisualCarousel images={view === 'mobile' ? project.mobileDesigns : project.webDesigns} />
                
                {view === 'mobile' && project.apk && (
                    <div className="mt-6 p-4 rounded-lg bg-[var(--color-accent-solid)]/5 border border-[var(--color-accent-solid)]/20">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <Download className="w-5 h-5 text-[var(--color-accent-solid)]" />
                                <div>
                                    <div className="font-medium text-white">Download Android APK</div>
                                    <div className="text-xs text-subtext">
                                        Version 1.0 • {project.apkSize || '—'} MB
                                    </div>
                                </div>
                            </div>
                            <a
                                href={project.apk}
                                target="_blank"
                                className="px-4 py-2 rounded-lg bg-[var(--color-accent-solid)] text-black font-medium hover:brightness-110 transition"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                )}
            </section>

            {/* === Key Features === */}
            <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--color-accent-solid)]" />
                    Key Features
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((f, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-solid)] flex-shrink-0 mt-2" />
                            <span className="text-subtext text-sm leading-relaxed">{f}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* === Individual Contributions === */}
            {project.individualContributions && project.individualContributions.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Users className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">My Individual Contributions</h3>
                    </div>
                    <div className="space-y-3">
                        {project.individualContributions.map((contribution, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-accent-solid)]/20 transition-colors"
                            >
                                <Code2 className="w-4 h-4 text-[var(--color-accent-solid)] flex-shrink-0 mt-1" />
                                <p className="text-sm text-subtext leading-relaxed">{contribution}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* === System Architecture === */}
            {project.architectureDetails && project.architectureDetails.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Server className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">System Architecture Overview</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[rgba(255,255,255,0.1)]">
                                    <th className="text-left py-3 px-4 text-[var(--color-accent-solid)] font-semibold">Layer</th>
                                    <th className="text-left py-3 px-4 text-[var(--color-accent-solid)] font-semibold">Technology</th>
                                    <th className="text-left py-3 px-4 text-[var(--color-accent-solid)] font-semibold">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.architectureDetails.map((detail, idx) => (
                                    <motion.tr
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                                    >
                                        <td className="py-3 px-4 text-white font-medium">{detail.layer}</td>
                                        <td className="py-3 px-4 text-blue-300">{detail.technology}</td>
                                        <td className="py-3 px-4 text-subtext">{detail.purpose}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* === Diagrams (Images) === */}
            {/* {project.diagrams && project.diagrams.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-4">
                        <Network className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">System Diagrams</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {project.diagrams.map((d: string, i: number) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-4"
                            >
                                <img
                                    src={d}
                                    alt={`Architecture Diagram ${i + 1}`}
                                    className="rounded-lg w-full"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )} */}

            {/* === Mermaid Diagrams (Interactive) === */}
            {project.mermaidDiagrams && project.mermaidDiagrams.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-6">
                        <Network className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Interactive Architecture Diagrams</h3>
                    </div>
                    <div className="space-y-8">
                        {project.mermaidDiagrams.map((diagram, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="p-6 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]"
                            >
                                <MermaidDiagram 
                                    code={diagram.code}
                                    title={diagram.title}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* === Tech Stack - Categorized === */}
            <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-xl font-semibold mb-5">Complete Technology Stack</h3>
                
                {project.techStack ? (
                    <div className="space-y-5">
                        {project.techStack.frontend && project.techStack.frontend.length > 0 && (
                            <div>
                                <div className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    Frontend Technologies
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {project.techStack.frontend.map(t => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/20 text-blue-300 text-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.techStack.backend && project.techStack.backend.length > 0 && (
                            <div>
                                <div className="text-sm font-medium text-green-300 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Backend Technologies
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {project.techStack.backend.map(t => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 rounded-lg bg-green-500/5 border border-green-500/20 text-green-300 text-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.techStack.mobile && project.techStack.mobile.length > 0 && (
                            <div>
                                <div className="text-sm font-medium text-orange-300 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                    Mobile Technologies
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {project.techStack.mobile.map(t => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 rounded-lg bg-orange-500/5 border border-orange-500/20 text-orange-300 text-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.techStack.ai && project.techStack.ai.length > 0 && (
                            <div>
                                <div className="text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    AI & Machine Learning
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {project.techStack.ai.map(t => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/20 text-purple-300 text-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project.techStack.infrastructure && project.techStack.infrastructure.length > 0 && (
                            <div>
                                <div className="text-sm font-medium text-cyan-300 mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                                    Infrastructure & DevOps
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {project.techStack.infrastructure.map(t => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 text-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-3 flex-wrap">
                        {project.tech.map(t => (
                            <span
                                key={t}
                                className="px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-subtext"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </section>

            {/* === Challenges and Solutions === */}
            {project.challenges && project.challenges.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Challenges & Solutions</h3>
                    </div>
                    <div className="space-y-6">
                        {project.challenges.map((challenge, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-accent-solid)]/20 transition-colors"
                            >
                                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    {challenge.title}
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-xs font-medium text-red-300 mb-1">Challenge:</div>
                                        <p className="text-sm text-subtext leading-relaxed">{challenge.description}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-green-300 mb-1">Solution:</div>
                                        <p className="text-sm text-subtext leading-relaxed">{challenge.solution}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* === Results & Impact === */}
            {project.results && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)] bg-gradient-to-br from-[var(--color-accent-solid)]/5 to-transparent">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Results & Impact</h3>
                    </div>
                    <p className="text-subtext leading-relaxed">{project.results}</p>
                </section>
            )}

            {/* === Demo Video === */}
            {project.demo && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <h3 className="text-xl font-semibold mb-4">📹 Live Demo</h3>
                    <div className="aspect-video rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] bg-black/20">
                        <iframe
                            src={
                                project.demo.includes('loom.com/share')
                                    ? project.demo.replace('share', 'embed')
                                    : project.demo
                            }
                            title={`${project.title} Demo`}
                            allow="autoplay; fullscreen"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </section>
            )}

            {/* === CTA Buttons === */}
            <div className="flex flex-wrap gap-4">
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent-solid)] text-black font-medium hover:brightness-110 transition-all shadow-lg shadow-[var(--color-accent-solid)]/20 hover:shadow-[var(--color-accent-solid)]/40"
                    >
                        <ExternalLink className="w-4 h-4" /> View Live Project
                    </a>
                )}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] transition-all"
                    >
                        <Github className="w-4 h-4" /> View Source Code
                    </a>
                )}
                {project.apk && (
                    <a
                        href={project.apk}
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] transition-all"
                    >
                        <Download className="w-4 h-4" /> Download APK
                    </a>
                )}
            </div>
        </motion.div>
    )
}