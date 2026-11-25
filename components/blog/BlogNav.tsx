'use client'

import Link from 'next/link'
import { FiArrowLeft, FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '@/components/ThemeProvider'
import styles from './Blog.module.css'

interface BlogNavProps {
  backHref: string
  backLabel: string
  showHome?: boolean
}

export function BlogNav({ backHref, backLabel, showHome = false }: BlogNavProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  return (
    <nav className={styles.navigation} aria-label="Blog navigation">
      <Link href={backHref} className={styles.backLink}>
        <FiArrowLeft aria-hidden="true" />
        <span>{backLabel}</span>
      </Link>
      <div className={styles.navActions}>
        {showHome && <Link href="/" className={styles.homeLink}>Arnel Baylon</Link>}
        <button
          type="button"
          className={styles.themeButton}
          aria-label={`Switch to ${nextTheme} theme`}
          onClick={() => setTheme(nextTheme)}
        >
          {resolvedTheme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </div>
    </nav>
  )
}
