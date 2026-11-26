import Image from 'next/image'
import Link from 'next/link'
import type { ProjectVideo } from '@/lib/data/projects'
import { ProjectDemo } from './ProjectDemo'
import { ExpandableList } from './ExpandableList'
import styles from './List.module.css'

/** One project as the home page lists it. Built on the server from lib/data/projects. */
export interface ProjectRow {
  slug: string
  title: string
  summary: string
  category: string
  image?: string
  focus?: string
  /** A recognition tag shown beside the title, such as a hackathon placing. */
  badge?: string
  video?: ProjectVideo
}

/** `demos` adds a Watch demo toggle under rows that have a video (used on the Projects page). */
export function ProjectList({ projects, visible = 3, demos = false }: { projects: ProjectRow[]; visible?: number; demos?: boolean }) {
  const items = projects.map(project => ({
    key: project.slug,
    node: (
      <>
        <Link href={`/projects/${project.slug}`} className={`${styles.rowLink} ${styles.withThumb}`}>
          <span className={styles.thumb} aria-hidden="true">
            {project.image ? (
              <Image src={project.image} alt="" fill sizes="76px" style={{ objectPosition: project.focus ?? 'center' }} />
            ) : (
              project.title.charAt(0)
            )}
          </span>
          <span className={styles.rowBody}>
            <h3 className={styles.rowTitle}>
              {project.title}
              {project.badge && <span className={styles.chip}>{project.badge}</span>}
            </h3>
            <p className={`${styles.rowText} ${styles.clamp}`}>{project.summary}</p>
          </span>
          <span className={styles.rowAside}>
            {project.category}
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </span>
        </Link>
        {demos && project.video && <ProjectDemo video={project.video} projectTitle={project.title} />}
      </>
    ),
  }))

  return <ExpandableList items={items} visible={visible} noun="projects" label="Projects" moreLabel="View more" />
}
