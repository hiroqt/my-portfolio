import type { Metadata } from 'next'
import { PageHeader } from '@/components/home/Headings'
import { ServiceList, services } from '@/components/sections/ServiceList'
import styles from '@/components/PortfolioShell.module.css'

export const metadata: Metadata = {
  title: 'Services — Arnel Baylon',
  description: 'Where I can help on your next product, from interface to AI.',
  alternates: { canonical: '/services' },
}

export default function Page() {
  return (
    <div className={styles.view}>
      <PageHeader title="What I can help with" intro="Where I can help on your next product, from interface to AI." count={services.length} />
      <ServiceList />
    </div>
  )
}
