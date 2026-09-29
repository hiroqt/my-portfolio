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
    value: 'Top 5',
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
    <header id="hero" className="relative pt-4 pb-8 sm:pt-6 sm:pb-12 lg:py-6 lg:min-h-[calc(100vh-4.5rem)] lg:flex lg:flex-col lg:justify-center lg:snap-start scroll-mt-16">
      {/* Target anchor for backwards compatibility with #about */}
      <span id="about" className="sr-only" aria-hidden="true" />

      {/* ── Desktop Architectural Mission & Visual Hero Stage (lg:grid) ── */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-center">
        {/* Left 7 Columns: Narrative, Headline & Direct CTAs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="uppercase tracking-wider font-semibold">Autonomous AI Swarms &amp; AI-Driven Development</span>
          </div>
          <h1 className="font-supreme text-3xl sm:text-4xl xl:text-[40px] font-bold tracking-tight text-foreground leading-[1.14]">
            Engineering Frontier AI Loops into Resilient Production Software.
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-sans max-w-xl">
            Architecting multi-agent swarms, low-latency LLM pipelines, and high-concurrency AI-driven architectures with relentless craft and real-world impact.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById('projects')
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' })
                  if (typeof window !== 'undefined') {
                    window.history.replaceState(null, '', '#projects')
                  }
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-white transition-colors duration-150 active:scale-[0.97] shadow-xs group cursor-pointer"
            >
              <span>Explore Featured Systems</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </a>
            {onOpenStack && (
              <button
                type="button"
                onClick={onOpenStack}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted/80 text-foreground font-mono text-xs transition-colors active:scale-[0.97] cursor-pointer"
              >
                <span>View 40+ Tech Arsenal</span>
                <span className="text-accent">&rarr;</span>
              </button>
            )}
          </div>
        </div>

        {/* Right 5 Columns: Visual Identity Art & Live Telemetry Pill */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div
            className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 blur-3xl -z-10"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(194, 157, 104, 0.22) 0%, transparent 70%)',
            }}
          />
          <div className="relative w-full max-w-[210px] xl:max-w-[240px] aspect-square flex items-center justify-center">
            <Image
              src="/images/header.png"
              alt="Arnel Baylon - Software Engineer"
              width={1254}
              height={1254}
              priority
              sizes="240px"
              className="w-full h-full object-contain filter drop-shadow-md dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] select-none pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile Full Hero (lg:hidden) ── */}
      <div className="lg:hidden grid gap-8 items-center">
        
        {/* Mobile Identity & Core Pitch */}
        <div className="flex flex-col justify-center">
          {/* Headline */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.04, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-1"
          >
            <h1 className="font-supreme text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.08]">
              Arnel Baylon
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-medium">
              Software Engineer &bull; Generative AI Systems
            </p>
          </motion.div>

          {/* AI-First Thesis & Pitch */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 space-y-3.5 text-muted-foreground text-[15px] sm:text-base leading-relaxed max-w-xl"
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
            transition={{ duration: 0.35, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-white transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.97] shadow-xs group"
            >
              <span>Explore Featured Systems</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/40 dark:bg-card/40">
              <a
                href="https://github.com/hiroqt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors duration-150 active:scale-90"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <FaGithub className="text-sm" />
              </a>
              <a
                href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors duration-150 active:scale-90"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="mailto:arnelbaylon15@gmail.com"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors duration-150 active:scale-90"
                title="Email"
                aria-label="Send Email"
              >
                <FaEnvelope className="text-sm" />
              </a>
            </div>
          </motion.div>

          {/* Primary Tech Stack Pills with SVG Logos (Borderless) */}
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
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/50 dark:bg-muted/30 text-foreground/90 hover:bg-muted/80 hover:text-foreground transition-[color,background-color,transform] duration-150 active:scale-95 cursor-pointer group"
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
                className="px-2 py-1 rounded-md text-accent font-semibold hover:underline cursor-pointer transition-colors duration-150 active:scale-95"
                title="Open full tech stack & tools drawer"
              >
                +40 More ↗
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hero Side Image */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.38, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center relative"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 blur-3xl -z-10"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(194, 157, 104, 0.15) 0%, transparent 70%)',
            }}
          />

          <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex items-center justify-center">
            <Image
              src="/images/header.png"
              alt="Arnel Baylon - Software Engineer"
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 640px) 280px, 340px"
              className="w-full h-full object-contain filter drop-shadow-md dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)] select-none pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </motion.div>

      </div>

      {/* ── 4-Metric Milestone Stats Ribbon (Tactile Cards directly below Hero) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xl:gap-3.5 mt-8 pt-1">
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
            className="group block p-3.5 rounded-2xl bg-muted/40 hover:bg-muted/70 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-border/40 hover:border-accent/40 transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-2xs"
          >
            <div className="font-mono text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
              <span>{m.value}</span>
              <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">↗</span>
            </div>
            <div className="text-xs font-semibold text-foreground mt-1">
              {m.label}
            </div>
            <div className="text-[11.5px] text-muted-foreground truncate mt-0.5">
              {m.sub}
            </div>
          </a>
        ))}
      </div>
    </header>
  )
}
export default ATSResumeHeader
