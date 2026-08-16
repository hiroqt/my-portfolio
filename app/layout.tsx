import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Pacifico, Share_Tech } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { JARVISAssistant } from '@/components/ai/JARVISAssistant'

const comico = localFont({
  src: '../public/Fonts/WEB/fonts/Comico-Regular.woff2',
  variable: '--font-comico',
  display: 'swap',
})

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
})

const shareTech = Share_Tech({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sharetech',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arnel Baylon',
  description:
    'Résumé of Arnel A. Baylon: Context Engineer and full-stack engineer. BS Information Technology, Cavite State University. Experience, projects, certifications, and skills.',
  openGraph: {
    title: 'Arnel Baylon',
    description:
      'Context Engineer and full-stack engineer. Experience, projects, certifications, and skills.',
    type: 'profile',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${comico.variable} ${pacifico.variable} ${shareTech.variable}`}>
      <body className="overflow-x-hidden min-h-screen font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-accent focus:rounded-md font-mono text-sm shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <JARVISAssistant />
        <Analytics />
      </body>
    </html>
  )
}
