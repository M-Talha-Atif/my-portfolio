import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ArticleMeta } from '@/lib/articles'
import { formatDate } from '@/lib/articles/format'

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group glass flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-[var(--color-accent-solid)]"
    >
      {/* Header picture: the article's own cover when it has one, otherwise the branded generated header */}
      <div className="relative aspect-[1200/630] w-full overflow-hidden border-b border-[var(--color-border)] bg-[#0B0B0D]">
        <Image
          src={article.cover ?? `/writing/${article.slug}/og`}
          alt=""
          fill
          unoptimized={!article.cover}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
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
      </div>
    </Link>
  )
}
