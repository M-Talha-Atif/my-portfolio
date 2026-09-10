'use client'
import { Sun, Moon } from 'lucide-react'
import posthog from 'posthog-js'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleToggle = () => {
    toggleTheme()
    posthog.capture('theme_toggled', { theme: isDark ? 'light' : 'dark' })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-tooltip={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="tooltip relative w-9 h-9 rounded-lg border border-[var(--color-nav-border)] bg-[var(--color-surface)] flex items-center justify-center overflow-hidden hover:border-[var(--color-accent-solid)]/50 transition-colors"
    >
      <Sun
        className={`absolute w-4 h-4 text-[var(--color-accent-solid)] transition-all duration-300 ${
          isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`absolute w-4 h-4 text-[var(--color-accent-solid)] transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
        }`}
      />
    </button>
  )
}
