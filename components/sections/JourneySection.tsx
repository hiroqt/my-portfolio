import type { CSSProperties } from 'react'
import {
  LuArrowUpRight as ArrowUpRight,
  LuGraduationCap as GraduationCap,
  LuPlus as Plus,
} from 'react-icons/lu'
import styles from './JourneySection.module.css'

const experience = [
  {
    period: '2025 — now',
    organization: 'Independent',
    role: 'Software developer',
    story: 'Building web products, SaaS tools, and business websites—from discovery and database design to launch.',
  },
  {
    period: '2026',
    organization: 'GEAMH Public Hospital',
    role: 'Full-stack developer intern',
    note: '486 hours',
    story: 'Built an AI-assisted patient queue with staff controls, ticket printing, and live waiting-room displays.',
  },
  {
    period: '2026',
    organization: 'FlyRank',
    role: 'Backend AI engineer intern',
    story: 'Engineered layered backend architectures and containerized REST APIs with Express and PostgreSQL to support AI-driven platform workflows.',
  },
  {
    period: '2025 — 26',
    organization: 'VCM HRIS · Academic capstone',
    role: 'Lead developer',
    story: 'Designed a QR attendance and HR system with payroll calculations, leave tracking, and employee records.',
  },
]

type Credential = {
  issuer: string
  title: string
  detail: string
  /** Shown only when the issue date is on record. */
  issued?: string
  href: string
  /** Completes "…, ___ in a new tab" for screen readers. */
  linkPurpose: string
}

// Newest first.
const credentials: Credential[] = [
  {
    issuer: 'NVIDIA',
    title: 'Building LLM Applications With Prompt Engineering',
    detail: 'Certificate of competency',
    issued: 'Nov 2026',
    href: '/certs/nvidia-building-llm-apps-prompt-engineering.pdf',
    linkPurpose: 'open the certificate PDF',
  },
  {
    issuer: 'NVIDIA',
    title: 'Fundamentals of Deep Learning',
    detail: 'Certificate of competency',
    issued: 'Nov 2026',
    href: '/certs/nvidia-fundamentals-of-deep-learning.pdf',
    linkPurpose: 'open the certificate PDF',
  },
  {
    issuer: 'Oracle',
    title: 'Agentic AI Foundations Associate',
    detail: 'Oracle certified · verified badge',
    href: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=AE15372EEF7EEFB4229A84C9BB3E1E47AD325384BF2A2731D58BDF4298FDBD47',
    linkPurpose: 'view the verified badge',
  },
  {
    issuer: 'IBM',
    title: 'AI & machine learning',
    detail: 'Foundations, neural networks, and RAG',
    href: 'https://www.credly.com/users/arnel-baylon',
    linkPurpose: 'view the Credly profile',
  },
  {
    issuer: 'AWS',
    title: 'Cloud & generative AI',
    detail: 'Serverless, object storage, and databases',
    href: 'https://www.credly.com/users/arnel-baylon',
    linkPurpose: 'view the Credly profile',
  },
  {
    issuer: 'Six Sigma',
    title: 'Lean Six Sigma · White Belt',
    detail: 'Process improvement and quality systems',
    href: 'https://www.credly.com/users/arnel-baylon',
    linkPurpose: 'view the Credly profile',
  },
]

export function JourneySection() {
  return (
    <div className={styles.layout}>
      <div className={styles.experience}>
        <h3 className={styles.columnTitle}>Experience</h3>
        <ol className={styles.timeline}>
          {experience.map((item, index) => (
            <li className={styles.timelineItem} key={item.organization} data-reveal style={{ '--reveal-index': index } as CSSProperties}>
              <span className={styles.period}>{item.period}</span>
              <div className={styles.entry}>
                <span className={styles.organization}>{item.organization}</span>
                <div className={styles.roleLine}>
                  <h4 className={styles.role}>{item.role}</h4>
                  {item.note && <span className={styles.note}>{item.note}</span>}
                </div>
                <p className={styles.story}>{item.story}</p>
              </div>
            </li>
          ))}
        </ol>

        <div id="education" className={styles.education}>
          <GraduationCap size={20} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <p className={styles.school}>Cavite State University</p>
            <p className={styles.degree}>BS Information Technology · Class of 2026</p>
          </div>
        </div>
      </div>

      <div id="certifications" className={styles.recognition}>
        <h3 className={styles.columnTitle}>Certifications</h3>

        <ul className={styles.credentialList} aria-label="Certifications, newest first">
          {credentials.map((credential, index) => (
            <li key={credential.title} data-reveal style={{ '--reveal-index': Math.min(index, 5) } as CSSProperties}>
              <a
                className={styles.credential}
                href={credential.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${credential.title} by ${credential.issuer}, ${credential.linkPurpose} in a new tab`}
              >
                <div className={styles.credentialCopy}>
                  <span className={styles.issuer}>
                    {credential.issuer}
                    {credential.issued && <span className={styles.issued}>{credential.issued}</span>}
                  </span>
                  <h4 className={styles.credentialTitle}>{credential.title}</h4>
                  <p className={styles.credentialDetail}>{credential.detail}</p>
                </div>
                <ArrowUpRight size={16} className={styles.linkArrow} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <details className={styles.details}>
          <summary className={styles.summary}>
            More learning &amp; documents
            <Plus size={15} className={styles.detailsIcon} aria-hidden="true" />
          </summary>
          <div className={styles.detailsContent}>
            <p className={styles.detailsLabel}>Further topics</p>
            <p className={styles.additionalTopics}>
              AI forms and functions, deep learning, responsible AI, SQL and database design, and process optimization.
            </p>
            <a
              href="/certs/aws-capstone-quickquest-participant.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              QuickQuest capstone participation
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a
              href="/certs/aws-buildnights-quickquest-participant.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              AWS BuildNights workshop series
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </details>
      </div>
    </div>
  )
}
