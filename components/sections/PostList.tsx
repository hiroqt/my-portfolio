import Link from 'next/link'
import { ExpandableList } from './ExpandableList'
import styles from './List.module.css'

/** One blog post as the Overview lists it. Built on the server from lib/data/blog. */
export interface PostRow {
  slug: string
  title: string
  summary: string
  kind: string
  publishedAt: string
  date: string
  minutes: number
}

/** The newest posts: the first few in full, the next one peeking, then "View more". */
export function PostList({ posts, visible = 3 }: { posts: PostRow[]; visible?: number }) {
  const items = posts.map(post => ({
    key: post.slug,
    node: (
      <Link href={`/blog/${post.slug}`} className={styles.rowLink}>
        <span className={styles.rowBody}>
          <h3 className={styles.rowTitle}>{post.title}</h3>
          <p className={`${styles.rowText} ${styles.clamp}`}>{post.summary}</p>
          <p className={styles.rowMeta}>
            <time dateTime={post.publishedAt}>{post.date}</time> · {post.kind} · {post.minutes} min read
          </p>
        </span>
        <span className={styles.rowAside}>
          Read
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </span>
      </Link>
    ),
  }))

  return <ExpandableList items={items} visible={visible} noun="posts" label="Blog posts, newest first" moreLabel="View more" />
}
