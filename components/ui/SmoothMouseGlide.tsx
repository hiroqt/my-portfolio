'use client'

import { useEffect, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import styles from './SmoothMouseGlide.module.css'

export function SmoothMouseGlide() {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Raw mouse coordinates
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Fluid spring configuration for the gliding aura
  const ringX = useSpring(cursorX, { stiffness: 220, damping: 24, mass: 0.35 })
  const ringY = useSpring(cursorY, { stiffness: 220, damping: 24, mass: 0.35 })

  // Snappy spring for the precision lead dot
  const dotX = useSpring(cursorX, { stiffness: 850, damping: 42, mass: 0.08 })
  const dotY = useSpring(cursorY, { stiffness: 850, damping: 42, mass: 0.08 })

  // Reactive scale spring for interactive feedback
  const ringScale = useSpring(1, { stiffness: 350, damping: 25 })

  // Hardware-accelerated 3D transform strings
  const ringTransform = useMotionTemplate`translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`
  const dotTransform = useMotionTemplate`translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsFinePointer(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (!mounted || !isFinePointer || reduceMotion) return

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      const interactive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select, summary, [data-interactive]')
      )
      setIsHovered(interactive)
    }

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleBlur = () => setIsVisible(false)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('blur', handleBlur)
    }
  }, [mounted, isFinePointer, isVisible, reduceMotion, cursorX, cursorY])

  useEffect(() => {
    if (isPressed) {
      ringScale.set(0.78)
    } else if (isHovered) {
      ringScale.set(1.45)
    } else {
      ringScale.set(1)
    }
  }, [isHovered, isPressed, ringScale])

  if (!mounted || !isFinePointer || reduceMotion) {
    return null
  }

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {/* Gliding outer halo */}
      <motion.div
        className={styles.glideWrapper}
        style={{
          transform: ringTransform,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 220ms ease-out',
        }}
      >
        <div
          className={`${styles.glideRing} ${isHovered ? styles.glideRingHovered : ''}`}
        />
      </motion.div>

      {/* Nimble lead micro-dot */}
      <motion.div
        className={styles.glideDotWrapper}
        style={{
          transform: dotTransform,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 180ms ease-out',
        }}
      >
        <div
          className={`${styles.glideDot} ${isHovered ? styles.glideDotHovered : ''}`}
        />
      </motion.div>
    </div>
  )
}
