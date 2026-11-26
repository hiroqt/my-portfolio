import type { ProjectRow } from '@/components/sections/ProjectList'
import { projectsData, type ProjectData, type ProjectShowcase } from '@/lib/data/projects'

// Built on the server so the full project records stay out of client bundles.
// Only projects with a `showcase` entry are listed, in their showcase order.
export const projectRows: ProjectRow[] = projectsData
  .filter((project): project is ProjectData & { showcase: ProjectShowcase } => Boolean(project.showcase))
  .sort((a, b) => a.showcase.order - b.showcase.order)
  .map(project => ({
    slug: project.slug,
    title: project.featuredTitle ?? project.title.split(' (')[0],
    summary: project.featuredSummary ?? project.summary,
    category: project.showcase.category,
    image: project.image,
    focus: project.showcase.focus,
    badge: project.badge,
  }))
