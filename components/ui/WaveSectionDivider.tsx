'use client'

import React from 'react'

interface WaveSectionDividerProps {
  className?: string
  flip?: boolean
  strokeWidth?: number
}

export function WaveSectionDivider({
  className = '',
  flip = false,
  strokeWidth = 4,
}: WaveSectionDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none py-1.5 sm:py-2.5 bg-white dark:bg-[#0a0a0b] ${
        flip ? 'scale-y-[-1]' : ''
      } ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-5 sm:h-6 lg:h-7 transition-colors text-accent/25 dark:text-accent/20"
        preserveAspectRatio="none"
      >
        {/* Simple, clean thick continuous wave line (zero dots, zero dashes) */}
        <path
          d="M 0 18 C 45 5, 105 5, 150 18 S 255 31, 300 18 S 405 5, 450 18 S 555 31, 600 18 S 705 5, 750 18 S 855 31, 900 18 S 1005 5, 1050 18 S 1155 31, 1200 18"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}


