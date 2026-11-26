'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './YouTubeEmbed.module.css'

interface YouTubeEmbedProps {
  id: string
  title: string
  /** Matches the layout width so the poster is fetched at the right size. */
  sizes?: string
  /** Skip the poster and start the player at once, for when the user already asked to watch. */
  autoplay?: boolean
}

/**
 * Shows the video's thumbnail with a play button and loads YouTube's player
 * only when it is clicked. Until then the page makes no request to YouTube
 * (the thumbnail is proxied through the Next.js image optimizer), and the
 * player itself comes from youtube-nocookie.com.
 */
export function YouTubeEmbed({ id, title, sizes = '100vw', autoplay = false }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(autoplay)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const focusPlayer = useRef(false)

  // The play button unmounts on click; hand focus to the player so keyboard users keep their place.
  useEffect(() => {
    if (playing && focusPlayer.current) frameRef.current?.focus({ preventScroll: true })
  }, [playing])

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe
          ref={frameRef}
          className={styles.player}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.poster}
          onClick={() => {
            focusPlayer.current = true
            setPlaying(true)
          }}
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            fill
            sizes={sizes}
            className={styles.thumbnail}
          />
          <span className={styles.play} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.visuallyHidden}>Play video: {title}</span>
        </button>
      )}
    </div>
  )
}
