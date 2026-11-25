'use client'

import { useEffect, useState } from 'react'
import styles from './Blog.module.css'

export interface TocItem {
  id: string
  label?: string
  title: string
}

/** Contents list that marks the section currently being read. */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const readingLine = window.innerHeight * 0.3
      let current = items[0]?.id
      for (const item of items) {
        const element = document.getElementById(item.id)
        if (element && element.getBoundingClientRect().top <= readingLine) current = item.id
      }
      setActiveId(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [items])

  return (
    <nav className={styles.toc} aria-label="Contents">
      <p className={styles.tocTitle}>Contents</p>
      <ol>
        {items.map(item => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={activeId === item.id ? 'location' : undefined}>
              {item.label && <span className={styles.tocLabel}>{item.label.replace('Chapter ', '')}</span>}
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
