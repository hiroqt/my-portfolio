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
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading, isOpen])

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

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text.trim() }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    // Add placeholder assistant response for streaming/updating
    const botMsgIndex = newMessages.length
    setMessages([...newMessages, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
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
          "Arnel is a full-stack engineer specialized in TypeScript, Next.js, Flutter, and Generative AI systems. He created Pixel Crew (23-agent autonomous software engineering swarm) and won Best Business Impact at AWS BGC."
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
        "Arnel Baylon is a Software Engineer & Agentic Developer specializing in Autonomous AI Swarms, Next.js, Node.js, and Cloud Infrastructure. He led the architecture of Pixel Crew and clinical IT systems at GEAMH."
      setMessages((prev) => {
        const updated = [...prev]
        if (updated[botMsgIndex]) {
          updated[botMsgIndex] = { role: 'assistant', content: fallbackText }
        }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared! What else would you like to know about Arnel's work?",
      },
    ])
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
            className="hidden lg:flex fixed left-[68px] xl:left-[84px] 2xl:left-[100px] top-1/2 z-50 w-[370px] xl:w-[410px] 2xl:w-[440px] h-[530px] max-h-[85vh] flex-col rounded-2xl bg-background/95 dark:bg-[#0c0e18]/95 backdrop-blur-2xl border border-border/80 dark:border-white/12 shadow-[0_25px_70px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.75)] overflow-hidden font-sans select-none"
          >
            {/* ── Speech Bubble Tail / Pointer pointing directly to the Sidebar Icon without touching it ── */}
            <div className="absolute -left-[6px] top-[60%] -translate-y-1/2 w-3 h-3 bg-background dark:bg-[#0c0e18] border-l border-b border-border/80 dark:border-white/15 rotate-45 shadow-[-2px_2px_4px_rgba(0,0,0,0.06)] pointer-events-none z-10" />

            {/* ── Bubble Header ── */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border/60 dark:border-white/[0.08] bg-muted/30 dark:bg-white/[0.02]">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user'
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
                      className={`max-w-[82%] px-3 py-2 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-accent text-white font-medium rounded-tr-xs shadow-xs'
                          : 'bg-muted/60 dark:bg-white/[0.06] text-foreground border border-border/50 dark:border-white/[0.06] rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.content || (
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

              <div ref={messagesEndRef} />
            </div>

            {/* ── Bubble Input Form ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="relative z-10 p-3 border-t border-border/60 dark:border-white/[0.08] bg-muted/20 dark:bg-white/[0.01]"
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Arnel..."
                  disabled={isLoading}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-background dark:bg-[#121624] border border-border dark:border-white/10 text-foreground placeholder:text-muted-foreground font-sans text-xs focus:outline-hidden focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-inner"
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
            className="lg:hidden fixed inset-x-3 bottom-20 z-50 max-w-md mx-auto max-h-[72vh] h-[460px] flex flex-col rounded-2xl bg-background/95 dark:bg-[#0c0e18]/95 backdrop-blur-2xl border border-border/80 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden font-sans select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 dark:border-white/[0.08] bg-muted/30 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="text-accent text-sm">✦</span>
                <span className="font-mono text-xs font-bold text-foreground">yhelAI Copilot</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-accent text-white font-medium rounded-tr-xs'
                        : 'bg-muted/60 dark:bg-white/[0.06] text-foreground border border-border/50 rounded-tl-xs'
                    }`}
                  >
                    {msg.content || 'Thinking...'}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Mobile Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 border-t border-border/60 dark:border-white/[0.08]"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Arnel..."
                  disabled={isLoading}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-background dark:bg-[#121624] border border-border dark:border-white/10 text-foreground text-xs focus:outline-hidden focus:ring-2 focus:ring-accent"
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
