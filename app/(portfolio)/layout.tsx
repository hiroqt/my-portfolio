import type { ReactNode } from 'react'
import { PortfolioShell } from '@/components/PortfolioShell'
import { experience } from '@/components/sections/ExperienceList'
import { credentials } from '@/components/sections/CertificationList'
import { skills } from '@/components/sections/SkillList'
import { stackToolCount } from '@/components/sections/StackList'
import { services } from '@/components/sections/ServiceList'
import { projectRows } from '@/lib/portfolio/projectRows'
import { blogPosts } from '@/lib/data/blog'

/** The sidebar stays in place while its pages swap in the content column. */
export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <PortfolioShell
      counts={{
        experience: experience.length,
        projects: projectRows.length,
        skills: skills.length,
        stack: stackToolCount,
        certifications: credentials.length,
        services: services.length,
        posts: blogPosts.length,
      }}
    >
      {children}
    </PortfolioShell>
  )
}
