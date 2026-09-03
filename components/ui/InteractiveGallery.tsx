'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCalendarAlt, FaTag } from 'react-icons/fa'

export interface GalleryItem {
  id: string
  src: string
  title: string
  category: 'aws' | 'civic' | 'hospital' | 'events' | 'apps'
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
    title: 'Better Trece Martires Civic Open Data Platform',
    category: 'civic',
    categoryLabel: 'Civic Tech & Open Data',
    date: '2026',
    caption: 'Public governance platform unifying DBM GAA national budget records, COA audit metrics, DPWH infrastructure, and bilingual citizen service charters.',
    tag: 'BetterGov Philippines',
  },
  {
    id: 'egov-hackathon',
    src: '/images/gallery/egov3.jpg',
    title: 'eGov Hackathon 2026 — Top 30 National Winner',
    category: 'civic',
    categoryLabel: 'Civic Tech & Open Data',
    date: '2026',
    caption: 'Collaborative development of e Buddy, the agentic citizen assistant delivering unified government service access and biometric verification.',
    tag: 'Top 30 National Finalist',
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
    src: '/images/gallery/sanbox echelon.jpg',
    title: 'Sandbox Innovation & Multi-Agent Swarm Ideation',
    category: 'events',
    categoryLabel: 'Events & Conferences',
    date: '2026',
    caption: 'Exploration and architecture blueprinting for autonomous multi-agent coding swarms (Pixel Crew) and AST symbol-graph context engines.',
    tag: 'Sandbox ',
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

const categories = [
  { key: 'all', label: 'All Artifacts' },
  { key: 'aws', label: 'AWS & Hackathons' },
  { key: 'civic', label: 'Civic Tech & Open Data' },
  { key: 'hospital', label: 'Hospital & Enterprise IT' },
  { key: 'events', label: 'Events & Summits' },
  { key: 'apps', label: 'Mobile & SaaS Apps' },
]

export function InteractiveGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  // Scroll carousel left/right
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 380
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Lightbox Handlers
  const handleClose = useCallback(() => setSelectedItemIndex(null), [])

  const handlePrev = useCallback(() => {
    if (selectedItemIndex === null) return
    setSelectedItemIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))
  }, [selectedItemIndex, filteredItems.length])

  const handleNext = useCallback(() => {
    if (selectedItemIndex === null) return
    setSelectedItemIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))
  }, [selectedItemIndex, filteredItems.length])

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

  const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null

  return (
    <div className="w-full space-y-4">
      {/* Top Controls Row: Category Pills + Navigation Arrows */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.key)
                  setSelectedItemIndex(null)
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer border ${isActive
                    ? 'bg-foreground text-background border-foreground shadow-xs'
                    : 'bg-muted/50 text-muted-foreground border-border/80 hover:border-accent/40 hover:text-foreground'
                  }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            aria-label="Scroll gallery carousel left"
            className="p-2.5 rounded-full bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-colors shadow-2xs hover:scale-105"
          >
            <FaChevronLeft className="text-xs" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            aria-label="Scroll gallery carousel right"
            className="p-2.5 rounded-full bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-colors shadow-2xs hover:scale-105"
          >
            <FaChevronRight className="text-xs" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Compact Horizontal Scrollable Carousel Track */}
      <div
        ref={carouselRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto py-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedItemIndex(idx)}
            className="snap-start shrink-0 w-[270px] sm:w-[320px] md:w-[360px] group relative rounded-2xl overflow-hidden border border-border/70 bg-muted/30 backdrop-blur-xs hover:border-accent/60 transition-all duration-300 shadow-sm cursor-pointer flex flex-col justify-between"
          >
            {/* Image Thumbnail Container (Centered) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-background flex items-center justify-center">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-50 group-hover:opacity-75 transition-opacity" />

              {/* Top Tag Badge (High-Contrast Visible Text) */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-white font-bold border border-white/20 shadow-md">
                  {item.tag}
                </span>
              </div>

              {/* Expand Icon on Hover */}
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <FaExpand className="text-[10px]" aria-hidden="true" />
              </div>
            </div>

            {/* Card Footer Details */}
            <div className="p-3.5 bg-background/90 border-t border-border/50">
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground mb-1">
                <span>{item.categoryLabel}</span>
                <span className="tabular-nums">{item.date}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-background border border-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-border bg-muted/40 shrink-0">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold">
                    {currentItem.tag}
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">&bull; {currentItem.categoryLabel}</span>
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
                    <span>{selectedItemIndex + 1} of {filteredItems.length}</span>
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
