'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SectionGraphicAccentProps {
  section: 'education' | 'experience' | 'projects' | 'skills' | 'certifications' | 'gallery' | 'github' | 'contact'
  className?: string
}

export function SectionGraphicAccent({ section, className = '' }: SectionGraphicAccentProps) {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      {/* 01 — Education Accent */}
      {section === 'education' && (
        <div className="flex items-center gap-4 opacity-40 dark:opacity-30">
          <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10,20 L 40,8 L 70,20 L 40,32 Z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M 25,26 V 34 C 25,37 55,37 55,34 V 26" stroke="currentColor" strokeWidth="1.4" />
            <path d="M 70,20 V 32" stroke="currentColor" strokeWidth="1.4" />
            <line x1="90" y1="20" x2="170" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="170" cy="20" r="3" fill="currentColor" />
          </svg>
        </div>
      )}

      {/* 02 — Experience Accent */}
      {section === 'experience' && (
        <div className="flex items-center gap-3 opacity-40 dark:opacity-30">
          <svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 3" />
            <circle cx="20" cy="20" r="4" fill="currentColor" />
            <circle cx="90" cy="20" r="4" fill="currentColor" />
            <circle cx="160" cy="20" r="4" fill="currentColor" />
            <path d="M 90,20 C 110,5 140,5 160,20" stroke="#34d399" strokeWidth="1.4" />
            <text x="175" y="15" fontSize="8.5" fontFamily="monospace" fill="currentColor">Lead Engineer</text>
          </svg>
        </div>
      )}

      {/* 03 — Projects Accent */}
      {section === 'projects' && (
        <div className="flex items-center gap-3 opacity-50 dark:opacity-40">
          <svg width="240" height="45" viewBox="0 0 240 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="8" width="55" height="30" rx="4" stroke="currentColor" strokeWidth="1.3" />
            <line x1="10" y1="16" x2="65" y2="16" stroke="currentColor" strokeWidth="1" />
            <text x="16" y="28" fontSize="7.5" fontFamily="monospace" fill="currentColor">&lt;App /&gt;</text>
            <path d="M 65,23 L 95,23" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2" />
            <rect x="95" y="8" width="60" height="30" rx="4" stroke="currentColor" strokeWidth="1.3" />
            <text x="102" y="28" fontSize="7.5" fontFamily="monospace" fill="#34d399" fontWeight="bold">API Route</text>
            <path d="M 155,23 L 185,23" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2" />
            <ellipse cx="205" cy="18" rx="14" ry="4" stroke="currentColor" strokeWidth="1.3" />
            <line x1="191" y1="18" x2="191" y2="28" stroke="currentColor" strokeWidth="1.3" />
            <line x1="219" y1="18" x2="219" y2="28" stroke="currentColor" strokeWidth="1.3" />
            <path d="M 191,28 A 14,4 0 0,0 219,28" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </div>
      )}

      {/* 04 — Skills Accent */}
      {section === 'skills' && (
        <div className="flex items-center gap-3 opacity-40 dark:opacity-30">
          <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="80" cy="12" r="5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="80" cy="28" r="5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="140" cy="20" r="6" stroke="#34d399" strokeWidth="1.6" />
            <text x="137" y="23" fontSize="8" fontFamily="monospace" fill="currentColor">✦</text>
            <line x1="25" y1="20" x2="75" y2="12" stroke="currentColor" strokeWidth="1.2" />
            <line x1="25" y1="20" x2="75" y2="28" stroke="currentColor" strokeWidth="1.2" />
            <line x1="85" y1="12" x2="134" y2="20" stroke="currentColor" strokeWidth="1.2" />
            <line x1="85" y1="28" x2="134" y2="20" stroke="currentColor" strokeWidth="1.2" />
            <text x="155" y="24" fontSize="8" fontFamily="monospace" fill="currentColor">Full Stack</text>
          </svg>
        </div>
      )}

      {/* 05 — Certifications Accent */}
      {section === 'certifications' && (
        <div className="flex items-center gap-3 opacity-40 dark:opacity-30">
          <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
            <path d="M 14,20 L 18,24 L 27,15" stroke="#34d399" strokeWidth="1.6" />
            <path d="M 28,28 L 36,36 L 32,26" stroke="currentColor" strokeWidth="1.2" />
            <path d="M 12,28 L 4,36 L 8,26" stroke="currentColor" strokeWidth="1.2" />
            <line x1="45" y1="20" x2="160" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <text x="80" y="14" fontSize="8" fontFamily="monospace" fill="currentColor">Verified Badge</text>
          </svg>
        </div>
      )}

      {/* 06 — GitHub Accent */}
      {section === 'github' && (
        <div className="flex items-center gap-3 opacity-40 dark:opacity-30">
          <svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="20" x2="180" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="3.5" fill="currentColor" />
            <circle cx="80" cy="20" r="3.5" fill="currentColor" />
            <circle cx="160" cy="20" r="4.5" fill="#34d399" />
            <path d="M 20,20 C 35,20 45,8 65,8 L 115,8 C 135,8 145,20 160,20" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2" />
            <circle cx="65" cy="8" r="3" fill="currentColor" />
            <circle cx="115" cy="8" r="3" fill="currentColor" />
            <text x="175" y="16" fontSize="8" fontFamily="monospace" fill="currentColor">main (v2.0)</text>
          </svg>
        </div>
      )}

      {/* 07 — Contact Accent */}
      {section === 'contact' && (
        <div className="flex items-center gap-3 opacity-50 dark:opacity-40">
          <svg width="220" height="40" viewBox="0 0 220 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="10,12 45,20 20,28" stroke="currentColor" strokeWidth="1.4" fill="none" />
            <path d="M 45,20 C 75,20 100,10 130,20" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2" />
            <circle cx="140" cy="20" r="4" fill="#34d399" />
            <text x="152" y="23" fontSize="8" fontFamily="monospace" fill="currentColor">Open for work ✦</text>
          </svg>
        </div>
      )}
    </div>
  )
}
export default SectionGraphicAccent
