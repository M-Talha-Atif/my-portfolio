'use client'
import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react' // using lucide-react icons

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Articles', href: '#articles' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(18,18,18,0.7)] border-b border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="font-bold text-lg">Talha Atif</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] transition"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(18,18,18,0.95)] border-t border-[rgba(255,255,255,0.05)] backdrop-blur-lg">
          <div className="flex flex-col items-center py-4 space-y-4">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-subtext hover:text-[var(--color-accent-solid)] transition"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
