import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './chat-widget.css'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/ui/ChatWidget'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Arnel A. Baylon | Resume Portfolio',
  description: 'Resume-style portfolio for full-stack web systems including HRIS, queuing, clearance, and EMR platforms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
