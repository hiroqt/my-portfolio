'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoClose,
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute,
} from 'react-icons/io5'
import { CURRENT_TRACK, useMusic } from '@/lib/music'

interface MusicPlayerProps {
  isOpen: boolean
  onClose: () => void
  onPlayingChange?: (isPlaying: boolean) => void
  mode?: 'tech' | 'client'
}

export function MusicPlayer({
  isOpen,
  onClose,
  onPlayingChange,
  mode = 'tech',
}: MusicPlayerProps) {
  const [mounted, setMounted] = useState(false)
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    eqBars,
    togglePlay,
    seek,
    seekRelative,
    setVolume,
    toggleMute,
  } = useMusic()

  // Sync playing state up to parent for header button visualizer
  useEffect(() => {
    onPlayingChange?.(isPlaying)
  }, [isPlaying, onPlayingChange])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scrubber drag refs & handlers with Pointer Capture
  const scrubberRef = useRef<HTMLDivElement>(null)
  const pointerIdRef = useRef<number | null>(null)

  const handleScrub = useCallback(
    (clientX: number) => {
      const el = scrubberRef.current
      if (!el || duration <= 0) return
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return
      const ratio = Math.min(Math.max(clientX - rect.left, 0), rect.width) / rect.width
      seek(ratio * duration)
    },
    [duration, seek]
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

  // Volume scrubber pointer capture
  const volumeScrubberRef = useRef<HTMLDivElement>(null)
  const volPointerIdRef = useRef<number | null>(null)

  const handleVolumeScrub = useCallback(
    (clientX: number) => {
      const el = volumeScrubberRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return
      const ratio = Math.min(Math.max(clientX - rect.left, 0), rect.width) / rect.width
      setVolume(ratio)
    },
    [setVolume]
  )

  const handleVolPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      volPointerIdRef.current = e.pointerId
      e.currentTarget.setPointerCapture(e.pointerId)
      handleVolumeScrub(e.clientX)
    },
    [handleVolumeScrub]
  )

  const handleVolPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (volPointerIdRef.current !== null && e.pointerId === volPointerIdRef.current) {
        e.preventDefault()
        handleVolumeScrub(e.clientX)
      }
    },
    [handleVolumeScrub]
  )

  const handleVolPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (volPointerIdRef.current !== null && e.pointerId === volPointerIdRef.current) {
        e.preventDefault()
        handleVolumeScrub(e.clientX)
        try {
          e.currentTarget.releasePointerCapture(volPointerIdRef.current)
        } catch (err) {}
        volPointerIdRef.current = null
      }
    },
    [handleVolumeScrub]
  )

  const handleVolPointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (volPointerIdRef.current !== null && e.pointerId === volPointerIdRef.current) {
        e.preventDefault()
        try {
          e.currentTarget.releasePointerCapture(volPointerIdRef.current)
        } catch (err) {}
        volPointerIdRef.current = null
      }
    },
    []
  )

  const getVolumeIcon = () => {
    const effective = isMuted ? 0 : volume
    if (effective === 0) return <IoVolumeMute className="w-3.5 h-3.5" />
    if (effective < 0.35) return <IoVolumeLow className="w-3.5 h-3.5" />
    if (effective < 0.7) return <IoVolumeMedium className="w-3.5 h-3.5" />
    return <IoVolumeHigh className="w-3.5 h-3.5" />
  }

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for click-outside dismissal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Floating Native Music Player Card */}
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
              aria-label="Music Player"
            >
              {/* Header: Status Badge & Close Button */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white/70 uppercase">
                    {isPlaying ? 'Now Playing' : 'Track Preview'}
                  </span>
                  {isPlaying && (
                    <span className="flex h-2 w-2 relative ml-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close music player"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>

              {/* Album Cover Artwork (User's uploaded rhinestone glove image) */}
              <div className="flex h-full max-h-[170px] w-full justify-center pt-2">
                <div className="relative aspect-square h-full w-auto overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/15 shadow-lg group">
                  <Image
                    src={CURRENT_TRACK.coverSrc}
                    alt={`${CURRENT_TRACK.title} - ${CURRENT_TRACK.artist}`}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  {/* Volume quick toggle & indicator on cover */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono font-medium text-white/90 hover:text-white hover:bg-black/85 transition-all active:scale-95 cursor-pointer shadow-md"
                    title={isMuted ? 'Unmute volume' : 'Mute volume'}
                    aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
                  >
                    {getVolumeIcon()}
                    <span>{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                  </button>
                </div>
              </div>

              {/* Title, Artist, and 9-Bar Reactive Frequency Equalizer */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[15px] font-semibold text-white tracking-tight">
                      {CURRENT_TRACK.title}
                    </h3>
                    <p className="truncate text-xs text-white/60 font-medium">
                      {CURRENT_TRACK.artist}
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
                        className="w-[2px] rounded-full bg-white/85"
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
                    className="absolute left-0 top-0 h-full rounded-full bg-white group-hover/scrub:bg-emerald-400 transition-colors"
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
                  onClick={() => seekRelative(-10)}
                  className="rounded-full p-2 text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.92] cursor-pointer"
                  title="Seek backward 10s"
                  aria-label="Seek backward 10 seconds"
                >
                  <IoPlaySkipBack className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center justify-center rounded-full bg-white p-3 text-black transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-[0.94] shadow-md cursor-pointer"
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
                  onClick={() => seekRelative(10)}
                  className="rounded-full p-2 text-white/70 transition-[color,transform] duration-150 hover:text-white active:scale-[0.92] cursor-pointer"
                  title="Seek forward 10s"
                  aria-label="Seek forward 10 seconds"
                >
                  <IoPlaySkipForward className="h-4 w-4" />
                </button>
              </div>

              {/* Volume Navigation Bar in Card */}
              <div className="pt-2.5 border-t border-white/10 flex items-center gap-2.5 px-0.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  title={isMuted ? 'Unmute volume' : 'Mute volume'}
                  aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
                >
                  {getVolumeIcon()}
                </button>

                <div
                  ref={volumeScrubberRef}
                  className="relative flex-1 h-1.5 cursor-pointer select-none overflow-hidden rounded-full bg-white/15 touch-none group/vol"
                  onPointerDown={handleVolPointerDown}
                  onPointerMove={handleVolPointerMove}
                  onPointerUp={handleVolPointerUp}
                  onPointerCancel={handleVolPointerCancel}
                  role="slider"
                  aria-label="Volume level"
                  aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-white group-hover/vol:bg-emerald-400 transition-colors"
                    style={{
                      width: `${Math.round((isMuted ? 0 : volume) * 100)}%`,
                    }}
                  />
                </div>

                <span className="font-mono text-[10px] text-white/50 w-8 text-right select-none shrink-0">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
