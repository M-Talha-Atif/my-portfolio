import { Fragment } from 'react'
import Link from 'next/link'

/**
 * Renders `code` and **bold** inside plain strings. No HTML is ever injected:
 * everything is built from React nodes, so article data cannot smuggle markup.
 */
export default function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 font-mono text-[0.88em] text-[var(--color-accent-solid)]"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-heading">
              {part.slice(2, -2)}
            </strong>
          )
        }
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part)
        if (link) {
          const [, label, href] = link
          const linkClass = 'font-medium text-[var(--color-accent-solid)] underline underline-offset-4 hover:opacity-80'
          if (href.startsWith('/')) {
            return (
              <Link key={i} href={href} className={linkClass}>
                {label}
              </Link>
            )
          }
          if (/^https?:\/\//.test(href)) {
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {label}
              </a>
            )
          }
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
