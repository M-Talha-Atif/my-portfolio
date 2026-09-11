'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start at 'dark' so the first client render matches the server-rendered HTML exactly.
  // The real saved theme is applied after mount (see effect below), avoiding a hydration mismatch.
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Reading localStorage here (rather than in useState's initializer) is intentional:
    // it keeps the first client render identical to the server-rendered HTML, avoiding
    // a hydration mismatch. This one-time sync-after-mount is the documented exception
    // to the set-state-in-effect rule for persisted UI preferences.
    const saved = localStorage.getItem('theme') as Theme | null
    const initial = saved === 'light' || saved === 'dark' ? saved : 'dark'
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
