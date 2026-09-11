'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Code, Github, Linkedin } from 'lucide-react'
import posthog from 'posthog-js'
import XLogo from '@/components/icons/XLogo'
import ThemeToggle from '@/components/ThemeToggle'

const socialLinks = [
  { name: 'LeetCode', href: 'https://leetcode.com/u/TalhaAtif/', Icon: Code },
  { name: 'GitHub', href: 'https://github.com/M-Talha-Atif', Icon: Github },
  { name: 'X', href: 'https://x.com/talhaAtif195901', Icon: XLogo },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-talha-atif/', Icon: Linkedin },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Open Source', href: '#opensource' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    // { name: 'Articles', href: '#articles' },
    { name: 'Contact', href: '#contact' },
  ]

  const resolveHref = (href: string) => (isHome ? href : `/${href}`)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--color-nav-bg)] border-b border-[var(--color-nav-border)]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-text">Talha Atif</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="flex gap-4 lg:gap-6">
            {navItems.map(item => (
              <a
                key={item.name}
                href={resolveHref(item.href)}
                onClick={() => posthog.capture('nav_section_navigated', { section: item.name.toLowerCase() })}
                className="text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] transition whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Social icons only once there's room to breathe (lg+) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-px h-5 bg-[var(--color-nav-border)]" />
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  data-tooltip={name}
                  onClick={() => posthog.capture('nav_social_link_clicked', { platform: name.toLowerCase() })}
                  className="tooltip text-subtext hover:text-[var(--color-accent-solid)] transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="tooltip p-2 rounded-lg bg-[var(--color-surface)] hover:brightness-110 transition border border-[var(--color-nav-border)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-tooltip={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-nav-bg-solid)] border-t border-[var(--color-nav-border)] backdrop-blur-lg">
          <div className="flex flex-col items-center py-4 space-y-4">
            {navItems.map(item => (
              <a
                key={item.name}
                href={resolveHref(item.href)}
                onClick={() => {
                  setMenuOpen(false)
                  posthog.capture('nav_section_navigated', { section: item.name.toLowerCase() })
                }}
                className="text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] transition"
              >
                {item.name}
              </a>
            ))}

            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  onClick={() => {
                    setMenuOpen(false)
                    posthog.capture('nav_social_link_clicked', { platform: name.toLowerCase() })
                  }}
                  className="text-subtext hover:text-[var(--color-accent-solid)] transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
