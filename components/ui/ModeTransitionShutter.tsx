'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaTerminal } from 'react-icons/fa'

interface ModeTransitionShutterProps {
  isTransitioning: boolean
  targetMode: 'tech' | 'client'
}

export function ModeTransitionShutter({
  isTransitioning,
  targetMode,
}: ModeTransitionShutterProps) {
  const isClient = targetMode === 'client'

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition-shutter"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex flex-col"
        >
          {/* ── Top Shutter Panel ── */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{
              duration: 0.38,
              delay: 0.08,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="w-full h-1/2 bg-background dark:bg-[#07080e] border-b border-amber-500/50 shadow-2xl relative"
          >
            {/* Ambient Top Glow */}
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* ── Center Light Seam & Opening Emblem ── */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.28, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none"
          >
            {/* Amber Light Beam Line */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_30px_rgba(245,158,11,1)]" />

            {/* Central Badge */}
            <div className="mt-[-18px] px-5 py-2 rounded-full bg-background dark:bg-[#0c0e18] border border-amber-500/60 shadow-[0_0_24px_rgba(245,158,11,0.4)] flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center text-xs font-bold shadow-xs">
                {isClient ? <FaBriefcase className="w-3 h-3" /> : <FaTerminal className="w-3 h-3" />}
              </div>
              <span className="font-semibold text-xs text-foreground tracking-wide">
                {isClient ? 'Opening Client Showcase...' : 'Entering Developer Architecture...'}
              </span>
            </div>
          </motion.div>

          {/* ── Bottom Shutter Panel ── */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{
              duration: 0.38,
              delay: 0.08,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="w-full h-1/2 bg-background dark:bg-[#07080e] border-t border-amber-500/50 shadow-2xl relative"
          >
            {/* Ambient Bottom Glow */}
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
