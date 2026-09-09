'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaHandshake,
  FaClock,
  FaLightbulb,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaEnvelope,
  FaLinkedin,
  FaFilePdf,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaCode,
  FaQuoteLeft,
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'

// ── Accurate Project Carousel Data with Authentic Details ──
const row1Projects = [
  {
    id: 'tearsize',
    title: 'Tearsize',
    detail: 'E-commerce storefront with mobile checkout & automated fulfillment',
    image: '/images/tearsize.jpg',
  },
  {
    id: 'saktoka',
    title: 'sakto ka',
    detail: 'Stateless AI career copilot, ATS resume studio & STAR interview prep',
    image: '/images/saktoka.png',
  },
  {
    id: 'pixelcrew',
    title: 'Pixel Crew',
    detail: 'Autonomous 23-agent software engineering swarm with anti-slop engine',
    image: '/images/pixelcrew.png',
  },
  {
    id: 'ebuddy',
    title: 'eBuddy',
    detail: 'Top 30 National Winner at eGov Hackathon • AI citizen public service assistant',
    image: '/images/egov.png',
  },
  {
    id: 'finops',
    title: 'FinOps AI Dashboard',
    detail: 'Winner Best Business Impact at AWS BGC • Cloud financial operations',
    image: '/images/finops.jpg',
  },
  {
    id: 'vcm',
    title: 'VCM HRIS',
    detail: 'Enterprise HR, QR vicinity attendance & automated statutory payroll',
    image: '/images/vcm.jpg',
  },
]

const row2Projects = [
  {
    id: 'bettertrece',
    title: 'Better Trece Martires',
    detail: 'Civic open data & municipal budget transparency platform',
    image: '/images/bettertrece.png',
  },
  {
    id: 'pacementor',
    title: 'PaceMentor',
    detail: 'AI running coach with dynamic training plans & Strava integration',
    image: '/images/pcaementor.jpg',
  },
  {
    id: 'presentpo',
    title: 'Present Po',
    detail: 'Workforce time tracking with geofenced attendance & automated reports',
    image: '/images/presentpo.jpg',
  },
  {
    id: 'hivesync',
    title: 'HiveSync VA',
    detail: 'Virtual assistant agency platform with automated blog syndication',
    image: '/images/hivesync.jpg',
  },
  {
    id: 'tmrc',
    title: 'TMRC',
    detail: 'Trece Martirez Running Club community hub & race results archive',
    image: '/images/tmrc.jpg',
  },
  {
    id: 'saktoka-ats',
    title: 'sakto ka ATS Studio',
    detail: 'Single-column ATS resume engine scoring 90%+ on Workday & Lever',
    image: '/images/saktoka.png',
  },
]

// ── Client Testimonials Data (Aligned with Real Projects) ──
interface ClientTestimonial {
  quote: string
  clientName: string
  clientRole: string
  company: string
  project: string
  highlightMetric: string
}

const clientTestimonials: ClientTestimonial[] = [
  {
    quote:
      'Arnel engineered our entire digital storefront from scratch in just 3 weeks. The checkout flow is blazing fast (under 1.5s), automated order notifications work flawlessly, and our mobile conversion rate jumped immediately after launch. He thinks like a true founder.',
    clientName: 'D2C Brand Executive',
    clientRole: 'Co-Founder & COO',
    company: 'Tearsize Wellness',
    project: 'Tearsize E-Commerce Storefront',
    highlightMetric: 'Sub-1.5s Checkout Speed',
  },
  {
    quote:
      'Working with Arnel was effortless. He took our concept for an ATS candidate screening tool and transformed it into a consumer-ready AI platform. Over 1,000 jobseekers used it in the first month with zero server-side retention. His attention to UX is second to none.',
    clientName: 'Talent Tech Lead',
    clientRole: 'Product Director',
    company: 'sakto ka Career Copilot',
    project: 'sakto ka AI Career Platform',
    highlightMetric: '90%+ Screening Pass Rate',
  },
  {
    quote:
      'The QR-code based attendance and automated statutory payroll system Arnel developed eliminated manual timesheet errors across academic departments and cut payroll processing time by days. Flawless reliability and system integrity.',
    clientName: 'Campus Operations Director',
    clientRole: 'Head of Administrative Systems',
    company: 'VCM Academic Institution',
    project: 'VCM HRIS & Statutory Payroll',
    highlightMetric: 'Automated Payroll Engine',
  },
  {
    quote:
      'Selected among the Top 30 National Winners at the National eGov PH Hackathon out of 180+ teams. Arnel built an AI citizen companion navigating statutory government requirements with 100% grounded official citations. Remarkable technical execution.',
    clientName: 'National Hackathon Jury',
    clientRole: 'GovTech Evaluation Panel',
    company: 'National eGov Hackathon 2026',
    project: 'eBuddy Citizen AI Assistant',
    highlightMetric: 'Top 30 National Winner',
  },
  {
    quote:
      'Awarded Best Business Impact at AWS BGC. Arnel automated enterprise expense reconciliation, invoice-to-PO matching, and policy anomaly detection with sub-second audit triggers. He translates complex cloud telemetry into clear business ROI.',
    clientName: 'Solutions Architect & Judge',
    clientRole: 'AWS Enterprise Review Panel',
    company: 'AWS Quick Quest BGC',
    project: 'FinOps AI Dashboard',
    highlightMetric: 'Winner — Best Business Impact',
  },
  {
    quote:
      'Arnel built our virtual assistant agency platform with automated blog syndication and consultation booking. The lead conversion flows operate smoothly with zero maintenance overhead. An outstanding engineer to partner with.',
    clientName: 'Agency Founder',
    clientRole: 'Managing Director',
    company: 'HiveSync VA',
    project: 'HiveSync VA Web Platform',
    highlightMetric: 'Automated Blog & Lead Engine',
  },
]

const servicesList = [
  {
    icon: FaRocket,
    title: 'Custom Web & Mobile Applications',
    subtitle: 'From Concept to High-Converting Reality',
    description:
      'Modern, blazing-fast web applications tailored to your exact business workflows. Whether you need a customer-facing SaaS portal, e-commerce flow, or internal tool, I deliver clean products that delight your users and convert visitors into loyal customers.',
    deliverables: [
      'Responsive design across phone, tablet, and desktop',
      'Frictionless user onboarding & checkout flows',
      'High-speed page loads (under 1.5s) optimized for SEO',
      'Secure authentication & reliable database architecture',
    ],
  },
  {
    icon: HiSparkles,
    title: 'AI Automations & Smart Workflows',
    subtitle: 'Multiply Your Team’s Output',
    description:
      'Practical, reliable AI solutions that remove human bottlenecks. From bespoke customer support assistants and automated document processing to intelligent data extraction, I turn cutting-edge AI into measurable operational time savings.',
    deliverables: [
      'Custom conversational assistants grounded in your business data',
      'Automated email, inquiry, and lead triage systems',
      'Intelligent document and resume extraction workflows',
      'Data privacy compliance with zero unnecessary storage',
    ],
  },
  {
    icon: FaChartLine,
    title: 'UI/UX Design & High-Impact Redesigns',
    subtitle: 'Build Trust and Elevate Brand Authority',
    description:
      'First impressions make or break deals. If your current website looks dated, confusing, or clunky, I transform it into a sleek, premium, and trustworthy digital experience that immediately communicates your value and commands premium pricing.',
    deliverables: [
      'Eye-pleasing, bespoke visual identity (no cookie-cutter templates)',
      'Simplified user journeys that eliminate drop-offs',
      'Accessibility compliance (WCAG 2.1 standards)',
      'Smooth micro-interactions that make your product feel alive',
    ],
  },
  {
    icon: FaLightbulb,
    title: 'Rapid MVP Launch in Weeks',
    subtitle: 'Test the Market Before Overspending',
    description:
      'Don’t waste six months building in the dark. I help you clarify your core value proposition, eliminate non-essential complexity, and ship a launch-ready Minimum Viable Product to real users in 2 to 4 weeks so you can validate demand and raise capital.',
    deliverables: [
      'Focused scope mapping & user story definition',
      'Rapid prototype to working production software',
      'Live staging environment with weekly progress reviews',
      'Clean hand-off documentation for your long-term growth',
    ],
  },
]

const clientGuarantees = [
  {
    icon: FaClock,
    title: '100% On-Time Milestone Delivery',
    description:
      'Every project runs on structured sprint milestones. You get clear timelines, agreed deliverables, and regular live preview demos. No radio silence, no surprise delays.',
  },
  {
    icon: FaHandshake,
    title: 'Transparent & Collaborative Communication',
    description:
      'Direct communication via Slack, WhatsApp, or Email. You speak directly with the engineer building your product, ensuring complete alignment every step of the way.',
  },
  {
    icon: FaShieldAlt,
    title: 'Zero Hand-Off Headaches & Full Ownership',
    description:
      'You own 100% of your code, design assets, and intellectual property. Includes thorough walkthrough recordings, documentation, and 30-day post-launch warranty support.',
  },
  {
    icon: FaStar,
    title: 'Business-First Mindset',
    description:
      'I don’t just write code; I think about your customer acquisition, conversion rates, and operating costs to ensure the final product delivers genuine return on investment.',
  },
]

interface ClientBusinessViewProps {
  onSwitchToTechMode?: () => void
}

export function ClientBusinessView({ onSwitchToTechMode }: ClientBusinessViewProps) {
  const reduce = useReducedMotion()
  const [inquiryType, setInquiryType] = useState('New Web Application / SaaS')
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    message: '',
    timeline: 'Within 2–4 Weeks',
  })

  // ── Full-Width Reviews Carousel State (Clean 6.5s Timer, Zero Frame Churn) ──
  const [activeReviewIdx, setActiveReviewIdx] = useState(0)
  const [isReviewAutoplay, setIsReviewAutoplay] = useState(true)

  useEffect(() => {
    if (!isReviewAutoplay) return
    const timer = setInterval(() => {
      setActiveReviewIdx((curr) => (curr + 1) % clientTestimonials.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [isReviewAutoplay])

  const handleSelectReview = (idx: number) => {
    setActiveReviewIdx(idx)
  }

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length)
  }

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % clientTestimonials.length)
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project Inquiry: ${inquiryType} (${inquiryForm.name})`)
    const body = encodeURIComponent(
      `Hi Arnel,\n\nName: ${inquiryForm.name}\nEmail: ${inquiryForm.email}\nProject Type: ${inquiryType}\nTarget Timeline: ${inquiryForm.timeline}\n\nProject Details:\n${inquiryForm.message}\n\nLooking forward to hearing from you!`
    )
    window.open(`mailto:arnelbaylon0@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setInquirySubmitted(true)
  }

  // Duplicate arrays for smooth continuous infinite loop
  const infiniteRow1 = [...row1Projects, ...row1Projects]
  const infiniteRow2 = [...row2Projects, ...row2Projects]

  const currentReview = clientTestimonials[activeReviewIdx]

  return (
    <div className="w-full min-h-screen text-foreground relative overflow-x-hidden">
      
      {/* ── Discreet Top Mode Switcher Link (No eyebrows) ── */}
      {onSwitchToTechMode && (
        <div className="w-full px-6 sm:px-12 lg:px-20 pt-6 pb-2 flex justify-end">
          <button
            type="button"
            onClick={onSwitchToTechMode}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 hover:bg-muted border border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-colors duration-150 shadow-xs cursor-pointer group backdrop-blur-md"
          >
            <FaCode className="w-3.5 h-3.5 text-amber-500 transition-transform group-hover:scale-110" />
            <span>Developer View</span>
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN HERO SECTION (Centered, Bold, Zero Cards, No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-24 py-16 scroll-mt-12 relative"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center my-auto">
          
          {/* Main Headline (SSR-Immediate Paint for Fast LCP) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.08] mb-8">
            Turning ambitious ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
              high-impact digital products
            </span>{' '}
            that scale your business.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-12 font-normal">
            Full-stack product engineer partnering with founders and enterprises to design, build, and launch
            exceptional web applications, intelligent AI workflows, and high-converting digital experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-16">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.99] transition-[opacity,transform] duration-200 shadow-lg group text-base"
            >
              <span>Explore Projects</span>
              <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-card border border-border hover:bg-muted/70 text-foreground font-medium transition-colors duration-150 shadow-xs text-base"
            >
              <span>Book a Consultation</span>
            </a>

            <a
              href="/pdf/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <FaFilePdf className="w-4 h-4 text-red-500" />
              <span>Executive Résumé (PDF)</span>
            </a>
          </div>

          {/* Clean Metric Ribbon (Zero Cards) */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-8 border-t border-border/60 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 sm:gap-x-12 text-xs sm:text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>100% On-Time Milestone Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>3x Faster Time-to-Market</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>30–60% Operational Efficiency Gains</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Top 30 National Recognition</span>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/60 text-xs pointer-events-none">
          <span>Scroll to explore</span>
          <FaChevronDown className="w-3 h-3 animate-bounce" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROJECTS (Slanted Carousel with Accurate Details, No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="w-full py-24 sm:py-32 border-t border-border/60 scroll-mt-12 overflow-hidden bg-muted/15 dark:bg-[#06070d]/60"
      >
        {/* Section Header (No Eyebrows) */}
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Projects
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            A visual showcase of shipped web applications, e-commerce storefronts, and AI automations.
          </p>
        </div>

        {/* 2-Line Infinite Carousel Container with Edge Gradient Masks */}
        <div className="relative w-full overflow-hidden space-y-8 sm:space-y-12 py-6">
          
          {/* Edge Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

          {/* ── LINE 1: Scrolling Left with Slanted Cards ── */}
          <div className="flex overflow-visible py-6 sm:py-8">
            <div className="animate-infinite-carousel flex gap-8 sm:gap-10 items-stretch px-4">
              {infiniteRow1.map((item, idx) => (
                <div
                  key={`row1-${item.id}-${idx}`}
                  className="relative w-[320px] sm:w-[420px] md:w-[480px] aspect-[16/10] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-[3deg] hover:rotate-0 hover:scale-105 hover:z-20 transition-transform duration-500 ease-out bg-card group select-none cursor-pointer transform-gpu"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 320px, 480px"
                    quality={60}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Bottom Gradient for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  {/* Small Details Overlay (Accurate & No Eyebrows) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between gap-3 text-white pointer-events-none">
                    <div className="overflow-hidden">
                      <div className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-md truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                    <div className="shrink-0 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── LINE 2: Scrolling Right with Slanted Cards ── */}
          <div className="flex overflow-visible py-6 sm:py-8">
            <div className="animate-infinite-carousel-reverse flex gap-8 sm:gap-10 items-stretch px-4">
              {infiniteRow2.map((item, idx) => (
                <div
                  key={`row2-${item.id}-${idx}`}
                  className="relative w-[320px] sm:w-[420px] md:w-[480px] aspect-[16/10] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-[3deg] hover:rotate-0 hover:scale-105 hover:z-20 transition-transform duration-500 ease-out bg-card group select-none cursor-pointer transform-gpu"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 320px, 480px"
                    quality={60}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Bottom Gradient for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  {/* Small Details Overlay (Accurate & No Eyebrows) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between gap-3 text-white pointer-events-none">
                    <div className="overflow-hidden">
                      <div className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-md truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                    <div className="shrink-0 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Carousel Note (No Eyebrows) */}
        <div className="text-center text-xs text-muted-foreground mt-4">
          <span>Continuous stream of live client work &bull; Hover over any project to pause</span>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          WHAT CLIENTS SAY ABOUT ME (Full Width Carousel, No Category Buttons)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-24 sm:py-32 border-t border-border/60 scroll-mt-12 overflow-hidden bg-muted/10 dark:bg-black/20"
      >
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Section Header (No Eyebrows) */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              What Clients Say About Me
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3">
              Real feedback from startup founders, product managers, and enterprise directors.
            </p>
          </div>

          {/* Carousel Container */}
          <div
            className="relative w-full"
            onMouseEnter={() => setIsReviewAutoplay(false)}
            onMouseLeave={() => setIsReviewAutoplay(true)}
          >
            {/* Top Controls Bar */}
            <div className="flex items-center justify-between mb-6 px-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-foreground text-sm">
                  0{activeReviewIdx + 1} <span className="text-muted-foreground/50">/ 0{clientTestimonials.length}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsReviewAutoplay(!isReviewAutoplay)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground text-[11px] font-medium transition-colors cursor-pointer"
                  aria-label={isReviewAutoplay ? 'Pause reviews autoplay' : 'Resume reviews autoplay'}
                >
                  {isReviewAutoplay ? <FaPause className="w-2.5 h-2.5" /> : <FaPlay className="w-2.5 h-2.5" />}
                  <span>{isReviewAutoplay ? 'Auto-playing' : 'Paused'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevReview}
                  className="w-10 h-10 rounded-full bg-card border border-border hover:bg-muted hover:border-amber-500/50 flex items-center justify-center text-foreground transition-colors duration-150 cursor-pointer shadow-xs active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextReview}
                  className="w-10 h-10 rounded-full bg-card border border-border hover:bg-muted hover:border-amber-500/50 flex items-center justify-center text-foreground transition-colors duration-150 cursor-pointer shadow-xs active:scale-95"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Full Width Spotlight Card */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIdx}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative w-full p-8 sm:p-12 lg:p-16 rounded-[2.5rem] bg-card border border-amber-500/30 dark:border-amber-500/35 shadow-[0_24px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.55)] flex flex-col justify-between overflow-hidden"
                >
                  {/* Autoplay Progress Line at Top (100% GPU-Composited scaleX Keyframes, 0 State Updates) */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-border/40 overflow-hidden">
                    <div
                      key={activeReviewIdx}
                      className="h-full w-full bg-gradient-to-r from-amber-500 to-amber-400 origin-left will-change-transform"
                      style={{
                        animation: isReviewAutoplay ? 'reviewProgress 6.5s linear forwards' : 'none',
                        transformOrigin: 'left',
                      }}
                    />
                  </div>

                  <div>
                    {/* Header: Stars & Verified Highlight Metric (WCAG AAA Contrast) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pt-1">
                      <div className="flex items-center gap-1.5 text-amber-500 text-base sm:text-lg">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-600/15 dark:bg-emerald-400/20 px-3.5 py-1 rounded-full border border-emerald-600/30 dark:border-emerald-400/35">
                        {currentReview.highlightMetric}
                      </span>
                    </div>

                    {/* Large Quote */}
                    <div className="relative mb-10">
                      <FaQuoteLeft className="w-10 h-10 sm:w-14 sm:h-14 text-amber-500/15 dark:text-amber-500/20 absolute -top-5 -left-3 pointer-events-none" />
                      <p className="relative text-lg sm:text-2xl lg:text-3xl text-foreground font-normal leading-relaxed">
                        &ldquo;{currentReview.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Client Info Footer */}
                  <div className="pt-8 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950 font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
                        {currentReview.clientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg text-foreground">
                          {currentReview.clientName}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {currentReview.clientRole} &bull; <span className="text-foreground font-semibold">{currentReview.company}</span>
                        </div>
                        <div className="text-xs text-amber-700 dark:text-amber-300 mt-0.5 font-semibold">
                          {currentReview.project}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600/15 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-600/30 dark:border-emerald-400/35">
                      <FaCheckCircle className="w-3.5 h-3.5" />
                      <span>Verified Client Endorsement</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clean Dot Indicators (Accessible >=36px Touch Target Hit Area) */}
            <div className="flex items-center justify-center gap-1 mt-8">
              {clientTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectReview(idx)}
                  className="p-2.5 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer group rounded-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`h-2 rounded-full ${
                      activeReviewIdx === idx
                        ? 'w-8 bg-amber-500'
                        : 'w-2 bg-border group-hover:bg-muted-foreground/50'
                    }`}
                  />
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          COMPREHENSIVE CLIENT SERVICES (No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto py-24 sm:py-32 border-t border-border/60 scroll-mt-12"
      >
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            How I Can Help Your Business Grow
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3">
            From early strategy and design to production deployment and AI-driven efficiency.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {servicesList.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-8 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                      <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 mt-0.5">
                        {service.subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-semibold text-foreground">
                      Key Deliverables
                    </div>
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <FaCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-end text-xs">
                  <a
                    href="#contact"
                    className="font-semibold text-foreground hover:text-amber-500 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inquire about this service</span>
                    <FaArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          THE PARTNERSHIP STANDARD (No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="standards"
        className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto py-24 sm:py-32 border-t border-border/60 scroll-mt-12"
      >
        <div className="max-w-2xl mb-16 text-center mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            The Standard of Collaboration
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3">
            No endless agency meetings, no junior handoffs, no hidden fees. Just direct, top-tier execution.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientGuarantees.map((guarantee, idx) => {
            const Icon = guarantee.icon
            return (
              <motion.div
                key={guarantee.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-muted/60 dark:bg-white/[0.05] border border-border/60 flex items-center justify-center text-amber-500 mb-5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {guarantee.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          EXECUTIVE CONSULTATION & DIRECT INQUIRY (No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto py-24 sm:py-32 border-t border-border/60 scroll-mt-12"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              Let’s Build Something Great Together
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Whether you need to launch a new web application from scratch, integrate AI automations, or revamp an existing product, let’s explore how we can achieve your goals.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:arnelbaylon0@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border/80 hover:border-amber-500/50 text-foreground transition-colors duration-150 group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Direct Email</div>
                  <div className="text-sm font-semibold group-hover:text-amber-500 transition-colors">
                    arnelbaylon0@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/arnel-baylon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border/80 hover:border-blue-500/50 text-foreground transition-colors duration-150 group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <FaLinkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Professional Profile</div>
                  <div className="text-sm font-semibold group-hover:text-blue-500 transition-colors">
                    linkedin.com/in/arnel-baylon
                  </div>
                </div>
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-muted/40 border border-border/60 text-xs text-muted-foreground space-y-1.5">
              <div className="font-semibold text-foreground text-sm">Availability &amp; Timezone</div>
              <div>Primary Timezone: GMT+8 (Asia/Manila) • Flexible overlap with US &amp; European schedules</div>
              <div>Typical project kickoff turnaround: 5 to 7 business days</div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-card border border-border/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
              {inquirySubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto mb-4">
                    <FaCheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Inquiry Prepared!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Your email client has opened with your inquiry prefilled. Feel free to send it or reach out directly to{' '}
                    <strong className="text-foreground">arnelbaylon0@gmail.com</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquirySubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Book a Project Strategy Session
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Share a few details about what you’d like to build and I’ll get back to you within 24 hours.
                    </p>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2">
                      What type of project are you planning?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'New Web App / SaaS',
                        'AI & Automation',
                        'UI/UX Redesign',
                        'Advisory / Other',
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-colors duration-150 cursor-pointer ${
                            inquiryType === type
                              ? 'bg-amber-500/15 border-amber-500/50 text-amber-700 dark:text-amber-300 font-semibold shadow-xs'
                              : 'bg-muted/30 border-border/60 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-medium text-foreground mb-1">
                        Your Name / Organization
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="Jane Doe (Acme Corp)"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-email" className="block text-xs font-medium text-foreground mb-1">
                        Your Email Address
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                      />
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div>
                    <label htmlFor="launch-timeline" className="block text-xs font-medium text-foreground mb-1">
                      Target Launch Timeline
                    </label>
                    <select
                      id="launch-timeline"
                      name="timeline"
                      aria-label="Target Launch Timeline"
                      value={inquiryForm.timeline}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                    >
                      <option value="Urgent (1–2 Weeks)">Urgent (1–2 Weeks)</option>
                      <option value="Standard (2–4 Weeks)">Standard (2–4 Weeks)</option>
                      <option value="Flexible (1–2 Months)">Flexible (1–2 Months)</option>
                      <option value="Exploring Feasibility">Just exploring feasibility</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-medium text-foreground mb-1">
                      Project Goals &amp; Overview
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      required
                      rows={3}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Briefly describe what problem you want to solve, desired features, or reference links..."
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.99] transition-[opacity,transform] duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Project Inquiry</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center text-[11px] text-muted-foreground">
                    Direct reply guaranteed within 24 hours &bull; Non-Disclosure Agreement (NDA) respected
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
