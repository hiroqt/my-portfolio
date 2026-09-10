'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaHome,
  FaTerminal,
  FaCode,
  FaBriefcase,
  FaLayerGroup,
  FaCertificate,
  FaGraduationCap,
  FaImages,
  FaPaperPlane,
  FaSun,
  FaMoon,
  FaFilePdf,
  FaShareAlt,
  FaStar,
  FaQuestionCircle,
  FaQuoteRight,
  FaArrowRight,
  FaKeyboard,
} from 'react-icons/fa'
import { FaSpotify } from 'react-icons/fa6'
import { useTheme } from '../ThemeProvider'
import { HiSparkles } from 'react-icons/hi2'
import { AIChatBubble } from './AIChatBubble'
import { SocialsBubble } from './SocialsBubble'
import { TechStackBubble } from './TechStackBubble'
import { MobileFAB } from './MobileFAB'

interface NavItem {
  id: string
  label: string
  number: string
  icon: React.ComponentType<{ className?: string }>
}

const techNavItems: NavItem[] = [
  { id: 'hero', label: 'Overview', number: '00', icon: FaHome },
  { id: 'projects', label: 'Systems & Work', number: '01', icon: FaCode },
  { id: 'experience', label: 'Experience', number: '02', icon: FaBriefcase },
  { id: 'certifications', label: 'Certifications', number: '03', icon: FaCertificate },
  { id: 'education', label: 'Education', number: '04', icon: FaGraduationCap },
  { id: 'gallery', label: 'Artifact Studio', number: '05', icon: FaImages },
  { id: 'contact', label: 'Get in Touch', number: '06', icon: FaPaperPlane },
  { id: 'typing', label: 'Typing Lab', number: '07', icon: FaKeyboard },
]

const clientNavItems: NavItem[] = [
  { id: 'hero', label: 'Overview', number: '00', icon: FaStar },
  { id: 'capabilities', label: 'Services', number: '01', icon: FaLayerGroup },
  { id: 'projects', label: 'Work', number: '02', icon: FaBriefcase },
  { id: 'testimonials', label: 'Reviews', number: '03', icon: FaQuoteRight },
  { id: 'faq', label: 'FAQ', number: '04', icon: FaQuestionCircle },
  { id: 'contact', label: 'Contact', number: '05', icon: FaPaperPlane },
]

interface SimpleSideNavProps {
  isChatOpen?: boolean
  onToggleChat?: () => void
  isSocialsOpen?: boolean
  onToggleSocials?: () => void
  isStackOpen?: boolean
  onToggleStack?: () => void
  viewMode?: 'tech' | 'client'
  onToggleViewMode?: () => void
  showDesktopTechRail?: boolean
  isMusicOpen?: boolean
  onToggleMusic?: () => void
  isMusicPlaying?: boolean
}

export function SimpleSideNav({
  isChatOpen,
  onToggleChat,
  isSocialsOpen,
  onToggleSocials,
  isStackOpen,
  onToggleStack,
  viewMode = 'tech',
  onToggleViewMode,
  showDesktopTechRail = false,
  isMusicOpen = false,
  onToggleMusic,
  isMusicPlaying = false,
}: SimpleSideNavProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState('hero')
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [internalChatOpen, setInternalChatOpen] = useState(false)
  const [internalSocialsOpen, setInternalSocialsOpen] = useState(false)
  const [internalStackOpen, setInternalStackOpen] = useState(false)

  const isClient = viewMode === 'client'
  const navItems = isClient ? clientNavItems : techNavItems

  const chatOpen = isChatOpen !== undefined ? isChatOpen : internalChatOpen
  const toggleChat = onToggleChat || (() => setInternalChatOpen((prev) => !prev))

  const socialsOpen = isSocialsOpen !== undefined ? isSocialsOpen : internalSocialsOpen
  const toggleSocials = onToggleSocials || (() => setInternalSocialsOpen((prev) => !prev))

  const stackOpen = isStackOpen !== undefined ? isStackOpen : internalStackOpen
  const toggleStack = onToggleStack || (() => setInternalStackOpen((prev) => !prev))

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll spy to detect active section & dynamic header scroll state
  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 240
      setIsScrolled(window.scrollY > 20)
      const sectionIds = navItems.map((n) => n.id)

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          ticking = false
          return
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero')
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Defer initial calculation until after initial paint to prevent forced reflow
    const rafId = window.requestAnimationFrame(updateActiveSection)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [navItems])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    if (id === 'hero' || id === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', window.location.pathname)
      }
      setActiveSection('hero')
      return
    }

    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `#${id}`)
      }
      setActiveSection(id)
    }
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {/* ── Client Mode Desktop Floating Top Island Navbar (Executive Client Perspective) ── */}
      {/* ── Client Mode Supaste Notch Navbar (Desktop lg+) ── */}
      {isClient && (
        <header
          aria-label="Main Navigation"
          className="hidden lg:flex fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none transition-all duration-300"
        >
          <nav
            className="pointer-events-auto relative flex items-center justify-between gap-8 xl:gap-10 px-6 py-2.5 bg-black text-white rounded-b-[18px] border-b border-x border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Left Notch Ear (Inverted Corner SVG from Supaste) */}
            <div className="absolute top-0 -left-[20px] w-5 h-5 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 20 20" className="w-5 h-5 fill-black" style={{ transform: 'rotate(90deg)' }}>
                <path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" />
              </svg>
            </div>

            {/* Right Notch Ear (Inverted Corner SVG from Supaste) */}
            <div className="absolute top-0 -right-[20px] w-5 h-5 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 20 20" className="w-5 h-5 fill-black">
                <path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" />
              </svg>
            </div>

            {/* Left: App Icon & Brand */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg pr-1"
            >
              <div className="relative w-[30px] h-[30px] rounded-[8px] overflow-hidden shrink-0 ring-1 ring-white/20 bg-zinc-900">
                <Image
                  src="/images/me.jpg"
                  alt="Arnel Baylon"
                  fill
                  sizes="30px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Arnel Baylon
                </span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
              </div>
            </a>

            {/* Center: Navigation Links (Supaste style: 14px, opacity 0.6, hover: opacity 1.0, tracking -0.02em) */}
            <div className="flex items-center gap-6">
              {clientNavItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-[14px] font-medium tracking-tight transition-all duration-150 cursor-pointer select-none ${
                      isActive
                        ? 'text-white font-semibold opacity-100'
                        : 'text-white/60 hover:text-white hover:opacity-100'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </div>

            {/* Right: Actions Cluster */}
            <div className="flex items-center gap-3">
              {/* Ask AI Advisor Button */}
              <button
                type="button"
                onClick={toggleChat}
                aria-label="Ask Arnel's AI Assistant"
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer ${
                  chatOpen
                    ? 'bg-amber-400 text-black shadow-xs'
                    : 'text-white/70 hover:text-white bg-white/10 hover:bg-white/15'
                }`}
                title="Ask Arnel's AI Assistant"
              >
                <HiSparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI</span>
              </button>

              {/* Developer Mode Switcher */}
              {onToggleViewMode && (
                <button
                  type="button"
                  onClick={onToggleViewMode}
                  aria-label="Switch to Developer Mode"
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/15 transition-all duration-150 active:scale-95 cursor-pointer"
                  title="Switch to Developer Mode"
                >
                  <FaCode className="w-3 h-3 text-amber-400 transition-transform group-hover:scale-110" />
                  <span className="hidden xl:inline tracking-tight">Developer View</span>
                  <span className="xl:hidden tracking-tight">Dev</span>
                </button>
              )}

              {/* Spotify Music Button */}
              {onToggleMusic && (
                <button
                  type="button"
                  onClick={onToggleMusic}
                  aria-label="Toggle Spotify Music"
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer ${
                    isMusicOpen
                      ? 'bg-[#1DB954]/25 text-[#1DB954] ring-1 ring-[#1DB954]/40'
                      : isMusicPlaying
                      ? 'bg-[#1DB954]/15 text-[#1DB954]'
                      : 'text-white/70 hover:text-white bg-white/10 hover:bg-white/15'
                  }`}
                  title={isMusicOpen ? 'Close Spotify Player' : "Open Spotify Player (Drake - B's on the Table)"}
                >
                  <FaSpotify className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span className="hidden xl:inline tracking-tight">{isMusicPlaying ? "B's on the Table" : 'Spotify'}</span>
                  <span className="xl:hidden tracking-tight">Music</span>
                  {isMusicPlaying && (
                    <span className="flex items-end gap-[1.5px] h-3 ml-0.5 pb-0.5" aria-hidden="true">
                      <span className="w-[1.5px] h-2 bg-[#1DB954] rounded-full animate-pulse" />
                      <span className="w-[1.5px] h-3 bg-[#1DB954] rounded-full animate-pulse [animation-delay:0.15s]" />
                      <span className="w-[1.5px] h-1.5 bg-[#1DB954] rounded-full animate-pulse [animation-delay:0.3s]" />
                    </span>
                  )}
                </button>
              )}

              {/* Primary "Let's Talk" CTA Button (Supaste exact style: white background, black text, 8px radius, font-semibold 12px) */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-white text-black hover:bg-white/90 font-semibold text-xs tracking-tight shadow-sm active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <FaArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </nav>
        </header>
      )}

      {/* ── Client Mode Supaste Mobile Notch Header Bar ── */}
      {isClient && (
        <header
          aria-label="Mobile Header"
          className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 py-2.5 bg-black text-white rounded-b-[18px] border-b border-white/[0.12] shadow-xl select-none"
        >
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative w-6 h-6 rounded-[6px] overflow-hidden shrink-0 ring-1 ring-white/20 bg-zinc-900">
              <Image
                src="/images/me.jpg"
                alt="Arnel Baylon"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-white">
              Arnel Baylon
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleChat}
              aria-label="Open AI Project Advisor"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[11px] font-semibold transition-colors cursor-pointer ${
                chatOpen ? 'bg-amber-400 text-black' : 'text-white/80 bg-white/10'
              }`}
            >
              <HiSparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>AI</span>
            </button>

            {onToggleViewMode && (
              <button
                type="button"
                onClick={onToggleViewMode}
                aria-label="Switch to Developer Mode"
                className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[11px] font-semibold text-white/80 bg-white/10 transition-colors cursor-pointer"
              >
                <FaCode className="w-2.5 h-2.5 text-amber-400" />
                <span>Dev</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-3 py-1 rounded-[6px] bg-white text-black font-semibold text-[11px] shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              Let&apos;s Talk
            </a>
          </div>
        </header>
      )}

      {/* ── Developer Mode Desktop Floating Side Navigation Rail (Outside Container & Cards) ── */}
      {!isClient && showDesktopTechRail && (
        <nav
          aria-label="Desktop Side Navigation"
          className="hidden lg:flex fixed left-3 xl:left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
        >
          <div className="p-1.5 rounded-2xl bg-background/80 dark:bg-[#131416]/80 backdrop-blur-xl shadow-xs flex flex-col items-center gap-1">
            
            {/* ── Primary View Mode Switcher Button (At Very Top of Sidebar Rail) ── */}
            {onToggleViewMode && (
              <>
                <button
                  type="button"
                  onClick={onToggleViewMode}
                  aria-label="Switch to Client View"
                  className="group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 active:scale-95 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-white/[0.06]"
                >
                  <FaTerminal className="w-3.5 h-3.5 text-accent transition-transform duration-200 group-hover:scale-110" />

                  {/* Subtle attention beacon when on developer mode */}
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent animate-pulse shadow-xs" />

                  {/* Floating Tooltip with clear mode description */}
                  <span
                    role="tooltip"
                    className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-foreground text-background font-sans text-xs font-semibold shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-2"
                  >
                    <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent font-mono text-[10px] font-bold">
                      DEV VIEW
                    </span>
                    <span>Switch to Client View (User-Friendly Overview)</span>
                  </span>
                </button>

                {/* Mode Divider */}
                <div className="w-5 h-px bg-muted my-0.5" />
              </>
            )}

            {/* Main Section Links for Tech Mode */}
            {navItems.map((item) => {
              const isActive = activeSection === item.id && !stackOpen && !chatOpen && !socialsOpen
              const IconComponent = item.icon

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-label={`${item.number} ${item.label}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {/* Active Indicator Spring Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="sideNavActivePill"
                      className="absolute inset-0 rounded-xl bg-accent/15 dark:bg-accent/25 border border-accent/35 dark:border-accent/45 shadow-xs -z-10"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.05 }
                          : { type: 'spring', stiffness: 420, damping: 32 }
                      }
                    />
                  )}

                  <IconComponent
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isActive
                        ? 'text-accent scale-110'
                        : 'group-hover:scale-105'
                    }`}
                  />

                  {/* Floating Tooltip on Hover */}
                  <span
                    role="tooltip"
                    className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5"
                  >
                    <span className="text-accent font-bold">{item.number}</span>
                    <span>{item.label}</span>
                  </span>
                </a>
              )
            })}

            {/* Minimal Divider */}
            <div className="w-5 h-px bg-border/40 my-1" />

            {/* ── Tech Stack & Arsenal Button (Tech Mode) ── */}
            <button
              type="button"
              onClick={toggleStack}
              aria-label="Toggle Tech Stack & Arsenal"
              aria-expanded={stackOpen}
              className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 active:scale-95 cursor-pointer ${
                stackOpen
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05]'
              }`}
            >
              <FaLayerGroup
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  stackOpen ? 'scale-110 text-accent' : 'group-hover:scale-110'
                }`}
              />

              {/* Floating Tooltip */}
              <span
                role="tooltip"
                className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5"
              >
                <span className="text-accent font-bold">40+</span>
                <span>Stack &amp; Arsenal</span>
              </span>
            </button>

            {/* ── AI Chat Copilot Button ── */}
            <button
              type="button"
              onClick={toggleChat}
              aria-label="Toggle yhelAI Copilot Chat"
              aria-expanded={chatOpen}
              className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 active:scale-95 cursor-pointer ${
                chatOpen
                  ? 'bg-accent/15 text-accent'
                  : 'text-accent/90 hover:text-accent hover:bg-accent/10'
              }`}
            >
              <span className="text-xs font-bold leading-none select-none">✦</span>

              {!chatOpen && !stackOpen && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent animate-ping opacity-60" />
              )}

              {/* Floating Tooltip */}
              <span
                role="tooltip"
                className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5"
              >
                <span className="text-accent font-bold">AI</span>
                <span>yhelAI Copilot</span>
              </span>
            </button>

            {/* Spotify Music Button */}
            {onToggleMusic && (
              <button
                type="button"
                onClick={onToggleMusic}
                aria-label="Toggle Spotify Music"
                className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 active:scale-95 cursor-pointer ${
                  isMusicOpen
                    ? 'bg-[#1DB954]/20 text-[#1DB954]'
                    : isMusicPlaying
                    ? 'text-[#1DB954] hover:bg-[#1DB954]/10'
                    : 'text-muted-foreground hover:text-[#1DB954] hover:bg-muted/40 dark:hover:bg-white/[0.05]'
                }`}
              >
                <FaSpotify className={`w-4 h-4 ${isMusicPlaying ? 'text-[#1DB954]' : ''}`} />

                {isMusicPlaying && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping" />
                )}

                {/* Floating Tooltip */}
                <span
                  role="tooltip"
                  className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5"
                >
                  <span className="text-[#1DB954] font-bold">Spotify</span>
                  <span>{isMusicPlaying ? "B's on the Table" : 'Music Player'}</span>
                </span>
              </button>
            )}

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                className="group relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-colors duration-150 active:scale-90 cursor-pointer"
              >
                {resolvedTheme === 'dark' ? (
                  <FaSun className="w-3.5 h-3.5 text-accent transition-transform duration-200 group-hover:rotate-45" />
                ) : (
                  <FaMoon className="w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 group-hover:-rotate-12" />
                )}

                <span
                  role="tooltip"
                  className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50"
                >
                  {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            )}

            {/* Résumé PDF Download */}
            <a
              href="/pdf/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Résumé PDF"
              className="group relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-colors duration-150 active:scale-95 cursor-pointer"
            >
              <FaFilePdf className="w-3.5 h-3.5 text-red-500/80 group-hover:text-red-500 transition-colors" />
              <span
                role="tooltip"
                className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50"
              >
                Download Résumé (PDF)
              </span>
            </a>

            {/* ── Consolidated Social Channels Button ── */}
            <button
              type="button"
              onClick={toggleSocials}
              aria-label="Toggle Social Channels"
              aria-expanded={socialsOpen}
              className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 active:scale-95 cursor-pointer ${
                socialsOpen
                  ? 'bg-accent/25 text-accent border border-accent/45 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05]'
              }`}
            >
              <FaShareAlt
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  socialsOpen ? 'scale-110 text-accent' : 'group-hover:scale-110'
                }`}
              />

              {/* Floating Tooltip */}
              <span
                role="tooltip"
                className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5"
              >
                <span className="text-accent font-bold">5+</span>
                <span>Connect &amp; Socials</span>
              </span>
            </button>
          </div>
        </nav>
      )}

      {/* ── Mobile Simple Floating Bottom Bar ── */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-40 flex items-center justify-between px-2 sm:px-3 py-1.5 rounded-full bg-background/90 dark:bg-[#0d101d]/90 backdrop-blur-xl border border-border/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.18)] pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        {isClient ? (
          // Client Mode Mobile Tabs (5 Clean, Readable Tabs with Icons & Plain-English Labels)
          [
            { id: 'hero', label: 'Overview', icon: FaHome },
            { id: 'capabilities', label: 'Services', icon: FaLayerGroup },
            { id: 'projects', label: 'Work', icon: FaBriefcase },
            { id: 'testimonials', label: 'Reviews', icon: FaQuoteRight },
            { id: 'contact', label: 'Contact', icon: FaPaperPlane },
          ].map((tab) => {
            const isActive = activeSection === tab.id
            const Icon = tab.icon

            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => handleNavClick(e, tab.id)}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 sm:px-3.5 rounded-full font-medium transition-all duration-150 active:scale-95 ${
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobilePill"
                    className="absolute inset-0 rounded-full bg-accent/15 dark:bg-accent/20 -z-10"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.05 }
                        : { type: 'spring', stiffness: 440, damping: 30 }
                    }
                  />
                )}
                <Icon
                  className={`w-4 h-4 transition-transform duration-150 ${
                    isActive ? 'text-accent scale-110' : ''
                  }`}
                />
                <span className="text-[10px] tracking-tight mt-0.5 font-medium">
                  {tab.label}
                </span>
              </a>
            )
          })
        ) : (
          // Developer Mode Mobile Tabs
          [
            { id: 'hero', label: 'Top', icon: FaTerminal, isSection: true },
            { id: 'projects', label: 'Work', icon: FaCode, isSection: true },
            { id: 'mode', label: 'Client', icon: FaBriefcase, isSection: false, isModeToggle: true },
            { id: 'stack', label: 'Stack', icon: FaLayerGroup, isSection: false },
            { id: 'contact', label: 'Contact', icon: FaPaperPlane, isSection: true },
          ].map((tab) => {
            const isModeTab = 'isModeToggle' in tab && tab.isModeToggle
            const isActive = tab.isSection
              ? activeSection === tab.id && !stackOpen && !chatOpen && !socialsOpen
              : !isModeTab && stackOpen
            const Icon = tab.icon

            if (isModeTab) {
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={onToggleViewMode}
                  aria-label="Switch to Client Mode"
                  className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-accent font-semibold transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-[10px] font-mono mt-0.5 tracking-tight font-bold">
                    {tab.label}
                  </span>
                </button>
              )
            }

            if (!tab.isSection) {
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={toggleStack}
                  aria-label="Toggle Tech Stack & Arsenal"
                  aria-expanded={stackOpen}
                  className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMobilePill"
                      className="absolute inset-0 rounded-full bg-accent/15 dark:bg-accent/20 -z-10"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.05 }
                          : { type: 'spring', stiffness: 440, damping: 30 }
                      }
                    />
                  )}
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-accent' : ''
                    }`}
                  />
                  <span className="text-[10px] font-mono mt-0.5 tracking-tight">
                    {tab.label}
                  </span>
                </button>
              )
            }

            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => handleNavClick(e, tab.id)}
                aria-label={tab.label}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full font-medium transition-colors ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobilePill"
                    className="absolute inset-0 rounded-full bg-accent/15 dark:bg-accent/20 -z-10"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.05 }
                        : { type: 'spring', stiffness: 440, damping: 30 }
                    }
                  />
                )}
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-accent' : ''
                  }`}
                />
                <span className="text-[10px] font-mono mt-0.5 tracking-tight">
                  {tab.label}
                </span>
              </a>
            )
          })
        )}

        {/* Mobile Theme Toggle (in Tech Mode) */}
        {!isClient && mounted && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {resolvedTheme === 'dark' ? (
              <FaSun className="w-4 h-4 text-accent" />
            ) : (
              <FaMoon className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-[10px] font-mono mt-0.5 tracking-tight">
              Theme
            </span>
          </button>
        )}
      </nav>

      {/* ── Mobile Floating Action Button (Only in Developer Mode) ── */}
      {!isClient && (
        <MobileFAB
          chatOpen={chatOpen}
          socialsOpen={socialsOpen}
          stackOpen={stackOpen}
          viewMode={viewMode}
          onToggleChat={toggleChat}
          onToggleSocials={toggleSocials}
          onToggleStack={toggleStack}
          onToggleViewMode={onToggleViewMode}
        />
      )}

      {/* ── Floating Tech Stack Drawer (Only in Developer Mode) ── */}
      {!isClient && (
        <TechStackBubble
          isOpen={stackOpen}
          onClose={toggleStack}
        />
      )}

      {/* ── Floating AI Chat Bubble (Available in Both Client & Developer Mode) ── */}
      <AIChatBubble
        isOpen={chatOpen}
        onClose={toggleChat}
        activeSection={activeSection}
        mode={isClient ? 'client' : 'tech'}
      />

      {/* ── Floating "Ask Arnel's AI" Trigger (Client Mode Desktop) ── */}
      {isClient && !chatOpen && (
        <aside aria-label="Client AI Chat Trigger" className="hidden lg:block fixed right-6 xl:right-8 bottom-6 z-40">
          <button
            type="button"
            onClick={toggleChat}
            aria-label="Open AI Project Advisor"
            className="group flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-background/95 dark:bg-[#0c0e18]/95 backdrop-blur-xl border border-amber-500/40 hover:border-amber-500 text-foreground shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:shadow-[0_12px_36px_rgba(245,158,11,0.35)] active:scale-95 transition-[border-color,box-shadow,transform] duration-150 cursor-pointer select-none"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1.5 ring-amber-500/50 shrink-0">
              <Image
                src="/images/me.jpg"
                alt="Arnel Baylon"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <div className="text-left leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-foreground tracking-tight">Ask Arnel&apos;s AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[10px] text-muted-foreground mt-0.5 inline-block">Project &amp; Pricing Advisor</span>
            </div>
            <HiSparkles className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform ml-0.5" />
          </button>
        </aside>
      )}

      {/* ── Floating Socials Bubble (Only in Developer Mode) ── */}
      {!isClient && (
        <SocialsBubble
          isOpen={socialsOpen}
          onClose={toggleSocials}
        />
      )}
    </>
  )
}
