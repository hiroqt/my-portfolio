'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { ProjectVideo } from '@/lib/data/projects'
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed'
import styles from './List.module.css'

const OPEN_EVENT = 'project-demo:open'
/** Matches the panel's grid-template-rows transition, so the player unmounts after it has folded away. */
const COLLAPSE_MS = 420

/**
 * A "Watch demo" toggle under a project row that unfolds the YouTube player
 * beneath it. Only one demo plays at a time: opening one closes the others.
 */
export function ProjectDemo({ video, projectTitle }: { video: ProjectVideo; projectTitle: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOtherOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== panelId) setOpen(false)
    }
    window.addEventListener(OPEN_EVENT, onOtherOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOtherOpen)
  }, [panelId])

  useEffect(() => {
    if (!open) {
      // Keep the player while the panel folds away, then drop it so the video stops.
      const timer = window.setTimeout(() => setMounted(false), COLLAPSE_MS)
      return () => window.clearTimeout(timer)
    }
    // Once unfolded, bring the player into view if it opened below the fold.
    const timer = window.setTimeout(() => {
      const panel = panelRef.current
      if (!panel || panel.getBoundingClientRect().bottom <= window.innerHeight) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      panel.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' })
    }, COLLAPSE_MS)
    return () => window.clearTimeout(timer)
  }, [open])

  const toggle = () => {
    if (open) {
      setOpen(false)
      return
    }
    setMounted(true)
    setOpen(true)
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: panelId }))
  }

  return (
    <div className={styles.demo}>
      <div className={styles.demoBar}>
        <button
          type="button"
          className={styles.demoToggle}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
        >
          <span className={styles.demoIcon} aria-hidden="true">
            {open ? (
              <svg viewBox="0 0 24 24" width="12" height="12">
                <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="12" height="12">
                <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" fill="currentColor" />
              </svg>
            )}
          </span>
          {open ? 'Hide demo' : 'Watch demo'}
          <span className={styles.visuallyHidden}> of {projectTitle}</span>
        </button>
      </div>
      <div id={panelId} ref={panelRef} className={styles.demoPanel} data-open={open || undefined}>
        <div className={styles.demoPanelInner}>
          {mounted && (
            <YouTubeEmbed
              id={video.youtubeId}
              title={video.title}
              autoplay
              sizes="(max-width: 640px) calc(100vw - 40px), 680px"
            />
          )}
        </div>
      </div>
    </div>
  )
}
