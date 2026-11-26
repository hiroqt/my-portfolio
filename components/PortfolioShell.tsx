'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import type { IconType } from 'react-icons'
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCpu,
  FiFileText,
  FiGithub,
  FiGrid,
  FiHome,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiMoon,
  FiSun,
  FiTool,
  FiX,
} from 'react-icons/fi'
import { LuKeyboard } from 'react-icons/lu'
import { useTheme } from '@/components/ThemeProvider'
import { email, links } from '@/lib/portfolio/links'
import { movedSectionRoute } from '@/lib/portfolio/sections'
import avatarImage from '@/public/images/avatar.webp'
import styles from './PortfolioShell.module.css'

/** How many entries each sidebar page holds, shown beside its link. */
export interface NavCounts {
  experience: number
  projects: number
  skills: number
  stack: number
  certifications: number
  services: number
  posts: number
}

interface NavItem {
  label: string
  href: string
  icon: IconType
  count?: number
  external?: boolean
}

/**
 * The frame around the home page and its sidebar pages: a floating sidebar on
 * desktop, a top bar with a slide-in drawer below 1024px, and the footer.
 * Each sidebar link opens its own page in the content column.
 */
export function PortfolioShell({ counts, children }: { counts: NavCounts; children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()
  const reduceMotion = useReducedMotion()
  const lenis = useLenis()
  const pathname = usePathname()
  const router = useRouter()
  const [localTime, setLocalTime] = useState('GMT+8')
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastPathname = useRef(pathname)

  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  const ThemeIcon = resolvedTheme === 'dark' ? FiSun : FiMoon
  const toggleTheme = () => setTheme(nextTheme)

  const navGroups: { label?: string; items: NavItem[] }[] = [
    {
      items: [
        { label: 'Overview', href: '/', icon: FiHome },
        { label: 'Experience', href: '/experience', icon: FiBriefcase, count: counts.experience },
        { label: 'Projects', href: '/projects', icon: FiGrid, count: counts.projects },
        { label: 'Contact', href: '/contact', icon: FiMail },
      ],
    },
    {
      label: 'Toolkit',
      items: [
        { label: 'Skills I build', href: '/skills', icon: FiCpu, count: counts.skills },
        { label: 'Stack', href: '/stack', icon: FiLayers, count: counts.stack },
        { label: 'Certifications', href: '/certifications', icon: FiAward, count: counts.certifications },
        { label: 'Services', href: '/services', icon: FiTool, count: counts.services },
      ],
    },
    {
      label: 'Elsewhere',
      items: [
        { label: 'Blog', href: '/blog', icon: FiBookOpen, count: counts.posts },
        { label: 'Typing playground', href: '/typing', icon: LuKeyboard },
        { label: 'Résumé', href: links.resume, icon: FiFileText, external: true },
        { label: 'GitHub', href: links.github, icon: FiGithub, external: true },
      ],
    },
  ]

  // Old links to home page sections (/#experience, /#contact, …) open the page the section moved to.
  useEffect(() => {
    const redirect = () => {
      if (window.location.pathname !== '/') return
      const target = movedSectionRoute(window.location.hash.slice(1))
      if (target) router.replace(target)
    }
    redirect()
    window.addEventListener('hashchange', redirect)
    return () => window.removeEventListener('hashchange', redirect)
  }, [router])

  // A new page closes the drawer and starts at the top, unless its link names a spot on the page.
  useEffect(() => {
    if (lastPathname.current === pathname) return
    lastPathname.current = pathname
    setMenuOpen(false)
    if (window.location.hash) return
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  // Phone and tablet drawer: Escape closes it, the page behind holds still,
  // and focus moves into the drawer and back to the menu button.
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    const root = document.documentElement
    const originalOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    lenis?.stop()
    // Wait a frame so the drawer is visible before it takes focus.
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus())
    const menuButton = menuButtonRef.current
    return () => {
      cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeyDown)
      root.style.overflow = originalOverflow
      lenis?.start()
      menuButton?.focus({ preventScroll: true })
    }
  }, [menuOpen, lenis])

  // The drawer only exists below the desktop breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const close = () => { if (desktop.matches) setMenuOpen(false) }
    desktop.addEventListener('change', close)
    return () => desktop.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    const update = () => setLocalTime(new Intl.DateTimeFormat('en', {
      timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date()))
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [])

  // Rows further down a page rise in as they scroll into view.
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
  }, [pathname])

  const renderNavItem = (item: NavItem) => {
    const isActive = !item.external && pathname === item.href
    const Icon = item.icon
    const content = (
      <>
        {isActive && (
          <motion.span
            className={styles.navActive}
            layoutId="sidebar-active"
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 40 }}
            aria-hidden="true"
          />
        )}
        <Icon aria-hidden="true" />
        <span>{item.label}</span>
        {item.external ? (
          <span className={styles.navTrail} aria-hidden="true">↗</span>
        ) : item.count !== undefined ? (
          <span className={styles.navTrail} aria-hidden="true">{item.count}</span>
        ) : null}
      </>
    )

    if (item.external) {
      return (
        <a className={styles.navItem} href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.label}, opens in a new tab`}>
          {content}
        </a>
      )
    }
    return (
      <Link className={styles.navItem} href={item.href} aria-current={isActive ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
        {content}
      </Link>
    )
  }

  return (
    <div className={`portfolio-grain ${styles.portfolio}`} ref={rootRef}>
      <header className={styles.mobileBar} inert={menuOpen}>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="site-sidebar"
        >
          <FiMenu aria-hidden="true" />
        </button>
        <Link href="/" className={styles.mobileBrand}>
          <span className={styles.avatar}><Image src={avatarImage} alt="" width={30} height={30} /></span>
          Arnel Baylon
        </Link>
        <button type="button" className={styles.iconButton} onClick={toggleTheme} aria-label={`Switch to ${nextTheme} theme`}>
          <ThemeIcon aria-hidden="true" />
        </button>
      </header>

      <aside id="site-sidebar" className={styles.sidebar} data-open={menuOpen || undefined} aria-label="Site">
        <div className={styles.sidebarHeader}>
          <Link href="/" className={styles.brand} onClick={() => setMenuOpen(false)} aria-label="Arnel Baylon, back to overview">
            <span className={styles.avatar}><Image src={avatarImage} alt="" width={38} height={38} /></span>
            <span className={styles.brandText}>
              <strong>Arnel Baylon</strong>
              <small>AI-driven software developer</small>
            </span>
          </Link>
          <button ref={closeButtonRef} type="button" className={styles.closeButton} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <FiX aria-hidden="true" />
          </button>
        </div>

        <Link href="/assistant" className={styles.sidebarCta}>
          Ask my AI
          <span aria-hidden="true">↗</span>
        </Link>

        <nav className={styles.sidebarNav} aria-label="Main navigation" data-lenis-prevent>
          {navGroups.map(group => (
            <div className={styles.navGroup} key={group.label ?? 'main'}>
              {group.label && <p className={styles.navGroupLabel}>{group.label}</p>}
              <ul className={styles.navList}>
                {group.items.map(item => <li key={item.label}>{renderNavItem(item)}</li>)}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.statusCard}>
          <span><i className={styles.statusDot} />Open to good projects</span>
          <span>Cavite, PH · {localTime}</span>
        </div>

        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.iconButton} onClick={toggleTheme} aria-label={`Switch to ${nextTheme} theme`}>
            <ThemeIcon aria-hidden="true" />
          </button>
          <a className={styles.iconButton} href={`mailto:${email}`} aria-label="Email Arnel">
            <FiMail aria-hidden="true" />
          </a>
          <a className={styles.iconButton} href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn, opens in a new tab">
            <FiLinkedin aria-hidden="true" />
          </a>
          <a className={styles.iconButton} href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub, opens in a new tab">
            <FiGithub aria-hidden="true" />
          </a>
        </div>
      </aside>
      <div className={styles.backdrop} data-open={menuOpen || undefined} onClick={() => setMenuOpen(false)} aria-hidden="true" />

      <main id="main-content" className={styles.main} tabIndex={-1} inert={menuOpen}>
        <div className={styles.column}>
          {children}

          <footer className={styles.footer}>
            <span>© {new Date().getFullYear()} Arnel Baylon</span>
            <nav id="github" aria-label="Elsewhere">
              <a href={`mailto:${email}`}>Email</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={links.resume} target="_blank" rel="noreferrer">Résumé</a>
            </nav>
          </footer>
        </div>
      </main>
    </div>
  )
}
