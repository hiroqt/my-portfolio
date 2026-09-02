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
    let width = 0
    let height = 0
    let time = 0

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isReducedMotion = mediaQuery.matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches
    }
    mediaQuery.addEventListener('change', handleMotionChange)

    // Grid configuration
    const cols = 55 // Number of longitudinal lines
    const rows = 35 // Depth rows
    const spacingX = 38
    const spacingZ = 32

    const handleResize = () => {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.parentElement?.clientHeight || window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / width - 0.5
      const y = (e.clientY - rect.top) / height - 0.5
      mousePosRef.current.targetX = x * 0.4
      mousePosRef.current.targetY = y * 0.3
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleResize()

    const render = () => {
      if (!ctx || !canvas) return

      // Smooth mouse lerp
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05

      ctx.clearRect(0, 0, width, height)

      if (!isReducedMotion) {
        time += 0.015
      }

      const isDark = resolvedTheme === 'dark'
      const baseDotColor = isDark ? [240, 245, 255] : [15, 23, 42]
      const accentDotColor = isDark ? [245, 158, 11] : [217, 119, 6] // Warm Amber highlight

      // Camera & Perspective settings
      const centerX = width * 0.5 + mousePosRef.current.x * 80
      const centerY = height * 0.35 + mousePosRef.current.y * 60
      const fov = 420
      const cameraY = -180 + mousePosRef.current.y * 40
      const cameraZ = -280

      // Compute grid particles in 3D
      interface Point3D {
        x2d: number
        y2d: number
        z: number
        yNorm: number
        alpha: number
        size: number
        col: number
        row: number
      }

      const points: Point3D[] = []

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // World 3D positions
          const rawX = (c - cols / 2) * spacingX
          const rawZ = r * spacingZ

          // Multi-frequency harmonic wave formulation (mountain ridges & smooth valleys like reference photo)
          const freq1 = 0.0035
          const freq2 = 0.0055
          const freq3 = 0.002
          
          const wave1 = Math.sin(rawX * freq1 + rawZ * freq3 + time * 1.2) * 65
          const wave2 = Math.cos(rawX * freq2 - rawZ * freq1 + time * 0.8) * 45
          const wave3 = Math.sin((rawX + rawZ) * 0.004 + time * 0.5) * 30
          
          // Organic curved envelope so center & edges have natural undulation
          const envelope = Math.sin((c / (cols - 1)) * Math.PI) * Math.sin(Math.min(1, (r + 4) / rows) * Math.PI)
          const rawY = (wave1 + wave2 + wave3) * (0.4 + 0.6 * envelope)

          // 3D to 2D projection
          const relX = rawX
          const relY = rawY - cameraY
          const relZ = rawZ - cameraZ

          if (relZ > 10) {
            const scale = fov / relZ
            const x2d = centerX + relX * scale
            const y2d = centerY + relY * scale

            // Depth fade & Height normalization
            const depthFactor = Math.max(0, 1 - (r / rows) * 0.85)
            const heightFactor = Math.min(1, Math.max(0, (rawY + 70) / 140))
            const edgeFadeX = Math.sin((c / (cols - 1)) * Math.PI)

            // Dynamic size and opacity
            const size = Math.max(0.6, (1.2 + heightFactor * 1.8) * scale * 0.6)
            const alpha = Math.min(1, Math.max(0.02, depthFactor * edgeFadeX * (0.2 + heightFactor * 0.8)))

            points.push({
              x2d,
              y2d,
              z: relZ,
              yNorm: heightFactor,
              alpha,
              size,
              col: c,
              row: r,
            })
          }
        }
      }

      // Sort points back to front for clean depth rendering
      points.sort((a, b) => b.z - a.z)

      // Draw particle dots
      for (let i = 0; i < points.length; i++) {
        const p = points[i]

        // Subtle accent coloring on the highest wave crests
        const isCrest = p.yNorm > 0.78
        const color = isCrest ? accentDotColor : baseDotColor
        const baseAlpha = isDark ? 0.45 : 0.35
        const finalAlpha = p.alpha * baseAlpha * opacity

        if (finalAlpha <= 0.005) continue

        ctx.beginPath()
        ctx.arc(p.x2d, p.y2d, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${finalAlpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [resolvedTheme, opacity])

  return (
    <div
      className={`fixed inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
      style={{
        // Soft vignette & center mask to guarantee content text is 100% visible and crystal clear
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
