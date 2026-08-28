'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projectsData } from '@/lib/data/projects'
import Link from 'next/link'

export function OtherProjectsSection() {
  const reduce = useReducedMotion()
  const nonFeaturedProjects = projectsData.filter(p => !p.isFeatured)

  return (
    <section id="other-projects" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="06"
        badge="ADDITIONAL DELIVERABLES"
        title={<>Other Notable <span className="italic font-light text-accent">Systems &amp; Client Apps</span></>}
        subtitle="End-to-end applications built for healthcare facilities, academic capstones, e-commerce brands, and freelancer productivity."
        accent="projects"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {nonFeaturedProjects.map((project, i) => {
          const isLive = project.link && project.link !== '#'

          return (
            <motion.div
              key={project.slug}
              initial={reduce ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative rounded-3xl border border-border/70 bg-muted/40 p-6 sm:p-7 hover:border-accent/40 backdrop-blur-xs transition-all duration-300 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-background border border-border text-muted-foreground font-semibold">
                    {project.type}
                  </span>
                  {isLive && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open live site for ${project.title} (opens in new tab)`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:underline underline-offset-4"
                    >
                      <span>Live Site</span>
                      <FaExternalLinkAlt className="text-[9px]" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors">
                  <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>

                {project.features && project.features.length > 0 && (
                  <ul className="mt-4 space-y-1.5 pt-3 border-t border-border/40" aria-label={`Key features of ${project.title}`}>
                    {project.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">✦</span>
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-background/80 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View full details for ${project.title}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-foreground group-hover:text-accent transition-colors ml-auto"
                >
                  <span>Details</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
