'use client'

import dynamic from 'next/dynamic'
import styles from './Typing.module.css'

/** The game picks random words on first render, so it only renders in the browser. */
export const TypingGame = dynamic(
  () => import('@/components/modules/typing/MonkeyTypeGame').then(module => module.MonkeyTypeGame),
  { ssr: false, loading: () => <p className={styles.loading}>Loading the typing playground…</p> },
)
