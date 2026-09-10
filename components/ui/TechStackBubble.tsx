'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaLayerGroup,
  FaTimes,
  FaCode,
  FaRobot,
  FaServer,
  FaCloud,
  FaCheck,
  FaCopy,
  FaAws,
} from 'react-icons/fa'

import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiFlutter,
  SiDart,
  SiVuedotjs,
  SiTailwindcss,
  SiFramer,
  SiVite,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiLaravel,
  SiPhp,
  SiFastapi,
  SiPython,
  SiNestjs,
  SiExpress,
  SiMysql,
  SiFirebase,
  SiGraphql,
  SiJsonwebtokens,
  SiZod,
  SiDocker,
  SiTerraform,
  SiVercel,
  SiCloudflare,
  SiGit,
  SiGithubactions,
  SiGrafana,
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiOllama,
} from 'react-icons/si'

// ── Custom Dedicated SVG Logos for AI & Specialized Systems ──
function DeepSeekLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 3.84 2.16 7.18 5.34 8.86-.06-.5-.09-1.02-.09-1.55 0-3.32 1.63-6.26 4.14-8.03C10.5 10.47 10 9.3 10 8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.3-.5 2.47-1.39 3.28 2.51 1.77 4.14 4.71 4.14 8.03 0 .53-.03 1.05-.09 1.55C20.84 19.18 23 15.84 23 12c0-5.52-4.48-10-10-10zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  )
}


function QwenLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  )
}

function DagLoopLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5L15.5 7.5" />
      <path d="M7.5 8.5L10.5 15.5" />
      <path d="M16.5 8.5L13.5 15.5" />
    </svg>
  )
}

function GroqLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
    </svg>
  )
}

function RagLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <circle cx="12" cy="10" r="2.5" />
      <line x1="14" y1="12" x2="16.5" y2="14.5" />
    </svg>
  )
}

function VectorDbLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function SparklePromptLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
    </svg>
  )
}

function ApiStreamLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  )
}

function AwsS3Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L18.8 8 12 11.8 5.2 8 12 4.2zM5 9.8l6 3.3v6.7l-6-3.3V9.8zm8 10v-6.7l6-3.3v6.7l-6 3.3z" />
    </svg>
  )
}

function AwsFlowLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
    </svg>
  )
}

export interface StackCategory {
  id: string
  title: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  badgeBg: string
  skills: {
    name: string
    level?: 'Core' | 'Advanced' | 'Expert'
    highlight?: boolean
    icon: React.ComponentType<{ className?: string }>
    iconColor: string
  }[]
}

export const techStackCategories: StackCategory[] = [
  {
    id: 'ai-context',
    title: 'Frontier AI & Agentic Loops',
    shortLabel: 'AI & LLM',
    icon: FaRobot,
    color: 'text-amber-500 dark:text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    skills: [
      { name: 'Claude', highlight: true, level: 'Expert', icon: SiAnthropic, iconColor: 'text-[#D97706]' },
      { name: 'Gemini', highlight: true, level: 'Expert', icon: SiGooglegemini, iconColor: 'text-[#4285F4]' },
      { name: 'OpenAI', highlight: true, level: 'Expert', icon: SiOpenai, iconColor: 'text-[#10A37F]' },
      { name: 'DeepSeek', level: 'Advanced', icon: DeepSeekLogo, iconColor: 'text-[#0066FF]' },
      { name: 'Qwen', level: 'Advanced', icon: QwenLogo, iconColor: 'text-[#6246EA]' },
      { name: 'Ollama', level: 'Advanced', icon: SiOllama, iconColor: 'text-foreground' },
      { name: 'Agentic DAG Loops', highlight: true, level: 'Expert', icon: DagLoopLogo, iconColor: 'text-[#F59E0B]' },
      { name: 'LLM Orchestration & Groq SDK', highlight: true, level: 'Expert', icon: GroqLogo, iconColor: 'text-[#F97316]' },
      { name: 'RAG Architectures (Semantic + BM25)', highlight: true, level: 'Expert', icon: RagLogo, iconColor: 'text-[#10B981]' },
      { name: 'Vector Search & pgvector', level: 'Advanced', icon: VectorDbLogo, iconColor: 'text-[#336791]' },
      { name: 'Prompt Engineering & Grounding', level: 'Expert', icon: SparklePromptLogo, iconColor: 'text-[#EC4899]' },
    ],
  },
  {
    id: 'frontend-mobile',
    title: 'Frontend & Mobile Engineering',
    shortLabel: 'Frontend / Mobile',
    icon: FaCode,
    color: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/25',
    skills: [
      { name: 'TypeScript', highlight: true, level: 'Expert', icon: SiTypescript, iconColor: 'text-[#3178C6]' },
      { name: 'Next.js 15 (App Router / SSR)', highlight: true, level: 'Expert', icon: SiNextdotjs, iconColor: 'text-foreground' },
      { name: 'React 18 / 19', highlight: true, level: 'Expert', icon: SiReact, iconColor: 'text-[#61DAFB]' },
      { name: 'Flutter', highlight: true, level: 'Advanced', icon: SiFlutter, iconColor: 'text-[#02569B]' },
      { name: 'Dart', highlight: true, level: 'Advanced', icon: SiDart, iconColor: 'text-[#0175C2]' },
      { name: 'Vue.js 3 (Composition API)', level: 'Advanced', icon: SiVuedotjs, iconColor: 'text-[#4FC08D]' },
      { name: 'Tailwind CSS v3 / v4', highlight: true, level: 'Expert', icon: SiTailwindcss, iconColor: 'text-[#06B6D4]' },
      { name: 'Framer Motion & Micro-interactions', level: 'Expert', icon: SiFramer, iconColor: 'text-[#0055FF]' },
      { name: 'Vite', level: 'Advanced', icon: SiVite, iconColor: 'text-[#646CFF]' },
      { name: 'HTML5 / Semantic & WCAG AA', level: 'Expert', icon: SiHtml5, iconColor: 'text-[#E34F26]' },
      { name: 'CSS3 & Fluid Layouts', level: 'Expert', icon: SiCss, iconColor: 'text-[#1572B6]' },
    ],
  },
  {
    id: 'backend-database',
    title: 'Backend & Database Architecture',
    shortLabel: 'Backend / DB',
    icon: FaServer,
    color: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    skills: [
      { name: 'Node.js', highlight: true, level: 'Expert', icon: SiNodedotjs, iconColor: 'text-[#5FA04E]' },
      { name: 'PostgreSQL', highlight: true, level: 'Expert', icon: SiPostgresql, iconColor: 'text-[#4169E1]' },
      { name: 'Supabase (Auth, RLS, Realtime)', highlight: true, level: 'Expert', icon: SiSupabase, iconColor: 'text-[#3ECF8E]' },
      { name: 'Laravel & Livewire', level: 'Advanced', icon: SiLaravel, iconColor: 'text-[#FF2D20]' },
      { name: 'PHP', level: 'Advanced', icon: SiPhp, iconColor: 'text-[#777BB4]' },
      { name: 'FastAPI & Python', level: 'Advanced', icon: SiFastapi, iconColor: 'text-[#009688]' },
      { name: 'NestJS', level: 'Advanced', icon: SiNestjs, iconColor: 'text-[#E0234E]' },
      { name: 'Express.js', level: 'Expert', icon: SiExpress, iconColor: 'text-foreground' },
      { name: 'MySQL', level: 'Advanced', icon: SiMysql, iconColor: 'text-[#4479A1]' },
      { name: 'Firebase / Firestore', level: 'Advanced', icon: SiFirebase, iconColor: 'text-[#FFCA28]' },
      { name: 'RESTful APIs & SSE Streaming', highlight: true, level: 'Expert', icon: ApiStreamLogo, iconColor: 'text-[#10B981]' },
      { name: 'JWT & OAuth 2.0 Auth', level: 'Advanced', icon: SiJsonwebtokens, iconColor: 'text-[#D63AFF]' },
      { name: 'GraphQL & Zod Validation', level: 'Advanced', icon: SiGraphql, iconColor: 'text-[#E10098]' },
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud, DevOps & Observability',
    shortLabel: 'Cloud / DevOps',
    icon: FaCloud,
    color: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
    skills: [
      { name: 'AWS Cloud Infrastructure', highlight: true, level: 'Advanced', icon: FaAws, iconColor: 'text-[#FF9900]' },
      { name: 'Amazon S3 & Bedrock', level: 'Advanced', icon: AwsS3Logo, iconColor: 'text-[#569A31]' },
      { name: 'Amazon Quick Spaces & Flows', highlight: true, level: 'Expert', icon: AwsFlowLogo, iconColor: 'text-[#FF9900]' },
      { name: 'Docker & Containerization', level: 'Advanced', icon: SiDocker, iconColor: 'text-[#2496ED]' },
      { name: 'Terraform (IaC)', level: 'Core', icon: SiTerraform, iconColor: 'text-[#7B42BC]' },
      { name: 'Vercel Edge Deployments', highlight: true, level: 'Expert', icon: SiVercel, iconColor: 'text-foreground' },
      { name: 'Cloudflare', level: 'Advanced', icon: SiCloudflare, iconColor: 'text-[#F38020]' },
      { name: 'Git & GitHub Actions CI/CD', highlight: true, level: 'Expert', icon: SiGithubactions, iconColor: 'text-[#2088FF]' },
      { name: 'Grafana & Telemetry', level: 'Core', icon: SiGrafana, iconColor: 'text-[#F46800]' },
    ],
  },
]

interface TechStackBubbleProps {
  isOpen: boolean
  onClose: () => void
  onAskAI?: (skillName: string) => void
}

export function TechStackBubble({ isOpen, onClose }: TechStackBubbleProps) {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null)

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

  const handleCopySkill = (e: React.MouseEvent, skillName: string) => {
    e.stopPropagation()
    navigator.clipboard.writeText(skillName)
    setCopiedSkill(skillName)
    setTimeout(() => setCopiedSkill(null), 1500)
  }

  const totalSkillsCount = techStackCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop Overlay ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 lg:bg-black/30 backdrop-blur-xs"
          />

          {/* ── Desktop Right-Side Drawer Container ── */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="hidden lg:flex fixed right-0 top-0 bottom-0 z-50 w-[380px] xl:w-[420px] 2xl:w-[460px] h-screen flex-col bg-background/95 dark:bg-[#0c0e18]/95 backdrop-blur-2xl border-l border-border/80 dark:border-white/12 shadow-[-10px_0_40px_rgba(0,0,0,0.35)] dark:shadow-[-16px_0_60px_rgba(0,0,0,0.85)] overflow-hidden font-sans select-none"
          >
            {/* ── Header ── */}
            <div className="relative z-10 px-5 pt-5 pb-4 border-b border-border dark:border-white/10 bg-muted/80 dark:bg-[#121624]/80 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-accent/15 dark:bg-accent/25 border border-accent/40 flex items-center justify-center text-accent shadow-xs">
                    <FaLayerGroup className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold tracking-tight text-foreground">
                        Tech Stack &amp; Arsenal
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-accent/15 text-accent border border-accent/30 font-semibold">
                        {totalSkillsCount} Tools
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground leading-none mt-1">
                      Languages, Frameworks &amp; AI Systems
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  title="Close tech stack drawer (Esc)"
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 dark:hover:bg-white/[0.08] transition-colors active:scale-90 cursor-pointer"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Scrollable Skills Content Area ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {techStackCategories.map((group) => {
                const Icon = group.icon
                return (
                  <div
                    key={group.id}
                    className="p-3.5 rounded-xl border border-border/70 dark:border-white/[0.08] bg-muted/20 dark:bg-card/40 space-y-2.5"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-border/40 dark:border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${group.color}`} />
                        <h4 className="font-serif font-bold text-xs text-foreground">
                          {group.title}
                        </h4>
                      </div>
                      <span className="font-mono text-[9.5px] text-muted-foreground">
                        {group.skills.length} items
                      </span>
                    </div>

                    {/* Badges Grid */}
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => {
                        const isCopied = copiedSkill === skill.name
                        const SkillIcon = skill.icon

                        return (
                          <div
                            key={skill.name}
                            onClick={(e) => handleCopySkill(e, skill.name)}
                            title="Click to copy technology name"
                            className={`group/tag relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors duration-150 active:scale-95 cursor-pointer shadow-2xs ${
                              skill.highlight
                                ? 'bg-accent/[0.08] border-accent/30 text-foreground hover:border-accent hover:bg-accent/15'
                                : 'bg-background dark:bg-muted/40 border-border/80 text-foreground/90 hover:border-accent/40 hover:text-foreground'
                            }`}
                          >
                            {SkillIcon && (
                              <SkillIcon className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover/tag:scale-110 ${skill.iconColor || 'text-foreground'}`} />
                            )}
                            <span className="truncate">{skill.name}</span>

                            {skill.level && (
                              <span className="text-[8.5px] uppercase opacity-50 font-semibold ml-0.5">
                                {skill.level === 'Expert' ? '★' : ''}
                              </span>
                            )}

                            {/* Copy feedback */}
                            <span className="text-[9px] text-accent opacity-0 group-hover/tag:opacity-100 transition-opacity shrink-0 ml-0.5">
                              {isCopied ? (
                                <FaCheck className="text-emerald-500 w-2.5 h-2.5" />
                              ) : (
                                <FaCopy className="w-2.5 h-2.5" />
                              )}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Footer ── */}
            <div className="px-4 py-2.5 border-t border-border dark:border-white/10 bg-muted/70 dark:bg-[#121624] flex items-center justify-between shrink-0">
              <span className="text-[10px] font-mono text-muted-foreground">
                Click any stack tag to copy
              </span>
              <span className="text-[10px] font-mono text-accent font-medium">
                ★ Core Competency
              </span>
            </div>
          </motion.div>

          {/* ── Mobile Bottom Sheet (lg:hidden) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="lg:hidden fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-50 max-w-md mx-auto max-h-[76vh] h-[520px] flex flex-col rounded-2xl bg-background dark:bg-[#0c0e18] border border-border dark:border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden font-sans select-none"
          >
            {/* Mobile Header */}
            <div className="px-4 py-3 border-b border-border dark:border-white/10 bg-muted/90 dark:bg-[#121624] shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-accent w-3.5 h-3.5" />
                  <span className="font-mono text-xs font-bold text-foreground">
                    Tech Stack &amp; Arsenal
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-accent/15 text-accent border border-accent/30 font-semibold">
                    {totalSkillsCount}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 text-muted-foreground hover:text-foreground active:scale-90 transition-transform cursor-pointer"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Skills List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
              {techStackCategories.map((group) => {
                const Icon = group.icon
                return (
                  <div
                    key={group.id}
                    className="p-3 rounded-xl border border-border/70 dark:border-white/10 bg-muted/30 dark:bg-card/40 space-y-2"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-border/40">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${group.color}`} />
                        <h4 className="font-serif font-bold text-xs text-foreground">
                          {group.title}
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] text-muted-foreground">
                        {group.skills.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => {
                        const SkillIcon = skill.icon
                        return (
                          <span
                            key={skill.name}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-mono ${
                              skill.highlight
                                ? 'bg-accent/10 border-accent/30 text-foreground font-medium'
                                : 'bg-background dark:bg-muted/40 border-border text-foreground/90'
                            }`}
                          >
                            {SkillIcon && (
                              <SkillIcon className={`w-3 h-3 shrink-0 ${skill.iconColor || 'text-foreground'}`} />
                            )}
                            <span>{skill.name}</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TechStackBubble
