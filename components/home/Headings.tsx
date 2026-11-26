import type { ReactNode } from 'react'
import styles from '../PortfolioShell.module.css'

const pad = (value: number) => String(value).padStart(2, '0')

/** The count shown beside a section or page title, such as "06". */
export function Count({ value }: { value: number }) {
  return <span className={styles.sectionCount} aria-hidden="true">{pad(value)}</span>
}

/** A small section label on the Overview, with an optional count or link on the right. */
export function SectionHeading({ id, title, meta }: { id: string; title: string; meta?: ReactNode }) {
  return (
    <div className={styles.sectionHeading}>
      <h2 id={`${id}-title`}>{title}</h2>
      {meta}
    </div>
  )
}

/** The title block that opens each sidebar page. */
export function PageHeader({ title, intro, count }: { title: string; intro: string; count?: number }) {
  return (
    <header className={styles.pageHeader}>
      <div className={styles.pageTitleRow}>
        <h1>{title}</h1>
        {count !== undefined && <Count value={count} />}
      </div>
      <p className={styles.pageIntro}>{intro}</p>
    </header>
  )
}
