import { Fragment } from 'react'
import type { DiagramNode, DiagramNodeState, DiagramRow } from '@/lib/articles/types'

const nodeStyle: Record<DiagramNodeState, string> = {
  default: 'border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text)]',
  highlight: 'border-[var(--color-accent-solid)] bg-[var(--color-surface)] text-[var(--color-accent-solid)]',
  fail: 'border-dashed border-red-400/60 bg-red-500/5 text-red-400',
  muted: 'border-[var(--color-border)] bg-transparent text-subtext opacity-60',
}

function Node({ node }: { node: DiagramNode }) {
  return (
    <div className={`rounded-lg border px-3 py-2 text-sm leading-tight ${nodeStyle[node.state ?? 'default']}`}>
      <div className="font-semibold">{node.label}</div>
      {node.sub && <div className="mt-0.5 text-xs opacity-75">{node.sub}</div>}
    </div>
  )
}

function Arrow({ via }: { via?: string }) {
  return (
    <div className="flex items-center justify-center gap-1 px-1 text-xs text-subtext md:flex-col md:gap-0" aria-hidden="true">
      {via && <span className="whitespace-nowrap">{via}</span>}
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </div>
  )
}

function Row({ row }: { row: DiagramRow }) {
  return (
    <div className="space-y-2">
      {row.label && (
        <div className="text-[0.7rem] font-semibold uppercase tracking-widest text-subtext">{row.label}</div>
      )}
      <div className="flex flex-col items-stretch gap-1 md:flex-row md:flex-wrap md:items-center">
        {row.nodes.map((node, i) => (
          <Fragment key={`${node.label}-${i}`}>
            {i > 0 && <Arrow via={node.via} />}
            <Node node={node} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default function FlowDiagram({
  title,
  caption,
  rows,
}: {
  title: string
  caption?: string
  rows: DiagramRow[]
}) {
  return (
    <figure className="glass my-8 p-5 md:p-6" aria-label={title}>
      <div className="mb-4 text-sm font-semibold text-heading">{title}</div>
      <div className="space-y-5">
        {rows.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </div>
      {caption && <figcaption className="mt-4 text-sm text-subtext">{caption}</figcaption>}
    </figure>
  )
}
