import styles from './List.module.css'

export const skills = [
  {
    name: 'PixelCrew',
    category: 'Multi-agent engineering',
    summary: 'Coordinates specialist AI agents so parallel engineering work stays organized and visible.',
    capabilities: ['Codebase-aware planning', 'Parallel specialist agents', 'Live activity dashboard'],
    href: 'https://github.com/hiroqt/PixelCrew',
  },
  {
    name: 'Overdrive',
    category: 'Portable agent workflows',
    summary: 'Routes engineering tasks to the right reusable skill across supported coding-agent tools.',
    capabilities: ['Task-aware routing', '11 focused workflows', 'Host-native installer'],
    href: 'https://github.com/hiroqt/overdrive',
  },
]

export function SkillList() {
  return (
    <ul className={`${styles.list} ${styles.relaxed}`} aria-label="Skills I build">
      {skills.map(skill => (
        <li className={styles.row} key={skill.name}>
          <a
            className={styles.rowLink}
            href={skill.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${skill.name}, ${skill.category.toLowerCase()}. Explore it on GitHub, opens in a new tab`}
          >
            <span className={styles.rowBody}>
              <h3 className={styles.rowTitle}>
                {skill.name} <span>· {skill.category}</span>
              </h3>
              <p className={styles.rowText}>{skill.summary}</p>
              <p className={styles.rowMeta}>{skill.capabilities.join(' · ')}</p>
            </span>
            <span className={styles.rowAside}>
              GitHub
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
