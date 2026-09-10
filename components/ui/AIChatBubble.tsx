'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaPaperPlane,
  FaTimes,
  FaTrashAlt,
  FaRobot,
  FaUser,
  FaSpinner,
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'
import { MarkdownContent } from './MarkdownContent'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface AIChatBubbleProps {
  isOpen: boolean
  onClose: () => void
  activeSection?: string
  mode?: 'tech' | 'client'
}

const techSuggestions = [
  'Tell me about Pixel Crew',
  'What are your top engineering skills?',
  'What did you build at AWS?',
  'How can I get in touch?',
]

const clientSuggestions = [
  "I'm not tech-savvy—will this be easy to manage?",
  'How do my customers pay or book online?',
  'How fast can we launch my website or app?',
  'How does pricing work? Any surprise fees?',
  'I only have a rough idea—where do we start?',
]

const getClientGreeting = () =>
  "Hello! I'm Arnel's **Client Project Advisor**.\n\nNo technical experience? **No problem at all!** I'm here to answer your questions in plain, everyday English:\n\n- **Easy to Manage**: Point-and-click control to update text and pictures yourself\n- **Fast 2–4 Week Launch**: Weekly test previews sent directly to your phone\n- **Clear Fixed Pricing**: Transparent quotes with zero surprise fees\n- **100% Total Ownership**: You own all files, accounts, and designs from day one\n\nWhat kind of website, store, or app would you like to build?"

const getTechGreeting = () =>
  "Hello! I am yhelAI, Arnel's autonomous portfolio assistant. Ask me anything about his engineering systems, multi-agent swarms, or technical capabilities!"

export function AIChatBubble({
  isOpen,
  onClose,
  activeSection = 'hero',
  mode = 'tech',
}: AIChatBubbleProps) {
  const isClientMode = mode === 'client'
  const suggestions = isClientMode ? clientSuggestions : techSuggestions

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: isClientMode ? getClientGreeting() : getTechGreeting(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const desktopScrollRef = useRef<HTMLDivElement | null>(null)
  const mobileScrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const mobileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            role: 'assistant',
            content: isClientMode ? getClientGreeting() : getTechGreeting(),
          },
        ]
      }
      return prev
    })
  }, [isClientMode])

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024)
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

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

  const setDesktopInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node
    if (node && isOpen && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      node.focus({ preventScroll: true })
    }
  }

  const setMobileInputRef = (node: HTMLInputElement | null) => {
    mobileInputRef.current = node
    if (node && isOpen && typeof window !== 'undefined' && window.innerWidth < 1024) {
      node.focus({ preventScroll: true })
    }
  }

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'auto') => {
    const scrollTarget = (el: HTMLDivElement | null) => {
      if (!el) return
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

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        scrollToBottom('auto')
        focusInput()
      })
      const t1 = setTimeout(() => {
        focusInput()
      }, 50)
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

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto')
    }
  }, [messages, isOpen])

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
          persona: isClientMode ? 'client' : 'developer',
        }),
      })

      if (!res.ok) throw new Error(`Chat service returned ${res.status}`)
      if (!res.body) throw new Error('No response stream')

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
                      updated[botMsgIndex] = { role: 'assistant', content: assistantText }
                    }
                    return updated
                  })
                }
              } catch {}
            }
          }
        }
      }

      if (!assistantText.trim()) {
        const fallbackText = isClientMode
          ? "Arnel partners with founders and business owners to build high-converting websites, online stores, and custom web apps with a typical 2–4 week turnaround. You can reach Arnel directly at **arnlebaylon15@gmail.com** or fill out the 3-step project form below!"
          : "Arnel is a full-stack engineer specialized in **TypeScript**, **Next.js**, **Flutter**, and **Generative AI systems**. He created **Pixel Crew** and won **Best Business Impact** at AWS."
        setMessages((prev) => {
          const updated = [...prev]
          if (updated[botMsgIndex]) {
            updated[botMsgIndex] = { role: 'assistant', content: fallbackText }
          }
          return updated
        })
      }
    } catch {
      const fallbackText = isClientMode
        ? "Arnel builds custom websites, web applications, and smart automations tailored for business founders. For immediate project inquiries, feel free to email **arnlebaylon15@gmail.com** or use the step-by-step form guide below."
        : "Arnel Baylon is a Software Engineer & Agentic Developer specializing in Autonomous AI Swarms, Next.js, and Cloud Infrastructure."
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
        content: isClientMode
          ? "Chat cleared! How can I help you with your project timeline, pricing, or ideas?"
          : "Chat cleared! What else would you like to know about Arnel's work?",
      },
    ])
    setTimeout(() => {
      focusInput()
    }, 100)
  }

  const handleActionNavigate = (targetId: string) => {
    onClose()
    if (typeof window !== 'undefined') {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.hash = `#${targetId}`
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* ── Desktop Chat Window (100% Solid Non-Transparent in Light Mode) ── */}
          <motion.div
            initial={
              isClientMode
                ? { opacity: 0, scale: 0.94, y: 20 }
                : { opacity: 0, scaleX: 0.7, scaleY: 0.92, x: -25, y: '-50%' }
            }
            animate={
              isClientMode
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, scaleX: 1, scaleY: 1, x: 0, y: '-50%' }
            }
            exit={
              isClientMode
                ? { opacity: 0, scale: 0.94, y: 20 }
                : { opacity: 0, scaleX: 0.7, scaleY: 0.92, x: -25, y: '-50%' }
            }
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            style={{ transformOrigin: isClientMode ? 'bottom right' : 'left center' }}
            className={`hidden lg:flex fixed z-50 flex-col rounded-2xl bg-white dark:bg-[#0c0e18] border ${
              isClientMode
                ? 'right-6 xl:right-10 bottom-6 w-[380px] xl:w-[420px] 2xl:w-[440px] h-[550px] max-h-[85vh] border-accent/40 shadow-2xl'
                : 'left-[68px] xl:left-[84px] 2xl:left-[100px] top-1/2 w-[370px] xl:w-[410px] 2xl:w-[440px] h-[530px] max-h-[85vh] border-zinc-200 dark:border-white/10 shadow-2xl'
            } overflow-hidden font-sans select-none`}
          >
            {!isClientMode && (
              <div className="absolute -left-[6px] top-[60%] -translate-y-1/2 w-3 h-3 bg-white dark:bg-[#0c0e18] border-l border-b border-zinc-200 dark:border-white/10 rotate-45 pointer-events-none z-10" />
            )}

            {/* ── Header ── */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#121624]">
              <div className="flex items-center gap-2.5">
                {isClientMode ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1.5 ring-accent/40 shrink-0">
                    <Image src="/images/me.jpg" alt="Arnel Baylon" fill sizes="32px" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                    <span className="text-xs">✦</span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-foreground tracking-tight">
                      {isClientMode ? "Arnel's AI Assistant" : 'yhelAI'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    {isClientMode ? 'Client Project Advisor • Online' : 'Autonomous Portfolio Copilot'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button type="button" onClick={handleClear} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-200/70 dark:hover:bg-white/[0.08] active:scale-90 transition-colors cursor-pointer"><FaTrashAlt className="w-3 h-3" /></button>
                )}
                <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-zinc-200/70 dark:hover:bg-white/[0.08] active:scale-90 transition-colors cursor-pointer"><FaTimes className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            {/* ── Messages Scroll Container ── */}
            <div ref={desktopScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin bg-white dark:bg-[#0c0e18]">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user'
                const isLatestAssistant = !isUser && idx === messages.length - 1
                return (
                  <div key={idx} className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] mt-0.5 ${isUser ? 'bg-accent text-black font-bold shadow-xs' : isClientMode ? 'bg-accent/15 text-accent' : 'bg-zinc-100 dark:bg-muted text-foreground'}`}>
                      {isUser ? <FaUser /> : isClientMode ? <HiSparkles className="w-3.5 h-3.5 text-accent" /> : <FaRobot className="text-accent" />}
                    </div>
                    <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${isUser ? 'bg-accent text-black font-medium rounded-tr-xs shadow-xs' : 'bg-zinc-100 dark:bg-muted/50 border border-zinc-200/70 dark:border-white/5 text-foreground rounded-tl-xs shadow-2xs'}`}>
                      {msg.content ? (
                        <div>
                          <MarkdownContent content={msg.content} isUser={isUser} />
                          {isLatestAssistant && isLoading && (
                            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-3.5 ml-1 bg-accent rounded-xs align-middle" aria-hidden="true" />
                          )}
                          {isClientMode && !isUser && (msg.content.includes('project form') || msg.content.includes('contact form') || msg.content.includes('inquiry')) && (
                            <div className="mt-2.5 pt-2 border-t border-zinc-200 dark:border-border/40 flex flex-wrap gap-2">
                              <button type="button" onClick={() => handleActionNavigate('contact')} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-accent text-black hover:bg-accent/90 active:scale-95 transition-all shadow-2xs cursor-pointer"><span>Fill Project Form</span><span>&rarr;</span></button>
                              <a href="mailto:arnlebaylon15@gmail.com" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-200/80 dark:bg-muted hover:bg-zinc-300 dark:hover:bg-muted/80 active:scale-95 text-foreground transition-all cursor-pointer"><span>Email Arnel</span></a>
                            </div>
                          )}
                          {isClientMode && !isUser && msg.content.includes('projects') && !msg.content.includes('project form') && (
                            <div className="mt-2.5 pt-2 border-t border-zinc-200 dark:border-border/40 flex flex-wrap gap-2">
                              <button type="button" onClick={() => handleActionNavigate('projects')} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-accent/15 text-accent hover:bg-accent/25 active:scale-95 transition-all cursor-pointer"><span>View Client Projects</span><span>&rarr;</span></button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 text-muted-foreground"><FaSpinner className="w-3 h-3 animate-spin text-accent" /><span className="text-[11px] font-mono">Thinking...</span></div>
                      )}
                    </div>
                  </div>
                )
              })}
              {messages.length === 1 && (
                <div className="pt-2 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold px-1">{isClientMode ? 'Common Client Questions' : 'Suggested Questions'}</span>
                  <div className="flex flex-col gap-1.5">
                    {suggestions.map((s, i) => (
                      <button key={i} type="button" onClick={() => handleSend(s)} className="text-left px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-accent/15 dark:bg-muted/40 dark:hover:bg-accent/15 border border-zinc-200/80 dark:border-transparent text-foreground text-[11px] transition-colors active:scale-[0.98] cursor-pointer">&rarr; {s}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Input Footer ── */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="relative z-10 p-3 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#121624]">
              <div className="relative flex items-center">
                <input ref={setDesktopInputRef} autoFocus={isDesktop} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isClientMode ? 'Ask in plain English (e.g. "Can I update photos myself?")...' : 'Ask anything about Arnel...'} disabled={isLoading} className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white dark:bg-card border border-zinc-300 dark:border-white/10 text-foreground placeholder:text-muted-foreground font-sans text-xs focus:outline-hidden focus:ring-1.5 focus:ring-accent/40 focus:border-transparent transition-colors shadow-2xs" />
                <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send message" className="absolute right-1.5 p-2 rounded-lg bg-accent text-black hover:bg-accent/90 disabled:opacity-40 transition-colors active:scale-95 cursor-pointer shadow-xs font-bold">
                  {isLoading ? <FaSpinner className="w-3 h-3 animate-spin text-inherit" /> : <FaPaperPlane className="w-3 h-3 text-inherit" />}
                </button>
              </div>
              <p className="text-[9.5px] font-mono text-center text-muted-foreground/70 mt-1.5">{isClientMode ? '100% non-tech friendly • Fixed pricing & 2–4 week launch' : 'Grounding on verified resume & portfolio data'}</p>
            </form>
          </motion.div>

          {/* ── Mobile Chat Sheet (100% Solid Non-Transparent in Light Mode) ── */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ type: 'spring', stiffness: 360, damping: 28 }} className={`lg:hidden fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-50 max-w-md mx-auto max-h-[72vh] h-[480px] flex flex-col rounded-2xl bg-white dark:bg-[#0c0e18] border ${isClientMode ? 'border-accent/40' : 'border-zinc-200 dark:border-white/15'} shadow-2xl overflow-hidden font-sans select-none`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#121624]">
              <div className="flex items-center gap-2">
                {isClientMode ? <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1.5 ring-accent/40 shrink-0"><Image src="/images/me.jpg" alt="Arnel Baylon" fill sizes="24px" className="object-cover" /></div> : <span className="text-accent text-sm">✦</span>}
                <div><div className="flex items-center gap-1.5"><span className="font-semibold text-xs text-foreground">{isClientMode ? "Arnel's AI Assistant" : 'yhelAI Copilot'}</span><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /></div></div>
              </div>
              <div className="flex items-center gap-1"><button type="button" onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground active:scale-90 transition-transform"><FaTimes className="w-4 h-4" /></button></div>
            </div>
            <div ref={mobileScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs scrollbar-thin bg-white dark:bg-[#0c0e18]">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user'
                const isLatestAssistant = !isUser && idx === messages.length - 1
                return (
                  <div key={idx} className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] mt-0.5 ${isUser ? 'bg-accent text-black font-bold' : isClientMode ? 'bg-accent/15 text-accent' : 'bg-zinc-100 dark:bg-muted text-foreground'}`}>
                      {isUser ? <FaUser /> : isClientMode ? <HiSparkles className="text-accent text-[10px]" /> : <FaRobot className="text-accent text-[8px]" />}
                    </div>
                    <div className={`max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed ${isUser ? 'bg-accent text-black font-medium rounded-tr-xs shadow-xs' : 'bg-zinc-100 dark:bg-muted/50 border border-zinc-200/70 dark:border-white/5 text-foreground rounded-tl-xs'}`}>
                      {msg.content ? (
                        <div>
                          <MarkdownContent content={msg.content} isUser={isUser} />
                          {isLatestAssistant && isLoading && (<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-3.5 ml-1 bg-accent rounded-xs align-middle" aria-hidden="true" />)}
                          {isClientMode && !isUser && (msg.content.includes('project form') || msg.content.includes('contact form') || msg.content.includes('inquiry')) && (
                            <div className="mt-2.5 pt-2 border-t border-zinc-200 dark:border-border/40 flex flex-wrap gap-2"><button type="button" onClick={() => handleActionNavigate('contact')} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-accent text-black hover:bg-accent/90 active:scale-95 transition-all shadow-2xs cursor-pointer"><span>Fill Form</span><span>&rarr;</span></button><a href="mailto:arnlebaylon15@gmail.com" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-zinc-200/80 dark:bg-muted text-foreground active:scale-95 transition-all cursor-pointer"><span>Email</span></a></div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1 text-muted-foreground"><FaSpinner className="w-3 h-3 animate-spin text-accent" /><span className="text-[11px] font-mono">Thinking...</span></div>
                      )}
                    </div>
                  </div>
                )
              })}
              {messages.length === 1 && (
                <div className="pt-2 space-y-1.5"><span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold px-1">{isClientMode ? 'Common Questions' : 'Suggested Questions'}</span><div className="flex flex-col gap-1.5">{suggestions.map((s, i) => (<button key={i} type="button" onClick={() => handleSend(s)} className="text-left px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-muted/40 hover:bg-accent/15 border border-zinc-200/80 dark:border-transparent text-foreground text-[11px] transition-colors active:scale-[0.98] cursor-pointer">&rarr; {s}</button>))}</div></div>
              )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="p-3 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#121624]">
              <div className="relative flex items-center">
                <input ref={setMobileInputRef} autoFocus={!isDesktop} type="text" inputMode="text" enterKeyHint="send" value={input} onChange={(e) => setInput(e.target.value)} placeholder={isClientMode ? 'Ask in plain English (e.g. "Can I update photos myself?")...' : 'Ask anything about Arnel...'} disabled={isLoading} className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white dark:bg-card border border-zinc-300 dark:border-white/10 text-foreground text-xs focus:outline-hidden focus:ring-1.5 focus:ring-accent/40 transition-colors" />
                <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-1.5 p-2 rounded-lg bg-accent text-black font-bold active:scale-95 transition-transform"><FaPaperPlane className="w-3 h-3 text-inherit" /></button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
