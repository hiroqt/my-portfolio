'use client'

import React from 'react'
import { Sidebar } from '@/components/ui/Sidebar'
import { PageAmbientBackground } from '@/components/ui/PageAmbientBackground'
import { ATSResumeHeader } from '@/components/sections/ATSResumeHeader'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { PixelCrewSection } from '@/components/sections/PixelCrewSection'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { OtherProjectsSection } from '@/components/sections/OtherProjectsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa'

const footerLinks = [
  { label: 'Email', href: 'mailto:arnelbaylon15@gmail.com', icon: <FaEnvelope aria-hidden="true" /> },
  { label: 'GitHub', href: 'https://github.com/hiroqt', icon: <FaGithub aria-hidden="true" /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnel-baylon-b05233189', icon: <FaLinkedin aria-hidden="true" /> },
  { label: 'Facebook', href: 'https://www.facebook.com/arnel.baylon.1650', icon: <FaFacebook aria-hidden="true" /> },
  { label: 'Instagram', href: 'https://www.instagram.com/yheellll?igsh=MWYxMDZlMzYzNXA2dw', icon: <FaInstagram aria-hidden="true" /> },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased">
      {/* Navigation Drawer / Sidebar */}
      <Sidebar />

      {/* 00 — ATS Header & Personal Details */}
      <ATSResumeHeader />

      {/* Main Semantic Content Container (WCAG Landmark) */}
      <main
        id="main-content"
        tabIndex={-1}
        className="relative max-w-[1700px] 2xl:max-w-[1850px] mx-auto px-4 sm:px-8 md:px-12 xl:px-16 pb-16 pt-8 sm:pb-24 sm:pt-12 outline-none space-y-16 sm:space-y-24"
      >
        {/* Full-Page Ambient Background System */}
        <PageAmbientBackground />

        {/* 01 — Technical Skills & Experience (Zero percentages, mapped years) */}
        <SkillsSection />

        {/* 02 — Verified Certifications (Directly below Skills) */}
        <CertificationsSection />

        {/* 03 — Work Experience & Professional Track Record */}
        <ExperienceSection />

        {/* 04 — Flagship Pixel Crew Autonomous Swarm Architecture Showcase */}
        <PixelCrewSection />

        {/* 05 — Flagship Featured Projects */}
        <FeaturedProjectsSection />

        {/* 06 — Other Notable Projects & Systems */}
        <OtherProjectsSection />

        {/* 07 — Academic Education & Degree */}
        <EducationSection />

        {/* 08 — Visual Artifacts & Interactive Gallery (Image on the last part) */}
        <GallerySection />

        {/* 09 — Contact & Channels */}
        <ContactSection />
      </main>

      {/* Accessible Footer */}
      <footer className="border-t border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-[1700px] 2xl:max-w-[1850px] mx-auto px-4 sm:px-8 md:px-12 xl:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Arnel A. Baylon — Software Engineer &amp; Agentic Developer
          </p>
          <div className="flex gap-4 text-muted-foreground" aria-label="Social links">
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={`${item.label} (opens in new tab)`}
                className="hover:text-accent hover:scale-110 transition-all text-base"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
