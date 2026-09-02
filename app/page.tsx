'use client'

import React from 'react'
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
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased relative">
      {/* ── Ambient 3D Dot Wave Background ── */}
      <DotWaveBackground />

      {/* ── Floating Island Command Rail ── */}
      <Sidebar />

      {/* ── Main Content Container ── */}
      <main id="main-content" className="relative z-10 lg:pl-64 min-h-screen pt-16 lg:pt-4 pb-16">
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
