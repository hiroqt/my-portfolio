'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './Blog.module.css'

const formatter = new Intl.NumberFormat('en-US')

/** undefined while loading, null when counts are unavailable. */
type Views = number | null | undefined

function ViewsLabel({ views }: { views: Views }) {
  if (views === null) return null

  // Until the count arrives, an invisible placeholder holds the line steady.
  return (
    <span className={views === undefined ? styles.viewsPending : styles.views}>
      {views === undefined ? '0 views' : `${formatter.format(views)} ${views === 1 ? 'view' : 'views'}`}
    </span>
  )
}

/** On a post page: counts this visit and shows the post's total views. */
export function ViewCount({ slug }: { slug: string }) {
  const [views, setViews] = useState<Views>(undefined)
  const requested = useRef(false)

  useEffect(() => {
    if (requested.current) return
    requested.current = true

    fetch(`/api/blog/views/${encodeURIComponent(slug)}`, { method: 'POST', cache: 'no-store' })
      .then(response => (response.ok ? response.json() : { views: null }))
      .then((data: { views: number | null }) => setViews(typeof data.views === 'number' ? data.views : null))
      .catch(() => setViews(null))
  }, [slug])

  return <ViewsLabel views={views} />
}

const ViewCountsContext = createContext<Record<string, number> | null | undefined>(undefined)

/** On the blog index: loads every post's total once, without counting views. */
export function ViewCountsProvider({ children }: { children: ReactNode }) {
  const [counts, setCounts] = useState<Record<string, number> | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    fetch('/api/blog/views', { cache: 'no-store' })
      .then(response => (response.ok ? response.json() : { views: null }))
      .then((data: { views: Record<string, number> | null }) => {
        if (!cancelled) setCounts(data.views && typeof data.views === 'object' ? data.views : null)
      })
      .catch(() => {
        if (!cancelled) setCounts(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return <ViewCountsContext.Provider value={counts}>{children}</ViewCountsContext.Provider>
}

/** A post's total views inside a ViewCountsProvider. */
export function ListedViewCount({ slug }: { slug: string }) {
  const counts = useContext(ViewCountsContext)
  const views: Views = counts === undefined ? undefined : counts === null ? null : (counts[slug] ?? 0)
  return <ViewsLabel views={views} />
}
