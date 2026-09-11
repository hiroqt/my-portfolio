'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { SimpleSideNav } from '@/components/ui/SimpleSideNav'
import { ATSResumeHeader } from '@/components/sections/ATSResumeHeader'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ClientBusinessView } from '@/components/sections/ClientBusinessView'
import { ModeTransitionShutter } from '@/components/ui/ModeTransitionShutter'
import { MusicPlayer } from '@/components/ui/MusicPlayer'

import { DevExecutiveDossier } from '@/components/layout/DevExecutiveDossier'

const CertificationsSection = dynamic(
  () => import('@/components/sections/CertificationsSection').then((m) => m.CertificationsSection),
  { ssr: true }
)

const EducationSection = dynamic(
  () => import('@/components/sections/EducationSection').then((m) => m.EducationSection),
  { ssr: true }
)

const GallerySection = dynamic(
  () => import('@/components/sections/GallerySection').then((m) => m.GallerySection),
  { ssr: true }
)

const TypingSection = dynamic(
  () => import('@/components/sections/TypingSection').then((m) => m.TypingSection),
  { ssr: true }
)

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then((m) => m.ContactSection),
  { ssr: true }
)

interface PortfolioShellProps {
  initialMode?: 'tech' | 'client'
}

export function PortfolioShell({ initialMode = 'tech' }: PortfolioShellProps) {
  const [viewMode, setViewMode] = useState<'tech' | 'client'>(initialMode)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionTarget, setTransitionTarget] = useState<'tech' | 'client'>('client')
  const [modeToast, setModeToast] = useState<{ message: string; mode: 'tech' | 'client' } | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSocialsOpen, setIsSocialsOpen] = useState(false)
  const [isStackOpen, setIsStackOpen] = useState(false)
  const [isMusicOpen, setIsMusicOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const rightScrollRef = useRef<HTMLDivElement>(null)

  // ── Scroll spy for Developer Dossier directory sync ──
  useEffect(() => {
    let ticking = false
    const sectionIds = ['hero', 'projects', 'experience', 'certifications', 'education', 'gallery', 'contact', 'typing']

    const updateActiveSection = () => {
      const rightEl = rightScrollRef.current
      if ((!rightEl || rightEl.scrollTop < 120) && window.scrollY < 120) {
        setActiveSection('hero')
        ticking = false
        return
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 280) {
            setActiveSection(sectionIds[i])
            ticking = false
            return
          }
        }
      }
      setActiveSection('hero')
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const rightEl = rightScrollRef.current
    if (rightEl) {
      rightEl.addEventListener('scroll', handleScroll, { passive: true })
    }
    const rafId = window.requestAnimationFrame(updateActiveSection)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      if (rightEl) {
        rightEl.removeEventListener('scroll', handleScroll)
      }
    }
  }, [viewMode])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    if (id === 'hero' || id === 'about') {
      if (rightScrollRef.current) {
        rightScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
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

  // ── Load saved preference from localStorage with hydration safety ──
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('portfolio_view_mode') as 'tech' | 'client' | null
      if (savedMode === 'tech' || savedMode === 'client') {
        setViewMode((current) => (current !== savedMode ? savedMode : current))
      }
    } catch (e) {
      // Ignore localStorage access errors
    }
  }, [])

  // ── Auto-dismiss mode toast after 2.8 seconds ──
  useEffect(() => {
    if (modeToast) {
      const timer = setTimeout(() => setModeToast(null), 2800)
      return () => clearTimeout(timer)
    }
  }, [modeToast])

  // ── Ensure portfolio always opens at the Hero section, preventing browser auto-scroll ──
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      const hash = window.location.hash
      if (!hash || hash === '#experience' || hash === '#hero' || hash === '#about' || hash === '#skills') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        if (rightScrollRef.current) {
          rightScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }
        setActiveSection('hero')
        if (hash === '#experience' || hash === '#skills') {
          window.history.replaceState(null, '', window.location.pathname)
        }
      }
    }
  }, [])

  const handleToggleViewMode = () => {
    setIsChatOpen(false)
    setIsSocialsOpen(false)
    setIsStackOpen(false)
    setIsMusicOpen(false)

    const nextMode = viewMode === 'tech' ? 'client' : 'tech'
    setTransitionTarget(nextMode)
    setIsTransitioning(true)

    // Flip mode during aperture closed moment
    setTimeout(() => {
      setViewMode(nextMode)
      try {
        localStorage.setItem('portfolio_view_mode', nextMode)
        document.cookie = `portfolio_view_mode=${nextMode}; path=/; max-age=31536000; SameSite=Lax`
      } catch (e) {}

      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
        if (rightScrollRef.current) {
          rightScrollRef.current.scrollTop = 0
        }
      }

      setModeToast({
        mode: nextMode,
        message:
          nextMode === 'client'
            ? '💼 Client View'
            : '💻 Developer View',
      })
    }, 100)

    // Dismiss transition shutter
    setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
  }

  const handleToggleChat = () => {
    setIsSocialsOpen(false)
    setIsStackOpen(false)
    setIsMusicOpen(false)
    setIsChatOpen((prev) => !prev)
  }

  const handleToggleSocials = () => {
    setIsChatOpen(false)
    setIsStackOpen(false)
    setIsMusicOpen(false)
    setIsSocialsOpen((prev) => !prev)
  }

  const handleToggleStack = () => {
    setIsChatOpen(false)
    setIsSocialsOpen(false)
    setIsMusicOpen(false)
    setIsStackOpen((prev) => !prev)
  }

  const handleToggleMusic = () => {
    setIsChatOpen(false)
    setIsSocialsOpen(false)
    setIsStackOpen(false)
    setIsMusicOpen((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased relative overflow-x-hidden">

      {/* ── Cinematic Aperture Shutter Mode Opening Effect ── */}
      <ModeTransitionShutter
        isTransitioning={isTransitioning}
        targetMode={transitionTarget}
      />

      {/* ── Floating Mode Switch Confirmation Toast ── */}
      <AnimatePresence>
        {modeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-foreground text-background shadow-[0_12px_36px_rgba(0,0,0,0.35)] flex items-center gap-2.5 font-medium text-xs border border-border/40 backdrop-blur-md max-w-[92vw] text-center pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span>{modeToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Side Navigation & Modals Rail ── */}
      <SimpleSideNav
        isChatOpen={isChatOpen}
        onToggleChat={handleToggleChat}
        isSocialsOpen={isSocialsOpen}
        onToggleSocials={handleToggleSocials}
        isStackOpen={isStackOpen}
        onToggleStack={handleToggleStack}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        showDesktopTechRail={false}
        isMusicOpen={isMusicOpen}
        onToggleMusic={handleToggleMusic}
        isMusicPlaying={isMusicPlaying}
      />

      {/* ── Native Studio Music Player Modal (Drake - B's on the Table) ── */}
      <MusicPlayer
        isOpen={isMusicOpen}
        onClose={() => setIsMusicOpen(false)}
        onPlayingChange={setIsMusicPlaying}
        mode={viewMode}
      />

      {/* ── Main Content Container ── */}
      <main
        id="main-content"
        className={`relative z-10 ${
          viewMode === 'client'
            ? 'min-h-screen pt-0 pb-0 w-full'
            : 'min-h-screen pt-4 sm:pt-6 lg:pt-0 pb-28 lg:pb-16 w-full'
        }`}
      >
        {viewMode === 'client' ? (
          /* ─────────────────────────────────────────────────────────────
             CLIENT & BUSINESS VIEW: Fullscreen Width & Eye-Pleasing
          ───────────────────────────────────────────────────────────── */
          <motion.div
            key="client-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full"
          >
            <ClientBusinessView
              onSwitchToTechMode={handleToggleViewMode}
              onOpenChat={handleToggleChat}
            />
          </motion.div>
        ) : (
          /* ─────────────────────────────────────────────────────────────
             DEVELOPER & TECHNICAL VIEW: Asymmetric Executive Engineering Studio
             (Desktop: 2 columns [Left Dossier + Right Stage], with full-width Typing Lab below)
          ───────────────────────────────────────────────────────────── */
          <motion.div
            key="tech-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
          >
              {/* ── Top Split: Left Sticky Executive Dossier + Right Main Systems Showcase (Only Right Side Scrollable) ── */}
              <div className="lg:h-screen lg:flex lg:items-start lg:gap-10 xl:gap-14 2xl:gap-16">
                {/* ── Left Sticky Executive Dossier (Desktop lg+ fixed) ── */}
                <DevExecutiveDossier
                  activeSection={activeSection}
                  onNavClick={handleNavClick}
                  onOpenStack={handleToggleStack}
                  onOpenChat={handleToggleChat}
                  onToggleViewMode={handleToggleViewMode}
                  viewMode={viewMode}
                  isMusicOpen={isMusicOpen}
                  onToggleMusic={handleToggleMusic}
                  isMusicPlaying={isMusicPlaying}
                  isChatOpen={isChatOpen}
                />

                {/* ── Right Main Engineering Systems Showcase Stage (Only Right Side is Scrollable) ── */}
                <div
                  ref={rightScrollRef}
                  id="right-scroll-pane"
                  className="flex-1 min-w-0 lg:h-full lg:overflow-y-auto pt-4 sm:pt-6 lg:pt-8 pb-16 lg:pb-28 lg:pr-3 space-y-12 sm:space-y-14 lg:space-y-16 scroll-smooth scrollbar-thin"
                >
                  {/* 00 — Editorial Mission & Milestone Stats */}
                  <ATSResumeHeader onOpenStack={() => setIsStackOpen(true)} />

                  {/* 01 — Flagship Systems Showcase (Pixel Crew + Top Featured Architectures) */}
                  <FeaturedProjectsSection />

                  {/* 02 — Work Experience & Production Track Record */}
                  <ExperienceSection />

                  {/* 03 — Verified Certifications & Credly Accreditations */}
                  <CertificationsSection />

                  {/* 04 — Academic Education & Degree */}
                  <EducationSection />

                  {/* 05 — Photographic Artifact Studio & Milestones */}
                  <GallerySection />

                  {/* 06 — Direct Contact & Channels */}
                  <ContactSection />
                </div>
              </div>

              {/* ── FULL-WIDTH SECTION BELOW BOTH LEFT & RIGHT COLUMNS ── */}
              {/* 07 — Mechanical Keystroke Studio & Switch Audio Lab */}
              <div className="hidden md:block pt-12 sm:pt-16 pb-16 sm:pb-20 border-t border-border/40 mt-8 sm:mt-12">
                <TypingSection />
              </div>

              {/* Architectural Colophon Footer */}
              <footer className="pt-8 pb-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
                <div>
                  <span>Designed &amp; Engineered by Arnel Baylon</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Next.js 14 &bull; Tailwind &bull; Motion</span>
                  <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, 'hero')}
                    className="hover:text-accent transition-colors cursor-pointer"
                  >
                    Back to Top ↑
                  </a>
                </div>
              </footer>
            </motion.div>
        )}
      </main>
    </div>
  )
}
