import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const clashDisplay = localFont({
  src: [
    { path: '../public/fonts/clash-display/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/clash-display/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-clash',
  display: 'swap',
})

const comico = localFont({
  src: '../public/Fonts/WEB/fonts/Comico-Regular.woff2',
  variable: '--font-comico',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arnel A. Baylon — Résumé',
  description:
    'Résumé of Arnel A. Baylon: Generative AI developer and full-stack engineer. BS Information Technology, Cavite State University. Experience, projects, certifications, and skills.',
  openGraph: {
    title: 'Arnel A. Baylon — Résumé',
    description:
      'Generative AI developer and full-stack engineer. Experience, projects, certifications, and skills.',
    type: 'profile',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${clashDisplay.variable} ${comico.variable}`}>
      <body className="overflow-x-hidden min-h-screen font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
