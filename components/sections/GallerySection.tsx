'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DraggableMasonry } from '@/components/ui/DraggableMasonry'

export function GallerySection() {
  const reduce = useReducedMotion()

  return (
    <section id="gallery" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="08"
        badge="VISUAL ARTIFACTS & GALLERY"
        title={<>Interactive <span className="italic font-light text-accent">Artifact Showcase</span></>}
        subtitle="Visual proof of work: drag, swipe, and explore delivered interfaces, civic platforms, and internship presentation artifacts."
        accent="gallery"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-border/70 bg-muted/40 p-4 sm:p-6 backdrop-blur-xs shadow-sm overflow-hidden"
      >
        <div className="mb-4 px-2 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>✦ Interactive Canvas: Drag / Swipe to pan artifacts</span>
          <span className="hidden sm:inline">9+ Deployed Systems &amp; Presentation Moments</span>
        </div>

        <DraggableMasonry />
      </motion.div>
    </section>
  )
}
