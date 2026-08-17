// Enhanced City Audio Engine with Lo-Fi Chillhop Beats, Natural Birds, Dog Barks, and Car Sounds
// Powered by Native Web Audio API (Zero external MP3 dependencies, 100% procedurally synthesized)

export type SceneLightingMode = 'day' | 'sunset' | 'night' | 'morning'

class CityAudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private isPlaying = false
  private currentMode: SceneLightingMode = 'day'
  private volume = 0.85 // Crisp, clear volume

  // Vinyl Crackle & Tape Texture
  private vinylNode: AudioBufferSourceNode | null = null
  private vinylGain: GainNode | null = null

  // Natural Light Air & Tree Leaf Rustle (No muddy low rumble)
  private breezeNode: AudioBufferSourceNode | null = null
  private breezeFilter: BiquadFilterNode | null = null
  private breezeGain: GainNode | null = null

  // Lo-Fi Beat Sequencer
  private isLofiActive = true
  private drumTimer: number | null = null
  private beatStep = 0
  private tempo = 76 // 76 BPM classic chillhop tempo

  // Organic Ambient Event Loops (Birds, Dogs, Traffic)
  private natureEventTimer: number | null = null
  private trafficEventTimer: number | null = null

  public init() {
    if (this.ctx) return
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioContextClass()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime)
      this.masterGain.connect(this.ctx.destination)
    } catch {
      console.warn('Web Audio API not supported in this browser')
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val))
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05)
    }
  }

  public getVolume(): number {
    return this.volume
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

  // Generate authentic subtle vinyl needle crackle
  private createVinylBuffer(): AudioBuffer | null {
    if (!this.ctx) return null
    const bufferSize = this.ctx.sampleRate * 3
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      let sample = (Math.random() * 2 - 1) * 0.015
      if (Math.random() < 0.0012) {
        sample += (Math.random() > 0.5 ? 1 : -1) * (0.18 + Math.random() * 0.35)
      }
      data[i] = sample
    }
    return buffer
  }

  // Generate airy, natural tree leaf breeze (pure high-frequency air, NO low-end rumble)
  private createNaturalBreezeBuffer(): AudioBuffer | null {
    if (!this.ctx) return null
    const bufferSize = this.ctx.sampleRate * 4
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08
    }
    return buffer
  }

  // Lo-Fi Jazz & Chillhop Chord Progressions (Warm 7th & 9th Jazz Voicings)
  private getLofiChords(mode: SceneLightingMode): { name: string; chords: number[][] } {
    switch (mode) {
      case 'sunset':
        // Fmaj9 -> Em7 -> Dm9 -> Cmaj7 (Sunset Golden Hour Chill)
        return {
          name: 'Sunset Glow',
          chords: [
            [174.61, 220.0, 261.63, 329.63, 392.0], // Fmaj9
            [164.81, 196.0, 246.94, 293.66, 392.0], // Em7
            [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
            [130.81, 164.81, 196.0, 246.94, 329.63], // Cmaj7
          ],
        }
      case 'night':
        // Dm9 -> G13 -> Cmaj9 -> A7b9 (Nocturnal City Midnight Lo-Fi)
        return {
          name: 'Midnight Metropolis',
          chords: [
            [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
            [98.0, 146.83, 196.0, 246.94, 329.63, 440.0], // G13
            [130.81, 164.81, 196.0, 246.94, 329.63], // Cmaj9
            [110.0, 138.59, 164.81, 207.65, 293.66], // A7b9
          ],
        }
      case 'morning':
        // Emaj9 -> C#m7 -> F#m9 -> B13 (Morning Sunrise Chillhop)
        return {
          name: 'Dawn Reflections',
          chords: [
            [164.81, 207.65, 246.94, 311.13, 370.0], // Emaj9
            [138.59, 164.81, 207.65, 246.94, 329.63], // C#m7
            [185.0, 220.0, 277.18, 329.63, 415.3], // F#m9
            [123.47, 185.0, 246.94, 311.13, 415.3], // B13
          ],
        }
      case 'day':
      default:
        // Cmaj9 -> Am9 -> Dm9 -> G7sus4 (Sunny Boulevard Lo-Fi)
        return {
          name: 'Boulevard Breeze',
          chords: [
            [130.81, 164.81, 196.0, 246.94, 329.63], // Cmaj9
            [110.0, 130.81, 164.81, 196.0, 261.63], // Am9
            [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
            [98.0, 146.83, 196.0, 261.63, 392.0], // G7sus4
          ],
        }
    }
  }

  // Synthesize a punchy, warm filtered Lo-Fi Kick Drum
  private playLofiKick(time: number) {
    if (!this.ctx || !this.masterGain) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, time)
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.16)

    gain.gain.setValueAtTime(0.70, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28)

    osc.connect(gain)
    gain.connect(this.masterGain)

    osc.start(time)
    osc.stop(time + 0.3)
  }

  // Synthesize a vintage filtered Lo-Fi Snare / Rimshot
  private playLofiSnare(time: number) {
    if (!this.ctx || !this.masterGain) return

    // Tonal body
    const osc = this.ctx.createOscillator()
    const oscGain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(180, time)
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.12)
    oscGain.gain.setValueAtTime(0.35, time)
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.14)
    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(time)
    osc.stop(time + 0.15)

    // Noise snap
    const bufferSize = this.ctx.sampleRate * 0.15
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22))
    }
    const noise = this.ctx.createBufferSource()
    noise.buffer = noiseBuffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1600, time)
    filter.Q.setValueAtTime(1.8, time)

    const noiseGain = this.ctx.createGain()
    noiseGain.gain.setValueAtTime(0.40, time)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(this.masterGain)

    noise.start(time)
    noise.stop(time + 0.2)
  }

  // Synthesize a gentle brushed Hi-Hat
  private playLofiHiHat(time: number, isAccent = false) {
    if (!this.ctx || !this.masterGain) return
    const bufferSize = this.ctx.sampleRate * 0.06
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2))
    }
    const noise = this.ctx.createBufferSource()
    noise.buffer = noiseBuffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.setValueAtTime(6500, time)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(isAccent ? 0.22 : 0.12, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    noise.start(time)
    noise.stop(time + 0.06)
  }

  // Play warm Lo-Fi Electric Piano (Rhodes) Chord
  private playLofiRhodesChord(time: number, freqs: number[]) {
    if (!this.ctx || !this.masterGain) return

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      osc.type = idx === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, time)
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, time)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, time)
      filter.frequency.exponentialRampToValueAtTime(360, time + 1.8)

      gain.gain.setValueAtTime(0.001, time)
      gain.gain.linearRampToValueAtTime(0.20 / Math.sqrt(freqs.length), time + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.4)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.masterGain)

      osc.start(time)
      osc.stop(time + 2.5)
    })
  }

  // 1. Procedural Songbird Chirps & Melodic Trills
  public playSongbirdChirp() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime

    const notesCount = Math.floor(Math.random() * 3) + 2 // 2 to 4 rapid notes
    for (let i = 0; i < notesCount; i++) {
      const noteTime = now + i * 0.08
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const baseFreq = 2600 + Math.random() * 900
      osc.frequency.setValueAtTime(baseFreq, noteTime)
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 1200, noteTime + 0.04)
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 300, noteTime + 0.075)

      gain.gain.setValueAtTime(0.001, noteTime)
      gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.078)

      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start(noteTime)
      osc.stop(noteTime + 0.08)
    }
  }

  // 2. Procedural Dog Bark ("Woof! Woof!")
  public playDogBark() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime

    const numBarks = Math.random() > 0.4 ? 2 : 1
    for (let b = 0; b < numBarks; b++) {
      const barkTime = now + b * 0.22

      // Tonal pitch drop (Throaty vocal formant)
      const osc = this.ctx.createOscillator()
      const oscGain = this.ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(360 + Math.random() * 60, barkTime)
      osc.frequency.exponentialRampToValueAtTime(160, barkTime + 0.12)

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(650, barkTime)
      filter.Q.setValueAtTime(2.2, barkTime)

      oscGain.gain.setValueAtTime(0.001, barkTime)
      oscGain.gain.linearRampToValueAtTime(0.28, barkTime + 0.02)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, barkTime + 0.14)

      osc.connect(filter)
      filter.connect(oscGain)
      oscGain.connect(this.masterGain)
      osc.start(barkTime)
      osc.stop(barkTime + 0.15)

      // Bark noise burst (Acoustic breath)
      const bufferSize = this.ctx.sampleRate * 0.12
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3))
      }
      const noise = this.ctx.createBufferSource()
      noise.buffer = noiseBuffer

      const nFilter = this.ctx.createBiquadFilter()
      nFilter.type = 'bandpass'
      nFilter.frequency.setValueAtTime(1100, barkTime)
      nFilter.Q.setValueAtTime(1.5, barkTime)

      const nGain = this.ctx.createGain()
      nGain.gain.setValueAtTime(0.24, barkTime)
      nGain.gain.exponentialRampToValueAtTime(0.001, barkTime + 0.12)

      noise.connect(nFilter)
      nFilter.connect(nGain)
      nGain.connect(this.masterGain)
      noise.start(barkTime)
      noise.stop(barkTime + 0.13)
    }
  }

  // 3. Procedural Passing Car Sound (Smooth Doppler Whoosh & Engine Hum)
  public playPassingCar() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    const duration = 2.2

    // Engine Tone with smooth Doppler pitch curve
    const osc = this.ctx.createOscillator()
    const oscGain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(95, now)
    osc.frequency.linearRampToValueAtTime(125, now + 0.9)
    osc.frequency.exponentialRampToValueAtTime(75, now + duration)

    oscGain.gain.setValueAtTime(0.001, now)
    oscGain.gain.linearRampToValueAtTime(0.22, now + 0.9)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + duration)

    // Tire Asphalt Friction Swoosh
    const bufferSize = this.ctx.sampleRate * duration
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = this.ctx.createBufferSource()
    noise.buffer = noiseBuffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(600, now)
    filter.frequency.linearRampToValueAtTime(1100, now + 0.9)
    filter.frequency.exponentialRampToValueAtTime(450, now + duration)
    filter.Q.setValueAtTime(2.0, now)

    const noiseGain = this.ctx.createGain()
    noiseGain.gain.setValueAtTime(0.001, now)
    noiseGain.gain.linearRampToValueAtTime(0.20, now + 0.9)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(this.masterGain)
    noise.start(now)
    noise.stop(now + duration)
  }

  // 4. Distant City Taxi Honk (Friendly urban beep)
  public playDistantCarHonk() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime

    // Dual horn harmony
    const freqs = [370, 465]
    freqs.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, now)

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1800, now)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02)
      gain.gain.setValueAtTime(0.12, now + 0.16)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.masterGain)
      osc.start(now)
      osc.stop(now + 0.24)
    })
  }

  // Lo-Fi Beat Clock Sequencer Loop
  private startLofiSequencer() {
    if (this.drumTimer) clearInterval(this.drumTimer)

    const stepInterval = (60 / this.tempo / 4) * 1000 // 16th note interval (~197ms at 76 BPM)

    this.drumTimer = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.isLofiActive) return
      const now = this.ctx.currentTime

      const step16 = this.beatStep % 16
      const barStep = Math.floor(this.beatStep / 16) % 4

      const chordsData = this.getLofiChords(this.currentMode)
      const currentChord = chordsData.chords[barStep] || chordsData.chords[0]

      // Chords play on beat 1 and syncopated beat 3.5
      if (step16 === 0 || step16 === 10) {
        this.playLofiRhodesChord(now, currentChord)
      }

      // Drum Pattern: Classic Boom-Bap Lo-Fi
      if (step16 === 0 || step16 === 6 || step16 === 8) {
        this.playLofiKick(now)
      }

      if (step16 === 4 || step16 === 12) {
        this.playLofiSnare(now)
      }

      if (step16 % 2 === 0) {
        const isAccent = step16 % 4 === 0
        this.playLofiHiHat(now, isAccent)
      }

      this.beatStep = (this.beatStep + 1) % 64
    }, stepInterval)
  }

  public play() {
    if (!this.ctx || !this.masterGain) return
    if (this.isPlaying) return

    this.isPlaying = true
    const now = this.ctx.currentTime

    this.masterGain.gain.setValueAtTime(0, now)
    this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 1.2)

    // 1. Vinyl Texture (Warm needle crackle)
    const vinylBuffer = this.createVinylBuffer()
    if (vinylBuffer) {
      this.vinylGain = this.ctx.createGain()
      this.vinylGain.gain.setValueAtTime(0.18, now)
      this.vinylGain.connect(this.masterGain)

      this.vinylNode = this.ctx.createBufferSource()
      this.vinylNode.buffer = vinylBuffer
      this.vinylNode.loop = true
      this.vinylNode.connect(this.vinylGain)
      this.vinylNode.start(now)
    }

    // 2. Fresh High-End Tree Breeze (NO low-end rumble)
    const breezeBuffer = this.createNaturalBreezeBuffer()
    if (breezeBuffer) {
      this.breezeFilter = this.ctx.createBiquadFilter()
      this.breezeFilter.type = 'highpass'
      this.breezeFilter.frequency.setValueAtTime(2200, now)

      this.breezeGain = this.ctx.createGain()
      this.breezeGain.gain.setValueAtTime(0.04, now)

      this.breezeFilter.connect(this.breezeGain)
      this.breezeGain.connect(this.masterGain)

      this.breezeNode = this.ctx.createBufferSource()
      this.breezeNode.buffer = breezeBuffer
      this.breezeNode.loop = true
      this.breezeNode.connect(this.breezeFilter)
      this.breezeNode.start(now)
    }

    // 3. Start Lo-Fi Beat Engine & Sequencer
    this.startLofiSequencer()

    // 4. Start Organic Natural & Urban Event Generators
    this.startAtmosphericEvents()
  }

  private startAtmosphericEvents() {
    if (this.natureEventTimer) clearInterval(this.natureEventTimer)
    if (this.trafficEventTimer) clearInterval(this.trafficEventTimer)

    // Birds & Nature sounds (Every 3.5 to 5 seconds)
    this.natureEventTimer = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return
      const rand = Math.random()
      if (this.currentMode === 'day' || this.currentMode === 'morning') {
        if (rand < 0.75) {
          this.playSongbirdChirp()
        } else if (rand < 0.92) {
          this.playDogBark()
        }
      } else if (this.currentMode === 'sunset') {
        if (rand < 0.6) {
          this.playSongbirdChirp()
        } else if (rand < 0.8) {
          this.playDogBark()
        }
      } else {
        // Night: Soft distant dog bark or night chime
        if (rand < 0.25) {
          this.playDogBark()
        } else if (rand < 0.6) {
          this.playNightChime()
        }
      }
    }, 3800)

    // Traffic sounds (Passing Cars & Soft Distant Horns every 4.5 seconds)
    this.trafficEventTimer = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return
      const rand = Math.random()
      if (rand < 0.65) {
        this.playPassingCar()
      } else if (rand < 0.88) {
        this.playDistantCarHonk()
      }
    }, 4600)
  }

  private playNightChime() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    const note = [587.33, 659.25, 783.99, 880.0, 1046.5][Math.floor(Math.random() * 5)]
    osc.frequency.setValueAtTime(note, now)

    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 2.6)
  }

  public setTheme(mode: SceneLightingMode) {
    this.currentMode = mode
  }

  // Interactive SFX: Footsteps
  public playFootstep() {
    if (!this.ctx || !this.isPlaying) return
    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(120 + Math.random() * 30, now)
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08)

      gain.gain.setValueAtTime(0.35, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

      osc.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.1)
    } catch {
      // ignore
    }
  }

  // Interactive SFX: Building Inspection Ping
  public playInspectPing() {
    if (!this.ctx) this.init()
    if (!this.ctx) return
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1046.5, now)
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.06)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.45, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7)

      osc.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.75)
    } catch {
      // ignore
    }
  }

  // Interactive SFX: Wave Chime
  public playWaveSound() {
    if (!this.ctx) this.init()
    if (!this.ctx) return
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const t = this.ctx.currentTime + idx * 0.09
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, t)

        gain.gain.setValueAtTime(0.001, t)
        gain.gain.linearRampToValueAtTime(0.35, t + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6)

        osc.connect(gain)
        gain.connect(this.masterGain || this.ctx.destination)
        osc.start(t)
        osc.stop(t + 0.65)
      })
    } catch {
      // ignore
    }
  }

  // Interactive SFX: UI Mode Switch Click
  public playModeSwitch() {
    if (!this.ctx) this.init()
    if (!this.ctx) return
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.04)

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      osc.connect(gain)
      gain.connect(this.masterGain || this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.06)
    } catch {
      // ignore
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.6)

    setTimeout(() => {
      this.isPlaying = false

      if (this.vinylNode) {
        try {
          this.vinylNode.stop()
          this.vinylNode.disconnect()
        } catch {
          // ignore
        }
        this.vinylNode = null
      }

      if (this.breezeNode) {
        try {
          this.breezeNode.stop()
          this.breezeNode.disconnect()
        } catch {
          // ignore
        }
        this.breezeNode = null
      }

      if (this.drumTimer) {
        clearInterval(this.drumTimer)
        this.drumTimer = null
      }

      if (this.natureEventTimer) {
        clearInterval(this.natureEventTimer)
        this.natureEventTimer = null
      }

      if (this.trafficEventTimer) {
        clearInterval(this.trafficEventTimer)
        this.trafficEventTimer = null
      }
    }, 650)
  }
}

export const cityAudio = new CityAudioEngine()
