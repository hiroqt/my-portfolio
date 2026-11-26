import type { Metadata } from 'next'
import { PageHeader } from '@/components/home/Headings'
import { ProjectList } from '@/components/sections/ProjectList'
import { projectRows } from '@/lib/portfolio/projectRows'
import styles from '@/components/PortfolioShell.module.css'

export const metadata: Metadata = {
  title: 'Projects — Arnel Baylon',
  description: 'Products and tools I’ve designed and built, from civic tech to AI.',
  alternates: { canonical: '/projects' },
}

export default function Page() {
  return (
    <div className={styles.view}>
      <PageHeader title="Projects" intro="Products and tools I’ve designed and built, from civic tech to AI." count={projectRows.length} />
      <ProjectList projects={projectRows} visible={projectRows.length} />
    </div>
  )
}
