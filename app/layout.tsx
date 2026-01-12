import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CinematicBackground } from '@/components/layout/CinematicBackground'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Arnel A. Baylon | Full-Stack Developer & AI Specialist',
  description: 'Architecting Scalable Systems & AI-Driven Solutions. Full-Stack Developer specializing in PHP Laravel and Next.js with proven AI automation expertise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen relative">
        <CinematicBackground />
        <main className="relative z-10">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}