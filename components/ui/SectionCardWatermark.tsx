'use client'

import React from 'react'

export interface SectionCardWatermarkProps {
  variant: 'education' | 'experience-1' | 'experience-2' | 'skills' | 'certifications' | 'contact' | 'projects' | 'bettergov'
  className?: string
}

export function SectionCardWatermark({ variant, className = '' }: SectionCardWatermarkProps) {
  return (
    <div
      className={`absolute pointer-events-none select-none overflow-hidden opacity-[0.07] dark:opacity-[0.09] transition-opacity duration-300 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* 01 — Education: Diploma Scroll & Degree Blueprint */}
      {variant === 'education' && (
        <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 20,40 L 70,15 L 120,40 L 70,65 Z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 45,52 V 70 C 45,78 95,78 95,70 V 52" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 120,40 V 68" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="120" cy="72" r="4" fill="currentColor" />
        </svg>
      )}

      {/* 02 — Experience 1: AI & Context Pipeline */}
      {variant === 'experience-1' && (
        <svg width="150" height="110" viewBox="0 0 150 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="75" cy="55" r="35" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="75" cy="55" rx="45" ry="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          <ellipse cx="75" cy="55" rx="16" ry="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="35" cy="30" r="4" fill="currentColor" />
          <circle cx="115" cy="80" r="4" fill="currentColor" />
          <line x1="35" y1="30" x2="60" y2="45" stroke="currentColor" strokeWidth="1.5" />
          <line x1="90" y1="65" x2="115" y2="80" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}

      {/* 02 — Experience 2: Full-Stack Web & Database */}
      {variant === 'experience-2' && (
        <svg width="150" height="110" viewBox="0 0 150 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="80" height="55" rx="6" stroke="currentColor" strokeWidth="2" />
          <line x1="15" y1="30" x2="95" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="25" cy="22" r="2.5" fill="currentColor" />
          <circle cx="33" cy="22" r="2.5" fill="currentColor" />
          <ellipse cx="115" cy="65" rx="25" ry="8" stroke="currentColor" strokeWidth="2" />
          <line x1="90" y1="65" x2="90" y2="85" stroke="currentColor" strokeWidth="2" />
          <line x1="140" y1="65" x2="140" y2="85" stroke="currentColor" strokeWidth="2" />
          <path d="M 90,85 A 25,8 0 0,0 140,85" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}

      {/* 03 — Projects / Architecture */}
      {variant === 'projects' && (
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="50" height="35" rx="4" stroke="currentColor" strokeWidth="2" />
          <rect x="90" y="20" width="50" height="35" rx="4" stroke="currentColor" strokeWidth="2" />
          <rect x="55" y="70" width="50" height="35" rx="4" stroke="currentColor" strokeWidth="2" />
          <line x1="45" y1="55" x2="80" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <line x1="115" y1="55" x2="80" y2="70" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}

      {/* 04 — BetterGov: Landmark Column & Shield */}
      {variant === 'bettergov' && (
        <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 25,40 L 75,15 L 125,40 Z" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="40" x2="40" y2="90" stroke="currentColor" strokeWidth="2" />
          <line x1="65" y1="40" x2="65" y2="90" stroke="currentColor" strokeWidth="2" />
          <line x1="85" y1="40" x2="85" y2="90" stroke="currentColor" strokeWidth="2" />
          <line x1="110" y1="40" x2="110" y2="90" stroke="currentColor" strokeWidth="2" />
          <rect x="20" y="90" width="110" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}

      {/* 05 — Skills: Neural Constellation Mesh */}
      {variant === 'skills' && (
        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="40" r="6" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="25" r="7" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="85" r="7" stroke="currentColor" strokeWidth="2" />
          <circle cx="170" cy="50" r="8" stroke="currentColor" strokeWidth="2" />
          <circle cx="170" cy="110" r="6" stroke="currentColor" strokeWidth="2" />
          <line x1="36" y1="40" x2="93" y2="25" stroke="currentColor" strokeWidth="1.5" />
          <line x1="36" y1="40" x2="93" y2="85" stroke="currentColor" strokeWidth="1.5" />
          <line x1="107" y1="25" x2="162" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="107" y1="85" x2="162" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="107" y1="85" x2="164" y2="110" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}

      {/* 06 — Certifications: Verified Rosette Stamp */}
      {variant === 'certifications' && (
        <svg width="130" height="120" viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="65" cy="50" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="6 3" />
          <circle cx="65" cy="50" r="22" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 54,50 L 62,58 L 76,42" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 45,75 L 35,105 L 55,95 L 65,110 L 65,82" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M 85,75 L 95,105 L 75,95 L 65,110 L 65,82" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      )}

      {/* 07 — Contact: Radar Wave & Message Plane */}
      {variant === 'contact' && (
        <svg width="180" height="130" viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,40 140,20 80,95" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="140" y1="20" x2="60" y2="60" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 140,20 C 160,35 170,60 160,85" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 140,20 C 150,30 155,50 150,65" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="160" cy="85" r="4" fill="currentColor" />
        </svg>
      )}
    </div>
  )
}
export default SectionCardWatermark
