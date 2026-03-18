import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import ClientLayoutWrapper from '../components/ClientLayoutWrapper'

export const metadata = {
  title: 'M. Talha Atif Full Stack Developer',
  description:
    'Professional portfolio of M. Talha Atif, a Full Stack Developer specializing in backend development, AI apps, and modern full stack technologies',

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
