'use client'
import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin } from 'lucide-react'
import { useState } from 'react'
import posthog from 'posthog-js'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                posthog.capture('contact_form_submitted', {
                    message_length: form.message.length,
                })
                setStatus('sent')
                setForm({ name: '', email: '', message: '' })
                setTimeout(() => setStatus('idle'), 4000)
            } else {
                posthog.capture('contact_form_failed')
                setStatus('error')
            }
        } catch {
            posthog.capture('contact_form_failed')
            setStatus('error')
        }
    }

    return (
        <motion.section
            id="contact"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-12 md:py-16 relative overflow-hidden"
        >
            {/* subtle gradient orb background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-full opacity-60" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl mx-auto mb-8 md:mb-12"
            >
                <h2 className="text-4xl font-bold mb-4">
                    Let’s <span className="text-[var(--color-accent-solid)]">Connect</span>
                </h2>
                <p className="text-subtext text-lg leading-relaxed">
                    My expertise in <span className="text-white font-medium">backend, frontend, mobile,</span> and{' '}
                    <span className="text-white font-medium">cloud</span> development is ready to tackle your next big challenge.
                    I&apos;m interested in collaborating with innovative teams on complex problems and am available for remote or onsite work in Lahore.
                </p>

            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
                {/* === Contact Form === */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    suppressHydrationWarning
                    data-lpignore="true"
                    className="glass p-8 rounded-2xl flex flex-col gap-4 shadow-soft"
                >
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        data-lpignore="true"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-transparent border border-[rgba(255,255,255,0.08)] focus:border-[var(--color-accent-solid)] outline-none transition"
                    />
                    <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        data-lpignore="true"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-transparent border border-[rgba(255,255,255,0.08)] focus:border-[var(--color-accent-solid)] outline-none transition"
                    />
                    <textarea
                        name="message"
                        autoComplete="off"
                        data-lpignore="true"
                        placeholder="Your Message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-transparent border border-[rgba(255,255,255,0.08)] focus:border-[var(--color-accent-solid)] outline-none transition resize-none"
                    />

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="mt-2 px-6 py-3 text-black rounded-xl bg-[var(--color-accent-solid)] text-sm font-medium hover:brightness-110 transition disabled:opacity-60"
                    >
                        {status === 'loading' ? 'Sending...' : 'Get in Touch'}
                    </button>

                    {/* Subtle feedback */}
                    {status === 'sent' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-400 text-sm mt-2"
                        >
                            Message sent successfully!
                        </motion.p>
                    )}
                    {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-2"
                        >
                            Something went wrong. Please try again.
                        </motion.p>
                    )}
                </motion.form>

                {/* === Contact Info === */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="p-8 rounded-2xl glass shadow-soft relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent blur-2xl rounded-full -z-10" />

                    <h3 className="text-2xl font-semibold mb-8 text-white">Contact Info</h3>

                    <ul className="space-y-5 text-subtext">
                        <li className="flex items-center gap-4 group">
                            <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.05)] group-hover:bg-[var(--color-accent-solid)]/20 transition">
                                <Mail className="w-5 h-5 text-[var(--color-accent-solid)]" />
                            </div>
                            <a
                                href="mailto:talhaatif573@gmail.com"
                                onClick={() => posthog.capture('contact_link_clicked', { type: 'email' })}
                                className="hover:text-white transition text-base"
                            >
                                talhaatif573@gmail.com
                            </a>
                        </li>

                        <li className="flex items-center gap-4 group">
                            <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.05)] group-hover:bg-[var(--color-accent-solid)]/20 transition">
                                <Phone className="w-5 h-5 text-[var(--color-accent-solid)]" />
                            </div>
                            <span className="text-base">+92 306 4391520</span>
                        </li>

                        <li className="flex items-center gap-4 group">
                            <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.05)] group-hover:bg-[var(--color-accent-solid)]/20 transition">
                                <Github className="w-5 h-5 text-[var(--color-accent-solid)]" />
                            </div>
                            <a
                                href="https://github.com/M-Talha-Atif"
                                target="_blank"
                                onClick={() => posthog.capture('contact_link_clicked', { type: 'github' })}
                                className="hover:text-white transition text-base"
                            >
                                github.com/M-Talha-Atif
                            </a>
                        </li>

                        <li className="flex items-center gap-4 group">
                            <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.05)] group-hover:bg-[var(--color-accent-solid)]/20 transition">
                                <Linkedin className="w-5 h-5 text-[var(--color-accent-solid)]" />
                            </div>
                            <a
                                href="https://www.linkedin.com/in/muhammad-talha-atif/"
                                target="_blank"
                                onClick={() => posthog.capture('contact_link_clicked', { type: 'linkedin' })}
                                className="hover:text-white transition text-base"
                            >
                                linkedin.com/in/muhammad-talha-atif
                            </a>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </motion.section>
    )
}
