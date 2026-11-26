'use client'

import Image from 'next/image'
import { motion, useMotionTemplate, useReducedMotion, useSpring } from 'framer-motion'
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

/** The Overview's opening: portrait, name, role, credential, and a short bio. */
export function Profile() {
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
        <div id="about" className={styles.bio}>
          <p className={styles.bioLead}>Right now, I’m focused on AI technology and generative AI, and I build the web products and apps that put them to work.</p>
          <p>I’m Arnel, also Nel or Yhel. Away from the keyboard, I’ve run a 42 km marathon, I love hiking, I used to powerlift, and I’ve won twice in cycling.</p>
        </div>
      </div>
    </header>
  )
}
