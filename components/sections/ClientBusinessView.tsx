'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaCode,
  FaLinkedin,
  FaTiktok,
  FaEnvelope,
} from 'react-icons/fa'

// ── Accurate Project Carousel Data with Authentic Details (Friendly, Non-Tech Copy) ──
const row1Projects = [
  {
    id: 'tearsize',
    title: 'Tearsize',
    detail: 'Online clothing store with fast mobile checkout and instant order updates',
    image: '/images/tearsize.jpg',
  },
  {
    id: 'saktoka',
    title: 'sakto ka',
    detail: 'AI career assistant that writes job-winning resumes and prepares you for interviews',
    image: '/images/saktoka.png',
  },
  {
    id: 'pixelcrew',
    title: 'Pixel Crew',
    detail: 'Smart AI workspace where virtual assistants collaborate to build clean software',
    image: '/images/pixelcrew.png',
  },
  {
    id: 'ebuddy',
    title: 'eBuddy',
    detail: 'Award-winning AI guide that helps everyday citizens navigate government paperwork',
    image: '/images/egov.png',
  },
  {
    id: 'finops',
    title: 'FinOps AI Dashboard',
    detail: 'Award-winning dashboard that helps companies track and reduce software costs',
    image: '/images/finops.jpg',
  },
  {
    id: 'vcm',
    title: 'VCM HRIS',
    detail: 'Staff management platform with phone QR check-ins and automatic payroll calculation',
    image: '/images/vcm.jpg',
  },
]

const row2Projects = [
  {
    id: 'bettertrece',
    title: 'Better Trece Martires',
    detail: 'Community website that shares local town budgets and public projects in simple terms',
    image: '/images/bettertrece.png',
  },
  {
    id: 'pacementor',
    title: 'PaceMentor',
    detail: 'Personal running coach app with customized workout schedules and fitness tracking',
    image: '/images/pcaementor.jpg',
  },
  {
    id: 'presentpo',
    title: 'Present Po',
    detail: 'Employee attendance tracker that verifies locations and generates daily timesheets',
    image: '/images/presentpo.jpg',
  },
  {
    id: 'hivesync',
    title: 'HiveSync VA',
    detail: 'Business website with online appointment booking and automatic blog publishing',
    image: '/images/hivesync.jpg',
  },
  {
    id: 'tmrc',
    title: 'TMRC',
    detail: 'Local running club website with event sign-ups and official race leaderboards',
    image: '/images/tmrc.jpg',
  },
  {
    id: 'saktoka-ats',
    title: 'sakto ka Resume Builder',
    detail: 'Resume builder designed to help job seekers stand out and get hired faster',
    image: '/images/saktoka.png',
  },
]

// ── Client Testimonials Data (Friendly, Authentic Reviews) ──
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
      'Arnel built our entire online store from scratch in just 3 weeks. The checkout is super fast and smooth on phones, order updates are sent automatically, and our sales went up right after launch. He genuinely cares about our business and thinks like a true founder.',
    clientName: 'D2C Brand Founder',
    clientRole: 'Co-Founder & COO',
    company: 'Tearsize Wellness',
    project: 'Tearsize Online Store',
    highlightMetric: 'Fast Mobile Checkout',
  },
  {
    quote:
      'Working with Arnel was effortless. He took our rough idea for an AI career tool and transformed it into a finished, easy-to-use web app. Over 1,000 job seekers used it in the first month without any hiccups. His attention to design and user experience is second to none.',
    clientName: 'Career Platform Founder',
    clientRole: 'Product Director',
    company: 'sakto ka Career App',
    project: 'sakto ka AI Career Platform',
    highlightMetric: '1,000+ First-Month Users',
  },
  {
    quote:
      'The QR code attendance and automatic payroll system Arnel created eliminated all manual timesheet mistakes and cut our payday prep time by days. It has been completely reliable and our staff loves how simple it is to use on their phones.',
    clientName: 'Campus Operations Director',
    clientRole: 'Head of Administrative Systems',
    company: 'VCM Academic Institution',
    project: 'VCM Staff & Payroll System',
    highlightMetric: 'Saved Days on Payroll',
  },
  {
    quote:
      'Selected among the Top 30 National Winners at the National eGov PH Hackathon out of 180+ teams. Arnel built a friendly AI assistant that guides everyday citizens through official government requirements and paperwork step-by-step.',
    clientName: 'National Innovation Jury',
    clientRole: 'Evaluation Panel',
    company: 'National eGov Awards',
    project: 'eBuddy Public Guide',
    highlightMetric: 'Top 30 National Winner',
  },
  {
    quote:
      'Awarded Best Business Impact at AWS. Arnel built an intelligent dashboard that tracks company software expenses, flags billing mistakes, and finds savings in seconds. He translates complicated numbers into real business savings.',
    clientName: 'Solutions Architect & Judge',
    clientRole: 'AWS Innovation Panel',
    company: 'AWS Challenge',
    project: 'FinOps AI Dashboard',
    highlightMetric: 'Best Business Impact Winner',
  },
  {
    quote:
      'Arnel built our virtual assistant agency website with automated appointment booking and article publishing. New client inquiries come straight to our inbox, and the site runs smoothly without any tech headaches. An outstanding partner.',
    clientName: 'Agency Founder',
    clientRole: 'Managing Director',
    company: 'HiveSync VA',
    project: 'HiveSync Agency Website',
    highlightMetric: 'Automated Booking Engine',
  },
]

interface FAQItem {
  tag: string
  category: string
  question: string
  answer: string
}

const clientFaqs: FAQItem[] = [
  {
    tag: '01',
    category: 'Timeline & Delivery',
    question: 'How quickly can we build and launch my website or app?',
    answer:
      'Most projects go from initial idea to live launch in just 2 to 4 weeks. Every week, I send you a test link you can open on your phone or computer to try out progress in real time. You always know exactly where things stand, with zero surprise delays.',
  },
  {
    tag: '02',
    category: 'Pricing & Value',
    question: 'How does pricing work? Are there any hidden fees?',
    answer:
      'Pricing is straightforward and transparent. For new builds, we agree on a clear, fixed project price before we start—so you know exactly what you are paying with zero surprise bills. If you need ongoing help, simple monthly plans are also available. No agency markups, no hidden costs.',
  },
  {
    tag: '03',
    category: 'Ownership & Control',
    question: 'Do I own 100% of everything we create?',
    answer:
      'Yes, absolutely. You own all rights, design files, accounts, and website assets from day one. When we launch, I provide easy-to-follow video walkthroughs and clean handoff files so you or your team have total control and never feel locked into any service.',
  },
  {
    tag: '04',
    category: 'What We Build',
    question: 'What kind of websites, apps, and smart features can you build?',
    answer:
      'I build fast, modern websites, online stores, customer portals, and custom web tools tailored to your daily operations. I also build smart AI assistants that can automatically answer customer questions, organize information, or handle repetitive tasks using your business data.',
  },
  {
    tag: '05',
    category: 'Support & Warranty',
    question: 'What happens after we launch? Do you provide help if something breaks?',
    answer:
      'Yes! Every project includes 30 days of free support after launch. I am right there to fix any issues, make sure everything runs smoothly, and answer any questions. If you want continued support or new features down the road, flexible monthly check-ins are always available.',
  },
  {
    tag: '06',
    category: 'Communication',
    question: 'How will we stay in touch during the project?',
    answer:
      'You work directly with me—never passed off to junior staff or middle managers. We can chat wherever you are most comfortable, such as WhatsApp, Slack, or Email. I send regular progress updates and we can hop on friendly video calls to review everything together whenever you’d like.',
  },
]

interface ClientBusinessViewProps {
  onSwitchToTechMode?: () => void
}

export function ClientBusinessView({ onSwitchToTechMode }: ClientBusinessViewProps) {
  const reduce = useReducedMotion()
  const [inquiryType, setInquiryType] = useState('New Website or App')
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    message: '',
    timeline: 'Standard pace (2–4 weeks)',
  })

  // ── Full-Width Reviews Carousel State (Clean 6.5s Timer, Zero Frame Churn) ──
  const [activeReviewIdx, setActiveReviewIdx] = useState(0)
  const [isReviewAutoplay, setIsReviewAutoplay] = useState(true)

  // ── FAQ Accordion State (No Cards) ──
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx))
  }


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
          EXECUTIVE HERO SECTION (Zero Cards, No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-24 py-16 scroll-mt-12 relative"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center my-auto">
          
          {/* Main Headline (Direct Leading Element, No Eyebrows) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.06] mb-8">
            Turning ambitious ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
              high-impact digital products
            </span>{' '}
            that scale your business.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-12 font-normal">
            I partner with founders and business owners to design, build, and launch custom websites, easy-to-use web apps, and smart automations that save you time and grow your revenue.
          </p>

          {/* Direct Social Links (Clean, Borderless, Zero Containers) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-16 text-sm sm:text-base">
            <a
              href="https://www.linkedin.com/in/arnel-baylon-b05233189"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4 text-[#0A66C2] transition-transform group-hover:scale-110" />
              <span className="font-medium underline-offset-4 group-hover:underline">LinkedIn</span>
            </a>

            <a
              href="https://www.tiktok.com/@yheelllls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
              aria-label="TikTok Profile"
            >
              <FaTiktok className="w-4 h-4 text-foreground transition-transform group-hover:scale-110" />
              <span className="font-medium underline-offset-4 group-hover:underline">TikTok</span>
            </a>

            <a
              href="mailto:arnelbaylon0@gmail.com"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
              aria-label="Email Arnel"
            >
              <FaEnvelope className="w-4 h-4 text-accent transition-transform group-hover:scale-110" />
              <span className="font-medium underline-offset-4 group-hover:underline">Email</span>
            </a>
          </div>

          {/* Clean Metric Ribbon (Zero Cards, No Eyebrows) */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pt-8 border-t border-border/60 flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-3 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-foreground font-bold text-base">2–4 Weeks</span>
              <span>Average Time to Launch</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-foreground font-bold text-base">100%</span>
              <span>You Own Everything We Build</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-foreground font-bold text-base">Top 30</span>
              <span>National Innovation Winner</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Projects</span>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center items-center gap-1.5 text-muted-foreground/60 text-xs pointer-events-none">
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
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            A visual showcase of websites, online stores, web apps, and smart automations built for clients.
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
                  className="relative w-[320px] sm:w-[420px] md:w-[480px] aspect-[16/10] shrink-0 rounded-2xl overflow-hidden border border-border/80 dark:border-white/10 shadow-xs dark:shadow-lg dark:shadow-black/20 rotate-[3deg] hover:rotate-0 hover:scale-105 hover:z-20 transition-transform duration-500 ease-out bg-card group select-none cursor-pointer transform-gpu"
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

                  {/* Details Overlay: Primary text anchors */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white pointer-events-none">
                    <div className="overflow-hidden">
                      <div className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-md truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
                        {item.detail}
                      </div>
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
                  className="relative w-[320px] sm:w-[420px] md:w-[480px] aspect-[16/10] shrink-0 rounded-2xl overflow-hidden border border-border/80 dark:border-white/10 shadow-xs dark:shadow-lg dark:shadow-black/20 rotate-[3deg] hover:rotate-0 hover:scale-105 hover:z-20 transition-transform duration-500 ease-out bg-card group select-none cursor-pointer transform-gpu"
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

                  {/* Details Overlay: Primary text anchors */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white pointer-events-none">
                    <div className="overflow-hidden">
                      <div className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-md truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Carousel Note (No Eyebrows) */}
        <div className="text-center text-xs text-muted-foreground mt-4">
          <span>Continuous showcase of recent work &bull; Hover over any project to pause</span>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          WHAT CLIENTS SAY (Full Width Carousel, No Category Buttons)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-24 sm:py-32 border-t border-border/60 scroll-mt-12 overflow-hidden bg-muted/10 dark:bg-black/20"
      >
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Section Header (No Eyebrows) */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              What Clients Say
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3">
              Real feedback from business owners, startup founders, and team leaders I’ve worked with.
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
                  className="relative w-full p-6 sm:p-10 lg:p-12 rounded-2xl bg-card border border-border/80 shadow-xs dark:shadow-lg dark:shadow-black/20 flex flex-col justify-between overflow-hidden"
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

                  {/* Large Quote (Direct Leading Content, No Eyebrow Header) */}
                  <div className="relative mb-8 pt-4">
                    <p className="relative text-lg sm:text-2xl lg:text-3xl text-foreground font-normal leading-relaxed">
                      &ldquo;{currentReview.quote}&rdquo;
                    </p>
                  </div>

                  {/* Client Info Footer */}
                  <div className="pt-8 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950 font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                        {currentReview.clientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg text-foreground">
                          {currentReview.clientName}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {currentReview.clientRole} &bull; <span className="text-foreground font-semibold">{currentReview.company}</span>
                        </div>
                        <div className="text-xs font-mono text-accent mt-0.5 font-medium">
                          {currentReview.project}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-600/15 dark:bg-emerald-400/20 px-3 py-1 rounded-full border border-emerald-600/30 dark:border-emerald-400/35">
                        {currentReview.highlightMetric}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/40 text-muted-foreground text-xs font-mono font-medium border border-border/80">
                        <span>5.0 Star Rating</span>
                      </div>
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
          FREQUENTLY ASKED QUESTIONS (Accordion List, No Cards, No //)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="w-full px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto py-24 sm:py-32 border-t border-border/60 scroll-mt-12"
      >
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3">
            Clear, direct answers about delivery timelines, pricing, ownership, and how we work together.
          </p>
        </div>

        {/* Clean Accordion List (Divided rows, no card containers) */}
        <div className="divide-y divide-border/70 border-y border-border/70">
          {clientFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div key={faq.question} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full py-6 sm:py-7 flex items-center justify-between gap-4 text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-5 min-w-0">
                    <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-md bg-muted/60 dark:bg-muted/40 border border-border/70 shrink-0">
                      {faq.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors min-w-0">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="shrink-0 ml-2">
                    <span
                      className="w-8 h-8 flex items-center justify-center font-mono text-lg font-bold text-foreground group-hover:text-accent border border-border/70 rounded-md bg-muted/30 transition-colors"
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      key="content"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-0 sm:pl-[3.5rem] pr-4 sm:pr-12 text-muted-foreground text-sm sm:text-base leading-relaxed">
                        <p>{faq.answer}</p>
                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-2 text-xs font-mono">
                          <span className="text-muted-foreground">Have a specific question?</span>
                          <a
                            href="#contact"
                            className="text-foreground hover:text-accent font-semibold transition-colors uppercase tracking-wide text-[11px]"
                          >
                            Let’s chat &rarr;
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CONTACT & DIRECT INQUIRY (No Eyebrows)
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
              Whether you want to build a new website from scratch, create an easy-to-use web app, or automate repetitive tasks, I’d love to hear about your project.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:arnelbaylon0@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border/80 hover:border-accent/50 text-foreground transition-colors duration-150 group shadow-xs dark:shadow-lg dark:shadow-black/20"
              >
                <div className="font-mono text-xs font-bold text-accent px-2.5 py-1.5 rounded-lg bg-muted/60 dark:bg-muted/40 border border-border/80 shrink-0">
                  EMAIL
                </div>
                <div className="text-sm sm:text-base font-semibold group-hover:text-accent transition-colors">
                  arnelbaylon0@gmail.com
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border/80 hover:border-accent/50 text-foreground transition-colors duration-150 group shadow-xs dark:shadow-lg dark:shadow-black/20"
              >
                <div className="font-mono text-xs font-bold text-accent px-2.5 py-1.5 rounded-lg bg-muted/60 dark:bg-muted/40 border border-border/80 shrink-0">
                  LINKEDIN
                </div>
                <div className="text-sm sm:text-base font-semibold group-hover:text-accent transition-colors">
                  linkedin.com/in/arnel-baylon
                </div>
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-muted/20 dark:bg-card/80 border border-border/80 text-xs text-muted-foreground space-y-1.5 shadow-xs dark:shadow-lg dark:shadow-black/20">
              <div className="font-semibold text-foreground text-sm">Availability &amp; Schedule</div>
              <div>Working hours easily adapt to US, European, and Australian time zones</div>
              <div>Ready to start new projects within 5 to 7 days</div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-card border border-border/80 shadow-xs dark:shadow-lg dark:shadow-black/20">
              {inquirySubmitted ? (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Email Ready to Send!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Your email app has opened with your message ready to go. Simply click send, or write directly to{' '}
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
                      Tell Me About Your Project
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Share a few quick details about what you need, and I’ll reply with helpful advice within 24 hours.
                    </p>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2">
                      What type of project are you planning?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        'New Website or App',
                        'Smart AI & Automation',
                        'Redesign Existing Site',
                        'General Question',
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
                        Your Name or Business
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="Sarah Johnson (Johnson Real Estate)"
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
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                      />
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div>
                    <label htmlFor="launch-timeline" className="block text-xs font-medium text-foreground mb-1">
                      When would you like this completed?
                    </label>
                    <select
                      id="launch-timeline"
                      name="timeline"
                      aria-label="Target Launch Timeline"
                      value={inquiryForm.timeline}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                    >
                      <option value="As soon as possible (1–2 weeks)">As soon as possible (1–2 weeks)</option>
                      <option value="Standard pace (2–4 weeks)">Standard pace (2–4 weeks)</option>
                      <option value="Flexible (next 1–2 months)">Flexible (next 1–2 months)</option>
                      <option value="Just exploring ideas">Just exploring ideas</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-medium text-foreground mb-1">
                      What would you like to build or achieve?
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      required
                      rows={3}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Tell me a bit about your business, what you want your website or app to do, or any examples you like..."
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.99] transition-[opacity,transform] duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center text-[11px] text-muted-foreground">
                    I’ll reply directly within 24 hours &bull; 100% private and confidential
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
