'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projectsData, type ProjectData } from '@/lib/data/projects'
import { TechIcon } from '@/components/ui/TechIcon'
import styles from './WorkShowcase.module.css'

type WorkFilter = 'all' | 'ai' | 'web'

type WorkMeta = {
  category: string
  filter: Exclude<WorkFilter, 'all'>
  summary: string
  tags?: string[]
  position?: string
}

const selectedSlugs = ['e-buddy', 'sakto-ka', 'android-deck', 'pixelcrew', 'better-trece']

const col1Slugs = new Set(['e-buddy', 'android-deck', 'pixelcrew'])

const projectMeta: Record<string, WorkMeta> = {
  'e-buddy': {
    category: 'AI & civic tech',
    filter: 'ai',
    summary: 'Unified citizen portal with biometric face verification, multi-modal voice AI, and automated public services. Recognized Top 5 at eGov Hackathon 2026.',
    tags: ['React', 'TypeScript', 'Agentic AI'],
    position: 'center 15%',
  },
  'sakto-ka': {
    category: 'AI & career copilot',
    filter: 'ai',
    summary: 'Private career copilot with offline-first ATS resume scoring, Python FastAPI analysis engine, job matching, and real-time voice interview simulations in the browser.',
    tags: ['Next.js', 'Python', 'FastAPI'],
    position: 'center 15%',
  },
  'android-deck': {
    category: 'macOS & Android utility',
    filter: 'web',
    summary: 'Transforms an Android phone into a touchscreen stream deck for macOS over USB or Wi-Fi, paired with a native Swift Liquid Glass notch HUD.',
    tags: ['Swift', 'Kotlin', 'macOS'],
    position: 'center center',
  },
  pixelcrew: {
    category: 'Autonomous AI swarm',
    filter: 'ai',
    summary: 'Visual AI agent orchestration workspace with a DAG task engine, parallel execution loops, and a retro pixel-art startup office.',
    tags: ['Node.js', 'JavaScript', 'AI Agents'],
    position: 'center center',
  },
  'better-trece': {
    category: 'Civic tech & open data',
    filter: 'web',
    summary: 'Open civic data portal visualizing municipal budgets, infrastructure spending, and public city services for Trece Martires.',
    tags: ['React', 'TypeScript', 'Vite'],
    position: 'center 15%',
  },
}

const filters: { value: WorkFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI & Copilots' },
  { value: 'web', label: 'Web & Systems' },
]

function ProjectCard({
  project,
  index,
  order,
}: {
  project: ProjectData
  index: number
  order?: number
}) {
  const meta = projectMeta[project.slug] ?? {
    category: project.type.split(' / ')[0],
    filter: 'web',
    summary: project.featuredSummary ?? project.summary,
    tags: project.tags.slice(0, 3),
    position: 'center center',
  }
  const title = project.featuredTitle ?? project.title.split(' (')[0]
  const imageAspect = project.imageWidth && project.imageHeight
    ? `${project.imageWidth} / ${project.imageHeight}`
    : undefined

  return (
    <article className={styles.card} style={order !== undefined ? { order } : undefined}>
      <Link href={`/projects/${project.slug}`} className={styles.cardLink} aria-label={`Explore ${title}`}>
        <div
          className={styles.artwork}
          style={imageAspect ? { aspectRatio: imageAspect } : undefined}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${title} project preview`}
              fill
              sizes="(max-width: 680px) 90vw, (max-width: 1200px) 48vw, 560px"
              className={styles.image}
              style={{ objectPosition: meta.position ?? 'center center' }}
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true">
              <span className={styles.placeholderLabel}>Project workspace</span>
              <span className={styles.placeholderTitle}>{title}</span>
              <span className={styles.placeholderDetail}>{meta.category}</span>
            </div>
          )}
        </div>
        <div className={styles.cardBody}>
          <div className={styles.metaRow}>
            <p className={styles.category}><span>{String(index + 1).padStart(2, '0')}</span> / {meta.category}</p>
            <span className={styles.view} aria-hidden="true">View <span className={styles.arrow}>↗</span></span>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.summary}>{meta.summary ?? project.featuredSummary ?? project.summary}</p>
          <ul className={styles.tags} aria-label="Technologies">
            {(meta.tags ?? project.tags.slice(0, 3)).map((tag) => (
              <li key={tag}>
                <TechIcon name={tag} size={11} aria-hidden="true" />
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  )
}

export function WorkShowcase() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all')

  const selectedProjects = selectedSlugs.flatMap((slug) => {
    const project = projectsData.find((entry) => entry.slug === slug)
    return project ? [project] : []
  })

  const visibleProjects = selectedProjects.filter(
    (project) => activeFilter === 'all' || (projectMeta[project.slug]?.filter ?? 'web') === activeFilter
  )

  const col1Projects = visibleProjects.filter((project) => col1Slugs.has(project.slug))
  const col2Projects = visibleProjects.filter((project) => !col1Slugs.has(project.slug))

  return (
    <div className={styles.showcase}>
      <div className={styles.filterRow} aria-label="Filter projects">
        <div className={styles.filters} role="group" aria-label="Project categories">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={activeFilter === filter.value}
              aria-controls="portfolio-project-grid"
              onClick={() => setActiveFilter(filter.value)}
              className={styles.filter}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <span className={styles.count} role="status" aria-live="polite">
          {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      <div className={styles.grid} id="portfolio-project-grid">
        <div className={styles.column}>
          {col1Projects.map((project) => {
            const index = selectedSlugs.indexOf(project.slug)
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                order={index}
              />
            )
          })}
        </div>
        <div className={styles.column}>
          {col2Projects.map((project) => {
            const index = selectedSlugs.indexOf(project.slug)
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                order={index}
              />
            )
          })}
        </div>
      </div>

      <div className={styles.moreRow}>
        <a
          href="https://github.com/hiroqt?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.more}
          aria-label="Explore more open source repositories on GitHub in a new tab"
        >
          <span>Explore more repositories on GitHub</span>
          <span aria-hidden="true">↗</span>
        </a>
        <p>5 impactful projects in AI, civic technology, developer tooling, and desktop productivity.</p>
      </div>
    </div>
  )
}

export default WorkShowcase
