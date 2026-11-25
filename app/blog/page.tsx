import type { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import { BlogNav } from '@/components/blog/BlogNav'
import { blogPosts, formatPostDate, getReadingMinutes } from '@/lib/data/blog'
import styles from '@/components/blog/Blog.module.css'

const description = 'Studies and notes by Arnel Baylon on AI, software, and the tech job market.'

export const metadata: Metadata = {
  title: 'Blog — Arnel Baylon',
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Arnel Baylon',
    description,
    type: 'website',
    images: [{ url: '/images/header.png?v=2', width: 1024, height: 1024, alt: 'Pixel-art portrait of Arnel Baylon' }],
  },
  twitter: { card: 'summary', title: 'Blog — Arnel Baylon', description, images: ['/images/header.png?v=2'] },
}

export default function BlogIndexPage() {
  return (
    <div className={`portfolio-grain ${styles.page}`}>
      <BlogNav backHref="/" backLabel="Portfolio" />

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <header className={`${styles.indexHeader} ${styles.enter}`}>
          <h1 className={styles.indexTitle}>Blog<span className={styles.titleDot}>.</span></h1>
          <p className={styles.indexIntro}>{description}</p>
        </header>

        <ol className={styles.postList} aria-label="Posts">
          {blogPosts.map(post => (
            <li key={post.slug} className={styles.enter}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <p className={styles.postMeta}>
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  <span>{post.kind}</span>
                  <span>{getReadingMinutes(post)} min read</span>
                </p>
                <div className={styles.postText}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  {post.subtitle && <p className={styles.postSubtitle}>{post.subtitle}</p>}
                  <p className={styles.postSummary}>{post.summary}</p>
                  <span className={styles.postCta}>
                    Read the {post.kind.toLowerCase()} <FiArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
