import type { Article, ArticleMeta, Block, ExternalPost } from './types'
import { oauthIsNotLogin } from './oauth-is-not-login'
import { why100PercentCpu } from './why-100-percent-cpu'
import { redisSingleThreaded } from './redis-single-threaded'
import { silentDesignDecisionsMobileUx } from './silent-design-decisions-mobile-ux'
import { localhostTalkingToYourself } from './localhost-talking-to-yourself'

export type { Article, ArticleMeta, Block, ExternalPost } from './types'

const WORDS_PER_MINUTE = 220

function blockText(block: Block): string {
  switch (block.type) {
    case 'h2':
    case 'h3':
    case 'p':
      return block.text
    case 'ul':
    case 'ol':
      return block.items.join(' ')
    case 'callout':
      return `${block.title} ${block.text}`
    case 'jargon':
      return `${block.term} ${block.text}`
    case 'table':
      return [...block.head, ...block.rows.flat()].join(' ')
    case 'metrics':
      return block.items.map((m) => `${m.label} ${m.before} ${m.after} ${m.note ?? ''}`).join(' ')
    case 'diagram':
      return block.rows.flatMap((r) => r.nodes.map((n) => `${n.label} ${n.sub ?? ''}`)).join(' ')
    case 'code':
      return '' // code is skimmed, not read word by word
  }
}

export function readingMinutes(article: Article): number {
  const words = article.blocks.map(blockText).join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// Newest first. Add new articles to this list.
export const articles: Article[] = [
  oauthIsNotLogin,
  why100PercentCpu,
  redisSingleThreaded,
  silentDesignDecisionsMobileUx,
  localhostTalkingToYourself,
].sort((a, b) => b.date.localeCompare(a.date))

export const articlesMetadata: ArticleMeta[] = articles.map((article) => {
  const { blocks, ...meta } = article
  void blocks
  return { ...meta, readingMinutes: readingMinutes(article) }
})

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticleMeta(slug: string): ArticleMeta | undefined {
  return articlesMetadata.find((a) => a.slug === slug)
}

export const featuredArticles: ArticleMeta[] = articlesMetadata.filter((a) => a.featured)

export function relatedArticles(slug: string, limit = 2): ArticleMeta[] {
  const current = getArticleMeta(slug)
  if (!current) return []
  return articlesMetadata
    .filter((a) => a.slug !== slug)
    .map((a) => ({ a, score: a.tags.filter((t) => current.tags.includes(t)).length + (a.category === current.category ? 1 : 0) }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a)
}

export function adjacentArticles(slug: string): { newer?: ArticleMeta; older?: ArticleMeta } {
  const i = articlesMetadata.findIndex((a) => a.slug === slug)
  if (i === -1) return {}
  return { newer: articlesMetadata[i - 1], older: articlesMetadata[i + 1] }
}

// Pieces published on other platforms. Listed on /writing, not rendered locally.
export const externalPosts: ExternalPost[] = []
