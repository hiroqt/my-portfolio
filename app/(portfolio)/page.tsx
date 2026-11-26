import { Profile } from '@/components/home/Profile'
import { Stats } from '@/components/home/Stats'
import { Recognition } from '@/components/home/Recognition'
import { Count, SectionHeading } from '@/components/home/Headings'
import { ExperienceList, experience } from '@/components/sections/ExperienceList'
import { ProjectList } from '@/components/sections/ProjectList'
import { SkillList, skills } from '@/components/sections/SkillList'
import { StackList, stackToolCount } from '@/components/sections/StackList'
import { projectRows } from '@/lib/portfolio/projectRows'
import styles from '@/components/PortfolioShell.module.css'

/** Overview: the profile through Languages & tools. The rest has its own page in the sidebar. */
export default function OverviewPage() {
  return (
    <>
      <Profile />
      <Stats projectCount={projectRows.length} />
      <Recognition />

      <section aria-labelledby="experience-title" className={styles.section}>
        <SectionHeading id="experience" title="Experience" meta={<Count value={experience.length} />} />
        <div data-reveal><ExperienceList /></div>
      </section>

      <section aria-labelledby="projects-title" className={styles.section}>
        <SectionHeading id="projects" title="Projects" meta={<Count value={projectRows.length} />} />
        <div data-reveal><ProjectList projects={projectRows} /></div>
      </section>

      <section aria-labelledby="built-skills-title" className={styles.section}>
        <SectionHeading id="built-skills" title="Skills I build" meta={<Count value={skills.length} />} />
        <div data-reveal><SkillList /></div>
      </section>

      <section aria-labelledby="stack-title" className={styles.section}>
        <SectionHeading id="stack" title="Languages & tools" meta={<Count value={stackToolCount} />} />
        <div data-reveal><StackList /></div>
      </section>
    </>
  )
}
