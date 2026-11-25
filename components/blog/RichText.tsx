import { Fragment } from 'react'
import styles from './Blog.module.css'

const URL_PATTERN = /(https?:\/\/[^\s]+)/g
const TRAILING_PUNCTUATION = /[.,;:)\]]+$/

/** Converts ASCII quotes to typographic ones. Only used on non-URL text. */
export function smartQuotes(text: string) {
  return text
    .replace(/(^|[\s(\[—–-])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s(\[“—–-])'/g, '$1‘')
    .replace(/'/g, '’')
}

/** Renders study text with typographic quotes and every http(s) URL as a link. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(URL_PATTERN)

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) return part ? <Fragment key={index}>{smartQuotes(part)}</Fragment> : null

        const trailing = part.match(TRAILING_PUNCTUATION)?.[0] ?? ''
        const url = trailing ? part.slice(0, -trailing.length) : part

        return (
          <Fragment key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
              {url}
              <span className={styles.visuallyHidden}> (opens in a new tab)</span>
            </a>
            {trailing}
          </Fragment>
        )
      })}
    </>
  )
}
