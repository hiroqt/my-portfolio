'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HeroGraphicBackgroundProps {
  variant?: 'hero' | 'banner' | 'ambient'
  className?: string
  children?: React.ReactNode
  showIllustration?: boolean
  techStack?: string[]
  projectName?: string
}

export function HeroGraphicBackground({
  variant = 'hero',
  className = '',
  children,
  showIllustration = true,
  techStack = [],
  projectName = '',
}: HeroGraphicBackgroundProps) {
  const isCompact = variant === 'banner'

  // Dynamic stack values for per-page customization
  const primaryStack = techStack[0] || 'TypeScript'
  const secondaryStack = techStack[1] || 'Next.js'
  const tertiaryStack = techStack[2] || 'Tailwind CSS'
  const dataStack = techStack[3] || (techStack.length > 0 ? `${techStack[0]} Engine` : 'Cloud Database')

  return (
    <div
      className={`relative w-full overflow-hidden bg-background text-foreground transition-colors duration-500 selection:bg-foreground selection:text-background ${
        variant === 'hero'
          ? 'w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center'
          : isCompact
          ? 'py-10 sm:py-16'
          : 'py-6 sm:py-10 h-full'
      } ${className}`}
    >
      {/* Ambient Warm Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, rgba(230, 168, 96, 0.15) 0%, rgba(192, 119, 54, 0.05) 45%, transparent 70%)',
        }}
      />

      {/* SVG Canvas Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
        
        {/* === VARIANT 1: HERO (Clean Architectural Grid) === */}
        {variant === 'hero' && (
          <div className="w-full h-full opacity-40 dark:opacity-25">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 1440 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="hero-grid-mask" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" className="text-border" mask="url(#hero-grid-mask)">
                <line x1="120" y1="0" x2="120" y2="900" />
                <line x1="360" y1="0" x2="360" y2="900" />
                <line x1="720" y1="0" x2="720" y2="900" />
                <line x1="1080" y1="0" x2="1080" y2="900" />
                <line x1="1320" y1="0" x2="1320" y2="900" />
                <line x1="0" y1="180" x2="1440" y2="180" />
                <line x1="0" y1="450" x2="1440" y2="450" />
                <line x1="0" y1="720" x2="1440" y2="720" />
              </g>
            </svg>
          </div>
        )}

        {/* === VARIANT 2: BANNER (Project Detail Page) === */}
        {variant === 'banner' && (
          <svg
            className="w-full h-full object-cover object-center"
            viewBox="0 0 1200 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="b-pat-amber" width="10" height="10" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#fde68a" fillOpacity="0.85" />
                <line x1="0" y1="0" x2="0" y2="10" stroke="#d97706" strokeWidth="2" opacity="0.6" strokeDasharray="3,2,1,1" />
              </pattern>
              <pattern id="b-pat-terracotta" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#fed7aa" fillOpacity="0.85" />
                <line x1="0" y1="0" x2="0" y2="10" stroke="#ea580c" strokeWidth="2" opacity="0.6" strokeDasharray="3,1.5,1,2" />
              </pattern>
              <pattern id="b-pat-bronze" width="10" height="10" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#fcd34d" fillOpacity="0.85" />
                <line x1="0" y1="0" x2="0" y2="10" stroke="#b45309" strokeWidth="2" opacity="0.6" strokeDasharray="3,1.5,1,2" />
              </pattern>
            </defs>

            {/* Architectural Blueprint Grid */}
            <g className="stroke-stone-900/10 dark:stroke-white/10" strokeWidth="1" strokeDasharray="4 4">
              <line x1="60" y1="0" x2="60" y2="480" />
              <line x1="1140" y1="0" x2="1140" y2="480" />
              <line x1="0" y1="80" x2="1200" y2="80" />
            </g>

            {/* Framing Geometry */}
            <g className="opacity-75">
              <path d="M 60,80 A 60,80 0 0,1 180,0 H 60 Z" fill="url(#b-pat-amber)" />
              <rect x="0" y="160" width="55" height="140" rx="6" fill="url(#b-pat-terracotta)" />
              <path d="M 1140,80 A 60,80 0 0,1 1200,0 V 80 Z" fill="url(#b-pat-bronze)" />
            </g>

            {/* Dynamic Project Case Study & Architecture Graphics */}
            <g className="stroke-[#1C1917] dark:stroke-white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
              
              {/* Left Flank: Dynamic Tech Stack Box */}
              <g transform="translate(65, 105)">
                <rect x="0" y="0" width="125" height="85" rx="6" className="fill-background" strokeWidth="1.6" />
                <text x="10" y="20" fontSize="8.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">
                  &lt;TechStack /&gt;
                </text>
                <line x1="0" y1="28" x2="125" y2="28" strokeWidth="1" />
                <text x="10" y="44" fontSize="7.5" fontFamily="monospace" className="fill-current" stroke="none">
                  Core: {primaryStack}
                </text>
                <text x="10" y="58" fontSize="7.5" fontFamily="monospace" className="fill-current" stroke="none">
                  Layer: {secondaryStack}
                </text>
                <text x="10" y="72" fontSize="7.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-semibold" stroke="none">
                  UI: {tertiaryStack}
                </text>
              </g>

              {/* Top Deployment Badges (Dynamic Tech Stack) */}
              <g transform="translate(400, 20)">
                <rect x="0" y="0" width="115" height="24" rx="12" className="fill-background" strokeWidth="1.4" />
                <text x="10" y="16" fontSize="8.5" fontFamily="monospace" className="fill-current" stroke="none">
                  git: {primaryStack.toLowerCase()}
                </text>
              </g>
              <g transform="translate(680, 20)">
                <rect x="0" y="0" width="120" height="24" rx="12" className="fill-background" strokeWidth="1.4" />
                <text x="10" y="16" fontSize="8.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">
                  ⚡ {secondaryStack}
                </text>
              </g>

              {/* Right Flank: Dynamic Data Stack & Device Viewport */}
              <g transform="translate(1005, 105)">
                <ellipse cx="30" cy="10" rx="22" ry="6" className="fill-background" strokeWidth="1.5" />
                <line x1="8" y1="10" x2="8" y2="24" strokeWidth="1.5" />
                <line x1="52" y1="10" x2="52" y2="24" strokeWidth="1.5" />
                <path d="M 8,24 A 22,6 0 0,0 52,24" className="fill-background" strokeWidth="1.5" />
                <text x="60" y="20" fontSize="8" fontFamily="monospace" className="fill-current" stroke="none">
                  {dataStack}
                </text>
              </g>
            </g>
          </svg>
        )}

        {/* === VARIANT 3: AMBIENT (JARVIS AI Assistant HUD Page) === */}
        {variant === 'ambient' && (
          <svg
            className="w-full h-full object-cover object-center"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="a-pat-amber" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#fde68a" fillOpacity="0.85" />
                <line x1="0" y1="0" x2="0" y2="10" stroke="#d97706" strokeWidth="2" opacity="0.6" strokeDasharray="3,1.5,1,2" />
              </pattern>
              <pattern id="a-pat-terracotta" width="10" height="10" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#fed7aa" fillOpacity="0.85" />
                <line x1="0" y1="0" x2="0" y2="10" stroke="#ea580c" strokeWidth="2" opacity="0.6" strokeDasharray="3,2,1,1" />
              </pattern>
            </defs>

            <g className="stroke-stone-900/10 dark:stroke-white/10" strokeWidth="1" strokeDasharray="4 4">
              <line x1="100" y1="0" x2="100" y2="800" />
              <line x1="1100" y1="0" x2="1100" y2="800" />
              <circle cx="600" cy="400" r="280" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.3" />
              <circle cx="600" cy="400" r="160" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.4" />
            </g>

            <g className="opacity-60">
              <path d="M 0,200 A 100,100 0 0,1 100,100 V 200 Z" fill="url(#a-pat-amber)" />
              <path d="M 1200,200 A 100,100 0 0,0 1100,100 V 200 Z" fill="url(#a-pat-terracotta)" />
            </g>

            <g className="stroke-[#1C1917] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <g transform="translate(60, 240)">
                <rect x="0" y="0" width="125" height="120" rx="8" className="fill-background" strokeWidth="1.8" />
                <text x="10" y="24" fontSize="9" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">✦ yhelAI Pipeline</text>
                <line x1="0" y1="34" x2="125" y2="34" strokeWidth="1.2" />
                <text x="10" y="52" fontSize="8" fontFamily="monospace" className="fill-current" stroke="none">RAG Retrieval</text>
                <text x="10" y="68" fontSize="8" fontFamily="monospace" className="fill-current opacity-70" stroke="none">Vector Search</text>
                <text x="10" y="84" fontSize="8" fontFamily="monospace" className="fill-current opacity-70" stroke="none">Neural TTS (Edge)</text>
                <text x="10" y="104" fontSize="8" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">SSE Stream OK</text>
              </g>

              <g transform="translate(1015, 240)">
                <rect x="0" y="0" width="125" height="120" rx="8" className="fill-background" strokeWidth="1.8" />
                <text x="10" y="24" fontSize="9" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">Voice Synthesizer</text>
                <line x1="0" y1="34" x2="125" y2="34" strokeWidth="1.2" />
                <path d="M 12,65 Q 22,45 32,65 T 52,65 T 72,65 T 92,65 T 112,65" strokeWidth="1.6" className="stroke-[#C07736] dark:stroke-[#E6A860]" />
                <text x="10" y="90" fontSize="8" fontFamily="monospace" className="fill-current" stroke="none">Audio: 24kHz HD</text>
                <text x="10" y="106" fontSize="8" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-semibold" stroke="none">Latency: &lt;150ms</text>
              </g>

              <motion.g
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M 220,140 Q 220,144 224,144 Q 220,144 220,148 Q 220,144 216,144 Q 220,144 220,140 Z" className="fill-current" stroke="none" />
                <path d="M 980,140 Q 980,144 984,144 Q 980,144 980,148 Q 980,144 976,144 Q 980,144 980,140 Z" className="fill-current" stroke="none" />
                <path d="M 600,80 Q 600,85 605,85 Q 600,85 600,90 Q 600,85 595,85 Q 600,85 600,80 Z" className="fill-[#C07736] dark:fill-[#E6A860]" stroke="none" />
              </motion.g>
            </g>
          </svg>
        )}

      </div>

      {/* Body Content Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-4 sm:px-6">
        {children}
      </div>
    </div>
  )
}
export default HeroGraphicBackground
