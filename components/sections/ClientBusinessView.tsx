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
  FaEnvelope,
  FaCheck,
  FaGlobe,
  FaRobot,
  FaSyncAlt,
  FaQuestionCircle,
  FaExternalLinkAlt,
  FaStar,
  FaShieldAlt,
  FaRocket,
  FaBolt,
  FaLayerGroup,
  FaDatabase,
  FaCalendarAlt,
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'


// ── Accurate Project Showcase Data ──
interface ShowcaseProject {
  id: string
  title: string
  subtitle: string
  detail: string
  image: string
  category: string
  metric: string
  tags: string[]
  liveUrl?: string
}

const flagshipShowcaseProjects: ShowcaseProject[] = [
  {
    id: 'tearsize',
    title: 'Tearsize',
    subtitle: 'Modern E-Commerce Store',
    detail: 'Complete online apparel store featuring instant mobile checkout, real-time automated order notifications, and smooth inventory sync.',
    image: '/images/tearsize.jpg',
    category: 'E-Commerce',
    metric: 'Sub-2s Mobile Checkout',
    tags: ['Next.js', 'Stripe Payments', 'Tailwind CSS', 'Mobile First'],
  },
  {
    id: 'saktoka',
    title: 'sakto ka',
    subtitle: 'AI Career Intelligence Platform',
    detail: 'Interactive career platform that translates user experience into ATS-optimized resumes and provides personalized interview coaching.',
    image: '/images/saktoka.png',
    category: 'AI Platform',
    metric: '1,000+ First-Month Users',
    tags: ['Next.js', 'LLM Agents', 'Tailwind', 'FastAPI'],
  },
  {
    id: 'pixelcrew',
    title: 'Pixel Crew',
    subtitle: 'Autonomous Multi-Agent Workspace',
    detail: 'Visual multi-agent engineering studio where specialized AI assistants collaborate on architectural designs, coding tasks, and automated code review.',
    image: '/images/pixelcrew.png',
    category: 'Agentic AI',
    metric: 'Full Swarm Orchestration',
    tags: ['TypeScript', 'Multi-Agent', 'Canvas UI', 'WebSockets'],
  },
  {
    id: 'ebuddy',
    title: 'eBuddy Public Guide',
    subtitle: 'Citizen AI Navigation Assistant',
    detail: 'National award-winning AI assistant that guides citizens through official government services, documents, and filing requirements step-by-step.',
    image: '/images/egov.png',
    category: 'GovTech & AI',
    metric: 'Top 30 National Winner',
    tags: ['Next.js', 'RAG Pipeline', 'OpenAI', 'Multi-Lingual'],
  },
  {
    id: 'finops',
    title: 'FinOps AI Dashboard',
    subtitle: 'Cloud Cost Intelligence Dashboard',
    detail: 'Cloud financial management platform that monitors software infrastructure spend, highlights billing discrepancies, and unlocks recurring cost savings.',
    image: '/images/finops.jpg',
    category: 'Cloud & FinOps',
    metric: 'AWS Best Business Impact',
    tags: ['Next.js', 'AWS Cloud', 'Data Analytics', 'Chart.js'],
  },
  {
    id: 'vcm',
    title: 'VCM Academic HRIS',
    subtitle: 'Staffing & Payroll System',
    detail: 'Campus management platform with mobile QR check-ins, automated timesheet compilation, and error-free payroll calculation for academic staff.',
    image: '/images/vcm.jpg',
    category: 'Enterprise Operations',
    metric: 'Saved Days on Payroll',
    tags: ['Web App', 'QR Attendance', 'Automated Payroll', 'PostgreSQL'],
  },
]

const row1Projects = [
  {
    id: 'tearsize',
    title: 'Tearsize',
    detail: 'Online clothing store with fast mobile checkout and instant order updates',
    image: '/images/tearsize.jpg',
    badge: 'E-Commerce',
  },
  {
    id: 'saktoka',
    title: 'sakto ka',
    detail: 'AI career assistant that writes job-winning resumes and prepares you for interviews',
    image: '/images/saktoka.png',
    badge: 'AI Platform',
  },
  {
    id: 'pixelcrew',
    title: 'Pixel Crew',
    detail: 'Smart AI workspace where virtual assistants collaborate to build clean software',
    image: '/images/pixelcrew.png',
    badge: 'Agentic Studio',
  },
  {
    id: 'ebuddy',
    title: 'eBuddy',
    detail: 'Award-winning AI guide that helps everyday citizens navigate government paperwork',
    image: '/images/egov.png',
    badge: 'National Winner',
  },
  {
    id: 'finops',
    title: 'FinOps AI Dashboard',
    detail: 'Award-winning dashboard that helps companies track and reduce software costs',
    image: '/images/finops.jpg',
    badge: 'AWS Award',
  },
  {
    id: 'vcm',
    title: 'VCM HRIS',
    detail: 'Staff management platform with phone QR check-ins and automatic payroll calculation',
    image: '/images/vcm.jpg',
    badge: 'Operations',
  },
]

const row2Projects = [
  {
    id: 'bettertrece',
    title: 'Better Trece Martires',
    detail: 'Community portal that shares local town budgets and public projects in simple terms',
    image: '/images/bettertrece.png',
    badge: 'Civic Tech',
  },
  {
    id: 'pacementor',
    title: 'PaceMentor',
    detail: 'Personal running coach app with customized workout schedules and fitness tracking',
    image: '/images/pcaementor.jpg',
    badge: 'Mobile App',
  },
  {
    id: 'presentpo',
    title: 'Present Po',
    detail: 'Employee attendance tracker that verifies locations and generates daily timesheets',
    image: '/images/presentpo.jpg',
    badge: 'HR Platform',
  },
  {
    id: 'hivesync',
    title: 'HiveSync VA',
    detail: 'Business website with online appointment booking and automatic blog publishing',
    image: '/images/hivesync.jpg',
    badge: 'Client Portal',
  },
  {
    id: 'tmrc',
    title: 'TMRC',
    detail: 'Local running club website with event sign-ups and official race leaderboards',
    image: '/images/tmrc.jpg',
    badge: 'Sports & Community',
  },
  {
    id: 'saktoka-ats',
    title: 'sakto ka Resume Builder',
    detail: 'Resume builder designed to help job seekers stand out and get hired faster',
    image: '/images/saktoka.png',
    badge: 'Career Tool',
  },
]

// ── Client Testimonials Data ──
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

// ── FAQ Items ──
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

// ── Transparent Engagement Packages (Supaste Pricing Style) ──
interface ServicePackage {
  id: string
  name: string
  badge?: string
  headline: string
  timeline: string
  description: string
  inclusions: string[]
  isFeatured?: boolean
}

const engagementPackages: ServicePackage[] = [
  {
    id: 'sprint',
    name: 'Sprint MVP',
    headline: 'Rapid Prototyping & Focused Launch',
    timeline: '2–3 Weeks Delivery',
    description: 'Perfect for founders validating an early concept or businesses needing a fast, high-converting launch.',
    inclusions: [
      'Bespoke modern UI/UX design (desktop + mobile)',
      'High-performance Next.js / React build',
      'Contact / lead collection or email capture',
      'SEO setup & Core Web Vitals optimization',
      '14 days post-launch support & handoff call',
    ],
  },
  {
    id: 'full-build',
    name: 'Full Product Build',
    badge: 'Most Popular',
    headline: 'Complete Web App or AI Platform',
    timeline: '4–6 Weeks Delivery',
    description: 'A full-scale custom application, customer portal, or smart AI workflow engineered for serious business operations.',
    inclusions: [
      'Full architecture, UI/UX design & design system',
      'User authentication, role-based permissions & profiles',
      'Database integration (PostgreSQL / Supabase / Neon)',
      'Payment processing (Stripe / PayMongo) & billing flow',
      'Custom AI assistant or automation workflows',
      '30 days post-launch priority warranty & training',
    ],
    isFeatured: true,
  },
  {
    id: 'retainer',
    name: 'Product Retainer',
    headline: 'Dedicated Engineering Velocity',
    timeline: 'Monthly Check-In',
    description: 'Ongoing senior product engineering for growing teams that need regular feature releases, audits, and AI integrations.',
    inclusions: [
      'Dedicated weekly engineering sprint hours',
      'Continuous feature rollouts & performance tuning',
      'AI pipeline maintenance & prompt improvements',
      'Direct Slack / WhatsApp communication channel',
      'Weekly strategy & interactive product demo calls',
    ],
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

  // ── Active Preview Showcase State (macOS Window) ──
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState(0)

  // ── Testimonial State ──
  const [activeReviewIdx, setActiveReviewIdx] = useState(0)
  const [isReviewAutoplay, setIsReviewAutoplay] = useState(true)

  // ── FAQ State ──
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // ── Inquiry Form State ──
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

  // Testimonial Autoplay
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

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx))
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

  const currentActiveShowcase = flagshipShowcaseProjects[activeShowcaseIdx]
  const currentReview = clientTestimonials[activeReviewIdx]

  const infiniteRow1 = [...row1Projects, ...row1Projects]
  const infiniteRow2 = [...row2Projects, ...row2Projects]

  return (
    <div className="w-full min-h-screen text-foreground relative overflow-x-hidden bg-white dark:bg-[#0a0a0b]">

      {/* ─────────────────────────────────────────────────────────────
          01. SUPASTE-STYLE HERO SECTION
          Full-viewport dark hero with ambient glow, centered split
          headline (Inter Display Bold + Instrument Serif Italic),
          trust metrics, and macOS glass showcase window.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 pt-28 sm:pt-36 pb-16 scroll-mt-24 overflow-hidden bg-white dark:bg-[#0a0a0b]"
      >
        {/* Supaste Diffused Ambient Radial Glow */}
        <div className="absolute inset-0 supaste-glow pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">

          {/* Pill Badge (Supaste Signature Eyebrow) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.12] backdrop-blur-xl shadow-xs text-[12px] font-medium text-foreground mb-8 select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Full-Stack Product Engineer</span>
            <span className="text-muted-foreground/60">&bull;</span>
            <span className="text-muted-foreground">Available for Projects</span>
          </motion.div>

          {/* Master Headline (Supaste Exact: Bold sans + Instrument Serif italic, centered) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6"
          >
            <h1
              className="text-[50px] sm:text-[64px] md:text-[72px] lg:text-[80px] font-bold tracking-[-0.05em] leading-[1em] text-foreground text-center"
              style={{ fontFamily: "'Inter', 'Inter Display', sans-serif" }}
            >
              Ambitious ideas.
            </h1>
            <h1
              className="text-[50px] sm:text-[64px] md:text-[72px] lg:text-[80px] italic tracking-[-0.05em] leading-[1em] text-foreground text-center"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Shipped products.
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-normal"
          >
            I partner directly with founders and business teams to design, build, and ship custom web applications, autonomous AI workflows, and modern high-converting websites.
          </motion.p>

          {/* CTA Cluster (Supaste Style: Primary large pill + Secondary) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
          >
            {/* Primary Action Button (Supaste large pill: black bg, 20px radius) */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-[20px] bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm tracking-tight shadow-md hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 14px rgba(0,0,0,0.15)',
              }}
            >
              <span>Start a Project</span>
              <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Secondary Action: AI Advisor */}
            {onOpenChat && (
              <button
                type="button"
                onClick={onOpenChat}
                className="group inline-flex items-center gap-2 px-6 py-4 rounded-[20px] bg-white/80 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.12] backdrop-blur-xl text-foreground font-semibold text-sm tracking-tight shadow-xs hover:border-amber-500/40 active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <HiSparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>Ask Arnel&apos;s AI Advisor</span>
              </button>
            )}
          </motion.div>

          {/* Supaste Trust Metrics Row */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 text-[12px] text-muted-foreground select-none"
          >
            <span>2–4 Week Launch</span>
            <span>100% Code Ownership</span>
            <span>Direct 1-on-1 Partnership</span>
          </motion.div>

        </div>


      </section>


      {/* ─────────────────────────────────────────────────────────────
          03. FEATURED PROJECTS (2-Line Infinite Carousel Showcase)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="w-full py-24 sm:py-32 scroll-mt-24 overflow-hidden bg-white dark:bg-[#0a0a0b]"
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-muted-foreground mb-4">
            PROVEN TRACK RECORD
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Visual showcase of{' '}
            <span className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400">
              production
            </span>{' '}
            work.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-2xl mx-auto font-normal">
            Real websites, online stores, web apps, and AI automations shipped for businesses and founders worldwide.
          </p>
        </div>

        {/* 2-Line Infinite Carousel Container with Edge Gradient Masks */}
        <div className="relative w-full overflow-hidden space-y-8 sm:space-y-10 py-4">
          
          {/* Edge Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

          {/* ── LINE 1: Scrolling Left ── */}
          <div className="flex overflow-visible py-4">
            <div className="animate-infinite-carousel flex gap-6 sm:gap-8 items-stretch px-4">
              {infiniteRow1.map((item, idx) => (
                <div
                  key={`row1-${item.id}-${idx}`}
                  className="relative w-[300px] sm:w-[400px] md:w-[440px] aspect-[16/10] shrink-0 rounded-3xl overflow-hidden supaste-glass-card shadow-md hover:scale-[1.03] hover:z-20 transition-transform duration-220 ease-out group select-none cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 300px, 440px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium border border-white/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                    <div className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-white/80 line-clamp-2 mt-1">
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── LINE 2: Scrolling Right ── */}
          <div className="flex overflow-visible py-4">
            <div className="animate-infinite-carousel-reverse flex gap-6 sm:gap-8 items-stretch px-4">
              {infiniteRow2.map((item, idx) => (
                <div
                  key={`row2-${item.id}-${idx}`}
                  className="relative w-[300px] sm:w-[400px] md:w-[440px] aspect-[16/10] shrink-0 rounded-3xl overflow-hidden supaste-glass-card shadow-md hover:scale-[1.03] hover:z-20 transition-transform duration-220 ease-out group select-none cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 300px, 440px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium border border-white/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                    <div className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-white/80 line-clamp-2 mt-1">
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="text-center text-xs text-muted-foreground mt-4 select-none">
          <span>Continuous production showcase &bull; Hover over any card to pause</span>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          04. CLIENT PROOF & TESTIMONIALS (Spotlight Card)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-24 sm:py-32 scroll-mt-24 bg-white dark:bg-[#0a0a0b]"
      >
        <div className="w-full max-w-5xl mx-auto">
          
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold mb-4">
              CLIENT REVIEWS &amp; VERIFIED OUTCOMES
            </div>
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
                        <div className="text-xs font-mono text-amber-600 dark:text-amber-400 mt-0.5 font-medium">
                          {currentReview.project}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-600/15 dark:bg-emerald-400/20 px-3 py-1 rounded-full border border-emerald-600/30 dark:border-emerald-400/35">
                        {currentReview.highlightMetric}
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-muted-foreground text-xs font-mono font-medium border border-black/[0.05] dark:border-white/[0.08]">
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
                  onClick={() => handleSelectReview(idx)}
                  className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer group rounded-full"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-200 ${
                      activeReviewIdx === idx
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
          06. FREQUENTLY ASKED QUESTIONS (Supaste Clean Accordion)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="w-full px-4 sm:px-6 md:px-12 lg:px-20 max-w-4xl mx-auto py-24 sm:py-32 scroll-mt-24 bg-white dark:bg-[#0a0a0b]"
      >
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-muted-foreground mb-4">
            QUESTIONS &amp; ANSWERS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Frequently Asked{' '}
            <span className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400">
              Questions.
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-3 font-normal">
            Direct, plain-English answers about delivery timelines, pricing, code ownership, and how we work together.
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
                      {faq.tag}
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
                          <span className="text-muted-foreground">Have a unique requirement?</span>
                          {onOpenChat ? (
                            <button
                              type="button"
                              onClick={onOpenChat}
                              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold transition-colors cursor-pointer"
                            >
                              Ask Arnel&apos;s AI Advisor &rarr;
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
              <span className="text-foreground font-medium">Have a specific question about your scope or timeline?</span>
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


      {/* ─────────────────────────────────────────────────────────────
          07. DIRECT INQUIRY & CONTACT SECTION (Guided 3-Step Flow)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="w-full px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-24 sm:py-32 scroll-mt-24 bg-white dark:bg-[#0a0a0b]"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold mb-4">
              START A CONVERSATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              Let’s build something{' '}
              <span className="font-instrument italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-300 dark:via-amber-200 dark:to-amber-400">
                great.
              </span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 font-normal">
              Whether you need to build a custom web app from scratch, launch an online store, or integrate automated AI agents, I’d love to learn about your goals.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:arnlebaylon15@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl supaste-glass-card hover:border-amber-500/40 text-foreground transition-colors group shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground font-medium">Direct Email</div>
                  <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-amber-500 transition-colors truncate">
                    arnlebaylon15@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl supaste-glass-card hover:border-[#0A66C2]/50 text-foreground transition-colors group shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0A66C2]/15 text-[#0A66C2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground font-medium">LinkedIn Profile</div>
                  <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-amber-500 transition-colors truncate">
                    linkedin.com/in/arnel-baylon-b05233189
                  </div>
                </div>
              </a>
            </div>

            <div className="p-5 rounded-2xl supaste-glass-card text-xs text-muted-foreground space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Availability &amp; Time Zones</span>
              </div>
              <div>Working hours adapt smoothly to US, European, and Asia-Pacific time zones.</div>
              <div>Ready to begin new project sprints within 5 to 7 days.</div>
            </div>
          </div>

          {/* Right Column: 3-Step Guided Project Questionnaire */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl supaste-glass-card shadow-lg">
              {inquirySubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Ready!</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                    Your email client should have opened with your project brief. If it didn&apos;t open automatically, feel free to email me directly at{' '}
                    <a href="mailto:arnlebaylon15@gmail.com" className="text-foreground font-semibold underline">
                      arnlebaylon15@gmail.com
                    </a>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setInquirySubmitted(false)
                      setFormStep(1)
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] text-xs font-semibold text-foreground transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit}>
                  
                  {/* Step Progress Bar */}
                  <div className="flex items-center justify-between gap-2 mb-8 text-xs font-mono">
                    {[
                      { step: 1, label: '1. Project Type' },
                      { step: 2, label: '2. Project Scope' },
                      { step: 3, label: '3. Contact Details' },
                    ].map((s) => (
                      <div
                        key={s.step}
                        className={`flex-1 text-center pb-2 border-b-2 transition-colors ${
                          formStep === s.step
                            ? 'border-amber-500 font-bold text-foreground'
                            : formStep > s.step
                            ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : 'border-black/[0.08] dark:border-white/[0.1] text-muted-foreground'
                        }`}
                      >
                        {s.label}
                      </div>
                    ))}
                  </div>

                  {/* ── STEP 1: Select Type ── */}
                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={reduce ? false : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">What would you like to build?</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                          Select the category that best matches your project vision.
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { id: 'New Website or App', desc: 'Custom website, portal, or web app' },
                          { id: 'AI Assistant or Automation', desc: 'Smart bots, document parser, automated flow' },
                          { id: 'E-Commerce Store', desc: 'Online shop, checkout flow, payment setup' },
                          { id: 'Monthly Retainer or Review', desc: 'Ongoing feature sprints & advisory' },
                        ].map((opt) => {
                          const isSelected = inquiryType === opt.id
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setInquiryType(opt.id)}
                              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-500/10 border-amber-500/60 shadow-xs'
                                  : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-sm font-semibold ${isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`}>
                                  {opt.id}
                                </span>
                                {isSelected && <span className="text-amber-500 font-bold">&check;</span>}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
                            </button>
                          )
                        })}
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-3 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs tracking-tight shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Next: Scope &amp; Details</span>
                          <FaArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 2: Scope & Overview ── */}
                  {formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={reduce ? false : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">Tell me about your project</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                          Share what you want to achieve or any key features you have in mind.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-2">Desired Timeline</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            'Fast sprint (2–3 weeks)',
                            'Standard pace (4–6 weeks)',
                            'Flexible / Exploration',
                            'Ongoing monthly',
                          ].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setInquiryForm({ ...inquiryForm, timeline: t })}
                              className={`p-3 rounded-xl text-xs font-medium border text-left transition-colors cursor-pointer ${
                                inquiryForm.timeline === t
                                  ? 'bg-amber-500/15 border-amber-500/50 text-foreground font-semibold'
                                  : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.08] text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="inquiry-msg" className="block text-xs font-semibold text-foreground mb-2">
                          Project Summary &amp; Goals
                        </label>
                        <textarea
                          id="inquiry-msg"
                          rows={4}
                          value={inquiryForm.message}
                          onChange={(e) => {
                            setInquiryForm({ ...inquiryForm, message: e.target.value })
                            if (formError) setFormError(null)
                          }}
                          placeholder="What is your business? What problem are we solving? Any reference websites or apps you admire?"
                          className="w-full px-4 py-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.1] focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors resize-none leading-relaxed"
                        />
                        {formError && <p className="text-xs text-red-500 mt-1.5">&bull; {formError}</p>}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <FaArrowLeft className="w-2.5 h-2.5" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-3 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs tracking-tight shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Next: Contact Details</span>
                          <FaArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3: Contact Details ── */}
                  {formStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={reduce ? false : { opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">Your Contact Information</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
                          Where should I send my thoughts and recommendations?
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label htmlFor="inquiry-name" className="block text-xs font-medium text-foreground mb-1">
                            Your Name or Company
                          </label>
                          <input
                            id="inquiry-name"
                            type="text"
                            required
                            value={inquiryForm.name}
                            onChange={(e) => {
                              setInquiryForm({ ...inquiryForm, name: e.target.value })
                              if (formError) setFormError(null)
                            }}
                            placeholder="e.g. Sarah Jenkins (Founder, Apex Systems)"
                            className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.1] focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="inquiry-email" className="block text-xs font-medium text-foreground mb-1">
                            Your Email Address
                          </label>
                          <input
                            id="inquiry-email"
                            type="email"
                            required
                            value={inquiryForm.email}
                            onChange={(e) => {
                              setInquiryForm({ ...inquiryForm, email: e.target.value })
                              if (formError) setFormError(null)
                            }}
                            placeholder="e.g. sarah@apexsystems.com"
                            className="w-full px-4 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.1] focus:border-amber-500 focus:outline-hidden text-sm text-foreground transition-colors"
                          />
                        </div>

                        {formError && <p className="text-xs text-red-500">&bull; {formError}</p>}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <FaArrowLeft className="w-2.5 h-2.5" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs tracking-tight shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Send Project Inquiry</span>
                          <FaArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-center text-[11px] text-muted-foreground">
                        I personally reply within 24 hours &bull; 100% confidential and direct
                      </div>
                    </motion.div>
                  )}

                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          08. SUPASTE DEEP BLACK FOOTER
          Exact Supaste design: inverted white-to-black SVG fillet
          transition, left brand column, 3 link columns, giant watermark
      ───────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-black text-white relative" style={{ marginTop: 0 }}>


        {/* ── Footer Content ── */}
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 pt-16 pb-10 flex flex-col lg:flex-row gap-10 lg:gap-10 relative">

          {/* ── Left Column: Brand, Headline, Bio, CTA, Copyright ── */}
          <div className="flex-[2] flex flex-col gap-5 min-w-0">

            {/* Logo / Brand Identity */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-[30px] h-[30px] rounded-[8px] overflow-hidden shrink-0 ring-1 ring-white/20 bg-zinc-900">
                <Image
                  src="/images/me.jpg"
                  alt="Arnel Baylon"
                  fill
                  sizes="30px"
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-sm tracking-[-0.02em] text-white">
                Arnel Baylon
              </span>
              <span className="text-white/40 text-sm tracking-[-0.02em]">
                Engineer
              </span>
            </div>

            {/* Bold Headline (Supaste style: "Copy once." + italic "Reuse anytime.") */}
            <div className="flex flex-col gap-0">
              <span className="text-[28px] sm:text-[30px] font-bold tracking-[-0.05em] leading-[1em] text-white" style={{ fontFamily: "'Inter', 'Inter Display', sans-serif" }}>
                Build once.
              </span>
              <span className="text-[28px] sm:text-[30px] tracking-[-0.05em] leading-[1em] text-white italic" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                Scale anytime.
              </span>
            </div>

            {/* Bio */}
            <p className="text-[14px] leading-[1.4em] tracking-[-0.01em] text-white/60 max-w-sm">
              Designing and engineering high-impact web apps, AI agent workflows, and digital platforms that generate unfair competitive advantages for founders and businesses.
            </p>

            {/* CTA Button (Supaste exact: white bg, black text, 8px radius) */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-[8px] bg-white text-black font-semibold text-xs tracking-tight hover:bg-white/90 active:scale-[0.97] transition-all duration-150 cursor-pointer"
            >
              <span>Start a Project</span>
              <FaArrowRight className="w-2.5 h-2.5" />
            </a>

            {/* Copyright */}
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-[12px] leading-[1.6em] text-white/40">
                &copy; {new Date().getFullYear()} arnelbaylon.com — All rights reserved
              </span>
              <div className="flex items-center gap-1.5 text-[12px] leading-[1.6em] text-white">
                <span>Built with 💙 by</span>
                <a
                  href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                >
                  <div className="relative w-[24px] h-[24px] rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/images/me.jpg"
                      alt="Arnel Baylon"
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium">Arnel Baylon</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Column: Menu ── */}
          <div className="flex flex-col gap-4 min-w-[120px]">
            <h6 className="text-white/40 font-semibold text-sm tracking-[-0.02em]">
              Menu
            </h6>
            <nav className="flex flex-col gap-0">
              {[
                { label: 'Overview', href: '#hero' },
                { label: 'Capabilities', href: '#capabilities' },
                { label: 'Projects', href: '#projects' },
                { label: 'Reviews', href: '#testimonials' },
                { label: 'Packages', href: '#packages' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[14px] font-medium tracking-[-0.02em] text-white py-1 hover:text-amber-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Column: Connect ── */}
          <div className="flex flex-col gap-4 min-w-[120px]">
            <h6 className="text-white/40 font-semibold text-sm tracking-[-0.02em]">
              Connect
            </h6>
            <nav className="flex flex-col gap-0">
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
                  className="text-[14px] font-medium tracking-[-0.02em] text-white py-1 hover:text-amber-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Column: Engineering Spec ── */}
          <div className="flex flex-col gap-4 min-w-[140px]">
            <h6 className="text-white/40 font-semibold text-sm tracking-[-0.02em]">
              Engineering Spec
            </h6>
            <nav className="flex flex-col gap-0">
              {onSwitchToTechMode && (
                <button
                  type="button"
                  onClick={onSwitchToTechMode}
                  className="text-[14px] font-medium tracking-[-0.02em] text-white py-1 hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <FaCode className="w-3 h-3 text-amber-400" />
                  <span>Developer View</span>
                </button>
              )}
              <a href="#hero" className="text-[14px] font-medium tracking-[-0.02em] text-white py-1 hover:text-amber-300 transition-colors">
                Dossier
              </a>
              <a href="#capabilities" className="text-[14px] font-medium tracking-[-0.02em] text-white py-1 hover:text-amber-300 transition-colors">
                Tech Stack
              </a>
              <a href="#projects" className="text-[14px] font-medium tracking-[-0.02em] text-white py-1 hover:text-amber-300 transition-colors">
                Certifications
              </a>
            </nav>
          </div>

        </div>

        {/* ── Giant Architectural Watermark Wordmark ── */}
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center overflow-hidden h-[180px] sm:h-[220px] lg:h-[320px] relative">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1171 160"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: 'visible' }}
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="rgb(18, 18, 18)"
              style={{
                fontFamily: "'Inter', 'Inter Display', sans-serif",
                fontWeight: 700,
                fontSize: '160px',
                letterSpacing: '-10px',
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
