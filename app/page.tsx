'use client'

import React, { useState, useEffect } from 'react'
import { Sidebar } from '@/components/ui/Sidebar'
import { DotWaveBackground } from '@/components/ui/DotWaveBackground'
import { ATSResumeHeader } from '@/components/sections/ATSResumeHeader'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const handleCollapseChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ collapsed: boolean }>
      setSidebarCollapsed(customEvent.detail?.collapsed ?? false)
    }

    window.addEventListener('sidebar-collapse-change', handleCollapseChange)
    return () => window.removeEventListener('sidebar-collapse-change', handleCollapseChange)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased relative">
      {/* ── Ambient 3D Dot Wave Background ── */}
      <DotWaveBackground />

      {/* ── Apple-Inspired Floating Command Rail ── */}
      <Sidebar />

      {/* ── Main Content Container (Fluid Padding sync with Sidebar) ── */}
      <main
        id="main-content"
        className={`relative z-10 min-h-screen pt-5 sm:pt-7 lg:pt-5 pb-32 lg:pb-16 transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sidebarCollapsed ? 'lg:pl-[92px]' : 'lg:pl-[288px]'
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

