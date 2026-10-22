import styles from './SkillsShowcase.module.css'

const skills = [
  {
    name: 'PixelCrew',
    category: 'MULTI-AGENT ENGINEERING',
    summary: 'Coordinates specialist AI agents so parallel engineering work stays organized and visible.',
    audience: 'Developers coordinating multi-agent coding work.',
    capabilities: ['Codebase-aware planning', 'Parallel specialist agents', 'Live activity dashboard'],
    href: 'https://github.com/hiroqt/PixelCrew',
  },
  {
    name: 'Overdrive',
    category: 'PORTABLE AGENT WORKFLOWS',
    summary: 'Routes engineering tasks to the right reusable skill across supported coding-agent tools.',
    audience: 'Developers using specialized skills across AI coding tools.',
    capabilities: ['Task-aware routing', '11 focused workflows', 'Host-native installer'],
    href: 'https://github.com/hiroqt/overdrive',
  },
]

export function SkillsShowcase() {
  return (
    <div className={styles.grid}>
      {skills.map((skill) => (
        <article className={styles.card} key={skill.name}>
          <p className={styles.category}>{skill.category}</p>
          <h3>{skill.name}</h3>
          <p className={styles.summary}>{skill.summary}</p>
          <p className={styles.audience}><span>For</span>{skill.audience}</p>
          <ul className={styles.capabilities} aria-label={`${skill.name} capabilities`}>
            {skill.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
          <a className={styles.link} href={skill.href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${skill.name} on GitHub, opens in a new tab`}>
            View on GitHub <span aria-hidden="true">↗</span>
          </a>
        </article>
      ))}
    </div>
  )
}
