'use client'

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCalendarAlt,
  FaSearchPlus,
} from 'react-icons/fa'

export interface GalleryItem {
  id: string
  src: string
  title: string
  category: 'aws' | 'hospital' | 'events' | 'apps'
  categoryLabel: string
  date: string
  caption: string
  tag: string
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'aws-bgc-presentation',
    src: '/images/gallery/aws_presentation_week2.jpg',
    title: 'FinOps AI Dashboard Defense @ AWS Office BGC',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Presenting and defending the FinOps AI Dashboard to AWS enterprise architects and judges, winning the "Best Business Impact" award at the final capstone presentation of the 9-Week Amazon Quick Quest Workshop at the AWS BGC headquarters.',
    tag: 'AWS Best Business Impact',
  },
  {
    id: 'aws-cert-business-impact',
    src: '/certs/aws-capstone-best-business-impact.jpg',
    title: 'Winner Certificate: Best Business Impact (DevOops)',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Official Certificate of Recognition presented by AWS User Group Philippines (AWSUG.PH) at the AWS Headquarters BGC, awarding DevOops the Best Business Impact title at the Capstone on Quick! Finale.',
    tag: 'Official AWS Award',
  },
  {
    id: 'aws-cloud-builder',
    src: '/images/gallery/aws_day3_me.jpg',
    title: 'AWS Cloud Architecture Session',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Prototyping multi-agent reasoning loops and Amazon Quick Spaces connectors inside the AWS Philippines headquarters in Bonifacio Global City.',
    tag: 'AWS Headquarters BGC',
  },
  {
    id: 'aws-quickflow',
    src: '/images/gallery/aws_quickflow.jpg',
    title: 'Amazon Quick Flows & FinOps Ingestion Pipeline',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Engineering zero-latency automated invoice matching triggers and financial compliance verification engines using Amazon Quick.',
    tag: 'Quick Flows Pipeline',
  },
  {
    id: 'aws-bizzdev',
    src: '/images/gallery/aws_bizzdev.jpg',
    title: 'AWS Enterprise Strategy & Business Development',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Deep-dive session aligning cloud cost optimization benchmarks and multi-tenant enterprise telemetry at AWS BGC.',
    tag: 'AWS Strategy',
  },
  {
    id: 'hospital-queuing',
    src: '/images/gallery/internship_presenting_queuing_to_sectionheads.jpg',
    title: 'Hospital AI Queuing Presentation to Medical Section Heads',
    category: 'hospital',
    categoryLabel: 'Hospital & Enterprise IT',
    date: '2026',
    caption: 'Demonstrating the offline-capable Vue.js & Groq LLM triage queuing console to clinical doctors and hospital administrative heads at GEAMH.',
    tag: 'GEAMH 486h Deployment',
  },
  {
    id: 'hospital-clinical',
    src: '/images/gallery/internship.jpg',
    title: 'GEAMH Provincial Hospital Clinical IT Deployment',
    category: 'hospital',
    categoryLabel: 'Hospital & Enterprise IT',
    date: '2026',
    caption: '486-hour clinical internship deploying hospital informatics, mission-critical network infrastructure, and real-time medical staff support.',
    tag: 'Provincial Hospital IT',
  },
  {
    id: 'vcm-defense',
    src: '/images/gallery/capstone_project.jpg',
    title: 'VCM HRIS Automated Payroll Capstone Defense',
    category: 'hospital',
    categoryLabel: 'Hospital & Enterprise IT',
    date: '2026',
    caption: 'Academic capstone defense for the QR-verified automated payroll and faculty attendance management system built with Laravel & Livewire.',
    tag: 'Capstone Final Defense',
  },
  {
    id: 'better-trece-portal',
    src: '/images/bettertrece.png',
    title: 'Better Trece Martires Public Open Data Platform',
    category: 'apps',
    categoryLabel: 'Open Data & Web Systems',
    date: '2026',
    caption: 'Public governance platform unifying DBM GAA national budget records, COA audit metrics, DPWH infrastructure, and bilingual citizen service charters.',
    tag: 'Open Data Platform',
  },
  {
    id: 'egov-hackathon',
    src: '/images/gallery/egov3.jpg',
    title: 'eGov Hackathon 2026 — Top 30 National Winner',
    category: 'aws',
    categoryLabel: 'National Hackathons & AI',
    date: '2026',
    caption: 'Collaborative development of e Buddy, the agentic citizen assistant delivering unified government service access and biometric verification.',
    tag: 'Top 30 National Finalist',
  },
  {
    id: 'egov-sprint',
    src: '/images/gallery/egov1.jpg',
    title: 'DICT eGov Philippines Hackathon Sprint',
    category: 'events',
    categoryLabel: 'Hackathons & Summits',
    date: '2026',
    caption: 'Rapid prototyping and systems integration sprint for eGov citizen services with Department of Information and Communications Technology.',
    tag: 'DICT Hackathon Sprint',
  },
  {
    id: 'echelon-summit',
    src: '/images/gallery/echelon2026.jpg',
    title: 'Echelon 2026 Tech & Innovation Summit',
    category: 'events',
    categoryLabel: 'Events & Conferences',
    date: '2026',
    caption: 'Engaging with Southeast Asian tech founders, venture leaders, and AI innovators discussing agentic workflows and developer tooling.',
    tag: 'International Tech Summit',
  },
  {
    id: 'sandbox-echelon',
    src: '/images/gallery/sandbox_echelon.jpg',
    title: 'Sandbox Innovation & Multi-Agent Swarm Ideation',
    category: 'events',
    categoryLabel: 'Events & Conferences',
    date: '2026',
    caption: 'Exploration and architecture blueprinting for autonomous multi-agent coding swarms (Pixel Crew) and AST symbol-graph context engines.',
    tag: 'Sandbox Innovation',
  },
  {
    id: 'echelon-delegate-pass',
    src: '/images/gallery/echelon_2026_delegate.jpg',
    title: 'Echelon 2026 Official Tech Summit Delegate',
    category: 'events',
    categoryLabel: 'Events & Conferences',
    date: '2026',
    caption: 'Official accredited delegate pass at Echelon 2026, engaging with Southeast Asian startup founders, venture capitalists, and tech leaders.',
    tag: 'Echelon Official Delegate',
  },
  {
    id: 'aws-buildnights-cohort',
    src: '/images/gallery/aws.jpg',
    title: 'AWS BuildNights Cohort @ Arthaland Tower BGC',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Collaborative cohort sessions during the AWS BuildNights series at the AWS Philippines office in Arthaland Century Pacific Tower, BGC.',
    tag: 'AWS BuildNights',
  },
  {
    id: 'aws-hands-on-lab',
    src: '/images/gallery/aws_day3.jpg',
    title: 'AWS Cloud & Agentic AI Architecture Lab',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Deep-dive implementation lab configuring generative AI workflows, API orchestration, and serverless compute primitives during AWS BuildNights Day 3.',
    tag: 'AWS Technical Lab',
  },
  {
    id: 'aws-architecture-review',
    src: '/images/gallery/aws_week2.jpg',
    title: 'AWS Architecture Review & Solution Defense',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Sprint architecture review analyzing pipeline scalability, event-driven data flow, and cost optimization benchmarks inside AWS BGC.',
    tag: 'Architecture Sprint',
  },
  {
    id: 'egov-ideation-session',
    src: '/images/gallery/egov2.jpg',
    title: 'eGov Hackathon Architecture Ideation',
    category: 'aws',
    categoryLabel: 'National Hackathons & AI',
    date: '2026',
    caption: 'Brainstorming civic AI architectures and designing the interaction model for the e Buddy citizen service assistant at DICT eGov Hackathon.',
    tag: 'eGov Hackathon Ideation',
  },
  {
    id: 'egov-mentor-consultation',
    src: '/images/gallery/egov4.jpg',
    title: 'eGov Technical Mentorship & Guidance',
    category: 'aws',
    categoryLabel: 'National Hackathons & AI',
    date: '2026',
    caption: 'Consulting with industry mentors on interoperability, data privacy compliance, and public sector API integration for e Buddy.',
    tag: 'Industry Mentorship',
  },
  {
    id: 'egov-team-collaboration',
    src: '/images/gallery/egov5.jpg',
    title: 'eGov Team Intensive Development Sprint',
    category: 'aws',
    categoryLabel: 'National Hackathons & AI',
    date: '2026',
    caption: 'Collaborative coding session assembling the full-stack prototype, auth flows, and AI grounding mechanisms under tight competition deadlines.',
    tag: 'Hackathon Team Sprint',
  },
  {
    id: 'egov-final-pitch-prep',
    src: '/images/gallery/egov6.jpg',
    title: 'eGov Final Pitch & Demonstration Prep',
    category: 'aws',
    categoryLabel: 'National Hackathons & AI',
    date: '2026',
    caption: 'Dry run and live demo preparation before presenting e Buddy to the panel of judges at DICT eGov Hackathon.',
    tag: 'Pitch Preparation',
  },
  {
    id: 'egov-top30-recognition',
    src: '/images/gallery/egov7.jpg',
    title: 'eGov Top 30 National Recognition Ceremony',
    category: 'aws',
    categoryLabel: 'National Hackathons & AI',
    date: '2026',
    caption: 'Celebration and recognition of the team placing in the Top 30 nationwide at the DICT eGov Philippines Hackathon 2026.',
    tag: 'Top 30 National Finalist',
  },
  {
    id: 'hospital-it-stakeholder-presentation',
    src: '/images/gallery/internship_presenting_to_sectionheads.jpg',
    title: 'GEAMH Clinical Informatics Presentation',
    category: 'hospital',
    categoryLabel: 'Hospital & Enterprise IT',
    date: '2026',
    caption: 'Presenting clinical information systems and operational automation workflows directly to hospital medical section heads and administrative leadership.',
    tag: 'GEAMH Leadership Defense',
  },
  {
    id: 'pacementor-app',
    src: '/images/gallery/pacementor_development.jpg',
    title: 'PaceMentor Mobile Architecture & Strava Sync',
    category: 'apps',
    categoryLabel: 'Mobile & SaaS Apps',
    date: '2025 – 2026',
    caption: 'Cross-platform mobile engineering with Flutter & Dart, implementing real-time adaptive pace calculations and automated Strava activity syncing.',
    tag: 'Flutter & Strava API',
  },
  {
    id: 'pacementor-runclub-testing',
    src: '/images/gallery/runclub_development.jpg',
    title: 'PaceMentor GPS & Strava Field Testing',
    category: 'apps',
    categoryLabel: 'Mobile & SaaS Apps',
    date: '2025 – 2026',
    caption: 'On-road validation of real-time GPS telemetry, pace smoothing algorithms, and community run club activity sync using Flutter.',
    tag: 'Field Testing & Telemetry',
  },
  {
    id: 'present-po-saas',
    src: '/images/presentpo.jpg',
    title: 'Present Po B2B Workforce & OJT SaaS',
    category: 'apps',
    categoryLabel: 'Mobile & SaaS Apps',
    date: '2025 – 2026',
    caption: 'Geofenced one-tap attendance logging, automated timesheet compilation, and AI activity journaling powered by Next.js & Supabase.',
    tag: 'B2B SaaS Platform',
  },
  {
    id: 'finops-platform',
    src: '/images/finops.jpg',
    title: 'FinOps AI Automation Platform Suite',
    category: 'aws',
    categoryLabel: 'AWS & Hackathons',
    date: '2026',
    caption: 'Architecting end-to-end policy compliance automation and expense reconciliation triggers built on Amazon Quick Spaces.',
    tag: 'FinOps Enterprise',
  },
]

// ── Masonry Column Types for Horizontal Carousel Track ──
type MasonryColumn =
  | { type: 'tall'; item: GalleryItem; globalIndex: number }
  | {
      type: 'stacked'
      topItem: GalleryItem
      topIndex: number
      bottomItem: GalleryItem
      bottomIndex: number
    }
  | { type: 'wide'; item: GalleryItem; globalIndex: number }

export function InteractiveGallery() {
  const reduceMotion = useReducedMotion()
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isInView, setIsInView] = useState<boolean>(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)
  const singleWidthRef = useRef<number>(0)
  const animFrameId = useRef<number | null>(null)
  const isDragging = useRef<boolean>(false)
  const dragStartX = useRef<number>(0)
  const dragStartScroll = useRef<number>(0)
  const hasMoved = useRef<boolean>(false)
  const isInteracting = useRef<boolean>(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // ── Dynamic Masonry Grouping Engine ──
  // Groups all items into alternating columns: Tall -> Stacked Pair -> Wide -> Stacked Pair
  const masonryColumns = useMemo<MasonryColumn[]>(() => {
    const cols: MasonryColumn[] = []
    let i = 0
    let step = 0

    while (i < galleryItems.length) {
      const rhythm = step % 4

      if (rhythm === 0) {
        // Tall Feature Card (1 item)
        cols.push({
          type: 'tall',
          item: galleryItems[i],
          globalIndex: i,
        })
        i += 1
      } else if (rhythm === 1 || rhythm === 3) {
        // Stacked Dual Column (2 items)
        if (i + 1 < galleryItems.length) {
          cols.push({
            type: 'stacked',
            topItem: galleryItems[i],
            topIndex: i,
            bottomItem: galleryItems[i + 1],
            bottomIndex: i + 1,
          })
          i += 2
        } else {
          cols.push({
            type: 'tall',
            item: galleryItems[i],
            globalIndex: i,
          })
          i += 1
        }
      } else if (rhythm === 2) {
        // Wide Feature Card (1 item)
        cols.push({
          type: 'wide',
          item: galleryItems[i],
          globalIndex: i,
        })
        i += 1
      }
      step += 1
    }

    return cols
  }, [])

  // Update single set width on mount & resize
  const measureSetWidth = useCallback(() => {
    if (setRef.current) {
      const width = setRef.current.offsetWidth
      if (width > 0) {
        singleWidthRef.current = width
      }
    }
  }, [])

  useEffect(() => {
    measureSetWidth()

    // Initialize scroll position to the middle set (Set 2)
    const el = containerRef.current
    if (el && singleWidthRef.current > 0) {
      el.scrollLeft = singleWidthRef.current
    }

    const handleResize = () => {
      measureSetWidth()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [measureSetWidth, masonryColumns])

  // Pause when off-screen to save CPU & battery
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Seamless Infinite Scroll Boundary Reset on Scroll Event
  const handleScroll = useCallback(() => {
    const el = containerRef.current
    const width = singleWidthRef.current
    if (!el || width <= 0) return

    // Seamless wrapping: when scrolled into the 3rd set, wrap back to the 2nd set
    if (el.scrollLeft >= width * 2) {
      el.scrollLeft -= width
    } else if (el.scrollLeft < width * 0.2) {
      // When dragged backward towards 1st set boundary, wrap forward to 2nd set
      el.scrollLeft += width
    }
  }, [])

  // ── High-Performance requestAnimationFrame Continuous Smooth Glide ──
  useEffect(() => {
    if (reduceMotion) return

    let lastTime = performance.now()

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      const el = containerRef.current
      const width = singleWidthRef.current

      if (
        el &&
        width > 0 &&
        !isHovered &&
        !isInteracting.current &&
        selectedItemIndex === null &&
        isInView &&
        !document.hidden
      ) {
        // Smooth ~38px per second continuous glide
        el.scrollLeft += 38 * dt

        if (el.scrollLeft >= width * 2) {
          el.scrollLeft -= width
        }
      }

      animFrameId.current = requestAnimationFrame(loop)
    }

    animFrameId.current = requestAnimationFrame(loop)

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [isHovered, selectedItemIndex, isInView, reduceMotion])

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    isDragging.current = true
    isInteracting.current = true
    hasMoved.current = false
    dragStartX.current = e.pageX - el.offsetLeft
    dragStartScroll.current = el.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return
    const el = containerRef.current
    const x = e.pageX - el.offsetLeft
    const walk = (x - dragStartX.current) * 1.3
    if (Math.abs(walk) > 4) {
      hasMoved.current = true
    }
    el.scrollLeft = dragStartScroll.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return
    isDragging.current = false
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isInteracting.current = false
    }, 1500)
  }

  // Touch handlers for mobile
  const handleTouchStart = () => {
    isInteracting.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }

  const handleTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isInteracting.current = false
    }, 2000)
  }

  // Card click handler (prevents modal opening if user was dragging)
  const handleCardClick = (index: number) => {
    if (hasMoved.current) {
      hasMoved.current = false
      return
    }
    setSelectedItemIndex(index)
  }

  // Smooth Chevron Scroll
  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    isInteracting.current = true
    const scrollAmount = direction === 'left' ? -380 : 380
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isInteracting.current = false
    }, 2200)
  }

  // Lightbox Handlers
  const handleClose = useCallback(() => setSelectedItemIndex(null), [])

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return
    setSelectedItemIndex((prev) => (prev! > 0 ? prev! - 1 : galleryItems.length - 1))
  }, [selectedItemIndex])

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return
    setSelectedItemIndex((prev) => (prev! < galleryItems.length - 1 ? prev! + 1 : 0))
  }, [selectedItemIndex])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedItemIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedItemIndex, handleNext, handlePrev, handleClose])

  const currentItem = selectedItemIndex !== null ? galleryItems[selectedItemIndex] : null

  return (
    <div className="w-full relative group/masonry">
      {/* ── Carousel Masonry Viewport (Infinite Horizontal Glide) ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          handleMouseUpOrLeave()
        }}
      >
        {/* Subtle Horizontal Edge Fades for Cinematic Endless Aesthetic */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background via-background/40 to-transparent z-10" />

        {/* Floating Prev/Next Buttons (Subtle on Hover) */}
        <button
          type="button"
          onClick={() => scrollByDirection('left')}
          aria-label="Scroll gallery left"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-background/85 hover:bg-background border border-border/80 text-foreground backdrop-blur-md shadow-lg opacity-0 group-hover/masonry:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer hidden sm:flex items-center justify-center"
        >
          <FaChevronLeft className="text-xs" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByDirection('right')}
          aria-label="Scroll gallery right"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-background/85 hover:bg-background border border-border/80 text-foreground backdrop-blur-md shadow-lg opacity-0 group-hover/masonry:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer hidden sm:flex items-center justify-center"
        >
          <FaChevronRight className="text-xs" aria-hidden="true" />
        </button>

        {/* Horizontal Scroll Track */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex overflow-x-auto py-1 scrollbar-none h-[360px] sm:h-[390px] md:h-[410px] select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Render 3 Identical Sets for Seamless Infinite Looping */}
          {[0, 1, 2].map((setIndex) => (
            <div
              key={`set-${setIndex}`}
              ref={setIndex === 0 ? setRef : undefined}
              aria-hidden={setIndex > 0}
              className="flex gap-3 sm:gap-3.5 shrink-0 pr-3 sm:pr-3.5"
            >
              {masonryColumns.map((col, colIdx) => {
                // ── TYPE 1: TALL FEATURE CARD (Full Height) ──
                if (col.type === 'tall') {
                  const { item, globalIndex } = col
                  return (
                    <div
                      key={`tall-${item.id}-${setIndex}-${colIdx}`}
                      onClick={() => handleCardClick(globalIndex)}
                      className="shrink-0 w-[230px] sm:w-[260px] h-full group/card relative rounded-2xl overflow-hidden border border-border/70 bg-zinc-950 hover:border-accent/60 transition-all duration-300 shadow-sm flex flex-col justify-between cursor-pointer"
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/25 opacity-80 group-hover/card:opacity-95 transition-opacity" />

                      <div className="relative z-10 p-3 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white font-bold border border-white/20 shadow-md truncate max-w-[170px]">
                          {item.tag}
                        </span>
                        <span className="p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover/card:opacity-100 transition-opacity">
                          <FaExpand className="text-[9px]" aria-hidden="true" />
                        </span>
                      </div>

                      <div className="relative z-10 p-3.5 space-y-1">
                        <div className="flex items-center justify-between text-[9.5px] font-mono text-zinc-300">
                          <span>{item.categoryLabel}</span>
                          <span className="tabular-nums">{item.date}</span>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-semibold text-white leading-snug group-hover/card:text-accent transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="pt-1 flex items-center gap-1 text-[10px] font-mono text-accent font-medium opacity-0 group-hover/card:opacity-100 transition-opacity">
                          <FaSearchPlus className="text-[9px]" />
                          <span>Inspect photo &bull; View details</span>
                        </div>
                      </div>
                    </div>
                  )
                }

                // ── TYPE 2: STACKED DUAL COLUMN (Two half-height cards stacked) ──
                if (col.type === 'stacked') {
                  const { topItem, topIndex, bottomItem, bottomIndex } = col
                  return (
                    <div
                      key={`stacked-${setIndex}-${colIdx}`}
                      className="shrink-0 w-[210px] sm:w-[240px] h-full flex flex-col gap-2.5 sm:gap-3"
                    >
                      {/* Top Card */}
                      <div
                        onClick={() => handleCardClick(topIndex)}
                        className="flex-1 relative rounded-2xl overflow-hidden border border-border/70 bg-zinc-950 hover:border-accent/60 transition-all duration-300 shadow-sm flex flex-col justify-between group/card cursor-pointer"
                      >
                        <img
                          src={topItem.src}
                          alt={topItem.title}
                          loading="lazy"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20 opacity-80 group-hover/card:opacity-95 transition-opacity" />

                        <div className="relative z-10 p-2.5 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[9.5px] font-mono uppercase tracking-wider text-white font-bold border border-white/20 shadow-md truncate max-w-[150px]">
                            {topItem.tag}
                          </span>
                          <span className="p-1 rounded-full bg-black/60 text-white opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <FaExpand className="text-[8px]" aria-hidden="true" />
                          </span>
                        </div>

                        <div className="relative z-10 p-2.5 space-y-0.5">
                          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-300">
                            <span className="truncate">{topItem.categoryLabel}</span>
                            <span className="tabular-nums">{topItem.date}</span>
                          </div>
                          <h3 className="text-xs font-semibold text-white truncate group-hover/card:text-accent transition-colors">
                            {topItem.title}
                          </h3>
                        </div>
                      </div>

                      {/* Bottom Card */}
                      <div
                        onClick={() => handleCardClick(bottomIndex)}
                        className="flex-1 relative rounded-2xl overflow-hidden border border-border/70 bg-zinc-950 hover:border-accent/60 transition-all duration-300 shadow-sm flex flex-col justify-between group/card cursor-pointer"
                      >
                        <img
                          src={bottomItem.src}
                          alt={bottomItem.title}
                          loading="lazy"
                          draggable={false}
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20 opacity-80 group-hover/card:opacity-95 transition-opacity" />

                        <div className="relative z-10 p-2.5 flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[9.5px] font-mono uppercase tracking-wider text-white font-bold border border-white/20 shadow-md truncate max-w-[150px]">
                            {bottomItem.tag}
                          </span>
                          <span className="p-1 rounded-full bg-black/60 text-white opacity-0 group-hover/card:opacity-100 transition-opacity">
                            <FaExpand className="text-[8px]" aria-hidden="true" />
                          </span>
                        </div>

                        <div className="relative z-10 p-2.5 space-y-0.5">
                          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-300">
                            <span className="truncate">{bottomItem.categoryLabel}</span>
                            <span className="tabular-nums">{bottomItem.date}</span>
                          </div>
                          <h3 className="text-xs font-semibold text-white truncate group-hover/card:text-accent transition-colors">
                            {bottomItem.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )
                }

                // ── TYPE 3: WIDE FEATURE CARD (Cinematic Width) ──
                if (col.type === 'wide') {
                  const { item, globalIndex } = col
                  return (
                    <div
                      key={`wide-${item.id}-${setIndex}-${colIdx}`}
                      onClick={() => handleCardClick(globalIndex)}
                      className="shrink-0 w-[290px] sm:w-[330px] md:w-[360px] h-full group/card relative rounded-2xl overflow-hidden border border-border/70 bg-zinc-950 hover:border-accent/60 transition-all duration-300 shadow-sm flex flex-col justify-between cursor-pointer"
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/25 opacity-80 group-hover/card:opacity-95 transition-opacity" />

                      <div className="relative z-10 p-3 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white font-bold border border-white/20 shadow-md">
                          {item.tag}
                        </span>
                        <span className="p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover/card:opacity-100 transition-opacity">
                          <FaExpand className="text-[9px]" aria-hidden="true" />
                        </span>
                      </div>

                      <div className="relative z-10 p-3.5 space-y-1 bg-gradient-to-t from-black/90 to-transparent">
                        <div className="flex items-center justify-between text-[9.5px] font-mono text-zinc-300">
                          <span>{item.categoryLabel}</span>
                          <span className="tabular-nums">{item.date}</span>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-semibold text-white leading-snug group-hover/card:text-accent transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-[11px] font-mono text-zinc-400 line-clamp-1 leading-relaxed">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  )
                }

                return null
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Fullscreen Interactive Lightbox Modal ── */}
      <AnimatePresence>
        {currentItem && selectedItemIndex !== null && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={currentItem.title}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-background border border-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-border bg-muted/40 shrink-0">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold">
                    {currentItem.tag}
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">
                    &bull; {currentItem.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close dialog"
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <FaTimes className="text-base" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Image Viewport (Centered) */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[380px] bg-black/95 flex items-center justify-center overflow-hidden">
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-h-[58vh] w-auto max-w-full object-contain mx-auto"
                />

                {/* Left/Right Lightbox Navigation Arrows */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrev()
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 transition-all cursor-pointer shadow-lg"
                >
                  <FaChevronLeft className="text-sm" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 hover:scale-110 transition-all cursor-pointer shadow-lg"
                >
                  <FaChevronRight className="text-sm" aria-hidden="true" />
                </button>
              </div>

              {/* Modal Caption & Details */}
              <div className="p-5 sm:p-6 bg-background border-t border-border shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-foreground">
                    {currentItem.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-accent" aria-hidden="true" />
                      <span className="tabular-nums">{currentItem.date}</span>
                    </span>
                    <span>
                      {selectedItemIndex + 1} of {galleryItems.length}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {currentItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InteractiveGallery
