import {
  LuArrowUpRight as ArrowUpRight,
  LuGraduationCap as GraduationCap,
  LuAward as Award,
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

const credentials = [
  {
    issuer: 'IBM',
    title: 'AI & machine learning',
    detail: 'Foundations, neural networks, and RAG',
    href: 'https://www.credly.com/users/arnel-baylon',
  },
  {
    issuer: 'AWS',
    title: 'Cloud & generative AI',
    detail: 'Serverless, object storage, and databases',
    href: 'https://www.credly.com/users/arnel-baylon',
  },
  {
    issuer: 'Six Sigma',
    title: 'Lean Six Sigma · White Belt',
    detail: 'Process improvement and quality systems',
    href: 'https://www.credly.com/users/arnel-baylon',
  },
]

export function JourneySection() {
  return (
    <div className={styles.layout}>
      <div className={styles.experience}>
        <h3 className={styles.columnTitle}>Experience</h3>
        <ol className={styles.timeline}>
          {experience.map((item) => (
            <li className={styles.timelineItem} key={item.organization}>
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
        <h3 className={styles.columnTitle}>Recognition &amp; learning</h3>

        <a
          className={styles.award}
          href="/certs/aws-capstone-best-business-impact.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Best Business Impact recognition, open award PDF in a new tab"
        >
          <div className={styles.awardTop}>
            <Award size={24} strokeWidth={1.5} aria-hidden="true" />
            <span className={styles.awardDate}>Aug 2026</span>
          </div>
          <h4 className={styles.awardTitle}>Best Business Impact</h4>
          <p className={styles.awardDescription}>AWS BuildNights QuickQuest · Team DEVOOPS</p>
          <span className={styles.awardAction}>
            View recognition <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </a>

        <a
          className={`${styles.award} ${styles.finalistAward}`}
          href="/images/gallery/egov-top5-2026.png"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="eGov Hackathon 2026 Top 5 recognition, open event photo in a new tab"
        >
          <div className={styles.awardTop}>
            <span className={styles.finalistMark} aria-hidden="true">05</span>
            <span className={styles.awardDate}>Sep 27, 2026</span>
          </div>
          <h4 className={styles.awardTitle}>Top 5 eGov</h4>
          <p className={styles.awardDescription}>eGov Hackathon 2026</p>
          <span className={styles.awardAction}>
            View recognition <span aria-hidden="true">↗</span>
          </span>
        </a>

        <ul className={styles.credentialList} aria-label="Selected learning credentials">
          {credentials.map((credential) => (
            <li key={credential.issuer}>
              <a
                className={styles.credential}
                href={credential.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${credential.title} by ${credential.issuer}, view Credly profile in a new tab`}
              >
                <div className={styles.credentialCopy}>
                  <span className={styles.issuer}>{credential.issuer}</span>
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
