'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShareAlt, FaPlus } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'

interface MobileFABProps {
  chatOpen: boolean
  socialsOpen: boolean
  onToggleChat: () => void
  onToggleSocials: () => void
}

export function MobileFAB({
  chatOpen,
  socialsOpen,
  onToggleChat,
  onToggleSocials,
}: MobileFABProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Auto-close FAB speed dial if any modal is opened externally or on ESC
  useEffect(() => {
    if (chatOpen || socialsOpen) {
      setIsExpanded(false)
    }
  }, [chatOpen, socialsOpen])

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

  // Hide the FAB while either full card modal is active so it doesn't obstruct the card
  const isAnyModalOpen = chatOpen || socialsOpen

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
            {/* ── Action 1: yhelAI Copilot Button ── */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26, delay: 0.04 }}
                >
                  <button
                    type="button"
                    onClick={handleOpenChat}
                    aria-label="Open yhelAI Copilot Chat"
                    className="flex items-center gap-3 pr-4 pl-2.5 py-2.5 rounded-full bg-background dark:bg-[#0c0e18] text-foreground border border-border/90 dark:border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.35)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.75)] hover:border-accent active:scale-95 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm shadow-xs">
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
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent/15 text-accent border border-accent/30">
                      AI
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Action 2: Social Channels Button ── */}
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
                    className="flex items-center gap-3 pr-4 pl-2.5 py-2.5 rounded-full bg-background dark:bg-[#0c0e18] text-foreground border border-border/90 dark:border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.35)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.75)] hover:border-accent active:scale-95 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs shadow-xs">
                      <FaShareAlt className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-xs tracking-tight block">Social Channels</span>
                      <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                        GitHub, LinkedIn, Email
                      </p>
                    </div>
                    <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-muted dark:bg-white/10 text-muted-foreground border border-border/60">
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
              aria-label={isExpanded ? 'Close Menu' : 'Open AI & Socials Menu'}
              aria-expanded={isExpanded}
              whileTap={{ scale: 0.9 }}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-[0_10px_28px_rgba(245,158,11,0.35)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.8)] border transition-all duration-300 cursor-pointer ${
                isExpanded
                  ? 'bg-foreground text-background border-border/80'
                  : 'bg-gradient-to-tr from-amber-500 via-accent to-amber-600 text-white border-amber-300/40 hover:brightness-110'
              }`}
            >
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
