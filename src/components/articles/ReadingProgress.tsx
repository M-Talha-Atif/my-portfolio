'use client'

import { useEffect, useState } from 'react'

const SIZE = 56
const STROKE = 4
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Circular reading-progress indicator. Shows how much of the article body has been read,
 * from 0% (top of the body) to 100% (the end of the body reaches the bottom of the screen).
 * Appears after the reader starts scrolling; tapping it scrolls back to the top.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [percent, setPercent] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(targetId)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const raw = scrollable > 0 ? -rect.top / scrollable : rect.top < 0 ? 1 : 0
      const clamped = Math.min(1, Math.max(0, raw))
      setPercent(Math.round(clamped * 100))
      setVisible(rect.top < window.innerHeight * 0.6)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [targetId])

  const done = percent >= 100
  const offset = CIRCUMFERENCE * (1 - percent / 100)

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={done ? 'Finished reading. Back to top' : `${percent}% read. Back to top`}
      className={`fixed bottom-4 right-4 z-40 grid place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-nav-bg-solid)] shadow-lg backdrop-blur transition-all duration-300 hover:border-[var(--color-accent-solid)] motion-reduce:transition-none sm:bottom-6 sm:right-6 print:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{ width: SIZE, height: SIZE }}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--color-border-strong)" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent-solid)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-150 motion-reduce:transition-none"
        />
      </svg>
      <span aria-hidden="true" className="relative text-[0.7rem] font-semibold tabular-nums text-heading">
        {done ? '✓' : `${percent}%`}
      </span>
    </button>
  )
}
