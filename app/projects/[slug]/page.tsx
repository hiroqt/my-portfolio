import { projectsData } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import { ProjectDetailView } from './ProjectDetailView'

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailView project={project} />
}
