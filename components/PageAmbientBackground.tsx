'use client'

import React from 'react'

export function PageAmbientBackground() {
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* Subtle Architectural Coordinate Rails along Gutters */}
      <div className="absolute inset-0 max-w-screen-2xl mx-auto px-4 sm:px-8">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 2400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            <pattern id="amb-amber" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#fde68a" fillOpacity="0.4" />
              <line x1="0" y1="0" x2="0" y2="10" stroke="#d97706" strokeWidth="1.5" opacity="0.3" strokeDasharray="3,2" />
            </pattern>
            <pattern id="amb-terracotta" width="10" height="10" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#fed7aa" fillOpacity="0.4" />
              <line x1="0" y1="0" x2="0" y2="10" stroke="#ea580c" strokeWidth="1.5" opacity="0.3" strokeDasharray="3,2" />
            </pattern>
            <pattern id="amb-sand" width="10" height="10" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#e7e5e4" fillOpacity="0.4" />
              <line x1="0" y1="0" x2="0" y2="10" stroke="#a8a29e" strokeWidth="1.5" opacity="0.3" strokeDasharray="3,2" />
            </pattern>
          </defs>

          {/* Continuous Architectural Grid Lines (Outer Margins) */}
          <g className="stroke-stone-900/10 dark:stroke-white/8" strokeWidth="1" strokeDasharray="4 6">
            {/* Left Margin Rail */}
            <line x1="40" y1="0" x2="40" y2="2400" />
            <line x1="120" y1="0" x2="120" y2="2400" />

            {/* Right Margin Rail */}
            <line x1="1320" y1="0" x2="1320" y2="2400" />
            <line x1="1400" y1="0" x2="1400" y2="2400" />

            {/* Subtle Horizontal Section Markers */}
            <line x1="0" y1="400" x2="1440" y2="400" strokeDasharray="2 8" />
            <line x1="0" y1="950" x2="1440" y2="950" strokeDasharray="2 8" />
            <line x1="0" y1="1500" x2="1440" y2="1500" strokeDasharray="2 8" />
            <line x1="0" y1="2050" x2="1440" y2="2050" strokeDasharray="2 8" />
          </g>

          {/* Precision Alignment Crosshairs */}
          <g className="stroke-stone-900/20 dark:stroke-white/15" strokeWidth="1.2">
            <path d="M35,400 H45 M40,395 V405" />
            <path d="M1395,400 H1405 M1400,395 V405" />
            <path d="M35,950 H45 M40,945 V955" />
            <path d="M1395,950 H1405 M1400,945 V955" />
            <path d="M35,1500 H45 M40,1495 V1505" />
            <path d="M1395,1500 H1405 M1400,1495 V1505" />
            <path d="M35,2050 H45 M40,2045 V2055" />
            <path d="M1395,2050 H1405 M1400,2045 V2055" />
          </g>

          {/* Section 01 / 02 Area: Education & Experience Background Motifs */}
          <g className="opacity-40 dark:opacity-25">
            {/* Left Amber Arch */}
            <path d="M 0,420 A 70,70 0 0,1 70,350 V 420 Z" fill="url(#amb-amber)" />
            {/* Right Terracotta Tile */}
            <rect x="1370" y="520" width="70" height="90" rx="6" fill="url(#amb-terracotta)" />
          </g>

          {/* Section 03 Area: Projects & Architecture Blueprint Motifs */}
          <g className="stroke-[#1C1917]/30 dark:stroke-white/20" strokeWidth="1.4" strokeLinecap="round" fill="none">
            {/* Left Data Flow Node */}
            <g transform="translate(15, 880)">
              <rect x="0" y="0" width="80" height="44" rx="6" className="fill-background/40" strokeWidth="1.2" />
              <text x="10" y="22" fontSize="8" fontFamily="monospace" className="fill-current opacity-70" stroke="none">&lt;Deploy /&gt;</text>
              <text x="10" y="34" fontSize="7.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-semibold" stroke="none">200 OK</text>
              <line x1="80" y1="22" x2="110" y2="22" strokeDasharray="2 2" />
            </g>

            {/* Right Database & Server Icon */}
            <g transform="translate(1335, 880)">
              <ellipse cx="25" cy="8" rx="18" ry="5" strokeWidth="1.2" />
              <line x1="7" y1="8" x2="7" y2="22" strokeWidth="1.2" />
              <line x1="43" y1="8" x2="43" y2="22" strokeWidth="1.2" />
              <path d="M 7,22 A 18,5 0 0,0 43,22" strokeWidth="1.2" />
            </g>
          </g>

          {/* Section 04 / 05 Area: Skills & Neural Synapses */}
          <g className="opacity-40 dark:opacity-25">
            <path d="M 1440,1400 A 70,70 0 0,0 1370,1470 H 1440 Z" fill="url(#amb-sand)" />
            <rect x="0" y="1520" width="60" height="80" rx="6" fill="url(#amb-amber)" />
          </g>

          {/* Section 06 / 07 Area: GitHub & Contact Area */}
          <g className="stroke-[#1C1917]/30 dark:stroke-white/20" strokeWidth="1.4" strokeLinecap="round" fill="none">
            {/* Git Branch Curve in Gutter */}
            <g transform="translate(20, 1950)">
              <line x1="10" y1="0" x2="10" y2="70" strokeWidth="1.4" />
              <circle cx="10" cy="15" r="3" className="fill-current opacity-60" />
              <path d="M 10,15 C 25,15 30,35 30,50" strokeDasharray="3 2" />
              <circle cx="30" cy="50" r="3" className="fill-[#E6A860]" />
            </g>

            {/* Contact Signal Beam */}
            <g transform="translate(1340, 2150)">
              <path d="M 0,20 Q 20,5 40,20" strokeDasharray="2 2" />
              <path d="M 5,28 Q 20,15 35,28" strokeDasharray="2 2" />
              <circle cx="20" cy="38" r="3" className="fill-[#E6A860]" />
            </g>
          </g>

        </svg>
      </div>
    </div>
  )
}
export default PageAmbientBackground
