'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from 'react-icons/fa'

const summaryMilestones = [
  {
    value: 'Full-Stack + AI',
    label: 'Core Focus',
    sub: 'Modern Web, Mobile & LLM Systems',
    href: '#skills',
  },
  {
    value: 'Top 30',
    label: 'National eGov Hackathon',
    sub: 'AI-Powered Citizen Services',
    href: '#projects',
  },
  {
    value: '11+',
    label: 'Verified Credentials',
    sub: 'IBM AI & AWS Cloud (Credly)',
    href: '#certifications',
  },
  {
    value: '486+ Hrs',
    label: 'Clinical IT Operations',
    sub: 'GEAMH Queue & Triage Systems',
    href: '#experience',
  },
]

export function ATSResumeHeader() {
  const reduce = useReducedMotion()

  return (
    <header id="hero" className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-border/60 scroll-mt-16">
      {/* Target anchor for backwards compatibility with #about */}
      <span id="about" className="sr-only" aria-hidden="true" />
      
      {/* ── Section Header (Consistent 00 Index across Portfolio) ── */}
      <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">00</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Overview &bull; Profile
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Software Engineering
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ── Left Column: AI-First Narrative & Core Identity ── */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status & Location Badges */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Full-Time Roles &bull; 2026
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted/60 border border-border/80 text-muted-foreground font-mono text-[11px]">
              Cavite, PH &bull; BS IT &bull; CvSU
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="space-y-2"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
              Arnel Baylon
            </h1>
            <p className="font-mono text-xs sm:text-sm text-accent font-semibold tracking-wide uppercase">
              Software Engineer &bull; Generative AI Systems
            </p>
          </motion.div>

          {/* AI-First Thesis & Pitch */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-5 space-y-3.5 text-muted-foreground text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-xl"
          >
            <p>
              I bridge frontier generative AI models with production-grade software engineering. I build autonomous multi-agent loops, intelligent RAG pipelines, and modern full-stack web applications designed for real-world impact.
            </p>
            <p>
              I turn raw AI capabilities into dependable, intuitive systems that users interact with every day.
            </p>
          </motion.div>

          {/* Action CTAs + Quick Social Connectors */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-white transition-all shadow-xs group"
            >
              <span>Explore Featured Systems</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-muted/20 dark:bg-card/60">
              <a
                href="https://github.com/hiroqt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <FaGithub className="text-sm" />
              </a>
              <a
                href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="mailto:arnelbaylon15@gmail.com"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                title="Email"
                aria-label="Send Email"
              >
                <FaEnvelope className="text-sm" />
              </a>
            </div>
          </motion.div>

          {/* Primary Tech Stack Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="text-foreground font-semibold mr-1">Primary Stack:</span>
            {['TypeScript', 'Next.js 15', 'React', 'Flutter', 'Laravel', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-md bg-muted/50 dark:bg-muted/30 border border-border/80 text-foreground/90 hover:border-accent/40 hover:text-accent transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right Column: Hero Side Image (Clean, Borderless, Theme-Adaptive) ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          {/* Ambient soft glow matching CvSU graduation stole orange */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 blur-3xl -z-10"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.22) 0%, transparent 70%)',
            }}
          />

          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-square flex items-center justify-center">
            <Image
              src="/images/header.png"
              alt="Arnel Baylon - Software Engineer"
              width={1254}
              height={1254}
              priority
              className="w-full h-full object-contain filter drop-shadow-md dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] hover:scale-[1.02] transition-transform duration-500 select-none pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </motion.div>

      </div>

      {/* ── 4-Metric Milestone Stats Ribbon ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-border/60">
        {summaryMilestones.map((m, idx) => (
          <a
            key={idx}
            href={m.href}
            onClick={(e) => {
              const targetId = m.href.replace('#', '')
              const targetEl = document.getElementById(targetId)
              if (targetEl) {
                e.preventDefault()
                targetEl.scrollIntoView({ behavior: 'smooth' })
                if (typeof window !== 'undefined') {
                  window.history.replaceState(null, '', m.href)
                }
              }
            }}
            className="group block p-4 rounded-2xl border border-border bg-muted/20 dark:bg-card/70 hover:bg-muted/40 hover:border-accent/40 transition-all shadow-2xs dark:shadow-md dark:shadow-black/15"
          >
            <div className="font-serif text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
              <span>{m.value}</span>
              <span className="text-xs font-mono text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-1">
              {m.label}
            </div>
            <div className="text-[11px] text-muted-foreground/80 truncate mt-0.5">
              {m.sub}
            </div>
          </a>
        ))}
      </div>
    </header>
  )
}
export default ATSResumeHeader
