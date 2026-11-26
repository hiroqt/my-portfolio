import type { Metadata } from 'next'
import { ContactBlock } from '@/components/home/ContactBlock'

export const metadata: Metadata = {
  title: 'Contact — Arnel Baylon',
  description: 'A product to launch, a workflow to simplify, or an AI idea to explore? Tell Arnel what you’re working on.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <ContactBlock />
}
