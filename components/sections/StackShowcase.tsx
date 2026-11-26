'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { stackGroups } from '@/lib/data/stack'
import { TechIcon } from '@/components/ui/TechIcon'
import styles from './StackShowcase.module.css'

export function StackShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)
  const [focusedGroup, setFocusedGroup] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const activeGroupLabel = focusedGroup ?? hoveredGroup ?? selectedGroup
  const activeGroup = stackGroups.find((group) => group.label === activeGroupLabel)

  return (
    <div
      className={styles.showcase}
      ref={rootRef}
      onPointerLeave={() => setHoveredGroup(null)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setFocusedGroup(null)
      }}
    >
      <div className={styles.groups} data-reveal>
        {stackGroups.map((group, index) => {
          const id = `stack-group-${index}`
          return (
            <button
              className={styles.group}
              id={id}
              key={group.label}
              type="button"
              aria-controls="stack-tool-panel"
              aria-expanded={activeGroupLabel === group.label}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setHoveredGroup(group.label)
              }}
              onFocus={() => setFocusedGroup(group.label)}
              onClick={() => setSelectedGroup((selected) => selected === group.label ? null : group.label)}
            >
              <span>
                <span className={styles.groupLabel}>{group.label}</span>
                <span className={styles.groupDescription}>{group.description}</span>
              </span>
              <span className={styles.groupMeta}>
                <span>{group.technologies.length} tools</span>
                <span className={styles.summaryMark} aria-hidden="true">↗</span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        className={styles.toolPanel}
        id="stack-tool-panel"
        aria-labelledby={activeGroup ? `stack-group-${stackGroups.indexOf(activeGroup)}` : undefined}
        hidden={!activeGroup}
      >
        {activeGroup && (
          <ul className={styles.technologyList} aria-label={`${activeGroup.label} tools`} key={activeGroup.label}>
            {activeGroup.technologies.map((technology, index) => (
              <li key={technology.label} style={{ '--i': index } as CSSProperties}>
                <a
                  className={styles.technology}
                  href={technology.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${technology.label}, view documentation or source in a new tab`}
                >
                  <TechIcon name={technology.label} size={15} aria-hidden="true" />
                  <span>{technology.label}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
