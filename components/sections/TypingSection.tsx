'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MonkeyTypeGame } from '@/components/modules/typing/MonkeyTypeGame'
import { FaKeyboard, FaVolumeUp, FaBolt, FaTerminal } from 'react-icons/fa'

export function TypingSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="typing" aria-label="Mechanical Typing Studio & Switch Audio Lab" className="hidden md:block space-y-6 sm:space-y-8 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-border/40">
        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <span className="font-bold">07</span>
          <span className="text-muted-foreground">/</span>
          <span className="uppercase tracking-wider font-semibold">Dev Typing Sandbox</span>
          <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold">
            Interactive
          </span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Keystroke Speed Engine &bull; Mechanical Switch Audio Synthesizer
        </span>
      </div>

      {/* ── Section Intro Narrative ── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FaKeyboard className="w-5 h-5 text-accent" />
          <h2 className="font-supreme text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Mechanical Keystroke Studio &amp; Switch Audio Lab
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl font-sans">
          Benchmark your code typing speed with real-time WPM, accuracy metrics, and customizable mechanical switch sound synthesis (Cherry MX Red, Gateron Brown, Outemu Blue, Black Thock, and Holy Panda). Powered by Web Audio API for zero-latency acoustic feedback.
        </p>
      </div>

      {/* ── Typing Game & Switch Sound Sandbox ── */}
      <MonkeyTypeGame initialSwitch="red" />
    </section>
  )
}

export default TypingSection
