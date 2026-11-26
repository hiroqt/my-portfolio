import { FiPlus } from 'react-icons/fi'
import styles from './List.module.css'

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
export const credentials: Credential[] = [
  {
    issuer: 'NVIDIA',
    title: 'Building LLM Applications With Prompt Engineering',
    detail: 'Certificate of competency · NVIDIA Developer bootcamp',
    issued: 'Nov 2026',
    href: '/certs/nvidia-building-llm-apps-prompt-engineering.pdf',
    linkPurpose: 'open the certificate PDF',
  },
  {
    issuer: 'NVIDIA',
    title: 'Fundamentals of Deep Learning',
    detail: 'Certificate of competency · NVIDIA Developer bootcamp',
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

export function CertificationList() {
  return (
    <>
      <ul className={styles.list} aria-label="Certifications, newest first">
        {credentials.map(credential => (
          <li className={styles.row} key={credential.title}>
            <a
              className={styles.rowLink}
              href={credential.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${credential.title} by ${credential.issuer}, ${credential.linkPurpose} in a new tab`}
            >
              <span className={styles.rowBody}>
                <h3 className={styles.rowTitle}>{credential.title}</h3>
                <p className={styles.rowText}>{credential.detail}</p>
              </span>
              <span className={styles.rowAside}>
                {credential.issued ? `${credential.issuer} · ${credential.issued}` : credential.issuer}
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <details className={styles.extra}>
        <summary>
          More learning &amp; documents
          <FiPlus size={15} aria-hidden="true" />
        </summary>
        <div className={styles.extraBody}>
          <p>AI forms and functions, deep learning, responsible AI, SQL and database design, and process optimization.</p>
          <a href="/certs/aws-capstone-quickquest-participant.pdf" target="_blank" rel="noopener noreferrer">
            QuickQuest capstone participation <span aria-hidden="true">↗</span>
          </a>
          <a href="/certs/aws-buildnights-quickquest-participant.pdf" target="_blank" rel="noopener noreferrer">
            AWS BuildNights workshop series <span aria-hidden="true">↗</span>
          </a>
        </div>
      </details>
    </>
  )
}
