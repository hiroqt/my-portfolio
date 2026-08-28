'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionCardWatermark } from '@/components/ui/SectionCardWatermark'

const experiences = [
  {
    org: 'General Emilio Aguinaldo Memorial Hospital (GEAMH)',
    role: 'Intern Full-Stack Developer (486 Hours)',
    location: 'Philippines',
    period: '2026',
    summary: 'Delivered an offline-capable AI-assisted patient queuing and triage system for public hospital operations.',
    bullets: [
      'Architected and deployed a centralized local queuing system with Groq LLM triage integration using Vue.js, PHP, and MySQL—eliminating clinic reception congestion.',
      'Engineered multi-role control panels (Super Admin, Section Heads, Doctor/Staff triage consoles), thermal receipt printing upon registration, and waiting room audio-visual monitors.',
      'Collaborated directly with hospital medical section heads to analyze clinical workflows, ensure HIPAA/data privacy compliance, and deliver staff training.',
    ],
    tech: ['Vue.js', 'PHP', 'MySQL', 'Groq LLM', 'Thermal Printer SDK', 'Offline Networking'],
  },
  {
    org: 'VCM HRIS Academic Capstone Project',
    role: 'Lead Full-Stack Architect & Developer',
    location: 'Philippines',
    period: '2025 – 2026',
    summary: 'Spearheaded full-lifecycle design, database modeling, and deployment of a QR-verified Human Resource Information System.',
    bullets: [
      'Engineered a QR-code attendance verification module with campus-vicinity validation, eliminating manual paper timekeeping and buddy-punching.',
      'Built an automated payroll calculation engine computing Philippine statutory contributions (SSS, PhilHealth, Pag-IBIG), tax withholdings, and instant payslips.',
      'Implemented teacher recruitment portals, online leave request workflows with automatic salary adjustment hooks, and real-time campus announcements.',
    ],
    tech: ['Laravel', 'Livewire', 'PHP', 'MySQL', 'QR Code SDK', 'Payroll Engine', 'Tailwind CSS'],
  },
  {
    org: 'Freelance Software Development & Consulting',
    role: 'Independent Full-Stack Consultant',
    location: 'Remote, Philippines',
    period: '2025 – Present',
    summary: 'End-to-end engineering, architecture, and deployment of production web applications and SaaS platforms for clients.',
    bullets: [
      'Architected Present Po (workforce attendance & time-tracking SaaS) with geofenced one-tap logging, AI journaling, and OCR PDF document parsing using Next.js & Supabase.',
      'Developed Tearsize, a high-converting e-commerce storefront for health and wellness products featuring secure payment gateway integration.',
      'Built HiveSync VA, an agency platform with automated social media content syndication to blog articles and consultation lead capture.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Stripe / Payments'],
  },
]

export function ExperienceSection() {
  const reduce = useReducedMotion()

  return (
    <section id="experience" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="03"
        badge="PROFESSIONAL TRACK RECORD"
        title={<>Work History &amp; <span className="italic font-light text-accent">Engineering Experience</span></>}
        subtitle="Verifiable production track record spanning hospital IT infrastructure, enterprise HR systems, and independent client consulting."
        accent="experience"
      />

      <div className="space-y-6 sm:space-y-8">
        {experiences.map((job, i) => (
          <motion.div
            key={job.org}
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative rounded-3xl border border-border/70 bg-muted/40 p-6 sm:p-8 hover:border-accent/40 backdrop-blur-xs transition-all duration-300 shadow-sm overflow-hidden group"
          >
            <SectionCardWatermark variant={i === 0 ? "experience-1" : "experience-2"} className="right-3 bottom-3" />
            <div className="relative z-10">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3 border-b border-border/40">
                <div>
                  <h3 className="font-serif font-semibold text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                    <FaBuilding className="text-accent text-lg" aria-hidden="true" />
                    <span>{job.org}</span>
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-accent mt-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                    <span>{job.role}</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground shrink-0">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background border border-border">
                    <FaCalendarAlt className="text-accent" aria-hidden="true" />
                    <span className="tabular-nums">{job.period}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background border border-border">
                    <FaMapMarkerAlt className="text-accent" aria-hidden="true" />
                    <span>{job.location}</span>
                  </span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="mt-4 text-xs sm:text-sm text-foreground/80 font-medium italic">
                {job.summary}
              </p>

              {/* Bulleted Achievements (ATS Standard Action-Result Format) */}
              <ul className="mt-4 space-y-2.5" aria-label={`Achievements at ${job.org}`}>
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="text-accent shrink-0 font-mono text-xs mt-1">✦</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/40">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-background/90 border border-border/80 text-muted-foreground group-hover:border-accent/40 group-hover:text-foreground transition-colors shadow-2xs"
                  >
                    <span className="text-accent text-[9px]" aria-hidden="true">❯</span> {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
