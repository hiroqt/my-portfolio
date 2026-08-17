'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { LightingMode, ViewMode } from '@/components/city/CityScene'
import { BuildingData, ContributionDay } from '@/components/city/CityBuildings'
import { CityScrollOverlay } from '@/components/city/CityScrollOverlay'

// Dynamically import Three.js canvas to ensure client-only WebGL initialization
const CityScene = dynamic(
  () => import('@/components/city/CityScene').then((mod) => mod.CityScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#bfe0f7] flex flex-col items-center justify-center">
        <div className="w-14 h-14 border-4 border-sky-400/40 border-t-sky-600 rounded-full animate-spin mb-4" />
        <p className="text-sky-900 font-mono text-xs tracking-widest uppercase animate-pulse font-semibold">
          Loading NYC & LA Metropolis...
        </p>
      </div>
    ),
  }
)

export default function CityPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>('scroll')
  const [lightingMode, setLightingMode] = useState<LightingMode>('day')
  const [trafficSpeed, setTrafficSpeed] = useState(1.0)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null)
  const [avatarInteracted, setAvatarInteracted] = useState(false)
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalCommits, setTotalCommits] = useState(0)
  const [virtualInput, setVirtualInput] = useState<{ x: number; z: number; isSprint?: boolean }>({ x: 0, z: 0 })

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 1. Fetch GitHub Contribution Data
  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const res = await fetch('/api/github?username=hiroqt')
        if (res.ok) {
          const data = await res.json()
          if (data?.contributions?.days) {
            setContributions(data.contributions.days)
            setTotalCommits(data.contributions.totalContributions || 0)
          }
        }
      } catch (err) {
        console.warn('Using procedural city fallback:', err)
      }
    }
    fetchGitHub()
  }, [])

  // 2. Prevent page scrolling interference in Orbit / Walk modes so wheel zooms freely
  useEffect(() => {
    if (viewMode !== 'scroll') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [viewMode])

  // 3. Track Window Scroll Progress in Scroll Mode
  useEffect(() => {
    const handleScroll = () => {
      if (viewMode !== 'scroll') return
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return
      const currentScroll = window.scrollY
      const progress = Math.min(1, Math.max(0, currentScroll / totalScroll))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [viewMode])

  // 4. Scroll to specific chapter progress
  const scrollToChapter = (targetProgress: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({
      top: targetProgress * totalScroll,
      behavior: 'smooth',
    })
  }

  // 5. Handle Avatar Wave / Interaction Toast
  const handleAvatarInteract = () => {
    setAvatarInteracted(true)
    setTimeout(() => {
      setAvatarInteracted(false)
    }, 4500)
  }

  return (
    <main className={`relative bg-[#bfe0f7] select-none ${viewMode === 'scroll' ? 'min-h-[500vh]' : 'h-screen overflow-hidden'}`}>
      {/* Fixed Full-Screen 3D Three.js Viewport */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <CityScene
          scrollProgress={scrollProgress}
          viewMode={viewMode}
          lightingMode={lightingMode}
          trafficSpeed={trafficSpeed}
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
          selectedBuilding={selectedBuilding}
          contributions={contributions}
          virtualInput={virtualInput}
          onBuildingSelect={setSelectedBuilding}
          onAvatarInteract={handleAvatarInteract}
        />
      </div>

      {/* Floating HUD & Scroll Storytelling Overlay */}
      <CityScrollOverlay
        scrollProgress={scrollProgress}
        viewMode={viewMode}
        setViewMode={setViewMode}
        lightingMode={lightingMode}
        setLightingMode={setLightingMode}
        trafficSpeed={trafficSpeed}
        setTrafficSpeed={setTrafficSpeed}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        avatarInteracted={avatarInteracted}
        totalCommits={totalCommits}
        scrollToChapter={scrollToChapter}
        onVirtualDirection={setVirtualInput}
      />

      {/* Scroll Track to drive Animated Scroll in Scroll Mode */}
      {viewMode === 'scroll' && (
        <div ref={scrollContainerRef} className="relative w-full h-[500vh] pointer-events-none" />
      )}
    </main>
  )
}
