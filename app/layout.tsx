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

export const metadata: Metadata = {
  title: 'Arnel A. Baylon - Full-Stack Developer',
  description: 'Making daily operations easier for staff and administrators through high-performance full-stack architectures.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${clashDisplay.variable}`}>
      <body className="overflow-x-hidden min-h-screen font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
