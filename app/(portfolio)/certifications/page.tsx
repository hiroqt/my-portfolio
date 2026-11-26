import type { Metadata } from 'next'
import { PageHeader } from '@/components/home/Headings'
import { CertificationList, credentials } from '@/components/sections/CertificationList'
import styles from '@/components/PortfolioShell.module.css'

export const metadata: Metadata = {
  title: 'Certifications — Arnel Baylon',
  description: 'Certificates and courses, newest first.',
  alternates: { canonical: '/certifications' },
}

export default function Page() {
  return (
    <div className={styles.view}>
      <PageHeader title="Certifications" intro="Certificates and courses, newest first." count={credentials.length} />
      <CertificationList />
    </div>
  )
}
