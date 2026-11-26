import type { Metadata } from 'next'
import { PageHeader } from '@/components/home/Headings'
import { StackList, stackToolCount } from '@/components/sections/StackList'
import styles from '@/components/PortfolioShell.module.css'

export const metadata: Metadata = {
  title: 'Languages & tools — Arnel Baylon',
  description: 'The languages, frameworks, and services I build with.',
  alternates: { canonical: '/stack' },
}

export default function Page() {
  return (
    <div className={styles.view}>
      <PageHeader title="Languages & tools" intro="The languages, frameworks, and services I build with." count={stackToolCount} />
      <StackList />
    </div>
  )
}
