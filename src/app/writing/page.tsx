import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { articlesForBrowser, externalPosts } from '@/lib/articles'
import WritingBrowser from '@/components/articles/WritingBrowser'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const TITLE = 'Writing | M. Talha Atif'
const DESCRIPTION =
  'Articles on backend engineering, authentication, performance and system internals, explained in plain English using problems I hit in production.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/writing`,
    types: { 'application/rss+xml': `${SITE_URL}/writing/feed.xml` },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/writing`,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function WritingIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-28">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-subtext transition hover:text-[var(--color-accent-solid)]">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Home
      </Link>

      <header className="mb-12 max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-heading md:text-5xl">Writing</h1>
        <p className="text-lg leading-8 text-subtext">
          Backend and systems engineering explained in plain English, using problems I hit in production.
        </p>
      </header>

      <WritingBrowser items={articlesForBrowser} />

      {externalPosts.length > 0 && (
        <section className="mt-16" aria-label="Also published elsewhere">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-subtext">Also published elsewhere</h2>
          <ul className="space-y-3">
            {externalPosts.map((post) => (
              <li key={post.link}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass flex items-center justify-between gap-4 p-4 transition hover:border-[var(--color-accent-solid)]"
                >
                  <span className="text-heading transition-colors group-hover:text-[var(--color-accent-solid)]">{post.title}</span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-subtext">
                    {post.platform}, {post.date} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  )
}
