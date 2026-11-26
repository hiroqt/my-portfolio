import type { Metadata } from 'next'
import { BlogNav } from '@/components/blog/BlogNav'
import page from '@/components/blog/Blog.module.css'
import { TypingGame } from './TypingGame'
import styles from './Typing.module.css'

const description = 'A little keyboard break. Test your speed, accuracy, and favorite switch sound.'

export const metadata: Metadata = {
  title: 'Typing playground — Arnel Baylon',
  description,
  alternates: { canonical: '/typing' },
  openGraph: {
    title: 'Typing playground — Arnel Baylon',
    description,
    images: [{ url: '/images/og-image.png', width: 1024, height: 1024, alt: 'Pixel-art portrait of Arnel Baylon' }],
  },
}

export default function TypingPage() {
  return (
    <div className={`portfolio-grain ${page.page}`}>
      <BlogNav backHref="/" backLabel="Portfolio" label="Page navigation" />

      <main id="main-content" className={page.main} tabIndex={-1}>
        <header className={`${page.indexHeader} ${page.enter}`}>
          <h1 className={page.indexTitle}>Typing playground<span className={page.titleDot}>.</span></h1>
          <p className={page.indexIntro}>{description}</p>
        </header>

        <div className={`${styles.game} ${page.enter}`}>
          <TypingGame />
        </div>
      </main>
    </div>
  )
}
