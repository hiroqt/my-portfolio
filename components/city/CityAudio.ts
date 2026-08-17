// Enhanced City Audio Engine using Native Web Audio API
// Provides dynamic atmospheric soundscapes based on lighting theme and interactive SFX

export type SceneLightingMode = 'day' | 'sunset' | 'night' | 'morning'

class CityAudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private isPlaying = false
  private currentMode: SceneLightingMode = 'day'

  // Ambient synth nodes
  private padGain: GainNode | null = null
  private padFilter: BiquadFilterNode | null = null
  private padOscillators: { osc: OscillatorNode; lfo?: OscillatorNode; baseFreq: number }[] = []

  // Atmospheric noise/breeze generator
  private noiseNode: AudioBufferSourceNode | null = null
  private noiseFilter: BiquadFilterNode | null = null
  private noiseGain: GainNode | null = null

  // Interval timer for organic atmospheric events (bird chirps, distant sirens, wind gusts)
  private eventTimer: number | null = null

  public init() {
    if (this.ctx) return
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioContextClass()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
      this.masterGain.connect(this.ctx.destination)
    } catch {
      console.warn('Web Audio API not supported in this browser')
    }
  }

  public toggle(): boolean {
    if (!this.ctx) this.init()
    if (!this.ctx || !this.masterGain) return false

    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    if (this.isPlaying) {
      this.stop()
      return false
    } else {
      this.play()
      return true
    }
  }

  // Generate pink/brown noise buffer for natural breeze and urban air texture
  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null
    const bufferSize = this.ctx.sampleRate * 4
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let lastOut = 0.0

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      lastOut = (lastOut + 0.02 * white) / 1.02 // Brown noise filter
      data[i] = lastOut * 3.5
    }
    return buffer
  }

  // Chord frequencies for each scene theme
  private getThemeChords(mode: SceneLightingMode): { freqs: number[]; filterFreq: number; resonance: number } {
    switch (mode) {
      case 'sunset':
        // Fmaj9 / Am7 lush California sunset chill pad
        return {
          freqs: [87.31, 130.81, 174.61, 220.0, 261.63, 329.63], // F2, C3, F3, A3, C4, E4
          filterFreq: 420,
          resonance: 4.5,
        }
      case 'night':
        // Dm9 / Bbmaj7 deep starry night Manhattan skyline
        return {
          freqs: [73.42, 110.0, 146.83, 174.61, 220.0, 293.66], // D2, A2, D3, F3, A3, D4
          filterFreq: 260,
          resonance: 5.0,
        }
      case 'morning':
        // Emaj7 / Bmaj7 uplifting morning dawn sunrise
        return {
          freqs: [82.41, 123.47, 164.81, 246.94, 329.63, 493.88], // E2, B2, E3, B3, E4, B4
          filterFreq: 680,
          resonance: 3.5,
        }
      case 'day':
      default:
        // C major / G major vibrant daytime city chord
        return {
          freqs: [65.41, 130.81, 196.0, 261.63, 329.63, 392.0], // C2, C3, G3, C4, E4, G4
          filterFreq: 540,
          resonance: 3.0,
        }
    }
  }

  public play() {
    if (!this.ctx || !this.masterGain) return
    if (this.isPlaying) return

    this.isPlaying = true
    const now = this.ctx.currentTime

    // 1. Synth Pad Subsystem
    this.padFilter = this.ctx.createBiquadFilter()
    this.padFilter.type = 'lowpass'

    this.padGain = this.ctx.createGain()
    this.padGain.gain.setValueAtTime(0.18, now)

    this.padFilter.connect(this.padGain)
    this.padGain.connect(this.masterGain)

    this.startThemeOscillators(this.currentMode)

    // 2. Breeze & Urban Air Texture Subsystem
    const noiseBuffer = this.createNoiseBuffer()
    if (noiseBuffer) {
      this.noiseFilter = this.ctx.createBiquadFilter()
      this.noiseFilter.type = 'bandpass'
      this.noiseFilter.frequency.setValueAtTime(320, now)
      this.noiseFilter.Q.setValueAtTime(1.2, now)

      this.noiseGain = this.ctx.createGain()
      this.noiseGain.gain.setValueAtTime(0.04, now)

      this.noiseFilter.connect(this.noiseGain)
      this.noiseGain.connect(this.masterGain)

      this.noiseNode = this.ctx.createBufferSource()
      this.noiseNode.buffer = noiseBuffer
      this.noiseNode.loop = true
      this.noiseNode.connect(this.noiseFilter)
      this.noiseNode.start(now)
    }

    // 3. Start Periodic Ambient Procedural Sounds (Bird chirps, soft chimes)
    this.startAtmosphericEvents()

    // Master Volume Fade In
    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.setValueAtTime(0, now)
    this.masterGain.gain.linearRampToValueAtTime(0.25, now + 2.0)
  }

  private startThemeOscillators(mode: SceneLightingMode) {
    if (!this.ctx || !this.padFilter) return
    const now = this.ctx.currentTime
    const chord = this.getThemeChords(mode)

    this.padFilter.frequency.cancelScheduledValues(now)
    this.padFilter.frequency.linearRampToValueAtTime(chord.filterFreq, now + 1.5)
    this.padFilter.Q.setValueAtTime(chord.resonance, now)

    // Clear old oscillators
    this.padOscillators.forEach(({ osc, lfo }) => {
      try {
        osc.stop()
        osc.disconnect()
        if (lfo) {
          lfo.stop()
          lfo.disconnect()
        }
      } catch {
        // ignore
      }
    })
    this.padOscillators = []

    chord.freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.padFilter) return
      const osc = this.ctx.createOscillator()
      const oscGain = this.ctx.createGain()

      osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sawtooth'
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), now)

      // Frequency Modulation (LFO shimmer)
      const lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()
      lfo.frequency.setValueAtTime(0.15 + idx * 0.04, now)
      lfoGain.gain.setValueAtTime(1.8, now)
      lfo.connect(osc.frequency)
      lfo.start(now)

      const vol = idx === 0 ? 0.16 : 0.05 / Math.sqrt(idx + 1)
      oscGain.gain.setValueAtTime(vol, now)

      osc.connect(oscGain)
      oscGain.connect(this.padFilter)
      osc.start(now)

      this.padOscillators.push({ osc, lfo, baseFreq: freq })
    })
  }

  // Dynamically update audio when scene theme changes (Day, Sunset, Night, Morning)
  public setTheme(mode: SceneLightingMode) {
    this.currentMode = mode
    if (!this.isPlaying || !this.ctx || !this.padFilter) return

    const now = this.ctx.currentTime
    const chord = this.getThemeChords(mode)

    this.padFilter.frequency.cancelScheduledValues(now)
    this.padFilter.frequency.linearRampToValueAtTime(chord.filterFreq, now + 1.8)
    this.padFilter.Q.linearRampToValueAtTime(chord.resonance, now + 1.8)

    // Smoothly glide oscillator frequencies to match new theme
    this.padOscillators.forEach((item, idx) => {
      if (idx < chord.freqs.length) {
        item.osc.frequency.cancelScheduledValues(now)
        item.osc.frequency.exponentialRampToValueAtTime(chord.freqs[idx], now + 2.0)
      }
    })

    // Adjust background air/noise character
    if (this.noiseFilter && this.noiseGain) {
      if (mode === 'night') {
        this.noiseFilter.frequency.linearRampToValueAtTime(180, now + 2.0)
        this.noiseGain.gain.linearRampToValueAtTime(0.025, now + 2.0)
      } else if (mode === 'sunset') {
        this.noiseFilter.frequency.linearRampToValueAtTime(280, now + 2.0)
        this.noiseGain.gain.linearRampToValueAtTime(0.035, now + 2.0)
      } else {
        this.noiseFilter.frequency.linearRampToValueAtTime(450, now + 2.0)
        this.noiseGain.gain.linearRampToValueAtTime(0.05, now + 2.0)
      }
    }
  }

  // Periodic subtle organic sounds based on scene
  private startAtmosphericEvents() {
    if (this.eventTimer) clearInterval(this.eventTimer)

    this.eventTimer = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return

      if (this.currentMode === 'day' || this.currentMode === 'morning') {
        if (Math.random() < 0.4) this.playBirdChirp()
      } else if (this.currentMode === 'night') {
        if (Math.random() < 0.3) this.playNightChime()
      }
    }, 6000)
  }

  // Synthesized morning/day bird chirp
  private playBirdChirp() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    const baseFreq = 2200 + Math.random() * 800
    osc.frequency.setValueAtTime(baseFreq, now)
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.08)
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.16)

    gain.gain.setValueAtTime(0.025, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.25)
  }

  // Synthesized soft night chime
  private playNightChime() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    const note = [587.33, 659.25, 880.0, 1174.66][Math.floor(Math.random() * 4)] // D5, E5, A5, D6
    osc.frequency.setValueAtTime(note, now)

    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 1.9)
  }

  // Interactive SFX: Walking Footstep on Sidewalk
  public playFootstep() {
    if (!this.ctx) this.init()
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(140 + Math.random() * 20, now)
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.06)

    gain.gain.setValueAtTime(0.035, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.08)
  }

  // Interactive SFX: Inspecting Building Chime
  public playInspectPing() {
    if (!this.ctx) this.init()
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime

    const freqs = [523.25, 659.25, 783.99] // C5, E5, G5 major triad
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.05)

      gain.gain.setValueAtTime(0.05, now + idx * 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8)

      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start(now + idx * 0.05)
      osc.stop(now + idx * 0.05 + 0.85)
    })
  }

  // Interactive SFX: Avatar Wave Interaction Chime
  public playWaveSound() {
    if (!this.ctx) this.init()
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime

    const notes = [440, 554.37, 659.25, 880] // A4, C#5, E5, A5
    notes.forEach((note, i) => {
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(note, now + i * 0.08)

      gain.gain.setValueAtTime(0.06, now + i * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6)

      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start(now + i * 0.08)
      osc.stop(now + i * 0.08 + 0.65)
    })
  }

  // Interactive SFX: Mode / Theme Switch Click
  public playModeSwitch() {
    if (!this.ctx) this.init()
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05)

    gain.gain.setValueAtTime(0.03, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.07)
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return
    const now = this.ctx.currentTime
    this.isPlaying = false

    if (this.eventTimer) {
      clearInterval(this.eventTimer)
      this.eventTimer = null
    }

    this.masterGain.gain.cancelScheduledValues(now)
    this.masterGain.gain.linearRampToValueAtTime(0.001, now + 1.2)

    setTimeout(() => {
      this.padOscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop()
          osc.disconnect()
          if (lfo) {
            lfo.stop()
            lfo.disconnect()
          }
        } catch {
          // ignore
        }
      })
      this.padOscillators = []

      if (this.noiseNode) {
        try {
          this.noiseNode.stop()
          this.noiseNode.disconnect()
        } catch {
          // ignore
        }
        this.noiseNode = null
      }
    }, 1300)
  }

  public getStatus(): boolean {
    return this.isPlaying
  }
}

export const cityAudio = new CityAudioEngine()
