'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'

const educationData = {
  school: 'Cavite State University — Trece Martires Campus',
  degree: 'Bachelor of Science in Information Technology (BS IT)',
  location: 'Cavite, Philippines',
  period: 'Batch 2026',
  highlights: [
    'Software Engineering & Architecture',
    'AI & Context Engineering',
    'Database Engineering & Distributed Systems',
    'Data Structures & Algorithms',
    'Information Security & Auditing',
  ],
}

export function EducationSection() {
  const reduce = useReducedMotion()

  return (
    <section id="education" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">05</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Education
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Degree
        </span>
      </div>

      {/* ── Clean Card (Bryl Lim / Kodekz Style) ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-7 hover:bg-muted/40 transition-colors shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3 border-b border-border/50">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-background border border-border text-foreground shrink-0 mt-0.5">
              <FaGraduationCap className="text-base" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground">
                {educationData.school}
              </h3>
              <p className="text-sm font-medium text-accent mt-0.5">
                {educationData.degree}
              </p>
            </div>
          </div>
          <div className="font-mono text-xs text-muted-foreground sm:text-right pl-9 sm:pl-0">
            <span>{educationData.period} &bull; {educationData.location}</span>
          </div>
        </div>

        <div className="mt-4 pt-1">
          <h4 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
            Key Academic Focus &amp; Coursework:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {educationData.highlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-background border border-border text-foreground"
              >
                <span className="text-accent text-[9px]">✦</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
export default EducationSection

