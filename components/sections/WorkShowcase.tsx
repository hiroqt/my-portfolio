import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { projectsData, type ProjectData, type ProjectShowcase } from '@/lib/data/projects'
import { TechIcon } from '@/components/ui/TechIcon'
import styles from './WorkShowcase.module.css'

type ShowcaseProject = ProjectData & { showcase: ProjectShowcase }

const showcaseProjects = projectsData
  .filter((project): project is ShowcaseProject => Boolean(project.showcase))
  .sort((a, b) => a.showcase.order - b.showcase.order)

function ProjectCard({ project, column }: { project: ShowcaseProject; column: number }) {
  const title = project.featuredTitle ?? project.title.split(' (')[0]
  const summary = project.featuredSummary ?? project.summary
  const titleId = `work-${project.slug}-title`
  const summaryId = `work-${project.slug}-summary`

  return (
    <li className={styles.card} data-reveal style={{ '--reveal-index': column } as CSSProperties}>
      <Link href={`/projects/${project.slug}`} className={styles.cardLink} aria-labelledby={titleId} aria-describedby={summaryId}>
        <div className={styles.artwork}>
          <div className={styles.imageReveal}>
            {project.image && (
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 680px) calc(100vw - 72px), (max-width: 1140px) 45vw, 500px"
                className={styles.image}
                style={{ objectPosition: project.showcase.focus ?? 'center' }}
              />
            )}
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.metaRow}>
            <p className={styles.category}>{project.showcase.category}</p>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </div>
          <h3 className={styles.title} id={titleId}>{title}</h3>
          <p className={styles.summary} id={summaryId}>{summary}</p>
          <ul className={styles.tags} aria-label="Technologies">
            {project.tags.slice(0, 3).map((tag) => (
              <li key={tag}>
                <TechIcon name={tag} size={12} aria-hidden="true" />
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  )
}

export function WorkShowcase() {
  return (
    <div className={styles.showcase}>
      <ul className={styles.grid}>
        {showcaseProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} column={index % 2} />
        ))}
      </ul>

      <div className={styles.moreRow}>
        <a
          href="https://github.com/hiroqt?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.more}
        >
          <span>Explore more repositories on GitHub</span>
          <span aria-hidden="true">↗</span>
          <span className={styles.visuallyHidden}> (opens in a new tab)</span>
        </a>
        <p>{showcaseProjects.length} impactful projects in AI, civic technology, developer tooling, and desktop productivity.</p>
      </div>
    </div>
  )
}
