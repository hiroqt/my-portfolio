'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { InteractiveGallery } from '@/components/ui/InteractiveGallery'

export function GallerySection() {
  const reduce = useReducedMotion()

  return (
    <section id="gallery" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">06</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Artifact Gallery &amp; Milestones
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Visual Proof
        </span>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="w-full"
      >
        <InteractiveGallery />
      </motion.div>
    </section>
  )
}
export default GallerySection


