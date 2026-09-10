'use client'

import { useEffect, useState } from 'react'
import { Calendar, Loader2, X } from 'lucide-react'

interface CalendlyModalProps {
  open: boolean
  onClose: () => void
  url?: string
  heading?: string
  subtext?: string
}

export default function CalendlyModal({
  open,
  onClose,
  url = 'https://calendly.com/talhaatif573',
  heading = 'Schedule a time',
  subtext,
}: CalendlyModalProps) {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!open) {
      // Resetting visibility when the modal closes (rather than during render) is
      // intentional: it drives the exit transition before the modal unmounts.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false)
      return
    }
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    if (!open) {
      // Same as above: resets the iframe-loaded flag so the loader shows again next open.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoaded(false)
      return
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        className={`relative w-full max-w-2xl glass rounded-2xl border border-[var(--color-border)] shadow-soft overflow-hidden transition-all duration-200 ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.98]'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[var(--color-border)]">
          <div>
            <div className="text-sm font-medium text-heading flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--color-accent-solid)]" />
              {heading}
            </div>
            {subtext && <p className="text-xs text-subtext mt-1">{subtext}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close scheduler"
            data-tooltip="Close"
            autoFocus
            className="tooltip p-1.5 rounded-lg text-subtext hover:text-heading hover:bg-[var(--color-border)] transition-colors flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-solid)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative" style={{ height: 'min(650px, 75vh)' }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]">
              <Loader2 className="w-6 h-6 text-[var(--color-accent-solid)] animate-spin" />
            </div>
          )}
          <iframe
            src={url}
            title={heading}
            width="100%"
            height="100%"
            frameBorder="0"
            onLoad={() => setLoaded(true)}
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  )
}
