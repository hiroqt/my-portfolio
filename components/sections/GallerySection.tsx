'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { InteractiveGallery } from '@/components/ui/InteractiveGallery'

export function GallerySection() {
  const reduce = useReducedMotion()

  return (
    <section id="gallery" className="py-8 sm:py-10 lg:py-4 lg:min-h-[calc(100vh-4.5rem)] lg:snap-start scroll-mt-20 lg:scroll-mt-4 flex flex-col justify-start">
      {/* ── Section Header (Clean Typographic Hierarchy) ── */}
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">05</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Artifact Gallery &amp; Milestones
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Selected moments &bull; Drag to explore
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

