'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPaperPlane,
  FaTimes,
  FaTrashAlt,
  FaRobot,
  FaUser,
  FaSpinner,
} from 'react-icons/fa'
import { MarkdownContent } from './MarkdownContent'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface AIChatBubbleProps {
  isOpen: boolean
  onClose: () => void
  activeSection?: string
}

const defaultSuggestions = [
  'Tell me about Pixel Crew',
  'What are your top engineering skills?',
  'What did you build at AWS?',
  'How can I get in touch?',
]

export function AIChatBubble({ isOpen, onClose, activeSection = 'hero' }: AIChatBubbleProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am yhelAI, Arnel's autonomous portfolio assistant. Ask me anything about his engineering systems, multi-agent swarms, or technical capabilities!",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Dedicated refs for desktop and mobile scroll containers and inputs
  const desktopScrollRef = useRef<HTMLDivElement | null>(null)
  const mobileScrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const mobileInputRef = useRef<HTMLInputElement | null>(null)

  // Track viewport size on mount and resize
  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024)
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  // Focus the appropriate input according to viewport size
  const focusInput = () => {
    if (typeof window === 'undefined') return
    const isDesktopView = window.innerWidth >= 1024
    const target = isDesktopView ? inputRef.current : mobileInputRef.current
    if (target) {
      target.focus({ preventScroll: true })
      try {
        const len = target.value.length
        target.setSelectionRange(len, len)
      } catch {}
    }
  }

  // Callback ref for desktop input: focuses immediately when DOM node mounts
  const setDesktopInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node
    if (node && isOpen && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      node.focus({ preventScroll: true })
    }
  }

  // Callback ref for mobile input: focuses synchronously during user tap activation window
  const setMobileInputRef = (node: HTMLInputElement | null) => {
    mobileInputRef.current = node
    if (node && isOpen && typeof window !== 'undefined' && window.innerWidth < 1024) {
      node.focus({ preventScroll: true })
    }
  }

  // Unified scroll-to-bottom helper targeting visible scroll container
  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'auto') => {
    const scrollTarget = (el: HTMLDivElement | null) => {
      if (!el) return
      // Check if container is visible or rendered with dimensions
      if (el.offsetParent !== null || el.clientHeight > 0) {
        if (behavior === 'smooth') {
          el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
        } else {
          el.scrollTop = el.scrollHeight
        }
      }
    }
    scrollTarget(desktopScrollRef.current)
    scrollTarget(mobileScrollRef.current)
  }

  // Multi-staged auto-focus and scroll-down when chat opens
  useEffect(() => {
    if (isOpen) {
      // Stage 1: Immediate animation frame
      requestAnimationFrame(() => {
        scrollToBottom('auto')
        focusInput()
      })
      // Stage 2: Quick tick (50ms - early sheet emergence)
      const t1 = setTimeout(() => {
        focusInput()
      }, 50)
      // Stage 3: Animation complete tick (180ms - guarantees mobile keyboard activates)
      const t2 = setTimeout(() => {
        focusInput()
        scrollToBottom('auto')
      }, 180)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [isOpen])

  // Scroll to bottom on new message / stream chunk updates
  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto')
    }
  }, [messages, isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSend = async (queryText?: string) => {
    const text = queryText || input
    if (!text.trim() || isLoading) return

    const userMsg: ChatMessage = { role: 'user', content: text.trim() }
    const updatedMessages: ChatMessage[] = [...messages, userMsg, { role: 'assistant', content: '' }]
    const botMsgIndex = updatedMessages.length - 1

    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    // Immediate scroll to bottom to show user's query & "Thinking..." state
    requestAnimationFrame(() => {
      scrollToBottom('smooth')
    })

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.slice(0, botMsgIndex).map((m) => ({ role: m.role, content: m.content })),
          uiContext: { activeSection },
        }),
      })

      if (!res.ok) {
        throw new Error(`Chat service returned ${res.status}`)
      }

      if (!res.body) {
        throw new Error('No response stream')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      let buffer = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const rawEvents = buffer.split(/\n\n+/)
        buffer = rawEvents.pop() || ''

        for (const rawEvent of rawEvents) {
          const lines = rawEvent.split('\n')
          for (const line of lines) {
            const trimmed = line.trim()
            if (trimmed.startsWith('data:')) {
              const dataStr = trimmed.replace(/^data:\s*/, '')
              if (!dataStr || dataStr === '[DONE]') continue

              try {
                const parsed = JSON.parse(dataStr)
                if (parsed.type === 'delta' && parsed.content) {
                  assistantText += parsed.content
                  setMessages((prev) => {
                    const updated = [...prev]
                    if (updated[botMsgIndex]) {
                      updated[botMsgIndex] = {
                        role: 'assistant',
                        content: assistantText,
                      }
                    }
                    return updated
                  })
                  requestAnimationFrame(() => {
                    scrollToBottom('auto')
                  })
                } else if (parsed.content && !assistantText) {
                  assistantText = parsed.content
                  setMessages((prev) => {
                    const updated = [...prev]
                    if (updated[botMsgIndex]) {
                      updated[botMsgIndex] = {
                        role: 'assistant',
                        content: assistantText,
                      }
                    }
                    return updated
                  })
                  requestAnimationFrame(() => {
                    scrollToBottom('auto')
                  })
                }
              } catch {
                // Ignore parse errors on raw tokens
              }
            }
          }
        }
      }

      // If streaming finished but assistantText is still empty, provide graceful fallback
      if (!assistantText.trim()) {
        const fallbackText =
          "Arnel is a full-stack engineer specialized in **TypeScript**, **Next.js**, **Flutter**, and **Generative AI systems**. He created **Pixel Crew** (23-agent autonomous software engineering swarm) and won **Best Business Impact** at AWS BGC."
        setMessages((prev) => {
          const updated = [...prev]
          if (updated[botMsgIndex]) {
            updated[botMsgIndex] = { role: 'assistant', content: fallbackText }
          }
          return updated
        })
      }
    } catch {
      // Offline / API error fallback
      const fallbackText =
        "Arnel Baylon is a Software Engineer & Agentic Developer specializing in **Autonomous AI Swarms**, **Next.js**, **Node.js**, and Cloud Infrastructure. He led the architecture of **Pixel Crew** and clinical IT systems at GEAMH."
      setMessages((prev) => {
        const updated = [...prev]
        if (updated[botMsgIndex]) {
          updated[botMsgIndex] = { role: 'assistant', content: fallbackText }
        }
        return updated
      })
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        scrollToBottom('smooth')
        focusInput()
      }, 60)
    }
  }

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared! What else would you like to know about Arnel's work?",
      },
    ])
    setTimeout(() => {
      focusInput()
    }, 100)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Mobile Backdrop (lg:hidden) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* ── Chat Bubble Container (Desktop: Beside Sidebar Rail with No Overlap, Extending to Main Content) ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.7, scaleY: 0.92, x: -25, y: '-50%' }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1, x: 0, y: '-50%' }}
            exit={{ opacity: 0, scaleX: 0.7, scaleY: 0.92, x: -25, y: '-50%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 26, delay: 0.05 }}
            style={{ transformOrigin: 'left center' }}
            className="hidden lg:flex fixed left-[68px] xl:left-[84px] 2xl:left-[100px] top-1/2 z-50 w-[370px] xl:w-[410px] 2xl:w-[440px] h-[530px] max-h-[85vh] flex-col rounded-2xl bg-background dark:bg-[#0c0e18] border border-border/80 dark:border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.45)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.85)] overflow-hidden font-sans select-none"
          >
            {/* ── Speech Bubble Tail / Pointer pointing directly to the Sidebar Icon without touching it ── */}
            <div className="absolute -left-[6px] top-[60%] -translate-y-1/2 w-3 h-3 bg-background dark:bg-[#0c0e18] border-l border-b border-border/80 dark:border-white/15 rotate-45 shadow-[-2px_2px_4px_rgba(0,0,0,0.06)] pointer-events-none z-10" />

            {/* ── Bubble Header ── */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border dark:border-white/10 bg-muted/90 dark:bg-[#121624]">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-accent/15 dark:bg-accent/25 border border-accent/40 flex items-center justify-center text-accent">
                  <span className="text-xs">✦</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold tracking-tight text-foreground">
                      yhelAI
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                    Autonomous Portfolio Copilot
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Clear chat history"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <FaTrashAlt className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  title="Close chat (Esc)"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── Scrollable Messages Area ── */}
            <div
              ref={desktopScrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin"
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user'
                const isLatestAssistant = !isUser && idx === messages.length - 1
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                        isUser
                          ? 'bg-accent text-white font-bold'
                          : 'bg-muted dark:bg-white/10 text-foreground border border-border/60'
                      }`}
                    >
                      {isUser ? <FaUser /> : <FaRobot className="text-accent" />}
                    </div>

                    <div
                      className={`max-w-[84%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                        isUser
                          ? 'bg-accent text-white font-medium rounded-tr-xs shadow-xs'
                          : 'bg-muted/60 dark:bg-white/[0.06] text-foreground border border-border/50 dark:border-white/[0.06] rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.content ? (
                        <div>
                          <MarkdownContent content={msg.content} isUser={isUser} />
                          {isLatestAssistant && isLoading && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="inline-block w-1.5 h-3.5 ml-1 bg-accent rounded-xs align-middle"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                          <FaSpinner className="w-3 h-3 animate-spin text-accent" />
                          <span className="text-[11px] font-mono">Thinking...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Quick Prompt Suggestions when just greeting */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold px-1">
                    Suggested Questions
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {defaultSuggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => handleSend(suggestion)}
                        className="text-left px-3 py-1.5 rounded-xl bg-muted/40 dark:bg-white/[0.03] hover:bg-accent/15 border border-border/40 dark:border-white/[0.06] text-foreground text-[11px] font-mono transition-colors cursor-pointer"
                      >
                        &rarr; {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Bubble Input Form ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="relative z-10 p-3 border-t border-border dark:border-white/10 bg-muted/60 dark:bg-[#121624]"
            >
              <div className="relative flex items-center">
                <input
                  ref={setDesktopInputRef}
                  autoFocus={isDesktop}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Arnel..."
                  disabled={isLoading}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-background dark:bg-[#0c0e18] border border-border dark:border-white/15 text-foreground placeholder:text-muted-foreground font-sans text-xs focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-inner"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="absolute right-1.5 p-2 rounded-lg bg-accent text-white hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all cursor-pointer shadow-xs"
                >
                  {isLoading ? (
                    <FaSpinner className="w-3 h-3 animate-spin" />
                  ) : (
                    <FaPaperPlane className="w-3 h-3" />
                  )}
                </button>
              </div>
              <p className="text-[9.5px] font-mono text-center text-muted-foreground/70 mt-1.5">
                Grounding on verified resume & portfolio data
              </p>
            </form>
          </motion.div>

          {/* ── Mobile Bottom Sheet (lg:hidden) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="lg:hidden fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-50 max-w-md mx-auto max-h-[72vh] h-[460px] flex flex-col rounded-2xl bg-background dark:bg-[#0c0e18] border border-border dark:border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden font-sans select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-white/10 bg-muted/90 dark:bg-[#121624]">
              <div className="flex items-center gap-2">
                <span className="text-accent text-sm">✦</span>
                <span className="font-mono text-xs font-bold text-foreground">yhelAI Copilot</span>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Clear chat history"
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <FaTrashAlt className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Messages */}
            <div
              ref={mobileScrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin"
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user'
                const isLatestAssistant = !isUser && idx === messages.length - 1
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] mt-0.5 ${
                        isUser
                          ? 'bg-accent text-white font-bold'
                          : 'bg-muted dark:bg-white/10 text-foreground border border-border/60'
                      }`}
                    >
                      {isUser ? <FaUser /> : <FaRobot className="text-accent text-[8px]" />}
                    </div>

                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed ${
                        isUser
                          ? 'bg-accent text-white font-medium rounded-tr-xs'
                          : 'bg-muted/60 dark:bg-white/[0.06] text-foreground border border-border/50 rounded-tl-xs'
                      }`}
                    >
                      {msg.content ? (
                        <div>
                          <MarkdownContent content={msg.content} isUser={isUser} />
                          {isLatestAssistant && isLoading && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="inline-block w-1.5 h-3.5 ml-1 bg-accent rounded-xs align-middle"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                          <FaSpinner className="w-3 h-3 animate-spin text-accent" />
                          <span className="text-[11px] font-mono">Thinking...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Quick Prompt Suggestions on mobile too when just greeting */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold px-1">
                    Suggested Questions
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {defaultSuggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => handleSend(suggestion)}
                        className="text-left px-3 py-1.5 rounded-xl bg-muted/40 dark:bg-white/[0.03] hover:bg-accent/15 border border-border/40 dark:border-white/[0.06] text-foreground text-[11px] font-mono transition-colors cursor-pointer"
                      >
                        &rarr; {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 border-t border-border dark:border-white/10 bg-muted/70 dark:bg-[#121624]"
            >
              <div className="relative flex items-center">
                <input
                  ref={setMobileInputRef}
                  autoFocus={!isDesktop}
                  type="text"
                  inputMode="text"
                  enterKeyHint="send"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Arnel..."
                  disabled={isLoading}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-background dark:bg-[#0c0e18] border border-border dark:border-white/15 text-foreground text-xs focus:outline-hidden focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2 rounded-lg bg-accent text-white"
                >
                  <FaPaperPlane className="w-3 h-3" />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
