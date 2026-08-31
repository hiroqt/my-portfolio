'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaTrophy, FaRunning, FaClock, FaExternalLinkAlt, FaRobot, FaGithub } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionCardWatermark } from '@/components/ui/SectionCardWatermark'
import Link from 'next/link'

const featuredProjects = [
  {
    slug: 'finops-ai-dashboard',
    badge: 'WINNER - BEST BUSINESS IMPACT',
    category: 'Amazon Quick Quest BGC',
    title: 'FinOps AI Dashboard — Intelligent Financial Operations',
    summary: 'Awarded Best Business Impact at the final capstone presentation of the 9-Week Amazon Quick Quest Workshop at the AWS Office in BGC, Taguig. Enterprise financial operations platform automating expense review cycles, invoice-to-PO reconciliation, and real-time policy compliance via Amazon Quick Spaces & Flows.',
    image: '/images/finops.jpg',
    imagePosition: 'object-center',
    icon: <FaTrophy className="text-amber-500" aria-hidden="true" />,
    tags: ['Amazon Quick', 'FinOps', 'AWS', 'Quick Spaces', 'AI Agents'],
    link: '/projects/finops-ai-dashboard',
    isExternal: false,
  },
  {
    slug: 'better-trece',
    badge: 'CIVIC OPEN DATA',
    category: 'BetterGov Philippines',
    title: 'Better Trece Martires — Civic Tech & Open Governance',
    summary: 'Open-source civic technology platform unifying DBM GAA national budgets, Commission on Audit health metrics, DPWH infrastructure monitoring, and bilingual citizen service guides.',
    image: '/images/bettertrece.jpg',
    imagePosition: 'object-center',
    icon: <FaExternalLinkAlt className="text-accent" aria-hidden="true" />,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Open Data', 'Civic Tech'],
    link: '/projects/better-trece',
    isExternal: false,
  },
  {
    slug: 'e-buddy',
    badge: 'WINNER - TOP 30',
    category: 'eGov Hackathon 2026',
    title: 'e Buddy — Agentic AI Civic Assistant',
    summary: 'Winner of national eGov Hackathon 2026 (Top 30). Unifies fragmented public services across government agencies using agentic AI loops, EGOV SSO, Face Live Nest biometric verification, and DBM Compass budget analytics.',
    image: '/images/egov.jpg',
    imagePosition: 'object-center',
    icon: <FaTrophy className="text-amber-500" aria-hidden="true" />,
    tags: ['TypeScript', 'Next.js', 'Agentic AI', 'Biometrics', 'Tailwind CSS'],
    link: '/projects/e-buddy',
    isExternal: false,
  },
  {
    slug: 'pacementor',
    badge: 'AI RUNNING COACH',
    category: 'Mobile & Health Tech',
    title: 'PaceMentor — AI Training Coach',
    summary: 'AI-powered running coach with adaptive training plan generation, real-time GPS tracking with auto-pause detection, and bi-directional Strava integration for amateur and competitive runners.',
    image: '/images/pcaementor.jpg',
    imagePosition: 'object-center',
    embedUrl: 'https://appbuildersph.com/embed/apps/pacementor',
    icon: <FaRunning className="text-emerald-500" aria-hidden="true" />,
    tags: ['Flutter', 'Dart', 'AI Engine', 'Strava API', 'iOS & Android'],
    link: '/projects/pacementor',
    isExternal: false,
  },
  {
    slug: 'present-po',
    badge: 'B2B ATTENDANCE SAAS',
    category: 'Productivity & Enterprise',
    title: 'Present Po — Workforce Time-Tracking',
    summary: 'Modern B2B workforce presence and student internship (OJT) platform featuring geofenced tap time-in/out, AI journaling with auto-completion, and OCR PDF document timesheet parsing.',
    image: '/images/presentpo.jpg',
    imagePosition: 'object-center',
    embedUrl: 'https://appbuildersph.com/embed/apps/present-po',
    icon: <FaClock className="text-blue-500" aria-hidden="true" />,
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'AI OCR'],
    link: '/projects/present-po',
    isExternal: false,
  },
]

export function FeaturedProjectsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="projects" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="05"
        badge="FLAGSHIP ARCHITECTURES"
        title={<>Featured <span className="italic font-light text-accent">Software Systems</span></>}
        subtitle="Production platforms spanning national hackathon-winning AI assistants, cross-platform mobile engines, and workforce SaaS."
        accent="projects"
        action={
          <a
            href="https://github.com/hiroqt?tab=repositories"
            target="_blank"
            rel="noreferrer"
            aria-label="View all repositories on GitHub (opens in new tab)"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors px-3.5 py-1.5 rounded-full bg-muted/60 border border-border hover:border-accent/40"
          >
            <span>All Repositories</span>
            <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </a>
        }
      />

      <div className="space-y-8">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-3xl border border-border/70 bg-muted/40 p-6 sm:p-9 hover:border-accent/40 backdrop-blur-xs transition-all duration-300 shadow-sm overflow-hidden group"
          >
            <SectionCardWatermark variant="projects" className="right-4 top-4" />
            <div className="relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-foreground text-background font-semibold">
                      {project.icon}
                      <span>{project.badge}</span>
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-background border border-border text-muted-foreground font-semibold">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {project.embedUrl && (
                  <div className="mt-4 pointer-events-none max-w-sm opacity-90">
                    <iframe
                      src={project.embedUrl}
                      title={`${project.title} votes widget`}
                      width="320"
                      height="60"
                      style={{ border: 0, width: '100%', maxWidth: '320px' }}
                      loading="lazy"
                      scrolling="no"
                    />
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-background border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.isExternal ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View GitHub repository for ${project.title}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-accent hover:underline underline-offset-4"
                    >
                      <span>View on GitHub</span>
                      <FaExternalLinkAlt className="text-[10px] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={project.link}
                      aria-label={`View full project details for ${project.title}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-accent hover:underline underline-offset-4"
                    >
                      <span>Explore Case Study</span>
                      <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Right Image Preview */}
              <div className="lg:col-span-5">
                {project.isExternal ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl overflow-hidden border border-border/60 bg-background/80 shadow-md group/img relative hover:scale-[1.02] transition-transform duration-300"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      className={`w-full h-52 sm:h-72 object-cover ${project.imagePosition || 'object-center'}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold shadow-lg">
                        GitHub Repository ↗
                      </span>
                    </div>
                  </a>
                ) : (
                  <Link
                    href={project.link}
                    className="block rounded-2xl overflow-hidden border border-border/60 bg-background/80 shadow-md group/img relative hover:scale-[1.02] transition-transform duration-300"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      className={`w-full h-52 sm:h-72 object-cover ${project.imagePosition || 'object-center'}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold shadow-lg">
                        View Project ↗
                      </span>
                    </div>
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
