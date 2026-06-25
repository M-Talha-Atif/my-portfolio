'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projectsMetadata } from '@/lib/projects/index'
import { ExternalLink, FileText } from 'lucide-react'
import Image from "next/image";

export default function ProjectsGrid() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-10">
        <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
        <p className="text-subtext text-lg max-w-2xl mx-auto">
          A collection of products and experiments I’ve designed and built blending performance,
          creativity, and modern engineering principles.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projectsMetadata.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative glass p-6 rounded-2xl border border-[rgba(255,255,255,0.05)] transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-solid)]/20"
          >
            {/* === Project Image === */}

            {/* === Project Image === */}
            <div className="h-44 mb-4 rounded-xl overflow-hidden bg-[rgba(255,255,255,0.02)] flex items-center justify-center relative group transition-all group-hover:scale-[1.03]">

              <Image
                src={p.hero}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={i === 0}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />

            </div>
            {/* === Project Info === */}
            <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-[var(--color-accent-solid)] transition-colors">
              {p.title}
            </h3>
            <p className="text-sm text-subtext mb-3">{p.short}</p>

            {/* === Tech Tags === */}
            <div className="flex flex-wrap gap-2 mt-auto mb-5">
              {p.tech.map(t => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] group-hover:border-[var(--color-accent-solid)]/40 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* === Buttons === */}
            <div className="flex justify-between gap-3">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--color-accent-solid)] text-black hover:brightness-110 transition"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              <Link
                href={`/projects/${p.slug}`}
                className="flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition text-subtext"
              >
                <FileText className="w-4 h-4" /> Case Study
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
