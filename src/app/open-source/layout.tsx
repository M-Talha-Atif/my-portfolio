import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE } from '@/lib/seo'

const TITLE = 'Open Source Contributions | M. Talha Atif'
const DESCRIPTION =
  'Real, merged open source pull requests from M. Talha Atif across Tracer-Cloud/opensre and Apache Checkstyle, with the impact of each change explained.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/open-source',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/open-source',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
}

export default function OpenSourceLayout({ children }: { children: React.ReactNode }) {
  return children
}
