'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from '../ThemeProvider'

interface DotWaveBackgroundProps {
  className?: string
  opacity?: number
}

export function DotWaveBackground({ className = '', opacity = 1 }: DotWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { resolvedTheme } = useTheme()
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let startTimeoutId: NodeJS.Timeout
    let width = 0
    let height = 0
    let time = 0
    let lastFrameTime = 0
    let isVisible = true

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isReducedMotion = mediaQuery.matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handleMotionChange)

    // Visibility observer to pause animation when tab is inactive
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Adaptive Grid configuration based on device size to slash CPU usage
    let cols = 40
    let rows = 24
    const spacingX = 42
    const spacingZ = 36
    const targetFps = 35 // Smooth 35 FPS capped for maximum battery & CPU efficiency
    const frameInterval = 1000 / targetFps

    const handleResize = () => {
      if (!canvas) return
      const isMobile = window.innerWidth < 768
      cols = isMobile ? 26 : 40
      rows = isMobile ? 18 : 24

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) // Cap at 1.5x DPR for optimal GPU/CPU ratio
      width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.parentElement?.clientHeight || window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / (width || 1) - 0.5
      const y = (e.clientY - rect.top) / (height || 1) - 0.5
      mousePosRef.current.targetX = x * 0.4
      mousePosRef.current.targetY = y * 0.3
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleResize()

    // Pre-computed color constants to avoid per-frame GC string allocations
    const isDark = resolvedTheme === 'dark'
    const baseColorStyle = isDark ? '#f0f5ff' : '#0f172a'
    const accentColorStyle = isDark ? '#f59e0b' : '#d97706' // Warm Amber highlight
    const baseAlphaMultiplier = (isDark ? 0.45 : 0.35) * opacity
    const fov = 420
    const cameraZ = -280

    const render = (currentTime: number) => {
      if (!ctx || !canvas) return

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      // Frame rate throttle (prevents thermal spikes & CPU bottlenecks on mobile)
      const elapsed = currentTime - lastFrameTime
      if (elapsed < frameInterval && !isReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
        return
      }
      lastFrameTime = currentTime - (elapsed % frameInterval)

      // Smooth mouse lerp
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05

      ctx.clearRect(0, 0, width, height)

      if (!isReducedMotion) {
        time += 0.015
      }

      // Camera & Perspective settings
      const centerX = width * 0.5 + mousePosRef.current.x * 80
      const centerY = height * 0.35 + mousePosRef.current.y * 60
      const cameraY = -180 + mousePosRef.current.y * 40

      const freq1 = 0.0035
      const freq2 = 0.0055
      const freq3 = 0.002
      const time1 = time * 1.2
      const time2 = time * 0.8
      const time3 = time * 0.5

      // Zero-allocation back-to-front rendering:
      // Rows r = rows - 1 down to 0 are already strictly ordered from furthest Z to closest Z!
      for (let r = rows - 1; r >= 0; r--) {
        const rawZ = r * spacingZ
        const relZ = rawZ - cameraZ
        if (relZ <= 10) continue

        const scale = fov / relZ
        const depthFactor = Math.max(0, 1 - (r / rows) * 0.85)
        const rowEnvelope = Math.sin(Math.min(1, (r + 4) / rows) * Math.PI)

        for (let c = 0; c < cols; c++) {
          const rawX = (c - cols / 2) * spacingX

          // Multi-frequency harmonic wave formulation
          const wave1 = Math.sin(rawX * freq1 + rawZ * freq3 + time1) * 65
          const wave2 = Math.cos(rawX * freq2 - rawZ * freq1 + time2) * 45
          const wave3 = Math.sin((rawX + rawZ) * 0.004 + time3) * 30

          const colEnvelope = Math.sin((c / (cols - 1)) * Math.PI)
          const envelope = colEnvelope * rowEnvelope
          const rawY = (wave1 + wave2 + wave3) * (0.4 + 0.6 * envelope)

          // 3D to 2D projection
          const relX = rawX
          const relY = rawY - cameraY
          const x2d = centerX + relX * scale
          const y2d = centerY + relY * scale

          // Depth fade & Height normalization
          const heightFactor = Math.min(1, Math.max(0, (rawY + 70) / 140))
          const size = Math.max(0.6, (1.2 + heightFactor * 1.8) * scale * 0.6)
          const alpha = Math.min(1, Math.max(0.02, depthFactor * colEnvelope * (0.2 + heightFactor * 0.8)))
          const finalAlpha = alpha * baseAlphaMultiplier

          if (finalAlpha <= 0.005) continue

          const isCrest = heightFactor > 0.78
          ctx.globalAlpha = finalAlpha
          ctx.fillStyle = isCrest ? accentColorStyle : baseColorStyle

          ctx.beginPath()
          ctx.arc(x2d, y2d, size, 0, 6.28318)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    // Defer initial render by 60ms to guarantee zero main-thread contention during hydration & LCP
    startTimeoutId = setTimeout(() => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          animationFrameId = requestAnimationFrame(render)
        })
      } else {
        animationFrameId = requestAnimationFrame(render)
      }
    }, 60)

    return () => {
      clearTimeout(startTimeoutId)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [resolvedTheme, opacity])

  return (
    <div
      className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
      style={{
        maskImage:
          'radial-gradient(ellipse 95% 85% at 50% 28%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 55%, transparent 95%), linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 95% 85% at 50% 28%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 55%, transparent 95%), linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}

export default DotWaveBackground
