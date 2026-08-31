'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { InteractiveGallery } from '@/components/ui/InteractiveGallery'

export function GallerySection() {
  const reduce = useReducedMotion()

  return (
    <section id="gallery" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="08"
        badge="VISUAL ARTIFACTS & MILESTONES"
        title={<>Interactive <span className="italic font-light text-accent">Artifact Studio</span></>}
        subtitle="Visual proof of engineering track record: filterable photographic artifacts, AWS hackathon presentations, hospital deployments, and delivered interfaces."
        accent="gallery"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <InteractiveGallery />
      </motion.div>
    </section>
  )
}

