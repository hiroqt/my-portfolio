'use client'

import { projectsData } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { HeroGraphicBackground } from '@/components/ui/HeroGraphicBackground'

export default function ProjectDetails({ params }: { params: { slug: string } }) {
  const project = projectsData.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Synchronized Dynamic Hero Graphic Header Banner */}
      <HeroGraphicBackground 
        variant="banner" 
        techStack={project.tags} 
        projectName={project.title}
        className="border-b border-slate-900/10 dark:border-white/10 mb-8 sm:mb-12"
      >
        <div className="max-w-screen-md mx-auto px-6 pt-6 sm:pt-8">
          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 flex items-center justify-between"
          >
            <Link href="/#projects" aria-label="Back to portfolio projects section" className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              Back to Portfolio
            </Link>
            <ThemeToggle variant="header" />
          </motion.div>

          {/* Header Section */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="pb-4 text-foreground"
          >
            <div className="flex gap-3 mb-6 flex-wrap">
              {project.type && (
                <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-border bg-muted text-accent backdrop-blur-md">
                  {project.type}
                </span>
              )}
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] sm:text-xs font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-muted/70 text-muted-foreground border border-border backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal mb-6 text-foreground leading-tight tracking-tight">
              {project.title}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed mb-8 max-w-prose">
              {project.summary}
            </p>
            
            {project.link !== '#' && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                aria-label={`View live site for ${project.title} (opens in new tab)`}
                className="inline-flex items-center gap-2 text-sm font-medium text-background bg-foreground px-7 py-3 rounded-full hover:scale-105 transition-all shadow-lg"
              >
                View Live Project <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
              </a>
            )}
          </motion.header>
        </div>
      </HeroGraphicBackground>

      <main className="max-w-screen-md mx-auto px-6 pb-16 sm:pb-24">

        {/* Hero Image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mb-16 sm:mb-24 rounded-3xl overflow-hidden shadow-2xl border border-border/50"
          >
            <img 
              src={project.image} 
              alt={`${project.title} project showcase screenshot`} 
              className="w-full h-auto object-contain max-h-[75vh] mx-auto bg-muted/20"
            />
          </motion.div>
        )}

        {/* Core Features */}
        {project.features && project.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="mb-16 sm:mb-24"
          >
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Core Features
            </h2>
            <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-serif text-lg text-foreground/90">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span aria-hidden className="text-accent mt-1.5 text-sm">•</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Content Sections (Research Aesthetic) */}
        {project.content && project.content.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="space-y-12 sm:space-y-16"
          >
            {project.content.map((section, idx) => (
              <section key={idx} className="relative">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  {String(idx + 1).padStart(2, '0')} — {section.title}
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-loose text-foreground/90">
                  <p className="text-lg sm:text-xl text-justify">
                    {section.content}
                  </p>
                </div>
              </section>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  )
}
