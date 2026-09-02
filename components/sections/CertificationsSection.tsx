'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'

// ── SVG Brand Icons for Verified Credly Certifications ──

function IbmLogoSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M2 4h4v1H2zm6 0h8v1H8zm10 0h4v1h-4zM2 6.5h4v1H2zm6 0h8v1H8zm10 0h4v1h-4zM2 9h4v1H2zm6 0h2.5v1H8zm5.5 0H16v1h-2.5zm4.5 0h4v1h-4zM2 11.5h4v1H2zm6 0h2.5v1H8zm5.5 0H16v1h-2.5zm4.5 0h4v1h-4zM2 14h4v1H2zm6 0h8v1H8zm10 0h4v1h-4zM2 16.5h4v1H2zm6 0h8v1H8zm10 0h4v1h-4zM2 19h4v1H2zm6 0h2.5v1H8zm5.5 0H16v1h-2.5zm4.5 0h4v1h-4z" />
    </svg>
  )
}

function AwsLogoSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 12.8c-.8 0-1.4-.2-1.9-.6-.5-.4-.7-1-.7-1.8 0-.9.3-1.6.9-2.1.6-.5 1.5-.7 2.6-.7h2.1v-.6c0-.6-.1-1-.4-1.3-.3-.3-.8-.4-1.5-.4-.6 0-1.2.1-1.8.3-.6.2-1.1.5-1.5.9l-.7-1.1c.5-.4 1.2-.8 1.9-1 .7-.2 1.5-.4 2.4-.4 1.2 0 2.1.3 2.7.9.6.6.9 1.5.9 2.7v5.2H10v-1.1c-.4.4-.9.7-1.4.9-.6.2-1.3.3-2.1.3zm.4-1.3c.7 0 1.3-.2 1.8-.7.5-.5.8-1.1.8-1.8v-.9H7.6c-.7 0-1.2.1-1.6.4-.4.3-.6.7-.6 1.3 0 .5.2.9.5 1.2.3.3.8.5 1.4.5zm7.3 1.1l-2.1-7h1.6l1.3 5 1.3-5h1.5l1.3 5 1.3-5h1.5l-2.1 7h-1.5l-1.3-5-1.3 5h-1.5z"
      />
      <path
        fill="#f59e0b"
        d="M3.2 18.2c4.8 2.8 11.2 2.8 16 0 .3-.2.7.1.5.5-1.4 2.2-7.2 3.8-11 2.8-2.6-.7-4.8-2-6.5-3.5-.3-.2 0-.6.5-.4l.5.6z"
      />
      <path
        fill="#f59e0b"
        d="M19.8 17.2l1.9.8c.2.1.3.3.1.5l-1.2 1.6c-.1.2-.4.2-.5 0l-1.2-1.1c-.2-.1-.1-.4.1-.5l.8-.4.1-.9z"
      />
    </svg>
  )
}

function LeanSixSigmaSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {/* Lean Six Sigma Shield & Sigma Symbol */}
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.5 5h6v2h-3.8l2.2 3.5-2.2 3.5H16.5v2h-6l3-4.5-3-4.5z" />
    </svg>
  )
}

const certifications = [
  {
    issuer: 'IBM',
    svgLogo: <IbmLogoSvg className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
    title: 'IBM Professional AI Specialization',
    count: '7 Verified Badges',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    topics: [
      'Retrieval-Augmented Generation (RAG)',
      'Neural Networks & Deep Learning',
      'AI Fundamentals & Modern LLMs',
      'Machine Learning Models',
      'Ethics & Transformers',
    ],
  },
  {
    issuer: 'Amazon Web Services',
    svgLogo: <AwsLogoSvg className="w-5 h-5" />,
    title: 'AWS Cloud & Generative AI',
    count: '4 Verified Badges',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    topics: [
      'Generative AI: Bedrock & Foundation Models',
      'Serverless Event-Driven Architectures',
      'Object Storage (Amazon S3)',
      'SQL & DB Optimization',
    ],
  },
  {
    issuer: 'Six Sigma',
    svgLogo: <LeanSixSigmaSvg className="w-5 h-5 text-amber-500" />,
    title: 'Lean Six Sigma — White Belt',
    count: 'Quality System',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    topics: [
      'DMAIC Process Optimization Framework',
      'Root Cause Analysis & CI/CD',
      'Quality Management Systems',
      'Operational Waste Reduction',
    ],
  },
]

export function CertificationsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="certifications" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">04</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Certifications &amp; Accreditations
          </h2>
        </div>
        <a
          href="https://www.credly.com/users/arnel-baylon"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          Credly profile ↗
        </a>
      </div>

      {/* ── 3-Column Credential Grid with Authentic SVGs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-muted/20 p-5 hover:border-accent/40 hover:bg-muted/40 transition-all shadow-xs"
          >
            <div>
              {/* Header: Authentic SVG Logo + Credly Count Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="p-2.5 rounded-xl bg-background border border-border text-foreground shadow-2xs inline-flex items-center justify-center">
                  {cert.svgLogo}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground font-semibold">
                  {cert.count}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-foreground group-hover:text-accent transition-colors leading-snug">
                {cert.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 mb-3">
                {cert.issuer}
              </p>

              {/* Topics List */}
              <div className="space-y-1 pt-2 border-t border-border/40">
                {cert.topics.map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                    <span className="text-accent text-[9px] shrink-0">✦</span>
                    <span className="truncate">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Verify Action */}
            <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between">
              <span className="text-[9.5px] font-mono uppercase tracking-wider text-muted-foreground">
                Credly Verified
              </span>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.title} on Credly (opens in new tab)`}
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-accent hover:underline"
              >
                <span>&lt; Verify &gt;</span>
                <FaExternalLinkAlt className="text-[9px]" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export default CertificationsSection
