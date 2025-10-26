import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import ClientLayoutWrapper from '../components/ClientLayoutWrapper'

export const metadata = {
  title: 'Talha Atif — Full Stack Developer',
  description:
    'Professional portfolio of Talha, a Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies',
  openGraph: {
    title: 'Talha — Full Stack Developer',
    description: 'Portfolio of Talha Atif, MERN Stack Developer',
    url: 'https://yourdomain.com',
    images: [{ url: '/personal/profileImage.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talha — Full Stack Developer',
    images: ['/personal/profileImage.png'],
  },
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
