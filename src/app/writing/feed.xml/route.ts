import { articlesMetadata } from '@/lib/articles'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

export const dynamic = 'force-static'

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export function GET() {
  const items = articlesMetadata
    .map((a) => {
      const link = `${SITE_URL}/writing/${a.slug}`
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(a.description)}</description>
${a.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`Writing | ${SITE_NAME}`)}</title>
    <link>${SITE_URL}/writing</link>
    <atom:link href="${SITE_URL}/writing/feed.xml" rel="self" type="application/rss+xml" />
    <description>Engineering notes on distributed systems, event-driven architecture, concurrency and reliability.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
