'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaVolumeUp,
  FaVolumeMute,
  FaSlidersH,
  FaPlay,
  FaKeyboard,
  FaInfoCircle,
} from 'react-icons/fa'
import {
  SwitchType,
  SWITCH_PROFILES,
  getKeyboardAudio,
} from '@/lib/audio/keyboardAudio'

interface SwitchSoundPreviewProps {
  currentSwitch: SwitchType
  onSelectSwitch: (sw: SwitchType) => void
  volume: number
  onVolumeChange: (vol: number) => void
  isMuted: boolean
  onToggleMute: () => void
}

export function SwitchSoundPreview({
  currentSwitch,
  onSelectSwitch,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}: SwitchSoundPreviewProps) {
  const [activeTestKey, setActiveTestKey] = useState<string | null>(null)
  const [testInputText, setTestInputText] = useState('')
  const [lastPlayedSwitch, setLastPlayedSwitch] = useState<SwitchType | null>(null)

  const handleAudition = (sw: SwitchType, keyType: 'standard' | 'space' | 'enter' = 'standard') => {
    onSelectSwitch(sw)
    setLastPlayedSwitch(sw)
    const audio = getKeyboardAudio()
    audio.playKey(sw, keyType)
  }

  const handleTestKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let keyType: 'standard' | 'space' | 'enter' | 'backspace' = 'standard'
    if (e.key === ' ') keyType = 'space'
    else if (e.key === 'Enter') keyType = 'enter'
    else if (e.key === 'Backspace') keyType = 'backspace'

    setActiveTestKey(e.key.length === 1 ? e.key.toUpperCase() : e.key)
    setLastPlayedSwitch(currentSwitch)

    const audio = getKeyboardAudio()
    audio.playKey(currentSwitch, keyType)

    setTimeout(() => {
      setActiveTestKey(null)
    }, 150)
  }

  return (
    <div className="rounded-2xl bg-card/60 dark:bg-card/40 border border-border/70 backdrop-blur-md p-4 sm:p-6 space-y-6 shadow-xs">
      {/* ── Header Strip: Title + Volume Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <h3 className="font-supreme text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
              <span>Mechanical Switch Sound Lab</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-accent/15 text-accent font-semibold">
                Web Audio Synth
              </span>
            </h3>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Audition acoustic profiles &bull; Real-time synthesized keystrokes &bull; Zero latency
          </p>
        </div>

        {/* Master Volume & Mute Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-muted/40 dark:bg-white/[0.03] px-3 py-1.5 rounded-xl border border-border/40">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute switches' : 'Mute switches'}
            title={isMuted ? 'Unmute switches' : 'Mute switches'}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95"
          >
            {isMuted ? (
              <FaVolumeMute className="w-4 h-4 text-red-400" />
            ) : (
              <FaVolumeUp className="w-4 h-4 text-accent" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <FaSlidersH className="w-3 h-3 text-muted-foreground/60 hidden xs:block" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                if (isMuted) onToggleMute()
                onVolumeChange(parseFloat(e.target.value))
              }}
              aria-label="Switch Sound Volume"
              className="w-20 sm:w-24 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="font-mono text-[11px] text-muted-foreground w-8 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* ── Switch Cards Grid (Red, Brown, Blue, Black, Holy Panda) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {(Object.keys(SWITCH_PROFILES) as SwitchType[]).map((key) => {
          const profile = SWITCH_PROFILES[key]
          const isSelected = currentSwitch === key

          return (
            <motion.div
              key={key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAudition(key)}
              className={`relative flex flex-col justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left group ${
                isSelected
                  ? 'border-accent bg-accent/10 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-accent/30'
                  : 'border-border/60 bg-muted/30 dark:bg-white/[0.02] hover:border-border hover:bg-muted/60'
              }`}
            >
              {/* Active Switch Indicator */}
              {isSelected && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
              )}

              {/* Top: Switch Color & Name */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {/* Visual switch stem icon */}
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center shadow-xs text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: profile.color }}
                  >
                    +
                  </div>
                  <div>
                    <h4 className="font-supreme text-xs sm:text-sm font-bold text-foreground leading-tight">
                      {profile.name}
                    </h4>
                    <span
                      className="text-[10px] font-mono font-medium"
                      style={{ color: profile.color }}
                    >
                      {profile.type}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {profile.soundProfile}
                </p>
              </div>

              {/* Bottom: Specs & Audition Button */}
              <div className="pt-3 mt-2 border-t border-border/30 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="bg-muted/70 px-1.5 py-0.5 rounded text-[9.5px]">
                    {profile.actuationForce}
                  </span>
                  <span>{profile.travelDistance}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAudition(key)
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-semibold transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-accent text-background shadow-xs'
                      : 'bg-muted/80 text-foreground group-hover:bg-accent group-hover:text-white'
                  }`}
                >
                  <FaPlay className="w-2 h-2" />
                  <span>Test</span>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── Interactive Switch Tester Sandbox ── */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-muted/40 dark:bg-black/30 border border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-lg bg-accent/15 text-accent shrink-0">
            <FaKeyboard className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-mono font-semibold text-foreground truncate">
              Live Key Testing Workbench
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              Type in the test box to audition{' '}
              <span className="text-accent font-medium">
                {SWITCH_PROFILES[currentSwitch].name}
              </span>
            </p>
          </div>
        </div>

        {/* Interactive test input */}
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative flex-1">
            <input
              type="text"
              value={testInputText}
              onChange={(e) => setTestInputText(e.target.value)}
              onKeyDown={handleTestKeyInput}
              placeholder="Type here to test sound..."
              aria-label="Test typing mechanical switch sound"
              className="w-full px-3 py-1.5 rounded-lg bg-background border border-border/80 text-xs font-mono placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent"
            />
            {activeTestKey && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-accent text-background font-mono text-[9px] font-bold animate-pulse">
                {activeTestKey}
              </span>
            )}
          </div>

          {/* Space & Enter quick audition triggers */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => handleAudition(currentSwitch, 'space')}
              title="Test Spacebar Thump"
              className="px-2 py-1.5 rounded-lg bg-background border border-border text-[10px] font-mono font-semibold hover:border-accent hover:text-accent transition-colors active:scale-95 cursor-pointer"
            >
              [Space]
            </button>
            <button
              type="button"
              onClick={() => handleAudition(currentSwitch, 'enter')}
              title="Test Enter Clack"
              className="px-2 py-1.5 rounded-lg bg-background border border-border text-[10px] font-mono font-semibold hover:border-accent hover:text-accent transition-colors active:scale-95 cursor-pointer"
            >
              ↵
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
