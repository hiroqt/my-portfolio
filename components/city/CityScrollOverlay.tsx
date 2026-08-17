'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaVolumeUp,
  FaVolumeMute,
  FaArrowLeft,
  FaRocket,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaWalking,
} from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { LightingMode, ViewMode } from './CityScene'
import { BuildingData } from './CityBuildings'
import { cityAudio } from './CityAudio'

interface CityScrollOverlayProps {
  scrollProgress: number
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  lightingMode: LightingMode
  setLightingMode: (mode: LightingMode) => void
  trafficSpeed: number
  setTrafficSpeed: (speed: number) => void
  zoomLevel?: number
  setZoomLevel?: (zoom: number) => void
  selectedBuilding: BuildingData | null
  setSelectedBuilding: (bldg: BuildingData | null) => void
  avatarInteracted: boolean
  totalCommits: number
  scrollToChapter: (targetProgress: number) => void
  onVirtualDirection?: (dir: { x: number; z: number; y?: number; isSprint?: boolean }) => void
}

const chapters = [
  { id: 1, name: 'Metropolis Skyline', progress: 0.05, desc: 'Overview establishing shot of the NYC & LA style city' },
  { id: 2, name: 'Central Park Plaza', progress: 0.32, desc: 'Ground observation deck with Arnel & lush park trees' },
  { id: 3, name: 'Avenue Traffic', progress: 0.58, desc: 'NYC yellow cabs and sports cars traveling along avenues' },
  { id: 4, name: 'Corporate Towers', progress: 0.82, desc: 'Manhattan stepped towers & corporate project headquarters' },
  { id: 5, name: 'Explore City', progress: 0.98, desc: 'Walk or fly freely through the 3D metropolis' },
]

export const CityScrollOverlay: React.FC<CityScrollOverlayProps> = ({
  scrollProgress,
  viewMode,
  setViewMode,
  lightingMode,
  setLightingMode,
  trafficSpeed,
  setTrafficSpeed,
  zoomLevel = 1.0,
  setZoomLevel,
  selectedBuilding,
  setSelectedBuilding,
  avatarInteracted,
  totalCommits,
  scrollToChapter,
  onVirtualDirection,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [isSprintActive, setIsSprintActive] = useState(false)

  const handleAudioToggle = () => {
    const active = cityAudio.toggle()
    setIsPlayingAudio(active)
  }

  let currentChapterIndex = 0
  if (scrollProgress >= 0.9) currentChapterIndex = 4
  else if (scrollProgress >= 0.7) currentChapterIndex = 3
  else if (scrollProgress >= 0.45) currentChapterIndex = 2
  else if (scrollProgress >= 0.2) currentChapterIndex = 1
  else currentChapterIndex = 0

  const handleTouchDir = (dx: number, dz: number, dy = 0) => {
    if (onVirtualDirection) {
      onVirtualDirection({ x: dx, z: dz, y: dy, isSprint: isSprintActive })
    }
  }

  const stopTouchDir = () => {
    if (onVirtualDirection) {
      onVirtualDirection({ x: 0, z: 0, y: 0, isSprint: isSprintActive })
    }
  }

  return (
    <>
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 pointer-events-none flex justify-between items-start gap-4">
        {/* Left: Brand & Telemetry */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a
            href="/"
            aria-label="Back to Portfolio"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-md"
          >
            <FaArrowLeft className="text-xs" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Nel. Portfolio</span>
          </a>

          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 backdrop-blur-md text-xs font-mono text-slate-700 dark:text-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold">NYC / LA CITY</span>
            <span className="text-slate-400">|</span>
            <span className="font-bold text-sky-600 dark:text-sky-400">{totalCommits > 0 ? totalCommits.toLocaleString() : '1,280+'} COMMITS</span>
          </div>
        </div>

        {/* Right: Controls & View Modes */}
        <div className="flex items-center flex-wrap justify-end gap-2 sm:gap-2.5 pointer-events-auto">
          {/* Audio Synthesizer */}
          <button
            onClick={handleAudioToggle}
            aria-label={isPlayingAudio ? 'Mute City Ambient Audio' : 'Play City Ambient Audio'}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-sm ${
              isPlayingAudio
                ? 'bg-sky-500/20 border-sky-400 text-sky-600 dark:text-sky-300'
                : 'bg-white/85 dark:bg-slate-900/85 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isPlayingAudio ? <FaVolumeUp className="text-sm" /> : <FaVolumeMute className="text-sm" />}
          </button>

          {/* Lighting Mode Switcher */}
          <button
            onClick={() => {
              cityAudio.playModeSwitch()
              const modes: LightingMode[] = ['day', 'sunset', 'night', 'morning']
              const nextIdx = (modes.indexOf(lightingMode) + 1) % modes.length
              setLightingMode(modes[nextIdx])
            }}
            aria-label="Toggle Lighting Theme"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 backdrop-blur-md text-xs font-mono text-slate-800 dark:text-slate-200 uppercase transition-all shadow-sm"
          >
            {lightingMode === 'day' && <FaSun className="text-amber-500" />}
            {lightingMode === 'sunset' && <FaSun className="text-orange-500" />}
            {lightingMode === 'night' && <FaMoon className="text-sky-400" />}
            {lightingMode === 'morning' && <FaCloudSun className="text-rose-400" />}
            <span className="hidden sm:inline capitalize">{lightingMode}</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-sm">
            <button
              onClick={() => {
                cityAudio.playModeSwitch()
                setViewMode('scroll')
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                viewMode === 'scroll'
                  ? 'bg-sky-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Scroll
            </button>

            <button
              onClick={() => {
                cityAudio.playModeSwitch()
                setViewMode('walk')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                viewMode === 'walk'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              <FaWalking className="text-xs" />
              <span>Walk</span>
            </button>

            <button
              onClick={() => {
                cityAudio.playModeSwitch()
                setViewMode('free')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                viewMode === 'free'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
              }`}
            >
              <FaRocket className="text-xs" />
              <span>Free Mode</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. WALK MODE KEYBOARD & CONTROLS HUD HELPER */}
      <AnimatePresence>
        {viewMode === 'walk' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 sm:px-6 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-emerald-500/40 backdrop-blur-xl text-slate-800 dark:text-slate-100 font-mono text-xs shadow-lg pointer-events-auto flex items-center flex-wrap justify-center gap-3 sm:gap-5"
          >
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">W</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">A</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">S</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">D</span>
              <span className="text-slate-600 dark:text-slate-300 ml-1">/ Arrows to Walk</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">Shift</span>
              <span className="text-slate-600 dark:text-slate-300">Sprint</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-sky-600 dark:text-sky-400 font-bold">🖱 Drag</span>
              <span className="text-slate-600 dark:text-slate-300">Look 360°</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FREE FLIGHT MODE HUD HELPER */}
      <AnimatePresence>
        {viewMode === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 sm:px-6 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-indigo-500/40 backdrop-blur-xl text-slate-800 dark:text-slate-100 font-mono text-xs shadow-lg pointer-events-auto flex items-center flex-wrap justify-center gap-3 sm:gap-5"
          >
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 border border-indigo-400 text-indigo-700 dark:text-indigo-300 font-bold">🛸 FREE FLIGHT</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">WASD</span>
              <span className="text-slate-600 dark:text-slate-300">Fly</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">Space</span>
              <span className="text-slate-600 dark:text-slate-300">Up</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">C / Q</span>
              <span className="text-slate-600 dark:text-slate-300">Down</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold">Shift</span>
              <span className="text-slate-600 dark:text-slate-300">Boost</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">🖱 Drag</span>
              <span className="text-slate-600 dark:text-slate-300">Look 360°</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. RIGHT SIDEBAR CHAPTER PROGRESS RAIL */}
      {viewMode === 'scroll' && (
        <nav aria-label="Scene Chapters" className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 pointer-events-auto">
          {chapters.map((ch, idx) => {
            const isActive = currentChapterIndex === idx
            return (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.progress)}
                className="group flex items-center gap-3 text-right"
                aria-label={`Jump to ${ch.name}`}
              >
                <span
                  className={`text-[11px] font-mono tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    isActive ? 'text-sky-600 dark:text-sky-400 font-bold opacity-100' : 'text-slate-500'
                  }`}
                >
                  {ch.name}
                </span>
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-600 dark:bg-sky-400 scale-125 shadow-md'
                      : 'bg-slate-400/60 dark:bg-slate-600 group-hover:bg-sky-500'
                  }`}
                />
              </button>
            )
          })}
        </nav>
      )}

      {/* 5. CINEMATIC CHAPTER CARDS */}
      {viewMode === 'scroll' && (
        <div className="fixed bottom-8 left-6 sm:left-12 max-w-lg z-30 pointer-events-none">
          <AnimatePresence mode="wait">
            {currentChapterIndex === 0 && (
              <motion.div
                key="act-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl shadow-xl pointer-events-auto"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 block mb-1">
                  ACT 01 // METROPOLIS SKYLINE
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                  Arnel&apos;s Commit City
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  A realistic 3D metropolis inspired by NYC & LA architecture, where skyscraper heights, window grids, and corporate towers reflect real GitHub code activity.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-sky-600 dark:text-sky-400 animate-bounce font-medium">
                    <span>Scroll down to descend</span>
                    <span>↓</span>
                  </div>
                  <span className="text-slate-400">or</span>
                  <button
                    onClick={() => setViewMode('free')}
                    className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-md"
                  >
                    🛸 Free Flight Mode
                  </button>
                </div>
              </motion.div>
            )}

            {currentChapterIndex === 1 && (
              <motion.div
                key="act-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl shadow-xl pointer-events-auto"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 block mb-1">
                  ACT 02 // CENTRAL PARK PLAZA
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  Urban Plaza & Park Garden
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Meet Arnel (<span className="text-sky-600 dark:text-sky-400 font-mono font-bold">@hiroqt</span>) at the central park plaza surrounded by LA palms and oak trees.
                </p>
                <p className="text-xs font-mono text-amber-700 dark:text-amber-300">
                  💡 Click on the 3D character to wave, or switch to <strong className="text-emerald-600 dark:text-emerald-400">Walk Mode</strong> to explore the streets!
                </p>
              </motion.div>
            )}

            {currentChapterIndex === 2 && (
              <motion.div
                key="act-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl shadow-xl pointer-events-auto"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 block mb-1">
                  ACT 03 // AVENUE TRAFFIC
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  NYC Taxis & Civilian Traffic
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Iconic NYC yellow cabs, LA sports convertibles, executive SUVs, and metro buses continuously cruise along the avenue network.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500">Traffic Speed:</span>
                  {[0.5, 1.0, 2.0].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setTrafficSpeed(spd)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                        trafficSpeed === spd
                          ? 'bg-sky-600 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentChapterIndex === 3 && (
              <motion.div
                key="act-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl shadow-xl pointer-events-auto"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 block mb-1">
                  ACT 04 // CORPORATE TOWERS
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  Headquarters Monoliths
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Flagship project towers (HiveSync, Tearsizes, PCAE-Mentor, VCM) featuring rooftop cedar water tanks, Art Deco stepped crowns, and corporate logos.
                </p>
                <p className="text-xs font-mono text-sky-600 dark:text-sky-400 font-medium">
                  🔍 Click any building to view contribution details!
                </p>
              </motion.div>
            )}

            {currentChapterIndex === 4 && (
              <motion.div
                key="act-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 backdrop-blur-xl shadow-xl pointer-events-auto"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 block mb-1">
                  ACT 05 // FREE EXPLORATION
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  Interactive Modes Unlocked
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Explore every corner! Fly freely through the skyline or walk through avenues with WASD.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setViewMode('free')}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-md"
                  >
                    🛸 Free Flight Mode (Fly 3D)
                  </button>
                  <button
                    onClick={() => setViewMode('walk')}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md"
                  >
                    🚶 Walk in City (WASD)
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 6. VIRTUAL TOUCH D-PAD & FLIGHT CONTROLS (For Mobile in Walk / Free Modes) */}
      {(viewMode === 'walk' || viewMode === 'free') && (
        <div className="fixed bottom-8 left-6 sm:left-10 z-40 pointer-events-auto flex flex-col items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-lg md:hidden">
          <button
            onPointerDown={() => handleTouchDir(0, -1)}
            onPointerUp={stopTouchDir}
            className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800 active:bg-indigo-600 text-slate-800 dark:text-white active:text-white font-bold flex items-center justify-center text-sm shadow-sm"
          >
            ▲
          </button>
          <div className="flex gap-1.5">
            <button
              onPointerDown={() => handleTouchDir(-1, 0)}
              onPointerUp={stopTouchDir}
              className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800 active:bg-indigo-600 text-slate-800 dark:text-white active:text-white font-bold flex items-center justify-center text-sm shadow-sm"
            >
              ◀
            </button>
            <button
              onPointerDown={() => handleTouchDir(0, 1)}
              onPointerUp={stopTouchDir}
              className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800 active:bg-indigo-600 text-slate-800 dark:text-white active:text-white font-bold flex items-center justify-center text-sm shadow-sm"
            >
              ▼
            </button>
            <button
              onPointerDown={() => handleTouchDir(1, 0)}
              onPointerUp={stopTouchDir}
              className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800 active:bg-indigo-600 text-slate-800 dark:text-white active:text-white font-bold flex items-center justify-center text-sm shadow-sm"
            >
              ▶
            </button>
          </div>

          {viewMode === 'free' && (
            <div className="flex gap-1.5 mt-1 w-full">
              <button
                onPointerDown={() => handleTouchDir(0, 0, 1)}
                onPointerUp={stopTouchDir}
                className="flex-1 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-[11px] shadow-sm active:bg-indigo-700"
              >
                ▲ Ascend
              </button>
              <button
                onPointerDown={() => handleTouchDir(0, 0, -1)}
                onPointerUp={stopTouchDir}
                className="flex-1 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-[11px] shadow-sm active:bg-slate-300"
              >
                ▼ Descend
              </button>
            </div>
          )}

          <button
            onClick={() => setIsSprintActive(!isSprintActive)}
            className={`w-full py-1 mt-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
              isSprintActive ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {isSprintActive ? '⚡ Boost ON' : '⚡ Boost OFF'}
          </button>
        </div>
      )}

      {/* 7. SELECTED BUILDING INSPECTION & ZOOM DETAILS MODAL */}
      <AnimatePresence>
        {selectedBuilding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="fixed top-20 right-6 sm:right-10 z-50 w-84 max-w-[calc(100vw-3rem)] p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-sky-400/50 backdrop-blur-2xl shadow-2xl pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-3 gap-2">
              <div className="flex items-center gap-3">
                {selectedBuilding.logoPath && (
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 p-1.5 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedBuilding.logoPath}
                      alt={selectedBuilding.repoName || 'Project Logo'}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold">
                      {selectedBuilding.isLandmark ? 'HEADQUARTERS MONOLITH' : 'OFFICE SKYSCRAPER'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedBuilding.repoName || `Tower Sector ${selectedBuilding.id}`}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedBuilding(null)}
                className="text-slate-400 hover:text-black dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close details"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {selectedBuilding.subtitle && (
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3 leading-relaxed">
                {selectedBuilding.subtitle}
              </p>
            )}

            <div className="space-y-2 text-xs font-mono border-t border-slate-200 dark:border-slate-800 pt-3 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Recorded Date:</span>
                <span className="text-slate-900 dark:text-white font-bold">{selectedBuilding.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Commit Activity:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedBuilding.commits} Commits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Building Height:</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">{Math.round(selectedBuilding.height * 10)}m (~{Math.round(selectedBuilding.height * 2.8)} Floors)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Night Window Glow:</span>
                <span className="text-amber-500 dark:text-amber-400 font-bold">
                  {Math.min(100, Math.max(12, Math.round(12 + (selectedBuilding.commits / 12) * 82)))}% Lit
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-sky-500 to-amber-400 h-full rounded-full"
                style={{ width: `${Math.min(100, Math.max(15, (selectedBuilding.commits / 15) * 100))}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              {selectedBuilding.projectSlug ? (
                <a
                  href={`/projects/${selectedBuilding.projectSlug}`}
                  className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold text-center transition-all shadow-md active:scale-98"
                >
                  🚀 View Project Case Study
                </a>
              ) : (
                <a
                  href="https://github.com/hiroqt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold text-center transition-all shadow-md active:scale-98"
                >
                  View GitHub Activity
                </a>
              )}
              <button
                onClick={() => setSelectedBuilding(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold transition-all"
                title="Return to free camera exploration"
              >
                Unfocus
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. AVATAR INTERACTION TOAST */}
      <AnimatePresence>
        {avatarInteracted && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-sky-400/50 backdrop-blur-xl text-slate-800 dark:text-slate-100 font-mono text-xs sm:text-sm shadow-xl flex items-center gap-3 pointer-events-auto"
          >
            <span className="text-lg">👋</span>
            <span>
              <strong className="text-slate-900 dark:text-white">Arnel:</strong> &ldquo;Welcome to my 3D Metropolis! Use WASD to explore the city with me.&rdquo;
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. ON-SCREEN CAMERA ZOOM CONTROLS */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-lg pointer-events-auto">
        <button
          onClick={() => {
            cityAudio.playModeSwitch()
            if (setZoomLevel) {
              setZoomLevel(Math.min(3.2, zoomLevel + 0.25))
            }
          }}
          aria-label="Zoom Out"
          title="Zoom Out (Aerial View)"
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center text-sm transition-all shadow-sm active:scale-95"
        >
          −
        </button>

        <button
          onClick={() => {
            cityAudio.playModeSwitch()
            if (setZoomLevel) setZoomLevel(1.0)
          }}
          aria-label="Reset Zoom"
          title="Reset Zoom to 100%"
          className="px-2.5 py-1 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors"
        >
          {Math.round((1 / zoomLevel) * 100)}%
        </button>

        <button
          onClick={() => {
            cityAudio.playModeSwitch()
            if (setZoomLevel) {
              setZoomLevel(Math.max(0.4, zoomLevel - 0.25))
            }
          }}
          aria-label="Zoom In"
          title="Zoom In (Close-Up)"
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center text-sm transition-all shadow-sm active:scale-95"
        >
          +
        </button>
      </div>
    </>
  )
}
