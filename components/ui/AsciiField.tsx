'use client'

import { useEffect, useRef } from 'react'
import styles from './AsciiField.module.css'

/**
 * A slow-moving field of ASCII "terrain" drawn behind every page.
 *
 * Height comes from two octaves of value noise sampled once per character
 * cell, then cut into terraces: each band above the waterline gets the next
 * glyph in a density ramp, so peaks read as rings of . : - = + * #. Valleys
 * stay empty, which keeps negative space between the clouds.
 *
 * It redraws at a low frame rate and repaints only the cells whose glyph
 * changed, pauses while the tab is hidden, draws one still frame under
 * reduced motion, and reads its colors from the theme
 * tokens so it follows light/dark changes without any props.
 */

const CELL_W = 10
const CELL_H = 18
const FONT_PX = 12
const FPS = 5
/**
 * Device-pixel budget for the canvas. The browser re-uploads the whole bitmap on each
 * repaint, so big retina screens trade a little glyph sharpness for a much cheaper frame.
 */
const MAX_PIXELS = 3_000_000
/** Pixel wavelength of the first noise octave. */
const WAVELENGTH = 400
/** Noise units the field drifts per second. */
const DRIFT = 0.016
/** Stretches the noise (which clusters near 0.5) so terraces reach the top glyphs. */
const CONTRAST = 1.8
/** Elevation where glyphs begin, and the height of each terrace. */
const WATERLINE = 0.56
const TERRACE = 0.05
const RAMP = ['.', ':', '-', '=', '+', '*', '#']

const ALPHA = {
  light: { base: 0.17, step: 0.04 },
  dark: { base: 0.15, step: 0.036 },
}

function hash(x: number, y: number) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

function terrain(px: number, py: number, t: number) {
  const x = px / WAVELENGTH
  const y = py / WAVELENGTH
  return 0.64 * valueNoise(x + t, y - t * 0.6) + 0.36 * valueNoise(x * 2.3 - t * 1.4 + 17.3, y * 2.3 + t * 0.5 + 4.1)
}

/** Continues the drift across reloads instead of restarting from the same frame. */
function wallClockTime() {
  return ((Date.now() / 1000) * DRIFT) % 4096
}

export function AsciiField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const root = document.documentElement
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let frame = 0
    let lastDraw = 0
    let stillTime = wallClockTime()
    const timers: number[] = []

    /** Glyph band painted in each cell last frame; -1 is empty. */
    let painted = new Int8Array(0)
    /** Color and theme the canvas was last painted with; a change forces a full repaint. */
    let paintedWith = ''
    const dirty: number[] = []

    const setup = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === width && rect.height === height) return false
      width = rect.width
      height = rect.height
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (width * height))))
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const mono = getComputedStyle(root).getPropertyValue('--font-geist-mono').trim()
      ctx.font = `${FONT_PX}px ${mono || 'ui-monospace, monospace'}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      cols = Math.ceil(width / CELL_W)
      rows = Math.ceil(height / CELL_H)
      painted = new Int8Array(cols * rows).fill(-1)
      paintedWith = ''
      return true
    }

    const draw = (t: number) => {
      const clay = getComputedStyle(root).getPropertyValue('--folio-clay').trim() || '#d97757'
      const dark = root.classList.contains('dark')
      const full = paintedWith !== `${clay}|${dark}`
      dirty.length = 0

      for (let r = 0; r < rows; r++) {
        const py = r * CELL_H + CELL_H / 2
        for (let c = 0; c < cols; c++) {
          // A little per-cell jitter dithers the terrace edges so they read as hand-set type, not a plot.
          const jitter = (hash(c, r) - 0.5) * 0.03
          const elevation = 0.5 + (terrain(c * CELL_W + CELL_W / 2, py, t) - 0.5) * CONTRAST + jitter
          const level = Math.floor((elevation - WATERLINE) / TERRACE)
          const band = level < 0 ? -1 : Math.min(level, RAMP.length - 1)
          const cell = r * cols + c
          if (full || band !== painted[cell]) {
            painted[cell] = band
            dirty.push(cell)
          }
        }
      }

      if (full) ctx.clearRect(0, 0, width, height)
      const alpha = dark ? ALPHA.dark : ALPHA.light
      ctx.fillStyle = clay
      for (const cell of dirty) {
        const c = cell % cols
        const x = c * CELL_W
        const y = ((cell - c) / cols) * CELL_H
        if (!full) ctx.clearRect(x, y, CELL_W, CELL_H)
        const band = painted[cell]
        if (band < 0) continue
        ctx.globalAlpha = alpha.base + alpha.step * band
        ctx.fillText(RAMP[band], x + CELL_W / 2, y + CELL_H / 2)
      }
      ctx.globalAlpha = 1
      paintedWith = `${clay}|${dark}`
      canvas.dataset.ready = ''
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - lastDraw < 1000 / FPS) return
      lastDraw = now
      draw(wallClockTime())
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (motionQuery.matches) {
        stillTime = wallClockTime()
        draw(stillTime)
      } else if (!document.hidden) {
        lastDraw = 0
        frame = requestAnimationFrame(tick)
      }
    }

    const redrawStill = () => {
      if (motionQuery.matches) draw(stillTime)
    }

    const onResize = () => {
      if (setup()) {
        if (motionQuery.matches) draw(stillTime)
        else draw(wallClockTime())
      }
    }

    // Theme tokens ease over ~900ms; a still frame repaints across that window to land on the final colors.
    const themeObserver = new MutationObserver(() => {
      if (!motionQuery.matches) return
      for (const delay of [0, 300, 950]) timers.push(window.setTimeout(redrawStill, delay))
    })

    setup()
    start()
    document.fonts?.ready.then(() => {
      if (motionQuery.matches) draw(stillTime)
    })

    themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', start)
    motionQuery.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(frame)
      timers.forEach(window.clearTimeout)
      themeObserver.disconnect()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', start)
      motionQuery.removeEventListener('change', start)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />
}
