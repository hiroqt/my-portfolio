'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionTemplate, useReducedMotion, useSpring } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import headerImage from '@/public/images/header.webp'
import oracleAgenticAiBadge from '@/public/images/certs/oracle-agentic-ai-foundations.webp'
import styles from '../PortfolioShell.module.css'

const oracleBadgeUrl = 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=AE15372EEF7EEFB4229A84C9BB3E1E47AD325384BF2A2731D58BDF4298FDBD47'

function PixelPortrait() {
  const reduceMotion = useReducedMotion()
  const tiltX = useSpring(0, { stiffness: 120, damping: 24 })
  const tiltY = useSpring(0, { stiffness: 120, damping: 24 })
  const transform = useMotionTemplate`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

  return (
    <motion.div
      className={styles.portrait}
      style={{ transform }}
      onPointerMove={event => {
        if (reduceMotion || event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
        const bounds = event.currentTarget.getBoundingClientRect()
        tiltX.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 8)
        tiltY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8)
      }}
      onPointerLeave={() => { tiltX.set(0); tiltY.set(0) }}
    >
      <Image src={headerImage} alt="Pixel-art portrait of Arnel Baylon" sizes="(max-width: 640px) 148px, 176px" priority />
    </motion.div>
  )
}

/** The Overview's opening: portrait, name, role, credential, and a bio that opens on request. */
export function Profile() {
  const [bioOpen, setBioOpen] = useState(false)

  return (
    <header id="hero" className={styles.profile}>
      <PixelPortrait />
      <div className={styles.identity}>
        <h1>Arnel Baylon</h1>
        <p className={styles.role}>AI-driven software developer</p>
        <a
          className={styles.credential}
          href={oracleBadgeUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="View Arnel Baylon’s Oracle Agentic AI Certified Foundations Associate badge"
        >
          <Image src={oracleAgenticAiBadge} alt="" width={22} height={22} />
          <span>Oracle Certified · <strong>Agentic AI Foundations</strong></span>
          <span aria-hidden="true">↗</span>
        </a>
        <div id="about" className={styles.bioBlock}>
          <div id="bio-text" className={styles.bio} data-collapsed={bioOpen ? undefined : true}>
            <p className={styles.bioLead}>I build web products, mobile apps, and AI systems.</p>
            <p>I’m Arnel—also Nel or Yhel. My work sits at the intersection of solid software development and modern AI systems: building products grounded in deep technical fundamentals and accelerated with AI leverage.</p>
            <p>I care about the whole lifecycle—listening to what users actually need, architecting systems that last, and shipping with precision. When I’m away from the keyboard, you’ll find me running, making pixel art, and exploring what’s next.</p>
            {bioOpen && <Link href="/assistant" className={styles.textLink}>A little more about me? Ask my AI <span aria-hidden="true">↗</span></Link>}
          </div>
          <button type="button" className={styles.bioToggle} aria-expanded={bioOpen} aria-controls="bio-text" onClick={() => setBioOpen(open => !open)}>
            <FiChevronDown aria-hidden="true" />
            {bioOpen ? 'Show less' : 'More about me'}
          </button>
        </div>
      </div>
    </header>
  )
}
