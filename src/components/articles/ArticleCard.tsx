import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ArticleMeta } from '@/lib/articles'
import { formatDate } from '@/lib/articles/format'

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group glass flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-[var(--color-accent-solid)]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-accent-solid)]">
          {article.category}
        </span>
        <ArrowUpRight className="h-4 w-4 text-subtext transition group-hover:text-[var(--color-accent-solid)]" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold leading-snug text-heading transition-colors group-hover:text-[var(--color-accent-solid)]">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-subtext">{article.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-subtext">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingMinutes} min read</span>
      </div>
    </Link>
  )
}
