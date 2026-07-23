import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getOutreachPage } from '@/lib/outreach'
import OutreachTemplate from '@/components/outreach/OutreachTemplate'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getOutreachPage(slug)

  if (!page) {
    return { title: 'Not Found' }
  }

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    // Unlisted, not private: reachable by direct link, excluded from search indexing.
    robots: { index: false, follow: false },
  }
}

export default async function OutreachPage({ params }: Props) {
  const { slug } = await params
  const page = await getOutreachPage(slug)

  if (!page) {
    notFound()
  }

  return <OutreachTemplate data={page} />
}
