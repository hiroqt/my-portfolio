'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { SimpleSideNav } from '@/components/ui/SimpleSideNav'
import { ATSResumeHeader } from '@/components/sections/ATSResumeHeader'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ClientBusinessView } from '@/components/sections/ClientBusinessView'
import { ModeTransitionShutter } from '@/components/ui/ModeTransitionShutter'

// ── Performance Optimization: Dynamic Code Splitting for Below-the-Fold & Canvas ──
const DotWaveBackground = dynamic(
  () => import('@/components/ui/DotWaveBackground').then((m) => m.DotWaveBackground),
  { ssr: false }
)

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
      }

      setModeToast({
        mode: nextMode,
        message:
          nextMode === 'client'
            ? '💼 Executive Client View'
            : '💻 Developer & Engineering View',
      })
    }, 180)

    // Dismiss transition shutter
    setTimeout(() => {
      setIsTransitioning(false)
    }, 850)
  }

  const handleToggleChat = () => {
    setIsSocialsOpen(false)
    setIsStackOpen(false)
    setIsChatOpen((prev) => !prev)
  }

  const handleToggleSocials = () => {
    setIsChatOpen(false)
    setIsStackOpen(false)
    setIsSocialsOpen((prev) => !prev)
  }

  const handleToggleStack = () => {
    setIsChatOpen(false)
    setIsSocialsOpen(false)
    setIsStackOpen((prev) => !prev)
  }

  const isPanelOpen = isChatOpen || isSocialsOpen || isStackOpen

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased relative overflow-x-hidden">
      {/* ── Ambient 3D Dot Wave Background (Deferred Particle Canvas) ── */}
      <DotWaveBackground />

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

      {/* ── Clean Floating Side Navigation Rail with Tech Stack, AI Chat, Socials & Mode Switcher ── */}
      <SimpleSideNav
        isChatOpen={isChatOpen}
        onToggleChat={handleToggleChat}
        isSocialsOpen={isSocialsOpen}
        onToggleSocials={handleToggleSocials}
        isStackOpen={isStackOpen}
        onToggleStack={handleToggleStack}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* ── Unfocus Dismiss Overlay (Clicking anywhere on unfocused content closes open panel) ── */}
      {isPanelOpen && (
        <div
          onClick={() => {
            setIsChatOpen(false)
            setIsSocialsOpen(false)
            setIsStackOpen(false)
          }}
          className="hidden lg:block fixed inset-0 z-30 cursor-pointer bg-black/5 dark:bg-black/20 backdrop-blur-[1px] transition-opacity duration-500"
          title="Click to close panel and refocus page"
          aria-label="Close panel and refocus page"
        />
      )}

      {/* ── Main Content Container ── */}
      <main
        id="main-content"
        className={`relative z-10 min-h-screen ${
          viewMode === 'client' ? 'pt-0 pb-16 w-full' : 'pt-4 sm:pt-8 pb-28 lg:pb-20'
        } transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isStackOpen
            ? 'lg:-translate-x-[160px] xl:-translate-x-[200px] 2xl:-translate-x-[240px] opacity-40 dark:opacity-30 blur-[2px] scale-[0.985] select-none pointer-events-none'
            : isChatOpen || isSocialsOpen
            ? 'lg:translate-x-[260px] xl:translate-x-[300px] 2xl:translate-x-[340px] opacity-40 dark:opacity-30 blur-[2px] scale-[0.985] select-none pointer-events-none'
            : 'translate-x-0 opacity-100 blur-0 scale-100 pointer-events-auto'
        }`}
      >
        <AnimatePresence initial={false} mode="wait">
          {viewMode === 'client' ? (
            /* ─────────────────────────────────────────────────────────────
               CLIENT & BUSINESS VIEW: Fullscreen Width & Eye-Pleasing
            ───────────────────────────────────────────────────────────── */
            <motion.div
              key="client-view"
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <ClientBusinessView onSwitchToTechMode={handleToggleViewMode} />
            </motion.div>
          ) : (
            /* ─────────────────────────────────────────────────────────────
               DEVELOPER & TECHNICAL VIEW: Comprehensive Engineering Resume
            ───────────────────────────────────────────────────────────── */
            <motion.div
              key="tech-view"
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12 space-y-4"
            >
              {/* 00 — Bespoke Editorial Hero & Telemetry HUD */}
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
