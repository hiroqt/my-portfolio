import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import './chat-widget.css'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/ui/ChatWidget'

const sora = Sora({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora'
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
    <html lang="en" className={`dark ${sora.variable}`}>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container min-h-screen">
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
