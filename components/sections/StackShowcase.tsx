import { additionalStack, stackGroups } from '@/lib/data/stack'
import { TechIcon } from '@/components/ui/TechIcon'
import { SocialsFlash } from './SocialsFlash'
import styles from './StackShowcase.module.css'

export function StackShowcase() {
  return (
    <div className={styles.showcase}>
      <div className={styles.toolsColumn}>
        <div className={styles.header}>
          <h2>Languages &amp; tools</h2>
          <span className={styles.headerMark} aria-hidden="true">{'</>'}</span>
        </div>

        <div className={styles.toolsBody}>
          <div className={styles.groups}>
            {stackGroups.map((group) => (
              <div className={styles.group} key={group.label}>
                <h3 className={styles.groupLabel}>{group.label}</h3>
                <ul className={styles.technologyList} aria-label={`${group.label} technologies`}>
                  {group.technologies.map((technology) => (
                    <li key={technology.label}>
                      <a
                        className={styles.technology}
                        href={technology.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${technology.label}, view documentation or source in a new tab`}
                      >
                        <span className={styles.monogram} aria-hidden="true">
                          <TechIcon name={technology.label} size={16} />
                        </span>
                        <span className={styles.technologyName}>{technology.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.additional}>
            <span className={styles.groupLabel}>Also working with</span>
            <ul className={styles.additionalList} aria-label="Additional technologies">
              {additionalStack.map((technology) => (
                <li key={technology.label}>
                  <a href={technology.source} target="_blank" rel="noopener noreferrer" aria-label={`${technology.label}, view documentation or source in a new tab`}>
                    <TechIcon name={technology.label} size={13} className={styles.additionalIcon} aria-hidden="true" />
                    <span>{technology.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.approachColumn}>
        <div className={styles.header}>
          <h2>How I work</h2>
          <span className={styles.headerMark} aria-hidden="true">↗</span>
        </div>

        <div className={styles.approachBody}>
          <div className={styles.approachCopy}>
            <p>I start with the problem, build a useful first version, and refine the details. Clear interfaces and reliable data keep the product easy to use.</p>
            <p>For AI features, I focus on the context, tools, and checks that make each result useful. I test the workflow as a whole.</p>
          </div>

          <div className={styles.links}>
            <a href="#about" className={styles.textLink}>A little more about me <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/hiroqt" target="_blank" rel="noopener noreferrer" className={styles.codeLink}>Explore the code <span aria-hidden="true">↗</span></a>
          </div>

          <div className={styles.platforms}>
            <h3 className={styles.groupLabel}>Platforms</h3>
            <ul className={styles.platformList} aria-label="Platforms I build for">
              <li>
                <span className={styles.platformMark} aria-hidden="true">
                  <TechIcon name="web" size={13} />
                </span>
                <span>Web</span>
              </li>
              <li>
                <span className={styles.platformMark} aria-hidden="true">
                  <TechIcon name="ios" size={13} />
                </span>
                <span>iOS</span>
              </li>
              <li>
                <span className={styles.platformMark} aria-hidden="true">
                  <TechIcon name="android" size={13} />
                </span>
                <span>Android</span>
              </li>
              <li>
                <span className={styles.platformMark} aria-hidden="true">
                  <TechIcon name="macos" size={13} />
                </span>
                <span>macOS</span>
              </li>
            </ul>

            <div className={styles.platformsCenter}>
              <SocialsFlash />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StackShowcase
