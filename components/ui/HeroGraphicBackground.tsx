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
  const isAmbient = variant === 'ambient'

  // Dynamic stack values for per-page customization
  const primaryStack = techStack[0] || 'TypeScript'
  const secondaryStack = techStack[1] || 'Next.js'
  const tertiaryStack = techStack[2] || 'Tailwind CSS'
  const dataStack = techStack[3] || (techStack.length > 0 ? `${techStack[0]} Engine` : 'Cloud Database')

  return (
    <div
      className={`relative w-full overflow-hidden bg-background text-foreground transition-colors duration-500 selection:bg-foreground selection:text-background ${
        variant === 'hero'
          ? 'w-full min-h-screen flex flex-col justify-between'
          : isCompact
          ? 'py-10 sm:py-16'
          : 'py-6 sm:py-10 h-full'
      } ${className}`}
    >
      {/* Ambient Warm Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-25"
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(230, 168, 96, 0.18) 0%, rgba(18, 17, 16, 0) 70%)',
        }}
      />

      {/* SVG Canvas Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
        
        {/* ========================================================================= */}
        {/* === VARIANT 1: HERO (Homepage Masthead) ================================= */}
        {/* ========================================================================= */}
        {variant === 'hero' && (
          <>
            {/* Desktop Hero SVG */}
            <svg
              className="hidden md:block w-full h-full object-cover object-top"
              viewBox="0 0 1440 920"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMin slice"
            >
              <defs>
                <pattern id="h-pat-amber" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#fde68a" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#d97706" strokeWidth="2" opacity="0.6" strokeDasharray="3,1.5,1,2" />
                </pattern>
                <pattern id="h-pat-terracotta" width="10" height="10" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#fed7aa" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#ea580c" strokeWidth="2" opacity="0.6" strokeDasharray="3,2,1,1" />
                </pattern>
                <pattern id="h-pat-sand" width="10" height="10" patternTransform="rotate(55 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#e7e5e4" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#a8a29e" strokeWidth="2" opacity="0.6" strokeDasharray="2,2,3,1" />
                </pattern>
                <pattern id="h-pat-bronze" width="10" height="10" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#fcd34d" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#b45309" strokeWidth="2" opacity="0.6" strokeDasharray="3,1.5,1,2" />
                </pattern>
                <pattern id="h-pat-taupe" width="10" height="10" patternTransform="rotate(40 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#d6d3d1" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#78716c" strokeWidth="2" opacity="0.6" strokeDasharray="3,2,1,2" />
                </pattern>
              </defs>

              <g className="stroke-stone-900/10 dark:stroke-white/10" strokeWidth="1" strokeDasharray="4 4">
                <line x1="80" y1="0" x2="80" y2="920" />
                <line x1="220" y1="0" x2="220" y2="920" />
                <line x1="1220" y1="0" x2="1220" y2="920" />
                <line x1="1360" y1="0" x2="1360" y2="920" />
                <line x1="0" y1="180" x2="220" y2="180" />
                <line x1="1220" y1="180" x2="1440" y2="180" />
                <line x1="0" y1="140" x2="1440" y2="140" strokeDasharray="2 6" />
              </g>

              <g className="opacity-80">
                <path d="M 80,130 A 80,130 0 0,1 220,0 H 80 Z" fill="url(#h-pat-amber)" />
                <rect x="80" y="135" width="135" height="110" rx="6" fill="url(#h-pat-terracotta)" />
                <rect x="0" y="250" width="75" height="200" rx="8" fill="url(#h-pat-sand)" />
                <path d="M 1360,130 A 80,130 0 0,1 1440,0 V 130 Z" fill="url(#h-pat-bronze)" />
                <rect x="1360" y="135" width="80" height="110" rx="4" fill="url(#h-pat-taupe)" />
              </g>

              <g className="stroke-[#1C1917] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="80" y="250" width="140" height="300" fill="none" />
                <path d="M 80,550 A 70,70 0 0,0 220,550" fill="none" />
                <rect x="1220" y="130" width="140" height="300" fill="none" />
                <line x1="1220" y1="250" x2="1360" y2="250" />
                <path d="M 1220,430 A 70,70 0 0,1 1360,430" fill="none" />
              </g>

              {showIllustration && (
                <g className="stroke-[#1C1917] dark:stroke-white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  {/* Top Canopy */}
                  <g>
                    <path
                      d="M 180,155 C 340,95 480,82 720,82 C 960,82 1100,95 1260,155"
                      className="stroke-[#1C1917]/50 dark:stroke-white/40"
                      strokeWidth="1.6"
                      strokeDasharray="4 4"
                    />

                    <motion.g
                      animate={{ x: [0, 10, 0], y: [-3, 3, -3], rotate: [-1, 2, -1] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <polygon
                        points="720,80 775,67 748,96"
                        className="fill-[#1C1917]/10 dark:fill-white/15 stroke-[#1C1917] dark:stroke-white"
                        strokeWidth="1.8"
                      />
                      <line x1="775" y1="67" x2="738" y2="85" strokeWidth="1.4" />
                      <line x1="738" y1="85" x2="748" y2="96" strokeWidth="1.4" />
                    </motion.g>

                    <g transform="translate(360, 85)">
                      <path d="M 10,20 C 5,20 0,16 0,11 C 0,7 3,4 7,4 C 8,2 11,0 15,0 C 20,0 24,3 25,7 C 28,7 30,10 30,13 C 30,17 27,20 23,20 Z" className="fill-background" strokeWidth="1.5" />
                      <path d="M 34,8 Q 38,11 34,14" strokeWidth="1.2" />
                      <path d="M 38,5 Q 44,11 38,17" strokeWidth="1.2" />
                    </g>

                    <g transform="translate(455, 84)">
                      <rect x="0" y="0" width="42" height="22" rx="11" className="fill-background shadow-sm" strokeWidth="1.4" />
                      <text x="10" y="15" fontSize="11" fontFamily="monospace" className="fill-current" stroke="none">&lt;/&gt;</text>
                    </g>
                    <g transform="translate(560, 79)">
                      <rect x="0" y="0" width="50" height="22" rx="11" className="fill-background shadow-sm" strokeWidth="1.4" />
                      <text x="9" y="15" fontSize="9.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">&#123; AI &#125;</text>
                    </g>
                    <g transform="translate(830, 79)">
                      <rect x="0" y="0" width="62" height="22" rx="11" className="fill-background shadow-sm" strokeWidth="1.4" />
                      <text x="8" y="15" fontSize="9" fontFamily="monospace" className="fill-current" stroke="none">100% ⚡</text>
                    </g>
                    <g transform="translate(950, 84)">
                      <rect x="0" y="0" width="48" height="22" rx="11" className="fill-background shadow-sm" strokeWidth="1.4" />
                      <text x="8" y="15" fontSize="10" fontFamily="monospace" className="fill-current" stroke="none">f(x)=&gt;</text>
                    </g>
                  </g>

                  {/* Left Flank */}
                  <g transform="translate(10, 45)">
                    <g transform="translate(75, 75)">
                      <circle cx="60" cy="60" r="28" className="fill-background" strokeWidth="2" />
                      <ellipse cx="60" cy="60" rx="38" ry="14" strokeWidth="1.4" strokeDasharray="4 2" />
                      <ellipse cx="60" cy="60" rx="14" ry="38" strokeWidth="1.4" strokeDasharray="4 2" />
                      <text x="53" y="65" fontSize="16" fontFamily="serif" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">✦</text>
                      <circle cx="22" cy="35" r="3.5" className="fill-current" />
                      <line x1="25" y1="37" x2="38" y2="48" strokeWidth="1.2" />
                      <circle cx="98" cy="35" r="3.5" className="fill-current" />
                      <line x1="95" y1="37" x2="82" y2="48" strokeWidth="1.2" />
                    </g>

                    <g transform="translate(75, 230)">
                      <rect x="5" y="0" width="115" height="32" rx="4" className="fill-background" strokeWidth="1.5" />
                      <text x="12" y="14" fontSize="8" fontFamily="monospace" className="fill-current" stroke="none">[0.92, 0.45, 0.81]</text>
                      <text x="12" y="25" fontSize="7.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-semibold" stroke="none">embedding_vector</text>
                      <path d="M 62,34 L 62,48" strokeWidth="1.5" />
                      <polyline points="58,44 62,49 66,44" strokeWidth="1.5" />
                      <rect x="5" y="50" width="115" height="36" rx="4" className="fill-background" strokeWidth="1.6" />
                      <text x="12" y="65" fontSize="8.5" fontFamily="monospace" className="fill-current font-bold" stroke="none">LLM.orchestrate()</text>
                      <text x="12" y="77" fontSize="7.5" fontFamily="monospace" className="fill-current opacity-70" stroke="none">stream: SSE agent</text>
                      <path d="M 62,88 L 62,102" strokeWidth="1.5" />
                      <polyline points="58,98 62,103 66,98" strokeWidth="1.5" />
                      <rect x="5" y="104" width="115" height="32" rx="4" className="fill-[#fed7aa]/20" strokeWidth="1.6" />
                      <text x="12" y="118" fontSize="8.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">AgentAction &#123; OK &#125;</text>
                    </g>
                  </g>

                  {/* Right Flank */}
                  <g transform="translate(325, -25)">
                    <g transform="translate(915, 145)">
                      <rect x="0" y="0" width="125" height="95" rx="6" className="fill-background" strokeWidth="1.8" />
                      <line x1="0" y1="18" x2="125" y2="18" strokeWidth="1.2" />
                      <circle cx="10" cy="9" r="2" className="fill-current" />
                      <circle cx="17" cy="9" r="2" className="fill-current" />
                      <circle cx="24" cy="9" r="2" className="fill-current" />
                      <text x="10" y="34" fontSize="8" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">const app = Next.js()</text>
                      <text x="10" y="47" fontSize="8" fontFamily="monospace" className="fill-current" stroke="none">await ai.synthesize(&#123;</text>
                      <text x="18" y="60" fontSize="8" fontFamily="monospace" className="fill-current opacity-70" stroke="none">stream: true</text>
                      <text x="10" y="73" fontSize="8" fontFamily="monospace" className="fill-current" stroke="none">&#125;)</text>
                    </g>
                    <g transform="translate(920, 260)">
                      <line x1="10" y1="10" x2="105" y2="10" strokeWidth="1.8" />
                      <circle cx="10" cy="10" r="3" className="fill-background" strokeWidth="1.8" />
                      <circle cx="45" cy="10" r="3" className="fill-background" strokeWidth="1.8" />
                      <circle cx="105" cy="10" r="4" className="fill-[#E6A860]" strokeWidth="2" />
                      <path d="M 10,10 C 22,10 26,28 45,28 L 75,28 C 90,28 94,10 105,10" strokeWidth="1.5" strokeDasharray="3 2" />
                      <circle cx="45" cy="28" r="2.5" className="fill-background" strokeWidth="1.5" />
                      <circle cx="75" cy="28" r="2.5" className="fill-background" strokeWidth="1.5" />
                    </g>
                    <g transform="translate(920, 315)">
                      <ellipse cx="26" cy="10" rx="20" ry="5" className="fill-background" strokeWidth="1.6" />
                      <line x1="6" y1="10" x2="6" y2="22" strokeWidth="1.6" />
                      <line x1="46" y1="10" x2="46" y2="22" strokeWidth="1.6" />
                      <path d="M 6,22 A 20,5 0 0,0 46,22" className="fill-background" strokeWidth="1.6" />
                      <g transform="translate(68, 10)">
                        <rect x="0" y="0" width="20" height="22" rx="3" className="fill-background" strokeWidth="1.6" />
                        <path d="M 20,4 C 26,4 26,16 20,16" strokeWidth="1.4" />
                        <path d="M 5,-3 Q 8,-7 5,-11" strokeWidth="1" strokeDasharray="2 2" />
                      </g>
                    </g>
                    <g transform="translate(935, 100)">
                      <path d="M 18,18 C 6,18 0,30 8,38 C 16,44 38,44 50,36 C 56,29 52,18 39,18 Z" strokeWidth="1.5" />
                      <polygon points="8,21 3,12 13,16" className="fill-current opacity-30" strokeWidth="1.2" />
                      <polygon points="17,18 20,10 26,16" className="fill-current opacity-30" strokeWidth="1.2" />
                      <path d="M 50,33 C 60,33 63,18 60,10 C 57,4 49,6 51,14" strokeWidth="1.5" />
                    </g>
                  </g>
                </g>
              )}
            </svg>

            {/* Mobile Hero SVG */}
            <svg
              className="block md:hidden w-full h-full object-cover object-top"
              viewBox="0 0 390 844"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="mh-pat-amber" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#fde68a" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#d97706" strokeWidth="1.5" opacity="0.6" strokeDasharray="2,1,1,1" />
                </pattern>
                <pattern id="mh-pat-terracotta" width="8" height="8" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#fed7aa" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#ea580c" strokeWidth="1.5" opacity="0.6" strokeDasharray="2,1,1,1" />
                </pattern>
                <pattern id="mh-pat-sand" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#e7e5e4" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#a8a29e" strokeWidth="1.5" opacity="0.6" strokeDasharray="2,1,1,1" />
                </pattern>
                <pattern id="mh-pat-bronze" width="8" height="8" patternTransform="rotate(55 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#fcd34d" fillOpacity="0.85" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#b45309" strokeWidth="1.5" opacity="0.6" strokeDasharray="2,1,1,1" />
                </pattern>
              </defs>

              <g className="stroke-stone-900/10 dark:stroke-white/10" strokeWidth="1" strokeDasharray="3 3">
                <line x1="20" y1="0" x2="20" y2="844" />
                <line x1="370" y1="0" x2="370" y2="844" />
                <line x1="0" y1="110" x2="390" y2="110" strokeDasharray="2 4" />
              </g>

              {showIllustration && (
                <g className="stroke-[#1C1917] dark:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M 30,95 C 100,60 200,52 360,95" className="stroke-[#1C1917]/40 dark:stroke-white/40" strokeWidth="1.4" strokeDasharray="3 3" />
                  
                  <motion.g
                    animate={{ x: [0, 6, 0], y: [-2, 2, -2], rotate: [-1, 1, -1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <polygon points="195,54 235,44 216,66" className="fill-[#1C1917]/10 dark:fill-white/15 stroke-[#1C1917] dark:stroke-white" strokeWidth="1.6" />
                    <line x1="235" y1="44" x2="208" y2="58" strokeWidth="1.2" />
                    <line x1="208" y1="58" x2="216" y2="66" strokeWidth="1.2" />
                  </motion.g>

                  <g transform="translate(50, 60)">
                    <path d="M 8,16 C 4,16 0,13 0,9 C 0,6 2,3 6,3 C 7,1 9,0 12,0 C 16,0 19,2 20,5 C 22,5 24,8 24,10 C 24,14 22,16 18,16 Z" className="fill-background" strokeWidth="1.3" />
                    <path d="M 27,6 Q 30,9 27,11" strokeWidth="1" />
                  </g>

                  <g transform="translate(105, 58)">
                    <rect x="0" y="0" width="36" height="18" rx="9" className="fill-background" strokeWidth="1.2" />
                    <text x="8" y="12" fontSize="9" fontFamily="monospace" className="fill-current" stroke="none">&lt;/&gt;</text>
                  </g>
                  <g transform="translate(245, 56)">
                    <rect x="0" y="0" width="44" height="18" rx="9" className="fill-background" strokeWidth="1.2" />
                    <text x="7" y="12" fontSize="8.5" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">&#123; AI &#125;</text>
                  </g>
                  <g transform="translate(305, 58)">
                    <rect x="0" y="0" width="48" height="18" rx="9" className="fill-background" strokeWidth="1.2" />
                    <text x="6" y="12" fontSize="8" fontFamily="monospace" className="fill-current" stroke="none">100% ⚡</text>
                  </g>

                  <g transform="translate(8, 105)">
                    <path d="M 0,35 A 35,35 0 0,1 35,0 H 0 Z" fill="url(#mh-pat-amber)" opacity="0.85" />
                    <circle cx="26" cy="26" r="14" className="fill-background" strokeWidth="1.5" />
                    <ellipse cx="26" cy="26" rx="20" ry="8" strokeWidth="1.1" strokeDasharray="3 1" />
                    <text x="22" y="30" fontSize="11" fontFamily="serif" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">✦</text>
                  </g>

                  <g transform="translate(332, 105)">
                    <path d="M 35,35 A 35,35 0 0,0 0,0 H 35 Z" fill="url(#mh-pat-bronze)" opacity="0.85" />
                    <g transform="translate(4, 8)">
                      <path d="M 12,12 C 4,12 0,20 6,26 C 12,30 26,30 34,24 C 38,20 36,12 27,12 Z" className="fill-background" strokeWidth="1.3" />
                      <polygon points="6,14 2,8 10,11" className="fill-current opacity-30" strokeWidth="1" />
                      <polygon points="12,12 14,7 18,11" className="fill-current opacity-30" strokeWidth="1" />
                      <path d="M 34,22 C 40,22 42,12 40,6" strokeWidth="1.2" />
                    </g>
                  </g>

                  <g transform="translate(10, 720)">
                    <rect x="0" y="0" width="40" height="40" rx="4" fill="url(#mh-pat-terracotta)" opacity="0.8" />
                    <rect x="5" y="5" width="95" height="48" rx="4" className="fill-background" strokeWidth="1.4" />
                    <text x="10" y="18" fontSize="7.5" fontFamily="monospace" className="fill-current font-bold" stroke="none">Context RAG</text>
                    <text x="10" y="30" fontSize="7" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-semibold" stroke="none">[0.92, 0.45, 0.81]</text>
                  </g>

                  <g transform="translate(265, 720)">
                    <rect x="65" y="0" width="50" height="45" rx="4" fill="url(#mh-pat-sand)" opacity="0.8" />
                    <rect x="0" y="5" width="110" height="50" rx="4" className="fill-background" strokeWidth="1.4" />
                    <line x1="0" y1="16" x2="110" y2="16" strokeWidth="1" />
                    <text x="8" y="28" fontSize="7" fontFamily="monospace" className="fill-[#C07736] dark:fill-[#E6A860] font-bold" stroke="none">Next.js + AI</text>
                    <text x="8" y="39" fontSize="6.8" fontFamily="monospace" className="fill-current" stroke="none">db.supabase()</text>
                  </g>
                </g>
              )}
            </svg>
          </>
        )}

        {/* ========================================================================= */}
        {/* === VARIANT 2: BANNER (Project Detail Page - Dynamic Tech Stack) ======== */}
        {/* ========================================================================= */}
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
                {/* Cat on right shelf */}
                <g transform="translate(20, 45)">
                  <path d="M 14,14 C 4,14 0,22 6,28 C 12,30 26,30 34,26 C 38,22 36,14 27,14 Z" className="fill-background" strokeWidth="1.3" />
                  <polygon points="6,16 2,10 10,13" className="fill-current opacity-30" strokeWidth="1" />
                  <polygon points="12,14 14,9 18,13" className="fill-current opacity-30" strokeWidth="1" />
                </g>
              </g>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* === VARIANT 3: AMBIENT (JARVIS AI Assistant HUD Page) =================== */}
        {/* ========================================================================= */}
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
