'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTerminal,
  FaSun,
  FaMoon,
  FaFilePdf,
  FaKeyboard,
} from 'react-icons/fa'
import { IoMusicalNotes } from 'react-icons/io5'
import { HiSparkles } from 'react-icons/hi2'
import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiFlutter,
  SiPostgresql,
  SiDocker,
} from 'react-icons/si'
import { useTheme } from '../ThemeProvider'
import { useMusic, CURRENT_TRACK } from '@/lib/music'

interface NavSection {
  id: string
  number: string
  label: string
  badge?: string
}

const navSections: NavSection[] = [
  { id: 'hero', number: '00', label: 'Overview' },
  { id: 'projects', number: '01', label: 'Featured Systems', badge: 'Pixel Crew' },
  { id: 'experience', number: '02', label: 'Track Record', badge: 'Clinical IT' },
  { id: 'certifications', number: '03', label: 'Certifications', badge: '11+ Badges' },
  { id: 'education', number: '04', label: 'Education', badge: 'BSIT' },
  { id: 'gallery', number: '05', label: 'Artifact Studio' },
  { id: 'contact', number: '06', label: 'Direct Line' },
  { id: 'typing', number: '07', label: 'Typing Sandbox', badge: 'Switch Audio' },
]

interface DevExecutiveDossierProps {
  activeSection: string
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void
  onOpenStack?: () => void
  onOpenChat?: () => void
  onToggleViewMode?: () => void
  viewMode?: 'tech' | 'client'
  isMusicOpen?: boolean
  onToggleMusic?: () => void
  isMusicPlaying?: boolean
  isChatOpen?: boolean
}

export function DevExecutiveDossier({
  activeSection,
  onNavClick,
  onOpenStack,
  onOpenChat,
  onToggleViewMode,
  viewMode = 'tech',
  isMusicOpen = false,
  onToggleMusic,
  isMusicPlaying = false,
  isChatOpen = false,
}: DevExecutiveDossierProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('')
  const { isPlaying: isAudioPlaying, headerWaveBars } = useMusic()
  const activePlaying = isAudioPlaying || isMusicPlaying

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      // Format time in Manila (Asia/Manila)
      try {
        const timeString = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        setCurrentTime(timeString)
      } catch {
        setCurrentTime('UTC+8')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 30000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <aside
      aria-label="Executive Developer Dossier"
      className="hidden lg:flex flex-col justify-between w-[320px] xl:w-[360px] 2xl:w-[390px] shrink-0 lg:h-full py-6 lg:py-8 select-none overflow-y-auto scrollbar-none z-20"
    >
      {/* ── TOP SEGMENT: Identity, Live Telemetry & Narrative ── */}
      <div className="space-y-4">
        {/* Availability & Telemetry Banner (borderless, gentle spacing) */}
        <div className="flex items-center justify-between text-[11px] font-mono pb-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-foreground/90 font-medium">Available for Work</span>
          </div>
          <span className="text-muted-foreground text-[10.5px]">
            Manila, PH {currentTime ? `• ${currentTime}` : '• UTC+8'}
          </span>
        </div>

        {/* Name, Headline & Portrait in Asymmetric Lockup */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="space-y-1">
            <a
              href="#hero"
              onClick={(e) => onNavClick(e, 'hero')}
              className="inline-block font-supreme text-2xl xl:text-3xl font-bold tracking-tight text-foreground hover:text-accent transition-colors"
            >
              Arnel Baylon
            </a>
            <p className="text-[13px] font-mono text-muted-foreground font-medium leading-relaxed">
              Software Engineer &bull; Agentic Systems
            </p>
          </div>

          {/* Compact Portrait with Warm Subtle Surface */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-muted/60 shadow-xs">
            <Image
              src="/images/header.png"
              alt="Arnel Baylon"
              fill
              sizes="48px"
              className="object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>

        {/* Narrative / Engineering Thesis */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bridging frontier generative AI models with production software engineering.
          Autonomous multi-agent loops, cloud backends, and full-stack systems.
        </p>

        {/* Quick Identity Actions: Switch to Client Mode & Chat */}
        <div className="flex items-center gap-2 pt-1">
          {onToggleViewMode && (
            <button
              type="button"
              onClick={onToggleViewMode}
              title="Switch to Client-Friendly Overview"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-muted/50 hover:bg-muted/80 text-foreground text-xs font-mono transition-colors active:scale-[0.97] cursor-pointer group"
            >
              <FaTerminal className="w-3 h-3 text-accent group-hover:scale-110 transition-transform" />
              <span>Client View</span>
              <span className="text-[10px] text-muted-foreground">↗</span>
            </button>
          )}

          {onOpenChat && (
            <button
              type="button"
              onClick={onOpenChat}
              title={isChatOpen ? 'Close yhelAI Copilot' : 'Open yhelAI Copilot'}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all active:scale-[0.97] cursor-pointer ${
                isChatOpen
                  ? 'bg-accent/25 text-accent ring-1 ring-accent/40 shadow-xs'
                  : 'bg-accent/12 hover:bg-accent/20 text-accent'
              }`}
            >
              <HiSparkles className="w-3.5 h-3.5" />
              <span>Copilot</span>
              {isChatOpen && (
                <span className="flex items-end gap-[1.5px] h-3 ml-0.5 pb-0.5" aria-hidden="true">
                  <span className="w-[1.5px] h-2 bg-accent rounded-full animate-pulse" />
                  <span className="w-[1.5px] h-3 bg-accent rounded-full animate-pulse [animation-delay:0.15s]" />
                  <span className="w-[1.5px] h-1.5 bg-accent rounded-full animate-pulse [animation-delay:0.3s]" />
                </span>
              )}
            </button>
          )}

          {onToggleMusic && (
            <button
              type="button"
              onClick={onToggleMusic}
              title={isMusicOpen ? 'Close Music Player' : activePlaying ? "Drake - B's on the Table (Playing)" : "Play Drake - B's on the Table"}
              className={`group relative overflow-hidden flex items-center justify-center gap-2 px-3.5 py-1.5 h-[34px] min-w-[80px] rounded-2xl text-xs font-mono transition-all active:scale-[0.97] cursor-pointer shadow-sm border ${
                isMusicOpen || activePlaying
                  ? 'border-emerald-400/50 ring-1 ring-emerald-400/30'
                  : 'border-white/20 dark:border-white/10 hover:border-white/40'
              }`}
            >
              {/* Background cover artwork with slight blur */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <Image
                  src={CURRENT_TRACK.coverSrc}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover scale-125 blur-[2.5px] opacity-75 dark:opacity-65 transition-transform duration-500 group-hover:scale-130"
                  priority
                />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/50 backdrop-blur-[0.5px]" />
              </div>

              {/* Foreground: Music Icon & Realtime Audio Wave Effect */}
              <div className="relative z-10 flex items-center justify-center gap-2">
                <IoMusicalNotes
                  className={`w-3.5 h-3.5 shrink-0 drop-shadow-sm transition-colors ${
                    activePlaying || isMusicOpen
                      ? 'text-emerald-400'
                      : 'text-white/80'
                  }`}
                />

                {/* 4-Bar Realtime Reactive Wave Audio Visualizer */}
                <span
                  className="flex items-end gap-[2.5px] h-3.5 pb-0.5 shrink-0"
                  aria-label="Audio wave effect"
                >
                  {headerWaveBars.map((barVal, idx) => (
                    <span
                      key={idx}
                      className={`w-[2.5px] rounded-full transition-[height] duration-75 ease-out drop-shadow-sm ${
                        activePlaying || isMusicOpen
                          ? 'bg-emerald-400 dark:bg-emerald-300 shadow-[0_0_6px_rgba(52,211,153,0.6)]'
                          : 'bg-white/80'
                      }`}
                      style={{
                        height: activePlaying
                          ? `${Math.max(3, Math.round(barVal * 14))}px`
                          : `${[5, 12, 8, 14][idx]}px`,
                      }}
                    />
                  ))}
                </span>
              </div>
            </button>
          )}

          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors active:scale-90 cursor-pointer"
            >
              {resolvedTheme === 'dark' ? (
                <FaSun className="w-3.5 h-3.5 text-accent" />
              ) : (
                <FaMoon className="w-3.5 h-3.5 text-foreground/70" />
              )}
            </button>
          )}
        </div>

        {/* Quick Typing Sandbox & Mechanical Switch Audition Shortcut */}
        <a
          href="#typing"
          onClick={(e) => onNavClick(e, 'typing')}
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 hover:bg-muted/70 dark:bg-white/[0.02] dark:hover:bg-white/[0.06] border border-border/40 text-xs font-mono transition-all duration-150 active:scale-[0.98] group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FaKeyboard className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-foreground/90 font-medium">Typing Sandbox</span>
          </div>
          <span className="text-[10px] text-accent bg-accent/15 px-2 py-0.5 rounded-md font-semibold group-hover:bg-accent group-hover:text-background transition-colors">
            Switch Audio &rarr;
          </span>
        </a>
      </div>

      {/* ── MIDDLE SEGMENT: Interactive Section Nav Rail (Scroll-Spy) ── */}
      <nav aria-label="Section Navigation" className="py-5 space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70 font-semibold px-3 pb-1">
          Directory
        </div>

        {navSections.map((sec) => {
          const isActive = activeSection === sec.id

          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => onNavClick(e, sec.id)}
              className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-mono transition-colors duration-150 active:scale-[0.98] cursor-pointer ${
                isActive
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              {/* Active Spring Background Indicator (Borderless Tonal Wash) */}
              {isActive && (
                <motion.div
                  layoutId="dossierActiveSectionPill"
                  className="absolute inset-0 rounded-xl bg-muted/70 dark:bg-white/[0.05] -z-10"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.05 }
                      : { type: 'spring', stiffness: 420, damping: 32 }
                  }
                />
              )}

              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[10px] transition-colors ${
                    isActive ? 'text-accent font-bold' : 'text-muted-foreground/50 group-hover:text-muted-foreground'
                  }`}
                >
                  {sec.number}
                </span>
                <span className="tracking-tight">{sec.label}</span>
              </div>

              {sec.badge && (
                <span
                  className={`text-[9.5px] px-2 py-0.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'bg-muted/60 text-muted-foreground/80'
                  }`}
                >
                  {sec.badge}
                </span>
              )}
            </a>
          )
        })}
      </nav>

      {/* ── BOTTOM SEGMENT: Primary Arsenal & Social Connectors (Borderless) ── */}
      <div className="space-y-3.5 pt-2">
        {/* Primary Stack Arsenal Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Primary Arsenal
            </span>
            {onOpenStack && (
              <button
                type="button"
                onClick={onOpenStack}
                className="text-[10.5px] font-mono text-accent hover:underline font-semibold transition-colors active:scale-95 cursor-pointer"
              >
                +40 More ↗
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {[
              { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
              { name: 'Next.js 15', icon: SiNextdotjs, color: 'text-foreground' },
              { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' },
              { name: 'Flutter', icon: SiFlutter, color: 'text-[#02569B]' },
              { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#4169E1]' },
              { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
            ].map((tech) => {
              const Icon = tech.icon
              return (
                <button
                  key={tech.name}
                  type="button"
                  onClick={onOpenStack}
                  title={`Open stack drawer: ${tech.name}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/50 dark:bg-white/[0.03] text-[11.5px] font-mono text-foreground/80 hover:bg-muted/80 dark:hover:bg-white/[0.07] hover:text-foreground transition-colors active:scale-95 cursor-pointer"
                >
                  <Icon className={`w-2.5 h-2.5 ${tech.color}`} />
                  <span>{tech.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Direct Connectors & Colophon */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <a
              href="https://github.com/hiroqt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/60 transition-colors active:scale-90"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/arnel-baylon-b05233189"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/60 transition-colors active:scale-90"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:arnlebaylon15@gmail.com"
              className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/60 transition-colors active:scale-90"
              title="Send Direct Email"
              aria-label="Send Direct Email"
            >
              <FaEnvelope className="w-3.5 h-3.5" />
            </a>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors active:scale-95"
            title="Download Verified Resume PDF"
          >
            <FaFilePdf className="w-3 h-3 text-red-500/80" />
            <span>Resume PDF</span>
          </a>
        </div>
      </div>
    </aside>
  )
}

export default DevExecutiveDossier
