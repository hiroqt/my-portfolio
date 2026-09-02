import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/ThemeProvider'

const comico = localFont({
  src: '../public/Fonts/WEB/fonts/Comico-Regular.woff2',
  variable: '--font-comico',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arnel Baylon',
  description:
    'Portfolio & Résumé of Arnel A. Baylon — Software Engineer & Agentic Developer. Experience, projects, certifications, and skills.',
  openGraph: {
    title: 'Arnel Baylon',
    description:
      'Software Engineer and Agentic Developer. Experience, projects, certifications, and skills.',
    type: 'profile',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${comico.variable}`}>
      <body className="overflow-x-hidden min-h-screen font-sans">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-accent focus:rounded-md font-mono text-sm shadow-lg"
          >
            Skip to main content
          </a>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}


