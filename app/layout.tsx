import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

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
    <html lang="en" className="dark">
      <body className="bg-terminal-bg text-terminal-fg font-mono overflow-x-hidden selection:bg-terminal-fg selection:text-terminal-bg min-h-screen" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
