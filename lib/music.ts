'use client'

import { useState, useEffect, useCallback } from 'react'

export interface TrackInfo {
  title: string
  artist: string
  audioSrc: string
  coverSrc: string
}

export const CURRENT_TRACK: TrackInfo = {
  title: "B's on the Table",
  artist: 'Drake ft. 21 Savage',
  audioSrc: '/music/bs-on-the-table.mp3',
  coverSrc: '/music/bs-on-the-table.jpg',
}

export interface MusicEngineState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  headerWaveBars: number[] // 4 bars for header pill
  eqBars: number[] // 9 bars for card visualizer
}

type Subscriber = (state: MusicEngineState) => void

class MusicEngine {
  private audio: HTMLAudioElement | null = null
  private audioCtx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private gainNode: GainNode | null = null
  private isSourceConnected = false
  private animFrameId: number | null = null
  private freqData: Uint8Array | null = null
  private fadeTimeout: number | null = null
  private subscribers = new Set<Subscriber>()

  private prevVolume = 0.8

  private state: MusicEngineState = {
    isPlaying: false,
    currentTime: 0,
    duration: 135.24,
    volume: 0.8,
    isMuted: false,
    headerWaveBars: [0.25, 0.65, 0.45, 0.75],
    eqBars: Array(9).fill(0.12),
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio()
    }
  }

  private initAudio() {
    if (this.audio) return
    this.audio = new Audio(CURRENT_TRACK.audioSrc)
    this.audio.preload = 'auto'

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio && this.audio.duration && !isNaN(this.audio.duration)) {
        this.state.duration = this.audio.duration
        this.notify()
      }
    })

    this.audio.addEventListener('durationchange', () => {
      if (this.audio && this.audio.duration && !isNaN(this.audio.duration)) {
        this.state.duration = this.audio.duration
        this.notify()
      }
    })

    this.audio.addEventListener('canplay', () => {
      if (this.audio && this.audio.duration && !isNaN(this.audio.duration)) {
        this.state.duration = this.audio.duration
        this.notify()
      }
    })

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.state.currentTime = this.audio.currentTime
        this.notify()
      }
    })

    this.audio.addEventListener('play', () => {
      this.state.isPlaying = true
      this.startLoop()
      this.notify()
    })

    this.audio.addEventListener('pause', () => {
      this.state.isPlaying = false
      this.notify()
    })

    this.audio.addEventListener('ended', () => {
      this.state.isPlaying = false
      this.state.currentTime = 0
      if (this.audio) this.audio.currentTime = 0
      this.notify()
    })
  }

  private async setupWebAudio(): Promise<boolean> {
    if (typeof window === 'undefined') return false
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return false

    if (!this.audioCtx) {
      this.audioCtx = new AudioContextClass()
    }

    if (!this.analyser) {
      this.analyser = this.audioCtx.createAnalyser()
      this.analyser.fftSize = 256
      this.analyser.smoothingTimeConstant = 0.8
    }

    if (!this.gainNode) {
      this.gainNode = this.audioCtx.createGain()
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime)
    }

    if (!this.isSourceConnected && this.audio && this.audioCtx && this.analyser && this.gainNode) {
      try {
        const source = this.audioCtx.createMediaElementSource(this.audio)
        source.connect(this.analyser)
        this.analyser.connect(this.gainNode)
        this.gainNode.connect(this.audioCtx.destination)
        this.isSourceConnected = true
      } catch (e) {
        // Already connected
      }
    }

    if (this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume()
      } catch (e) {}
    }

    return true
  }

  private startLoop() {
    if (this.animFrameId !== null) return

    const tick = () => {
      if (!this.audio) return

      // Realtime playback position sync at 60fps
      this.state.currentTime = this.audio.currentTime
      if (
        this.audio.duration &&
        !isNaN(this.audio.duration) &&
        this.audio.duration !== this.state.duration
      ) {
        this.state.duration = this.audio.duration
      }

      // Compute realtime frequencies
      if (this.analyser) {
        const binCount = this.analyser.frequencyBinCount
        if (!this.freqData || this.freqData.length !== binCount) {
          this.freqData = new Uint8Array(binCount)
        }
        this.analyser.getByteFrequencyData(this.freqData as any)

        // 4 header wave bars: Bass, Low-Mid, Mid-High, High
        const bassIdx = Math.floor(binCount * 0.05)
        const lowMidIdx = Math.floor(binCount * 0.15)
        const midHighIdx = Math.floor(binCount * 0.35)
        const highIdx = Math.floor(binCount * 0.6)

        const b0 = Math.min(1, Math.max(0.12, (this.freqData[bassIdx] || 0) / 200))
        const b1 = Math.min(1, Math.max(0.12, (this.freqData[lowMidIdx] || 0) / 180))
        const b2 = Math.min(1, Math.max(0.12, (this.freqData[midHighIdx] || 0) / 160))
        const b3 = Math.min(1, Math.max(0.12, (this.freqData[highIdx] || 0) / 150))
        this.state.headerWaveBars = [b0, b1, b2, b3]

        // 9 card equalizer bars
        const newEq = Array(9).fill(0)
        for (let i = 0; i < 9; i++) {
          const distFromCenter = 2 * Math.abs(i / 8 - 0.5)
          const gaussian = Math.exp(-(distFromCenter * distFromCenter) / 0.5)
          const binStart = Math.floor(binCount * (0.18 + 0.3 * gaussian))
          const binSpread = Math.min(
            Math.floor(binCount * (0.02 + 0.08 * gaussian)),
            binCount - binStart
          )

          let sum = 0
          let count = 0
          for (let j = 0; j < binSpread; j++) {
            const idx = binStart + j
            if (idx < binCount) {
              sum += this.freqData[idx]
              count++
            }
          }

          const avg = count > 0 ? sum / count : 0
          const centerFactor = Math.exp(-((distFromCenter * distFromCenter) / 0.18))
          const scaled =
            Math.pow(avg / 255, 1.35) *
            (0.15 + 1.35 * centerFactor) *
            (0.7 + Math.random() * (0.5 + 0.4 * centerFactor))
          newEq[i] = Math.min(1, scaled < 0.04 ? 0.35 * scaled : scaled)
        }
        this.state.eqBars = newEq
      } else {
        // Fallback rhythmic wave animation while audio is playing
        const t = this.audio.currentTime * 6.5
        this.state.headerWaveBars = [
          0.3 + 0.5 * Math.abs(Math.sin(t)),
          0.3 + 0.65 * Math.abs(Math.sin(t + 1.2)),
          0.3 + 0.45 * Math.abs(Math.sin(t + 2.4)),
          0.3 + 0.6 * Math.abs(Math.sin(t + 3.6)),
        ]
      }

      this.notify()

      if (this.state.isPlaying) {
        this.animFrameId = requestAnimationFrame(tick)
      } else {
        this.animFrameId = null
      }
    }

    this.animFrameId = requestAnimationFrame(tick)
  }

  public async togglePlay(): Promise<void> {
    this.initAudio()
    if (!this.audio) return

    await this.setupWebAudio()

    if (this.state.isPlaying) {
      // Smooth fade out
      if (this.gainNode && this.audioCtx) {
        const now = this.audioCtx.currentTime
        this.gainNode.gain.cancelScheduledValues(now)
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now)
        this.gainNode.gain.linearRampToValueAtTime(0, now + 0.25)
      }

      if (this.fadeTimeout) clearTimeout(this.fadeTimeout)
      this.fadeTimeout = window.setTimeout(() => {
        this.audio?.pause()
        this.state.isPlaying = false
        this.notify()
      }, 250)
    } else {
      // Smooth fade in
      if (this.fadeTimeout) {
        clearTimeout(this.fadeTimeout)
        this.fadeTimeout = null
      }

      try {
        await this.audio.play()
      } catch (err) {
        console.error('Audio playback failed:', err)
        return
      }

      const targetGain = this.state.isMuted ? 0 : this.state.volume
      if (this.gainNode && this.audioCtx) {
        const now = this.audioCtx.currentTime
        this.gainNode.gain.cancelScheduledValues(now)
        this.gainNode.gain.setValueAtTime(0, now)
        this.gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.25)
      } else {
        this.audio.volume = targetGain
      }

      this.state.isPlaying = true
      this.startLoop()
      this.notify()
    }
  }

  public seek(seconds: number) {
    this.initAudio()
    if (!this.audio) return
    const clamped = Math.max(0, Math.min(this.state.duration, seconds))
    this.audio.currentTime = clamped
    this.state.currentTime = clamped
    this.notify()
  }

  public seekRelative(deltaSeconds: number) {
    this.initAudio()
    if (!this.audio) return
    this.seek(this.audio.currentTime + deltaSeconds)
  }

  public setVolume(vol: number) {
    this.initAudio()
    const clamped = Math.max(0, Math.min(1, vol))
    this.state.volume = clamped
    if (clamped > 0 && this.state.isMuted) {
      this.state.isMuted = false
    }

    const targetGain = this.state.isMuted ? 0 : clamped
    if (this.gainNode && this.audioCtx && this.state.isPlaying) {
      const now = this.audioCtx.currentTime
      this.gainNode.gain.cancelScheduledValues(now)
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now)
      this.gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.05)
    } else if (this.audio) {
      this.audio.volume = targetGain
    }

    this.notify()
  }

  public toggleMute() {
    this.initAudio()
    if (this.state.isMuted) {
      const restore = this.prevVolume > 0 ? this.prevVolume : 0.8
      this.state.isMuted = false
      this.state.volume = restore
      if (this.gainNode && this.audioCtx && this.state.isPlaying) {
        const now = this.audioCtx.currentTime
        this.gainNode.gain.cancelScheduledValues(now)
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now)
        this.gainNode.gain.linearRampToValueAtTime(restore, now + 0.05)
      } else if (this.audio) {
        this.audio.volume = restore
      }
    } else {
      this.prevVolume = this.state.volume > 0 ? this.state.volume : 0.8
      this.state.isMuted = true
      if (this.gainNode && this.audioCtx && this.state.isPlaying) {
        const now = this.audioCtx.currentTime
        this.gainNode.gain.cancelScheduledValues(now)
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now)
        this.gainNode.gain.linearRampToValueAtTime(0, now + 0.05)
      } else if (this.audio) {
        this.audio.volume = 0
      }
    }
    this.notify()
  }

  public subscribe(cb: Subscriber): () => void {
    this.initAudio()
    this.subscribers.add(cb)
    cb(this.state)
    return () => {
      this.subscribers.delete(cb)
    }
  }

  public getState(): MusicEngineState {
    return { ...this.state }
  }

  private notify() {
    this.subscribers.forEach((cb) => {
      cb({ ...this.state })
    })
  }
}

export const musicEngine = new MusicEngine()

export function useMusic() {
  const [state, setState] = useState<MusicEngineState>(() => musicEngine.getState())

  useEffect(() => {
    return musicEngine.subscribe((next) => {
      setState(next)
    })
  }, [])

  return {
    ...state,
    togglePlay: useCallback(() => musicEngine.togglePlay(), []),
    seek: useCallback((s: number) => musicEngine.seek(s), []),
    seekRelative: useCallback((d: number) => musicEngine.seekRelative(d), []),
    setVolume: useCallback((v: number) => musicEngine.setVolume(v), []),
    toggleMute: useCallback(() => musicEngine.toggleMute(), []),
  }
}
