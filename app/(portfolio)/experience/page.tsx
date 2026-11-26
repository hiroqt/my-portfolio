import type { Metadata } from 'next'
import { PageHeader } from '@/components/home/Headings'
import { ExperienceList, experience } from '@/components/sections/ExperienceList'
import styles from '@/components/PortfolioShell.module.css'

export const metadata: Metadata = {
  title: 'Experience — Arnel Baylon',
  description: 'Where I’ve worked, what I built there, and where I studied.',
  alternates: { canonical: '/experience' },
}

export default function Page() {
  return (
    <div className={styles.view}>
      <PageHeader title="Experience" intro="Where I’ve worked, what I built there, and where I studied." count={experience.length} />
      <ExperienceList />
    </div>
  )
}
