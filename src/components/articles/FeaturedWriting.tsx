import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredArticles, articlesMetadata } from '@/lib/articles'
import ArticleCard from './ArticleCard'

export default function FeaturedWriting() {
  const items = featuredArticles.length > 0 ? featuredArticles : articlesMetadata.slice(0, 3)
  if (items.length === 0) return null

  return (
    <section id="writing" className="py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="mb-4 text-4xl font-bold text-heading">Writing</h2>
        <p className="text-lg text-subtext">
          Engineering notes from systems I have built and operated. Each one follows the same order: the problem, the
          constraints, the options, the trade-off, the decision, and what I would change today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-5 py-2.5 text-sm font-medium text-heading transition hover:border-[var(--color-accent-solid)] hover:text-[var(--color-accent-solid)]"
        >
          All articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
