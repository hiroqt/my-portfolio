'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { HeroGraphicBackground } from '@/components/ui/HeroGraphicBackground'
import { FaFilePdf, FaArrowRight, FaTrophy, FaAward, FaCode, FaCertificate } from 'react-icons/fa'

const quickHighlights = [
  {
    icon: <FaTrophy className="text-amber-500 text-sm" aria-hidden="true" />,
    label: 'AWS Winner (BGC 2026)',
  },
  {
    icon: <FaAward className="text-emerald-500 text-sm" aria-hidden="true" />,
    label: 'Top 30 eGov Hackathon',
  },
  {
    icon: <FaCode className="text-sky-500 text-sm" aria-hidden="true" />,
    label: 'Full-Stack & Multi-Agent',
  },
  {
    icon: <FaCertificate className="text-purple-500 text-sm" aria-hidden="true" />,
    label: '11+ AI/Cloud Badges',
  },
]

export function ATSResumeHeader() {
  const reduce = useReducedMotion()

  return (
    <header className="w-full relative overflow-hidden border-b border-border/60">
      <HeroGraphicBackground variant="hero" className="w-full min-h-[75vh] sm:min-h-[80vh] flex items-center justify-center">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 pb-14 sm:pb-16 flex flex-col items-center text-center">
          


          {/* 2. Candidate Name (Signature Handwritten Font - Black/Foreground) */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="tracking-tight"
          >
            <span 
              className="font-handwriting text-6xl sm:text-8xl md:text-9xl text-foreground font-bold tracking-wide block select-none leading-[1.05]"
              style={{ fontFamily: "'Caveat', 'Dancing Script', 'Pacifico', cursive" }}
            >
              Arnel Baylon
            </span>
          </motion.h1>

          {/* 3. Primary Handwritten Role */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-1 sm:mt-2"
          >
            <span 
              className="font-handwriting text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-accent font-bold tracking-wide block select-none"
              style={{ fontFamily: "'Caveat', 'Dancing Script', 'Pacifico', cursive" }}
            >
              Software Engineer &amp; Agentic Developer
            </span>
          </motion.div>

          {/* 4. Single Clear & Crisp Pitch */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed"
          >
            Building autonomous multi-agent AI systems, scalable full-stack web platforms, and intelligent automation tools.
          </motion.p>

          {/* 5. Clean Action Button */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="mt-8 flex items-center justify-center font-mono text-xs sm:text-sm"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-foreground text-background hover:bg-accent hover:text-white transition-all shadow-md font-semibold group text-sm"
            >
              <span>View Projects</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>

          {/* 6. Clean Minimalist Highlights Bar */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            {quickHighlights.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-background/90 border border-border/80 text-xs text-foreground font-medium shadow-2xs"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </HeroGraphicBackground>
    </header>
  )
}
