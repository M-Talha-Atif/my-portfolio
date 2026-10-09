import type { Block, CalloutTone } from '@/lib/articles/types'
import Inline from './Inline'
import FlowDiagram from './FlowDiagram'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const calloutStyle: Record<CalloutTone, { border: string; label: string }> = {
  decision: { border: 'border-l-[var(--color-accent-solid)]', label: 'text-[var(--color-accent-solid)]' },
  tradeoff: { border: 'border-l-[var(--color-border-strong)]', label: 'text-subtext' },
  failure: { border: 'border-l-red-400/70', label: 'text-red-400' },
  note: { border: 'border-l-[var(--color-border-strong)]', label: 'text-subtext' },
}

function Callout({ tone, title, text }: { tone: CalloutTone; title: string; text: string }) {
  const s = calloutStyle[tone]
  return (
    <aside className={`glass my-6 border-l-4 ${s.border} p-4 md:p-5`}>
      <div className={`mb-1 text-[0.7rem] font-semibold uppercase tracking-widest ${s.label}`}>{title}</div>
      <p className="leading-7 text-text">
        <Inline text={text} />
      </p>
    </aside>
  )
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} id={slugify(block.text)} className="mb-4 mt-14 scroll-mt-24 text-2xl font-bold text-heading">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={i} className="mb-3 mt-8 text-lg font-semibold text-heading">
          {block.text}
        </h3>
      )
    case 'p':
      return (
        <p key={i} className="my-5 text-[1.05rem] leading-8 text-text">
          <Inline text={block.text} />
        </p>
      )
    case 'ul':
      return (
        <ul key={i} className="my-5 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-text marker:text-[var(--color-accent-solid)]">
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={i} className="my-5 list-decimal space-y-2 pl-6 text-[1.05rem] leading-8 text-text marker:text-[var(--color-accent-solid)]">
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      )
    case 'code':
      return (
        <figure key={i} className="my-6 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#111114]">
          <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[var(--color-subtext-on-dark)]">
            <span>{block.title ?? block.lang}</span>
            <span className="uppercase tracking-wider">{block.lang}</span>
          </figcaption>
          <pre className="overflow-x-auto p-4 font-mono text-[0.85rem] leading-6 text-[var(--color-text-on-dark)]">
            <code>{block.code}</code>
          </pre>
        </figure>
      )
    case 'callout':
      return <Callout key={i} tone={block.tone} title={block.title} text={block.text} />
    case 'jargon':
      return (
        <aside key={i} className="glass my-6 border-l-4 border-l-[var(--color-accent-solid)] p-4 md:p-5">
          <div className="mb-1 text-[0.75rem] font-semibold uppercase tracking-widest text-[var(--color-accent-solid)]">
            <span aria-hidden="true">🚨 </span>Jaggy jaggy alert: {block.term}
          </div>
          <p className="leading-7 text-text">
            <Inline text={block.text} />
          </p>
        </aside>
      )
    case 'diagram':
      return <FlowDiagram key={i} title={block.title} caption={block.caption} rows={block.rows} />
    case 'table':
      return (
        <div key={i} className="glass my-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-strong)]">
                {block.head.map((h) => (
                  <th key={h} className="px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-widest text-subtext">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-[var(--color-border)] last:border-0 align-top">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-4 py-3 leading-6 ${c === 0 ? 'font-semibold text-heading' : 'text-text'}`}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'metrics':
      return (
        <div key={i} className="my-6 grid gap-4 sm:grid-cols-2">
          {block.items.map((m) => (
            <div key={m.label} className="glass p-5">
              <div className="text-sm font-semibold text-heading">{m.label}</div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-sm text-subtext line-through decoration-[var(--color-border-strong)]">{m.before}</span>
                <span aria-hidden="true" className="text-subtext">→</span>
                <span className="text-lg font-bold text-[var(--color-accent-solid)]">{m.after}</span>
              </div>
              {m.note && <div className="mt-2 text-xs text-subtext">{m.note}</div>}
            </div>
          ))}
        </div>
      )
  }
}

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return <div>{blocks.map(renderBlock)}</div>
}
