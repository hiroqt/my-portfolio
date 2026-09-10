'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa'

const experiences = [
  {
    id: 'aws',
    year: '2026',
    role: 'AI Solutions Builder & Capstone Winner',
    org: 'Amazon Web Services (AWS)',
    location: 'AWS Office in BGC, Taguig',
    period: '9-Week Intensive Workshop (2026)',
    highlight: 'Awarded "Best Business Impact" at final capstone defense',
    summary:
      'Completed an intensive 9-week enterprise AI and business automation workshop at the AWS Philippines Office in BGC, winning the prestigious "Best Business Impact" award for architecting and defending the FinOps AI Dashboard platform.',
    bullets: [
      'Won the prestigious "Best Business Impact" award at the final capstone presentation after pitching and defending the FinOps AI Dashboard to AWS Enterprise Solutions Architects.',
      'Architected and delivered the hands-on capstone project utilizing Amazon Quick Spaces for automated policy compliance and Quick Flows for instant invoice-to-PO reconciliation triggers.',
      'Engineered bi-directional Google Workspace connectors (Gmail receipt ingestion, Calendar audit deadlines, Sheets live reporting) enabling sub-second automated financial reconciliation.',
      'Completed the 9-week intensive builder curriculum mastering enterprise AI agents, prompt optimization, and cloud solution architecture.',
    ],
    tech: ['Amazon Quick', 'AWS Cloud', 'Quick Spaces & Flows', 'AI Agents', 'FinOps'],
  },
  {
    id: 'hospital',
    year: '2026',
    role: 'Intern Full-Stack Developer (486 Hours)',
    org: 'GEAMH Public Hospital',
    location: 'Cavite, Philippines',
    period: '2026 (486 Hours)',
    highlight: 'Built offline-capable LLM patient triage & queue system',
    summary:
      'Delivered an offline-capable AI-assisted patient queuing and triage system for public hospital operations.',
    bullets: [
      'Architected and deployed a centralized local queuing system with Groq LLM triage integration using Vue.js, PHP, and MySQL—eliminating clinic reception congestion.',
      'Engineered multi-role control panels (Super Admin, Section Heads, Doctor triage consoles), thermal receipt printing upon registration, and waiting room audio-visual monitors.',
      'Collaborated directly with hospital medical section heads to analyze clinical workflows, ensure data privacy compliance, and deliver staff training.',
    ],
    tech: ['Vue.js', 'PHP', 'MySQL', 'Groq LLM', 'Thermal Printer SDK', 'Offline Networking'],
  },
  {
    id: 'vcm',
    year: '2025–26',
    role: 'Lead Full-Stack Architect & Developer',
    org: 'VCM HRIS Academic Capstone',
    location: 'Philippines',
    period: '2025 – 2026',
    highlight: 'QR-verified attendance, statutory payroll & leave system',
    summary:
      'Spearheaded full-lifecycle design, database modeling, and deployment of a QR-verified Human Resource Information System.',
    bullets: [
      'Engineered a QR-code attendance verification module with campus-vicinity validation, eliminating manual paper timekeeping.',
      'Built an automated payroll calculation engine computing Philippine statutory contributions (SSS, PhilHealth, Pag-IBIG), tax withholdings, and instant payslips.',
      'Implemented teacher recruitment portals, online leave request workflows with automatic salary adjustment hooks, and campus announcements.',
    ],
    tech: ['Laravel', 'Livewire', 'PHP', 'MySQL', 'QR Code SDK', 'Payroll Engine'],
  },
  {
    id: 'freelance',
    year: '2025–26',
    role: 'Independent Full-Stack Consultant',
    org: 'Freelance & SaaS Consulting',
    location: 'Remote, Philippines',
    period: '2025 – Present',
    highlight: 'Engineered Present Po SaaS, Tearsize E-Commerce, and agency platforms',
    summary:
      'End-to-end engineering, architecture, and deployment of production web applications and SaaS platforms for clients.',
    bullets: [
      'Architected Present Po (workforce attendance & time-tracking SaaS) with geofenced one-tap logging, AI journaling, and OCR PDF document parsing using Next.js & Supabase.',
      'Developed Tearsize, a high-converting e-commerce storefront for health and wellness products featuring secure payment integration.',
      'Built HiveSync VA, an agency platform with automated social media content syndication and consultation lead capture.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
  },
]

export function ExperienceSection() {
  const reduce = useReducedMotion()
  const [expandedId, setExpandedId] = useState<string | null>('aws')

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="experience" className="py-8 sm:py-10 scroll-mt-20">
      {/* ── Section Header (Clean Typographic Hierarchy) ── */}
      <div className="mb-6 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">02</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Experience
          </h2>
        </div>
        <a
          href="/pdf/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          Full Resume ↗
        </a>
      </div>

      {/* ── Border-Free Soft Timeline Rows (Clean Typography & Whitespace) ── */}
      <div className="space-y-2">
        {experiences.map((job) => {
          const isExpanded = expandedId === job.id

          return (
            <div
              key={job.id}
              className={`p-4 sm:p-5 rounded-2xl transition-[background-color,transform] duration-150 ${
                isExpanded
                  ? 'bg-muted/40 dark:bg-card/60 shadow-2xs'
                  : 'hover:bg-muted/30'
              }`}
            >
              {/* Row Header Bar */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleExpand(job.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleExpand(job.id)
                  }
                }}
                className="grid grid-cols-12 items-baseline gap-2 sm:gap-4 cursor-pointer select-none"
              >
                <div className="col-span-3 sm:col-span-2 font-mono text-[11.5px] text-muted-foreground">
                  {job.year}
                </div>
                <div className="col-span-9 sm:col-span-6 text-[14px] font-medium text-foreground group-hover:text-accent transition-colors flex items-center justify-between sm:justify-start gap-2">
                  <span className={isExpanded ? 'text-accent font-semibold' : ''}>{job.role}</span>
                  <span className="sm:hidden text-xs text-muted-foreground">
                    {isExpanded ? <FaChevronUp className="w-2.5 h-2.5" /> : <FaChevronDown className="w-2.5 h-2.5" />}
                  </span>
                </div>
                <div className="col-span-12 sm:col-span-4 text-[12.5px] text-muted-foreground sm:text-right flex items-center justify-between sm:justify-end gap-2">
                  <span>{job.org}</span>
                  <span className="hidden sm:inline-block text-xs text-muted-foreground opacity-60">
                    {isExpanded ? <FaChevronUp className="w-2.5 h-2.5 text-accent" /> : <FaChevronDown className="w-2.5 h-2.5" />}
                  </span>
                </div>
              </div>

              {/* Expandable Details Drawer */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden mt-4 pt-2 space-y-3"
                  >
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                      {job.summary}
                    </p>

                    <ul className="space-y-1.5 pl-1" aria-label={`Achievements at ${job.org}`}>
                      {job.bullets.map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="text-xs sm:text-[13px] leading-relaxed text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-accent text-[10px] shrink-0 mt-0.5" aria-hidden="true">
                            ✦
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-muted/60 dark:bg-white/[0.04] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default ExperienceSection

