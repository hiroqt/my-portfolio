'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt, FaAward, FaBrain, FaCloud } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'

const certifications = [
  {
    issuer: 'IBM',
    icon: <FaBrain className="text-xl text-foreground" aria-hidden="true" />,
    title: 'IBM Professional AI Specialization',
    count: '7 Verified Badges',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    topics: [
      'Retrieval-Augmented Generation (RAG)',
      'Neural Networks & Deep Learning',
      'AI Fundamentals & Modern LLMs',
      'Cognitive Architectures & Forms',
      'Machine Learning Models',
      'Ethics, Alignment & Transformers',
    ],
  },
  {
    issuer: 'AWS',
    icon: <FaCloud className="text-xl text-foreground" aria-hidden="true" />,
    title: 'AWS Cloud & Generative AI',
    count: '4 Verified Badges',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    topics: [
      'Generative AI: Bedrock & Foundation Models',
      'Serverless Event-Driven Architectures',
      'Object Storage (Amazon S3)',
      'Advanced SQL & DB Optimization',
    ],
  },
  {
    issuer: 'Six Sigma',
    icon: <FaAward className="text-xl text-foreground" aria-hidden="true" />,
    title: 'Lean Six Sigma — White Belt',
    count: 'Quality System',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    topics: [
      'DMAIC Process Optimization Framework',
      'Root Cause Analysis & Continuous Delivery',
      'Quality Management Systems',
      'Operational Waste Reduction',
    ],
  },
]

export function CertificationsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="certifications" className="relative z-10 pt-10 scroll-mt-20">
      <SectionHeading
        id="02"
        badge="CREDENTIALS & ACCREDITATIONS"
        title={<>Verified <span className="italic font-light text-accent">Certifications &amp; Badges</span></>}
        subtitle="Third-party verified credentials in artificial intelligence, cloud architecture, and engineering quality systems."
        accent="certifications"
      />

      {/* Compact 3-Column Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative rounded-2xl sm:rounded-3xl border border-border/70 bg-muted/30 p-5 sm:p-6 hover:border-accent/40 backdrop-blur-xs transition-all duration-300 shadow-xs flex flex-col justify-between group"
          >
            <div>
              {/* Card Header: Icon + Title + Count Badge */}
              <div className="flex items-start justify-between gap-3 pb-3 mb-4 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-background border border-border/80 text-foreground shadow-2xs">
                    {cert.icon}
                  </span>
                  <div>
                    <h3 className="font-serif font-semibold text-base sm:text-lg text-foreground group-hover:text-accent transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {cert.count}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compact Topics List */}
              <div className="space-y-1.5 pt-1">
                {cert.topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="text-accent text-[10px] shrink-0" aria-hidden="true">✦</span>
                    <span className="truncate">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Verify Action */}
            <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Credly Verified
              </span>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Verify ${cert.title} on Credly (opens in new tab)`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline"
              >
                <span>Verify Credential</span>
                <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export default CertificationsSection
