'use client'

import { useEffect, useRef, useState } from 'react'
import { email } from '@/lib/portfolio/links'
import styles from '../PortfolioShell.module.css'

/** The contact page: a short invitation, the email address, and a copy button. */
export function ContactBlock() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (copyTimeout.current) clearTimeout(copyTimeout.current) }, [])

  const copyEmail = async () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current)
    try { await navigator.clipboard.writeText(email); setCopyState('copied') }
    catch { setCopyState('error') }
    copyTimeout.current = setTimeout(() => setCopyState('idle'), 2500)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className={`${styles.contact} ${styles.view}`}>
      <div className={styles.contactMeta}><span>SAY HELLO</span><span><i className={styles.statusDot} />Open to opportunities</span></div>
      <h1 id="contact-title">Let’s make<br />something useful<span>.</span></h1>
      <p>A product to launch, a workflow to simplify, or an AI idea to explore? Tell me what you’re working on.</p>
      <div className={styles.emailRow}>
        <a href={`mailto:${email}`}>{email} <span aria-hidden="true">↗</span></a>
        <button type="button" onClick={copyEmail} aria-label="Copy email address">{copyState === 'copied' ? 'Copied ✓' : 'Copy'}</button>
      </div>
      <span className={styles.copyFeedback} role="status">{copyState === 'copied' ? 'Email copied. See you in the inbox.' : copyState === 'error' ? 'Use the email link to get in touch.' : ''}</span>
    </section>
  )
}
