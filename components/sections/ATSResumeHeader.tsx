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
import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiFlutter,
  SiLaravel,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
} from 'react-icons/si'

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

interface ATSResumeHeaderProps {
  onOpenStack?: () => void
}

export function ATSResumeHeader({ onOpenStack }: ATSResumeHeaderProps = {}) {
  const reduce = useReducedMotion()

  return (
    <header id="hero" className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 border-b border-border/60 scroll-mt-16">
      {/* Target anchor for backwards compatibility with #about */}
      <span id="about" className="sr-only" aria-hidden="true" />
      


      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ── Left Column: AI-First Narrative & Core Identity ── */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Headline */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="space-y-1"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
              Arnel Baylon
            </h1>
            <p className="text-base text-muted-foreground font-medium">
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

          {/* Primary Tech Stack Pills with SVG Logos */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="text-foreground font-semibold mr-1">Primary Stack:</span>
            {[
              { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
              { name: 'Next.js 15', icon: SiNextdotjs, color: 'text-foreground' },
              { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' },
              { name: 'Flutter', icon: SiFlutter, color: 'text-[#02569B]' },
              { name: 'Laravel', icon: SiLaravel, color: 'text-[#FF2D20]' },
              { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#5FA04E]' },
              { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#4169E1]' },
              { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
              { name: 'Tailwind', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
            ].map((tech) => {
              const Icon = tech.icon
              return (
                <button
                  key={tech.name}
                  type="button"
                  onClick={() => onOpenStack?.()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 dark:bg-muted/30 border border-border/80 text-foreground/90 hover:border-accent/40 hover:text-accent transition-all cursor-pointer shadow-2xs group"
                  title={`Open stack arsenal: ${tech.name}`}
                >
                  <Icon className={`w-3 h-3 transition-transform group-hover:scale-110 ${tech.color}`} />
                  <span>{tech.name}</span>
                </button>
              )
            })}
            {onOpenStack && (
              <button
                type="button"
                onClick={onOpenStack}
                className="px-2 py-1 rounded-md text-accent font-semibold hover:underline cursor-pointer transition-colors"
                title="Open full tech stack & tools drawer"
              >
                +40 More ↗
              </button>
            )}
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
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
              className="w-full h-full object-contain filter drop-shadow-md dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] hover:scale-[1.02] transition-transform duration-500 select-none pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </motion.div>

      </div>

      {/* ── 4-Metric Milestone Stats Ribbon (Zero Cards, Zero Eyebrows) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-6 border-t border-border/60">
        {summaryMilestones.map((m, idx) => (
          <a
            key={idx}
            href={m.href}
            onClick={(e) => {
              if (m.href === '#skills' && onOpenStack) {
                e.preventDefault()
                onOpenStack()
                return
              }
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
            className="group block py-1 transition-colors cursor-pointer"
          >
            <div className="font-mono text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
              <span>{m.value}</span>
              <span className="text-xs text-muted-foreground group-hover:text-accent">↗</span>
            </div>
            <div className="text-xs font-semibold text-foreground mt-1">
              {m.label}
            </div>
            <div className="text-xs text-muted-foreground truncate mt-0.5">
              {m.sub}
            </div>
          </a>
        ))}
      </div>
    </header>
  )
}
export default ATSResumeHeader
