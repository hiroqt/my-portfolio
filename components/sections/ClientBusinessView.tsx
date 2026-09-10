'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaCode,
  FaLinkedin,
  FaEnvelope,
  FaStar,
  FaExternalLinkAlt,
  FaShoppingBag,
  FaRobot,
  FaChartLine,
  FaCheckCircle,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaCopy,
  FaCheck,
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'

// ── Client-Friendly Project Showcase Data (No tech jargon) ──
interface ShowcaseProject {
  id: string
  title: string
  subtitle: string
  detail: string
  image: string
  category: string
  metric: string
  badge: string
  liveUrl?: string
}

const flagshipShowcaseProjects: ShowcaseProject[] = [
  {
    id: 'tearsize',
    title: 'Tearsize Store',
    subtitle: 'Modern Online Clothing Shop',
    detail: 'Complete online apparel store with instant mobile checkout, automated order confirmations, and real-time inventory updates so customers can buy effortlessly.',
    image: '/images/tearsize.jpg',
    category: 'Online Store',
    metric: 'Fast Mobile Checkout',
    badge: 'E-Commerce',
    liveUrl: 'https://tearsize.vercel.app',
  },
  {
    id: 'saktoka',
    title: 'sakto ka',
    subtitle: 'AI Career Assistant Platform',
    detail: 'Friendly web platform that guides job seekers through building standout resumes and prepares them for interviews with personalized coaching.',
    image: '/images/saktoka.png',
    category: 'AI Assistant',
    metric: '1,000+ First-Month Users',
    badge: 'AI Platform',
    liveUrl: 'https://sakto-ka.vercel.app',
  },
  {
    id: 'pixelcrew',
    title: 'Pixel Crew',
    subtitle: 'Collaborative AI Workspace',
    detail: 'Visual workspace where smart AI assistants collaborate to help teams design, plan, and build digital products faster with less manual effort.',
    image: '/images/pixelcrew.png',
    category: 'Smart Workspace',
    metric: 'Automated Daily Tasks',
    badge: 'AI Studio',
    liveUrl: 'https://github.com/arnelbaylon',
  },
  {
    id: 'ebuddy',
    title: 'eBuddy Public Guide',
    subtitle: 'National Award-Winning Citizen Guide',
    detail: 'AI assistant that guides everyday citizens through official paperwork and government service requirements step-by-step in simple, friendly language.',
    image: '/images/egov.png',
    category: 'Public Service',
    metric: 'Top 30 National Winner',
    badge: 'Award Winner',
  },
  {
    id: 'finops',
    title: 'FinOps AI Dashboard',
    subtitle: 'Business Expense Savings Tool',
    detail: 'Intelligent business dashboard that monitors software subscriptions and cloud expenses, flags billing mistakes, and unlocks recurring monthly savings.',
    image: '/images/finops.jpg',
    category: 'Savings Dashboard',
    metric: 'AWS Best Business Impact',
    badge: 'Cost Savings',
  },
  {
    id: 'vcm',
    title: 'VCM Academic Platform',
    subtitle: 'Staff Attendance & Automatic Payroll',
    detail: 'Simple campus system with mobile phone QR check-ins, automated daily timesheets, and error-free payroll calculation for school staff.',
    image: '/images/vcm.jpg',
    category: 'Staff Management',
    metric: 'Saved Days on Payroll',
    badge: 'Operations',
  },
]

interface HeroCarouselProject {
  id: string
  title: string
  tagline: string
  purpose: string
  metric: string
  badge: string
  image: string
  liveUrl?: string
  highlights: string[]
}

const heroCarouselProjects: HeroCarouselProject[] = [
  {
    id: 'tearsize',
    title: 'Tearsize Store',
    tagline: 'Instant Mobile Apparel Store',
    purpose:
      'Allows shoppers to browse smoothly on any phone and purchase clothing in seconds, with automated order receipts and live inventory sync.',
    metric: 'Sub-2s Mobile Checkout',
    badge: 'Online Store',
    image: '/images/tearsize.jpg',
    liveUrl: 'https://tearsize.vercel.app',
    highlights: ['Instant mobile checkout', 'Automated order receipts', 'Live inventory sync'],
  },
  {
    id: 'saktoka',
    title: 'sakto ka',
    tagline: 'AI Career & Interview Coach',
    purpose:
      'Helps job seekers turn their real experience into standout resumes and practice live job interviews with friendly, instant AI feedback.',
    metric: '1,000+ First-Month Users',
    badge: 'AI Assistant',
    image: '/images/saktoka.png',
    liveUrl: 'https://sakto-ka.vercel.app',
    highlights: ['Free Job Hunt site with Resume builder', '24/7 practice interviews', 'Instant friendly guidance'],
  },
  {
    id: 'pixelcrew',
    title: 'Pixel Crew Studio',
    tagline: 'Smart Creative AI Workspace',
    purpose:
      'A visual collaborative workspace where specialized AI assistants help creative teams plan, design, and launch digital products in minutes.',
    metric: 'Automated Daily Workflows',
    badge: 'Smart Studio',
    image: '/images/pixelcrew.png',
    liveUrl: 'https://github.com/arnelbaylon',
    highlights: ['Visual team workspace', 'Automated routine tasks', 'Faster product launches'],
  },
  {
    id: 'ebuddy',
    title: 'eBuddy Public Guide',
    tagline: 'National Award-Winning Citizen Guide',
    purpose:
      'Guides everyday citizens through government requirements, document filings, and official paperwork step-by-step in simple, friendly language.',
    metric: 'Top 30 National Winner',
    badge: 'Public Service',
    image: '/images/egov.png',
    highlights: ['Step-by-step document help', 'Plain everyday language', 'Zero paperwork confusion'],
  },
  {
    id: 'finops',
    title: 'FinOps AI Dashboard',
    tagline: 'Business Subscription Savings Tool',
    purpose:
      'Monitors company software expenses and recurring bills, flags forgotten subscriptions, and uncovers immediate monthly cost savings.',
    metric: 'AWS Best Business Impact',
    badge: 'Cost Savings',
    image: '/images/finops.jpg',
    highlights: ['Subscription waste alerts', 'Automated expense tracking', 'Immediate monthly savings'],
  },
  {
    id: 'vcm',
    title: 'VCM Academic Platform',
    tagline: 'Campus QR Attendance & Payroll',
    purpose:
      'Replaces paper timesheets with mobile phone QR check-ins, tracking staff attendance automatically and calculating payroll with zero manual errors.',
    metric: 'Saved Days on Monthly Payroll',
    badge: 'Operations',
    image: '/images/vcm.jpg',
    highlights: ['Mobile phone QR check-ins', 'Automatic daily timesheets', 'Zero manual payroll errors'],
  },
]

const marqueeRow1 = [
  {
    id: 'tearsize',
    title: 'Tearsize',
    detail: 'Online apparel store with fast mobile checkout and instant order updates',
    image: '/images/tearsize.jpg',
    badge: 'Online Store',
  },
  {
    id: 'saktoka',
    title: 'sakto ka',
    detail: 'AI assistant that writes job-winning resumes and interview answers',
    image: '/images/saktoka.png',
    badge: 'AI Assistant',
  },
  {
    id: 'pixelcrew',
    title: 'Pixel Crew',
    detail: 'Collaborative AI workspace that turns product ideas into clean software',
    image: '/images/pixelcrew.png',
    badge: 'Smart Studio',
  },
  {
    id: 'ebuddy',
    title: 'eBuddy',
    detail: 'Award-winning guide helping everyday citizens complete public paperwork',
    image: '/images/egov.png',
    badge: 'National Winner',
  },
  {
    id: 'finops',
    title: 'FinOps AI',
    detail: 'Smart dashboard that helps companies find and reduce wasted software spend',
    image: '/images/finops.jpg',
    badge: 'Cost Savings',
  },
  {
    id: 'vcm',
    title: 'VCM HRIS',
    detail: 'Staff platform with mobile QR check-ins and automated payroll calculation',
    image: '/images/vcm.jpg',
    badge: 'Staff System',
  },
]

const marqueeRow2 = [
  {
    id: 'bettertrece',
    title: 'Better Trece Martires',
    detail: 'Community portal sharing local city projects and public budgets clearly',
    image: '/images/bettertrece.png',
    badge: 'Community',
  },
  {
    id: 'pacementor',
    title: 'PaceMentor',
    detail: 'Personal fitness and running app with customized weekly workout plans',
    image: '/images/pcaementor.jpg',
    badge: 'Mobile App',
  },
  {
    id: 'presentpo',
    title: 'Present Po',
    detail: 'Employee attendance tracker that verifies locations and creates timesheets',
    image: '/images/presentpo.jpg',
    badge: 'HR Tool',
  },
  {
    id: 'hivesync',
    title: 'HiveSync VA',
    detail: 'Agency website with automated client booking and article publishing',
    image: '/images/hivesync.jpg',
    badge: 'Client Portal',
  },
  {
    id: 'tmrc',
    title: 'TMRC Sports',
    detail: 'Local running community website with event registrations and race boards',
    image: '/images/tmrc.jpg',
    badge: 'Sports Club',
  },
  {
    id: 'saktoka-ats',
    title: 'Resume Builder',
    detail: 'Resume creation tool designed to help applicants get hired faster',
    image: '/images/saktoka.png',
    badge: 'Career Tool',
  },
]

// ── Client Testimonials Data (Real human feedback) ──
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
      'Arnel built our entire online store from scratch in just 3 weeks. The checkout is super fast and smooth on phones, order updates are sent automatically, and our sales went up right after launch. He genuinely cares about our business and thinks like a true partner.',
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

// ── FAQ Items (Plain English, Non-Tech) ──
interface FAQItem {
  number: string
  question: string
  answer: string
}

const clientFaqs: FAQItem[] = [
  {
    number: '01',
    question: 'How quickly can we build and launch my website or app?',
    answer:
      'Most projects launch within 2 to 4 weeks. Every week, I send you a private link you can open on your phone or computer to test the progress live. You always know exactly what is happening, with zero surprise delays.',
  },
  {
    number: '02',
    question: 'How does pricing work? Are there any surprise bills?',
    answer:
      'Pricing is simple and transparent. We agree on a fixed project price before we write a single line of code. You know exactly what you are paying, with no hidden agency markups or unexpected invoices.',
  },
  {
    number: '03',
    question: 'Do I own 100% of everything after we launch?',
    answer:
      'Yes, 100%. All design files, website accounts, code, and domains belong entirely to you from day one. When we launch, I provide easy video walkthroughs so you or your team have full control and are never locked into any service.',
  },
  {
    number: '04',
    question: 'What kind of websites, online stores, and AI tools do you build?',
    answer:
      'I build modern high-converting websites, online stores with fast checkout, private customer portals, and smart AI assistants that can answer customer questions, organize files, or automate daily business tasks.',
  },
  {
    number: '05',
    question: 'What happens after we launch? Do you help if I need changes?',
    answer:
      'Every project includes 30 days of free post-launch support. I am right there to fix any questions, ensure everything runs smoothly, and make adjustments. If you want continued regular help down the road, flexible monthly check-ins are also available.',
  },
  {
    number: '06',
    question: 'How will we communicate during the project?',
    answer:
      'You work directly with me—never passed around to account managers or juniors. We can communicate wherever you prefer, including WhatsApp, Slack, or Email, plus friendly video demo calls whenever you want to review progress.',
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

  // ── Hero Ads-Style Carousel State ──
  const [activeHeroProjectIdx, setActiveHeroProjectIdx] = useState(0)
  const [isHeroCarouselAutoplay, setIsHeroCarouselAutoplay] = useState(true)

  // Hero carousel autoplay (5.5s interval, pauses on hover)
  useEffect(() => {
    if (!isHeroCarouselAutoplay) return
    const timer = setInterval(() => {
      setActiveHeroProjectIdx((curr) => (curr + 1) % heroCarouselProjects.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isHeroCarouselAutoplay])

  const handlePrevHeroProject = () => {
    setActiveHeroProjectIdx(
      (prev) => (prev - 1 + heroCarouselProjects.length) % heroCarouselProjects.length
    )
  }

  const handleNextHeroProject = () => {
    setActiveHeroProjectIdx((prev) => (prev + 1) % heroCarouselProjects.length)
  }

  // ── Testimonials Carousel State ──
  const [activeReviewIdx, setActiveReviewIdx] = useState(0)
  const [isReviewAutoplay, setIsReviewAutoplay] = useState(true)

  // ── FAQ State ──
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // ── Clean Minimal Contact State ──
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactError, setContactError] = useState<string | null>(null)
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('arnlebaylon15@gmail.com')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  // Testimonials autoplay
  useEffect(() => {
    if (!isReviewAutoplay) return
    const timer = setInterval(() => {
      setActiveReviewIdx((curr) => (curr + 1) % clientTestimonials.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [isReviewAutoplay])

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length)
  }

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % clientTestimonials.length)
  }

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName.trim() || !contactEmail.trim()) {
      setContactError('Please enter your name and email address so I can get back to you.')
      return
    }
    setContactError(null)
    const subject = encodeURIComponent(`Project Inquiry from ${contactName}`)
    const body = encodeURIComponent(
      `Hi Arnel,\n\nName: ${contactName}\nEmail: ${contactEmail}\n\nProject Inquiry Overview:\n${contactMessage || 'I would like to discuss a project with you.'}\n\nLooking forward to hearing from you!`
    )
    window.open(`mailto:arnlebaylon15@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setContactSubmitted(true)
  }

  const activeHeroProject = heroCarouselProjects[activeHeroProjectIdx]
  const nextHeroProjectIdx = (activeHeroProjectIdx + 1) % heroCarouselProjects.length
  const nextHeroProject = heroCarouselProjects[nextHeroProjectIdx]
  const currentReview = clientTestimonials[activeReviewIdx]
  const infiniteRow1 = [...marqueeRow1, ...marqueeRow1]
  const infiniteRow2 = [...marqueeRow2, ...marqueeRow2]

  return (
    <div className="w-full min-h-screen text-foreground relative overflow-x-hidden bg-white dark:bg-[#0a0a0b]">

      {/* ─────────────────────────────────────────────────────────────
          01. HIGH-IMPACT ADS HERO SECTION (Evervault Exact Aesthetic)
          Bold ads typography, luminous violet atmospheric glow,
          clean white pill CTA, zero emojis, zero eyebrows,
          larger centered card showcase with overlapping white card.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative w-full px-4 sm:px-6 md:px-12 lg:px-20 pt-28 sm:pt-36 pb-20 sm:pb-28 scroll-mt-24 overflow-hidden"
      >
        {/* Supaste Soft Radial Ambient Glow */}
        <div className="absolute inset-0 supaste-glow pointer-events-none -z-10" />

        {/* Evervault Radiant Violet Atmospheric Bloom */}
        <div
          className="absolute -bottom-24 -left-20 w-[650px] h-[550px] rounded-full pointer-events-none -z-10 blur-3xl opacity-80 dark:opacity-90"
          style={{
            background:
              'radial-gradient(ellipse at 20% 85%, rgba(124, 58, 237, 0.45) 0%, rgba(99, 102, 241, 0.3) 35%, rgba(67, 56, 202, 0.15) 60%, transparent 80%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[350px] rounded-full pointer-events-none -z-10 blur-3xl opacity-50 dark:opacity-70"
          style={{
            background:
              'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── Left Column: High-Impact Ads Value Proposition ── */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Master Headline (Bold Sans + Instrument Serif Italic) */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="text-[44px] sm:text-[56px] md:text-[66px] lg:text-[72px] font-bold tracking-[-0.04em] leading-[1.02em] text-foreground"
                style={{ fontFamily: "'Inter', 'Inter Display', sans-serif" }}
              >
                Websites, stores &amp; AI
              </h1>
              <h1
                className="text-[44px] sm:text-[56px] md:text-[66px] lg:text-[72px] italic tracking-[-0.04em] leading-[1.02em] text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400 mt-1"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                built to grow your business.
              </h1>
            </motion.div>

            {/* Client-Centric Subtitle (Zero Tech Jargon) */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mt-6 font-normal"
            >
              I partner directly with founders and business owners to build fast, reliable websites, online shops, and custom AI tools that save hours of work and convert visitors into customers.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-8 w-full sm:w-auto"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[18px] bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm tracking-tight shadow-md hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 14px rgba(0,0,0,0.15)',
                }}
              >
                <span>Start Your Project</span>
                <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {onOpenChat && (
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[18px] bg-white/80 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.12] backdrop-blur-xl text-foreground font-semibold text-sm tracking-tight shadow-xs hover:border-amber-500/40 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <HiSparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span>Ask Arnel&apos;s AI Assistant</span>
                </button>
              )}
            </motion.div>
          </div>

          {/* ── Right Column: Ads-Type Layered Project Card Carousel (Larger, Centered Image, Zero Eyebrows) ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col items-center justify-center w-full relative"
          >
            {/* Signature Evervault Overlapping White Card on Bottom Right */}
            <div className="hidden md:block absolute -bottom-6 -right-4 lg:-bottom-7 lg:-right-6 w-64 lg:w-72 rounded-2xl bg-white text-zinc-900 p-5 shadow-2xl border border-zinc-200/80 z-20 pointer-events-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Client Outcome
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-sm font-bold text-zinc-950 tracking-tight">
                {activeHeroProject.metric}
              </p>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                {activeHeroProject.highlights[0]}
              </p>
              {activeHeroProject.liveUrl && (
                <a
                  href={activeHeroProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-indigo-600 transition-colors"
                >
                  <span>Visit Live Site</span>
                  <FaExternalLinkAlt className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            {/* Main Active Project Card (Larger, Centered Image, Zero Eyebrows) */}
            <div
              onMouseEnter={() => setIsHeroCarouselAutoplay(false)}
              onMouseLeave={() => setIsHeroCarouselAutoplay(true)}
              className="w-full max-w-2xl rounded-3xl supaste-glass-card shadow-2xl border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 relative z-10 text-left transition-all"
            >
              {/* Card Top Control Bar (Clean Counter & Nav Controls, Zero Eyebrows) */}
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold tracking-tight text-foreground/80">
                    Project {String(activeHeroProjectIdx + 1).padStart(2, '0')}{' '}
                    <span className="text-muted-foreground font-normal">
                      / {String(heroCarouselProjects.length).padStart(2, '0')}
                    </span>
                  </span>
                </div>

                {/* Controls: Monospace Counter + Navigation Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevHeroProject}
                    aria-label="Previous project"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.16] text-foreground transition-all cursor-pointer active:scale-90"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextHeroProject}
                    aria-label="Next project"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.16] text-foreground transition-all cursor-pointer active:scale-90"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Animated Slide Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroProject.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="pt-4"
                >
                  {/* High-Resolution Project Preview (Larger, Centered Image) */}
                  <div className="relative aspect-[16/10] min-h-[260px] sm:min-h-[320px] md:min-h-[350px] w-full rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.10] shadow-md bg-zinc-950/40 group/img flex items-center justify-center">
                    <Image
                      src={activeHeroProject.image}
                      alt={activeHeroProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover object-center transition-transform duration-500 group-hover/img:scale-102"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Project Title & Plain Business Purpose (No Tech Jargon) */}
                  <div className="mt-5 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      {activeHeroProject.title}{' '}
                      <span className="text-muted-foreground font-medium text-sm sm:text-base">
                        &bull; {activeHeroProject.tagline}
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                      {activeHeroProject.purpose}
                    </p>

                    {/* Benefit Highlight Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeHeroProject.highlights.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] text-foreground"
                        >
                          <FaCheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                    {activeHeroProject.liveUrl ? (
                      <a
                        href={activeHeroProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-amber-500 transition-colors"
                      >
                        <span>Visit Live Experience</span>
                        <FaExternalLinkAlt className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium">Production Client Solution</span>
                    )}

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-amber-500 transition-colors"
                    >
                      <span>Build something similar &rarr;</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Dots Indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-5 pt-1">
                {heroCarouselProjects.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHeroProjectIdx(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeHeroProjectIdx === idx
                        ? 'w-7 bg-foreground'
                        : 'w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          02. OPEN EDITORIAL CAPABILITIES (No Boxed Card Slop)
          A clean, expansive 4-pillar layout explaining exactly what
          Arnel builds for businesses in simple, non-tech words.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="capabilities"
        className="w-full py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 max-w-6xl mx-auto scroll-mt-24"
      >
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Everything you need{' '}
            <span className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400">
              to launch and grow.
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 font-normal">
            From initial idea to live launch, here is how I help founders and business teams succeed online.
          </p>
        </div>

        {/* Open Editorial 4-Pillar Layout (Spacious, elegant, non-card) */}
        <div className="space-y-16 sm:space-y-20 divide-y divide-black/[0.06] dark:divide-white/[0.08]">
          {[
            {
              step: '01',
              title: 'High-Converting Websites & Online Stores',
              headline: 'Fast mobile shopping that turns visitors into buyers',
              description:
                'Your website is your best salesperson. I build modern, mobile-first websites and online shops that load instantly, display your products beautifully, and let customers check out in seconds with credit cards or digital payments.',
              highlights: [
                'Loads in under 2 seconds on mobile phones',
                'Simple, frictionless customer checkout',
                'Easy for you to update text, photos, and prices',
                'Built-in Google search optimization',
              ],
            },
            {
              step: '02',
              title: 'Smart AI Assistants That Save You Time',
              headline: 'Friendly AI that answers questions and handles daily work 24/7',
              description:
                'Stop answering the same customer questions every day. I build customized AI assistants trained on your business information that can answer inquiries instantly, help visitors pick products, and organize paperwork automatically.',
              highlights: [
                'Answers customers 24/7 without extra staff',
                'Trained specifically on your business information',
                'Handles document filing and repetitive tasks',
                'Keeps customer interactions secure and private',
              ],
            },
            {
              step: '03',
              title: 'Custom Business Portals & Staff Tools',
              headline: 'Replace messy spreadsheets with simple web dashboards',
              description:
                'Run your daily operations without paper chaos. I build simple, secure web platforms where your team can log daily attendance with phone QR codes, track customer orders, and compile automatic reports with zero manual errors.',
              highlights: [
                'Mobile phone QR check-ins for staff',
                'Eliminates manual timesheet mistakes',
                'Simple dashboards anyone on your team can use',
                'Saves days of administrative work every month',
              ],
            },
            {
              step: '04',
              title: 'Fast 2–4 Week Turnaround & 100% Peace of Mind',
              headline: 'Weekly test links, zero agency bureaucracy, you own everything',
              description:
                'No endless meetings or confusing tech jargon. You work directly with me from day one. Every week, you receive a live link to test on your phone. When we launch, you own 100% of all accounts, design files, and software.',
              highlights: [
                'Launch ready in just 2 to 4 weeks',
                'Weekly live demo links to test on your phone',
                '100% complete ownership of your site and code',
                '30 days of free support and guidance after launch',
              ],
            },
          ].map((item, idx) => (
            <div
              key={item.step}
              className={`pt-14 sm:pt-16 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start ${idx === 0 ? 'border-t-0 pt-0' : ''
                }`}
            >
              <div className="lg:col-span-4 space-y-2">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  {item.step} &bull; SERVICE PILLAR
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {item.headline}
                </p>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
                  {item.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {item.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <FaCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          03. VISUAL SHOWCASE OF PRODUCTION WORK (Continuous Marquee)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="w-full py-24 sm:py-32 scroll-mt-24 overflow-hidden"
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Visual showcase of{' '}
            <span className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400">
              real client products.
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-2xl mx-auto font-normal">
            Real websites, online stores, web apps, and AI automations shipped for businesses and founders.
          </p>
        </div>

        {/* 2-Line Infinite Carousel Container with Edge Gradient Masks */}
        <div className="relative w-full overflow-hidden space-y-8 sm:space-y-10 py-4">

          {/* Edge Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

          {/* ── LINE 1: Scrolling Left ── */}
          <div className="flex overflow-visible py-2">
            <div className="animate-infinite-carousel flex gap-6 sm:gap-8 items-stretch px-4">
              {infiniteRow1.map((item, idx) => (
                <div
                  key={`row1-${item.id}-${idx}`}
                  className="relative w-[300px] sm:w-[380px] md:w-[420px] aspect-[16/10] shrink-0 rounded-3xl overflow-hidden supaste-glass-card shadow-md hover:scale-[1.03] hover:z-20 transition-transform duration-220 ease-out group select-none cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 300px, 420px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                    <div className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-white/80 line-clamp-2 mt-1 font-normal">
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── LINE 2: Scrolling Right ── */}
          <div className="flex overflow-visible py-2">
            <div className="animate-infinite-carousel-reverse flex gap-6 sm:gap-8 items-stretch px-4">
              {infiniteRow2.map((item, idx) => (
                <div
                  key={`row2-${item.id}-${idx}`}
                  className="relative w-[300px] sm:w-[380px] md:w-[420px] aspect-[16/10] shrink-0 rounded-3xl overflow-hidden supaste-glass-card shadow-md hover:scale-[1.03] hover:z-20 transition-transform duration-220 ease-out group select-none cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 300px, 420px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                    <div className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-white/80 line-clamp-2 mt-1 font-normal">
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="text-center text-xs text-muted-foreground mt-4 select-none">
          <span>Continuous client showcase &bull; Hover over any card to pause</span>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          04. CLIENT REVIEWS & TESTIMONIALS (Spotlight Card)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-24 sm:py-32 scroll-mt-24"
      >
        <div className="w-full max-w-4xl mx-auto">

          <div className="mb-14 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Real feedback from{' '}
              <span className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400">
                real founders.
              </span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 font-normal">
              Direct reviews from startup founders, business owners, and operations directors I’ve worked with.
            </p>
          </div>

          {/* Carousel Container */}
          <div
            className="relative w-full"
            onMouseEnter={() => setIsReviewAutoplay(false)}
            onMouseLeave={() => setIsReviewAutoplay(true)}
          >
            {/* Top Carousel Navigation Bar */}
            <div className="flex items-center justify-between mb-5 px-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-foreground text-sm">
                  0{activeReviewIdx + 1} <span className="text-muted-foreground/40">/ 0{clientTestimonials.length}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsReviewAutoplay(!isReviewAutoplay)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#15161c] border border-black/[0.08] dark:border-white/[0.1] text-muted-foreground hover:text-foreground text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {isReviewAutoplay ? <FaPause className="w-2.5 h-2.5" /> : <FaPlay className="w-2.5 h-2.5" />}
                  <span>{isReviewAutoplay ? 'Auto-playing' : 'Paused'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevReview}
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#15161c] border border-black/[0.08] dark:border-white/[0.1] hover:border-amber-500/50 flex items-center justify-center text-foreground transition-colors cursor-pointer shadow-xs active:scale-90"
                  aria-label="Previous testimonial"
                >
                  <FaChevronLeft className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleNextReview}
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#15161c] border border-black/[0.08] dark:border-white/[0.1] hover:border-amber-500/50 flex items-center justify-center text-foreground transition-colors cursor-pointer shadow-xs active:scale-90"
                  aria-label="Next testimonial"
                >
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Spotlight Testimonial Card (Supaste Glass Card) */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReviewIdx}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                  className="relative w-full p-6 sm:p-10 lg:p-12 rounded-3xl supaste-glass-card flex flex-col justify-between overflow-hidden"
                >
                  {/* Autoplay Progress Line at Top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-black/[0.04] dark:bg-white/[0.06] overflow-hidden">
                    <div
                      key={activeReviewIdx}
                      className="h-full w-full bg-gradient-to-r from-amber-500 to-amber-400 origin-left will-change-transform"
                      style={{
                        animation: isReviewAutoplay ? 'reviewProgress 6.5s linear forwards' : 'none',
                        transformOrigin: 'left',
                      }}
                    />
                  </div>

                  {/* Large Quote */}
                  <div className="relative mb-8 pt-4">
                    <p className="text-lg sm:text-2xl lg:text-3xl text-foreground font-normal leading-relaxed">
                      &ldquo;{currentReview.quote}&rdquo;
                    </p>
                  </div>

                  {/* Client Info Footer */}
                  <div className="pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-zinc-950 font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                        {currentReview.clientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg text-foreground">
                          {currentReview.clientName}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground font-normal">
                          {currentReview.clientRole} &bull; <span className="text-foreground font-semibold">{currentReview.company}</span>
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                          {currentReview.project}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-600/15 dark:bg-emerald-400/20 px-3 py-1 rounded-full border border-emerald-600/30 dark:border-emerald-400/35">
                        {currentReview.highlightMetric}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-muted-foreground text-xs font-medium border border-black/[0.05] dark:border-white/[0.08]">
                        <FaStar className="w-3 h-3 text-amber-500" />
                        <span>5.0 Star Rating</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-1 mt-8">
              {clientTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveReviewIdx(idx)}
                  className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer group rounded-full"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-200 ${activeReviewIdx === idx
                        ? 'w-8 bg-amber-500'
                        : 'w-2 bg-black/20 dark:bg-white/20 group-hover:bg-amber-500/50'
                      }`}
                  />
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          05. FREQUENTLY ASKED QUESTIONS (Supaste Clean Accordion)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="w-full px-4 sm:px-6 md:px-12 lg:px-20 max-w-4xl mx-auto py-24 sm:py-32 scroll-mt-24"
      >
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Frequently Asked{' '}
            <span className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400">
              Questions.
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 font-normal">
            Straightforward answers about launch timelines, pricing, code ownership, and how we work together.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="divide-y divide-black/[0.08] dark:divide-white/[0.08] border-y border-black/[0.08] dark:border-white/[0.08]">
          {clientFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div key={faq.question} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full py-6 sm:py-7 flex items-center justify-between gap-4 text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm active:scale-[0.99] transition-transform duration-150"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] shrink-0">
                      {faq.number}
                    </span>
                    <h3 className="text-base sm:text-xl font-bold text-foreground tracking-tight group-hover:text-amber-500 transition-colors min-w-0">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="shrink-0 ml-2">
                    <span
                      className="w-7 h-7 flex items-center justify-center font-mono text-base font-bold text-foreground group-hover:text-amber-500 border border-black/[0.08] dark:border-white/[0.1] rounded-full bg-white dark:bg-[#15161c] transition-colors shadow-2xs"
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
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-0 sm:pl-[3.25rem] pr-4 sm:pr-10 text-muted-foreground text-sm sm:text-base leading-relaxed font-normal">
                        <p>{faq.answer}</p>
                        <div className="mt-4 pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Have a specific question?</span>
                          {onOpenChat ? (
                            <button
                              type="button"
                              onClick={onOpenChat}
                              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold transition-colors cursor-pointer"
                            >
                              Ask Arnel&apos;s AI Assistant &rarr;
                            </button>
                          ) : (
                            <a
                              href="#contact"
                              className="text-foreground hover:text-amber-500 font-semibold transition-colors uppercase tracking-wide text-[11px]"
                            >
                              Let’s talk &rarr;
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

        {/* Ask AI Advisor Banner */}
        {onOpenChat && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm">
              <span className="text-foreground font-medium">Have questions about your project scope or timeline?</span>
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500 text-zinc-950 font-semibold text-xs hover:bg-amber-400 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Ask AI Assistant</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}

      </section>


      {/* ─────────────────────────────────────────────────────────────
          06. DIRECT CONTACT SECTION (Clean, Approachable, No Wizard)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="w-full px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-28 sm:py-36 scroll-mt-24"
      >
        {/* Section Header (Zellify Exact Aesthetic) */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-muted-foreground mb-5">
            Contact
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight">
            How can I help?
          </h2>
          <p className="text-muted-foreground text-base sm:text-xl mt-4 font-normal leading-relaxed max-w-2xl mx-auto">
            I am here to help you bring your website, online store, or AI tool to life. Reach out with your project details and I will get back to you as soon as possible.
          </p>
        </div>

        {/* Zellify-Style 2-Column Split Card (Full Width, Large Scale) */}
        <div className="w-full rounded-[32px] sm:rounded-[40px] supaste-glass-card shadow-2xl border border-black/[0.08] dark:border-white/[0.12] overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.08] dark:divide-white/[0.08]">

            {/* Left Column: Project Inquiry */}
            <div className="p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground border border-black/[0.06] dark:border-white/[0.08]">
                  Project Inquiry
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                  Submit a project inquiry
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal max-w-md mx-auto">
                  Share your vision, project goals, or requirements for assistance with timelines and an accurate estimate.
                </p>
              </div>

              {/* Action Area: Form or Direct Button */}
              <div className="pt-8 w-full flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {contactSubmitted ? (
                    <motion.div
                      key="submitted"
                      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full text-center space-y-4 py-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                        <FaCheckCircle className="w-7 h-7" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground">Inquiry Ready!</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-normal max-w-sm mx-auto">
                        Your email client has opened with your project inquiry details. I will review and reply within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false)
                          setIsInquiryFormOpen(false)
                          setContactMessage('')
                        }}
                        className="text-sm font-semibold text-amber-500 hover:underline pt-2 cursor-pointer"
                      >
                        Submit another inquiry &rarr;
                      </button>
                    </motion.div>
                  ) : isInquiryFormOpen ? (
                    <motion.form
                      key="form"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleContactSubmit}
                      className="w-full max-w-lg space-y-4 text-left mx-auto"
                    >
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-foreground mb-1.5">
                          Name or Company
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => {
                            setContactName(e.target.value)
                            if (contactError) setContactError(null)
                          }}
                          placeholder="e.g. Alex Rivera"
                          className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-sm text-foreground focus:border-amber-500 focus:outline-hidden transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground mb-1.5">
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => {
                            setContactEmail(e.target.value)
                            if (contactError) setContactError(null)
                          }}
                          placeholder="e.g. alex@company.com"
                          className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-sm text-foreground focus:border-amber-500 focus:outline-hidden transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground mb-1.5">
                          Project Requirements &amp; Goals
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Tell me about what you want to build (e.g. online shop, web app, AI tool), desired launch date, or scope..."
                          className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-sm text-foreground focus:border-amber-500 focus:outline-hidden transition-colors resize-none leading-relaxed"
                        />
                      </div>

                      {contactError && <p className="text-xs text-red-500 font-medium">&bull; {contactError}</p>}

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="flex-1 py-3.5 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm tracking-tight shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Send Project Inquiry</span>
                          <FaArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsInquiryFormOpen(false)}
                          className="px-5 py-3.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground hover:text-foreground text-sm font-medium transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="button"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full flex flex-col items-center gap-3.5"
                    >
                      <button
                        type="button"
                        onClick={() => setIsInquiryFormOpen(true)}
                        className="w-full sm:w-auto min-w-[240px] px-10 py-4 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm tracking-tight shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                      >
                        <span>Submit a Project Inquiry</span>
                        <FaArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs text-muted-foreground">
                        Quick 1-minute inquiry form
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Direct Email */}
            <div className="p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground border border-black/[0.06] dark:border-white/[0.08]">
                  Direct E-mail
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                  Send me an e-mail
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal max-w-md mx-auto">
                  Contact me directly via e-mail if you have questions or prefer writing straight from your inbox.
                </p>
              </div>

              <div className="pt-8 w-full flex flex-col items-center gap-4">
                <a
                  href="mailto:arnlebaylon15@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
                  className="w-full sm:w-auto min-w-[240px] px-10 py-4 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm tracking-tight shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer truncate"
                >
                  <FaEnvelope className="w-4 h-4 shrink-0" />
                  <span className="truncate">arnlebaylon15@gmail.com</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1"
                >
                  {copiedEmail ? (
                    <>
                      <FaCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">Email copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-3.5 h-3.5" />
                      <span>Copy email address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Social Media Icons Below (No GitHub, Mobile Responsive) */}
        <div className="mt-16 sm:mt-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
            Connect &amp; Follow
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <a
              href="https://www.linkedin.com/in/arnel-baylon-b05233189"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.12] text-foreground text-xs sm:text-sm font-semibold transition-all duration-150 hover:scale-105 active:scale-95 shadow-2xs"
            >
              <FaLinkedin className="w-4 h-4 text-[#0A66C2] transition-transform group-hover:scale-110" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://www.facebook.com/arnel.baylon.1650"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Profile"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.12] text-foreground text-xs sm:text-sm font-semibold transition-all duration-150 hover:scale-105 active:scale-95 shadow-2xs"
            >
              <FaFacebook className="w-4 h-4 text-[#1877F2] transition-transform group-hover:scale-110" />
              <span>Facebook</span>
            </a>

            <a
              href="https://www.instagram.com/yheellll"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.12] text-foreground text-xs sm:text-sm font-semibold transition-all duration-150 hover:scale-105 active:scale-95 shadow-2xs"
            >
              <FaInstagram className="w-4 h-4 text-[#E1306C] transition-transform group-hover:scale-110" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@yheelllls"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Profile"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.12] text-foreground text-xs sm:text-sm font-semibold transition-all duration-150 hover:scale-105 active:scale-95 shadow-2xs"
            >
              <FaTiktok className="w-4 h-4 text-foreground transition-transform group-hover:scale-110" />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          07. SUPASTE DEEP BLACK FOOTER (Tightened, Zero Extra Space Below)
          Inverted scoop curve transition into black, single-line brand,
          Menu, Connect, Developer View, and clean architectural watermark
      ───────────────────────────────────────────────────────────── */}
      <footer id="footer" className="w-full bg-black text-white relative pt-4 pb-0 mb-0">

        {/* ── Top Inverted Corner Bridge (Supaste Scoop Transition) ── */}
        <div className="w-full h-8 relative overflow-hidden pointer-events-none -mt-8">
          <div className="w-full h-full bg-black rounded-t-[32px]" />
        </div>

        {/* ── Footer Main Content Grid ── */}
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 pt-8 pb-4 flex flex-col lg:flex-row gap-10 lg:gap-14 relative">

          {/* ── Left Column: Brand Identity, Headline, Bio, CTA, Copyright ── */}
          <div className="flex-[2] flex flex-col gap-4 min-w-0">

            {/* Logo / Brand Identity (Strict Single Line - No Double Liner!) */}
            <div className="flex items-center gap-3">
              <div className="relative w-[32px] h-[32px] rounded-[9px] overflow-hidden shrink-0 ring-1 ring-white/20 bg-zinc-900">
                <Image
                  src="/images/me.jpg"
                  alt="Arnel Baylon"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base tracking-tight text-white">
                  Arnel Baylon
                </span>
                <span className="text-white/40 text-xs font-mono px-2 py-0.5 rounded bg-white/10">
                  Engineer
                </span>
              </div>
            </div>

            {/* Dual Headline (Supaste style: Bold sans + Instrument Serif italic) */}
            <div className="flex flex-col gap-0">
              <span className="text-[24px] sm:text-[30px] font-bold tracking-[-0.04em] leading-[1.1em] text-white" style={{ fontFamily: "'Inter', 'Inter Display', sans-serif" }}>
                Build once.
              </span>
              <span className="text-[24px] sm:text-[30px] tracking-[-0.04em] leading-[1.1em] text-white italic" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Scale anytime.
              </span>
            </div>

            {/* Bio */}
            <p className="text-[13px] sm:text-[14px] leading-[1.5em] text-white/60 max-w-sm font-normal">
              Designing and building high-impact web apps, online stores, and custom AI tools that create real business advantages for founders.
            </p>

            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-[8px] bg-white text-black font-semibold text-xs tracking-tight hover:bg-white/90 active:scale-[0.97] transition-all duration-150 cursor-pointer shadow-sm mt-0.5"
            >
              <span>Start a Project</span>
              <FaArrowRight className="w-2.5 h-2.5" />
            </a>

            {/* Copyright */}
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[12px] text-white/40 font-mono">
                &copy; {new Date().getFullYear()} arnelbaylon.com &bull; All rights reserved
              </span>
              <div className="flex items-center gap-1.5 text-[12px] text-white/80">
                <span>Built with 💙 by</span>
                <a
                  href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors font-medium"
                >
                  <span>Arnel Baylon</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Column 1: Menu Navigation (Clean, no packages) ── */}
          <div className="flex flex-col gap-3 min-w-[120px]">
            <h4 className="text-white/40 font-mono text-xs uppercase tracking-wider font-semibold">
              Menu
            </h4>
            <nav className="flex flex-col gap-1.5">
              {[
                { label: 'Overview', href: '#hero' },
                { label: 'Services', href: '#capabilities' },
                { label: 'Work', href: '#projects' },
                { label: 'Reviews', href: '#testimonials' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] sm:text-[14px] font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Column 2: Connect Channels ── */}
          <div className="flex flex-col gap-3 min-w-[120px]">
            <h4 className="text-white/40 font-mono text-xs uppercase tracking-wider font-semibold">
              Connect
            </h4>
            <nav className="flex flex-col gap-1.5">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnel-baylon-b05233189', external: true },
                { label: 'GitHub', href: 'https://github.com/arnelbaylon', external: true },
                { label: 'TikTok', href: 'https://www.tiktok.com/@yheelllls', external: true },
                { label: 'Email', href: 'mailto:arnlebaylon15@gmail.com', external: false },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-[13px] sm:text-[14px] font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Engineering Spec ── */}
          <div className="flex flex-col gap-3 min-w-[140px]">
            <h4 className="text-white/40 font-mono text-xs uppercase tracking-wider font-semibold">
              Engineering Spec
            </h4>
            <nav className="flex flex-col gap-1.5">
              {onSwitchToTechMode && (
                <button
                  type="button"
                  onClick={onSwitchToTechMode}
                  className="text-[13px] sm:text-[14px] font-medium text-amber-400 hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <FaCode className="w-3 h-3 text-amber-400" />
                  <span>Developer View</span>
                </button>
              )}
              <a href="#hero" className="text-[13px] sm:text-[14px] font-medium text-white/80 hover:text-white transition-colors">
                Dossier
              </a>
              <a href="#capabilities" className="text-[13px] sm:text-[14px] font-medium text-white/80 hover:text-white transition-colors">
                Tech Stack
              </a>
              <a href="#projects" className="text-[13px] sm:text-[14px] font-medium text-white/80 hover:text-white transition-colors">
                Certifications
              </a>
              {onSwitchToTechMode && (
                <button
                  type="button"
                  onClick={() => {
                    onSwitchToTechMode()
                    setTimeout(() => {
                      const el = document.getElementById('typing')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }, 300)
                  }}
                  className="text-[13px] sm:text-[14px] font-medium text-amber-300/90 hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5 mt-1"
                >
                  <span>Typing Speed Lab ↗</span>
                </button>
              )}
            </nav>
          </div>

        </div>

        {/* ── Giant Architectural Watermark Wordmark (Snug at Bottom, Zero Extra Space) ── */}
        <div className="w-full max-w-[1200px] mx-auto flex items-end justify-center overflow-hidden h-[90px] sm:h-[130px] lg:h-[160px] relative select-none pointer-events-none pb-0 mb-0">
          <svg
            className="w-full h-auto block align-bottom"
            viewBox="0 0 1171 140"
            preserveAspectRatio="xMidYMax meet"
            style={{ overflow: 'hidden' }}
          >
            <text
              x="50%"
              y="90%"
              dominantBaseline="alphabetic"
              textAnchor="middle"
              fill="rgb(22, 22, 22)"
              style={{
                fontFamily: "'Inter', 'Inter Display', sans-serif",
                fontWeight: 800,
                fontSize: '150px',
                letterSpacing: '-8px',
                lineHeight: '1em',
              }}
            >
              ARNEL BAYLON
            </text>
          </svg>
        </div>

      </footer>

    </div>
  )
}
