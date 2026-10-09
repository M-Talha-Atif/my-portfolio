import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'
import { SITE_URL, SITE_NAME, SOCIAL_LINKS, DEFAULT_OG_IMAGE } from '@/lib/seo'

const TITLE = 'M. Talha Atif Full Stack Engineer | Backend Engineer | Distributed Systems | IGA'
const DESCRIPTION = `I own product outcomes end to end, translating customer and business problems into reliable systems that deliver measurable value.
  I design for failure, continuously challenging assumptions through resilience testing, observability, and chaos engineering.
  3+ years building distributed systems that scale and handle failure.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Talha Atif',
    'Full Stack Engineer',
    'Backend Engineer',
    'Software Engineer Portfolio',
    'Distributed Systems',
    'Identity Governance and Administration',
    'IGA',
    'Java Spring Boot Engineer',
    'Next.js Developer',
    'Kafka',
    'System Design',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: '/faviIcons/favicon.ico', sizes: 'any' },
      { url: '/faviIcons/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/faviIcons/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/faviIcons/apple-touch-icon.png',
  },

  manifest: '/faviIcons/site.webmanifest',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Full Stack Engineer',
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
  knowsAbout: [
    'Full Stack Development',
    'Backend Engineering',
    'Distributed Systems',
    'Identity Governance and Administration',
    'Java',
    'Spring Boot',
    'Next.js',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AnalyticsProvider>
          <ThemeProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </ThemeProvider>
        </AnalyticsProvider>
        <Analytics />
      </body>
    </html>
  )
}
