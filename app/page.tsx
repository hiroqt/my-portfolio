'use client'

import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
import { GithubActivity } from '@/components/GithubActivity'
import ThemeToggle from '@/components/ThemeToggle'

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
  { id: '07', label: 'gallery', href: '#gallery' },
  { id: '08', label: 'contact', href: '#contact' },
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
    title: 'e Buddy (eGov Hackathon 2026)',
    summary: 'Designed to unify government agencies and make public services seamless using an agentic AI named e Buddy.',
    tags: ['TypeScript', 'AI', 'Tailwind CSS'],
    link: '#',
  },
  {
    title: 'PaceMentor',
    summary: 'AI-powered running coach with adaptive training plans, real-time GPS tracking, and Strava integration — from first steps to personal best.',
    tags: ['Flutter', 'Dart', 'AI'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/pacementor',
    embedTitle: 'PaceMentor votes on App Builders PH'
  },
  {
    title: 'HiveSync VA',
    summary: 'Client project — virtual assistant services platform streamlining business operations for distributed teams.',
    tags: ['Next.js', 'TypeScript'],
    link: 'https://www.hivesyncva.com',
  },
  {
    title: 'VCM HRIS',
    summary: 'QR-code based Human Resource Information System: employee management, leave tracking, job applications, real-time notifications, and payroll.',
    tags: ['Laravel', 'PHP', 'MySQL'],
    link: '#',
  },
  {
    title: 'TMRC',
    summary: 'Community website for Trece Martirez Running Club — upcoming and past races, race results, and community updates.',
    tags: ['Next.js', 'TypeScript'],
    link: '#',
  },
  {
    title: 'Present Po',
    summary: 'Workforce attendance and time-tracking platform with scheduling, presence monitoring, and automated reporting.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    link: '#',
    embedUrl: 'https://appbuildersph.com/embed/apps/present-po',
    embedTitle: 'Present Po votes on App Builders PH'
  },
  {
    title: 'Hospital Queuing System',
    summary: 'A centralized local queuing system with AI integration developed for a hospital to streamline patient workflows.',
    tags: ['Vue.js', 'PHP', 'MySQL', 'AI'],
    link: '#',
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

/** Numbered section heading, e.g. "01 — education" with an optional right-aligned action. */
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
    <div className="flex items-baseline justify-between gap-4 mb-6 pb-2 border-b border-foreground">
      <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-foreground">
        <span className="text-muted-foreground">{id}</span> — {label}
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
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border print:hidden">
        <nav className="max-w-screen-2xl mx-auto px-8 h-14 flex items-center justify-between gap-4">
          <a href="#top" className="font-semibold tracking-tight">Nel.</a>
          <div className="flex items-center gap-4">
            <a
              href="/pdf/Arnel_Baylon_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaFilePdf /> Résumé
            </a>
            <ThemeToggle variant="header" />
          </div>
        </nav>
      </header>

      <main id="top" className="max-w-screen-2xl mx-auto px-8 py-14 sm:py-20">

        {/* Masthead */}
        <header className="pb-8 border-b-2 border-foreground">
          <Reveal>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-[0.02em] uppercase">
              Arnel Baylon
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground italic">
              Generative AI Developer · Full-Stack Engineer · Freelance Software Consultant
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm">
              <a href="mailto:arnelbaylon15@gmail.com" className="hover:underline underline-offset-4">
                arnelbaylon15@gmail.com
              </a>
              <span aria-hidden className="text-muted-foreground">•</span>
              <a
                href="https://www.linkedin.com/in/arnel-baylon-b05233189"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-4"
              >
                linkedin.com/in/arnel-baylon
              </a>
              <span aria-hidden className="text-muted-foreground">•</span>
              <a
                href="https://github.com/hiroqt"
                target="_blank"
                rel="noreferrer"
                className="hover:underline underline-offset-4"
              >
                github.com/hiroqt
              </a>
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
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-semibold uppercase tracking-wide text-sm sm:text-base">
                    {job.org}
                  </h3>
                  <span className="text-xs sm:text-sm text-muted-foreground shrink-0">
                    {job.location}
                  </span>
                </div>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <p className="text-sm font-medium">{job.role}</p>
                  <span className="text-xs sm:text-sm text-muted-foreground shrink-0 tabular-nums">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden className="text-foreground shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
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
          <div className="space-y-6">
            {projects.map((project, i) => {
              const isLive = project.link !== '#'
              return (
                <Reveal key={project.title} delay={i * 0.05}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="font-semibold text-sm sm:text-base">{project.title}</h3>
                    {isLive && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                      >
                        live <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 border border-border text-muted-foreground"
                      >
                        {techIcons[tag]}
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {project.embedUrl && (
                    <div className="mt-4">
                      <iframe 
                        src={project.embedUrl} 
                        title={project.embedTitle} 
                        width="320" 
                        height="72" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        scrolling="no"
                      />
                    </div>
                  )}
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
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base">{cert.title}</h3>
                  <span className="text-[11px] font-mono text-muted-foreground">{cert.count}</span>
                </div>
                <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {cert.topics.map((topic) => (
                    <li key={topic} className="flex gap-3 text-sm text-muted-foreground">
                      <span aria-hidden className="text-foreground shrink-0">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-4 print:hidden">
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
              </Reveal>
            ))}

            <Reveal delay={0.12}>
              <h3 className="font-semibold text-sm sm:text-base">Lean Six Sigma — White Belt</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Process Improvement &amp; Quality Management
              </p>
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
                      className="inline-flex items-center gap-2 text-xs px-3 py-1.5 border border-border hover:border-foreground transition-colors"
                    >
                      {techIcons[item]}
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

        {/* 07 — Gallery */}
        <section id="gallery" className="pt-12 scroll-mt-20 print:hidden">
          <SectionHeading id="07" label="gallery" />
          <Reveal>
            <div className="border border-border p-3">
              <GallerySlider />
            </div>
          </Reveal>
        </section>

        {/* 08 — Contact */}
        <section id="contact" className="pt-12 scroll-mt-20">
          <SectionHeading id="08" label="contact" />
          <Reveal>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-prose">
              Open to freelance projects, collaborations, and full-time opportunities.
            </p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-2">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="group flex items-center gap-3 px-3 py-2.5 border border-border hover:border-foreground transition-colors"
                  >
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="block text-sm truncate">{item.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
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
