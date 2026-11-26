import { LuGraduationCap as GraduationCap } from 'react-icons/lu'
import styles from './List.module.css'

export const experience = [
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

export function ExperienceList() {
  return (
    <>
      <ol className={styles.list} aria-label="Experience, newest first">
        {experience.map(item => (
          <li className={styles.row} key={item.organization}>
            <div className={styles.rowStatic}>
              <div className={styles.rowBody}>
                <h3 className={styles.rowTitle}>
                  {item.role} <span>· {item.organization}</span>
                  {item.note && <span className={styles.chip}>{item.note}</span>}
                </h3>
                <p className={styles.rowText}>{item.story}</p>
              </div>
              <span className={styles.rowAside}>{item.period}</span>
            </div>
          </li>
        ))}
      </ol>

      <div id="education" className={styles.education}>
        <GraduationCap size={20} strokeWidth={1.5} aria-hidden="true" />
        <div>
          <p className={styles.rowTitle}>Cavite State University</p>
          <p className={styles.rowText}>BS Information Technology · Class of 2026</p>
        </div>
      </div>
    </>
  )
}
