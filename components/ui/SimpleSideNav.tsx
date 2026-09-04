'use client'

import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
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
} from 'react-icons/fa'
import { useTheme } from '../ThemeProvider'
import { AIChatBubble } from './AIChatBubble'
import { SocialsBubble } from './SocialsBubble'

interface NavItem {
  id: string
  label: string
  number: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview', number: '00', icon: FaTerminal },
  { id: 'projects', label: 'Systems & Work', number: '01', icon: FaCode },
  { id: 'experience', label: 'Experience', number: '02', icon: FaBriefcase },
  { id: 'skills', label: 'Arsenal & Skills', number: '03', icon: FaLayerGroup },
  { id: 'certifications', label: 'Certifications', number: '04', icon: FaCertificate },
  { id: 'education', label: 'Education', number: '05', icon: FaGraduationCap },
  { id: 'gallery', label: 'Artifact Studio', number: '06', icon: FaImages },
  { id: 'contact', label: 'Get in Touch', number: '07', icon: FaPaperPlane },
]

interface SimpleSideNavProps {
  isChatOpen?: boolean
  onToggleChat?: () => void
  isSocialsOpen?: boolean
  onToggleSocials?: () => void
}

export function SimpleSideNav({
  isChatOpen,
  onToggleChat,
  isSocialsOpen,
  onToggleSocials,
}: SimpleSideNavProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [activeSection, setActiveSection] = useState('hero')
  const [mounted, setMounted] = useState(false)
  const [internalChatOpen, setInternalChatOpen] = useState(false)
  const [internalSocialsOpen, setInternalSocialsOpen] = useState(false)

  const chatOpen = isChatOpen !== undefined ? isChatOpen : internalChatOpen
  const toggleChat = onToggleChat || (() => setInternalChatOpen((prev) => !prev))

  const socialsOpen = isSocialsOpen !== undefined ? isSocialsOpen : internalSocialsOpen
  const toggleSocials = onToggleSocials || (() => setInternalSocialsOpen((prev) => !prev))

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240
      const sectionIds = navItems.map((n) => n.id)

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          return
        }
      }
      // If near very top
      if (window.scrollY < 200) {
        setActiveSection('hero')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          {/* Main Section Links */}
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            const IconComponent = item.icon

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-label={`${item.number} ${item.label}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-foreground font-semibold'
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
                  <span className="text-accent font-bold">{item.number}</span>
                  <span>{item.label}</span>
                </span>
              </a>
            )
          })}

          {/* Minimal Divider */}
          <div className="w-5 h-px bg-border/60 dark:bg-white/10 my-1" />

          {/* ── AI Chat Copilot Button (Toggles Floating Chat Bubble) ── */}
          <button
            type="button"
            onClick={toggleChat}
            aria-label="Toggle yhelAI Copilot Chat"
            aria-expanded={chatOpen}
            className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 cursor-pointer ${
              chatOpen
                ? 'bg-accent/25 text-accent border border-accent/45 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                : 'text-amber-500/90 hover:text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            <span className="text-xs font-bold leading-none select-none">✦</span>

            {/* Subtle glow beacon when closed */}
            {!chatOpen && (
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
              className="group relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
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
            className="group relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.05] transition-all duration-200 cursor-pointer"
          >
            <FaFilePdf className="w-3.5 h-3.5 text-red-500/80 group-hover:text-red-500 transition-colors" />
            <span
              role="tooltip"
              className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-foreground text-background font-mono text-[11px] font-medium tracking-wide shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 z-50"
            >
              Download Résumé (PDF)
            </span>
          </a>

          {/* ── Consolidated Social Channels Button (Replaces individual links) ── */}
          <button
            type="button"
            onClick={toggleSocials}
            aria-label="Toggle Social Channels"
            aria-expanded={socialsOpen}
            className={`group relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 cursor-pointer ${
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
              <span>Connect & Socials</span>
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile Simple Floating Bottom Bar (Compact, Not inside content cards) ── */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 max-w-md mx-auto z-40 flex items-center justify-between px-3 py-1.5 rounded-full bg-background/90 dark:bg-[#0d101d]/90 backdrop-blur-xl border border-border/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.18)] pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        {/* Core Mobile Tabs */}
        {[
          { id: 'hero', label: 'Top', icon: FaTerminal },
          { id: 'projects', label: 'Work', icon: FaCode },
          { id: 'experience', label: 'Exp', icon: FaBriefcase },
          { id: 'skills', label: 'Stack', icon: FaLayerGroup },
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
              aria-current={isActive ? 'true' : undefined}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-colors ${
                isActive
                  ? 'text-foreground font-semibold'
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
                  isActive ? 'text-amber-600 dark:text-amber-400' : ''
                }`}
              />
              <span className="text-[10px] font-mono mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </a>
          )
        })}

        {/* Mobile AI Chat Button */}
        <button
          type="button"
          onClick={toggleChat}
          aria-label="Toggle yhelAI Copilot Chat"
          aria-expanded={chatOpen}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-colors cursor-pointer ${
            chatOpen
              ? 'text-accent font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="text-xs font-bold leading-none">✦</span>
          <span className="text-[10px] font-mono mt-0.5 tracking-tight">
            AI
          </span>
        </button>

        {/* Mobile Socials Button */}
        <button
          type="button"
          onClick={toggleSocials}
          aria-label="Toggle Social Channels"
          aria-expanded={socialsOpen}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-colors cursor-pointer ${
            socialsOpen
              ? 'text-accent font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FaShareAlt className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono mt-0.5 tracking-tight">
            Socials
          </span>
        </button>

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
