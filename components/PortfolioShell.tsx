'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion, useMotionTemplate, useReducedMotion, useSpring } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'
import { WorkShowcase } from '@/components/sections/WorkShowcase'
import { StackShowcase } from '@/components/sections/StackShowcase'
import { JourneySection } from '@/components/sections/JourneySection'
import headerImage from '@/public/images/header.png'
import styles from './PortfolioShell.module.css'

interface MilestoneProof {
  id: string
  tag: string
  title: string
  sub: string
  imageSrc: string
  alt: string
  linkUrl?: string
  linkLabel?: string
}

const proofMilestones: MilestoneProof[] = [
  {
    id: 'aws-award',
    tag: 'AWS BUILDNIGHTS / 2026',
    title: 'Best Business Impact',
    sub: 'Capstone Winner · AI Cloud Architecture',
    imageSrc: '/certs/aws-capstone-best-business-impact.png',
    alt: 'AWS BuildNights Best Business Impact Capstone Award Certificate',
    linkUrl: '/certs/aws-capstone-best-business-impact.pdf',
    linkLabel: 'View official PDF certificate ↗',
  },
  {
    id: 'egov-award',
    tag: 'EGOV HACKATHON / 2026',
    title: 'Top 5 eGov Finalist',
    sub: 'National Finalist · Team DEVOOPS',
    imageSrc: '/images/gallery/egov-top5-2026.png',
    alt: 'Top 5 Finalist recognition at eGov PH Hackathon 2026 with Team DEVOOPS',
    linkUrl: '/images/gallery/egov-top5-2026.png',
    linkLabel: 'Open full-resolution photo ↗',
  },
  {
    id: 'hospital-internship',
    tag: 'GEAMH PUBLIC HOSPITAL',
    title: '486 Hours of Building',
    sub: 'Live AI Triage & Queuing Deployment',
    imageSrc: '/images/gallery/internship_presenting_to_sectionheads.jpg',
    alt: 'Arnel presenting the AI queuing and triage system to hospital section heads at General Emilio Aguinaldo Memorial Hospital',
    linkUrl: '#experience',
    linkLabel: 'Read about the experience in Journey ↗',
  },
]

const MonkeyTypeGame = dynamic(
  () => import('@/components/modules/typing/MonkeyTypeGame').then(module => module.MonkeyTypeGame),
  { ssr: false, loading: () => <p>Loading the typing playground…</p> },
)
const email = 'arnelbaylon15@gmail.com'
const navigation = [
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Stack' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
const services = [
  { title: 'Web products', description: 'Clear interfaces, reliable APIs, and the data that connects them.', detail: 'React · Next.js · Python · PostgreSQL' },
  { title: 'AI systems', description: 'Assistants and agent workflows with the right context, tools, and checks.', detail: 'Context engineering · RAG · Tool calling' },
  { title: 'Mobile experiences', description: 'Useful apps that feel at home in everyday routines.', detail: 'React Native · Expo · Native integrations' },
]

function SectionHeading({ number, title, note }: { number: string; title: string; note?: string }) {
  return (
    <div className={styles.sectionHeading}>
      <div><span className={styles.sectionNumber}>{number}</span><h2>{title}</h2></div>
      {note && <p>{note}</p>}
    </div>
  )
}

function PixelPortrait() {
  const reduceMotion = useReducedMotion()
  const tiltX = useSpring(0, { stiffness: 120, damping: 24 })
  const tiltY = useSpring(0, { stiffness: 120, damping: 24 })
  const transform = useMotionTemplate`perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

  return (
    <div className={styles.portraitPanel}>
      <div className={styles.portraitMeta}><span>ARNEL / ALSO NEL OR YHEL</span><span aria-hidden="true">✦</span></div>
      <motion.div
        className={styles.portrait}
        style={{ transform: reduceMotion ? 'none' : transform }}
        onPointerMove={event => {
          if (reduceMotion || event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
          const bounds = event.currentTarget.getBoundingClientRect()
          tiltX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 6)
          tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 6)
        }}
        onPointerLeave={() => { tiltX.set(0); tiltY.set(0) }}
      >
        <Image src={headerImage} alt="Pixel-art portrait of Arnel Baylon" width={440} height={440} sizes="(max-width: 700px) 280px, 430px" priority />
      </motion.div>
      <div className={styles.portraitFooter}><span>A LITTLE PIXEL PERSONALITY.</span></div>
    </div>
  )
}

export function PortfolioShell() {
  const { resolvedTheme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('hero')
  const [localTime, setLocalTime] = useState('GMT+8')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const [playgroundOpen, setPlaygroundOpen] = useState(false)
  const [selectedProof, setSelectedProof] = useState<MilestoneProof | null>(null)
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectedProof) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProof(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedProof])

  useEffect(() => {
    const update = () => setLocalTime(new Intl.DateTimeFormat('en', {
      timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()))
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-portfolio-section]'))
    const update = () => {
      let current = 'hero'
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = section.dataset.navSection || section.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) current = 'contact'
      setActiveSection(current)
    }
    const observer = new IntersectionObserver(update, { rootMargin: '-10% 0px -60% 0px', threshold: [0, 1] })
    sections.forEach(section => observer.observe(section))
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => { observer.disconnect(); window.removeEventListener('scroll', update) }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const elements = rootRef.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.removeAttribute('data-hidden')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.06 })
    elements?.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.setAttribute('data-hidden', 'true')
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => { if (copyTimeout.current) clearTimeout(copyTimeout.current) }, [])

  const copyEmail = async () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current)
    try { await navigator.clipboard.writeText(email); setCopyState('copied') }
    catch { setCopyState('error') }
    copyTimeout.current = setTimeout(() => setCopyState('idle'), 2500)
  }

  return (
    <div className={`portfolio-grain ${styles.portfolio}`} ref={rootRef}>
      <header className={styles.topbar}>
        <a href="#hero" className={styles.brand} aria-label="Arnel Baylon, back to overview"><span>Arnel Baylon<small>AI-driven software developer</small></span></a>
        <nav className={styles.navigation} aria-label="Main navigation">
          {navigation.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>)}
        </nav>
        <div className={styles.headerActions}>
          <Link href="/assistant" className={styles.aiLink}>Ask my AI <span aria-hidden="true">↗</span></Link>
          <button type="button" className={styles.themeButton} onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}><span aria-hidden="true">{resolvedTheme === 'dark' ? '☀' : '◐'}</span></button>
        </div>
      </header>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <header id="hero" data-portfolio-section className={styles.hero}>
          <PixelPortrait />
          <div className={styles.heroBody}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>AI-DRIVEN SOFTWARE DEVELOPER / AI SYSTEMS</p>
              <h1>I’m Arnel<span>Baylon.</span></h1>
              <p className={styles.heroTagline}>Deep technical fundamentals.<br />AI as a precision tool, not a shortcut.</p>
              <p className={styles.intro}>I turn complex workflows into useful web products, mobile experiences, and AI systems. Thoughtful interfaces. Practical engineering.</p>
              <div className={styles.heroActions}><a href="#projects" className={styles.primaryButton}>Explore my work <span aria-hidden="true">↗</span></a><a href="/pdf/Resume.pdf" target="_blank" rel="noreferrer" className={styles.textLink}>Résumé <span aria-hidden="true">↗</span></a></div>
            </div>
            <div className={styles.heroStatus}><span><i className={styles.statusDot} />Open to good projects</span><span>Cavite, PH <b>{localTime}</b></span></div>
          </div>
        </header>

        <div className={styles.proofStrip} aria-label="A few key milestones">
          {proofMilestones.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.proofCard}
              onClick={() => setSelectedProof(item)}
              aria-haspopup="dialog"
            >
              <small>{item.tag}</small>
              <strong>
                {item.title} <span aria-hidden="true">↗</span>
              </strong>
              <span className={styles.proofSub}>{item.sub}</span>
              <span className={styles.proofAction}>Click to preview ✦</span>
            </button>
          ))}
        </div>

        <section id="skills" data-portfolio-section data-reveal className={styles.stackSection} aria-label="Tools and work approach"><StackShowcase /></section>

        <section id="projects" data-portfolio-section data-reveal className={styles.section}>
          <SectionHeading number="01 /" title="Featured work" note="A few ideas I brought to life." />
          <div className={styles.sectionBody}><WorkShowcase /></div>
        </section>

        <section id="services" data-portfolio-section data-nav-section="about" data-reveal className={styles.section}>
          <SectionHeading number="02 /" title="What I can help with" />
          <div className={styles.services}>{services.map((service, index) => <article key={service.title}><span className={styles.serviceNumber}>0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p><small>{service.detail}</small></article>)}</div>
        </section>

        <section id="about" data-portfolio-section data-reveal className={styles.section}>
          <SectionHeading number="03 /" title="The human behind the code" />
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCopy}><p className={styles.aboutLead}>Great software is built<br />with intent.</p><p>I’m Arnel—also Nel or Yhel. My work sits at the intersection of solid software development and modern AI systems: building products grounded in deep technical fundamentals and accelerated with AI leverage.</p><p>I care about the whole lifecycle—listening to what users actually need, architecting systems that last, and shipping with precision. When I’m away from the keyboard, you’ll find me running, making pixel art, and exploring what’s next.</p><Link href="/assistant" className={styles.textLink}>A little more about me? Ask my AI <span aria-hidden="true">↗</span></Link></div>
            <figure id="gallery" className={styles.aboutPhoto}><Image src="/images/gallery/egov-top5-2026.png" alt="Arnel with team DEVOOPS at the eGov Hackathon 2026 finalist recognition" width={1080} height={725} sizes="(max-width: 700px) 90vw, 500px" /><figcaption>Team DEVOOPS. Ideas become better together.</figcaption></figure>
          </div>
          <details id="typing" className={styles.playground} onToggle={event => setPlaygroundOpen(event.currentTarget.open)}>
            <summary><span>A small detour: the typing playground</span><span aria-hidden="true">{playgroundOpen ? '−' : '+'}</span></summary>
            {playgroundOpen && <div className={styles.playgroundContent} data-lenis-prevent><p>A little keyboard break. Test your speed, accuracy, and favorite switch sound.</p><MonkeyTypeGame /></div>}
          </details>
        </section>

        <section id="experience" data-portfolio-section data-nav-section="about" data-reveal className={styles.section}>
          <SectionHeading number="04 /" title="The path so far" note="Building, learning, showing up." />
          <div className={styles.sectionBody}><JourneySection /></div>
        </section>

        <section id="contact" data-portfolio-section data-reveal className={`${styles.section} ${styles.contact}`}>
          <div className={styles.contactMeta}><span>05 / SAY HELLO</span><span><i className={styles.statusDot} />Open to opportunities</span></div>
          <h2>Let’s make<br />something useful<span>.</span></h2>
          <p>A product to launch, a workflow to simplify, or an AI idea to explore?<br />Tell me what you’re working on.</p>
          <div className={styles.emailRow}><a href={`mailto:${email}`}>{email} <span aria-hidden="true">↗</span></a><button type="button" onClick={copyEmail} aria-label="Copy email address">{copyState === 'copied' ? 'Copied ✓' : 'Copy'}</button></div>
          <span className={styles.copyFeedback} role="status">{copyState === 'copied' ? 'Email copied. See you in the inbox.' : copyState === 'error' ? 'Use the email link to get in touch.' : ''}</span>
          <div id="github" className={styles.contactSocials}><a href="https://github.com/hiroqt" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/arnel-baylon-b05233189" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/pdf/Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a></div>
        </section>
      </main>

      <footer className={styles.footer}><span>© {new Date().getFullYear()} Arnel Baylon</span><span>Thoughtfully built. Still learning.</span><a href="#hero">Back to top ↑</a></footer>

      <AnimatePresence>
        {selectedProof && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedProof(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="proof-modal-title"
          >
            <motion.div
              className={styles.lightboxDialog}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxHeader}>
                <div>
                  <small className={styles.lightboxTag}>{selectedProof.tag}</small>
                  <h3 id="proof-modal-title">{selectedProof.title}</h3>
                </div>
                <button
                  type="button"
                  className={styles.lightboxClose}
                  onClick={() => setSelectedProof(null)}
                  aria-label="Close image preview"
                >
                  ✕
                </button>
              </div>
              <div className={styles.lightboxImageWrap}>
                <Image
                  src={selectedProof.imageSrc}
                  alt={selectedProof.alt}
                  width={1400}
                  height={950}
                  className={styles.lightboxImage}
                  priority
                />
              </div>
              <div className={styles.lightboxFooter}>
                <p>{selectedProof.sub}</p>
                {selectedProof.linkUrl && (
                  <a
                    href={selectedProof.linkUrl}
                    target={selectedProof.linkUrl.startsWith('#') ? undefined : '_blank'}
                    rel={selectedProof.linkUrl.startsWith('#') ? undefined : 'noreferrer'}
                    onClick={() => {
                      if (selectedProof.linkUrl?.startsWith('#')) {
                        setSelectedProof(null)
                      }
                    }}
                    className={styles.lightboxLink}
                  >
                    {selectedProof.linkLabel || 'Open document ↗'}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
