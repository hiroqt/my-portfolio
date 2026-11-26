'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { Count, SectionHeading } from './Headings'
import list from '@/components/sections/List.module.css'
import styles from '../PortfolioShell.module.css'

interface MilestoneProof {
  id: string
  tag: string
  /** Where the recognition came from, shown at the right of its row. */
  source: string
  title: string
  sub: string
  imageSrc: string
  alt: string
  /** A page on this site, or a file that opens in a new tab. */
  linkUrl?: string
  linkLabel?: string
}

const proofMilestones: MilestoneProof[] = [
  {
    id: 'aws-award',
    tag: 'AWS BUILDNIGHTS / 2026',
    source: 'AWS BuildNights · 2026',
    title: 'Best Business Impact',
    sub: 'Capstone Winner · AI Cloud Architecture',
    imageSrc: '/images/gallery/business-impact-quickquest.webp',
    alt: 'QuickQuest Capstone on Quick finale poster in magenta and black',
    linkUrl: '/certs/aws-capstone-best-business-impact.pdf',
    linkLabel: 'View official PDF certificate ↗',
  },
  {
    id: 'egov-award',
    tag: 'EGOV HACKATHON / 2026',
    source: 'eGov Hackathon · 2026',
    title: 'Top 5 eGov Finalist',
    sub: 'National Finalist · Team DEVOOPS',
    imageSrc: '/images/gallery/egov-top5-2026.webp',
    alt: 'Top 5 Finalist recognition at eGov PH Hackathon 2026 with Team DEVOOPS',
    linkUrl: '/images/gallery/egov-top5-2026.webp',
    linkLabel: 'Open full-resolution photo ↗',
  },
  {
    id: 'nvidia-bootcamp',
    tag: 'NVIDIA DEVELOPER BOOTCAMP / 2026',
    source: 'NVIDIA · Nov 2026',
    title: 'NVIDIA Bootcamp Graduate',
    sub: '3-day paid developer bootcamp, attended as the only scholar',
    imageSrc: '/images/gallery/nvidia-bootcamp.webp',
    alt: 'Arnel holding his NVIDIA Developer bootcamp certificate on stage between two facilitators',
    linkUrl: '/certifications',
    linkLabel: 'See the NVIDIA certificates ↗',
  },
  {
    id: 'hospital-internship',
    tag: 'GEAMH PUBLIC HOSPITAL',
    source: 'GEAMH Public Hospital',
    title: '486 Hours of Building',
    sub: 'Live AI Triage & Queuing Deployment',
    imageSrc: '/images/gallery/internship_presenting_to_sectionheads.webp',
    alt: 'Arnel presenting the AI queuing and triage system to hospital section heads at General Emilio Aguinaldo Memorial Hospital',
    linkUrl: '/experience',
    linkLabel: 'Read about the experience ↗',
  },
]

const isPageLink = (url: string) => !/\.[a-z0-9]+$/i.test(url)

/** Awards and milestones, each opening a photo preview. */
export function Recognition() {
  const [selectedProof, setSelectedProof] = useState<MilestoneProof | null>(null)

  // Close on Escape and keep the page still behind the preview.
  useEffect(() => {
    if (!selectedProof) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProof(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedProof])

  return (
    <section id="recognition" aria-labelledby="recognition-title" className={styles.section}>
      <SectionHeading id="recognition" title="Recognition" meta={<Count value={proofMilestones.length} />} />
      <ul className={list.list} aria-label="Recognition" data-reveal>
        {proofMilestones.map(item => (
          <li className={list.row} key={item.id}>
            <button
              type="button"
              className={`${list.rowLink} ${list.withThumb} ${styles.milestone}`}
              onClick={() => setSelectedProof(item)}
              aria-haspopup="dialog"
              aria-label={`Preview ${item.title} recognition`}
            >
              <span className={list.thumb} aria-hidden="true">
                <Image src={item.imageSrc} alt="" fill sizes="76px" />
              </span>
              <span className={list.rowBody}>
                <span className={list.rowTitle}>{item.title}</span>
                <span className={list.rowText}>{item.sub}</span>
              </span>
              <span className={list.rowAside}>
                {item.source}
                <span className={list.arrow} aria-hidden="true">↗</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {selectedProof && (
          <motion.div
            className={styles.lightboxBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedProof(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="proof-modal-title"
          >
            <motion.div
              className={styles.lightboxDialog}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxHeader}>
                <div>
                  <small className={styles.lightboxTag}>{selectedProof.tag}</small>
                  <h3 id="proof-modal-title">{selectedProof.title}</h3>
                </div>
                <button
                  type="button"
                  className={styles.lightboxClose}
                  onClick={() => setSelectedProof(null)}
                  aria-label="Close image preview"
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>
              <div className={styles.lightboxImageWrap}>
                <Image
                  src={selectedProof.imageSrc}
                  alt={selectedProof.alt}
                  width={1400}
                  height={950}
                  className={styles.lightboxImage}
                  priority
                />
              </div>
              <div className={styles.lightboxFooter}>
                <p>{selectedProof.sub}</p>
                {selectedProof.linkUrl && (isPageLink(selectedProof.linkUrl) ? (
                  <Link href={selectedProof.linkUrl} onClick={() => setSelectedProof(null)} className={styles.lightboxLink}>
                    {selectedProof.linkLabel}
                  </Link>
                ) : (
                  <a href={selectedProof.linkUrl} target="_blank" rel="noreferrer" className={styles.lightboxLink}>
                    {selectedProof.linkLabel}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
