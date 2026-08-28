'use client'

import React, { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt, FaAward } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionCardWatermark } from '@/components/ui/SectionCardWatermark'

const certifications = [
  {
    issuer: 'IBM',
    title: 'IBM Professional AI Certifications',
    count: '7 Topics Verified',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    badges: [
      '82e8f4a4-6ae5-4bea-8b5e-212cf6ec6563',
      '06cc685a-5d6c-49fe-bc49-f86e53e5417e',
    ],
    topics: [
      'AI Fundamentals: Foundations for Understanding AI',
      'AI Forms and Functions: Practical Cognitive Architectures',
      'Introduction to Artificial Intelligence & Modern LLMs',
      'Machine Learning: Supervised & Unsupervised Modeling',
      'Neural Networks and Deep Learning Architectures',
      'Retrieval-Augmented Generation (RAG) for Enhanced AI Outputs',
      'The Intelligence Behind AI: Ethics, Alignment & Transformers',
    ],
  },
  {
    issuer: 'AWS',
    title: 'AWS Professional Certifications',
    count: '4 Topics Verified',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    badges: ['7d53aa8f-5672-4064-b296-f6fccf400108'],
    topics: [
      'Advanced SQL and Database Design Optimization',
      'AWS Knowledge: Object Storage (Amazon S3)',
      'Generative AI: Foundation Models & AWS Bedrock',
      'Serverless Mindset: Event-Driven AWS Architectures',
    ],
  },
]

export function CertificationsSection() {
  const reduce = useReducedMotion()

  useEffect(() => {
    // Load Credly badge script safely
    const credlyScript = document.createElement('script')
    credlyScript.src = 'https://cdn.credly.com/assets/utilities/embed.js'
    credlyScript.async = true
    document.body.appendChild(credlyScript)

    return () => {
      if (credlyScript.parentNode) {
        credlyScript.parentNode.removeChild(credlyScript)
      }
    }
  }, [])

  return (
    <section id="certifications" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="02"
        badge="CREDENTIALS & ACCREDITATIONS"
        title={<>Verified <span className="italic font-light text-accent">Certifications &amp; Badges</span></>}
        subtitle="Third-party verified credentials in artificial intelligence, cloud architecture, and engineering quality systems."
        accent="certifications"
      />

      <div className="space-y-6 sm:space-y-8">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative rounded-3xl border border-border/70 bg-muted/40 p-6 sm:p-8 hover:border-accent/40 backdrop-blur-xs transition-all duration-300 shadow-sm overflow-hidden group"
          >
            <SectionCardWatermark variant="certifications" className="right-3 top-3" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4 pb-3 border-b border-border/40">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                  <h3 className="font-serif font-semibold text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-background border border-border text-muted-foreground shrink-0 tabular-nums">
                    {cert.count}
                  </span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Verify ${cert.title} on Credly (opens in new tab)`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline underline-offset-4"
                  >
                    <span>Verify Credly</span>
                    <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Topics Grid */}
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-4" aria-label={`Topics covered in ${cert.title}`}>
                {cert.topics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    <span aria-hidden className="text-accent shrink-0 font-mono text-xs mt-1">✦</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              {/* Credly Embed Badges */}
              <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-border/40">
                {cert.badges.map((badgeId) => (
                  <div
                    key={badgeId}
                    data-iframe-width="140"
                    data-iframe-height="240"
                    data-share-badge-id={badgeId}
                    data-share-badge-host="https://www.credly.com"
                    className="overflow-hidden rounded-xl"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Lean Six Sigma */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="relative rounded-3xl border border-border/70 bg-muted/40 p-6 sm:p-8 hover:border-accent/40 backdrop-blur-xs transition-all duration-300 shadow-sm overflow-hidden group"
        >
          <SectionCardWatermark variant="certifications" className="right-3 top-3" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-foreground group-hover:text-accent transition-colors">
                  Lean Six Sigma — White Belt
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Process Improvement, Quality Management Systems, DMAIC Framework, and Operational Efficiency.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-background border border-border text-foreground font-medium shrink-0 self-start sm:self-auto shadow-xs">
              <FaAward className="text-accent" aria-hidden="true" /> Process Quality
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
