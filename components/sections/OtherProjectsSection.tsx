'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

const otherSystems = [
  {
    id: 'tearsize',
    title: 'Tearsize — E-Commerce Storefront',
    desc: 'High-converting direct-to-consumer e-commerce storefront for health and wellness products with secure payment processing.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
    link: '/projects/tearsize',
    isExternal: false,
    badge: 'COMMERCE',
  },
  {
    id: 'hivesync',
    title: 'HiveSync VA — Agency Platform',
    desc: 'Agency platform with automated social media content syndication, blog article generation, and lead capture pipelines.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Automation'],
    link: '/projects/hivesync',
    isExternal: false,
    badge: 'AGENCY SAAS',
  },
  {
    id: 'vcm-hris',
    title: 'VCM HRIS — Enterprise HR & Payroll',
    desc: 'QR-code verified attendance tracking, Philippine statutory contributions (SSS, PhilHealth, Pag-IBIG), and automated payroll generation.',
    tech: ['Laravel', 'Livewire', 'MySQL', 'QR SDK'],
    link: '/projects/vcm-hris',
    isExternal: false,
    badge: 'ENTERPRISE HR',
  },
  {
    id: 'ai-triage-geamh',
    title: 'GEAMH Clinic AI Triage & Queuing',
    desc: 'Offline-capable local hospital patient triage and queuing engine with Groq LLM integration and thermal receipt printing.',
    tech: ['Vue.js', 'PHP', 'MySQL', 'Groq LLM'],
    link: '/projects/ai-triage-geamh',
    isExternal: false,
    badge: 'HOSPITAL IT',
  },
]

export function OtherProjectsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="other-projects" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">07</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Other Production Systems
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Client &amp; Capstone
        </span>
      </div>

      {/* ── 2x2 Grid of Other Projects ── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {otherSystems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group flex flex-col justify-between rounded-xl border border-border/80 bg-muted/20 p-5 hover:border-accent/40 hover:bg-muted/40 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[9.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-muted-foreground">0{idx + 1}</span>
              </div>

              <h3 className="font-serif font-bold text-base text-foreground group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={item.link}
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-accent hover:underline ml-2 shrink-0"
              >
                <span>Details</span>
                <FaArrowRight className="text-[9px]" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export default OtherProjectsSection
