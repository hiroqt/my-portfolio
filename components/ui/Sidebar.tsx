'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf,
  FaMoon,
  FaSun,
  FaDesktop,
  FaBars,
  FaTimes,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp,
  FaSpinner,
} from 'react-icons/fa'
import { useTheme } from '../ThemeProvider'

interface NavLink {
  id: string
  label: string
  href: string
  badge?: string
}

interface NavCategory {
  category: string
  links: NavLink[]
}

const categorizedNav: NavCategory[] = [
  {
    category: 'Systems & Work',
    links: [
      { id: 'projects', label: 'Featured Systems', href: '#projects' },
      { id: 'experience', label: 'Work Experience', href: '#experience' },
    ],
  },
  {
    category: 'Technical Proof',
    links: [
      { id: 'skills', label: 'Tech Stack & Arsenal', href: '#skills' },
      { id: 'certifications', label: 'Credentials & Badges', href: '#certifications', badge: '11+' },
      { id: 'education', label: 'Academic Degree', href: '#education' },
      { id: 'gallery', label: 'Artifact Studio', href: '#gallery' },
    ],
  },
  {
    category: 'Contact',
    links: [
      { id: 'contact', label: 'Get in Touch', href: '#contact' },
    ],
  },
]

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const defaultPromptSuggestions = [
  "What are Arnel's top skills?",
  "Tell me about Pixel Crew",
  "What did Arnel build at AWS?",
]

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('projects')

  // Inline Dropdown yhelAI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am yhelAI. Ask me anything about Arnel's software engineering, multi-agent swarms, or full-stack background.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto scroll chat
  useEffect(() => {
    if (isChatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isChatOpen])

  // Active section scroll spy
  useEffect(() => {
    const allLinks = categorizedNav.flatMap((c) => c.links)
    const handleScroll = () => {
      const sectionIds = allLinks.map((n) => n.id)
      const scrollPosition = window.scrollY + 220

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSendMessage = async (customText?: string) => {
    const text = customText || input
    if (!text.trim() || isLoading) return

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

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
        throw new Error('Chat service busy')
      }

      const data = await res.json()
      const botResponse =
        data.text ||
        data.response ||
        data.message ||
        data.content ||
        "Arnel is a full-stack software engineer specialized in Generative AI systems, multi-agent swarms, and scalable web applications with Next.js, Node.js, and PostgreSQL."

      setMessages([...newMessages, { role: 'assistant', content: botResponse }])
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            "Arnel is a full-stack engineer specialized in TypeScript, Next.js, Flutter, Laravel, and Generative AI systems. He created Pixel Crew (23-agent autonomous software engineering swarm) and won Best Business Impact at AWS BGC.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* ── Desktop Clean Sidebar with Categorized Links & Dropdown yhelAI ── */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 z-50 flex-col justify-between border-r border-border bg-background px-5 py-6 select-none overflow-hidden">
        
        {/* Top: Minimal Clean Developer Brand (No Logo/Picture) */}
        <div className="flex flex-col min-h-0 flex-1">
          <div className="pb-4 border-b border-border/60">
            <Link href="/" className="group block">
              <span className="font-serif font-bold text-base text-foreground block truncate leading-tight group-hover:text-accent transition-colors">
                Arnel Baylon
              </span>
              <span className="font-mono text-[11px] text-muted-foreground block truncate mt-0.5">
                Software Engineer
              </span>
            </Link>
          </div>

          {/* Main Area: Categorized Navigation Links with Responsive Inline yhelAI Dropdown */}
          <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4 scrollbar-thin">
            
            {/* Categorized Navigation Groups */}
            {categorizedNav.map((group) => (
              <div key={group.category} className="space-y-1">
                <div className="px-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80 font-semibold mb-1.5">
                  {group.category}
                </div>

                <nav className="space-y-0.5" aria-label={group.category}>
                  {group.links.map((item) => {
                    const isActive = activeSection === item.id

                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        className={`group relative flex items-center justify-between px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 ${
                          isActive
                            ? 'text-foreground font-semibold bg-muted/60'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                        }`}
                      >
                        {/* Left Active Indicator Bar */}
                        {isActive && (
                          <motion.span
                            layoutId="activeSidebarIndicator"
                            className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-accent"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}

                        <span className="truncate pl-1">{item.label}</span>

                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-muted border border-border text-muted-foreground">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    )
                  })}
                </nav>
              </div>
            ))}

            {/* ── Responsive Inline Expandable yhelAI Assistant Dropdown ── */}
            <div className="pt-2 border-t border-border/50">
              <button
                type="button"
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer ${
                  isChatOpen
                    ? 'bg-accent text-white font-semibold shadow-xs'
                    : 'text-accent bg-accent/10 hover:bg-accent/15 border border-accent/20 font-medium'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">✦</span>
                  <span>yhelAI Assistant</span>
                </div>
                {isChatOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
              </button>

              {/* Expandable In-Place Chat Box */}
              <AnimatePresence>
                {isChatOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden p-3 rounded-xl bg-muted/20 border border-accent/30 shadow-xs space-y-2.5 font-mono"
                  >
                    {/* Messages Container */}
                    <div className="space-y-2 overflow-y-auto max-h-44 text-[11px] pr-1 scrollbar-thin">
                      {messages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            m.role === 'assistant' ? 'justify-start' : 'justify-end'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg leading-relaxed w-fit max-w-[85%] ${
                              m.role === 'assistant'
                                ? 'bg-background text-foreground border border-border/70 shadow-2xs'
                                : 'bg-accent text-white'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{m.content}</p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-background text-muted-foreground text-[10.5px] border border-border/60">
                          <FaSpinner className="animate-spin text-accent text-[10px]" />
                          <span>Thinking...</span>
                        </div>
                      )}
                      <div ref={chatBottomRef} />
                    </div>

                    {/* Quick Question Chips */}
                    {messages.length <= 2 && (
                      <div className="space-y-1 pt-1 border-t border-border/40">
                        {defaultPromptSuggestions.slice(0, 2).map((sug, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSendMessage(sug)}
                            className="w-full text-left p-1 rounded bg-background border border-border/50 text-[10px] text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors truncate cursor-pointer"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Chat Input & Send Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                      }}
                      className="pt-2 border-t border-border/40 flex items-center gap-1.5 w-full min-w-0"
                    >
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about Arnel..."
                        className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg bg-background border border-border text-foreground text-[11px] placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-accent"
                        disabled={isLoading}
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-40 transition-opacity cursor-pointer shadow-2xs"
                        aria-label="Send message"
                      >
                        <FaPaperPlane className="text-[9px]" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Bottom: Social Links & Theme Switcher */}
        <div className="pt-4 border-t border-border/60 space-y-3 shrink-0">
          
          {/* Social Icons Bar */}
          <div className="flex items-center justify-between px-1 text-muted-foreground">
            <a
              href="https://github.com/hiroqt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-foreground hover:bg-muted transition-colors"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <FaGithub className="text-sm" />
            </a>
            <a
              href="https://www.linkedin.com/in/arnel-baylon-b05233189"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-foreground hover:bg-muted transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <FaLinkedin className="text-sm" />
            </a>
            <a
              href="mailto:arnelbaylon15@gmail.com"
              className="p-2 rounded-lg hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Send Email"
              title="Email"
            >
              <FaEnvelope className="text-sm" />
            </a>
            <a
              href="/pdf/Arnel_Baylon_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Download Official Résumé (PDF)"
              title="Résumé"
            >
              <FaFilePdf className="text-sm" />
            </a>
          </div>

          {/* 3-State Theme Switcher */}
          {mounted && (
            <div className="flex items-center justify-between p-1 rounded-xl bg-muted/50 border border-border/60">
              {(['system', 'light', 'dark'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTheme(mode)}
                  className={`flex-1 py-1.5 flex items-center justify-center rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                    theme === mode
                      ? 'bg-background text-foreground shadow-2xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label={`Switch theme to ${mode}`}
                  title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`}
                >
                  {mode === 'system' && <FaDesktop className="w-3 h-3" />}
                  {mode === 'light' && <FaSun className="w-3 h-3" />}
                  {mode === 'dark' && <FaMoon className="w-3 h-3" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile Header Bar (Solid Background) ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-background border-b border-border shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif font-bold text-sm text-foreground">
            Arnel Baylon
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="/pdf/Arnel_Baylon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted border border-border text-foreground text-xs"
            aria-label="Download Résumé"
          >
            <FaFilePdf className="text-accent" />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-foreground text-background text-xs cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer (Solid Background with Pop-Up Spring Animation) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="lg:hidden fixed inset-x-0 top-14 z-50 p-5 bg-background border-b border-border shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Categorized Nav in Mobile */}
            {categorizedNav.map((group) => (
              <div key={group.category} className="space-y-1">
                <div className="px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {group.category}
                </div>
                <nav className="space-y-1">
                  {group.links.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between p-2 rounded-lg text-xs font-mono text-foreground hover:bg-muted transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-muted border border-border text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </nav>
              </div>
            ))}

            {/* Mobile yhelAI Chat in Drawer */}
            <div className="pt-3 border-t border-border space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-accent font-semibold">
                  <span>✦</span>
                  <span>yhelAI Assistant</span>
                </div>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg text-[11px] w-fit max-w-[85%] ${
                        m.role === 'assistant'
                          ? 'bg-muted text-foreground'
                          : 'bg-accent text-white'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center gap-2 w-full min-w-0"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Arnel..."
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-muted border border-border text-xs text-foreground focus:outline-hidden"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-accent text-white"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <a href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  <FaLinkedin />
                </a>
                <a href="mailto:arnelbaylon15@gmail.com" className="hover:text-foreground">
                  <FaEnvelope />
                </a>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Arnel Baylon &bull; 2026
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default Sidebar
