import { Fragment } from 'react'

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Wraps every occurrence of the search words in <mark>. Built from React nodes only, never raw HTML. */
export default function Highlight({ text, tokens }: { text: string; tokens?: string[] }) {
  const words = (tokens ?? []).filter(Boolean)
  if (words.length === 0) return <>{text}</>
  const pattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi')
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-[var(--color-accent-solid)]/25 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
