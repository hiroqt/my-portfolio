'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSpotify } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { LuExternalLink } from 'react-icons/lu'
import { DEFAULT_TRACK } from '@/lib/spotify'

interface SpotifyMusicPlayerProps {
  isOpen: boolean
  onClose: () => void
  onPlayingChange?: (isPlaying: boolean) => void
  mode?: 'tech' | 'client'
}

export function SpotifyMusicPlayer({
  isOpen,
  onClose,
  onPlayingChange,
  mode = 'tech',
}: SpotifyMusicPlayerProps) {
  const [mounted, setMounted] = useState(false)
  const [eqHeights, setEqHeights] = useState<number[]>([4, 8, 14, 18, 12, 16, 20, 10, 6])

  useEffect(() => {
    setMounted(true)
    onPlayingChange?.(true)
  }, [onPlayingChange])

  // Organic frequency pulse animation for the visualizer
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setEqHeights(
        Array.from({ length: 9 }, (_, i) => {
          const base = 4 + Math.sin(Date.now() / 200 + i * 0.8) * 10 + Math.random() * 8
          return Math.max(3, Math.min(24, Math.round(base)))
        })
      )
    }, 120)

    return () => clearInterval(interval)
  }, [isOpen])

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

          {/* Floating Spotify Embed Card */}
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
              className="pointer-events-auto w-[360px] max-w-[92vw] flex flex-col p-5 rounded-[26px] bg-[#0c0e18]/95 dark:bg-[#0c0e18]/95 backdrop-blur-2xl border border-white/15 text-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]"
              role="dialog"
              aria-label="Spotify Music Player"
            >
              {/* Header: Spotify Badge & Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FaSpotify className="h-4 w-4 text-[#1DB954]" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-white/80 uppercase">
                    Spotify • Drake
                  </span>
                  <span className="flex h-2 w-2 relative ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]" />
                  </span>
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

              {/* Title & 9-Bar Equalizer Strip */}
              <div className="flex items-center justify-between gap-3 pt-3 pb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-semibold text-white tracking-tight">
                    {DEFAULT_TRACK.title}
                  </h3>
                  <p className="truncate text-xs text-white/60 font-medium">
                    {DEFAULT_TRACK.artist} &bull; {DEFAULT_TRACK.album}
                  </p>
                </div>

                {/* 9-Bar Reactive Equalizer */}
                <div
                  className="flex h-6 items-end justify-center gap-[2.5px] shrink-0"
                  aria-label="Equalizer frequency animation"
                >
                  {eqHeights.map((h, idx) => (
                    <motion.div
                      key={idx}
                      className="w-[2px] rounded-full bg-[#1DB954]"
                      style={{ originY: 1 }}
                      animate={{ height: `${h}px` }}
                      transition={{ duration: 0.12, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              </div>

              {/* Embedded Official Spotify Player for Drake - B's on the Table */}
              <div className="mt-2 w-full overflow-hidden rounded-[16px] shadow-lg ring-1 ring-white/10 bg-black/40">
                <iframe
                  style={{ borderRadius: '16px' }}
                  src={DEFAULT_TRACK.embedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player: Drake - B's on the Table"
                  className="w-full block"
                />
              </div>

              {/* Footer: Stream & Open in Spotify App */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="font-mono text-[10px] text-white/40">Official Release</span>
                <a
                  href={DEFAULT_TRACK.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-white/80 hover:text-[#1DB954] transition-colors py-0.5"
                >
                  <FaSpotify className="h-3.5 w-3.5 text-[#1DB954]" />
                  <span>Open in Spotify</span>
                  <LuExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
