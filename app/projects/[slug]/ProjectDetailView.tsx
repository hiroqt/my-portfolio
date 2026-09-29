'use client'

import type { CSSProperties } from 'react'
import type { ProjectData } from '@/lib/data/projects'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowLeft, FiArrowUpRight, FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '@/components/ThemeProvider'
import { TechIcon } from '@/components/ui/TechIcon'
import styles from './ProjectDetailView.module.css'

export function ProjectDetailView({ project }: { project: ProjectData }) {
  const { resolvedTheme, setTheme } = useTheme()
  const title = project.featuredTitle || project.title.split(' (')[0]
  const summary = project.featuredSummary && project.featuredSummary.length <= 240
    ? project.featuredSummary
    : project.summary
  const projectPath = `/projects/${project.slug}`
  const hasProjectLink = Boolean(project.link && project.link !== '#' && project.link.split(/[?#]/)[0].replace(/\/$/, '') !== projectPath)
  const hasSourceLink = Boolean(project.github && (!hasProjectLink || project.github !== project.link))

  return (
    <div className={`portfolio-grain ${styles.page}`}>
      <nav className={styles.navigation} aria-label="Project navigation">
        <Link href="/#projects" className={styles.backLink}>
          <FiArrowLeft aria-hidden="true" />
          <span>All projects</span>
        </Link>
        <button
          type="button"
          className={styles.themeButton}
          aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </nav>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <header className={`${styles.header} ${styles.enter}`}>
          <p className={styles.eyebrow}>{project.type}</p>
          <h1 className={styles.title}>{title}<span className={styles.titleDot}>.</span></h1>
          <p className={styles.summary}>{summary}</p>

          <ul className={styles.tags} aria-label="Technology and disciplines">
            {project.tags.map(tag => (
              <li key={tag}>
                <TechIcon name={tag} size={12} aria-hidden="true" />
                <span>{tag}</span>
              </li>
            ))}
          </ul>

          {(hasProjectLink || hasSourceLink) && (
            <div className={styles.actions}>
              {hasProjectLink && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
                  Open project <FiArrowUpRight aria-hidden="true" />
                  <span className={styles.visuallyHidden}> (opens in a new tab)</span>
                </a>
              )}
              {hasSourceLink && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                  View source <FiArrowUpRight aria-hidden="true" />
                  <span className={styles.visuallyHidden}> (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </header>

        {project.image && (
          <figure className={`${styles.showcase} ${styles.enter}`}>
            <div
              className={styles.imageFrame}
              style={project.imageWidth && project.imageHeight ? {
                aspectRatio: `${project.imageWidth} / ${project.imageHeight}`
              } : undefined}
            >
              <Image
                src={project.image}
                alt={`${title} project showcase`}
                width={project.imageWidth ?? 1200}
                height={project.imageHeight ?? 800}
                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1040px) calc(100vw - 80px), 960px"
                priority
                className={styles.image}
              />
            </div>
            {project.previewName && project.previewName !== '-' && (
              <figcaption className={styles.caption}>{project.previewName}</figcaption>
            )}
          </figure>
        )}

        {project.features && project.features.length > 0 && (
          <section className={`${styles.featuresSection} ${styles.enter}`} aria-labelledby="features-title">
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>01 / In practice</span>
              <h2 id="features-title">What it does</h2>
            </div>
            <ul className={styles.features}>
              {project.features.map((feature, index) => (
                <li key={feature}>
                  <span className={styles.featureNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.content && project.content.length > 0 && (
          <div className={styles.story}>
            {project.content.map((section, index) => (
              <section
                key={section.title}
                className={`${styles.storySection} ${styles.enter}`}
                style={{ animationDelay: `${180 + Math.min(index, 4) * 40}ms` } as CSSProperties}
                aria-labelledby={`story-title-${index}`}
              >
                <h2 id={`story-title-${index}`}>{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>
        )}

        <footer className={styles.footer}>
          <span className={styles.eyebrow}>{project.initiative || 'Arnel Baylon / Selected work'}</span>
          <Link href="/#projects" className={styles.backLink}><FiArrowLeft aria-hidden="true" /> All projects</Link>
        </footer>
      </main>
    </div>
  )
}
