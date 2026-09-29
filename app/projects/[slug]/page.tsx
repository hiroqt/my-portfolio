import { projectsData } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import { ProjectDetailView } from './ProjectDetailView'

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailView project={project} />
}
