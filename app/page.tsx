'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram,
  FaExternalLinkAlt, FaArrowRight, FaRocket, FaFilePdf
} from 'react-icons/fa'
import { MdCloud } from 'react-icons/md'
import {
  SiFlutter, SiNextdotjs, SiLaravel, SiPhp, SiMysql, SiTypescript, SiSupabase,
  SiReact, SiVuedotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiVercel, SiGit,
  SiFigma, SiTrello, SiDart
} from 'react-icons/si'
import { GallerySlider } from '@/components/GallerySlider'
import { DraggableMasonry } from '@/components/DraggableMasonry'
import { GithubActivity } from '@/components/GithubActivity'
import ThemeToggle from '@/components/ThemeToggle'
import { InquiryForm } from '@/components/contact/InquiryForm'

const techIcons: Record<string, React.ReactNode> = {
  "Flutter": <SiFlutter />,
  "Dart": <SiDart />,
  "Next.js": <SiNextdotjs />,
  "AI": <FaRocket />,
  "Laravel": <SiLaravel />,
  "PHP": <SiPhp />,
  "MySQL": <SiMysql />,
  "TypeScript": <SiTypescript />,
  "Supabase": <SiSupabase />,
  "React": <SiReact />,
  "Vue.js": <SiVuedotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  "Node.js": <SiNodedotjs />,
  "Firebase": <SiFirebase />,
  "Vercel": <SiVercel />,
  "AWS": <MdCloud />,
  "Git": <SiGit />,
  "Figma": <SiFigma />,
  "Trello": <SiTrello />
}

const navItems = [
  { id: '01', label: 'education', href: '#education' },
  { id: '02', label: 'experience', href: '#experience' },
  { id: '03', label: 'projects', href: '#projects' },
  { id: '04', label: 'certifications', href: '#certifications' },
  { id: '05', label: 'skills', href: '#skills' },
  { id: '06', label: 'github', href: '#github' },
  { id: '07', label: 'contact', href: '#contact' },
]

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
      'Built Present Po (attendance & time-tracking) and TMRC (running club website) as freelance engagements with client-owned production deployments.',
    ],
  },
]

const projects = [
  {
    title: 'Tearsize',
    summary: 'Client project — E-commerce platform for health products featuring full payment integration.',
    tags: ['TypeScript', 'Tailwind CSS'],
    link: '#',
    image: '/images/tearsize.png',
  },
  {
    title: 'e Buddy (eGov Hackathon 2026)',
    summary: 'Designed to unify government agencies and make public services seamless using an agentic AI named e Buddy.',
    tags: ['TypeScript', 'AI', 'Tailwind CSS'],
    link: '#',
    image: '/images/egov.png',
  },
  {
    title: 'PaceMentor',
    summary: 'AI-powered running coach with adaptive training plans, real-time GPS tracking, and Strava integration — from first steps to personal best.',
    tags: ['Flutter', 'Dart', 'AI'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/pacementor',
    embedTitle: 'PaceMentor votes on App Builders PH',
    image: '/images/pcaementor.png',
  },
  {
    title: 'HiveSync VA',
    summary: 'Client project — virtual assistant services platform streamlining business operations for distributed teams.',
    tags: ['Next.js', 'TypeScript'],
    link: 'https://www.hivesyncva.com',
    image: '/images/hivesync.png',
  },
  {
    title: 'VCM HRIS',
    summary: 'QR-code based Human Resource Information System: employee management, leave tracking, job applications, real-time notifications, and payroll.',
    tags: ['Laravel', 'PHP', 'MySQL'],
    link: '#',
    image: '/images/vcm.png',
  },
  {
    title: 'TMRC',
    summary: 'Community website for Trece Martirez Running Club — upcoming and past races, race results, and community updates.',
    tags: ['Next.js', 'TypeScript'],
    link: '#',
    image: '/images/tmrc.png',
  },
  {
    title: 'Present Po',
    summary: 'Workforce attendance and time-tracking platform with scheduling, presence monitoring, and automated reporting.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/present-po',
    embedTitle: 'Present Po votes on App Builders PH',
    image: '/images/presentpo.png',
  },
  {
    title: 'Hospital Queuing System',
    summary: 'A centralized local queuing system with AI integration developed for a hospital to streamline patient workflows.',
    tags: ['Vue.js', 'PHP', 'MySQL', 'AI'],
    link: '#',
    image: '/images/gallery/internship_presenting_queuing_to_sectionheads.jpg',
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
  { label: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript', 'Flutter'] },
  { label: 'Backend', items: ['Laravel', 'PHP', 'Node.js', 'Firebase', 'MySQL', 'Supabase'] },
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
}: {
  id: string
  label: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-8 pb-3 border-b border-border/60">
      <h2 className="text-sm sm:text-base font-display font-semibold tracking-widest uppercase text-foreground">
        <span className="text-accent mr-2 opacity-80">{id}</span> {label}
      </h2>
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
    // Sequence timings
    const t1 = setTimeout(() => setPhase('name'), 600) // Water drop falls for 600ms
    const t2 = setTimeout(() => setPhase('done'), 2200) // Name stays for 1600ms
    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [])

  useEffect(() => {
    // Load Credly badge script
    const credlyScript = document.createElement('script')
    credlyScript.src = '//cdn.credly.com/assets/utilities/embed.js'
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
                  <h1 className="text-[20vw] md:text-[10rem] lg:text-[12rem] font-pacifico text-reference leading-tight capitalize">
                    Arnel<br/>Baylon.
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : -10 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-40 glass print:hidden"
      >
        <nav className="max-w-screen-2xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#top" className="font-pacifico text-reference-sm text-3xl sm:text-4xl hover:scale-105 transition-transform origin-left block tracking-tight pt-1" aria-label="Nel Home">
            Nel.
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/pdf/Arnel_Baylon_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-accent transition-colors group"
            >
              <FaFilePdf className="group-hover:-translate-y-0.5 transition-transform" /> Résumé
            </a>
            <ThemeToggle variant="header" />
          </div>
        </nav>
      </motion.header>

      <main id="top" className="max-w-screen-2xl mx-auto px-8 py-14 sm:py-20">

        {/* Masthead */}
        <header className="pb-24 pt-20 md:pt-32 flex flex-col justify-center min-h-[85vh] relative">
          <Reveal>
            <div className="relative z-10">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-start gap-8 lg:gap-12">
                <div className="shrink-0">
                  {phase === 'done' ? (
                    <motion.div 
                      layoutId="hero-title"
                      transition={{ type: 'spring', damping: 25, stiffness: 100 }}
                    >
                      <h1 className="text-[18vw] sm:text-[15vw] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-pacifico text-reference leading-tight capitalize pb-4 md:pb-8">
                        Arnel<br/>Baylon.
                      </h1>
                    </motion.div>
                  ) : (
                    <div className="opacity-0">
                      <h1 className="text-[18vw] sm:text-[15vw] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-pacifico leading-tight capitalize pb-4 md:pb-8">
                        Arnel<br/>Baylon.
                      </h1>
                    </div>
                  )}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: phase === 'done' ? 1 : 0, x: phase === 'done' ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full flex-1 max-w-4xl"
                >
                  <DraggableMasonry />
                </motion.div>
              </div>
              
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 mt-16 md:mt-24 items-end">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="md:col-span-7 lg:col-span-8"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl text-foreground font-medium leading-tight tracking-tight max-w-2xl">
                    Empowering businesses with intelligent systems and scalable architectures. I blend <span className="text-muted-foreground">generative AI</span> with robust <span className="text-muted-foreground">full-stack engineering</span> to accelerate your growth.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="md:col-span-5 lg:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-end gap-6 font-semibold"
                >
                  <a href="#contact" className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors uppercase tracking-[0.2em] text-xs font-mono">
                    <span>Start a project</span> 
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform text-lg" />
                  </a>
                  <div className="flex gap-6">
                    <a
                      href="https://github.com/hiroqt"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors uppercase tracking-[0.2em] text-xs font-mono"
                    >
                      <FaGithub className="text-xl group-hover:scale-110 transition-transform" /> <span className="hidden sm:inline">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors uppercase tracking-[0.2em] text-xs font-mono"
                    >
                      <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" /> <span className="hidden sm:inline">LinkedIn</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Section index */}
        <nav className="py-6 border-b border-border print:hidden" aria-label="Sections">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-mono text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={item.href} className="hover:text-foreground transition-colors">
                  <span className="tabular-nums">{item.id}</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 01 — Education */}
        <section id="education" className="pt-12 scroll-mt-20">
          <SectionHeading id="01" label="education" />
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-semibold uppercase tracking-wide text-sm sm:text-base">
                Cavite State University — Trece Martires Campus
              </h3>
              <span className="text-xs sm:text-sm text-muted-foreground shrink-0 tabular-nums">
                Cavite, Philippines
              </span>
            </div>
            <p className="mt-1 text-sm">Bachelor of Science in Information Technology</p>
          </Reveal>
        </section>

        {/* 02 — Experience */}
        <section id="experience" className="pt-12 scroll-mt-20">
          <SectionHeading id="02" label="experience" />
          <div className="space-y-8">
            {experience.map((job, i) => (
              <Reveal key={job.org} delay={i * 0.06}>
                <div className="gemini-card p-6">
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
              </Reveal>
            ))}
          </div>
        </section>

        {/* 03 — Projects */}
        <section id="projects" className="pt-12 scroll-mt-20">
          <SectionHeading
            id="03"
            label="projects"
            action={
              <a
                href="https://github.com/hiroqt?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors print:hidden"
              >
                all projects
                <FaArrowRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
              </a>
            }
          />
          <div className="relative h-[450px] sm:h-[500px] flex items-center justify-center w-full max-w-5xl mx-auto overflow-x-clip my-8 group">
            {/* Left Card: Present Po */}
            <div className="absolute w-[280px] sm:w-[360px] h-[340px] bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-700 transform -rotate-12 -translate-x-12 sm:-translate-x-48 translate-y-4 group-hover:-translate-x-20 sm:group-hover:-translate-x-64 group-hover:-rotate-6 z-0 hover:z-20 hover:scale-105 cursor-pointer hidden sm:block overflow-hidden group/card flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-4 flex-wrap relative z-10">
                  <span className="bg-foreground text-background text-[9px] font-mono px-2 py-1 rounded-full flex items-center gap-1">✦ FEATURED APP ❯</span>
                  <span className="border border-border text-foreground text-[9px] font-mono px-2 py-1 rounded-full bg-background">B2B SOLUTION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground relative z-10 group-hover/card:text-transparent transition-colors duration-300">Present Po</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">Workforce attendance and time-tracking platform with scheduling, presence monitoring, and automated reporting.</p>
              </div>
              <div className="mt-4 pointer-events-none opacity-80 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">
                <iframe src="https://appbuildersph.com/embed/apps/present-po" title="Present Po votes" width="320" height="72" style={{ border: 0, width: '100%', maxWidth: '100%' }} loading="lazy" scrolling="no" />
              </div>
              <img src="/images/presentpo.png" alt="Present Po" className="absolute left-1/2 -bottom-20 w-[85%] h-auto rounded-t-xl shadow-2xl opacity-0 transform -translate-x-1/2 group-hover/card:-translate-y-20 group-hover/card:opacity-100 transition-all duration-500 z-0" />
            </div>

            {/* Right Card: e Buddy */}
            <div className="absolute w-[280px] sm:w-[360px] h-[340px] bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-700 transform rotate-12 translate-x-12 sm:translate-x-48 translate-y-4 group-hover:translate-x-20 sm:group-hover:translate-x-64 group-hover:rotate-6 z-0 hover:z-20 hover:scale-105 cursor-pointer hidden sm:block overflow-hidden group/card flex flex-col justify-start">
              <div className="flex gap-2 mb-4 flex-wrap relative z-10">
                <span className="bg-foreground text-background text-[9px] font-mono px-2 py-1 rounded-full flex items-center gap-1">✦ HACKATHON ENTRY ❯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground relative z-10 group-hover/card:text-transparent transition-colors duration-300">e Buddy</h3>
              <p className="text-xs sm:text-sm text-muted-foreground relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">Designed to unify government agencies and make public services seamless using an agentic AI named e Buddy.</p>
              <img src="/images/egov.png" alt="e Buddy" className="absolute left-1/2 -bottom-20 w-[85%] h-auto rounded-t-xl shadow-2xl opacity-0 transform -translate-x-1/2 group-hover/card:-translate-y-24 group-hover/card:opacity-100 transition-all duration-500 z-0" />
            </div>

            {/* Center Card: PaceMentor */}
            <div className="absolute w-[300px] sm:w-[420px] h-[400px] bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-700 transform z-10 group-hover:-translate-y-6 hover:scale-105 cursor-pointer overflow-hidden group/card flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-6 flex-wrap relative z-10">
                  <span className="bg-foreground text-background text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-1">✦ AI RUNNING COACH ❯</span>
                  <span className="border border-border text-foreground text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-full bg-background">STRAVA READY</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground relative z-10 group-hover/card:text-transparent transition-colors duration-300">PaceMentor</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">AI-powered running coach with adaptive training plans, real-time GPS tracking, and Strava integration — from first steps to personal best.</p>
              </div>
              <div className="mt-4 relative z-10 group-hover/card:opacity-0 transition-opacity duration-300">
                <iframe src="https://appbuildersph.com/embed/apps/pacementor" title="PaceMentor votes" width="320" height="72" style={{ border: 0, width: '100%' }} loading="lazy" scrolling="no" />
              </div>
              <img src="/images/pcaementor.png" alt="PaceMentor" className="absolute left-1/2 -bottom-24 w-[90%] h-auto rounded-t-2xl shadow-2xl opacity-0 transform -translate-x-1/2 group-hover/card:-translate-y-28 group-hover/card:opacity-100 transition-all duration-500 z-0" />
            </div>
          </div>

          <div className="space-y-6 mt-8 sm:mt-12 max-w-4xl mx-auto">
            <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest border-b border-border/40 pb-4 mb-8">Other Projects</h4>
            {projects.filter(p => !['PaceMentor', 'Present Po', 'e Buddy (eGov Hackathon 2026)'].includes(p.title)).map((project, i) => {
              const isLive = project.link !== '#'

              return (
                <Reveal key={project.title} delay={i * 0.05}>
                  <div className="relative mb-10 group/row cursor-pointer py-4 sm:py-6 border-b border-border/40 last:border-0 overflow-visible flex items-center justify-between">
                    <div className="relative z-10 w-full sm:w-2/3 transition-transform duration-500 group-hover/row:-translate-y-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-lg sm:text-2xl font-display font-bold text-foreground">
                          {project.title}
                        </h3>
                        {isLive && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 ml-auto sm:ml-0"
                          >
                            live ↗
                          </a>
                        )}
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {project.summary}
                      </p>
                    </div>
                    {project.image && (
                      <div className="hidden sm:block absolute left-1/2 sm:left-1/4 bottom-full -translate-x-1/2 mb-4 w-[280px] h-[180px] z-50 pointer-events-none perspective-1000">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover rounded-xl shadow-2xl opacity-0 group-hover/row:opacity-100 transform translate-y-8 group-hover/row:translate-y-0 rotate-x-12 group-hover/row:rotate-x-0 transition-all duration-700 ease-out origin-bottom" 
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* 04 — Certifications */}
        <section id="certifications" className="pt-12 scroll-mt-20">
          <SectionHeading id="04" label="certifications" />
          <div className="space-y-8">
            {certifications.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.06}>
                <div className="gemini-card p-6">
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
              </Reveal>
            ))}

            <Reveal delay={0.12}>
              <div className="gemini-card p-6">
                <h3 className="font-semibold text-sm sm:text-base">Lean Six Sigma — White Belt</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Process Improvement &amp; Quality Management
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 05 — Skills */}
        <section id="skills" className="pt-12 scroll-mt-20">
          <SectionHeading id="05" label="skills" />
          <div className="space-y-6">
            {skillGroups.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.06}>
                <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl bg-background border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                    >
                      <span className="text-base">{techIcons[item]}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <h3 className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2">
                Languages
              </h3>
              <p className="text-sm text-muted-foreground">English (fluent) · Filipino (native)</p>
            </Reveal>
          </div>
        </section>

        {/* 06 — GitHub */}
        <section id="github" className="pt-12 scroll-mt-20 print:hidden">
          <SectionHeading
            id="06"
            label="github"
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
        <section id="contact" className="pt-12 scroll-mt-20">
          <SectionHeading id="07" label="contact" />

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
            {/* Left — Inquiry form */}
            <Reveal>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-prose mb-6">
                Open to freelance projects, collaborations, and full-time opportunities.
                Fill in the form and I&apos;ll get back to you as soon as possible.
              </p>
              <InquiryForm />
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
            © {new Date().getFullYear()} Arnel A. Baylon — Full-Stack &amp; AI Developer
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
