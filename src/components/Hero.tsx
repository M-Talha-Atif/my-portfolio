'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Linkedin, Github, Code, Trophy, Cpu } from 'lucide-react'

export default function Hero() {
  const techStack = [
    'React',
    'NestJS',
    'ExpressJS',
    'Jetpack Compose',
    'FastAPI',
    'Postgres',
    'MongoDB',
    'Firebase',
    'AWS',
    'Docker',
  ]

  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-10">
      {/* === Left: Info Section === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          M. Talha Atif
        </h1>
        <p className="text-lg text-subtext mb-6">
          Full-Stack Developer specializing in EdTech and FinTech. I build secure, high-stakes platforms with a focus on real-time functionality and AI integration, 
          ensuring powerful performance and resilient backend systems.
        </p>

        {/* === Buttons === */}
        <div className="flex gap-4 justify-center md:justify-start mb-8">
          <a
            href="/personal/Talha-Atif.pdf"
            download
            className="px-6 py-3 text-black rounded-[12px] bg-[var(--color-accent-solid)] text-sm font-medium hover:brightness-110 transition"
          >
            Download My Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-[12px] border border-[rgba(255,255,255,0.1)] text-sm font-medium hover:bg-[rgba(255,255,255,0.05)] transition"
          >
            Contact Me
          </a>
        </div>

        {/* === Tech Stack Tags === */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-[10px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-subtext hover:border-[var(--color-accent-solid)] transition"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* === Location + Links === */}
        <div className="flex flex-wrap gap-5 justify-center md:justify-start text-subtext text-sm mt-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-accent-solid)]" />
            Lahore, Pakistan
          </div>

          <a
            href="https://leetcode.com/u/TalhaAtif/"
            target="_blank"
            className="flex items-center gap-2 hover:text-[var(--color-accent-solid)] transition"
          >
            <Code className="w-4 h-4" /> LeetCode
          </a>

          <a
            href="https://github.com/M-Talha-Atif"
            target="_blank"
            className="flex items-center gap-2 hover:text-[var(--color-accent-solid)] transition"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/muhammad-talha-atif/"
            target="_blank"
            className="flex items-center gap-2 hover:text-[var(--color-accent-solid)] transition"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </motion.div>

      {/* === Right: Profile Image + Stats === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 flex flex-col items-center"
      >
        <Image
          src="/personal/profileImage.png"
          alt="Profile"
          width={220}
          height={220}
          className="rounded-full border-4 border-[var(--color-accent-solid)] shadow-soft mb-6"
        />

        {/* === Cool Glass Cards for Achievements === */}
        <div className="flex gap-4 flex-wrap justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass rounded-2xl p-4 px-6 border border-[rgba(255,255,255,0.05)] shadow-lg text-center w-[180px]"
          >
            <Trophy className="w-6 h-6 text-[var(--color-accent-solid)] mx-auto mb-2" />
            <p className="text-xl font-semibold text-white">3</p>
            <p className="text-sm text-subtext">Hackathons Participated</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass rounded-2xl p-4 px-6 border border-[rgba(255,255,255,0.05)] shadow-lg text-center w-[180px]"
          >
            <Cpu className="w-6 h-6 text-[var(--color-accent-solid)] mx-auto mb-2" />
            <p className="text-xl font-semibold text-white">4</p>
            <p className="text-sm text-subtext">Competitive Programming Competitions</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
