'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram,
  FaExternalLinkAlt, FaArrowRight, FaRocket, FaBrain, FaSyncAlt, FaPlug, FaRobot, FaNetworkWired
} from 'react-icons/fa'
import { MdCloud } from 'react-icons/md'
import {
  SiFlutter, SiNextdotjs, SiLaravel, SiPhp, SiMysql, SiTypescript, SiSupabase,
  SiReact, SiVuedotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiVercel, SiGit,
  SiFigma, SiTrello, SiDart, SiPostgresql
} from 'react-icons/si'
import { Sidebar } from '@/components/Sidebar'
import { DraggableMasonry } from '@/components/DraggableMasonry'
import { TechMarquee } from '@/components/TechMarquee'
import { GithubActivity } from '@/components/GithubActivity'
import { InquiryForm } from '@/components/contact/InquiryForm'
import { HeroGraphicBackground } from '@/components/HeroGraphicBackground'
import { SectionGraphicAccent } from '@/components/SectionGraphicAccent'
import { SectionCardWatermark } from '@/components/SectionCardWatermark'
import { PageAmbientBackground } from '@/components/PageAmbientBackground'
import { projectsData } from '@/lib/data/projects'
import Link from 'next/link'

const techIcons: Record<string, React.ReactNode> = {
  "Context Engineering": <FaBrain />,
  "Agentic Loops": <FaSyncAlt />,
  "API Integration": <FaPlug />,
  "LLM Orchestration": <FaRobot />,
  "RAG Architectures": <FaNetworkWired />,
  "Prompt Engineering": <FaRocket />,
  "Flutter": <SiFlutter />,
  "Dart": <SiDart />,
  "Next.js": <SiNextdotjs />,
  "AI": <FaRocket />,
  "Laravel": <SiLaravel />,
  "PHP": <SiPhp />,
  "PostgreSQL": <SiPostgresql />,
  "MySQL": <SiMysql />,
  "TypeScript": <SiTypescript />,
  "Supabase": <SiSupabase />,
  "React": <SiReact />,
  "Vue.js": <SiVuedotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  "Node.js": <SiNodedotjs />,
  "Firebase (NoSQL)": <SiFirebase />,
  "Firebase": <SiFirebase />,
  "Vercel": <SiVercel />,
  "AWS": <MdCloud />,
  "Git": <SiGit />,
  "Figma": <SiFigma />,
  "Trello": <SiTrello />
}



const experience = [
  {
    org: 'General Emilio Aguinaldo Memorial Hospital',
    role: 'Intern Full-Stack Developer (486 Hours)',
    location: 'Cavite, Philippines',
    period: '2026',
    bullets: [
      'Developed a hospital queuing system with AI integration using Vue.js, PHP, MySQL, and Groq LLM; provided IT support and streamlined patient workflows.',
      'Built full-stack solutions integrating frontend interfaces with secure backend APIs, collaborating directly with hospital staff on requirements.',
    ],
  },
  {
    org: 'VCM HRIS Capstone Project',
    role: 'Full-Stack Developer',
    location: 'Philippines',
    period: '2025 – 2026',
    bullets: [
      'Architected a QR-code-based HRIS with modules for employee management, leave tracking, job applications, real-time notifications, and payroll integration.',
      'Led full system architecture, database schema design, and API development ensuring production-ready code quality, security, and scalability.',
    ],
  },
  {
    org: 'Freelance Software Developer',
    role: 'Independent Consultant',
    location: 'Remote, Philippines',
    period: '2025 – Present',
    bullets: [
      'Delivered custom software systems for SMEs and organizations, managing end-to-end project lifecycles from discovery and design through deployment.',
      'Built Present Po (attendance & time-tracking), Tearsize (e-commerce), and HiveSync (virtual assistant platform) as freelance engagements with client-owned production deployments.',
    ],
  },
]



const certifications = [
  {
    issuer: 'IBM',
    title: 'IBM AI Certifications',
    count: '7 Topics',
    badges: [
      '82e8f4a4-6ae5-4bea-8b5e-212cf6ec6563',
      '06cc685a-5d6c-49fe-bc49-f86e53e5417e',
    ],
    topics: [
      'AI Fundamentals: Foundations for Understanding AI',
      'AI Forms and Functions',
      'Introduction to Artificial Intelligence',
      'Machine Learning',
      'Neural Networks and Deep Learning',
      'Retrieval-Augmented Generation for Enhanced AI Outputs',
      'The Intelligence Behind AI',
    ],
  },
  {
    issuer: 'AWS',
    title: 'AWS Certifications',
    count: '4 Topics',
    badges: ['7d53aa8f-5672-4064-b296-f6fccf400108'],
    topics: [
      'Advanced SQL and Database Design',
      'AWS Knowledge: Object Storage',
      'Generative AI',
      'Serverless Mindset',
    ],
  },
]

const skillGroups = [
  {
    label: 'AI & Context Engineering',
    items: [
      'Context Engineering',
      'Agentic Loops',
      'API Integration',
      'LLM Orchestration',
      'RAG Architectures',
      'Prompt Engineering',
    ],
  },
  { label: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript', 'Flutter'] },
  { label: 'Backend & Databases', items: ['Laravel', 'PHP', 'Node.js', 'PostgreSQL', 'MySQL', 'Firebase (NoSQL)', 'Supabase'] },
  { label: 'DevOps & Tools', items: ['Vercel', 'AWS', 'Git', 'Figma', 'Trello'] },
]

const contactLinks = [
  { label: 'Email', value: 'arnelbaylon15@gmail.com', href: 'mailto:arnelbaylon15@gmail.com', icon: <FaEnvelope /> },
  { label: 'GitHub', value: 'github.com/hiroqt', href: 'https://github.com/hiroqt', icon: <FaGithub /> },
  { label: 'LinkedIn', value: 'linkedin.com/in/arnel-baylon', href: 'https://www.linkedin.com/in/arnel-baylon-b05233189', icon: <FaLinkedin /> },
  { label: 'Facebook', value: 'facebook.com/arnel.baylon', href: 'https://www.facebook.com/arnel.baylon.1650', icon: <FaFacebook /> },
  { label: 'Instagram', value: '@yheellll', href: 'https://www.instagram.com/yheellll?igsh=MWYxMDZlMzYzNXA2dw', icon: <FaInstagram /> },
]

function SectionHeading({
  id,
  label,
  action,
  accent,
}: {
  id: string
  label: string
  action?: React.ReactNode
  accent?: 'education' | 'experience' | 'projects' | 'skills' | 'certifications' | 'gallery' | 'github' | 'contact'
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-8 pb-3 border-b border-border/60">
      <div className="flex items-center gap-4 flex-wrap">
        <h2 className="text-sm sm:text-base font-display font-semibold tracking-widest uppercase text-foreground flex items-center gap-1.5">
          <span className="text-accent mr-2 opacity-80">{id}</span> {label}
        </h2>
        {accent && <SectionGraphicAccent section={accent} className="hidden sm:block" />}
      </div>
      {action}
    </div>
  )
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [phase, setPhase] = useState<'drop' | 'name' | 'done'>('drop')

  useEffect(() => {
    // If returning to a specific section (hash is present), skip intro
    if (typeof window !== 'undefined' && window.location.hash) {
      setPhase('done')
      return
    }

    // Sequence timings
    const t1 = setTimeout(() => setPhase('name'), 600) // Water drop falls for 600ms
    const t2 = setTimeout(() => setPhase('done'), 2200) // Name stays for 1600ms
    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [])

  useEffect(() => {
    // Load Credly badge script
    const credlyScript = document.createElement('script')
    credlyScript.src = 'https://cdn.credly.com/assets/utilities/embed.js'
    credlyScript.async = true
    document.body.appendChild(credlyScript)

    return () => {
      if (credlyScript.parentNode) {
        credlyScript.parentNode.removeChild(credlyScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Intro Animation Layer */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
            exit={{ opacity: 0, backgroundColor: 'transparent' }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Water Drop */}
            <AnimatePresence>
              {phase === 'drop' && (
                <motion.div
                  key="drop"
                  initial={{ y: '-50vh', scaleY: 1.5, scaleX: 0.5 }}
                  animate={{ y: 0, scaleY: 1, scaleX: 1 }}
                  exit={{ scale: 3, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: "easeIn", exit: { duration: 0.2, ease: "easeOut" } }}
                  className="absolute w-8 h-8 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-black dark:bg-white blur-[2px]"
                />
              )}
            </AnimatePresence>

            {/* Name at Center */}
            <AnimatePresence>
              {phase === 'name' && (
                <motion.div
                  key="nameCenter"
                  layoutId="hero-title"
                  initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="absolute flex flex-col items-center text-center"
                >
                  <h1 className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] xl:text-[11rem] font-display font-bold leading-none tracking-tighter capitalize text-foreground whitespace-nowrap">
                    Arnel Baylon
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar />

      {/* Header removed for sidebar */}

      {/* Masthead with Full Screen Illustrated Graphic Background */}
      <header className="w-full min-h-screen relative overflow-hidden">
        <HeroGraphicBackground variant="hero" className="w-full min-h-screen">
          <Reveal>
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 pt-32 sm:pt-44 md:pt-56 pb-12 sm:pb-16 flex flex-col items-center text-center">
              
              {/* Intro Name Badge & Title */}
              <div className="mb-4 sm:mb-6">
                {phase === 'done' ? (
                  <motion.div
                    layoutId="hero-title"
                    transition={{ type: 'spring', damping: 25, stiffness: 100 }}
                  >
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-foreground font-semibold px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-muted border border-border backdrop-blur-md mb-4 sm:mb-6 shadow-sm transition-colors">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      Arnel Baylon • Portfolio
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal tracking-tight text-foreground max-w-5xl mx-auto leading-[1.12] sm:leading-[1.08] transition-colors">
                      Context engineering & <br className="hidden sm:inline" />
                      <span className="italic font-light text-accent">full-stack systems</span> made easy.
                    </h1>
                  </motion.div>
                ) : (
                  <div className="opacity-0">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif">
                      Arnel Baylon
                    </h1>
                  </div>
                )}
              </div>

              {/* Subtitle / Description - Crisp High-Contrast Theme-Adaptive Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="w-full max-w-2xl sm:max-w-3xl mt-2 sm:mt-4"
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-normal leading-relaxed transition-colors px-2">
                  Building intelligent client operations tools, context-engineered LLM workflows, and resilient web & mobile applications — giving total clarity and speed to modern teams.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground transition-colors"
              >
                <a
                  href="https://github.com/hiroqt"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile (opens in new tab)"
                  className="hover:text-foreground transition-colors flex items-center gap-1.5 sm:gap-2"
                >
                  <FaGithub className="text-sm sm:text-base" /> <span>GitHub</span>
                </a>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile (opens in new tab)"
                  className="hover:text-[#0e2c2b] dark:hover:text-white transition-colors flex items-center gap-1.5 sm:gap-2"
                >
                  <FaLinkedin className="text-sm sm:text-base" /> <span>LinkedIn</span>
                </a>
              </motion.div>

              {/* Tech Marquee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="w-full mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-900/10 dark:border-white/15 overflow-hidden"
              >
                <TechMarquee />
              </motion.div>
            </div>
          </Reveal>
        </HeroGraphicBackground>
      </header>

      <main id="main-content" tabIndex={-1} className="relative max-w-screen-2xl mx-auto px-8 pb-14 pt-8 sm:pb-20 sm:pt-12 outline-none">
        {/* Full-Page Architectural Ambient Background Graphic System (WCAG Compliant) */}
        <PageAmbientBackground />

        {/* 01 — Education */}
        <section id="education" className="relative z-10 pt-12 scroll-mt-20">
          <SectionHeading id="01" label="education" accent="education" />
          <Reveal>
            <div className="relative gemini-card p-6 overflow-hidden">
              <SectionCardWatermark variant="education" className="right-4 bottom-2" />
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-semibold uppercase tracking-wide text-sm sm:text-base">
                    Cavite State University — Trece Martires Campus
                  </h3>
                  <span className="text-xs sm:text-sm text-muted-foreground shrink-0 tabular-nums">
                    Cavite, Philippines
                  </span>
                </div>
                <p className="mt-1 text-sm">Bachelor of Science in Information Technology</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 02 — Experience */}
        <section id="experience" className="relative z-10 pt-12 scroll-mt-20">
          <SectionHeading id="02" label="experience" accent="experience" />
          <div className="space-y-8">
            {experience.map((job, i) => (
              <Reveal key={job.org} delay={i * 0.06}>
                <div className="relative gemini-card p-6 overflow-hidden">
                  <SectionCardWatermark variant={i === 0 ? "experience-1" : "experience-2"} className="right-3 bottom-3" />
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h3 className="font-semibold uppercase tracking-wide text-sm sm:text-base">
                        {job.org}
                      </h3>
                      <span className="text-xs sm:text-sm text-muted-foreground shrink-0">
                        {job.location}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <p className="text-sm font-medium text-accent">{job.role}</p>
                      <span className="text-xs sm:text-sm text-muted-foreground shrink-0 tabular-nums">
                        {job.period}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                          <span aria-hidden className="text-accent shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 03 — Projects */}
        <section id="projects" className="relative z-10 pt-12 scroll-mt-20">
          <SectionHeading
            id="03"
            label="projects"
            accent="projects"
            action={
              <a
                href="https://github.com/hiroqt?tab=repositories"
                target="_blank"
                rel="noreferrer"
                aria-label="View all projects on GitHub (opens in new tab)"
                className="group inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors print:hidden"
              >
                all projects
                <FaArrowRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </a>
            }
          />
          <div className="relative h-[450px] sm:h-[500px] flex items-center justify-center w-full max-w-5xl mx-auto overflow-x-clip my-8 group">
            {/* Left Card: Present Po */}
            <div className="absolute w-[280px] sm:w-[360px] h-[340px] bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-700 transform -rotate-12 -translate-x-12 sm:-translate-x-48 translate-y-4 group-hover:-translate-x-20 sm:group-hover:-translate-x-64 group-hover:-rotate-6 z-0 hover:z-20 hover:scale-105 cursor-pointer hidden sm:block overflow-hidden group/card flex flex-col justify-between">
              <Link href="/projects/present-po" className="absolute inset-0 z-20"><span className="sr-only">View details for Present Po project</span></Link>
              <div>
                <div className="flex gap-2 mb-4 flex-wrap relative z-10">
                  <span className="bg-foreground text-background text-[9px] font-mono px-2 py-1 rounded-full flex items-center gap-1">✦ FEATURED APP ❯</span>
                  <span className="border border-border text-foreground text-[9px] font-mono px-2 py-1 rounded-full bg-background">B2B SOLUTION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground relative z-10 group-hover/card:text-transparent transition-colors duration-300">Present Po</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">Workforce attendance and time-tracking platform with scheduling, presence monitoring, and automated reporting.</p>
              </div>
              <div className="mt-4 pointer-events-none opacity-80 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">
                <iframe src="https://appbuildersph.com/embed/apps/present-po" title="Present Po votes counter widget" width="320" height="72" style={{ border: 0, width: '100%', maxWidth: '100%' }} loading="lazy" scrolling="no" />
              </div>
              <img src="/images/presentpo.png" alt="Present Po application screenshot preview" className="absolute left-1/2 -bottom-20 w-[85%] h-auto rounded-t-xl shadow-2xl opacity-0 transform -translate-x-1/2 group-hover/card:-translate-y-20 group-hover/card:opacity-100 transition-all duration-500 z-0" />
            </div>

            {/* Right Card: e Buddy */}
            <div className="absolute w-[280px] sm:w-[360px] h-[340px] bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-700 transform rotate-12 translate-x-12 sm:translate-x-48 translate-y-4 group-hover:translate-x-20 sm:group-hover:translate-x-64 group-hover:rotate-6 z-0 hover:z-20 hover:scale-105 cursor-pointer hidden sm:block overflow-hidden group/card flex flex-col justify-start">
              <Link href="/projects/e-buddy" className="absolute inset-0 z-20"><span className="sr-only">View details for e Buddy project</span></Link>
              <div className="flex gap-2 mb-4 flex-wrap relative z-10">
                <span className="bg-foreground text-background text-[9px] font-mono px-2 py-1 rounded-full flex items-center gap-1">✦ WINNER - TOP 30 ❯</span>
                <span className="border border-border text-foreground text-[9px] font-mono px-2 py-1 rounded-full bg-background">EGOV 2026</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground relative z-10 group-hover/card:text-transparent transition-colors duration-300">e Buddy</h3>
              <p className="text-xs sm:text-sm text-muted-foreground relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">Winner of eGov Hackathon 2026 (Top 30). Designed to unify government agencies and make public services seamless using an agentic AI named e Buddy.</p>
              <img src="/images/egov.png" alt="e Buddy application screenshot preview" className="absolute left-1/2 -bottom-20 w-[85%] h-auto rounded-t-xl shadow-2xl opacity-0 transform -translate-x-1/2 group-hover/card:-translate-y-24 group-hover/card:opacity-100 transition-all duration-500 z-0" />
            </div>

            {/* Center Card: PaceMentor */}
            <div className="absolute w-[300px] sm:w-[420px] h-[400px] bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-700 transform z-10 group-hover:-translate-y-6 hover:scale-105 cursor-pointer overflow-hidden group/card flex flex-col justify-between">
              <Link href="/projects/pacementor" className="absolute inset-0 z-20"><span className="sr-only">View details for PaceMentor project</span></Link>
              <div>
                <div className="flex gap-2 mb-6 flex-wrap relative z-10">
                  <span className="bg-foreground text-background text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-1">✦ AI RUNNING COACH ❯</span>
                  <span className="border border-border text-foreground text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-full bg-background">STRAVA READY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground relative z-10 group-hover/card:text-transparent transition-colors duration-300">PaceMentor</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">AI-powered running coach with adaptive training plans, real-time GPS tracking, and Strava integration — from first steps to personal best.</p>
              </div>
              <div className="mt-4 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">
                <iframe src="https://appbuildersph.com/embed/apps/pacementor" title="PaceMentor votes counter widget" width="320" height="72" style={{ border: 0, width: '100%' }} loading="lazy" scrolling="no" />
              </div>
              <img src="/images/pcaementor.png" alt="PaceMentor application screenshot preview" className="absolute left-1/2 -bottom-24 w-[90%] h-auto rounded-t-2xl shadow-2xl opacity-0 transform -translate-x-1/2 group-hover/card:-translate-y-28 group-hover/card:opacity-100 transition-all duration-500 z-0" />
            </div>
          </div>

          <div className="space-y-6 mt-8 sm:mt-12 max-w-4xl mx-auto">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-4 mb-8">Other Projects</h3>
            {projectsData.filter(p => !p.isFeatured).map((project, i) => {
              const isLive = project.link !== '#'

              return (
                <Reveal key={project.title} delay={i * 0.05}>
                  <div className="relative mb-4 group/row cursor-pointer p-4 sm:p-6 rounded-2xl hover:bg-muted/30 border border-transparent hover:border-border/50 transition-all duration-500 overflow-visible flex items-center justify-between -mx-4 sm:-mx-6">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="absolute inset-0 z-20"
                      aria-label={`View details for ${project.title} project`}
                    >
                      <span className="sr-only">View details for {project.title} project</span>
                    </Link>
                    <div className="relative z-10 w-full sm:w-2/3 transition-transform duration-500 group-hover/row:translate-x-2 group-hover/row:-translate-y-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-lg sm:text-2xl font-display font-bold text-foreground group-hover/row:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        {project.type && (
                          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border border-border/60 text-muted-foreground group-hover/row:border-accent/40 group-hover/row:text-accent transition-colors duration-300">
                            {project.type}
                          </span>
                        )}
                        {isLive && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View live site for ${project.title} (opens in new tab)`}
                            className="relative z-30 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 ml-auto sm:ml-0"
                          >
                            live ↗
                          </a>
                        )}
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed transition-colors duration-500 group-hover/row:text-foreground/80">
                        {project.summary}
                      </p>
                      <div className="mt-4 flex gap-2 flex-wrap">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs text-muted-foreground/70 font-mono group-hover/row:text-muted-foreground transition-colors duration-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hover Arrow Indicator */}
                    <div className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border/40 items-center justify-center opacity-0 -translate-x-4 group-hover/row:opacity-100 group-hover/row:translate-x-0 group-hover/row:border-accent/40 group-hover/row:text-accent transition-all duration-500">
                      <FaArrowRight className="text-sm transform -rotate-45 group-hover/row:rotate-0 transition-transform duration-500" />
                    </div>

                    {project.image && (
                      <div className="hidden sm:block absolute left-1/2 sm:left-[60%] bottom-full -translate-x-1/2 mb-4 w-[320px] h-[200px] z-50 pointer-events-none perspective-1000">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover rounded-xl shadow-2xl opacity-0 group-hover/row:opacity-100 transform translate-y-8 group-hover/row:translate-y-0 rotate-x-12 group-hover/row:rotate-x-0 scale-95 group-hover/row:scale-100 transition-all duration-500 ease-out origin-bottom"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* 04 — Skills */}
        <section id="skills" className="relative z-10 pt-12 scroll-mt-20">
          <SectionHeading id="04" label="skills" accent="skills" />
          <div className="relative p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border/40 overflow-hidden">
            <SectionCardWatermark variant="skills" className="right-4 top-4" />
            <div className="relative z-10 space-y-8 sm:space-y-10">
              {skillGroups.map((group, i) => (
                <Reveal key={group.label} delay={i * 0.06}>
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    {group.label}
                  </h3>
                  <ul className="flex flex-wrap gap-3 sm:gap-3.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-3 text-sm sm:text-base font-medium px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-background border border-border text-foreground hover:border-accent hover:text-accent hover:scale-105 transition-all duration-200 shadow-sm"
                      >
                        <span className="text-lg sm:text-xl text-accent" aria-hidden="true">{techIcons[item]}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}

              <Reveal delay={0.18}>
                <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Languages
                </h3>
                <p className="text-base sm:text-lg text-foreground font-medium">English (fluent) · Filipino (native)</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 05 — Certifications */}
        <section id="certifications" className="relative z-10 pt-12 scroll-mt-20">
          <SectionHeading id="05" label="certifications" accent="certifications" />
          <div className="space-y-8">
            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.06}>
                <div className="relative gemini-card p-6 overflow-hidden">
                  <SectionCardWatermark variant="certifications" className="right-3 top-3" />
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                      <h3 className="font-semibold text-sm sm:text-base">{cert.title}</h3>
                      <span className="text-[11px] font-mono text-muted-foreground">{cert.count}</span>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                      {cert.topics.map((topic) => (
                        <li key={topic} className="flex gap-3 text-sm text-muted-foreground">
                          <span aria-hidden className="text-accent shrink-0">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-4 print:hidden">
                      {cert.badges.map((badgeId) => (
                        <div
                          key={badgeId}
                          data-iframe-width="140"
                          data-iframe-height="240"
                          data-share-badge-id={badgeId}
                          data-share-badge-host="https://www.credly.com"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.12}>
              <div className="relative gemini-card p-6 overflow-hidden">
                <SectionCardWatermark variant="certifications" className="right-3 top-3" />
                <div className="relative z-10">
                  <h3 className="font-semibold text-sm sm:text-base">Lean Six Sigma — White Belt</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Process Improvement &amp; Quality Management
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Gallery */}
        <section className="relative z-10 pt-12 scroll-mt-20 print:hidden">
          <SectionHeading id="✦" label="gallery" />
          <Reveal>
            <DraggableMasonry />
          </Reveal>
        </section>

        {/* 06 — GitHub */}
        <section id="github" className="relative z-10 pt-12 scroll-mt-20 print:hidden">
          <SectionHeading
            id="06"
            label="github"
            accent="github"
            action={
              <a
                href="https://github.com/hiroqt"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                @hiroqt
                <FaGithub className="text-xs group-hover:scale-110 transition-transform" />
              </a>
            }
          />
          <GithubActivity />
        </section>

        {/* 07 — Contact */}
        <section id="contact" className="relative z-10 pt-12 scroll-mt-20">
          <SectionHeading id="07" label="contact" accent="contact" />

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
            {/* Left — Inquiry form */}
            <Reveal>
              <div className="relative p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border/40 overflow-hidden">
                <SectionCardWatermark variant="contact" className="right-4 bottom-4" />
                <div className="relative z-10">
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-prose mb-6">
                    Open to freelance projects, collaborations, and full-time opportunities.
                    Fill in the form and I&apos;ll get back to you as soon as possible.
                  </p>
                  <InquiryForm />
                </div>
              </div>
            </Reveal>

            {/* Right — Social / direct contact links */}
            <Reveal delay={0.08}>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Or reach me directly
              </h3>
              <ul className="space-y-3">
                {contactLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="group flex items-center gap-4 p-4 gemini-card"
                    >
                      <span className="text-muted-foreground group-hover:text-accent transition-colors text-xl">
                        {item.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="block text-sm truncate font-medium">{item.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-screen-2xl mx-auto px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Arnel A. Baylon — Full-Stack &amp; Context Engineer
          </p>
          <div className="flex gap-4 text-muted-foreground print:hidden">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={item.label}
                className="hover:text-foreground transition-colors"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
