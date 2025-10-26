'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../../../lib/projects'
import { use } from 'react'
import VisualCarousel from '@/components/VisualCarousel'
import { Monitor, Smartphone, ExternalLink, Github, Download } from 'lucide-react'
import Link from "next/link"

interface Props {
    params: { slug: string }
}

export default function ProjectPage({ params }: Props) {
    const { slug } = use(params) //  unwrap using React.use()
    const project = projects.find(p => p.slug === slug)

    const [view, setView] = useState<'web' | 'mobile'>('web')

    if (!project) return <div className="p-8">Project not found</div>

    const hasBoth = project.platforms?.includes('web') && project.platforms?.includes('mobile')

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-6 pt-24 pb-24"
        >
            {/* === Header === */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] hover:border-[var(--color-accent-solid)] transition-all mb-6 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span>Back to Home</span>
            </Link>

            <header className="mb-10">
                <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
                <p className="text-subtext text-lg">{project.short}</p>
            </header>

            {/* === Overview === */}
            <section className="glass p-8 rounded-2xl mb-10">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-subtext leading-relaxed">{project.overview}</p>
            </section>

            {/* === Problem / Solution === */}
            <section className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="glass p-8 rounded-2xl">
                    <h3 className="text-xl font-semibold mb-3">Problem</h3>
                    <p className="text-subtext">{project.problem}</p>
                </div>
                <div className="glass p-8 rounded-2xl">
                    <h3 className="text-xl font-semibold mb-3">Solution</h3>
                    <p className="text-subtext">{project.solution}</p>
                </div>
            </section>

            {/* === Platform Switcher === */}
            {hasBoth && (
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setView('web')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${view === 'web'
                            ? 'bg-[var(--color-accent-solid)] text-black font-medium'
                            : 'border-[rgba(255,255,255,0.1)] text-subtext'
                            } transition`}
                    >
                        <Monitor className="w-4 h-4" /> Web
                    </button>
                    <button
                        onClick={() => setView('mobile')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${view === 'mobile'
                            ? 'bg-[var(--color-accent-solid)] text-black font-medium'
                            : 'border-[rgba(255,255,255,0.1)] text-subtext'
                            } transition`}
                    >
                        <Smartphone className="w-4 h-4" /> Mobile
                    </button>
                </div>
            )}

            {/* === Visual Designs === */}
            <section className="glass p-8 rounded-2xl mb-10">
                <h3 className="text-xl font-semibold mb-4">
                    Visual Designs ({view === 'mobile' ? 'Mobile' : 'Web'})
                </h3>
                <VisualCarousel images={view === 'mobile' ? project.mobileDesigns : project.webDesigns} />

                {view === 'mobile' && project.apk && (
                    <div className="mt-6 flex items-center gap-3 text-subtext">
                        <Download className="w-4 h-4" />
                        <a
                            href={project.apk}
                            target="_blank"
                            className="text-[var(--color-accent-solid)] hover:underline"
                        >
                            Download APK ({project.apkSize || '—'} MB)
                        </a>
                    </div>
                )}
            </section>



            {/* === Features === */}
            <section className="glass p-8 rounded-2xl mb-10">
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="list-disc ml-5 text-subtext space-y-2">
                    {project.features.map(f => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </section>

            {/* === Diagrams === */}
            {project.diagrams?.length > 0 && (
                <section className="glass p-8 rounded-2xl mb-10">
                    <h3 className="text-xl font-semibold mb-4">System Diagrams</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {project.diagrams.map((d: string, i: number) => (
                            <motion.img
                                key={i}
                                src={d}
                                alt={`Diagram ${i + 1}`}
                                className="rounded-lg border border-[rgba(255,255,255,0.05)]"
                                whileHover={{ scale: 1.02 }}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* === Result Section === */}
            {project.results && (
                <section className="glass p-8 rounded-2xl mb-10">
                    <h3 className="text-xl font-semibold mb-3">Results & Impact</h3>
                    <p className="text-subtext">{project.results}</p>
                </section>
            )}

            {/* === Demo Video === */}
            {/* === Demo Video === */}
            {project.demo && (
                <section className="glass p-8 rounded-2xl mb-10">
                    <h3 className="text-xl font-semibold mb-4">Demo Video</h3>
                    <div className="aspect-video rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)]">
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


            {/* === Tech Stack === */}
            <section className="glass p-8 rounded-2xl mb-10">
                <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
                <div className="flex gap-3 flex-wrap">
                    {project.tech.map(t => (
                        <span
                            key={t}
                            className="px-3 py-1 rounded-[10px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-subtext"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            {/* === CTA Buttons === */}
            <div className="flex flex-wrap gap-4">
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        className="flex items-center gap-2 px-5 py-3 rounded-[12px] bg-[var(--color-accent-solid)] text-black font-medium hover:brightness-110 transition"
                    >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                )}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        className="flex items-center gap-2 px-5 py-3 rounded-[12px] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition"
                    >
                        <Github className="w-4 h-4" /> GitHub
                    </a>
                )}
            </div>
        </motion.div>
    )
}
