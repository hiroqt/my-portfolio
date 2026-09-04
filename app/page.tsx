'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { SimpleSideNav } from '@/components/ui/SimpleSideNav'
import { ATSResumeHeader } from '@/components/sections/ATSResumeHeader'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'

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

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSocialsOpen, setIsSocialsOpen] = useState(false)

  // ── Ensure portfolio always opens at the Hero section, preventing browser auto-scroll / stale hash jumping to Experience ──
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      const hash = window.location.hash
      // If opened cleanly or with stale #experience / #hero / #about from past navigation or autocomplete
      if (!hash || hash === '#experience' || hash === '#hero' || hash === '#about') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        if (hash === '#experience') {
          window.history.replaceState(null, '', window.location.pathname)
        }
      }
    }
  }, [])

  const handleToggleChat = () => {
    setIsSocialsOpen(false)
    setIsChatOpen((prev) => !prev)
  }

  const handleToggleSocials = () => {
    setIsChatOpen(false)
    setIsSocialsOpen((prev) => !prev)
  }

  const isPanelOpen = isChatOpen || isSocialsOpen

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased relative overflow-x-hidden">
      {/* ── Ambient 3D Dot Wave Background (Deferred, Zero-Allocation Particle Canvas) ── */}
      <DotWaveBackground />

      {/* ── Clean Floating Side Navigation (Outside Container & Cards) with AI Chat & Socials ── */}
      <SimpleSideNav
        isChatOpen={isChatOpen}
        onToggleChat={handleToggleChat}
        isSocialsOpen={isSocialsOpen}
        onToggleSocials={handleToggleSocials}
      />

      {/* ── Unfocus Dismiss Overlay (Clicking anywhere on unfocused content closes open panel) ── */}
      {isPanelOpen && (
        <div
          onClick={() => {
            setIsChatOpen(false)
            setIsSocialsOpen(false)
          }}
          className="hidden lg:block fixed inset-0 z-30 cursor-pointer bg-black/5 dark:bg-black/20 backdrop-blur-[1px] transition-opacity duration-500"
          title="Click to close panel and refocus page"
          aria-label="Close panel and refocus page"
        />
      )}

      {/* ── Main Content Container (Smoothly shifts to the right and unfocuses when AI Chat or Socials extends) ── */}
      <main
        id="main-content"
        className={`relative z-10 min-h-screen pt-6 sm:pt-10 pb-28 lg:pb-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isPanelOpen
            ? 'lg:translate-x-[260px] xl:translate-x-[300px] 2xl:translate-x-[340px] opacity-40 dark:opacity-30 blur-[2px] scale-[0.985] select-none pointer-events-none'
            : 'translate-x-0 opacity-100 blur-0 scale-100 pointer-events-auto'
        }`}
      >
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-12 space-y-4">
          
          {/* 00 — Bespoke Editorial Hero & Telemetry HUD */}
          <ATSResumeHeader />

          {/* 01 — Flagship Systems Showcase (Pixel Crew + 3 Top Featured Architectures) */}
          <FeaturedProjectsSection />

          {/* 02 — Work Experience & Production Track Record */}
          <ExperienceSection />

          {/* 03 — Technical Arsenal & Core Competencies */}
          <SkillsSection />

          {/* 04 — Verified Certifications & Credly Accreditations */}
          <CertificationsSection />

          {/* 05 — Academic Education & Degree */}
          <EducationSection />

          {/* 06 — Photographic Artifact Studio & Milestones */}
          <GallerySection />

          {/* 07 — Direct Contact & Channels */}
          <ContactSection />

        </div>
      </main>
    </div>
  )
}
