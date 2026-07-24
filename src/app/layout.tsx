import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'

export const metadata: Metadata = {
  title: 'M. Talha Atif Full Stack Engineer | Backend Engineer | Distributed Systems | IGA',
  description: `I own product outcomes end to end, translating customer and business problems into reliable systems that deliver measurable value.
  I design for failure, continuously challenging assumptions through resilience testing, observability, and chaos engineering.`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
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
