'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HeroGraphicBackground } from '@/components/ui/HeroGraphicBackground'

export function ATSResumeHeader() {
  const reduce = useReducedMotion()

  return (
    <header className="w-full relative overflow-hidden border-b border-border/60">
      <HeroGraphicBackground variant="hero" className="w-full min-h-[70vh] sm:min-h-[75vh] flex items-center">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pt-28 sm:pt-36 pb-16 sm:pb-24 flex flex-col items-center text-center">
          
          {/* Eyebrow Label */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-accent font-semibold mb-4"
          >
            Arnel A. Baylon • Portfolio &amp; Résumé
          </motion.div>

          {/* Primary ATS Headline */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-foreground leading-[1.1] sm:leading-[1.06]">
              Context engineering &amp; <br className="hidden sm:inline" />
              <span className="italic font-light text-accent">full-stack systems</span> made easy.
            </h1>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-3xl mt-6 sm:mt-8"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed">
              Building intelligent operations tools, context-engineered LLM workflows, and resilient web &amp; mobile applications — giving total clarity and speed to modern teams.
            </p>
          </motion.div>

          {/* Direct Contact Links Strip */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-mono text-muted-foreground"
          >
            <a
              href="mailto:arnelbaylon15@gmail.com"
              className="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              arnelbaylon15@gmail.com
            </a>
            <span className="opacity-40" aria-hidden="true">•</span>
            <a
              href="https://github.com/hiroqt"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              github.com/hiroqt
            </a>
            <span className="opacity-40" aria-hidden="true">•</span>
            <a
              href="https://www.linkedin.com/in/arnel-baylon-b05233189"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              linkedin.com/in/arnel-baylon
            </a>
            <span className="opacity-40" aria-hidden="true">•</span>
            <a
              href="/pdf/Arnel_Baylon_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              Download Résumé (PDF)
            </a>
          </motion.div>

        </div>
      </HeroGraphicBackground>
    </header>
  )
}
