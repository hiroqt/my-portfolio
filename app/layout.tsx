import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { SmoothMouseGlide } from '@/components/ui/SmoothMouseGlide'

export const viewport: Viewport = {
  themeColor: '#f8f7f4',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://arnelbaylon.dev'),
  title: 'Arnel Baylon — AI-Driven Software Developer & Agentic Systems',
  description:
    'Portfolio & Résumé of Arnel A. Baylon — AI-Driven Software Developer & Agentic Systems. Experience, projects, certifications, and skills.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/portfolio_icon.png?v=2', type: 'image/png' },
    ],
    apple: '/portfolio_icon.png?v=2',
  },
  openGraph: {
    title: 'Arnel Baylon — AI-Driven Software Developer & Agentic Systems',
    description:
      'AI-Driven Software Developer & Agentic Systems. Experience, projects, certifications, and skills.',
    type: 'profile',
    images: [
      {
        url: '/images/header.png?v=2',
        width: 1024,
        height: 1024,
        alt: 'Pixel-art portrait of Arnel Baylon',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Arnel Baylon — AI-Driven Software Developer & Agentic Systems',
    description:
      'AI-Driven Software Developer & Agentic Systems. Experience, projects, certifications, and skills.',
    images: ['/images/header.png?v=2'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />
      </head>
      <body className="overflow-x-hidden min-h-screen font-sans">
        <ThemeProvider>
          <SmoothScroll>
            <SmoothMouseGlide />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-accent focus:rounded-md font-mono text-sm shadow-lg"
            >
              Skip to main content
            </a>
            {children}
            <Analytics />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
