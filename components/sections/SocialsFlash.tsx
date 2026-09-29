'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TechIcon } from '@/components/ui/TechIcon'
import styles from './SocialsFlash.module.css'

export interface SocialItem {
  id: string
  name: string
  handle: string
  url: string
  iconName: string
}

export const SOCIALS: SocialItem[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'arnel-baylon',
    url: 'https://www.linkedin.com/in/arnel-baylon-b05233189',
    iconName: 'linkedin',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@yheelllls',
    url: 'https://www.tiktok.com/@yheelllls',
    iconName: 'tiktok',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@yheellll',
    url: 'https://www.instagram.com/yheellll',
    iconName: 'instagram',
  },
  {
    id: 'x',
    name: 'X',
    handle: '@hiroqt',
    url: 'https://x.com/hiroqt',
    iconName: 'x',
  },
  {
    id: 'threads',
    name: 'Threads',
    handle: '@yheellll',
    url: 'https://www.threads.net/@yheellll',
    iconName: 'threads',
  },
]

const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 36 : -36,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -36 : 36,
    opacity: 0,
  }),
}

export function SocialsFlash() {
  const [[page, direction], setPage] = useState([0, 1])
  const [isPaused, setIsPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  const activeIndex = ((page % SOCIALS.length) + SOCIALS.length) % SOCIALS.length
  const activeSocial = SOCIALS[activeIndex]

  const paginate = (newDirection: number) => {
    setPage(([prev]) => [prev + newDirection, newDirection])
  }

  useEffect(() => {
    if (reduceMotion || isPaused) return

    const timer = setInterval(() => {
      paginate(1)
    }, 2800)

    return () => clearInterval(timer)
  }, [reduceMotion, isPaused])

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Social channels"
    >
      <div className={styles.header}>
        <span className={styles.label}>Socials</span>
        <span className={styles.flashIndicator} aria-hidden="true" />
      </div>

      <div className={styles.stage}>
        {reduceMotion ? (
          <a
            href={activeSocial.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialCard}
            aria-label={`${activeSocial.name} profile (${activeSocial.handle}), opens in new tab`}
          >
            <div className={styles.cardLeft}>
              <span className={styles.iconWrapper} aria-hidden="true">
                <TechIcon name={activeSocial.iconName} size={15} />
              </span>
              <div className={styles.cardText}>
                <span className={styles.socialName}>{activeSocial.name}</span>
                <span className={styles.socialHandle}>{activeSocial.handle}</span>
              </div>
            </div>
            <span className={styles.arrowMark} aria-hidden="true">↗</span>
          </a>
        ) : (
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.a
              key={page}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.45,
                ease: [0.77, 0, 0.175, 1], // ease-in-out curve
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x
                if (swipe < -100 || offset.x < -30) {
                  paginate(1)
                } else if (swipe > 100 || offset.x > 30) {
                  paginate(-1)
                }
              }}
              href={activeSocial.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
              aria-label={`${activeSocial.name} profile (${activeSocial.handle}), opens in new tab`}
            >
              <div className={styles.cardLeft}>
                <span className={styles.iconWrapper} aria-hidden="true">
                  <TechIcon name={activeSocial.iconName} size={15} />
                </span>
                <div className={styles.cardText}>
                  <span className={styles.socialName}>{activeSocial.name}</span>
                  <span className={styles.socialHandle}>{activeSocial.handle}</span>
                </div>
              </div>
              <span className={styles.arrowMark} aria-hidden="true">↗</span>
            </motion.a>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default SocialsFlash
