'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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
  FaTerminal,
  FaBriefcase,
  FaCode,
  FaCertificate,
  FaGraduationCap,
  FaImages,
  FaChevronRight,
} from 'react-icons/fa'
import { useTheme } from '../ThemeProvider'
import { MarkdownContent } from './MarkdownContent'

interface NavLink {
  id: string
  label: string
  href: string
  badge?: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavCategory {
  category: string
  links: NavLink[]
}

const categorizedNav: NavCategory[] = [
  {
    category: 'Systems & Work',
    links: [
      { id: 'projects', label: 'Featured Systems', href: '#projects', icon: FaTerminal },
      { id: 'experience', label: 'Work Experience', href: '#experience', icon: FaBriefcase },
    ],
  },
  {
    category: 'Technical Proof',
    links: [
      { id: 'skills', label: 'Tech Stack & Arsenal', href: '#skills', icon: FaCode },
      { id: 'certifications', label: 'Credentials & Badges', href: '#certifications', badge: '11+', icon: FaCertificate },
      { id: 'education', label: 'Academic Degree', href: '#education', icon: FaGraduationCap },
      { id: 'gallery', label: 'Artifact Studio', href: '#gallery', icon: FaImages },
    ],
  },
  {
    category: 'Connect',
    links: [
      { id: 'contact', label: 'Get in Touch', href: '#contact', icon: FaPaperPlane },
    ],
  },
]

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const defaultPromptSuggestions = [
  "What are your top engineering skills?",
  "Tell me about Pixel Crew",
  "What did you build at AWS?",
]

export function Sidebar() {
  const { theme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [mobileHubOpen, setMobileHubOpen] = useState(false)
  const [mobileCopilotOpen, setMobileCopilotOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState('projects')

  // Inline yhelAI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am yhelAI. Ask me anything about engineering architectures, multi-agent swarms, or technical capabilities.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)
  const mobileChatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto scroll chat
  useEffect(() => {
    if (isChatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    if (mobileCopilotOpen) {
      mobileChatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isChatOpen, mobileCopilotOpen])

  // Lock background scroll when mobile sheets are open
  useEffect(() => {
    if (mobileHubOpen || mobileCopilotOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileHubOpen, mobileCopilotOpen])

  // Close mobile sheets on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileHubOpen(false)
        setMobileCopilotOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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

  const notifyCollapseChange = (collapsed: boolean) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('sidebar-collapse-change', { detail: { collapsed } })
      )
    }
  }

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      notifyCollapseChange(next)
      return next
    })
  }

  const handleMinimize = () => {
    setIsCollapsed(true)
    notifyCollapseChange(true)
  }

  const handleExpand = () => {
    setIsCollapsed(false)
    notifyCollapseChange(false)
  }

  // Keyboard shortcut to toggle sidebar (Cmd+B or Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        setIsCollapsed((prev) => {
          const next = !prev
          notifyCollapseChange(next)
          return next
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
      {/* ── Desktop Apple-Inspired Floating Glass Sidebar ── */}
      <aside
        className={`hidden lg:flex fixed left-3.5 top-3.5 bottom-3.5 z-50 flex-col justify-between rounded-2xl border border-border/80 dark:border-white/[0.08] bg-background/85 dark:bg-[#080a12]/85 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] select-none overflow-hidden transition-[width,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCollapsed ? 'w-[64px] px-2 py-3.5' : 'w-[260px] px-3.5 py-3.5'
        }`}
      >
        {/* Subtle Ambient Halftone Accent at top corner */}
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

        {/* ── Top Window Bar & Controls ── */}
        <div className="flex flex-col min-h-0 flex-1 relative z-10">
          
          {/* Window Chrome (No Name, Pure Apple macOS Controls) */}
          <div className="pb-3 border-b border-border/60 dark:border-white/[0.06]">
            {!isCollapsed ? (
              /* Expanded Mode Header: Traffic Lights on Left, Collapse Toggle on Right */
              <div className="flex items-center justify-between">
                {/* macOS Traffic Lights with Interactive Actions */}
                <div className="flex items-center gap-2 group/dots py-1">
                  {/* Close / Hide dot */}
                  <button
                    type="button"
                    onClick={handleMinimize}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 flex items-center justify-center text-[8px] text-[#4c0002] opacity-90 transition-all cursor-pointer shadow-xs"
                    title="Minimize Sidebar"
                    aria-label="Minimize sidebar"
                  >
                    <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity font-bold leading-none">
                      &times;
                    </span>
                  </button>

                  {/* Minimize dot (Yellow) */}
                  <button
                    type="button"
                    onClick={handleMinimize}
                    className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 flex items-center justify-center text-[8px] text-[#5c3e00] opacity-90 transition-all cursor-pointer shadow-xs"
                    title="Minimize Sidebar"
                    aria-label="Minimize sidebar"
                  >
                    <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity font-bold leading-none -translate-y-0.5">
                      &minus;
                    </span>
                  </button>

                  {/* Expand dot (Green) */}
                  <button
                    type="button"
                    onClick={handleExpand}
                    className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 flex items-center justify-center text-[7px] text-[#0a4812] opacity-90 transition-all cursor-pointer shadow-xs"
                    title="Expand Sidebar"
                    aria-label="Expand sidebar"
                  >
                    <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity font-bold leading-none">
                      +
                    </span>
                  </button>
                </div>

                {/* macOS Sidebar Split-View Toggle Button */}
                <button
                  type="button"
                  onClick={handleToggleCollapse}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Minimize Sidebar (⌘B)"
                  aria-label="Minimize sidebar"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="4" />
                    <path d="M9 3v18" />
                  </svg>
                </button>
              </div>
            ) : (
              /* Minimized Mode Header: Centered Expand Button */
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleExpand}
                  className="w-8 h-8 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent border border-accent/25 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  title="Expand Sidebar (⌘B)"
                  aria-label="Expand sidebar"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="4" />
                    <path d="M9 3v18" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* ── Main Navigation Scroll Area ── */}
          <div className="flex-1 overflow-y-auto mt-3 pr-0.5 space-y-4 scrollbar-thin">
            {categorizedNav.map((group) => (
              <div key={group.category} className="space-y-1">
                {/* Category Header (shown only when expanded) */}
                {!isCollapsed ? (
                  <div className="flex items-center justify-between px-2 mb-1">
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground/75 font-semibold">
                      {group.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-accent/40" />
                  </div>
                ) : (
                  <div className="w-full flex justify-center my-1">
                    <div className="w-4 border-b border-border/50 dark:border-white/[0.08]" />
                  </div>
                )}

                {/* Nav Items */}
                <nav className="space-y-0.5" aria-label={group.category}>
                  {group.links.map((item) => {
                    const isActive = activeSection === item.id
                    const IconComponent = item.icon

                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        className={`group relative flex items-center ${
                          isCollapsed
                            ? 'justify-center w-9 h-9 p-0 mx-auto'
                            : 'justify-between px-2.5 py-1.5'
                        } rounded-xl font-mono text-xs transition-colors duration-150 cursor-pointer ${
                          isActive
                            ? 'text-foreground font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 dark:hover:bg-white/[0.04]'
                        }`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        {/* Apple-grade Fluid Spring Active Pill in Website Theme Palette */}
                        {isActive && (
                          <motion.div
                            layoutId="activeSidebarPill"
                            className="absolute inset-0 rounded-xl bg-accent/12 dark:bg-accent/15 border border-accent/25 dark:border-accent/35 shadow-[0_2px_12px_rgba(245,158,11,0.08)] -z-10"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          />
                        )}

                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComponent
                            className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                              isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                            }`}
                          />
                          {!isCollapsed && (
                            <span className="truncate text-[12px]">{item.label}</span>
                          )}
                        </div>

                        {!isCollapsed && item.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-accent/15 border border-accent/30 text-accent font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    )
                  })}
                </nav>
              </div>
            ))}

            {/* ── yhelAI Copilot Module (Apple Intelligence Aesthetic) ── */}
            <div className="pt-2 border-t border-border/50 dark:border-white/[0.06]">
              {!isCollapsed ? (
                <div className="rounded-xl bg-accent/[0.03] dark:bg-accent/[0.04] border border-accent/25 dark:border-accent/25 p-2 transition-all">
                  {/* Expand / Collapse Header */}
                  <button
                    type="button"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="w-full flex items-center justify-between px-1.5 py-1 text-accent font-mono text-xs hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-accent">✦</span>
                      <span className="font-semibold text-[11px] tracking-wide">yhelAI Copilot</span>
                    </div>
                    {isChatOpen ? (
                      <FaChevronUp className="text-[10px] text-accent/80" />
                    ) : (
                      <FaChevronDown className="text-[10px] text-accent/80" />
                    )}
                  </button>

                  {/* Expandable In-Place Chat Box */}
                  <AnimatePresence>
                    {isChatOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden space-y-2 font-mono"
                      >
                        {/* Messages Container */}
                        <div className="space-y-1.5 overflow-y-auto max-h-40 text-[11px] pr-1 scrollbar-thin">
                          {messages.map((m, idx) => (
                            <div
                              key={idx}
                              className={`flex ${
                                m.role === 'assistant' ? 'justify-start' : 'justify-end'
                              }`}
                            >
                              <div
                                className={`p-2 rounded-xl leading-relaxed max-w-[88%] ${
                                  m.role === 'assistant'
                                    ? 'bg-background/90 dark:bg-[#111422]/90 text-foreground border border-border/70 dark:border-white/[0.08] shadow-2xs'
                                    : 'bg-accent text-white dark:bg-accent dark:text-zinc-950 font-medium'
                                }`}
                              >
                                <MarkdownContent content={m.content} isUser={m.role === 'user'} />
                              </div>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-background/80 dark:bg-card/80 text-muted-foreground text-[10.5px] border border-border/60">
                              <FaSpinner className="animate-spin text-accent text-[10px]" />
                              <span>Thinking...</span>
                            </div>
                          )}
                          <div ref={chatBottomRef} />
                        </div>

                        {/* Quick Chips */}
                        {messages.length <= 2 && (
                          <div className="space-y-1 pt-1 border-t border-border/40 dark:border-white/[0.06]">
                            {defaultPromptSuggestions.slice(0, 2).map((sug, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleSendMessage(sug)}
                                className="w-full text-left px-2 py-1 rounded-lg bg-background/70 dark:bg-card/70 border border-border/50 dark:border-white/[0.06] text-[10px] text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors truncate cursor-pointer"
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Chat Form */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            handleSendMessage()
                          }}
                          className="pt-1.5 border-t border-border/40 dark:border-white/[0.06] flex items-center gap-1.5 w-full min-w-0"
                        >
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask yhelAI..."
                            className="flex-1 min-w-0 px-2.5 py-1.5 rounded-lg bg-background/80 dark:bg-black/40 border border-border/70 dark:border-white/[0.08] text-foreground text-[11px] placeholder:text-muted-foreground/60 focus:outline-hidden focus:border-accent"
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
              ) : (
                /* Collapsed yhelAI Trigger Button */
                <button
                  type="button"
                  onClick={() => {
                    handleExpand()
                    setIsChatOpen(true)
                  }}
                  className="w-9 h-9 mx-auto flex items-center justify-center rounded-xl text-accent bg-accent/10 hover:bg-accent/20 border border-accent/25 transition-colors cursor-pointer"
                  title="Open yhelAI Copilot"
                  aria-label="Open yhelAI Copilot"
                >
                  <span className="text-sm">✦</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ── Bottom Controls: Segmented Theme & Apple Dock Socials ── */}
        <div className="pt-2.5 border-t border-border/60 dark:border-white/[0.06] space-y-2 shrink-0 relative z-10">
          
          {/* Social Links Dock */}
          {!isCollapsed ? (
            <div className="flex items-center justify-between px-1 text-muted-foreground">
              <motion.a
                whileHover={{ y: -2, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/hiroqt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/60 dark:hover:bg-white/[0.06] transition-colors"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <FaGithub className="text-sm" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/60 dark:hover:bg-white/[0.06] transition-colors"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:arnelbaylon15@gmail.com"
                className="p-1.5 rounded-lg hover:text-foreground hover:bg-muted/60 dark:hover:bg-white/[0.06] transition-colors"
                aria-label="Send Email"
                title="Email"
              >
                <FaEnvelope className="text-sm" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                href="/pdf/Arnel_Baylon_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="Download Official Résumé (PDF)"
                title="Download Résumé (PDF)"
              >
                <FaFilePdf className="text-sm text-accent" />
              </motion.a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 py-0.5 text-muted-foreground">
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                href="/pdf/Arnel_Baylon_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-accent hover:bg-accent/10 transition-colors"
                title="Download Résumé (PDF)"
              >
                <FaFilePdf className="text-xs" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/hiroqt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:text-foreground hover:bg-muted/40 transition-colors"
                title="GitHub Profile"
              >
                <FaGithub className="text-xs" />
              </motion.a>
            </div>
          )}

          {/* Apple-Style Segmented Theme Switcher */}
          {mounted && (
            <div>
              {!isCollapsed ? (
                <div className="relative flex items-center p-1 rounded-xl bg-muted/50 dark:bg-black/30 border border-border/60 dark:border-white/[0.06]">
                  {(['system', 'light', 'dark'] as const).map((mode) => {
                    const isSelected = theme === mode

                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setTheme(mode)}
                        className={`relative flex-1 py-1 flex items-center justify-center gap-1 rounded-lg text-[11px] font-mono capitalize transition-colors duration-150 cursor-pointer ${
                          isSelected
                            ? 'text-foreground font-semibold'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        aria-label={`Switch theme to ${mode}`}
                        title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeThemePill"
                            className="absolute inset-0 rounded-lg bg-background dark:bg-[#121626] shadow-xs border border-border/60 dark:border-white/10 -z-10"
                            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                          />
                        )}
                        {mode === 'system' && <FaDesktop className="w-2.5 h-2.5" />}
                        {mode === 'light' && <FaSun className="w-2.5 h-2.5" />}
                        {mode === 'dark' && <FaMoon className="w-2.5 h-2.5" />}
                        <span className="text-[10px]">{mode}</span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                /* Collapsed Single Cycle Theme Button */
                <button
                  type="button"
                  onClick={() => {
                    const nextMode = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
                    setTheme(nextMode)
                  }}
                  className="w-9 h-9 mx-auto flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                  title={`Theme: ${theme}. Click to switch`}
                  aria-label="Switch theme"
                >
                  {theme === 'dark' ? (
                    <FaMoon className="w-3.5 h-3.5 text-accent" />
                  ) : theme === 'light' ? (
                    <FaSun className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <FaDesktop className="w-3.5 h-3.5 text-accent" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* ── Apple iOS Dynamic Floating Bottom Dock (Mobile View — WCAG 2.1 Compliant) ── */}
      <nav
        aria-label="Mobile Navigation"
        role="navigation"
        className="lg:hidden fixed bottom-4 inset-x-3 sm:inset-x-4 max-w-lg mx-auto z-30 flex items-center justify-between px-2.5 py-2 rounded-[30px] min-h-[66px] bg-white/95 dark:bg-[#0d101d]/95 backdrop-blur-2xl backdrop-saturate-180 border border-border/90 dark:border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.18),0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.25)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.75),0_4px_18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        {/* Tab 1: Work (Featured Systems) — 50px min touch target */}
        {(() => {
          const isWorkActive = activeSection === 'projects' && !mobileHubOpen && !mobileCopilotOpen
          return (
            <a
              href="#projects"
              onClick={() => {
                setMobileHubOpen(false)
                setMobileCopilotOpen(false)
              }}
              aria-current={isWorkActive ? 'page' : undefined}
              aria-label="Work section, featured systems"
              className="relative flex-1 min-h-[50px] min-w-[48px] py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer select-none group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isWorkActive && (
                <motion.div
                  layoutId="activeMobileBottomDockPill"
                  className="absolute inset-1 rounded-[22px] bg-accent/15 dark:bg-accent/25 border-2 border-accent/40 dark:border-accent/50 -z-10 shadow-xs"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.05 }
                      : { type: 'spring', stiffness: 440, damping: 30 }
                  }
                />
              )}
              <FaTerminal
                className={`w-5 h-5 transition-transform duration-200 group-active:scale-90 ${
                  isWorkActive
                    ? 'text-amber-600 dark:text-amber-400 scale-110'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[11px] sm:text-xs font-mono font-medium tracking-tight mt-1 transition-colors ${
                  isWorkActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
              >
                Work
              </span>
            </a>
          )
        })()}

        {/* Tab 2: Experience — 50px min touch target */}
        {(() => {
          const isExpActive = activeSection === 'experience' && !mobileHubOpen && !mobileCopilotOpen
          return (
            <a
              href="#experience"
              onClick={() => {
                setMobileHubOpen(false)
                setMobileCopilotOpen(false)
              }}
              aria-current={isExpActive ? 'page' : undefined}
              aria-label="Experience section, career track record"
              className="relative flex-1 min-h-[50px] min-w-[48px] py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer select-none group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isExpActive && (
                <motion.div
                  layoutId="activeMobileBottomDockPill"
                  className="absolute inset-1 rounded-[22px] bg-accent/15 dark:bg-accent/25 border-2 border-accent/40 dark:border-accent/50 -z-10 shadow-xs"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.05 }
                      : { type: 'spring', stiffness: 440, damping: 30 }
                  }
                />
              )}
              <FaBriefcase
                className={`w-5 h-5 transition-transform duration-200 group-active:scale-90 ${
                  isExpActive
                    ? 'text-amber-600 dark:text-amber-400 scale-110'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[11px] sm:text-xs font-mono font-medium tracking-tight mt-1 transition-colors ${
                  isExpActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
              >
                Exp
              </span>
            </a>
          )
        })()}

        {/* Tab 3: Skills — 50px min touch target */}
        {(() => {
          const isSkillsActive = activeSection === 'skills' && !mobileHubOpen && !mobileCopilotOpen
          return (
            <a
              href="#skills"
              onClick={() => {
                setMobileHubOpen(false)
                setMobileCopilotOpen(false)
              }}
              aria-current={isSkillsActive ? 'page' : undefined}
              aria-label="Skills section, technical arsenal"
              className="relative flex-1 min-h-[50px] min-w-[48px] py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer select-none group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isSkillsActive && (
                <motion.div
                  layoutId="activeMobileBottomDockPill"
                  className="absolute inset-1 rounded-[22px] bg-accent/15 dark:bg-accent/25 border-2 border-accent/40 dark:border-accent/50 -z-10 shadow-xs"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.05 }
                      : { type: 'spring', stiffness: 440, damping: 30 }
                  }
                />
              )}
              <FaCode
                className={`w-5 h-5 transition-transform duration-200 group-active:scale-90 ${
                  isSkillsActive
                    ? 'text-amber-600 dark:text-amber-400 scale-110'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[11px] sm:text-xs font-mono font-medium tracking-tight mt-1 transition-colors ${
                  isSkillsActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
              >
                Skills
              </span>
            </a>
          )
        })()}

        {/* Tab 4: Copilot (✦ yhelAI) — 50px min touch target */}
        {(() => {
          const isCopilotActive = mobileCopilotOpen
          return (
            <button
              type="button"
              onClick={() => {
                setMobileHubOpen(false)
                setMobileCopilotOpen(!mobileCopilotOpen)
              }}
              aria-haspopup="dialog"
              aria-expanded={mobileCopilotOpen}
              aria-controls="mobile-copilot-modal"
              aria-label="Open yhelAI Copilot chat assistant modal"
              className="relative flex-1 min-h-[50px] min-w-[48px] py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer select-none group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isCopilotActive && (
                <motion.div
                  layoutId="activeMobileBottomDockPill"
                  className="absolute inset-1 rounded-[22px] bg-accent/15 dark:bg-accent/25 border-2 border-accent/40 dark:border-accent/50 -z-10 shadow-xs"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.05 }
                      : { type: 'spring', stiffness: 440, damping: 30 }
                  }
                />
              )}
              <span className="relative flex items-center justify-center w-5 h-5">
                <span
                  className={`text-base font-bold transition-transform duration-200 group-active:scale-90 ${
                    isCopilotActive
                      ? 'text-amber-600 dark:text-amber-400 scale-125 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                      : 'text-amber-600/90 dark:text-amber-400/90 group-hover:text-foreground'
                  }`}
                  aria-hidden="true"
                >
                  ✦
                </span>
                {!isCopilotActive && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent dark:bg-amber-400 ring-2 ring-background animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </span>
              <span
                className={`text-[11px] sm:text-xs font-mono font-medium tracking-tight mt-1 transition-colors ${
                  isCopilotActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
              >
                Copilot
              </span>
            </button>
          )
        })()}

        {/* Tab 5: Hub (Control Center / More) — 50px min touch target */}
        {(() => {
          const isHubSectionActive = ['certifications', 'education', 'gallery', 'contact'].includes(activeSection)
          const isHubActive = mobileHubOpen || (isHubSectionActive && !mobileCopilotOpen)
          return (
            <button
              type="button"
              onClick={() => {
                setMobileCopilotOpen(false)
                setMobileHubOpen(!mobileHubOpen)
              }}
              aria-haspopup="dialog"
              aria-expanded={mobileHubOpen}
              aria-controls="mobile-hub-modal"
              aria-label="Open Command Hub and navigation menu"
              className="relative flex-1 min-h-[50px] min-w-[48px] py-1.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer select-none group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isHubActive && (
                <motion.div
                  layoutId="activeMobileBottomDockPill"
                  className="absolute inset-1 rounded-[22px] bg-accent/15 dark:bg-accent/25 border-2 border-accent/40 dark:border-accent/50 -z-10 shadow-xs"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.05 }
                      : { type: 'spring', stiffness: 440, damping: 30 }
                  }
                />
              )}
              <span className="relative flex items-center justify-center w-5 h-5">
                <svg
                  className={`w-5 h-5 transition-transform duration-200 group-active:scale-90 ${
                    isHubActive
                      ? 'text-amber-600 dark:text-amber-400 scale-110'
                      : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1.5" />
                  <rect width="7" height="7" x="14" y="3" rx="1.5" />
                  <rect width="7" height="7" x="14" y="14" rx="1.5" />
                  <rect width="7" height="7" x="3" y="14" rx="1.5" />
                </svg>
                {isHubSectionActive && !mobileHubOpen && !mobileCopilotOpen && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent dark:bg-amber-400 ring-2 ring-background"
                    aria-hidden="true"
                  />
                )}
              </span>
              <span
                className={`text-[11px] sm:text-xs font-mono font-medium tracking-tight mt-1 transition-colors ${
                  isHubActive
                    ? 'text-amber-600 dark:text-amber-400 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 group-hover:text-foreground'
                }`}
              >
                Hub
              </span>
            </button>
          )
        })()}
      </nav>

      {/* ── Apple iOS Command Hub Bottom Sheet Modal (WCAG 2.1 Dialog) ── */}
      <AnimatePresence>
        {mobileHubOpen && (
          <>
            {/* Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileHubOpen(false)}
              className="fixed inset-0 z-40 bg-black/65 dark:bg-black/80 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-Up Sheet */}
            <motion.div
              id="mobile-hub-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hub-modal-title"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.05 }
                  : { type: 'spring', damping: 32, stiffness: 360 }
              }
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] rounded-t-[32px] bg-white dark:bg-[#0d101d] text-foreground border-t border-x border-border dark:border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.85)] p-4 sm:p-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] overflow-y-auto font-mono space-y-4 lg:hidden"
            >
              {/* iOS Grab Handle */}
              <div
                className="w-12 h-1.5 rounded-full bg-muted-foreground/40 mx-auto -mt-1 mb-2 cursor-pointer hover:bg-muted-foreground/60 transition-colors"
                onClick={() => setMobileHubOpen(false)}
                aria-hidden="true"
              />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent dark:bg-amber-400 animate-pulse" aria-hidden="true" />
                  <div>
                    <h2 id="hub-modal-title" className="text-xs uppercase tracking-wider font-bold text-foreground">
                      Command Hub
                    </h2>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">Arnel Baylon &bull; Navigation & Controls</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileHubOpen(false)}
                  className="min-h-[44px] min-w-[44px] w-10 h-10 rounded-full bg-muted/80 hover:bg-muted dark:bg-white/[0.1] dark:hover:bg-white/[0.18] text-foreground flex items-center justify-center transition-colors cursor-pointer text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close Command Hub"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </div>

              {/* Categorized Links (Technical Proof & Connect) */}
              <div className="space-y-3.5">
                {categorizedNav
                  .filter((group) => group.category !== 'Systems & Work')
                  .map((group) => (
                    <div key={group.category} className="space-y-1.5">
                      <div className="flex items-center justify-between px-1 mb-1">
                        <span className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-bold">
                          {group.category}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" aria-hidden="true" />
                      </div>
                      <div className="space-y-1.5">
                        {group.links.map((item) => {
                          const isActive = activeSection === item.id
                          const IconComponent = item.icon

                          return (
                            <a
                              key={item.id}
                              href={item.href}
                              onClick={() => setMobileHubOpen(false)}
                              aria-current={isActive ? 'page' : undefined}
                              className={`flex items-center justify-between min-h-[48px] px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                                isActive
                                  ? 'bg-accent/15 text-accent font-bold border border-accent/40 shadow-2xs'
                                  : 'text-foreground bg-muted/40 dark:bg-white/[0.04] hover:bg-muted/70 dark:hover:bg-white/[0.08] border border-border/60 dark:border-white/[0.08]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent
                                  className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-zinc-600 dark:text-zinc-400'}`}
                                  aria-hidden="true"
                                />
                                <span>{item.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-accent/15 border border-accent/30 text-accent font-bold">
                                    {item.badge}
                                  </span>
                                )}
                                <FaChevronRight className="w-3 h-3 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                              </div>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Quick Action: Apple Wallet Style Résumé Card — 52px min touch target */}
              <div className="pt-2">
                <a
                  href="/pdf/Arnel_Baylon_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download or view official ATS résumé PDF"
                  className="flex items-center justify-between min-h-[52px] p-3.5 rounded-2xl bg-accent/10 hover:bg-accent/15 border border-accent/35 text-accent transition-all group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent">
                      <FaFilePdf className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                        Official Résumé
                      </div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        ATS-Optimized PDF &bull; Download / View
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-accent text-white dark:text-zinc-950 font-bold shadow-xs">
                    OPEN
                  </span>
                </a>
              </div>

              {/* Apple Segmented Theme Switcher — 44px min touch target */}
              {mounted && (
                <div className="pt-2 border-t border-border/60 dark:border-white/[0.08] space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-bold px-1">
                    Appearance
                  </span>
                  <div
                    role="radiogroup"
                    aria-label="Appearance theme switcher"
                    className="relative flex items-center p-1 rounded-xl bg-muted/70 dark:bg-black/40 border border-border/70 dark:border-white/[0.1]"
                  >
                    {(['system', 'light', 'dark'] as const).map((mode) => {
                      const isSelected = theme === mode
                      return (
                        <button
                          key={mode}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setTheme(mode)}
                          className={`relative flex-1 min-h-[44px] py-2 flex items-center justify-center gap-1.5 rounded-lg text-xs font-mono capitalize transition-colors duration-150 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent ${
                            isSelected ? 'text-foreground font-bold' : 'text-zinc-600 dark:text-zinc-400 hover:text-foreground'
                          }`}
                          aria-label={`Switch theme to ${mode} mode`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeMobileThemePill"
                              className="absolute inset-0 rounded-lg bg-background dark:bg-[#121626] shadow-xs border border-border/60 dark:border-white/10 -z-10"
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0.05 }
                                  : { type: 'spring', stiffness: 450, damping: 32 }
                              }
                            />
                          )}
                          {mode === 'system' && <FaDesktop className="w-3 h-3" aria-hidden="true" />}
                          {mode === 'light' && <FaSun className="w-3 h-3" aria-hidden="true" />}
                          {mode === 'dark' && <FaMoon className="w-3 h-3" aria-hidden="true" />}
                          <span className="text-[11px]">{mode}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Social Dock — 44px min touch target */}
              <div className="pt-2 border-t border-border/60 dark:border-white/[0.08] flex items-center justify-between px-2 text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://github.com/hiroqt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-muted/60 dark:bg-white/[0.05] border border-border/60 dark:border-white/[0.08] text-foreground hover:text-accent transition-colors flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="GitHub Profile (opens in new tab)"
                  >
                    <FaGithub className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-muted/60 dark:bg-white/[0.05] border border-border/60 dark:border-white/[0.08] text-foreground hover:text-accent transition-colors flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="LinkedIn Profile (opens in new tab)"
                  >
                    <FaLinkedin className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="mailto:arnelbaylon15@gmail.com"
                    className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-muted/60 dark:bg-white/[0.05] border border-border/60 dark:border-white/[0.08] text-foreground hover:text-accent transition-colors flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="Send email to arnelbaylon15@gmail.com"
                  >
                    <FaEnvelope className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                  ARNEL BAYLON &bull; 2026
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Apple Intelligence yhelAI Copilot Bottom Sheet Modal (WCAG 2.1 Dialog) ── */}
      <AnimatePresence>
        {mobileCopilotOpen && (
          <>
            {/* Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileCopilotOpen(false)}
              className="fixed inset-0 z-40 bg-black/65 dark:bg-black/80 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-Up Sheet */}
            <motion.div
              id="mobile-copilot-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="copilot-modal-title"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.05 }
                  : { type: 'spring', damping: 32, stiffness: 360 }
              }
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] rounded-t-[32px] bg-white dark:bg-[#0d101d] text-foreground border-t border-x border-border dark:border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.25)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.85)] p-4 sm:p-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] overflow-hidden font-mono flex flex-col lg:hidden"
            >
              {/* Apple Intelligence Aura Glow Bar */}
              <div
                className="w-16 h-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 mx-auto -mt-1 mb-3 animate-pulse cursor-pointer"
                onClick={() => setMobileCopilotOpen(false)}
                aria-hidden="true"
              />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60 dark:border-white/[0.08] shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-base text-accent" aria-hidden="true">✦</span>
                  <div>
                    <h2 id="copilot-modal-title" className="text-xs font-bold text-accent tracking-wide">
                      yhelAI Copilot
                    </h2>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">Autonomous Engineering Swarm Assistant</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileCopilotOpen(false)}
                  className="min-h-[44px] min-w-[44px] w-10 h-10 rounded-full bg-muted/80 hover:bg-muted dark:bg-white/[0.1] dark:hover:bg-white/[0.18] text-foreground flex items-center justify-center transition-colors cursor-pointer text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close yhelAI Copilot"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </div>

              {/* Messages Container */}
              <div
                className="space-y-2.5 overflow-y-auto max-h-[42vh] py-3 pr-1 text-xs scrollbar-thin flex-1 min-h-[140px]"
                aria-live="polite"
              >
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[88%] ${
                        m.role === 'assistant'
                          ? 'bg-muted/90 dark:bg-white/[0.06] text-foreground border border-border/70 dark:border-white/[0.1] shadow-2xs'
                          : 'bg-accent text-white dark:text-zinc-950 font-semibold shadow-xs'
                      }`}
                    >
                      <MarkdownContent content={m.content} isUser={m.role === 'user'} />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-muted/70 dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 text-xs border border-border/60 w-fit">
                    <FaSpinner className="animate-spin text-accent text-xs" aria-hidden="true" />
                    <span>Analyzing engineering context...</span>
                  </div>
                )}
                <div ref={mobileChatBottomRef} />
              </div>

              {/* Quick Prompt Chips — 40px min touch target */}
              {messages.length <= 2 && (
                <div className="space-y-1.5 pt-2.5 border-t border-border/40 dark:border-white/[0.06] shrink-0">
                  <div className="text-[10.5px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-bold px-1">
                    Suggested queries
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {defaultPromptSuggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(sug)}
                        className="text-left min-h-[40px] px-3 py-1.5 rounded-xl bg-muted/60 dark:bg-white/[0.05] border border-border/70 dark:border-white/[0.1] text-xs font-medium text-foreground hover:border-accent/60 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Form — 44px min touch target */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="pt-3 border-t border-border/40 dark:border-white/[0.06] flex items-center gap-2 shrink-0"
              >
                <label htmlFor="mobile-copilot-input" className="sr-only">
                  Ask yhelAI Copilot about engineering architectures, systems, or tech stack
                </label>
                <input
                  id="mobile-copilot-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask yhelAI about systems, tech stack..."
                  className="flex-1 min-w-0 min-h-[44px] px-3.5 py-2.5 rounded-xl bg-muted/80 dark:bg-black/50 border border-border/80 dark:border-white/[0.12] text-foreground text-xs placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 min-h-[44px] min-w-[44px] w-11 h-11 flex items-center justify-center rounded-xl bg-accent text-white dark:text-zinc-950 hover:bg-accent/90 disabled:opacity-40 transition-opacity cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Send message to yhelAI Copilot"
                >
                  <FaPaperPlane className="text-xs" aria-hidden="true" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
