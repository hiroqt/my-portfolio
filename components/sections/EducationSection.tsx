'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionCardWatermark } from '@/components/ui/SectionCardWatermark'

const educationData = {
  school: 'Cavite State University — Trece Martires Campus',
  degree: 'Bachelor of Science in Information Technology (BS IT)',
  location: 'Philippines',
  period: 'Batch 2026',
  highlights: [
    'Information Technology Foundations',
    'Full-Stack Systems Architecture',
    'AI & Context Engineering',
    'Database Engineering & Distributed Systems',
    'Data Structures & Algorithms',
    'Information Security & System Auditing'
  ],
}

export function EducationSection() {
  const reduce = useReducedMotion()

  return (
    <section id="education" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="07"
        badge="ACADEMIC BACKGROUND"
        title={<>Formal <span className="italic font-light text-accent">Education &amp; Degree</span></>}
        subtitle="Foundational training in computer science, software engineering, and modern distributed systems."
        accent="education"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl border border-border/70 bg-muted/40 p-6 sm:p-8 backdrop-blur-xs hover:border-accent/40 transition-all duration-300 shadow-sm overflow-hidden group"
      >
        <SectionCardWatermark variant="education" className="right-4 bottom-2" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3 border-b border-border/40">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                <FaGraduationCap className="text-xl" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors">
                  {educationData.school}
                </h3>
                <p className="text-sm sm:text-base font-medium text-accent mt-0.5">
                  {educationData.degree}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground shrink-0 mt-2 sm:mt-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border">
                <FaCalendarAlt className="text-accent" aria-hidden="true" />
                <span className="tabular-nums font-semibold">{educationData.period}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border">
                <FaMapMarkerAlt className="text-accent" aria-hidden="true" />
                <span>{educationData.location}</span>
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3 font-semibold">
              Core Academic Focus &amp; Coursework:
            </h4>
            <div className="flex flex-wrap gap-2">
              {educationData.highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-full bg-background/90 border border-border/70 text-foreground group-hover:border-accent/40 transition-colors shadow-2xs"
                >
                  <span className="text-accent text-[10px]" aria-hidden="true">✦</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
