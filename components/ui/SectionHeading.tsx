'use client'

import React from 'react'
import { SectionGraphicAccent } from './SectionGraphicAccent'

export interface SectionHeadingProps {
  id: string
  badge: string
  title: React.ReactNode
  subtitle?: string
  action?: React.ReactNode
  accent?: 'education' | 'experience' | 'projects' | 'skills' | 'certifications' | 'gallery' | 'github' | 'contact'
}

export function SectionHeading({
  id,
  badge,
  title,
  subtitle,
  action,
  accent,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 sm:mb-12">
      {/* Top Meta Row with Badge Pill & Graphic Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-3.5 flex-wrap">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-foreground font-semibold px-3.5 py-1.5 rounded-full bg-muted/80 border border-border backdrop-blur-md shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-accent font-bold">{id}</span>
            <span className="text-muted-foreground/60" aria-hidden="true">•</span>
            <span>{badge}</span>
          </div>
          {accent && <SectionGraphicAccent section={accent} className="hidden sm:block" />}
        </div>
        {action}
      </div>

      {/* Editorial Serif Heading & Subtitle */}
      <div className="mt-4 sm:mt-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal tracking-tight text-foreground leading-[1.18] max-w-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-muted-foreground font-normal leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
