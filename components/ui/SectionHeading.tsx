'use client'

import React from 'react'

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
}: SectionHeadingProps) {
  return (
    <div className="mb-8 sm:mb-12 pb-4 border-b border-border/60">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          {/* Main Handwritten Section Title */}
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-handwriting font-bold tracking-wide text-foreground leading-[1.2] max-w-5xl"
            style={{ fontFamily: "'Caveat', 'Dancing Script', 'Pacifico', cursive" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground font-normal leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}
