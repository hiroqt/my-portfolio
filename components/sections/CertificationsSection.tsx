'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  FaExternalLinkAlt,
  FaAward,
  FaFilePdf,
  FaExpand,
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaImage,
} from 'react-icons/fa'

// ── Official Physical / Issued AWS Certificate Data ──

interface OfficialCertificate {
  id: string
  title: string
  awardTag: string
  awardTagColor: 'amber' | 'blue' | 'purple'
  recipient: string
  recipientRole: string
  issuer: string
  date: string
  venue: string
  description: string
  thumbnailUrl: string
  highResUrl: string
  pdfUrl: string
  leads: string[]
  isWinner?: boolean
}

const officialCertificates: OfficialCertificate[] = [
  {
    id: 'aws-capstone-best-business-impact',
    title: 'Certificate of Recognition — Best Business Impact',
    awardTag: 'WINNER • BEST BUSINESS IMPACT',
    awardTagColor: 'amber',
    recipient: 'DEVOOPS',
    recipientRole: 'Winning Team & FinOps AI Dashboard Project (Lead: Arnel A. Baylon)',
    issuer: 'AWS User Group Philippines (AWSUG.PH) & AWS BuildNights',
    date: 'August 21, 2026',
    venue: 'AWS Office, 15th Flr, Arthaland Century Pacific Tower, Bonifacio Global City, Taguig',
    description:
      'Awarded for outstanding performance and demonstrating the Best Business Impact at Capstone on Quick! QuickQuest Finale: Build Responsibly for architecting and defending the FinOps AI Dashboard.',
    thumbnailUrl: '/certs/aws-capstone-best-business-impact.jpg',
    highResUrl: '/certs/aws-capstone-best-business-impact.png',
    pdfUrl: '/certs/aws-capstone-best-business-impact.pdf',
    leads: ['Mary Jean Navarro', 'Fahad Hadji Esmael', 'Dave Ailller Rivas', 'Denisse Jane Karim'],
    isWinner: true,
  },
  {
    id: 'aws-capstone-finale-participant',
    title: 'Certificate of Participation — Capstone on Quick! Finale',
    awardTag: 'CAPSTONE FINALE PARTICIPANT',
    awardTagColor: 'purple',
    recipient: 'ARNEL A. BAYLON',
    recipientRole: 'Builder & Full-Stack AI Engineer',
    issuer: 'AWS User Group Philippines (AWSUG.PH) & AWS BuildNights',
    date: 'August 21, 2026',
    venue: 'AWS Office, 15th Flr, Arthaland Century Pacific Tower, Bonifacio Global City, Taguig',
    description:
      'In recognition of active participation and valuable contribution to Capstone on Quick! QuickQuest Finale: Build Responsibly, building and defending production-grade cloud and AI architectures.',
    thumbnailUrl: '/certs/aws-capstone-quickquest-participant.jpg',
    highResUrl: '/certs/aws-capstone-quickquest-participant.png',
    pdfUrl: '/certs/aws-capstone-quickquest-participant.pdf',
    leads: ['Mary Jean Navarro', 'Fahad Hadji Esmael', 'Dave Ailller Rivas', 'Denisse Jane Karim'],
  },
  {
    id: 'aws-buildnights-workshop-series',
    title: 'Certificate of Participation — QuickQuest Workshop Series',
    awardTag: 'WORKSHOP SERIES COMPLETION (>4 SESSIONS)',
    awardTagColor: 'blue',
    recipient: 'ARNEL A. BAYLON',
    recipientRole: 'AWS Cloud & Agentic AI Cohort Builder',
    issuer: 'AWS User Group Philippines (AWSUG.PH) & AWS BuildNights',
    date: 'June 19 – August 21, 2026',
    venue: 'AWS Office, 15th Flr, Arthaland Century Pacific Tower, Bonifacio Global City, Taguig',
    description:
      'In recognition of active participation and completion of the AWS BuildNights QuickQuest Workshop Series, having attended more than 4 in-depth enterprise cloud sessions.',
    thumbnailUrl: '/certs/aws-buildnights-quickquest-participant.jpg',
    highResUrl: '/certs/aws-buildnights-quickquest-participant.png',
    pdfUrl: '/certs/aws-buildnights-quickquest-participant.pdf',
    leads: ['Mary Jean Navarro', 'Fahad Hadji Esmael', 'Dave Ailller Rivas', 'Denisse Jane Karim'],
  },
]

// ── SVG Brand Logos for Verified Credly Digital Badges ──

function IbmLogoSvg({ className = 'w-6 h-auto' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" className={className} aria-hidden="true">
      <path
        fill="#1f70c1"
        d="M0 0v27.367h194.648V0H0zm222.226 0v27.367h277.383S471.276 0 433.75 0H222.226zm331.797 0v27.367h167.812L711.875 0H554.023zm288.125 0-9.961 27.367h166.289V0H842.148zM0 53.222v27.367h194.648V53.222H0zm222.226.039V80.59h309.57s-3.615-21.063-9.922-27.329H222.226zm331.797 0V80.59h186.211l-9.219-27.329H554.023zm268.203 0-9.219 27.329h185.469V53.261h-176.25zM55.937 106.444v27.406h84.297v-27.406H55.937zm222.227 0v27.406h84.297v-27.406h-84.297zm166.289 0v27.406h84.297s5.352-14.473 5.352-27.406h-89.649zm165.508 0v27.406h149.453l-9.961-27.406H609.961zm193.906 0-10 27.406h150.195v-27.406H803.867zm-747.93 53.262v27.367h84.297v-27.367H55.937zm222.227 0v27.367h215.312s18.012-14.042 23.75-27.367H278.164zm331.797 0v27.367h84.297v-15.234l5.352 15.234h154.414l5.742-15.234v15.234h84.297v-27.367H785.82l-8.398 23.18-8.438-23.18H609.961zM55.937 212.928v27.367h84.297v-27.367H55.937zm222.227 0v27.367h239.062c-5.739-13.281-23.75-27.367-23.75-27.367H278.164zm331.797 0v27.367h84.297v-27.367h-84.297zm99.609 0 10.195 27.367h115.781l9.688-27.367H709.57zm150.195 0v27.367h84.297v-27.367h-84.297zM55.937 266.15v27.366h84.297V266.15H55.937zm222.227 0v27.366h84.297V266.15h-84.297zm166.289 0v27.366h89.648c0-12.915-5.352-27.366-5.352-27.366h-84.296zm165.508 0v27.366h84.297V266.15h-84.297zm118.75 0 9.883 27.366h77.617l9.961-27.366h-97.461zm131.054 0v27.366h84.297V266.15h-84.297zM1.523 319.372v27.406h194.648v-27.406H1.523zm220.703 0v27.406h299.648c6.307-6.275 9.922-27.406 9.922-27.406h-309.57zm333.321 0v27.406h138.711v-27.406H555.547zm192.343 0 10.156 27.406h39.492l9.531-27.406H747.89zm111.875 0v27.406H1000v-27.406H859.765zM1.523 372.633V400h194.648v-27.367H1.523zm220.703 0v27.328H433.75c37.526 0 65.859-27.328 65.859-27.328H222.226zm333.321 0V400h138.711v-27.367H555.547zm211.601 0 9.766 27.29 1.68.038 9.922-27.328h-21.368zm92.617 0V400H1000v-27.367H859.765z"
      />
    </svg>
  )
}

function AwsLogoSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      aria-hidden="true"
    >
      <title>AWS</title>
      <path d="M6.763 11.212c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.39-.384-.59-.894-.59-1.533 0-.678.24-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.4 2.4 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167 4.577 4.577 0 011.005-.36 4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586h.016zm-3.24 1.214c.263 0 .534-.048.822-.144a1.78 1.78 0 00.758-.51 1.27 1.27 0 00.272-.512c.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 6.726a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 01-.303.08h-.687c-.15 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32L12.32 7.747l-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08l-.686.001zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.32.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .36.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.16.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926a2.157 2.157 0 01-.583.703c-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
      <path
        d="M.378 15.475c3.384 1.963 7.56 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.44-.2.814.287.383.607-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351zm23.531-.2c.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151l.175-.439c.343-.88.802-2.198.52-2.555-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399z"
        fill="#F90"
      />
    </svg>
  )
}

function LeanSixSigmaSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.5 5h6v2h-3.8l2.2 3.5-2.2 3.5H16.5v2h-6l3-4.5-3-4.5z" />
    </svg>
  )
}

const digitalBadges = [
  {
    issuer: 'IBM',
    svgLogo: <IbmLogoSvg className="w-6 h-auto" />,
    title: 'IBM Professional AI Specialization',
    count: '7 Verified Badges',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    badgeId: '82e8f4a4-6ae5-4bea-8b5e-212cf6ec6563',
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
    svgLogo: <AwsLogoSvg className="w-5 h-5 text-foreground" />,
    title: 'AWS Cloud & Generative AI',
    count: '4 Verified Badges',
    credentialUrl: 'https://www.credly.com/users/arnel-baylon',
    badgeId: '7d53aa8f-5672-4064-b296-f6fccf400108',
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
    badgeId: 'LSS-WB-2026',
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
  const [mounted, setMounted] = useState(false)
  const [selectedCert, setSelectedCert] = useState<OfficialCertificate | null>(null)
  const [viewMode, setViewMode] = useState<'image' | 'pdf'>('image')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard accessibility for modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null)
      }
    },
    []
  )

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCert, handleKeyDown])

  const openCertModal = (cert: OfficialCertificate, mode: 'image' | 'pdf' = 'image') => {
    setViewMode(mode)
    setSelectedCert(cert)
  }

  return (
    <section id="certifications" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
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
          className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <span>Credly profile</span>
          <FaExternalLinkAlt className="text-[9px]" />
        </a>
      </div>

      {/* ── PART 1: Official AWS Issued Certificates (With Visual High-Res Images & Centered Lightbox) ── */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-foreground">
                Official AWS Honors &amp; Issued Certificates
              </h3>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
              Presented by AWS User Group Philippines (AWSUG.PH) at AWS Headquarters BGC
            </p>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-mono text-muted-foreground bg-muted/40 border border-border px-2.5 py-1 rounded-full">
            Click any certificate to preview &amp; inspect
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {officialCertificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => openCertModal(cert, 'image')}
              className={`group relative flex flex-col rounded-2xl border cursor-pointer ${
                cert.isWinner
                  ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/[0.04] to-transparent dark:from-amber-500/[0.08] dark:to-card/80 shadow-md shadow-amber-500/5 hover:border-amber-500/70 hover:shadow-lg hover:shadow-amber-500/10'
                  : 'border-border/80 bg-muted/20 dark:bg-card/80 hover:border-accent/50 hover:bg-muted/30'
              } p-4 transition-all duration-300 shadow-xs dark:shadow-lg dark:shadow-black/20`}
            >
              {/* Winner or Category Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[9.5px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full font-bold border flex items-center gap-1.5 ${
                    cert.isWinner
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                      : cert.awardTagColor === 'purple'
                      ? 'bg-purple-500/15 border-purple-500/30 text-purple-600 dark:text-purple-400'
                      : 'bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {cert.isWinner && <FaAward className="text-[10px]" />}
                  <span>{cert.awardTag}</span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  2026
                </span>
              </div>

              {/* Certificate Image Thumbnail: perfectly centered with object-contain so NO certificate edges or text are cropped */}
              <div className="relative overflow-hidden rounded-xl border border-border/80 bg-zinc-950/80 aspect-[4/3] flex items-center justify-center p-2 group/img shadow-inner">
                <img
                  src={cert.thumbnailUrl}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover Overlay with Inspect Badge */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white backdrop-blur-[2px]">
                  <span className="p-2.5 rounded-full bg-accent text-zinc-950 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 font-bold">
                    <FaExpand className="text-xs" />
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider font-semibold text-white">
                    Preview Certificate
                  </span>
                </div>
              </div>

              {/* Certificate Text Details */}
              <div className="mt-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-foreground group-hover:text-accent transition-colors leading-snug">
                    {cert.title}
                  </h4>
                  <p className="font-mono text-[10.5px] text-muted-foreground mt-1 line-clamp-2">
                    {cert.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-border/50 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                      <FaCalendarAlt className="text-[9px] text-accent shrink-0" />
                      <span>{cert.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                      <FaMapMarkerAlt className="text-[9px] text-accent shrink-0" />
                      <span className="truncate">AWS Office, BGC, Taguig City</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PART 2: Verified Credly Digital Badges (IBM, AWS, Lean Six Sigma) ── */}
      <div>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-xs text-accent" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-foreground">
              Professional Cloud &amp; AI Accreditations (Credly Badges)
            </h3>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
            11+ Verified Digital Competency Badges across Modern LLMs, Vector RAG, and Cloud Architecture
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {digitalBadges.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={reduce ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-muted/20 dark:bg-card/80 p-5 hover:border-accent/40 hover:bg-muted/40 transition-all shadow-xs dark:shadow-lg dark:shadow-black/15"
            >
              <div>
                {/* Header: Authentic SVG Logo + Credly Count Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="p-2.5 rounded-xl bg-background dark:bg-muted/50 border border-border text-foreground shadow-2xs inline-flex items-center justify-center">
                    {cert.svgLogo}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-background dark:bg-muted/40 border border-border text-muted-foreground font-semibold">
                    {cert.count}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-foreground group-hover:text-accent transition-colors leading-snug">
                  {cert.title}
                </h4>
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
      </div>

      {/* ── Perfectly Centered Portal Modal: Mounted directly on document.body ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                {/* Full-Screen Dim Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedCert(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md"
                  aria-hidden="true"
                />

                {/* Perfectly Centered Modal Dialog Card */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 15 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 340 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="cert-dialog-title"
                  className="relative z-10 w-full max-w-4xl my-auto mx-auto max-h-[94vh] overflow-y-auto rounded-3xl border border-border/80 bg-card text-foreground shadow-2xl p-4 sm:p-6 flex flex-col gap-4 scrollbar-thin"
                >
                  {/* Modal Header with View Mode Switcher */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border pb-3 shrink-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold border ${
                            selectedCert.isWinner
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                              : selectedCert.awardTagColor === 'purple'
                              ? 'bg-purple-500/15 border-purple-500/30 text-purple-600 dark:text-purple-400'
                              : 'bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {selectedCert.awardTag}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">Official Credential</span>
                      </div>
                      <h3 id="cert-dialog-title" className="font-serif text-lg sm:text-xl font-bold text-foreground">
                        {selectedCert.title}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        Awarded to: <span className="text-foreground font-semibold">{selectedCert.recipient}</span> • {selectedCert.recipientRole}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                      {/* View Mode Toggle: Image vs Embedded PDF */}
                      <div className="inline-flex items-center p-1 rounded-xl bg-muted/80 dark:bg-muted/40 border border-border text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setViewMode('image')}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                            viewMode === 'image'
                              ? 'bg-background text-foreground shadow-xs font-semibold'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <FaImage className="text-[11px]" />
                          <span>Image</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('pdf')}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                            viewMode === 'pdf'
                              ? 'bg-background text-foreground shadow-xs font-semibold'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <FaFilePdf className="text-[11px] text-red-500" />
                          <span>PDF</span>
                        </button>
                      </div>

                      {/* Close Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedCert(null)}
                        className="min-h-[36px] min-w-[36px] rounded-xl bg-muted/80 hover:bg-muted text-foreground flex items-center justify-center transition-colors cursor-pointer text-sm border border-border"
                        aria-label="Close certificate preview"
                      >
                        <FaTimes aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Centered Viewer Area: Image or Embedded PDF */}
                  <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-zinc-950 shadow-inner flex items-center justify-center p-2 sm:p-4 min-h-[350px]">
                    {viewMode === 'image' ? (
                      <div className="w-full flex items-center justify-center">
                        <img
                          src={selectedCert.highResUrl}
                          alt={selectedCert.title}
                          className="max-h-[62vh] max-w-full w-auto h-auto object-contain mx-auto rounded-lg shadow-2xl block"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-[62vh] rounded-lg overflow-hidden flex flex-col bg-zinc-900">
                        <iframe
                          src={`${selectedCert.pdfUrl}#toolbar=1&navpanes=0`}
                          title={`${selectedCert.title} PDF Preview`}
                          className="w-full h-full border-0 bg-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Modal Metadata Details & CTAs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border text-xs font-mono">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">
                        <span className="font-bold text-foreground">Presented By:</span> {selectedCert.issuer}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-bold text-foreground">Venue:</span> {selectedCert.venue}
                      </div>
                      <div className="text-muted-foreground text-[11px]">
                        <span className="font-bold text-foreground">Workshop Leads:</span> {selectedCert.leads.join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                      <a
                        href={selectedCert.highResUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/80 hover:bg-muted border border-border text-foreground font-semibold text-xs transition-colors"
                      >
                        <span>Full Image</span>
                        <FaExternalLinkAlt className="text-[10px]" />
                      </a>
                      <a
                        href={selectedCert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-white dark:text-zinc-950 font-semibold text-xs shadow-xs hover:bg-accent/90 transition-colors"
                      >
                        <FaFilePdf className="text-xs" />
                        <span>Open Raw PDF</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}

export default CertificationsSection
