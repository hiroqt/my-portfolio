'use client'

import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import styles from './List.module.css'

export interface ExpandableItem {
  key: string
  node: ReactNode
}

/**
 * Shows the first `visible` rows, lets the next one peek out under a fade,
 * and reveals the rest with a button ("N more <noun>" unless `moreLabel` is given).
 */
export function ExpandableList({ items, visible, noun, label, moreLabel }: { items: ExpandableItem[]; visible: number; noun: string; label: string; moreLabel?: string }) {
  const [expanded, setExpanded] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const hiddenCount = Math.max(0, items.length - visible)
  const shown = expanded ? items : items.slice(0, visible)
  const peek = !expanded && hiddenCount > 0 ? items[visible] : null

  const toggle = () => {
    setExpanded(open => !open)
    // When collapsing from far down the list, bring its start back into view.
    if (expanded) {
      requestAnimationFrame(() => {
        const list = listRef.current
        if (list && list.getBoundingClientRect().top < 0) list.scrollIntoView({ block: 'start' })
      })
    }
  }

  return (
    <>
      <ul className={styles.list} aria-label={label} ref={listRef}>
        {shown.map((item, index) => {
          const isRevealed = expanded && index >= visible
          return (
            <li
              key={item.key}
              className={isRevealed ? `${styles.row} ${styles.revealed}` : styles.row}
              style={isRevealed ? ({ '--i': index - visible } as CSSProperties) : undefined}
            >
              {item.node}
            </li>
          )
        })}
        {peek && (
          <li key={peek.key} className={`${styles.row} ${styles.peek}`} aria-hidden="true" inert>
            {peek.node}
          </li>
        )}
      </ul>
      {hiddenCount > 0 && (
        <div className={styles.moreRow}>
          <button type="button" className={styles.moreButton} aria-expanded={expanded} onClick={toggle}>
            {expanded ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
            {expanded ? 'Show less' : moreLabel ?? `${hiddenCount} more ${noun}`}
          </button>
        </div>
      )}
    </>
  )
}
