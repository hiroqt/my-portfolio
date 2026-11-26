import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import styles from '../PortfolioShell.module.css'

export function Stats({ projectCount }: { projectCount: number }) {
  const stats = [
    { value: '2×', label: 'Hackathon wins', href: '#recognition' },
    { value: String(projectCount), label: 'Projects built', href: '/projects' },
    { value: '2×', label: 'Oracle certified', href: '/certifications' },
  ]

  return (
    <ul className={styles.stats} aria-label="At a glance">
      {stats.map(stat => (
        <li key={stat.label}>
          <Link className={styles.stat} href={stat.href}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <FiArrowUpRight className={styles.statArrow} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
