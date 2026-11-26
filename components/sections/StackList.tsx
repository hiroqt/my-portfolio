import { stackGroups } from '@/lib/data/stack'
import { TechIcon } from '@/components/ui/TechIcon'
import styles from './List.module.css'

export const stackToolCount = stackGroups.reduce((total, group) => total + group.technologies.length, 0)

export function StackList() {
  return (
    <dl className={styles.list}>
      {stackGroups.map(group => (
        <div className={styles.defRow} key={group.label}>
          <dt className={styles.defLabel}>{group.label}</dt>
          <dd className={styles.defValue}>
            <ul className={styles.tools} aria-label={`${group.label} tools`}>
              {group.technologies.map(technology => (
                <li key={technology.label}>
                  <a
                    className={styles.tool}
                    href={technology.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${technology.label}, view documentation or source in a new tab`}
                  >
                    <TechIcon name={technology.label} size={16} aria-hidden="true" />
                    {technology.label}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
