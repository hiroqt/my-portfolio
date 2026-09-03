'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa'

const contactChannels = [
  {
    name: 'Email',
    value: 'arnelbaylon15@gmail.com',
    href: 'mailto:arnelbaylon15@gmail.com',
    icon: <FaEnvelope className="text-accent" />,
    action: 'Send Email ↗',
  },
  {
    name: 'GitHub',
    value: 'github.com/hiroqt',
    href: 'https://github.com/hiroqt',
    icon: <FaGithub className="text-accent" />,
    action: 'Follow ↗',
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/arnel-baylon',
    href: 'https://www.linkedin.com/in/arnel-baylon-b05233189',
    icon: <FaLinkedin className="text-accent" />,
    action: 'Connect ↗',
  },
  {
    name: 'Résumé',
    value: 'Arnel_Baylon_Resume.pdf',
    href: '/pdf/Arnel_Baylon_Resume.pdf',
    icon: <FaFilePdf className="text-accent" />,
    action: 'Download PDF ↗',
  },
]

export function ContactSection() {
  const reduce = useReducedMotion()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate brief network submission
    await new Promise((r) => setTimeout(r, 600))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">07</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Get in Touch
          </h2>
        </div>
        <a
          href="mailto:arnelbaylon15@gmail.com"
          className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          arnelbaylon15@gmail.com ↗
        </a>
      </div>

      <div className="space-y-6">
        {/* Intro Banner */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-border bg-muted/20 dark:bg-card/80 p-5 sm:p-7 hover:bg-muted/30 transition-colors dark:shadow-lg dark:shadow-black/20"
        >
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
            Let&apos;s build something exceptional together.
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            I&apos;m always open to discussing new engineering projects, AI agent implementations, full-stack consulting, and full-time software engineering roles.
          </p>

          {/* Quick Channels Grid */}
          <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
            {contactChannels.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="group flex items-center justify-between p-3 rounded-xl border border-border/80 bg-background dark:bg-muted/30 hover:border-accent/50 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="p-1.5 rounded-lg bg-muted shrink-0 text-sm">
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">
                      {c.name}
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground truncate">
                      {c.value}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-accent shrink-0 ml-2 font-semibold group-hover:underline">
                  {c.action}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Message Form Card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-2xl border border-border bg-muted/20 dark:bg-card/80 p-5 sm:p-7 dark:shadow-lg dark:shadow-black/20"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
            <h3 className="font-serif font-bold text-base text-foreground">
              Send a Direct Message
            </h3>
            <span className="font-mono text-[10.5px] text-muted-foreground">
              Direct inbox delivery
            </span>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 text-2xl mb-1">
                <FaCheckCircle />
              </div>
              <p className="font-serif font-bold text-lg text-foreground">
                Message received!
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                Thank you for reaching out. I&apos;ll get back to you promptly at your provided email address.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false)
                  setFormState({ name: '', email: '', message: '' })
                }}
                className="mt-3 inline-flex text-xs font-mono text-accent hover:underline cursor-pointer"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full rounded-lg border border-border bg-background px-3.5 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Message / Project Scope
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, or engineering opportunity..."
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10.5px] text-muted-foreground">
                  Response time: &lt; 24 hours
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2 font-mono text-xs uppercase tracking-wider font-semibold text-background hover:bg-accent hover:text-white transition-colors cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="text-[10px]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* ── Footer Signoff ── */}
      <footer className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-mono text-muted-foreground">
        <div>
          <span>&copy; {new Date().getFullYear()} Arnel Baylon &bull; Software Engineer</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#main-content" className="hover:text-foreground transition-colors hover:underline">
            ↑ Back to top
          </a>
        </div>
      </footer>
    </section>
  )
}
export default ContactSection
