import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Pacifico, Share_Tech } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

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
    'Résumé of Arnel A. Baylon: Generative AI developer and full-stack engineer. BS Information Technology, Cavite State University. Experience, projects, certifications, and skills.',
  openGraph: {
    title: 'Arnel Baylon',
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
    <html lang="en" className={`dark ${comico.variable} ${pacifico.variable} ${shareTech.variable}`}>
      <body className="overflow-x-hidden min-h-screen font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
