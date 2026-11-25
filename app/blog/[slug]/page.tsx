import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowLeft, FiArrowUp } from 'react-icons/fi'
import { ArticleSection } from '@/components/blog/ArticleBody'
import { ArticleToc, type TocItem } from '@/components/blog/ArticleToc'
import { BlogNav } from '@/components/blog/BlogNav'
import { RichText } from '@/components/blog/RichText'
import { blogPosts, formatPostDate, getBlogPost, getPostFullTitle, getReadingMinutes } from '@/lib/data/blog'
import styles from '@/components/blog/Blog.module.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arnelbaylon.dev'

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  const title = `${post.title} — Arnel Baylon`
  return {
    title,
    description: post.summary,
    keywords: post.keywords,
    authors: [{ name: 'Arnel Baylon', url: siteUrl }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: getPostFullTitle(post),
      description: post.summary,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Arnel Baylon'],
      tags: post.keywords,
      images: [{ url: '/images/header.png?v=2', width: 1024, height: 1024, alt: 'Pixel-art portrait of Arnel Baylon' }],
    },
    twitter: { card: 'summary', title, description: post.summary, images: ['/images/header.png?v=2'] },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const readingMinutes = getReadingMinutes(post)
  const tocItems: TocItem[] = [
    { id: 'abstract', title: 'Abstract' },
    ...post.sections.map(section => ({ id: section.id, label: section.label, title: section.title })),
  ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: getPostFullTitle(post),
    description: post.summary,
    datePublished: post.publishedAt,
    keywords: post.keywords.join(', '),
    url: `${siteUrl}/blog/${post.slug}`,
    author: { '@type': 'Person', name: 'Arnel Baylon', alternateName: 'Yhel', url: siteUrl },
  }

  return (
    <div className={`portfolio-grain ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <BlogNav backHref="/blog" backLabel="All posts" showHome />

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <article>
          <header id="article-top" className={`${styles.articleHeader} ${styles.enter}`}>
            <h1 className={styles.articleTitle}>
              <span className={styles.articleTitleMain}>{post.title}</span>
              {post.subtitle && (
                <>
                  <span className={styles.visuallyHidden}>: </span>
                  <span className={styles.articleSubtitle}>{post.subtitle}</span>
                </>
              )}
            </h1>
            <p className={styles.byline}>
              <span>{post.kind}</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span>{post.author}</span>
              <span>{readingMinutes} min read</span>
            </p>
          </header>

          <div className={styles.articleLayout}>
            <aside className={styles.tocAside}>
              <ArticleToc items={tocItems} />
            </aside>

            <div className={styles.articleBody}>
              <details className={styles.tocInline}>
                <summary>Contents</summary>
                <ol>
                  {tocItems.map(item => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>
                        {item.label && <span className={styles.tocLabel}>{item.label.replace('Chapter ', '')}</span>}
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <section id="abstract" className={styles.abstract} aria-labelledby="abstract-title">
                <h2 id="abstract-title" className={styles.abstractTitle}>Abstract</h2>
                {post.abstract.map(paragraph => (
                  <p key={paragraph.slice(0, 32)}><RichText text={paragraph} /></p>
                ))}
                <p className={styles.keywords}>
                  <strong>Keywords:</strong> {post.keywords.join(', ')}
                </p>
              </section>

              {post.sections.map(section => <ArticleSection key={section.id} section={section} />)}

              <footer className={styles.articleFooter}>
                <Link href="/blog" className={styles.backLink}>
                  <FiArrowLeft aria-hidden="true" />
                  <span>All posts</span>
                </Link>
                <a href="#article-top" className={styles.backLink}>
                  <span>Back to top</span>
                  <FiArrowUp aria-hidden="true" />
                </a>
              </footer>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
