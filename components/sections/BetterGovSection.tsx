'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaLandmark, FaExternalLinkAlt, FaGithub, FaChartLine, FaBookOpen, FaGasPump, FaShieldAlt } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Link from 'next/link'

const betterGovPillars = [
  {
    icon: <FaChartLine className="text-accent text-lg" aria-hidden="true" />,
    title: 'GAA & COA Public Budget Transparency',
    desc: 'Multi-year DBM General Appropriations Act (2020–2026) allocations and Commission on Audit (COA) annual audit report health metrics.',
  },
  {
    icon: <FaBookOpen className="text-accent text-lg" aria-hidden="true" />,
    title: 'Citizen-First Bilingual Service Guides',
    desc: 'Step-by-step instructions, fees, and documentary checklists for Mayor’s business permits, civil registry, and social welfare in EN & FIL.',
  },
  {
    icon: <FaShieldAlt className="text-accent text-lg" aria-hidden="true" />,
    title: 'DPWH Infrastructure & School Directory',
    desc: 'Cavite 1st DEO public works tracking alongside a directory of 60+ DepEd schools with Senior High tracks and strands.',
  },
  {
    icon: <FaGasPump className="text-accent text-lg" aria-hidden="true" />,
    title: 'Real-Time DOE Fuel Price Monitor',
    desc: 'Interactive map and weekly Department of Energy (DOE) pump price benchmarks across 25+ local service stations.',
  },
]

export function BetterGovSection() {
  const reduce = useReducedMotion()

  return (
    <section id="bettergov" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="04"
        badge="CIVIC TECH CORNERSTONE"
        title={<>BetterGov Initiative — <span className="italic font-light text-accent">Better Trece Martires</span></>}
        subtitle="Open-source civic technology platform transforming raw public records into accessible, citizen-first digital tools for Trece Martires City."
        accent="projects"
        action={
          <div className="flex items-center gap-3">
            <a
              href="https://bettertrecemartires.org"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Better Trece Martires live portal (opens in new tab)"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground font-semibold hover:scale-105 transition-all shadow-xs"
            >
              <span>Live Portal</span>
              <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/hiroqt/bettertrece"
              target="_blank"
              rel="noreferrer"
              aria-label="View BetterTrece repository on GitHub (opens in new tab)"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full bg-muted border border-border hover:border-accent/40 transition-colors"
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        }
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl border border-accent/30 bg-gradient-to-b from-muted/60 to-muted/20 p-6 sm:p-10 backdrop-blur-xs overflow-hidden shadow-md group"
      >
        <div className="relative z-10">
          
          {/* Top Banner Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                <FaLandmark className="text-xl" aria-hidden="true" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block">
                  Part of the BetterGov Philippines Initiative
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                  BetterTreceMartires.org
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-background border border-border text-foreground font-semibold">
                Open Source · CC0 1.0 Public Domain
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold">
                Civic Tech
              </span>
            </div>
          </div>

          {/* Screenshot Showcase Frame */}
          <div className="mt-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 bg-background/90 shadow-lg group/img">
            <div className="px-4 py-3 bg-muted/80 border-b border-border/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-muted-foreground truncate">https://bettertrecemartires.org</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-medium hidden sm:inline">
                Live Case Study Portal
              </span>
            </div>
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-muted">
              <img
                src="/images/bettertrece.png"
                alt="Better Trece Martires Civic Tech Portal Case Study Showcase"
                className="w-full h-full object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Description */}
          <p className="mt-8 text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed max-w-4xl">
            Accessing local government information in the Philippines is often fragmented across multiple agency websites and unsearchable PDFs. <strong>Better Trece Martires</strong> unifies verified datasets from PSA, DBM, COA, DPWH, and DOE into a single, high-performance web platform built with modern user experience and accessibility standards.
          </p>

          {/* 4 Core Pillars Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
            {betterGovPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-background/80 border border-border/70 flex flex-col justify-between hover:border-accent/40 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-xl bg-muted border border-border/60">
                    {pillar.icon}
                  </span>
                  <h4 className="font-serif font-semibold text-base sm:text-lg text-foreground">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Technical & Deep Dive Footer */}
          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {['React 19', 'TypeScript', 'Tailwind CSS v4', '@bettergov/kapwa', 'Leaflet OSM', 'Vite', 'i18n (EN/FIL)'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-background border border-border text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/projects/better-trece"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-accent hover:underline underline-offset-4"
              >
                <span>Read Full Case Study</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
