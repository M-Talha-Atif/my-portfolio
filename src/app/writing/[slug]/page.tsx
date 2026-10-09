import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { articles, getArticle, getArticleMeta, relatedArticles, adjacentArticles } from '@/lib/articles'
import { formatDate } from '@/lib/articles/format'
import ArticleBody, { slugify } from '@/components/articles/ArticleBody'
import ArticleCard from '@/components/articles/ArticleCard'
import ReadingProgress from '@/components/articles/ReadingProgress'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME, SOCIAL_LINKS } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  const url = `${SITE_URL}/writing/${article.slug}`
  const image = article.cover
    ? { url: article.cover, width: article.coverWidth ?? 2400, height: article.coverHeight ?? 1260, alt: article.title }
    : { url: `/writing/${article.slug}/og`, width: 1200, height: 630, alt: article.title }

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.description,
    keywords: article.tags,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: [SITE_NAME],
      tags: article.tags,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description, images: [image.url] },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  const meta = getArticleMeta(slug)
  if (!article || !meta) notFound()

  const toc = article.blocks.filter((b) => b.type === 'h2').map((b) => ({ id: slugify(b.text), text: b.text }))
  const related = relatedArticles(slug, 2)
  const { newer, older } = adjacentArticles(slug)
  const url = `${SITE_URL}/writing/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    keywords: article.tags.join(', '),
    mainEntityOfPage: url,
    image: article.cover ? `${SITE_URL}${article.cover}` : `${SITE_URL}/writing/${article.slug}/og`,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL, sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin] },
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28">
      <script
        type="application/ld+json"
        // Static data we author ourselves; "<" is escaped so it cannot close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <Link href="/writing" className="mb-8 inline-flex items-center gap-2 text-sm text-subtext transition hover:text-[var(--color-accent-solid)]">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All writing
      </Link>

      <div className="lg:grid lg:grid-cols-[minmax(0,48rem)_14rem] lg:justify-between lg:gap-12">
        <article>
          <header>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-accent-solid)]">
              {article.category}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-heading md:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-8 text-subtext">{article.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtext">
              <span className="font-medium text-heading">Muhammad Talha Atif</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{meta.readingMinutes} min read</span>
            </div>

            <Image
              src={article.cover ?? `/writing/${article.slug}/og`}
              alt={article.title}
              width={article.cover ? (article.coverWidth ?? 1200) : 1200}
              height={article.cover ? (article.coverHeight ?? 630) : 630}
              priority
              unoptimized={!article.cover}
              sizes="(min-width: 1024px) 768px, 100vw"
              className={`mt-8 h-auto w-full rounded-2xl border border-[var(--color-border)] ${
                article.cover && (article.coverWidth ?? 1200) / (article.coverHeight ?? 630) < 1.3 ? 'mx-auto max-w-md' : ''
              }`}
            />

            <p className="glass mt-8 border-l-4 border-l-[var(--color-accent-solid)] p-4 text-sm leading-6 text-subtext">{article.source}</p>
          </header>

          <div id="article-body" className="mt-6">
            <ArticleBody blocks={article.blocks} />
          </div>
          <ReadingProgress targetId="article-body" />

          <footer className="mt-16 border-t border-[var(--color-border)] pt-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-subtext">
                  {tag}
                </span>
              ))}
            </div>

            <div className="glass mt-8 p-6">
              <p className="text-heading font-semibold">Working on something similar?</p>
              <p className="mt-2 text-sm leading-6 text-subtext">
                I am open to backend and full stack roles. If this problem looks familiar, I would be glad to talk about it.
              </p>
              <Link
                href="/#contact"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-solid)] px-5 py-2.5 text-sm font-semibold text-[var(--color-on-accent)] transition hover:opacity-90"
              >
                Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {(newer || older) && (
              <nav aria-label="More articles" className="mt-8 grid gap-4 sm:grid-cols-2">
                {newer ? (
                  <Link href={`/writing/${newer.slug}`} className="glass p-4 text-sm transition hover:border-[var(--color-accent-solid)]">
                    <span className="block text-xs uppercase tracking-widest text-subtext">Newer</span>
                    <span className="mt-1 block text-heading">{newer.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {older && (
                  <Link href={`/writing/${older.slug}`} className="glass p-4 text-sm transition hover:border-[var(--color-accent-solid)] sm:text-right">
                    <span className="block text-xs uppercase tracking-widest text-subtext">Older</span>
                    <span className="mt-1 block text-heading">{older.title}</span>
                  </Link>
                )}
              </nav>
            )}
          </footer>

          {related.length > 0 && (
            <section className="mt-16" aria-label="Related articles">
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-subtext">Related</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-subtext">On this page</p>
            <ul className="space-y-2 border-l border-[var(--color-border)] text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="-ml-px block border-l border-transparent pl-4 text-subtext transition hover:border-[var(--color-accent-solid)] hover:text-heading">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  )
}
