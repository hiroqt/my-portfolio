// Mechanical Keyboard Switch Web Audio Synthesizer
// Ultra-reliable, persistent, zero-latency mechanical switch acoustic synthesizer.
// Features:
// - Pre-allocated noise buffers (no GC thrashing or dropped audio on fast typing)
// - Global window user gesture unlock hooks (handles iOS Safari / Chrome autoplay policies)
// - Persistent audio context lifecycle with automatic auto-resume on tab focus
// - LocalStorage volume & mute persistence

export type SwitchType = 'red' | 'brown' | 'blue' | 'black' | 'holypanda'

export interface SwitchProfile {
  id: SwitchType
  name: string
  label: string
  color: string
  accentColor: string
  type: 'Linear' | 'Tactile' | 'Clicky' | 'Heavy Linear' | 'Custom Tactile'
  actuationForce: string
  travelDistance: string
  soundProfile: string
  description: string
}

export const SWITCH_PROFILES: Record<SwitchType, SwitchProfile> = {
  red: {
    id: 'red',
    name: 'Cherry MX Red',
    label: 'Red (Linear)',
    color: '#ef4444',
    accentColor: 'rgba(239, 68, 68, 0.2)',
    type: 'Linear',
    actuationForce: '45g',
    travelDistance: '4.0mm',
    soundProfile: 'Smooth, soft clack, quiet',
    description: 'Smooth and consistent keystroke without a tactile bump. Quiet and creamy bottom-out sound.',
  },
  brown: {
    id: 'brown',
    name: 'Gateron Brown',
    label: 'Brown (Tactile)',
    color: '#b45309',
    accentColor: 'rgba(180, 83, 9, 0.2)',
    type: 'Tactile',
    actuationForce: '55g',
    travelDistance: '4.0mm',
    soundProfile: 'Subtle bump, crisp clack',
    description: 'Gentle tactile feedback on actuation with a balanced mid-tone bottom-out clack.',
  },
  blue: {
    id: 'blue',
    name: 'Outemu Blue',
    label: 'Blue (Clicky)',
    color: '#3b82f6',
    accentColor: 'rgba(59, 130, 246, 0.2)',
    type: 'Clicky',
    actuationForce: '60g',
    travelDistance: '4.0mm',
    soundProfile: 'Sharp, loud, metallic click',
    description: 'Distinct tactile click with a sharp acoustic spring ping on every single stroke.',
  },
  black: {
    id: 'black',
    name: 'Gateron Oil King / Black',
    label: 'Black (Thocky Linear)',
    color: '#27272a',
    accentColor: 'rgba(39, 39, 42, 0.4)',
    type: 'Heavy Linear',
    actuationForce: '60g',
    travelDistance: '4.0mm',
    soundProfile: 'Deep, bassy, lubed "thock"',
    description: 'Heavier spring with a deep, low-frequency resonant sound and creamy lubed bottom-out.',
  },
  holypanda: {
    id: 'holypanda',
    name: 'Drop + Invyr Holy Panda',
    label: 'Holy Panda (Tactile Thock)',
    color: '#f59e0b',
    accentColor: 'rgba(245, 158, 11, 0.2)',
    type: 'Custom Tactile',
    actuationForce: '67g',
    travelDistance: '3.8mm',
    soundProfile: 'Punchy tactile snap, deep thock',
    description: 'Pronounced rounded tactile bump with a loud, distinctively satisfying bottom-out pop.',
  },
}

class KeyboardAudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private volume: number = 0.75
  private muted: boolean = false
  private isUnlocked: boolean = false
  private cachedNoiseBuffer: AudioBuffer | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      // Restore persisted preferences
      try {
        const savedVol = localStorage.getItem('kb_sound_vol')
        if (savedVol !== null) {
          this.volume = parseFloat(savedVol)
        }
        const savedMute = localStorage.getItem('kb_sound_muted')
        if (savedMute !== null) {
          this.muted = savedMute === 'true'
        }
      } catch {}

      // Register global interaction unlockers
      this.attachUnlockListeners()
    }
  }

  // Attach global unlock listeners for seamless playback
  private attachUnlockListeners() {
    const unlockHandler = () => {
      this.ensureContext()
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
    }

    const events = ['pointerdown', 'keydown', 'touchstart', 'click']
    events.forEach((evt) => {
      window.addEventListener(evt, unlockHandler, { once: false, passive: true })
    })

    // Handle tab visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
    })
  }

  // Ensure AudioContext is instantiated, running, and master gain is wired
  public ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null

    if (!this.ctx) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (!AudioContextClass) return null

        this.ctx = new AudioContextClass({ latencyHint: 'interactive' })

        // Master Gain Node
        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)

        // Pre-allocate cached noise buffer (1 second duration) to avoid GC thrashing
        const sampleRate = this.ctx.sampleRate || 44100
        const bufferSize = sampleRate * 1.0
        this.cachedNoiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate)
        const channelData = this.cachedNoiseBuffer.getChannelData(0)
        for (let i = 0; i < bufferSize; i++) {
          channelData[i] = Math.random() * 2 - 1
        }

        // Silent pulse to unlock Safari / iOS audio subsystem
        const silentOsc = this.ctx.createOscillator()
        const silentGain = this.ctx.createGain()
        silentGain.gain.value = 0.00001
        silentOsc.connect(silentGain)
        silentGain.connect(this.masterGain)
        silentOsc.start(0)
        silentOsc.stop(0.001)

        this.isUnlocked = true
      } catch {
        return null
      }
    }

    // Always resume if suspended
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }

    return this.ctx
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val))
    if (this.masterGain && this.ctx && !this.muted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime)
    }
    try {
      localStorage.setItem('kb_sound_vol', this.volume.toString())
    } catch {}
  }

  public getVolume(): number {
    return this.volume
  }

  public setMuted(muted: boolean) {
    this.muted = muted
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime)
    }
    try {
      localStorage.setItem('kb_sound_muted', muted ? 'true' : 'false')
    } catch {}
  }

  public isMute(): boolean {
    return this.muted
  }

  public toggleMute(): boolean {
    const next = !this.muted
    this.setMuted(next)
    return next
  }

  // Play mechanical switch key audio with rock-solid reliability
  public playKey(
    switchType: SwitchType = 'red',
    keyType: 'standard' | 'space' | 'enter' | 'backspace' = 'standard'
  ) {
    if (this.muted) return

    const ctx = this.ensureContext()
    if (!ctx || !this.masterGain) return

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        this.executeSound(ctx, switchType, keyType)
      }).catch(() => {})
      return
    }

    this.executeSound(ctx, switchType, keyType)
  }

  private executeSound(
    ctx: AudioContext,
    switchType: SwitchType,
    keyType: 'standard' | 'space' | 'enter' | 'backspace'
  ) {
    const t = ctx.currentTime

    // Add organic human pitch drift (+-3%)
    const pitchVariation = 0.97 + Math.random() * 0.06
    const velocityVariation = 0.88 + Math.random() * 0.24

    switch (switchType) {
      case 'red':
        this.playRedSwitch(ctx, t, keyType, pitchVariation, velocityVariation)
        break
      case 'brown':
        this.playBrownSwitch(ctx, t, keyType, pitchVariation, velocityVariation)
        break
      case 'blue':
        this.playBlueSwitch(ctx, t, keyType, pitchVariation, velocityVariation)
        break
      case 'black':
        this.playBlackSwitch(ctx, t, keyType, pitchVariation, velocityVariation)
        break
      case 'holypanda':
        this.playHolyPandaSwitch(ctx, t, keyType, pitchVariation, velocityVariation)
        break
      default:
        this.playRedSwitch(ctx, t, keyType, pitchVariation, velocityVariation)
    }
  }

  // Get cached noise source
  private getNoiseSource(ctx: AudioContext): AudioBufferSourceNode | null {
    if (!this.cachedNoiseBuffer) return null
    const source = ctx.createBufferSource()
    source.buffer = this.cachedNoiseBuffer
    return source
  }

  // 1. Red Switch (Linear): Soft, smooth plastic impact clack
  private playRedSwitch(
    ctx: AudioContext,
    t: number,
    keyType: string,
    pitch: number,
    vel: number
  ) {
    if (!this.masterGain) return

    const baseFreq = keyType === 'space' ? 320 : keyType === 'enter' ? 420 : 540
    const freq = baseFreq * pitch

    // Bottom-out oscillator (sine with quick pitch drop)
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq * 1.8, t)
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.5), t + 0.04)

    oscGain.gain.setValueAtTime(0.35 * vel, t)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045)

    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 0.05)

    // Filtered noise burst for keycap collision clack
    const noiseSource = this.getNoiseSource(ctx)
    if (noiseSource) {
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(keyType === 'space' ? 600 : 1100 * pitch, t)
      filter.Q.setValueAtTime(1.8, t)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.4 * vel, t)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.038)

      noiseSource.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(this.masterGain)

      // Random offset into pre-allocated noise buffer
      const offset = Math.random() * 0.8
      noiseSource.start(t, offset, 0.04)
    }
  }

  // 2. Brown Switch (Tactile): Subtle bump click followed by medium clack
  private playBrownSwitch(
    ctx: AudioContext,
    t: number,
    keyType: string,
    pitch: number,
    vel: number
  ) {
    if (!this.masterGain) return

    // Stage 1: Tactile bump (micro click)
    const bumpOsc = ctx.createOscillator()
    const bumpGain = ctx.createGain()
    bumpOsc.type = 'sine'
    bumpOsc.frequency.setValueAtTime(1450 * pitch, t)
    bumpOsc.frequency.exponentialRampToValueAtTime(800, t + 0.012)

    bumpGain.gain.setValueAtTime(0.22 * vel, t)
    bumpGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.014)

    bumpOsc.connect(bumpGain)
    bumpGain.connect(this.masterGain)
    bumpOsc.start(t)
    bumpOsc.stop(t + 0.015)

    // Stage 2: Bottom out clack (delayed by 6ms)
    const baseFreq = keyType === 'space' ? 280 : keyType === 'enter' ? 460 : 680
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(baseFreq * 1.5 * pitch, t + 0.006)
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq * 0.4), t + 0.048)

    oscGain.gain.setValueAtTime(0.4 * vel, t + 0.006)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.052)

    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(t + 0.006)
    osc.stop(t + 0.055)

    // Filtered noise
    const noiseSource = this.getNoiseSource(ctx)
    if (noiseSource) {
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1300 * pitch, t + 0.006)
      filter.Q.setValueAtTime(2.2, t + 0.006)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.42 * vel, t + 0.006)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045)

      noiseSource.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(this.masterGain)

      const offset = Math.random() * 0.8
      noiseSource.start(t + 0.006, offset, 0.045)
    }
  }

  // 3. Blue Switch (Clicky): Sharp metallic leaf spring click + bottom clack
  private playBlueSwitch(
    ctx: AudioContext,
    t: number,
    keyType: string,
    pitch: number,
    vel: number
  ) {
    if (!this.masterGain) return

    // Sharp click snap (high frequency peak)
    const clickOsc = ctx.createOscillator()
    const clickGain = ctx.createGain()
    clickOsc.type = 'square'
    clickOsc.frequency.setValueAtTime(3200 * pitch, t)
    clickOsc.frequency.exponentialRampToValueAtTime(1800, t + 0.016)

    clickGain.gain.setValueAtTime(0.45 * vel, t)
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018)

    clickOsc.connect(clickGain)
    clickGain.connect(this.masterGain)
    clickOsc.start(t)
    clickOsc.stop(t + 0.02)

    // Spring ping resonance
    const pingOsc = ctx.createOscillator()
    const pingGain = ctx.createGain()
    pingOsc.type = 'sine'
    pingOsc.frequency.setValueAtTime(2600 * pitch, t)
    pingGain.gain.setValueAtTime(0.18 * vel, t)
    pingGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035)

    pingOsc.connect(pingGain)
    pingGain.connect(this.masterGain)
    pingOsc.start(t)
    pingOsc.stop(t + 0.04)

    // Bottom out clack
    const baseFreq = keyType === 'space' ? 340 : keyType === 'enter' ? 520 : 750
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(baseFreq * 1.6 * pitch, t + 0.004)
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq * 0.4), t + 0.045)

    oscGain.gain.setValueAtTime(0.35 * vel, t + 0.004)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.048)

    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(t + 0.004)
    osc.stop(t + 0.05)

    // Crisp high-shelf noise
    const noiseSource = this.getNoiseSource(ctx)
    if (noiseSource) {
      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.setValueAtTime(2400 * pitch, t)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.38 * vel, t)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.028)

      noiseSource.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(this.masterGain)

      const offset = Math.random() * 0.8
      noiseSource.start(t, offset, 0.035)
    }
  }

  // 4. Black Switch (Heavy Linear / Cream Thock): Deep low frequency lubed "thock"
  private playBlackSwitch(
    ctx: AudioContext,
    t: number,
    keyType: string,
    pitch: number,
    vel: number
  ) {
    if (!this.masterGain) return

    const baseFreq = keyType === 'space' ? 180 : keyType === 'enter' ? 240 : 310
    const freq = baseFreq * pitch

    // Deep heavy fundamental sine/triangle
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq * 1.6, t)
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.45), t + 0.065)

    oscGain.gain.setValueAtTime(0.55 * vel, t)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)

    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(t)
    osc.stop(t + 0.075)

    // Sub plate thud
    const subOsc = ctx.createOscillator()
    const subGain = ctx.createGain()
    subOsc.type = 'triangle'
    subOsc.frequency.setValueAtTime(freq * 0.8, t)
    subGain.gain.setValueAtTime(0.4 * vel, t)
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055)

    subOsc.connect(subGain)
    subGain.connect(this.masterGain)
    subOsc.start(t)
    subOsc.stop(t + 0.06)

    // Heavily damped low-pass noise for creamy lubed impact
    const noiseSource = this.getNoiseSource(ctx)
    if (noiseSource) {
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(650 * pitch, t)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.3 * vel, t)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04)

      noiseSource.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(this.masterGain)

      const offset = Math.random() * 0.8
      noiseSource.start(t, offset, 0.05)
    }
  }

  // 5. Holy Panda Switch (Custom Tactile): Heavy tactile pop + loud bottom out
  private playHolyPandaSwitch(
    ctx: AudioContext,
    t: number,
    keyType: string,
    pitch: number,
    vel: number
  ) {
    if (!this.masterGain) return

    // Prominent rounded tactile snap
    const bumpOsc = ctx.createOscillator()
    const bumpGain = ctx.createGain()
    bumpOsc.type = 'triangle'
    bumpOsc.frequency.setValueAtTime(1750 * pitch, t)
    bumpOsc.frequency.exponentialRampToValueAtTime(950, t + 0.015)

    bumpGain.gain.setValueAtTime(0.35 * vel, t)
    bumpGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018)

    bumpOsc.connect(bumpGain)
    bumpGain.connect(this.masterGain)
    bumpOsc.start(t)
    bumpOsc.stop(t + 0.02)

    // Heavy bottom-out pop
    const baseFreq = keyType === 'space' ? 240 : keyType === 'enter' ? 360 : 490
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(baseFreq * 1.9 * pitch, t + 0.008)
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq * 0.45), t + 0.055)

    oscGain.gain.setValueAtTime(0.5 * vel, t + 0.008)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)

    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(t + 0.008)
    osc.stop(t + 0.065)

    // Resonant housing clack
    const noiseSource = this.getNoiseSource(ctx)
    if (noiseSource) {
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(1400 * pitch, t + 0.008)
      filter.Q.setValueAtTime(3.0, t + 0.008)

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.48 * vel, t + 0.008)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)

      noiseSource.connect(filter)
      filter.connect(noiseGain)
      noiseGain.connect(this.masterGain)

      const offset = Math.random() * 0.8
      noiseSource.start(t + 0.008, offset, 0.05)
    }
  }
}

// Global Singleton for instant zero-latency playback across the app
let instance: KeyboardAudioEngine | null = null

export function getKeyboardAudio(): KeyboardAudioEngine {
  if (typeof window === 'undefined') {
    return new KeyboardAudioEngine()
  }
  if (!instance) {
    instance = new KeyboardAudioEngine()
  }
  return instance
}
