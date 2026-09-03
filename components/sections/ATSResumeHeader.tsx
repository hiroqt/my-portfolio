'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBrain,
  FaLayerGroup,
  FaServer,
  FaCheckCircle,
} from 'react-icons/fa'

type AICapabilityId = 'agents' | 'rag' | 'fullstack' | 'devops'

interface AICapability {
  id: AICapabilityId
  title: string
  shortLabel: string
  icon: React.ReactNode
  tagline: string
  architecture: string
  deliverables: string[]
  metrics: string
  stack: string[]
}

const aiCapabilities: AICapability[] = [
  {
    id: 'agents',
    title: 'Autonomous Multi-Agent Swarms',
    shortLabel: 'Agent Swarms',
    icon: <span className="text-accent text-xs">✦</span>,
    tagline: 'Custom multi-agent orchestration loops with tool-calling, reflection & deterministic verification.',
    architecture: 'Custom Swarm Runtime • Shared Context Memory • Tool Execution Rail',
    deliverables: [
      '23-Agent autonomous software engineering framework (Pixel Crew)',
      'Subagent spawning with persistent task state & diff validators',
      'Automated code generation, lint feedback & self-healing execution',
    ],
    metrics: '23 Specialized Agents • Autonomous Loop',
    stack: ['Node.js', 'TypeScript', 'Custom Swarm Engine', 'AST Parser'],
  },
  {
    id: 'rag',
    title: 'Intelligent RAG & LLM Grounding',
    shortLabel: 'Grounding & RAG',
    icon: <FaBrain className="text-amber-500 text-xs" />,
    tagline: 'Active R&D engineering focus: benchmarking context optimization, hybrid retrieval strategies, and hallucination reduction.',
    architecture: 'Semantic Chunking • Hybrid Vector Search (Dense + Keyword) • Re-Ranking Exploration',
    deliverables: [
      'Active experimentation with hybrid retrieval pipelines to minimize LLM hallucinations',
      'Prototyping vector indexing strategies and knowledge embeddings with pgvector & FastAPI',
      'Continuous evaluation of chunking granularity, semantic recall, and grounded citation pipelines',
    ],
    metrics: 'Active R&D Track • Emerging Focus',
    stack: ['pgvector', 'Supabase', 'FastAPI', 'Vector Search', 'Hybrid RAG'],
  },
  {
    id: 'fullstack',
    title: 'Modern Full-Stack Web & SaaS',
    shortLabel: 'Full-Stack SaaS',
    icon: <FaLayerGroup className="text-emerald-500 text-xs" />,
    tagline: 'Type-safe, scalable web applications with responsive design and fast distributed backends.',
    architecture: 'Next.js 15 App Router • Server Actions • Relational Postgres Core',
    deliverables: [
      'Interactive analytical dashboards with optimistic UI updates',
      'Role-based multi-tenant authentication with Row-Level Security',
      'Automated cloud billing & infrastructure cost optimization telemetry',
    ],
    metrics: '100% Type Safety • 99+ Lighthouse Scores',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Infrastructure',
    shortLabel: 'DevOps & Infra',
    icon: <FaServer className="text-sky-500 text-xs" />,
    tagline: 'Modern infrastructure as code, containerized environments, and automated CI/CD deployments.',
    architecture: 'Terraform (IaC) • Docker Containerization • AWS S3 & Cloud Architecture',
    deliverables: [
      'Declarative cloud infrastructure provisioning and state management with Terraform',
      'Multi-stage Docker containerization for consistent, isolated deployments',
      'Automated CI/CD pipelines with build verification and zero-downtime shipping',
    ],
    metrics: 'Automated CI/CD • Immutable Deployments',
    stack: ['Terraform', 'Docker', 'AWS S3', 'Grafana', 'GitHub Actions'],
  },
]

const summaryMilestones = [
  {
    value: 'Full-Stack + AI',
    label: 'Core Focus',
    sub: 'Modern Web, Mobile & LLM Systems',
    href: '#skills',
  },
  {
    value: 'Top 30',
    label: 'National eGov Hackathon',
    sub: 'AI-Powered Citizen Services',
    href: '#projects',
  },
  {
    value: '11+',
    label: 'Verified Credentials',
    sub: 'IBM AI & AWS Cloud (Credly)',
    href: '#certifications',
  },
  {
    value: '486+ Hrs',
    label: 'Clinical IT Operations',
    sub: 'GEAMH Queue & Triage Systems',
    href: '#experience',
  },
]

export function ATSResumeHeader() {
  const reduce = useReducedMotion()
  const [selectedCap, setSelectedCap] = useState<AICapabilityId | null>(null)

  const activeCapability = aiCapabilities.find((c) => c.id === selectedCap) || null

  return (
    <header className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-border/60">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* ── Left Column: AI-First Narrative & Core Identity ── */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Status Badge (One-liner & Short) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Full-Time Roles &bull; 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Arnel Baylon
            </h1>
            <p className="mt-2 font-mono text-xs sm:text-sm text-accent font-semibold tracking-wide uppercase">
              Software Engineer &bull; Generative AI Systems
            </p>
          </motion.div>

          {/* AI-First Thesis & Pitch */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-5 space-y-3.5 text-muted-foreground text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-xl"
          >
            <p>
              I bridge frontier generative AI models with production-grade software engineering. I build autonomous multi-agent loops, intelligent RAG pipelines, and modern full-stack web applications designed for real-world impact.
            </p>
            <p>
              I turn raw AI capabilities into dependable, intuitive systems that users interact with every day.
            </p>
          </motion.div>

          {/* Action CTAs (Clean, Single Direct Button) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-7 flex items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-white transition-all shadow-sm group"
            >
              <span>Explore Featured Systems</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Primary Tech Stack Pills with Laravel & Flutter */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="text-foreground font-semibold mr-1">Primary Stack:</span>
            {['TypeScript', 'Next.js 15', 'React', 'Flutter', 'Laravel', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind'].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-muted/60 border border-border text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right Column: Interactive Engineering Console & Capability Matrix ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <div className="rounded-2xl border border-border/80 bg-muted/20 dark:bg-card/80 p-5 shadow-sm dark:shadow-lg dark:shadow-black/20 space-y-4">
            <h2 className="sr-only">Interactive Engineering Console &amp; Technical Capabilities</h2>
            
            {/* Header: Clean Typography & Social Connectors (No AB/Robot Icon) */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div>
                <div className="font-mono font-bold text-xs text-foreground leading-tight">
                  Engineering Console
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  Cavite, PH &bull; BS IT &bull; CvSU 2026
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <a
                  href="https://github.com/hiroqt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="mailto:arnelbaylon15@gmail.com"
                  className="p-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors"
                  title="Email"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* Interactive Capability Switcher Tabs */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
                <span>Interactive Capabilities &amp; Architecture</span>
                <span className="text-accent font-semibold">
                  {selectedCap ? 'Click to toggle ↘' : 'Click to inspect ↘'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {aiCapabilities.map((cap) => {
                  const isSelected = selectedCap === cap.id
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => setSelectedCap(isSelected ? null : cap.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-background dark:bg-muted text-foreground font-semibold shadow-xs border border-accent/40 ring-1 ring-accent/20'
                          : 'bg-muted/40 dark:bg-muted/30 text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border/40'
                      }`}
                    >
                      <span className="text-xs shrink-0">{cap.icon}</span>
                      <span className="truncate">{cap.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Capability Deep Dive View (Collapsed by Default, Expands on Click) */}
            <AnimatePresence mode="wait">
              {activeCapability && (
                <motion.div
                  key={activeCapability.id}
                  initial={{ opacity: 0, height: 0, y: 4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden p-4 rounded-xl bg-background dark:bg-muted/40 border border-border/80 space-y-3 shadow-2xs"
                >
                  {/* Title & Metrics */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-sm text-foreground flex items-center gap-2">
                        <span>{activeCapability.title}</span>
                      </h3>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold">
                        {activeCapability.metrics}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground mt-1 leading-relaxed">
                      {activeCapability.tagline}
                    </p>
                  </div>

                  {/* Architecture & Deliverables */}
                  <div className="space-y-1.5 pt-2 border-t border-border/50">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Core Technical Deliverables:
                    </div>
                    {activeCapability.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground/90">
                        <FaCheckCircle className="text-emerald-500 text-[11px] shrink-0 mt-0.5" />
                        <span className="leading-snug text-[11.5px]">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Badges */}
                  <div className="pt-2 border-t border-border/50 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[10px] text-muted-foreground mr-1">Stack:</span>
                    {activeCapability.stack.map((stk) => (
                      <span
                        key={stk}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted border border-border text-foreground"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>

      {/* ── 4-Metric Milestone Stats Ribbon ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-border/50">
        {summaryMilestones.map((m, idx) => (
          <a
            key={idx}
            href={m.href}
            className="group block p-3.5 rounded-xl border border-border/70 bg-muted/10 dark:bg-card/60 hover:bg-muted/30 hover:border-accent/40 transition-all shadow-2xs dark:shadow-md dark:shadow-black/15"
          >
            <div className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors flex items-center justify-between">
              <span>{m.value}</span>
              <span className="text-[11px] font-mono text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
              {m.label}
            </div>
            <div className="text-[10px] text-muted-foreground/80 truncate mt-0.5">
              {m.sub}
            </div>
          </a>
        ))}
      </div>
    </header>
  )
}
export default ATSResumeHeader
