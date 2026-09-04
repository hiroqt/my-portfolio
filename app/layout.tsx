import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4, JetBrains_Mono, Caveat } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/ThemeProvider'

// ── High-Performance Self-Hosted Google Fonts via next/font (0 Render Blocking Requests) ──
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
  weight: ['600', '700'],
})

export const viewport: Viewport = {
  themeColor: '#08090e',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Arnel Baylon — Software Engineer & Agentic Developer',
  description:
    'Portfolio & Résumé of Arnel A. Baylon — Software Engineer & Agentic Developer. Experience, projects, certifications, and skills.',
  icons: {
    icon: '/portfolio_icon.png',
    apple: '/portfolio_icon.png',
  },
  openGraph: {
    title: 'Arnel Baylon — Software Engineer & Agentic Developer',
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
    <html
      lang="en"
      className={`dark ${inter.variable} ${mono.variable} ${sourceSerif.variable} ${caveat.variable}`}
    >
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
