export type DiagramNodeState = 'default' | 'highlight' | 'fail' | 'muted'

export type DiagramNode = {
  label: string
  sub?: string
  state?: DiagramNodeState
  /** Text shown on the arrow that leads INTO this node (e.g. "gRPC", "Kafka"). */
  via?: string
}

export type DiagramRow = {
  label?: string
  nodes: DiagramNode[]
}

export type CalloutTone = 'decision' | 'tradeoff' | 'failure' | 'note'

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; lang: string; title?: string; code: string }
  | { type: 'callout'; tone: CalloutTone; title: string; text: string }
  | { type: 'jargon'; term: string; text: string }
  | { type: 'diagram'; title: string; caption?: string; rows: DiagramRow[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'metrics'; items: { label: string; before: string; after: string; note?: string }[] }

export type Article = {
  slug: string
  title: string
  /** One sentence that names the real tension (trade-off, failure mode or constraint). */
  description: string
  category: string
  tags: string[]
  /** ISO date, YYYY-MM-DD */
  date: string
  /** Where the story comes from, shown under the title. */
  source: string
  /** Optional cover in /public (1200x630 or larger, 1.91:1). Falls back to a generated share image. */
  cover?: string
  /** Two short lines for the generated share image: line 1 white, line 2 accent green. */
  ogLines: [string, string]
  featured?: boolean
  blocks: Block[]
}

export type ArticleMeta = Omit<Article, 'blocks'> & { readingMinutes: number }

export type ExternalPost = {
  title: string
  link: string
  date: string
  platform: string
}
