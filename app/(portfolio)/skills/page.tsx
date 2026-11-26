import type { Metadata } from 'next'
import { PageHeader } from '@/components/home/Headings'
import { SkillList, skills } from '@/components/sections/SkillList'
import styles from '@/components/PortfolioShell.module.css'

export const metadata: Metadata = {
  title: 'Skills I build — Arnel Baylon',
  description: 'Open-source agent skills I build and share on GitHub.',
  alternates: { canonical: '/skills' },
}

export default function Page() {
  return (
    <div className={styles.view}>
      <PageHeader title="Skills I build" intro="Open-source agent skills I build and share on GitHub." count={skills.length} />
      <SkillList />
    </div>
  )
}
