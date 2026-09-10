'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShareAlt, FaPlus, FaLayerGroup, FaBriefcase, FaTerminal } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'
import { IoMusicalNotes } from 'react-icons/io5'
import { CURRENT_TRACK, useMusic } from '@/lib/music'

interface MobileFABProps {
  chatOpen: boolean
  socialsOpen: boolean
  stackOpen?: boolean
  viewMode?: 'tech' | 'client'
  onToggleChat: () => void
  onToggleSocials: () => void
  onToggleStack?: () => void
  onToggleViewMode?: () => void
  isMusicOpen?: boolean
  onToggleMusic?: () => void
}

export function MobileFAB({
  chatOpen,
  socialsOpen,
  stackOpen = false,
  viewMode = 'tech',
  onToggleChat,
  onToggleSocials,
  onToggleStack,
  onToggleViewMode,
  isMusicOpen = false,
  onToggleMusic,
}: MobileFABProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { isPlaying, headerWaveBars } = useMusic()

  // Auto-close FAB speed dial if any modal is opened externally or on ESC
  useEffect(() => {
    if (chatOpen || socialsOpen || stackOpen || isMusicOpen) {
      setIsExpanded(false)
    }
  }, [chatOpen, socialsOpen, stackOpen, isMusicOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExpanded])

  const handleOpenChat = () => {
    setIsExpanded(false)
    onToggleChat()
  }

  const handleOpenSocials = () => {
    setIsExpanded(false)
    onToggleSocials()
  }

  const handleOpenStack = () => {
    setIsExpanded(false)
    onToggleStack?.()
  }

  const handleToggleMode = () => {
    setIsExpanded(false)
    onToggleViewMode?.()
  }

  const handleOpenMusic = () => {
    setIsExpanded(false)
    onToggleMusic?.()
  }

  // Hide the FAB while any full card modal is active so it doesn't obstruct the card
  const isAnyModalOpen = chatOpen || socialsOpen || stackOpen || isMusicOpen

  return (
    <div className="lg:hidden">
      {/* ── Transparent Click-Away Overlay when FAB Speed-Dial is open (No blur or dimming) ── */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-45 bg-transparent"
          aria-hidden="true"
        />
      )}

      {/* ── Speed Dial Actions & Main Floating Button at Bottom Right Above Bottom Navigation ── */}
      <AnimatePresence>
        {!isAnyModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-4 sm:right-6 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-50 flex flex-col items-end gap-2.5 pointer-events-auto select-none"
          >
            {/* ── Action 0: View Mode Switcher Button ── */}
            <AnimatePresence>
              {isExpanded && onToggleViewMode && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26, delay: 0.14 }}
                >
                  <button
                    type="button"
                    onClick={handleToggleMode}
                    aria-label={`Switch to ${viewMode === 'client' ? 'Developer' : 'Client'} Mode`}
                    className="flex items-center gap-3 pr-4 pl-2.5 py-2.5 rounded-full bg-card text-foreground border border-accent/25 shadow-lg active:scale-95 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent text-background dark:text-[#131416] flex items-center justify-center text-sm font-bold shadow-xs">
                      {viewMode === 'client' ? <FaTerminal className="w-3.5 h-3.5" /> : <FaBriefcase className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs tracking-tight">
                          {viewMode === 'client' ? 'Switch to Dev Mode' : 'Client View'}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                        {viewMode === 'client' ? 'Code & technical details' : 'User-friendly overview'}
                      </p>
                    </div>
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent/15 text-accent">
                      {viewMode === 'client' ? 'DEV' : 'CLIENT'}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Action 1: yhelAI Copilot Button ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26, delay: 0.1 }}
                >
                  <button
                    type="button"
                    onClick={handleOpenChat}
                    aria-label="Open yhelAI Copilot Chat"
                    className="flex items-center gap-3 pr-4 pl-2.5 py-2.5 rounded-full bg-card text-foreground border border-border/40 shadow-lg hover:border-accent/40 active:scale-95 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent text-background dark:text-[#131416] flex items-center justify-center text-sm shadow-xs">
                      <HiSparkles className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs tracking-tight">yhelAI Copilot</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                        Ask Arnel&apos;s Copilot
                      </p>
                    </div>
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent/15 text-accent">
                      AI
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Action 2: Studio Music Player Button ── */}
            <AnimatePresence>
              {isExpanded && onToggleMusic && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26, delay: 0.07 }}
                >
                  <button
                    type="button"
                    onClick={handleOpenMusic}
                    aria-label={`Open Music Player: ${CURRENT_TRACK.title}`}
                    className="flex items-center gap-3 pr-3.5 pl-2.5 py-2 rounded-full bg-card text-foreground border border-border/40 shadow-lg hover:border-accent/40 active:scale-95 transition-colors duration-150 cursor-pointer overflow-hidden group"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-border/60 bg-black/40 flex items-center justify-center">
                      <Image
                        src={CURRENT_TRACK.coverSrc}
                        alt={CURRENT_TRACK.title}
                        fill
                        sizes="32px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center transition-colors ${
                          isPlaying ? 'bg-black/25' : 'bg-black/45'
                        }`}
                      >
                        <IoMusicalNotes
                          className={`w-3.5 h-3.5 ${
                            isPlaying
                              ? 'text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]'
                              : 'text-white/80'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs tracking-tight">
                          {CURRENT_TRACK.title}
                        </span>
                        {isPlaying && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                        {isPlaying ? 'Drake • Now Playing' : 'Drake • Studio Audio'}
                      </p>
                    </div>

                    {/* Live Reactive 4-Bar Equalizer Waves */}
                    <div className="ml-1 flex items-end gap-[2px] h-4 px-1.5 py-1 rounded bg-accent/10 border border-accent/20">
                      {headerWaveBars.map((height, idx) => (
                        <motion.span
                          key={idx}
                          className={`w-[2px] rounded-full transition-colors ${
                            isPlaying ? 'bg-accent' : 'bg-muted-foreground/35'
                          }`}
                          animate={{
                            height: isPlaying ? `${Math.max(3, height * 12)}px` : '3px',
                          }}
                          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                        />
                      ))}
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Action 3: Tech Stack & Arsenal Button ── */}
            <AnimatePresence>
              {isExpanded && onToggleStack && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26, delay: 0.04 }}
                >
                  <button
                    type="button"
                    onClick={handleOpenStack}
                    aria-label="Open Tech Stack & Arsenal"
                    className="flex items-center gap-3 pr-4 pl-2.5 py-2.5 rounded-full bg-card text-foreground border border-border/40 shadow-lg hover:border-accent/40 active:scale-95 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs shadow-xs">
                      <FaLayerGroup className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-xs tracking-tight block">Tech Stack</span>
                      <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                        Languages &amp; Frameworks
                      </p>
                    </div>
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent/15 text-accent">
                      40+
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Action 4: Social Channels Button ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                >
                  <button
                    type="button"
                    onClick={handleOpenSocials}
                    aria-label="Open Social Links"
                    className="flex items-center gap-3 pr-4 pl-2.5 py-2.5 rounded-full bg-card text-foreground border border-border/40 shadow-lg hover:border-accent/40 active:scale-95 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center text-xs shadow-xs">
                      <FaShareAlt className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-xs tracking-tight block">Social Channels</span>
                      <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                        GitHub, LinkedIn, Email
                      </p>
                    </div>
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-muted text-muted-foreground">
                      5+
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Main FAB Trigger Button ── */}
            <motion.button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label={isExpanded ? 'Close Menu' : 'Open Quick Actions Menu'}
              aria-expanded={isExpanded}
              whileTap={{ scale: 0.94 }}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all cursor-pointer ${
                isExpanded
                  ? 'bg-foreground text-background border-border/60'
                  : isPlaying
                  ? 'bg-accent text-background dark:text-[#131416] border-accent shadow-[0_0_16px_rgba(245,158,11,0.45)]'
                  : 'bg-accent text-background dark:text-[#131416] border-accent/40 hover:brightness-105'
              }`}
            >
              {/* If playing and collapsed, subtle pulsating beacon aura */}
              {isPlaying && !isExpanded && (
                <span className="absolute -inset-1 rounded-full border-2 border-accent/40 animate-ping pointer-events-none" />
              )}
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                className="flex items-center justify-center"
              >
                <FaPlus className="w-4.5 h-4.5" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
