'use client'

import React, { useState, useEffect } from 'react'
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
} from 'react-icons/fa'
import { useTheme } from '../ThemeProvider'
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
]

const clientNavItems: NavItem[] = [
  { id: 'hero', label: 'Overview', number: '00', icon: FaStar },
  { id: 'projects', label: 'Projects', number: '01', icon: FaBriefcase },
  { id: 'testimonials', label: 'Client Reviews', number: '02', icon: FaQuoteRight },
  { id: 'faq', label: 'FAQ', number: '03', icon: FaQuestionCircle },
  { id: 'contact', label: 'Contact', number: '04', icon: FaPaperPlane },
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
}: SimpleSideNavProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState('hero')
  const [mounted, setMounted] = useState(false)
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

  // Scroll spy to detect active section (RAF-throttled to eliminate layout thrashing & forced reflows)
  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 240
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
      {/* ── Desktop Floating Side Navigation Rail (Outside Container & Cards) ── */}
      <nav
        aria-label="Desktop Side Navigation"
        className="hidden lg:flex fixed left-3 xl:left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
      >
        <div className="p-1.5 rounded-2xl bg-background/80 dark:bg-[#0c0e18]/80 backdrop-blur-xl border border-border/60 dark:border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col items-center gap-1">
          
          {/* ── Primary View Mode Switcher Button (At Very Top of Sidebar Rail) ── */}
          {onToggleViewMode && (
            <>
              <button
                type="button"
                onClick={onToggleViewMode}
                aria-label={
                  isClient
                    ? 'Switch to Developer & Technical View'
                    : 'Switch to Client View'
                }
                className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 cursor-pointer ${
                  isClient
                    ? 'bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/50 shadow-[0_0_16px_rgba(245,158,11,0.4)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                {isClient ? (
                  <FaBriefcase className="w-3.5 h-3.5 text-amber-500 transition-transform duration-200 group-hover:scale-110" />
                ) : (
                  <FaTerminal className="w-3.5 h-3.5 text-amber-500/90 transition-transform duration-200 group-hover:scale-110" />
                )}

                {/* Subtle attention beacon when on developer mode */}
                {!isClient && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-xs" />
                )}

                {/* Floating Tooltip with clear mode description */}
                <span
                  role="tooltip"
                  className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-foreground text-background font-sans text-xs font-semibold shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-2"
                >
                  <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent font-mono text-[10px] font-bold">
                    {isClient ? 'CLIENT VIEW' : 'DEV VIEW'}
                  </span>
                  <span>
                    {isClient
                      ? 'Switch to Developer Mode (Code & Technical Details)'
                      : 'Switch to Client View (User-Friendly Overview)'}
                  </span>
                </span>
              </button>

              {/* Mode Divider */}
              <div className="w-5 h-px bg-amber-500/30 dark:bg-amber-500/40 my-0.5" />
            </>
          )}

          {/* Main Section Links (Dynamic for Tech vs. Client Mode) */}
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
                className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 cursor-pointer ${
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
                      ? 'text-amber-600 dark:text-amber-400 scale-110'
                      : 'group-hover:scale-105'
                  }`}
                />

                {/* Floating Tooltip on Hover */}
                <span
                  role="tooltip"
                  className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50 flex items-center gap-1.5"
                >
                  {!isClient && <span className="text-accent font-bold">{item.number}</span>}
                  <span>{item.label}</span>
                </span>
              </a>
            )
          })}

          {/* Minimal Divider */}
          <div className="w-5 h-px bg-border/60 dark:bg-white/10 my-1" />

          {/* ── Tech Stack & Arsenal Button (Shown in Tech Mode) ── */}
          {!isClient && (
            <button
              type="button"
              onClick={toggleStack}
              aria-label="Toggle Tech Stack & Arsenal"
              aria-expanded={stackOpen}
              className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 cursor-pointer ${
                stackOpen
                  ? 'bg-accent/25 text-accent border border-accent/45 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
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
          )}

          {/* ── AI Chat Copilot Button (Toggles Floating Chat Bubble) ── */}
          <button
            type="button"
            onClick={toggleChat}
            aria-label="Toggle yhelAI Copilot Chat"
            aria-expanded={chatOpen}
            className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 cursor-pointer ${
              chatOpen
                ? 'bg-accent/25 text-accent border border-accent/45 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                : 'text-amber-500/90 hover:text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            <span className="text-xs font-bold leading-none select-none">✦</span>

            {/* Subtle glow beacon when closed */}
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

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              className="group relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-colors duration-150 cursor-pointer"
            >
              {resolvedTheme === 'dark' ? (
                <FaSun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-200 group-hover:rotate-45" />
              ) : (
                <FaMoon className="w-3.5 h-3.5 text-zinc-700 transition-transform duration-200 group-hover:-rotate-12" />
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
            className="group relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-colors duration-150 cursor-pointer"
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
            className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150 cursor-pointer ${
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

      {/* ── Mobile Simple Floating Bottom Bar ── */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-40 flex items-center justify-between px-3 py-1.5 rounded-full bg-background/90 dark:bg-[#0d101d]/90 backdrop-blur-xl border border-border/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.18)] pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        {/* Core Mobile Tabs Adapted to View Mode */}
        {(isClient
          ? [
              { id: 'hero', label: 'Top', icon: FaStar, isSection: true },
              { id: 'projects', label: 'Work', icon: FaBriefcase, isSection: true },
              { id: 'faq', label: 'FAQ', icon: FaQuestionCircle, isSection: true },
              { id: 'mode', label: 'Dev Mode', icon: FaTerminal, isSection: false, isModeToggle: true },
              { id: 'contact', label: 'Contact', icon: FaPaperPlane, isSection: true },
            ]
          : [
              { id: 'hero', label: 'Top', icon: FaTerminal, isSection: true },
              { id: 'projects', label: 'Work', icon: FaCode, isSection: true },
              { id: 'mode', label: 'Client', icon: FaBriefcase, isSection: false, isModeToggle: true },
              { id: 'stack', label: 'Stack', icon: FaLayerGroup, isSection: false },
              { id: 'contact', label: 'Contact', icon: FaPaperPlane, isSection: true },
            ]
        ).map((tab) => {
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
                aria-label={`Switch to ${isClient ? 'Developer' : 'Executive Client'} Mode`}
                className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-amber-700 dark:text-amber-400 font-semibold transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4 text-amber-700 dark:text-amber-400 animate-pulse" />
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
                    className="absolute inset-0 rounded-full bg-accent/15 dark:bg-accent/25 border border-accent/40 -z-10"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.05 }
                        : { type: 'spring', stiffness: 440, damping: 30 }
                    }
                  />
                )}
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-amber-700 dark:text-amber-400' : ''
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
                  className="absolute inset-0 rounded-full bg-accent/15 dark:bg-accent/25 border border-accent/40 -z-10"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.05 }
                      : { type: 'spring', stiffness: 440, damping: 30 }
                  }
                />
              )}
              <Icon
                className={`w-4 h-4 ${
                  isActive ? 'text-amber-700 dark:text-amber-400' : ''
                }`}
              />
              <span className="text-[10px] font-mono mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </a>
          )
        })}

        {/* Mobile Theme Toggle */}
        {mounted && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {resolvedTheme === 'dark' ? (
              <FaSun className="w-4 h-4 text-amber-400" />
            ) : (
              <FaMoon className="w-4 h-4 text-zinc-700" />
            )}
            <span className="text-[10px] font-mono mt-0.5 tracking-tight">
              Theme
            </span>
          </button>
        )}
      </nav>

      {/* ── Mobile Floating Action Button (FAB Speed Dial) ── */}
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

      {/* ── Floating Tech Stack Drawer (Appears toward sidebar icon on left) ── */}
      <TechStackBubble
        isOpen={stackOpen}
        onClose={toggleStack}
      />

      {/* ── Floating AI Chat Bubble (Appears toward sidebar icon with pointer) ── */}
      <AIChatBubble
        isOpen={chatOpen}
        onClose={toggleChat}
        activeSection={activeSection}
      />

      {/* ── Floating Socials Bubble (Appears toward sidebar icon with pointer) ── */}
      <SocialsBubble
        isOpen={socialsOpen}
        onClose={toggleSocials}
      />
    </>
  )
}
