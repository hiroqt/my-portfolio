'use client'

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram, FaFilePdf, FaArrowRight, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionCardWatermark } from '@/components/ui/SectionCardWatermark'

const socialCards = [
  {
    label: 'Direct Email',
    value: 'arnelbaylon15@gmail.com',
    handle: 'arnelbaylon15@gmail.com',
    href: 'mailto:arnelbaylon15@gmail.com',
    desc: 'Preferred for engineering roles & consulting proposals',
    icon: <FaEnvelope className="text-accent text-xl" aria-hidden="true" />,
    badge: 'Email',
    primary: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/arnel-baylon',
    handle: 'in/arnel-baylon',
    href: 'https://www.linkedin.com/in/arnel-baylon-b05233189',
    desc: 'Professional network, career milestones & endorsements',
    icon: <FaLinkedin className="text-accent text-xl" aria-hidden="true" />,
    badge: 'LinkedIn',
  },
  {
    label: 'GitHub Profile',
    value: 'github.com/hiroqt',
    handle: '@hiroqt',
    href: 'https://github.com/hiroqt',
    desc: 'Open-source civic repositories & agentic codebases',
    icon: <FaGithub className="text-accent text-xl" aria-hidden="true" />,
    badge: 'GitHub',
  },
  {
    label: 'Official Résumé',
    value: 'Arnel_Baylon_Resume.pdf',
    handle: 'Curriculum Vitae (PDF)',
    href: '/pdf/Arnel_Baylon_Resume.pdf',
    desc: 'Downloadable ATS-standard résumé & credentials',
    icon: <FaFilePdf className="text-accent text-xl" aria-hidden="true" />,
    badge: 'Résumé',
  },
  {
    label: 'Facebook',
    value: 'facebook.com/arnel.baylon',
    handle: 'fb.com/arnel.baylon.1650',
    href: 'https://www.facebook.com/arnel.baylon.1650',
    desc: 'Civic community updates & social connection',
    icon: <FaFacebook className="text-accent text-xl" aria-hidden="true" />,
    badge: 'Social',
  },
  {
    label: 'Instagram',
    value: 'instagram.com/yheellll',
    handle: '@yheellll',
    href: 'https://www.instagram.com/yheellll?igsh=MWYxMDZlMzYzNXA2dw',
    desc: 'Creative projects & endurance running activities',
    icon: <FaInstagram className="text-accent text-xl" aria-hidden="true" />,
    badge: 'Personal',
  },
]

export function ContactSection() {
  const reduce = useReducedMotion()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Construct mailto link as reliable zero-backend transmission
    const subject = encodeURIComponent(`[Portfolio Inquiry] From ${formState.name}`)
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      window.location.href = `mailto:arnelbaylon15@gmail.com?subject=${subject}&body=${body}`
    }, 600)
  }

  return (
    <section id="contact" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="09"
        badge="GET IN TOUCH"
        title={<>Initiate a <span className="italic font-light text-accent">Collaboration</span></>}
        subtitle="Open for full-time software engineering roles, context engineering contracts, and high-impact software consulting."
        accent="contact"
      />

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Side: Compact Contact Form (5 cols) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 relative p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border/70 backdrop-blur-xs overflow-hidden shadow-xs flex flex-col justify-between"
        >
          <SectionCardWatermark variant="contact" className="right-4 bottom-4 opacity-25" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <span>Direct Message</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Quick Form
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2">
              Send a Note
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              Have a project, open role, or consulting inquiry? Leave your details below and I&apos;ll get back to you promptly.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-background/90 border border-accent/40 text-center space-y-3 my-4">
                <FaCheckCircle className="text-accent text-3xl mx-auto" aria-hidden="true" />
                <h4 className="font-serif font-semibold text-base text-foreground">Message Ready</h4>
                <p className="text-xs text-muted-foreground">
                  Your mail client has been opened with your inquiry. You can also write directly to <strong className="text-foreground">arnelbaylon15@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-mono text-accent hover:underline uppercase tracking-wider cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Cruz"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or open role..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold hover:scale-[1.01] hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  <FaPaperPlane aria-hidden="true" />
                  <span>{isSubmitting ? 'Sending...' : 'Transmit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Right Side: 6 Social & Direct Channel Cards (7 cols, 3 rows x 2 cols) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
        >
          {socialCards.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={`${item.label}: ${item.handle}`}
              className={`group relative p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                item.primary
                  ? 'bg-muted/50 border-accent/40 hover:border-accent'
                  : 'bg-muted/30 border-border/70 hover:border-accent/50 hover:bg-background'
              }`}
            >
              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="p-2.5 rounded-2xl bg-background border border-border/80 group-hover:border-accent/40 group-hover:scale-105 transition-all shadow-2xs">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-background/80 border border-border/70 text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.badge}
                  </span>
                </div>

                {/* Label & Handle */}
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">
                  {item.label}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                  {item.handle}
                </h4>

                {/* Description */}
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Action Indicator */}
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate text-[10px]">
                  {item.value}
                </span>
                <span className="inline-flex items-center gap-1 text-accent font-semibold shrink-0 group-hover:translate-x-1 transition-transform ml-2">
                  <FaArrowRight className="text-[9px]" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
