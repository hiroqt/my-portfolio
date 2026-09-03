'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  FaArrowRight,
  FaTrophy,
  FaGithub,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaTimes,
  FaLayerGroup,
} from 'react-icons/fa'
import Link from 'next/link'

interface FeaturedProject {
  id: string
  number: string
  title: string
  tagline: string
  category: string
  awardBadge: string
  awardSub: string
  awardIcon: React.ReactNode
  image: string
  previewName?: string
  description: string
  problemSolution: {
    problem: string
    solution: string
  }
  highlights: string[]
  tags: string[]
  metrics: { label: string; val: string }[]
  link: string
  isExternal?: boolean
  githubUrl?: string
}

interface ProjectArchiveItem {
  id: string
  number: string
  title: string
  category: string
  summary: string
  problem: string
  solution: string
  highlights: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

const featuredSystems: FeaturedProject[] = [
  {
    id: 'pixelcrew',
    number: '01',
    title: 'Pixel Crew (PixelAgents)',
    tagline: 'Autonomous 23-Agent Software Engineering Swarm',
    category: 'Multi-Agent AI Swarm',
    awardBadge: 'FLAGSHIP OPEN-SOURCE ENGINE',
    awardSub: 'Cross-IDE Swarm Architecture',
    awardIcon: <span className="text-accent text-xs">✦</span>,
    image: '/images/pixelcrew.png',
    previewName: 'pixelcrew.website',
    description:
      'Autonomous multi-agent software engineering framework simulating a 23-person tech startup department. Coordinates specialized agent roles (Creative Director, UX Planner, Frontend, Backend, Security Sentinel, Performance SRE) via Directed Acyclic Graph (DAG) task loops.',
    problemSolution: {
      problem: 'AI coding tools produce generic slop and lack cross-disciplinary coordination between frontend, backend, and security.',
      solution: 'Enforces strict 64-pattern anti-slop rules, AST context pruning, and parallel swarm DAG review gates across Cursor, Kiro, and modern AI IDEs.',
    },
    highlights: [
      '23 Specialized Agent Personas operating in parallel execution DAGs',
      'Anti-AI-Slop engine enforcing mathematical fluid clamp typography and bespoke layouts',
      'AST symbol-graph context extraction slashing prompt token overhead by 60%+',
      'Retro gamified pixel-art startup office visualizer streaming real-time agent activity',
    ],
    tags: ['TypeScript', 'Next.js 15', 'DAG Swarm', 'Custom Swarm Runtime', 'Cursor Rules', 'Tailwind CSS'],
    metrics: [
      { label: 'Swarm Roles', val: '23 Agents' },
      { label: 'Token Efficiency', val: '60%+ Cut' },
      { label: 'Cross-IDE Support', val: '4 IDEs' },
    ],
    link: 'https://github.com/hiroqt/PixelCrew',
    isExternal: true,
    githubUrl: 'https://github.com/hiroqt/PixelCrew',
  },
  {
    id: 'finops-ai-dashboard',
    number: '02',
    title: 'FinOps AI Dashboard',
    tagline: 'Intelligent Financial Operations & Compliance Automation',
    category: 'Enterprise Cloud AI',
    awardBadge: 'WINNER — BEST BUSINESS IMPACT',
    awardSub: 'Amazon Quick Quest BGC (AWS Headquarters)',
    awardIcon: <FaTrophy className="text-amber-500 text-xs" />,
    image: '/images/finops.jpg',
    previewName: '-',
    description:
      'Awarded Best Business Impact at the 9-Week Amazon Quick Quest Workshop at the AWS Philippines Office in BGC. Automates enterprise expense reconciliation, invoice-to-PO matching, and policy compliance via Amazon Quick Spaces & Flows.',
    problemSolution: {
      problem: 'Manual multi-day financial review cycles and un-reconciled PO mismatches across distributed company accounts.',
      solution: 'Sub-second automated reconciliation with bi-directional Google Workspace connectors and instant Amazon Quick Flow audit triggers.',
    },
    highlights: [
      'Won Best Business Impact Award judged by AWS Enterprise Solutions Architects at AWS BGC',
      'Amazon Quick Spaces automated policy verification and expense anomaly detection',
      'Real-time bi-directional Google Workspace sync (Gmail invoice ingestion & Calendar audit alerts)',
      'Autonomous conversational agent querying enterprise spending patterns with grounded citations',
    ],
    tags: ['Amazon Quick', 'AWS Cloud', 'Quick Spaces & Flows', 'FinOps', 'AI Agents', 'Automation'],
    metrics: [
      { label: 'Audit Cycle', val: 'Sub-second' },
      { label: 'AWS Hackathon', val: 'Winner' },
      { label: 'Reconciliation', val: 'Automated' },
    ],
    link: '/projects/finops-ai-dashboard',
    isExternal: false,
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'ebuddy',
    number: '03',
    title: 'e Buddy',
    tagline: 'Philippine Citizen AI Public Service Assistant',
    category: 'Government & Civic Tech',
    awardBadge: 'WINNER — TOP 30 NATIONWIDE',
    awardSub: 'National eGov Hackathon 2026',
    awardIcon: <FaTrophy className="text-amber-500 text-xs" />,
    image: '/images/egov.png',
    previewName: 'e-gov-ai.vercel.app',
    description:
      'Won Top 30 National Winner at the eGov PH Hackathon 2026 (out of 180+ teams nationwide). AI-powered citizen companion navigating PhilHealth, SSS, GSIS, DFA, and statutory government requirements with grounded legal citation references.',
    problemSolution: {
      problem: 'Citizens struggle through confusing government portals and bureaucratic requirements without localized guidance.',
      solution: 'RAG-powered conversational assistant with verifiable government citation links, offline caching, and multilingual support.',
    },
    highlights: [
      'Top 30 National Hackathon Winner recognized by government and industry jury',
      'Grounded RAG pipeline querying official agency gazettes and citizen charters',
      'Verifiable citations preventing hallucinated bureaucratic steps',
      'Lightweight, low-bandwidth mobile optimization for provincial internet connectivity',
    ],
    tags: ['Next.js', 'TypeScript', 'RAG Engine', 'Vector Search', 'GovTech', 'FastAPI'],
    metrics: [
      { label: 'National Rank', val: 'Top 30' },
      { label: 'Competitors', val: '180+ Teams' },
      { label: 'Citation Rate', val: '100% Grounded' },
    ],
    link: '/projects/ebuddy',
    isExternal: false,
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'better-trece-martires',
    number: '04',
    title: 'Better Trece Martires',
    tagline: 'Civic Open Data & Local Governance Transparency Platform',
    category: 'Open Governance Platform',
    awardBadge: 'CIVIC OPEN DATA INITIATIVE',
    awardSub: 'DBM GAA Budget & LGU Transparency',
    awardIcon: <span className="text-accent text-xs">✦</span>,
    image: '/images/bettertrece.png',
    previewName: 'bettertrecemartires.org',
    description:
      'Community-first open data platform mapping city infrastructure projects, public budget expenditures (DBM General Appropriations Act), and LGU resolutions to bring radical transparency to local governance.',
    problemSolution: {
      problem: 'Opaque municipal budgets, unsearchable city council resolutions, and lack of citizen engagement tools.',
      solution: 'Searchable civic database indexing infrastructure budgets, procurement records, and geotagged city projects.',
    },
    highlights: [
      'Geospatial mapping of city infrastructure projects and completion status',
      'Automated ingestion of Department of Budget and Management (DBM) allocation datasets',
      'Interactive municipal budget visualizer showing exact revenue and expenditure breakdowns',
      'Citizen resolution tracker with document OCR and semantic keyword search',
    ],
    tags: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Leaflet', 'Open Data', 'Prisma'],
    metrics: [
      { label: 'Budget Dataset', val: 'DBM GAA' },
      { label: 'Architecture', val: 'Open Data' },
      { label: 'Search Speed', val: '<50ms' },
    ],
    link: '/projects/better-trece-martires',
    isExternal: false,
    githubUrl: 'https://github.com/hiroqt/better-trece-martires',
  },
]

// All Projects Catalog (Initial 4 shown in Horizontal View + Full Archive on "Show All")
const allProjectsList: ProjectArchiveItem[] = [
  {
    id: 'pacementor',
    number: '01',
    title: 'PaceMentor',
    category: 'Mobile App / AI',
    summary: 'AI-powered running coach with adaptive training plans, real-time GPS tracking, and Strava integration — from first steps to personal best.',
    problem: 'Amateur runners struggle to build consistent, injury-free training habits without expensive human coaching.',
    solution: 'AI engine analyzing running metrics (pace, heart rate, elevation) to dynamically adjust future workouts, with deep Strava integration.',
    highlights: [
      'AI-powered running coach with dynamic training plans tailored to user profiles',
      'High-precision GPS tracking with auto-pause detection when walking or stopping',
      'Seamless Strava API bi-directional synchronization for importing and exporting runs',
    ],
    tags: ['Flutter', 'Dart', 'AI', 'Mobile', 'Strava API'],
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'present-po',
    number: '02',
    title: 'Present Po',
    category: 'B2B SaaS / Productivity',
    summary: 'Workforce attendance and time-tracking platform with scheduling, geofenced presence monitoring, AI journaling, and automated reporting.',
    problem: 'Traditional workforce time tracking relies on manual timesheets, causing reconciliation overhead and inaccurate hour tallies.',
    solution: 'One-tap geofenced attendance with AI journaling, OCR timesheet parsing, and bulk automated certificate generation.',
    highlights: [
      'Automatic one-tap time-in and time-out with strict geofence vicinity validation',
      'AI journaling with intelligent auto-completion of daily activity logs',
      'Bulk automated completion certificate generation with validated hour tallies',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'AI'],
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'hospital-queuing-system',
    number: '03',
    title: 'Hospital Queuing System',
    category: 'Healthcare Enterprise / AI',
    summary: 'A centralized local queuing and triage system with Groq LLM integration developed during a 486-hour internship at General Emilio Aguinaldo Memorial Hospital.',
    problem: 'Overcrowded waiting rooms and long intake delays for specialized medical hospital departments.',
    solution: 'Offline-capable local network queuing with Groq LLM triage, thermal receipt printing, and live waiting room display monitors.',
    highlights: [
      'Offline-capable local network architecture for zero-downtime hospital triage',
      'Groq LLM integration for intelligent symptom intake and clinic routing',
      'Waiting room audio-visual display monitors with live queue updates',
    ],
    tags: ['Vue.js', 'PHP', 'MySQL', 'Groq LLM', 'Healthcare'],
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'yhel-os',
    number: '04',
    title: 'yhel.os',
    category: 'Productivity Platform',
    summary: 'All-in-one operating system and client CRM for independent developers featuring kanban engines, instant proposal generators, and webhook integrations.',
    problem: 'Freelancers suffer from administrative friction, juggling multiple tools for invoicing, project management, and client communication.',
    solution: 'Consolidated CRM with Kanban task engine, instant proposal generator, and Telegram/Gmail/Calendar webhook integrations.',
    highlights: [
      'Client management with a dedicated public secured portal for real-time monitoring',
      'Interactive drag-and-drop Kanban task engine (To Do, On-going, Review, Done)',
      'Instant split-screen letter of agreement and proposal generator',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CRM', 'Webhooks'],
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'vcm-hris',
    number: '05',
    title: 'VCM HRIS',
    category: 'Enterprise HR / Capstone',
    summary: 'QR-code based Human Resource Information System: employee records, leave tracking, faculty recruitment, real-time notifications, and automated payroll.',
    problem: 'Academic institution faced significant administrative overhead with manual timekeeping and disjointed HR processes.',
    solution: 'QR-code vicinity attendance, automated statutory payroll engine, and faculty recruitment portal using Laravel and MySQL.',
    highlights: [
      'QR-Based attendance validation restricting check-ins to the campus vicinity',
      'Automated payroll engine computing gross pay, statutory deductions, and net salary',
      'Teacher recruitment portal with online application screening',
    ],
    tags: ['Laravel', 'Livewire', 'PHP', 'MySQL', 'QR Attendance'],
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'tearsize',
    number: '06',
    title: 'Tearsize',
    category: 'E-Commerce Storefront',
    summary: 'Client project — E-commerce platform for health and wellness products featuring end-to-end checkout and payment integration.',
    problem: 'Client needed a performant, reliable storefront with a smooth checkout flow for health and wellness products.',
    solution: 'Responsive product catalog with fast filtering, secure payment gateway integration, and automated order confirmations.',
    highlights: [
      'Responsive product catalog with fast filtering and category indexing',
      'Secure payment gateway integration for digital payments and cards',
      'Order fulfillment and automated customer email confirmations',
    ],
    tags: ['TypeScript', 'Tailwind CSS', 'Payment Gateway'],
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'hivesync-va',
    number: '07',
    title: 'HiveSync VA',
    category: 'Agency Platform',
    summary: 'Client project — Virtual assistant services platform streamlining business operations and lead generation for distributed teams.',
    problem: 'VA agency needed a high-performance web presence with automated social content pipelines and lead capture.',
    solution: 'Next.js web application with automated Facebook-to-blog syndication and integrated consultation booking.',
    highlights: [
      'Automated blog syndication syncing Facebook posts directly to website articles',
      'Integrated consultation booking and inquiry capture system',
      'SEO-optimized lead conversion flows for virtual assistant services',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Automation'],
    liveUrl: 'https://www.hivesyncva.com',
    githubUrl: 'https://github.com/hiroqt',
  },
  {
    id: 'tmrc',
    number: '08',
    title: 'TMRC (Trece Martirez Running Club)',
    category: 'Community Hub',
    summary: 'Centralized community hub for Trece Martirez Running Club — managing race registration archives, finish times, and community announcements.',
    problem: 'Running club lacked a permanent digital home for race records, registration, and community news.',
    solution: 'Centralized community platform with permanent race registration archives, finish time leaderboards, and event calendar.',
    highlights: [
      'Race registration directory with historical finish records',
      'Community announcement bulletin and upcoming run event calendar',
      'Permanent archive of race results and community milestones',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hiroqt',
  },
]

export function FeaturedProjectsSection() {
  const reduce = useReducedMotion()
  const [selectedSystemId, setSelectedSystemId] = useState<string>('pixelcrew')
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null)
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false)

  const selectedProject =
    featuredSystems.find((s) => s.id === selectedSystemId) || featuredSystems[0]

  const displayedProjects = showAllProjects
    ? allProjectsList
    : allProjectsList.slice(0, 4)

  const expandedProject =
    allProjectsList.find((p) => p.id === expandedProjectId) || null

  const handleToggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedProjectId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="projects" className="py-12 scroll-mt-20">
      
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">01</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Featured Systems &amp; Projects
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Architecture Studio
        </span>
      </div>

      <div className="space-y-8">
        
        {/* ── Part 1: Flagship Systems Interactive Switcher & Stage ── */}
        <div className="space-y-4">
          {/* Top Systems Selector Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {featuredSystems.map((item) => {
              const isActive = selectedSystemId === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSystemId(item.id)}
                  className={`group text-left p-3 rounded-xl border transition-all cursor-pointer relative ${
                    isActive
                      ? 'border-accent bg-accent/5 dark:bg-accent/10 ring-1 ring-accent shadow-xs'
                      : 'border-border/80 bg-muted/20 dark:bg-card/50 hover:bg-muted/40 hover:border-border'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span
                      className={`font-bold ${
                        isActive ? 'text-accent' : 'text-muted-foreground'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="opacity-80">{item.awardIcon}</span>
                  </div>
                  <div className="font-serif font-bold text-xs sm:text-sm text-foreground truncate group-hover:text-accent transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate mt-0.5">
                    {item.category}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Flagship Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border bg-muted/20 dark:bg-card/80 p-5 sm:p-7 shadow-xs dark:shadow-lg dark:shadow-black/20 relative overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column: Narrative & Technical Highlights */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-[11px] font-mono font-semibold text-accent mb-3 shadow-2xs">
                      {selectedProject.awardIcon}
                      <span>{selectedProject.awardBadge}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-accent font-medium mt-1">
                      {selectedProject.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Problem vs Solution Callout */}
                  <div className="p-3.5 rounded-xl bg-background dark:bg-muted/40 border border-border/80 space-y-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-muted-foreground uppercase text-[10px]">
                        Challenge:
                      </span>
                      <p className="text-muted-foreground mt-0.5">{selectedProject.problemSolution.problem}</p>
                    </div>
                    <div className="pt-2 border-t border-border/50">
                      <span className="font-mono font-bold text-accent uppercase text-[10px]">
                        Engineering Solution:
                      </span>
                      <p className="text-foreground font-medium mt-0.5">{selectedProject.problemSolution.solution}</p>
                    </div>
                  </div>

                  {/* Technical Highlights */}
                  <div>
                    <h4 className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                      Core Technical Deliverables:
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedProject.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-accent text-[10px] shrink-0 mt-0.5">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="pt-3 border-t border-border/40">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-background dark:bg-muted/50 border border-border text-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Stage & Metrics */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Visual Preview Frame */}
                  <div className="rounded-xl overflow-hidden border border-border bg-background dark:bg-card shadow-xs group">
                    <div className="px-3 py-2 bg-muted/60 border-b border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${selectedProject.previewName === '-' ? 'bg-muted-foreground/40' : 'bg-emerald-500'}`} />
                        <span className="truncate">{selectedProject.previewName ?? `${selectedProject.id}.app`}</span>
                      </div>
                      <span>Preview</span>
                    </div>
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} screenshot`}
                      className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Live Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProject.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-lg bg-background dark:bg-muted/30 border border-border/80 text-center shadow-2xs"
                      >
                        <div className="font-serif font-bold text-xs sm:text-sm text-foreground">
                          {m.val}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground truncate mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Direct Action Link */}
                  <div>
                    {selectedProject.isExternal ? (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-white transition-all shadow-xs"
                      >
                        <span>Explore Repository on GitHub</span>
                        <FaGithub className="text-xs" />
                      </a>
                    ) : (
                      <Link
                        href={selectedProject.link}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-white transition-all shadow-xs"
                      >
                        <span>View Full Project Overview</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Part 2: Engineering Projects (Horizontal View + Show All Projects) ── */}
        <div className="pt-6 border-t border-border/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent font-semibold">Engineering</span>
              <span className="text-muted-foreground font-mono text-xs">&bull;</span>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Projects
              </h3>
            </div>
            
            {/* Show All Projects Toggle */}
            <button
              type="button"
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-lg bg-muted hover:bg-accent/10 border border-border hover:border-accent/40 text-foreground transition-colors cursor-pointer font-medium"
            >
              <span>{showAllProjects ? 'Show Initial 4 Projects' : `Show All Projects (${allProjectsList.length})`}</span>
              {showAllProjects ? <FaChevronUp className="text-[9px]" /> : <FaChevronDown className="text-[9px]" />}
            </button>
          </div>

          {/* Horizontal / Grid View of Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {displayedProjects.map((p) => {
              const isExpanded = expandedProjectId === p.id

              return (
                <div
                  key={p.id}
                  onClick={() => setExpandedProjectId(isExpanded ? null : p.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isExpanded
                      ? 'border-accent bg-accent/5 dark:bg-accent/10 ring-1 ring-accent shadow-xs'
                      : 'border-border/80 bg-muted/20 dark:bg-card/50 hover:bg-muted/40 hover:border-accent/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                      <span className="text-accent font-bold shrink-0">{p.number}</span>
                      <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-background border border-border text-muted-foreground truncate max-w-[60%]" title={p.category}>
                        {p.category}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-foreground group-hover:text-accent transition-colors">
                      {p.title}
                    </h4>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={(e) => handleToggleExpand(p.id, e)}
                      className="text-accent font-medium flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Expand Info'}</span>
                      {isExpanded ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                    </button>
                    <span className="text-muted-foreground text-[10px]">Details ↘</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Expanded Project Details Panel (Inline Accordion Drawer) */}
          <AnimatePresence>
            {expandedProject && (
              <motion.div
                key={expandedProject.id}
                initial={{ opacity: 0, height: 0, y: 8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden p-5 sm:p-6 rounded-2xl border border-accent/40 bg-background dark:bg-card shadow-md dark:shadow-lg dark:shadow-black/20 space-y-4"
              >
                {/* Header with Title and Close Button */}
                <div className="flex items-start justify-between pb-3 border-b border-border">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-accent font-bold mb-1">
                      <span>Project #{expandedProject.number}</span>
                      <span className="hidden sm:inline">&bull;</span>
                      <span className="text-muted-foreground font-normal text-[10px] sm:text-xs">{expandedProject.category}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold text-foreground">
                      {expandedProject.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpandedProjectId(null)}
                    className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground text-xs cursor-pointer"
                    title="Close Details"
                  >
                    <FaTimes />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {expandedProject.summary}
                </p>

                {/* Problem vs Solution */}
                <div className="grid sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-muted/30 dark:bg-muted/20 border border-border/70 text-xs">
                  <div>
                    <span className="font-mono font-bold text-muted-foreground uppercase text-[10px] block mb-0.5">
                      The Challenge:
                    </span>
                    <p className="text-muted-foreground leading-relaxed">{expandedProject.problem}</p>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-accent uppercase text-[10px] block mb-0.5">
                      Engineering Approach:
                    </span>
                    <p className="text-foreground font-medium leading-relaxed">{expandedProject.solution}</p>
                  </div>
                </div>

                {/* Key Deliverables Checklist */}
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                    Key Technical Highlights:
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {expandedProject.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-muted/20 border border-border/60 flex items-start gap-2 text-xs text-foreground/90"
                      >
                        <FaCheckCircle className="text-emerald-500 text-[11px] shrink-0 mt-0.5" />
                        <span className="leading-snug text-[11.5px]">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack & Action Link */}
                <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                    <span className="text-muted-foreground mr-1">Stack:</span>
                    {expandedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-muted border border-border text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {expandedProject.githubUrl && (
                    <a
                      href={expandedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background font-mono text-xs font-semibold hover:bg-accent hover:text-white transition-colors"
                    >
                      <span>Explore on GitHub</span>
                      <FaGithub className="text-xs" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
export default FeaturedProjectsSection
