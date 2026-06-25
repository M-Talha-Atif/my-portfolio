'use client'
import { useState, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { getProject } from '@/lib/projects/index'
import type { Project } from '@/lib/projects/types'
import { use } from 'react'
import {
    Monitor, Smartphone, ExternalLink, Github, Download,
    Award, TrendingUp, Zap, Target, CheckCircle2, Code2,
    Users, Server, AlertCircle, Network
} from 'lucide-react'
import Link from "next/link"

// Lazy load EVERYTHING heavy
const VisualCarousel = lazy(() => import('@/components/VisualCarousel'))
const MermaidDiagram = lazy(() => import('@/components/MermaidDiagram'))

interface Props {
    params: Promise<{ slug: string }>
}

type MediaTab = 'visuals' | 'demo'

function getDemoEmbedUrl(url: string): string {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname.replace('www.', '')

        if (hostname === 'loom.com' && parsedUrl.pathname.startsWith('/share/')) {
            const id = parsedUrl.pathname.split('/share/')[1]
            return `https://www.loom.com/embed/${id}`
        }

        if (hostname === 'youtu.be') {
            const id = parsedUrl.pathname.replace('/', '')
            return `https://www.youtube.com/embed/${id}`
        }

        if (hostname.endsWith('youtube.com')) {
            if (parsedUrl.pathname === '/watch') {
                const id = parsedUrl.searchParams.get('v')
                if (id) {
                    return `https://www.youtube.com/embed/${id}`
                }
            }

            if (parsedUrl.pathname.startsWith('/shorts/')) {
                const id = parsedUrl.pathname.split('/shorts/')[1]?.split('/')[0]
                if (id) {
                    return `https://www.youtube.com/embed/${id}`
                }
            }
        }

        return url
    } catch {
        return url
    }
}

// Lightweight skeleton
const SectionSkeleton = () => (
    <div className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)] animate-pulse">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
        <div className="h-4 bg-white/5 rounded w-full mb-2" />
        <div className="h-4 bg-white/5 rounded w-5/6" />
    </div>
)

export default function ProjectPage({ params }: Props) {
    const { slug } = use(params)
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState<'web' | 'mobile'>('web')
    const [mediaTab, setMediaTab] = useState<MediaTab>('visuals')

    // Load project data asynchronously
    useEffect(() => {
        let mounted = true

        async function loadProject() {
            const data = await getProject(slug)
            if (mounted && data) {
                setProject(data)
                setView(data.platforms?.includes('web') ? 'web' : 'mobile')
                setMediaTab('visuals')
            }
            setLoading(false)
        }

        loadProject()
        return () => { mounted = false }
    }, [slug])

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">
                <SectionSkeleton />
                <SectionSkeleton />
            </div>
        )
    }

    if (!project) {
        return (
            <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project not found</h1>
                    <Link href="/" className="text-[var(--color-accent-solid)] hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    const hasBoth = project.platforms?.includes('web') && project.platforms?.includes('mobile')
    const currentDesigns = view === 'mobile' ? project.mobileDesigns : project.webDesigns
    const hasDemo = Boolean(project.demo)
    const demoEmbedUrl = project.demo ? getDemoEmbedUrl(project.demo) : null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto px-6 pt-24 pb-24"
        >
            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)] transition-all mb-6 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>Back to Home</span>
            </Link>

            {/* Header */}
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
                <div className="mt-6 flex flex-wrap gap-3">
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent-solid)] text-black font-medium hover:brightness-110 transition">
                            <ExternalLink className="w-4 h-4" /> View Live
                        </a>
                    )}
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition">
                            <Github className="w-4 h-4" /> Source Code
                        </a>
                    )}
                    {project.apk && (
                        <a href={project.apk} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition">
                            <Download className="w-4 h-4" /> Download APK
                        </a>
                    )}
                </div>
            </header>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                    {project.metrics.map((metric, idx) => (
                        <div
                            key={idx}
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
                        </div>
                    ))}
                </section>
            )}

            {/* Overview */}
            <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-subtext leading-relaxed">{project.overview}</p>
            </section>

            {/* Problem / Solution */}
            <section className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="glass p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
                    <h3 className="text-xl font-semibold mb-3">Problem Statement</h3>
                    <p className="text-subtext relative z-10 leading-relaxed">{project.problem}</p>
                </div>
                <div className="glass p-8 rounded-2xl border border-[rgba(255,255,255,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />
                    <h3 className="text-xl font-semibold mb-3">Solution</h3>
                    <p className="text-subtext relative z-10 leading-relaxed">{project.solution}</p>
                </div>
            </section>

            {/* Project Goals */}
            {project.projectGoals && project.projectGoals.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Target className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Project Goals</h3>
                    </div>
                    <div className="space-y-3">
                        {project.projectGoals.map((goal, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                            >
                                <div className="w-6 h-6 rounded-full bg-[var(--color-accent-solid)]/10 border border-[var(--color-accent-solid)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[var(--color-accent-solid)] text-xs font-bold">{idx + 1}</span>
                                </div>
                                <p className="text-subtext text-sm leading-relaxed">{goal}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Technical Highlights */}
            {project.highlights && project.highlights.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Zap className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Technical Highlights</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {project.highlights.map((highlight, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:border-[var(--color-accent-solid)]/30 transition-colors"
                            >
                                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-solid)] flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-subtext leading-relaxed">{highlight}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Project Media - LAZY LOADED */}
            <Suspense fallback={<SectionSkeleton />}>
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            {mediaTab === 'demo'
                                ? <ExternalLink className="w-5 h-5 text-[var(--color-accent-solid)]" />
                                : view === 'mobile'
                                    ? <Smartphone className="w-5 h-5 text-[var(--color-accent-solid)]" />
                                    : <Monitor className="w-5 h-5 text-[var(--color-accent-solid)]" />}
                            {mediaTab === 'demo'
                                ? 'Live Demo'
                                : `Visual Designs - ${view === 'mobile' ? 'Mobile App' : 'Web Platform'}`}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {hasBoth && (
                                <>
                                    <button
                                        onClick={() => setView('web')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${view === 'web'
                                                ? 'bg-[var(--color-accent-solid)] text-black font-medium border-[var(--color-accent-solid)]'
                                                : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.2)]'
                                            }`}
                                    >
                                        <Monitor className="w-4 h-4" /> Web
                                    </button>
                                    <button
                                        onClick={() => setView('mobile')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${view === 'mobile'
                                                ? 'bg-[var(--color-accent-solid)] text-black font-medium border-[var(--color-accent-solid)]'
                                                : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.2)]'
                                            }`}
                                    >
                                        <Smartphone className="w-4 h-4" /> Mobile
                                    </button>
                                </>
                            )}

                            {hasDemo && (
                                <>
                                    <button
                                        onClick={() => setMediaTab('visuals')}
                                        className={`px-4 py-2 rounded-lg border transition-all ${mediaTab === 'visuals'
                                                ? 'bg-[var(--color-accent-solid)] text-black font-medium border-[var(--color-accent-solid)]'
                                                : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.2)]'
                                            }`}
                                    >
                                        Visuals
                                    </button>
                                    <button
                                        onClick={() => setMediaTab('demo')}
                                        className={`px-4 py-2 rounded-lg border transition-all ${mediaTab === 'demo'
                                                ? 'bg-[var(--color-accent-solid)] text-black font-medium border-[var(--color-accent-solid)]'
                                                : 'border-[rgba(255,255,255,0.1)] text-subtext hover:border-[rgba(255,255,255,0.2)]'
                                            }`}
                                    >
                                        Demo
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {mediaTab === 'demo' && demoEmbedUrl ? (
                        <div className="aspect-video rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] bg-black/20">
                            <iframe
                                src={demoEmbedUrl}
                                title={`${project.title} Demo`}
                                allow="autoplay; fullscreen; picture-in-picture"
                                className="w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    ) : currentDesigns && currentDesigns.length > 0 ? (
                        <VisualCarousel images={currentDesigns} />
                    ) : (
                        <p className="text-subtext text-sm">No designs available.</p>
                    )}

                    {mediaTab === 'visuals' && view === 'mobile' && project.apk && (
                        <div className="mt-6 p-4 rounded-lg bg-[var(--color-accent-solid)]/5 border border-[var(--color-accent-solid)]/20">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <Download className="w-5 h-5 text-[var(--color-accent-solid)]" />
                                    <div>
                                        <div className="font-medium text-white">Download Android APK</div>
                                        <div className="text-xs text-subtext">Version 1.0 • {project.apkSize || 'N/A'} MB</div>
                                    </div>
                                </div>

                                <a
                                    href={project.apk}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-lg bg-[var(--color-accent-solid)] text-black font-medium hover:brightness-110 transition"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    )}

                </section>
            </Suspense>

            {/* Features */}
            <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--color-accent-solid)]" />
                    Key Features
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-solid)] flex-shrink-0 mt-2" />
                            <span className="text-subtext text-sm leading-relaxed">{f}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contributions */}
            {project.individualContributions && project.individualContributions.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Users className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">My Contributions</h3>
                    </div>
                    <div className="space-y-3">
                        {project.individualContributions.map((c, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                <Code2 className="w-4 h-4 text-[var(--color-accent-solid)] flex-shrink-0 mt-1" />
                                <p className="text-sm text-subtext leading-relaxed">{c}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Architecture Table */}
            {project.architectureDetails && project.architectureDetails.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-5">
                        <Server className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">System Architecture</h3>
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
                                    <tr key={idx} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                                        <td className="py-3 px-4 text-white font-medium">{detail.layer}</td>
                                        <td className="py-3 px-4 text-blue-300">{detail.technology}</td>
                                        <td className="py-3 px-4 text-subtext">{detail.purpose}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Mermaid Diagrams - LAZY LOADED */}
            {project.mermaidDiagrams && project.mermaidDiagrams.length > 0 && (
                <Suspense fallback={<SectionSkeleton />}>
                    <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                        <div className="flex items-center gap-2 mb-6">
                            <Network className="w-5 h-5 text-[var(--color-accent-solid)]" />
                            <h3 className="text-xl font-semibold">Architecture Diagrams</h3>
                        </div>
                        <div className="space-y-8">
                            {project.mermaidDiagrams.map((diagram, idx) => (
                                <div key={idx} className="p-6 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]">
                                    <MermaidDiagram code={diagram.code} title={diagram.title} />
                                </div>
                            ))}
                        </div>
                    </section>
                </Suspense>
            )}

            {/* Tech Stack */}
            <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                <h3 className="text-xl font-semibold mb-5">Technology Stack</h3>
                {project.techStack ? (
                    <div className="space-y-5">
                        {Object.entries(project.techStack).map(([category, techs]) =>
                            techs && techs.length > 0 && (
                                <div key={category}>
                                    <div className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2 capitalize">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        {category}
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {techs.map(t => (
                                            <span key={t} className="px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/20 text-blue-300 text-sm">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div className="flex gap-3 flex-wrap">
                        {project.tech.map(t => (
                            <span key={t} className="px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-subtext">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </section>

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Challenges & Solutions</h3>
                    </div>
                    <div className="space-y-6">
                        {project.challenges.map((ch, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                <h4 className="text-lg font-semibold text-white mb-3">{ch.title}</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-xs font-medium text-red-300 mb-1">Challenge:</div>
                                        <p className="text-sm text-subtext leading-relaxed">{ch.description}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-green-300 mb-1">Solution:</div>
                                        <p className="text-sm text-subtext leading-relaxed">{ch.solution}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Results */}
            {project.results && (
                <section className="glass p-8 rounded-2xl mb-10 border border-[rgba(255,255,255,0.05)] bg-gradient-to-br from-[var(--color-accent-solid)]/5 to-transparent">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-[var(--color-accent-solid)]" />
                        <h3 className="text-xl font-semibold">Results & Impact</h3>
                    </div>
                    <p className="text-subtext leading-relaxed">{project.results}</p>
                </section>
            )}

        </motion.div>
    )
}