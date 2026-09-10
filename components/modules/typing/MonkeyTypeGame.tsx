'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
  FaClock,
  FaFont,
  FaQuoteLeft,
  FaCode,
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaFire,
  FaKeyboard,
} from 'react-icons/fa'
import {
  SwitchType,
  SWITCH_PROFILES,
  getKeyboardAudio,
} from '@/lib/audio/keyboardAudio'
import { SwitchSoundPreview } from './SwitchSoundPreview'

// Curated Word Banks
const DEV_WORDS = [
  'const', 'interface', 'async', 'await', 'return', 'function', 'export', 'default',
  'import', 'useState', 'useEffect', 'useCallback', 'useMemo', 'useRef', 'props',
  'string', 'number', 'boolean', 'Promise', 'Array', 'Record', 'type', 'extends',
  'implements', 'class', 'constructor', 'payload', 'dispatch', 'reducer', 'context',
  'schema', 'database', 'postgres', 'docker', 'cluster', 'pipeline', 'handler',
  'middleware', 'response', 'request', 'status', 'endpoint', 'router', 'component',
  'render', 'virtual', 'dom', 'mutation', 'query', 'graphql', 'restful', 'deploy',
  'serverless', 'lambda', 'prisma', 'tailwind', 'framer', 'motion', 'refactor',
  'optimize', 'benchmark', 'latency', 'throughput', 'concurrency', 'mutex', 'thread',
  'stream', 'buffer', 'socket', 'websocket', 'session', 'token', 'auth', 'bearer',
  'encrypt', 'decrypt', 'runtime', 'compiler', 'transpile', 'bundle', 'webpack',
  'turbopack', 'monorepo', 'package', 'dependency', 'repository', 'commit', 'branch',
]

const TECH_QUOTES = [
  'Simplicity is prerequisite for reliability.',
  'Talk is cheap. Show me the code.',
  'First, solve the problem. Then, write the code.',
  'Make it work, make it right, make it fast.',
  'Programs must be written for people to read, and only incidentally for machines to execute.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil in programming.',
  'Controlling complexity is the essence of computer programming.',
]

const CLASSIC_WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not',
  'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from',
  'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would',
  'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which',
  'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
  'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
]

type ModeType = 'time' | 'words' | 'quote'
type CategoryType = 'code' | 'quotes' | 'words'

interface MonkeyTypeGameProps {
  initialSwitch?: SwitchType
}

export function MonkeyTypeGame({ initialSwitch = 'red' }: MonkeyTypeGameProps) {
  // Config & Audio State
  const [currentSwitch, setCurrentSwitch] = useState<SwitchType>(initialSwitch)
  const [volume, setVolume] = useState<number>(0.75)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [showSwitchDrawer, setShowSwitchDrawer] = useState<boolean>(false)

  // Game Settings
  const [mode, setMode] = useState<ModeType>('time')
  const [timeLimit, setTimeLimit] = useState<number>(30)
  const [wordLimit, setWordLimit] = useState<number>(25)
  const [category, setCategory] = useState<CategoryType>('code')

  // Game Runtime State
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [currentInput, setCurrentInput] = useState<string>('')
  const [typedHistory, setTypedHistory] = useState<string[]>([])
  const [gameState, setGameState] = useState<'idle' | 'running' | 'finished'>('idle')

  // Timing & Stats
  const [timeRemaining, setTimeRemaining] = useState<number>(timeLimit)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState<number>(0)
  const [rawWpm, setRawWpm] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(100)
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0)
  const [incorrectKeystrokes, setIncorrectKeystrokes] = useState<number>(0)
  const [combo, setCombo] = useState<number>(0)
  const [maxCombo, setMaxCombo] = useState<number>(0)

  // DOM Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const wordsContainerRef = useRef<HTMLDivElement>(null)

  // Initialize or reset words based on settings
  const generateWords = useCallback(() => {
    let sourceList: string[] = []
    if (category === 'code') sourceList = DEV_WORDS
    else if (category === 'quotes') {
      const randomQuote = TECH_QUOTES[Math.floor(Math.random() * TECH_QUOTES.length)]
      return randomQuote.split(' ')
    } else {
      sourceList = CLASSIC_WORDS
    }

    const count = mode === 'words' ? wordLimit : 60
    const shuffled: string[] = []
    for (let i = 0; i < count; i++) {
      const randWord = sourceList[Math.floor(Math.random() * sourceList.length)]
      shuffled.push(randWord)
    }
    return shuffled
  }, [category, mode, wordLimit])

  // Reset the game completely
  const resetGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    const newWords = generateWords()
    setWords(newWords)
    setCurrentWordIndex(0)
    setCurrentInput('')
    setTypedHistory([])
    setGameState('idle')
    setTimeRemaining(timeLimit)
    setStartTime(null)
    setWpm(0)
    setRawWpm(0)
    setAccuracy(100)
    setCorrectKeystrokes(0)
    setIncorrectKeystrokes(0)
    setCombo(0)
    setMaxCombo(0)

    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }, [generateWords, timeLimit])

  // Sync persisted audio state from audio engine on mount
  useEffect(() => {
    const audio = getKeyboardAudio()
    setVolume(audio.getVolume())
    setIsMuted(audio.isMute())
  }, [])

  // Initial load and settings change reset
  useEffect(() => {
    resetGame()
  }, [resetGame])

  // Volume & Mute Sync
  const handleVolumeChange = (vol: number) => {
    setVolume(vol)
    const audio = getKeyboardAudio()
    audio.setVolume(vol)
  }

  const handleToggleMute = () => {
    const audio = getKeyboardAudio()
    const nextMute = audio.toggleMute()
    setIsMuted(nextMute)
  }

  // Timer Tick
  useEffect(() => {
    if (gameState === 'running' && mode === 'time') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current)
            finishGame()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState, mode])

  // Calculate Real-time WPM & Stats
  useEffect(() => {
    if (gameState !== 'running' || !startTime) return

    const now = Date.now()
    const elapsedMinutes = (now - startTime) / 60000
    if (elapsedMinutes <= 0.005) return

    // Net WPM: (correct characters / 5) / minutes
    const netWpm = Math.max(0, Math.round(correctKeystrokes / 5 / elapsedMinutes))
    // Raw WPM: ((correct + incorrect) / 5) / minutes
    const totalChars = correctKeystrokes + incorrectKeystrokes
    const raw = Math.max(0, Math.round(totalChars / 5 / elapsedMinutes))

    // Accuracy: (correct / total) * 100
    const acc = totalChars > 0 ? Math.round((correctKeystrokes / totalChars) * 100) : 100

    setWpm(netWpm)
    setRawWpm(raw)
    setAccuracy(acc)
  }, [correctKeystrokes, incorrectKeystrokes, gameState, startTime])

  // Finish Game
  const finishGame = () => {
    setGameState('finished')
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Handle Keystrokes & Sound
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Quick Reset Shortcuts: Tab + Enter or Escape
    if (e.key === 'Escape') {
      e.preventDefault()
      resetGame()
      return
    }

    if (gameState === 'finished') return

    // Start timer on first keystroke
    if (gameState === 'idle') {
      setGameState('running')
      setStartTime(Date.now())
    }

    // Play switch sound
    const audio = getKeyboardAudio()
    let keyType: 'standard' | 'space' | 'enter' | 'backspace' = 'standard'
    if (e.key === ' ') keyType = 'space'
    else if (e.key === 'Enter') keyType = 'enter'
    else if (e.key === 'Backspace') keyType = 'backspace'

    audio.playKey(currentSwitch, keyType)

    // Handle Backspace
    if (e.key === 'Backspace') {
      if (currentInput === '' && currentWordIndex > 0) {
        // Go back to previous word if allowed
        e.preventDefault()
        const prevWord = typedHistory[currentWordIndex - 1]
        setCurrentInput(prevWord || '')
        setCurrentWordIndex((prev) => prev - 1)
        setTypedHistory((prev) => prev.slice(0, -1))
      }
      return
    }

    // Handle Space (Word Completion)
    if (e.key === ' ') {
      e.preventDefault()
      if (currentInput.trim() === '') return // Ignore leading space

      const targetWord = words[currentWordIndex] || ''
      const isWordCorrect = currentInput === targetWord

      // Count characters
      let correctCount = 0
      for (let i = 0; i < currentInput.length; i++) {
        if (i < targetWord.length && currentInput[i] === targetWord[i]) {
          correctCount++
        }
      }
      const incorrectCount = currentInput.length - correctCount

      setCorrectKeystrokes((prev) => prev + correctCount + (isWordCorrect ? 1 : 0)) // space counts as correct if word matches
      setIncorrectKeystrokes((prev) => prev + incorrectCount)

      if (isWordCorrect) {
        setCombo((prev) => {
          const next = prev + 1
          setMaxCombo((m) => Math.max(m, next))
          return next
        })
      } else {
        setCombo(0)
      }

      setTypedHistory((prev) => [...prev, currentInput])
      setCurrentInput('')

      if (currentWordIndex + 1 >= words.length) {
        // Finished all words
        finishGame()
      } else {
        setCurrentWordIndex((prev) => prev + 1)
      }
      return
    }

    // Regular Character Keystroke
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const targetWord = words[currentWordIndex] || ''
      const targetChar = targetWord[currentInput.length]

      if (e.key === targetChar) {
        setCorrectKeystrokes((prev) => prev + 1)
        setCombo((prev) => {
          const next = prev + 1
          setMaxCombo((m) => Math.max(m, next))
          return next
        })
      } else {
        setIncorrectKeystrokes((prev) => prev + 1)
        setCombo(0)
      }
    }
  }

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState === 'finished') return
    const val = e.target.value
    // If user typed space, handleKeyDown already processed it
    if (!val.endsWith(' ')) {
      setCurrentInput(val)
    }
  }

  // Rating badge based on WPM
  const getSpeedRating = (wpmVal: number) => {
    if (wpmVal >= 110) return { title: '⚡ Grandmaster Speed', color: 'text-amber-400', badge: 'Top 1%' }
    if (wpmVal >= 85) return { title: '🚀 Elite Pro Coder', color: 'text-emerald-400', badge: 'Top 5%' }
    if (wpmVal >= 65) return { title: '⚡ Fast Software Engineer', color: 'text-sky-400', badge: 'Above Average' }
    if (wpmVal >= 45) return { title: '💻 Steady Developer', color: 'text-purple-400', badge: 'Intermediate' }
    return { title: '🌱 Keyboard Explorer', color: 'text-foreground', badge: 'Practice Mode' }
  }

  return (
    <div className="w-full space-y-6">
      {/* ── Main MonkeyType Terminal Frame ── */}
      <div
        onClick={() => {
          getKeyboardAudio().ensureContext()
          inputRef.current?.focus()
        }}
        className="relative rounded-2xl bg-card/80 dark:bg-[#0e1017]/90 border border-border/80 dark:border-white/[0.08] backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-xl cursor-text select-none overflow-hidden"
      >
        {/* Subtle Background Glow corresponding to current switch color */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-10 pointer-events-none blur-3xl transition-colors duration-500"
          style={{ backgroundColor: SWITCH_PROFILES[currentSwitch].color }}
        />

        {/* ── Top Game Toolbar: Mode Selectors + Switch Selector + Audio ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border/40">
          
          {/* Mode & Category Selectors */}
          <div className="flex items-center flex-wrap gap-1.5 bg-muted/50 dark:bg-white/[0.03] p-1 rounded-xl border border-border/40 text-xs font-mono">
            {/* Category: Code / Quotes / Words */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCategory('code')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                category === 'code'
                  ? 'bg-foreground text-background font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FaCode className="w-3 h-3" />
              <span>Code</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCategory('quotes')
                setMode('quote')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                category === 'quotes'
                  ? 'bg-foreground text-background font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FaQuoteLeft className="w-2.5 h-2.5" />
              <span>Quotes</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCategory('words')
                if (mode === 'quote') setMode('time')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                category === 'words'
                  ? 'bg-foreground text-background font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FaFont className="w-3 h-3" />
              <span>Words</span>
            </button>

            <div className="w-px h-4 bg-border/60 mx-1" />

            {/* Time / Word Sub-limits */}
            {category !== 'quotes' && (
              <div className="flex items-center gap-1">
                {[15, 30, 60].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMode('time')
                      setTimeLimit(t)
                    }}
                    className={`px-2 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                      mode === 'time' && timeLimit === t
                        ? 'text-accent font-bold bg-accent/15'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Toolbar: Keyboard Switch Profile Selector + Sound Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick Switch Selector Dropdown / Pills */}
            <div className="flex items-center gap-1 bg-muted/50 dark:bg-white/[0.03] p-1 rounded-xl border border-border/40">
              {(['red', 'brown', 'blue', 'black', 'holypanda'] as SwitchType[]).map((swKey) => {
                const profile = SWITCH_PROFILES[swKey]
                const isActive = currentSwitch === swKey

                return (
                  <button
                    key={swKey}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentSwitch(swKey)
                      const audio = getKeyboardAudio()
                      audio.playKey(swKey, 'standard')
                    }}
                    title={`${profile.name} (${profile.type}) - Click to preview`}
                    className={`group relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-background text-foreground font-semibold shadow-xs border border-border'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: profile.color }}
                    />
                    <span className="capitalize hidden sm:inline">{swKey === 'holypanda' ? 'Panda' : swKey}</span>
                  </button>
                )
              })}
            </div>

            {/* Mute / Audio Trigger Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleToggleMute()
              }}
              title={isMuted ? 'Unmute Keyboard Audio' : 'Mute Keyboard Audio'}
              className="p-2 rounded-xl bg-muted/50 dark:bg-white/[0.03] hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40 transition-colors active:scale-95 cursor-pointer"
            >
              {isMuted ? (
                <FaVolumeMute className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <FaVolumeUp className="w-3.5 h-3.5 text-accent" />
              )}
            </button>

            {/* Toggle Switch Sound Lab Drawer Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowSwitchDrawer((prev) => !prev)
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all active:scale-95 cursor-pointer ${
                showSwitchDrawer
                  ? 'bg-accent text-background font-semibold border-accent shadow-xs'
                  : 'bg-muted/50 dark:bg-white/[0.03] hover:bg-muted text-foreground border-border/40'
              }`}
            >
              <FaKeyboard className="w-3 h-3" />
              <span className="hidden md:inline">Audition Lab</span>
            </button>
          </div>
        </div>

        {/* ── Live Stats Bar ── */}
        <div className="flex items-center justify-between py-4 text-xs font-mono">
          {/* Time Remaining or Word Counter */}
          <div className="flex items-center gap-3">
            {mode === 'time' ? (
              <div className="flex items-center gap-2">
                <FaClock className="w-3.5 h-3.5 text-accent" />
                <span className="font-bold text-2xl text-accent">
                  {timeRemaining}
                  <span className="text-xs font-normal text-muted-foreground ml-1">s</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="font-bold text-lg text-foreground">
                  {currentWordIndex}
                </span>
                <span>/</span>
                <span>{words.length} words</span>
              </div>
            )}

            {/* Combo Streak */}
            {combo >= 5 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold text-xs border border-amber-500/30"
              >
                <FaFire className="w-3 h-3 animate-bounce" />
                <span>{combo} Streak</span>
              </motion.div>
            )}
          </div>

          {/* Live Metrics: Live WPM & Accuracy */}
          <div className="flex items-center gap-4 sm:gap-6 text-right">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Live WPM</p>
              <p className="font-bold text-lg sm:text-2xl text-foreground">{wpm}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</p>
              <p className="font-bold text-lg sm:text-2xl text-foreground">
                {accuracy}
                <span className="text-xs font-normal text-muted-foreground">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Typing Area (Words & Character Renderer) ── */}
        <div className="relative min-h-[140px] sm:min-h-[160px] flex items-center justify-center my-2">
          {/* Hidden physical keyboard capture input */}
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 cursor-default"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />

          <AnimatePresence mode="wait">
            {gameState !== 'finished' ? (
              <motion.div
                key="words-display"
                ref={wordsContainerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-wrap gap-x-3 gap-y-2 text-lg sm:text-xl md:text-2xl font-mono leading-relaxed tracking-wide text-muted-foreground/60 transition-all"
              >
                {words.map((word, wIdx) => {
                  const isCurrentWord = wIdx === currentWordIndex
                  const isPastWord = wIdx < currentWordIndex
                  const pastTyped = typedHistory[wIdx]

                  return (
                    <span
                      key={`${word}-${wIdx}`}
                      className={`relative inline-flex items-center transition-colors duration-150 ${
                        isCurrentWord
                          ? 'text-foreground'
                          : isPastWord
                          ? pastTyped === word
                            ? 'text-foreground/80'
                            : 'text-red-400/80 line-through'
                          : 'text-muted-foreground/40'
                      }`}
                    >
                      {word.split('').map((char, cIdx) => {
                        let charClass = 'transition-colors'
                        if (isCurrentWord) {
                          if (cIdx < currentInput.length) {
                            if (currentInput[cIdx] === char) {
                              charClass = 'text-accent font-semibold'
                            } else {
                              charClass = 'text-red-500 bg-red-500/20 rounded px-0.5 font-bold'
                            }
                          } else {
                            charClass = 'text-muted-foreground/70'
                          }
                        }

                        const showCaret = isCurrentWord && cIdx === currentInput.length

                        return (
                          <span key={cIdx} className="relative">
                            {showCaret && (
                              <motion.span
                                layoutId="monkeyCaret"
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute -left-[2px] top-0 bottom-0 w-[2.5px] bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                              />
                            )}
                            <span className={charClass}>{char}</span>
                          </span>
                        )
                      })}

                      {/* Overtyped extra characters in current word */}
                      {isCurrentWord && currentInput.length > word.length && (
                        <span className="text-red-500 bg-red-500/25 rounded px-0.5 font-bold">
                          {currentInput.slice(word.length)}
                        </span>
                      )}

                      {/* Caret at very end of word */}
                      {isCurrentWord && currentInput.length >= word.length && (
                        <span className="relative w-[2px]">
                          <motion.span
                            layoutId="monkeyCaret"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute -left-[1px] top-0 bottom-0 w-[2.5px] bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                          />
                        </span>
                      )}
                    </span>
                  )
                })}
              </motion.div>
            ) : (
              /* ── Completion Results Screen ── */
              <motion.div
                key="results-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full py-4 space-y-6 text-center sm:text-left"
              >
                {/* Result Title & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/40">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Speed Test Completed
                    </span>
                    <h3 className="font-supreme text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center justify-center sm:justify-start gap-2">
                      <FaTrophy className="text-amber-400 w-6 h-6 shrink-0" />
                      <span>{getSpeedRating(wpm).title}</span>
                    </h3>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent/15 text-accent font-mono text-xs font-semibold">
                      {getSpeedRating(wpm).badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground font-mono text-xs">
                      {SWITCH_PROFILES[currentSwitch].label}
                    </span>
                  </div>
                </div>

                {/* Metric Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Net Speed
                    </span>
                    <p className="font-supreme text-3xl sm:text-4xl font-bold text-accent">
                      {wpm} <span className="text-sm font-mono text-muted-foreground">WPM</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Accuracy
                    </span>
                    <p className="font-supreme text-3xl sm:text-4xl font-bold text-foreground">
                      {accuracy}
                      <span className="text-sm font-mono text-muted-foreground">%</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Raw Speed
                    </span>
                    <p className="font-supreme text-3xl sm:text-4xl font-bold text-foreground">
                      {rawWpm} <span className="text-sm font-mono text-muted-foreground">WPM</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      Keystrokes
                    </span>
                    <p className="font-mono text-base sm:text-lg font-bold text-foreground pt-1.5">
                      <span className="text-emerald-400">{correctKeystrokes}</span>
                      <span className="text-muted-foreground mx-1">/</span>
                      <span className="text-red-400">{incorrectKeystrokes}</span>
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">correct / errors</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer Controls: Restart Button + Keyboard Instructions ── */}
        <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                resetGame()
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background font-semibold hover:bg-accent hover:text-white transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <FaRedo className="w-3 h-3" />
              <span>{gameState === 'finished' ? 'Try Again' : 'Restart Test'}</span>
            </button>

            <span className="text-[11px] text-muted-foreground/70 hidden sm:inline">
              Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[10px] font-semibold border border-border">Tab</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[10px] font-semibold border border-border">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[10px] font-semibold border border-border">Esc</kbd> to quick-reset
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SWITCH_PROFILES[currentSwitch].color }} />
            <span>Active: {SWITCH_PROFILES[currentSwitch].name}</span>
          </div>
        </div>
      </div>

      {/* ── Collapsible Switch Sound Preview Lab Strip / Soundboard ── */}
      <AnimatePresence>
        {showSwitchDrawer && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <SwitchSoundPreview
              currentSwitch={currentSwitch}
              onSelectSwitch={(sw) => setCurrentSwitch(sw)}
              volume={volume}
              onVolumeChange={handleVolumeChange}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
