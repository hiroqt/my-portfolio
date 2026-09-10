'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSpotify } from 'react-icons/fa6'
import { IoPlay, IoPause, IoPlaySkipBack, IoPlaySkipForward, IoClose } from 'react-icons/io5'
import { LuExternalLink } from 'react-icons/lu'
import { SpotifyTrackData, DEFAULT_TRACK } from '@/lib/spotify'

interface SpotifyMusicPlayerProps {
  isOpen: boolean
  onClose: () => void
  onPlayingChange?: (isPlaying: boolean) => void
  mode?: 'tech' | 'client'
}

// Global audio graph singletons to prevent multiple overlapping contexts
let globalAudioCtx: AudioContext | null = null
let globalAnalyser: AnalyserNode | null = null
let globalGain: GainNode | null = null
let globalOscillatorInterval: number | null = null
let isAudioPlayingGlobal = false

export function SpotifyMusicPlayer({
  isOpen,
  onClose,
  onPlayingChange,
  mode = 'tech',
}: SpotifyMusicPlayerProps) {
  const [mounted, setMounted] = useState(false)
  const [track, setTrack] = useState<SpotifyTrackData>(DEFAULT_TRACK)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(DEFAULT_TRACK.durationMs / 1000)

  // 9-bar reactive frequency equalizer
  const [eqBars, setEqBars] = useState<number[]>(() => Array.from({ length: 9 }, () => 0.12))

  // RAF loop refs
  const animFrameRef = useRef<number | null>(null)
  const freqDataRef = useRef<Uint8Array | null>(null)

  // Scrubber drag refs
  const scrubberRef = useRef<HTMLDivElement>(null)
  const pointerIdRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // ── Sync playing state to parent for header button visualizer ──
  useEffect(() => {
    onPlayingChange?.(isPlaying)
  }, [isPlaying, onPlayingChange])

  // ── Fetch Spotify track data (polling every 30s) ──
  useEffect(() => {
    let isCancelled = false

    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify', { cache: 'no-store' })
        if (!res.ok) return
        const data: SpotifyTrackData = await res.json()
        if (!isCancelled && data && data.title) {
          setTrack(data)
          if (data.durationMs) {
            setDuration(Math.round(data.durationMs / 1000))
          }
        }
      } catch (e) {
        // Fallback to default
      }
    }

    fetchSpotify()
    const interval = setInterval(fetchSpotify, 30000)
    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [])

  // ── Web Audio API Engine ──
  const initAudio = useCallback(async () => {
    if (globalAudioCtx) return
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.8

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)

    gain.connect(analyser)
    analyser.connect(ctx.destination)

    globalAudioCtx = ctx
    globalAnalyser = analyser
    globalGain = gain
  }, [])

  // Atmospheric synthetic trap groove for ambient listening & visualizer excitation
  const startSyntheticAudioLoop = useCallback(() => {
    if (!globalAudioCtx || !globalGain) return
    const ctx = globalAudioCtx

    let step = 0
    const chords = [
      [130.81, 155.56, 196.0], // C minor
      [116.54, 138.59, 174.61], // Bb minor
      [103.83, 130.81, 155.56], // Ab major
      [116.54, 146.83, 174.61], // Bb
    ]

    const playStep = () => {
      if (!isAudioPlayingGlobal || !globalAudioCtx || !globalGain) return
      try {
        const now = ctx.currentTime
        const chord = chords[Math.floor(step / 4) % chords.length]
        const baseFreq = chord[step % chord.length]

        const osc = ctx.createOscillator()
        const noteGain = ctx.createGain()
        osc.type = step % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(baseFreq * (step % 2 === 0 ? 0.5 : 1), now)

        noteGain.gain.setValueAtTime(0.2, now)
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38)

        osc.connect(noteGain)
        noteGain.connect(globalGain)
        osc.start(now)
        osc.stop(now + 0.4)

        step++
      } catch (e) {}
    }

    if (globalOscillatorInterval) window.clearInterval(globalOscillatorInterval)
    globalOscillatorInterval = window.setInterval(playStep, 220)
  }, [])

  // Real-time animation loop reading Web Audio frequencies
  const updateVisualizer = useCallback(() => {
    const analyser = globalAnalyser
    if (!analyser) return

    const binCount = analyser.frequencyBinCount
    if (!freqDataRef.current || freqDataRef.current.length !== binCount) {
      freqDataRef.current = new Uint8Array(binCount)
    }
    const freqData = freqDataRef.current
    analyser.getByteFrequencyData(freqData as any)

    const newEq = Array(9).fill(0)
    for (let i = 0; i < 9; i++) {
      const distFromCenter = 2 * Math.abs(i / 8 - 0.5)
      const gaussian = Math.exp(-(distFromCenter * distFromCenter) / 0.5)
      const binStart = Math.floor(binCount * (0.18 + 0.3 * gaussian))
      const binSpread = Math.min(
        Math.floor(binCount * (0.02 + 0.08 * gaussian)),
        binCount - binStart
      )

      let sum = 0
      let count = 0
      for (let j = 0; j < binSpread; j++) {
        const idx = binStart + j
        if (idx < binCount) {
          sum += freqData[idx]
          count++
        }
      }

      const avg = count > 0 ? sum / count : 0
      const centerFactor = Math.exp(-((distFromCenter * distFromCenter) / 0.18))
      const scaled =
        Math.pow(avg / 255, 1.35) *
        (0.15 + 1.35 * centerFactor) *
        (0.7 + Math.random() * (0.5 + 0.4 * centerFactor))
      newEq[i] = Math.min(1, scaled < 0.04 ? 0.35 * scaled : scaled)
    }
    setEqBars(newEq)

    animFrameRef.current = requestAnimationFrame(updateVisualizer)
  }, [])

  // Visualizer decay when paused
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
      setEqBars((prev) => prev.map((v) => Math.max(v * 0.5, 0.08)))
      return
    }

    animFrameRef.current = requestAnimationFrame(updateVisualizer)
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
    }
  }, [isPlaying, updateVisualizer])

  // Playback timer ticker
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentTime((t) => {
        if (t >= duration) {
          setIsPlaying(false)
          isAudioPlayingGlobal = false
          return 0
        }
        return t + 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isPlaying, duration])

  // Play / Pause Toggle with Smooth Gain Ramping
  const handleTogglePlay = useCallback(async () => {
    await initAudio()
    if (!globalAudioCtx || !globalGain) return

    if (globalAudioCtx.state === 'suspended') {
      await globalAudioCtx.resume()
    }

    if (isPlaying) {
      const now = globalAudioCtx.currentTime
      globalGain.gain.cancelScheduledValues(now)
      globalGain.gain.setValueAtTime(globalGain.gain.value, now)
      globalGain.gain.linearRampToValueAtTime(0, now + 0.35)

      setTimeout(() => {
        if (globalOscillatorInterval) {
          clearInterval(globalOscillatorInterval)
          globalOscillatorInterval = null
        }
        setIsPlaying(false)
        isAudioPlayingGlobal = false
      }, 350)
    } else {
      setIsPlaying(true)
      isAudioPlayingGlobal = true
      startSyntheticAudioLoop()

      const now = globalAudioCtx.currentTime
      globalGain.gain.cancelScheduledValues(now)
      globalGain.gain.setValueAtTime(0, now)
      globalGain.gain.linearRampToValueAtTime(0.85, now + 0.35)
    }
  }, [isPlaying, initAudio, startSyntheticAudioLoop])

  // Seek handlers
  const handleSeekBackward10 = useCallback(() => {
    setCurrentTime((t) => Math.max(t - 10, 0))
  }, [])

  const handleSeekForward10 = useCallback(() => {
    setCurrentTime((t) => Math.min(t + 10, duration))
  }, [duration])

  // Scrubber drag handlers with Pointer Capture
  const handleScrub = useCallback(
    (clientX: number) => {
      const el = scrubberRef.current
      if (!el || duration <= 0) return
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return
      const ratio = Math.min(Math.max(clientX - rect.left, 0), rect.width) / rect.width
      setCurrentTime(ratio * duration)
    },
    [duration]
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      pointerIdRef.current = e.pointerId
      e.currentTarget.setPointerCapture(e.pointerId)
      handleScrub(e.clientX)
    },
    [handleScrub]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== null && e.pointerId === pointerIdRef.current) {
        e.preventDefault()
        handleScrub(e.clientX)
      }
    },
    [handleScrub]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== null && e.pointerId === pointerIdRef.current) {
        e.preventDefault()
        handleScrub(e.clientX)
        try {
          e.currentTarget.releasePointerCapture(pointerIdRef.current)
        } catch (err) {}
        pointerIdRef.current = null
      }
    },
    [handleScrub]
  )

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== null && e.pointerId === pointerIdRef.current) {
        e.preventDefault()
        try {
          e.currentTarget.releasePointerCapture(pointerIdRef.current)
        } catch (err) {}
        pointerIdRef.current = null
      }
    },
    []
  )

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for click-outside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Floating Spotify Music Player Card (Positioned cleanly relative to header) */}
          <div
            className={`fixed z-50 pointer-events-none select-none ${
              mode === 'client'
                ? 'top-16 sm:top-20 left-1/2 -translate-x-1/2'
                : 'top-20 sm:top-24 left-4 sm:left-10 lg:left-[300px] xl:left-[360px]'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-[320px] max-w-[92vw] h-[436px] flex flex-col justify-between p-5 rounded-[26px] bg-[#0c0e18]/95 dark:bg-[#0c0e18]/95 backdrop-blur-2xl border border-white/15 text-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]"
              role="dialog"
              aria-label="Spotify Music Player"
            >
              {/* Header: Spotify Badge & Close Button */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FaSpotify className="h-4 w-4 text-[#1DB954]" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white/70 uppercase">
                    {track.isLive ? 'Now Playing' : 'Featured Track'}
                  </span>
                  {isPlaying && (
                    <span className="flex h-2 w-2 relative ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]" />
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close music player"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>

              {/* Album Cover Artwork */}
              <div className="flex h-full max-h-[170px] w-full justify-center pt-2">
                <div className="relative aspect-square h-full w-auto overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/15 shadow-lg group">
                  <Image
                    src={track.albumImageUrl}
                    alt={`${track.title} - ${track.artist}`}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Title, Artist, and 9-Bar Reactive Frequency Equalizer */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[15px] font-semibold text-white tracking-tight">
                      {track.title}
                    </h3>
                    <p className="truncate text-xs text-white/60 font-medium">
                      {track.artist}
                    </p>
                  </div>

                  {/* 9-Bar Reactive Frequency Equalizer */}
                  <div
                    className="flex h-7 items-end justify-center gap-[3px] shrink-0"
                    aria-label="Audio frequency visualizer"
                  >
                    {eqBars.map((val, idx) => (
                      <motion.div
                        key={idx}
                        className="w-[2px] rounded-full bg-white/80"
                        style={{ originY: 1 }}
                        initial={false}
                        animate={{
                          height: isPlaying ? `${Math.max(28 * val, 3)}px` : '3px',
                        }}
                        transition={{ duration: 0.12, ease: 'easeOut' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Interactive Scrubber with Pointer Capture */}
                <div
                  ref={scrubberRef}
                  className="relative h-1.5 cursor-pointer select-none overflow-hidden rounded-full bg-white/15 touch-none group/scrub"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full bg-white group-hover/scrub:bg-[#1DB954] transition-colors"
                    style={{
                      width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                    }}
                  />
                </div>

                {/* Timestamps */}
                <div className="flex justify-between font-mono text-[10px] text-white/50">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls (-10s / Play-Pause / +10s) */}
              <div className="mt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSeekBackward10}
                  className="rounded-full p-2 text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.92]"
                  title="Seek backward 10s"
                  aria-label="Seek backward 10 seconds"
                >
                  <IoPlaySkipBack className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="flex items-center justify-center rounded-full bg-white p-3 text-black transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-[0.94] shadow-md"
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause track' : 'Play track'}
                >
                  {isPlaying ? (
                    <IoPause className="h-4 w-4" />
                  ) : (
                    <IoPlay className="h-4 w-4 translate-x-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSeekForward10}
                  className="rounded-full p-2 text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.92]"
                  title="Seek forward 10s"
                  aria-label="Seek forward 10 seconds"
                >
                  <IoPlaySkipForward className="h-4 w-4" />
                </button>
              </div>

              {/* Listen on Spotify Link */}
              <div className="pt-2 border-t border-white/10 flex justify-center">
                <a
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/60 hover:text-[#1DB954] transition-colors py-0.5"
                >
                  <FaSpotify className="h-3.5 w-3.5 text-[#1DB954]" />
                  <span>Listen on Spotify</span>
                  <LuExternalLink className="h-2.5 w-2.5 opacity-70" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
