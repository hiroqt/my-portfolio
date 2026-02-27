'use client'

import dynamic from 'next/dynamic'

// Dynamically import DarkVeil to avoid SSR issues with WebGL
const DarkVeil = dynamic(() => import('@/components/background/DarkVeil'), {
  ssr: false
})

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <DarkVeil
        hueShift={0}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0}
      />
    </div>
  )
}