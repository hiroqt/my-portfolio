'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  FaTerminal,
  FaBriefcase,
  FaCode,
  FaCertificate,
  FaGraduationCap,
  FaImages,
} from 'react-icons/fa'
import { useTheme } from '../ThemeProvider'

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
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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
                                <p className="whitespace-pre-wrap text-[10.5px]">{m.content}</p>
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

      {/* ── Mobile Floating Glass Dynamic Bar ── */}
      <header className="lg:hidden fixed top-3 left-3 right-3 z-50 flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-background/85 dark:bg-[#080a12]/85 backdrop-blur-2xl border border-border/80 dark:border-white/[0.08] shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs tracking-wider uppercase font-semibold text-foreground">
            Navigation
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/pdf/Arnel_Baylon_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl bg-accent/10 border border-accent/25 text-accent text-xs"
            aria-label="Download Résumé"
            title="Download Résumé"
          >
            <FaFilePdf />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-xl bg-foreground text-background text-xs cursor-pointer hover:opacity-90 transition-opacity"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer (Apple Frosted Glass Sheet) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="lg:hidden fixed inset-x-3 top-16 z-50 p-4 rounded-2xl bg-background/95 dark:bg-[#080a12]/95 backdrop-blur-2xl border border-border/80 dark:border-white/[0.1] shadow-2xl space-y-4 max-h-[82vh] overflow-y-auto font-mono"
          >
            {/* Categorized Nav in Mobile Drawer */}
            {categorizedNav.map((group) => (
              <div key={group.category} className="space-y-1">
                <div className="flex items-center gap-2 px-1 mb-1">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    {group.category}
                  </span>
                </div>
                <nav className="space-y-0.5">
                  {group.links.map((item) => {
                    const isActive = activeSection === item.id
                    const IconComponent = item.icon

                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                          isActive
                            ? 'bg-accent/15 text-accent font-semibold border border-accent/25'
                            : 'text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent className={isActive ? 'text-accent' : 'text-muted-foreground'} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-accent/15 border border-accent/30 text-accent font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    )
                  })}
                </nav>
              </div>
            ))}

            {/* Mobile yhelAI Chat */}
            <div className="pt-3 border-t border-border/60 dark:border-white/[0.06] space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-accent font-semibold">
                <div className="flex items-center gap-1.5">
                  <span>✦</span>
                  <span>yhelAI Copilot</span>
                </div>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-xl text-[10.5px] max-w-[85%] ${
                        m.role === 'assistant'
                          ? 'bg-muted/80 text-foreground border border-border/60'
                          : 'bg-accent text-white dark:text-zinc-950 font-medium'
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
                className="flex items-center gap-1.5 w-full min-w-0"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask yhelAI..."
                  className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-foreground focus:outline-hidden"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-accent text-white dark:text-zinc-950 cursor-pointer"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </div>

            {/* Mobile Footer & Theme */}
            <div className="pt-3 border-t border-border/60 dark:border-white/[0.06] space-y-3">
              {mounted && (
                <div className="flex items-center justify-between p-1 rounded-xl bg-muted/60 dark:bg-black/30 border border-border/60">
                  {(['system', 'light', 'dark'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setTheme(mode)}
                      className={`flex-1 py-1 flex items-center justify-center gap-1 rounded-lg text-xs capitalize ${
                        theme === mode
                          ? 'bg-background text-foreground font-semibold shadow-2xs'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {mode === 'system' && <FaDesktop className="w-2.5 h-2.5" />}
                      {mode === 'light' && <FaSun className="w-2.5 h-2.5" />}
                      {mode === 'dark' && <FaMoon className="w-2.5 h-2.5" />}
                      <span>{mode}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-muted-foreground pt-1">
                <div className="flex items-center gap-3 text-sm">
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
                <span className="text-[10px] text-muted-foreground">
                  PORTFOLIO &bull; 2026
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
