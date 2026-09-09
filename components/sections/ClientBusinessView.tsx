'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FaArrowRight,
  FaArrowLeft,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaCode,
  FaLinkedin,
  FaTiktok,
  FaEnvelope,
  FaCheck,
  FaGlobe,
  FaRobot,
  FaSyncAlt,
  FaQuestionCircle,
} from 'react-icons/fa'
import { WaveSectionDivider } from '@/components/ui/WaveSectionDivider'

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
  onOpenChat?: () => void
}

export function ClientBusinessView({
  onSwitchToTechMode,
  onOpenChat,
}: ClientBusinessViewProps) {
  const reduce = useReducedMotion()
  const [inquiryType, setInquiryType] = useState('New Website or App')
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1)
  const [formError, setFormError] = useState<string | null>(null)
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

  const handleNextStep = () => {
    setFormError(null)
    if (formStep === 1) {
      setFormStep(2)
    } else if (formStep === 2) {
      if (!inquiryForm.message.trim()) {
        setFormError('Please share a brief note about what you would like to build or achieve.')
        return
      }
      setFormStep(3)
    }
  }

  const handlePrevStep = () => {
    setFormError(null)
    if (formStep > 1) {
      setFormStep((prev) => (prev - 1) as 1 | 2 | 3)
    }
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inquiryForm.name.trim() || !inquiryForm.email.trim()) {
      setFormError('Please provide your name and email address so I can get back to you.')
      return
    }
    const subject = encodeURIComponent(`Project Inquiry: ${inquiryType} (${inquiryForm.name})`)
    const body = encodeURIComponent(
      `Hi Arnel,\n\nName: ${inquiryForm.name}\nEmail: ${inquiryForm.email}\nProject Type: ${inquiryType}\nDesired Timeline: ${inquiryForm.timeline}\n\nProject Overview:\n${inquiryForm.message || 'N/A'}\n\nLooking forward to speaking with you!`
    )
    window.open(`mailto:arnlebaylon15@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setInquirySubmitted(true)
  }

  // Duplicate arrays for smooth continuous infinite loop
  const infiniteRow1 = [...row1Projects, ...row1Projects]
  const infiniteRow2 = [...row2Projects, ...row2Projects]

  const currentReview = clientTestimonials[activeReviewIdx]

  return (
    <div className="w-full min-h-screen text-foreground relative overflow-x-hidden">

      {/* ─────────────────────────────────────────────────────────────
          EXECUTIVE HERO SECTION (Zero Cards, No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-24 pt-24 sm:pt-28 lg:pt-32 pb-16 scroll-mt-24 sm:scroll-mt-28 relative"
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
              href="mailto:arnlebaylon15@gmail.com"
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

      {/* ── Section Separator: Wave Pattern (Hero -> Projects) ── */}
      <WaveSectionDivider />

      {/* ─────────────────────────────────────────────────────────────
          PROJECTS (Slanted Carousel with Accurate Details, No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="w-full py-24 sm:py-32 scroll-mt-24 sm:scroll-mt-28 overflow-hidden bg-muted/15 dark:bg-[#06070d]/60"
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

      {/* ── Section Separator: Wave Pattern (Projects -> Testimonials) ── */}
      <WaveSectionDivider flip />

      {/* ─────────────────────────────────────────────────────────────
          WHAT CLIENTS SAY (Full Width Carousel, No Category Buttons)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="w-full px-6 sm:px-12 lg:px-16 xl:px-20 py-24 sm:py-32 scroll-mt-24 sm:scroll-mt-28 overflow-hidden bg-muted/10 dark:bg-black/20"
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

      {/* ── Section Separator: Wave Pattern (Testimonials -> FAQ) ── */}
      <WaveSectionDivider />

      {/* ─────────────────────────────────────────────────────────────
          FREQUENTLY ASKED QUESTIONS (Accordion List, No Cards, No //)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="w-full px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto py-24 sm:py-32 scroll-mt-24 sm:scroll-mt-28"
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
                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Have a specific question?</span>
                          {onOpenChat ? (
                            <button
                              type="button"
                              onClick={onOpenChat}
                              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold transition-colors tracking-wide text-xs cursor-pointer"
                            >
                              Ask AI Advisor &rarr;
                            </button>
                          ) : (
                            <a
                              href="#contact"
                              className="text-foreground hover:text-accent font-semibold transition-colors uppercase tracking-wide text-[11px]"
                            >
                              Let’s chat &rarr;
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* ── Ask AI Advisor Banner Below FAQ ── */}
        {onOpenChat && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm">
              <span className="text-foreground font-medium">Still have questions about your specific project?</span>
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Ask Arnel&apos;s AI Advisor</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── Section Separator: Wave Pattern (FAQ -> Contact) ── */}
      <WaveSectionDivider flip />

      {/* ─────────────────────────────────────────────────────────────
          CONTACT & DIRECT INQUIRY (No Eyebrows)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto py-24 sm:py-32 scroll-mt-24 sm:scroll-mt-28"
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
                href="mailto:arnlebaylon15@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/80 hover:border-amber-500/50 text-foreground transition-colors duration-150 group shadow-xs dark:shadow-lg dark:shadow-black/20"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground font-medium">Email</div>
                  <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                    arnlebaylon15@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/80 hover:border-[#0A66C2]/50 text-foreground transition-colors duration-150 group shadow-xs dark:shadow-lg dark:shadow-black/20"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0A66C2]/15 text-[#0A66C2] border border-[#0A66C2]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground font-medium">LinkedIn</div>
                  <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                    linkedin.com/in/arnel-baylon-b05233189
                  </div>
                </div>
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-muted/20 dark:bg-card/80 border border-border/80 text-xs text-muted-foreground space-y-1.5 shadow-xs dark:shadow-lg dark:shadow-black/20">
              <div className="font-semibold text-foreground text-sm">Availability &amp; Schedule</div>
              <div>Working hours easily adapt to US, European, and Australian time zones</div>
              <div>Ready to start new projects within 5 to 7 days</div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form Guide */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-card border border-border/80 shadow-xs dark:shadow-lg dark:shadow-black/20">
              {inquirySubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Email Ready to Send!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
                    Your email app has opened with your inquiry prefilled to{' '}
                    <strong className="text-foreground">arnlebaylon15@gmail.com</strong>. Simply click send in your email client to deliver it!
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setInquirySubmitted(false)
                        setFormStep(1)
                        setInquiryForm({
                          name: '',
                          email: '',
                          message: '',
                          timeline: 'Standard pace (2–4 weeks)',
                        })
                      }}
                      className="px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                    >
                      Start Another Inquiry
                    </button>
                    <a
                      href={`mailto:arnlebaylon15@gmail.com?subject=${encodeURIComponent(
                        `Project Inquiry: ${inquiryType} (${inquiryForm.name})`
                      )}&body=${encodeURIComponent(
                        `Hi Arnel,\n\nName: ${inquiryForm.name}\nEmail: ${inquiryForm.email}\nProject Type: ${inquiryType}\nTarget Timeline: ${inquiryForm.timeline}\n\nProject Overview:\n${inquiryForm.message || 'N/A'}\n\nLooking forward to speaking with you!`
                      )}`}
                      className="px-5 py-2.5 rounded-xl bg-muted/50 hover:bg-muted text-foreground text-xs font-semibold transition-colors border border-border/70"
                    >
                      Re-open Email App
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  {/* Step Progress Guide Header */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span className="font-semibold text-foreground">
                        Step {formStep} of 3:{' '}
                        {formStep === 1
                          ? 'What to Build'
                          : formStep === 2
                          ? 'Goals & Timeline'
                          : 'Your Contact Details'}
                      </span>
                      <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                        {formStep === 1 ? '33%' : formStep === 2 ? '66%' : '100%'} Complete
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-muted/60 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                        initial={false}
                        animate={{ width: formStep === 1 ? '33%' : formStep === 2 ? '66%' : '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Step Navigation Pills */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[
                        { step: 1, label: '1. What to Build' },
                        { step: 2, label: '2. Goals & Timeline' },
                        { step: 3, label: '3. Contact Info' },
                      ].map((item) => (
                        <button
                          key={item.step}
                          type="button"
                          onClick={() => {
                            if (item.step < formStep) setFormStep(item.step as 1 | 2 | 3)
                          }}
                          disabled={item.step > formStep}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-medium text-center transition-all ${
                            formStep === item.step
                              ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/40 font-bold'
                              : formStep > item.step
                              ? 'bg-muted/40 text-foreground hover:bg-muted/70 cursor-pointer'
                              : 'bg-muted/20 text-muted-foreground/60 cursor-not-allowed'
                          }`}
                        >
                          {formStep > item.step ? `✓ ${item.label.split('. ')[1]}` : item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Step Content */}
                  <AnimatePresence mode="wait">
                    {/* ── STEP 1: What to Build ── */}
                    {formStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={reduce ? false : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 pt-2"
                      >
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            What type of project do you have in mind?
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Choose the option that best describes what you’d like to build.
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            {
                              id: 'New Website or App',
                              title: 'New Website or App',
                              desc: 'Custom website, online store, or web app built from scratch',
                              icon: FaGlobe,
                            },
                            {
                              id: 'Smart AI & Automation',
                              title: 'Smart AI & Automation',
                              desc: 'Smart customer assistants, AI features, or automated workflows',
                              icon: FaRobot,
                            },
                            {
                              id: 'Redesign Existing Site',
                              title: 'Redesign Existing Site',
                              desc: 'Modernize design, improve mobile layout, and boost speed',
                              icon: FaSyncAlt,
                            },
                            {
                              id: 'General Question',
                              title: 'General Question',
                              desc: 'Discuss an idea, ask for advice, or explore project scope',
                              icon: FaQuestionCircle,
                            },
                          ].map((type) => {
                            const isSelected = inquiryType === type.id
                            const Icon = type.icon
                            return (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => {
                                  setInquiryType(type.id)
                                  setFormError(null)
                                }}
                                className={`p-4 rounded-2xl text-left border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                                  isSelected
                                    ? 'bg-amber-500/10 border-amber-500/60 shadow-xs ring-1 ring-amber-500/40'
                                    : 'bg-muted/30 border-border/70 hover:bg-muted/50 hover:border-border'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                      isSelected
                                        ? 'bg-amber-500 text-zinc-950 shadow-xs'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                                  >
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <span
                                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                                      isSelected
                                        ? 'border-amber-500 bg-amber-500 text-zinc-950 font-bold'
                                        : 'border-border/80 text-transparent'
                                    }`}
                                  >
                                    ✓
                                  </span>
                                </div>
                                <div>
                                  <div className="font-bold text-sm text-foreground">{type.title}</div>
                                  <div className="text-xs text-muted-foreground mt-1 leading-snug">{type.desc}</div>
                                </div>
                              </button>
                            )
                          })}
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.99] transition-[opacity,transform] duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                          >
                            <span>Next: Goals &amp; Timeline</span>
                            <FaArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 2: Goals & Timeline ── */}
                    {formStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={reduce ? false : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 pt-2"
                      >
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            Timeline &amp; Project Overview
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Let me know your target timeframe and what you want to achieve.
                          </p>
                        </div>

                        {/* Timeline Selection */}
                        <div>
                          <label className="block text-xs font-semibold text-muted-foreground mb-2">
                            When would you like this completed?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              'As soon as possible (1–2 weeks)',
                              'Standard pace (2–4 weeks)',
                              'Flexible (next 1–2 months)',
                              'Just exploring ideas',
                            ].map((opt) => {
                              const isSelected = inquiryForm.timeline === opt
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setInquiryForm({ ...inquiryForm, timeline: opt })}
                                  className={`p-3 rounded-xl text-xs font-medium border text-left transition-colors duration-150 cursor-pointer flex items-center justify-between ${
                                    isSelected
                                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-700 dark:text-amber-300 font-semibold shadow-xs'
                                      : 'bg-muted/30 border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isSelected && <span className="text-amber-600 dark:text-amber-400 font-bold ml-2">✓</span>}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Overview Textarea */}
                        <div>
                          <label htmlFor="inquiry-message" className="block text-xs font-medium text-foreground mb-1">
                            What would you like to build or achieve?
                          </label>
                          <textarea
                            id="inquiry-message"
                            name="message"
                            required
                            rows={4}
                            value={inquiryForm.message}
                            onChange={(e) => {
                              setInquiryForm({ ...inquiryForm, message: e.target.value })
                              if (formError) setFormError(null)
                            }}
                            placeholder="Tell me a bit about your business, what you want your website or app to do, or any examples you like..."
                            className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors resize-none leading-relaxed"
                          />
                          {formError && (
                            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                              <span>⚠️</span> {formError}
                            </p>
                          )}
                        </div>

                        {/* Quick helper prompts */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                          <span className="font-medium">Quick ideas:</span>
                          {[
                            '+ Online booking calendar',
                            '+ Fast mobile checkout',
                            '+ Smart AI assistant',
                            '+ Simple admin dashboard',
                          ].map((idea) => (
                            <button
                              key={idea}
                              type="button"
                              onClick={() => {
                                const cleanIdea = idea.replace('+ ', '')
                                const current = inquiryForm.message.trim()
                                const updated = current
                                  ? `${current}, ${cleanIdea.toLowerCase()}`
                                  : `I need a solution with ${cleanIdea.toLowerCase()}`
                                setInquiryForm({ ...inquiryForm, message: updated })
                                if (formError) setFormError(null)
                              }}
                              className="px-2 py-0.5 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/50 text-[11px]"
                            >
                              {idea}
                            </button>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-4 py-3 rounded-xl bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center gap-2 cursor-pointer text-sm"
                          >
                            <FaArrowLeft className="w-3 h-3" />
                            <span>Back</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.99] transition-[opacity,transform] duration-150 shadow-md flex items-center gap-2 cursor-pointer text-sm"
                          >
                            <span>Next: Contact Details</span>
                            <FaArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 3: Contact Info ── */}
                    {formStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={reduce ? false : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6 pt-2"
                      >
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            Your Contact Information
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Where should I send my reply and project recommendations?
                          </p>
                        </div>

                        {/* Summary Recap Badge */}
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div>
                            <span className="font-semibold text-amber-800 dark:text-amber-300">Project:</span>{' '}
                            <span className="text-foreground">{inquiryType}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-amber-800 dark:text-amber-300">Timeline:</span>{' '}
                            <span className="text-foreground">{inquiryForm.timeline}</span>
                          </div>
                        </div>

                        {/* Name and Email Inputs */}
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="inquiry-name" className="block text-xs font-medium text-foreground mb-1">
                              Your Name or Business Name
                            </label>
                            <input
                              id="inquiry-name"
                              name="name"
                              type="text"
                              required
                              value={inquiryForm.name}
                              onChange={(e) => {
                                setInquiryForm({ ...inquiryForm, name: e.target.value })
                                if (formError) setFormError(null)
                              }}
                              placeholder="e.g. Sarah Johnson (Johnson Realty)"
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
                              onChange={(e) => {
                                setInquiryForm({ ...inquiryForm, email: e.target.value })
                                if (formError) setFormError(null)
                              }}
                              placeholder="e.g. sarah@example.com"
                              className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/80 focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                            />
                          </div>

                          {formError && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                              <span>⚠️</span> {formError}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-4 py-3 rounded-xl bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-colors flex items-center gap-2 cursor-pointer text-sm"
                          >
                            <FaArrowLeft className="w-3 h-3" />
                            <span>Back</span>
                          </button>

                          <button
                            type="submit"
                            className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-[0.99] transition-[opacity,transform] duration-150 shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                          >
                            <span>Send Message</span>
                            <FaArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-center text-[11px] text-muted-foreground">
                          I’ll reply directly within 24 hours &bull; 100% private and confidential
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── Section Separator: Wave Pattern (Contact -> Footer) ── */}
      <WaveSectionDivider />

      {/* ── Clean Client Footer ── */}
      <footer className="w-full py-10 px-6 sm:px-12 text-center text-xs text-muted-foreground bg-muted/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Arnel Baylon. Built for client clarity and results.
          </div>
          {onSwitchToTechMode && (
            <button
              type="button"
              onClick={onSwitchToTechMode}
              className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <FaCode className="w-3 h-3 text-amber-500" />
              <span>Looking for engineering specs? Switch to Developer Mode</span>
            </button>
          )}
        </div>
      </footer>

    </div>
  )
}
