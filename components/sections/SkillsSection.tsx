'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaBrain, FaSyncAlt, FaPlug, FaRobot, FaNetworkWired, FaRocket, FaTerminal, FaCode,
  FaAward, FaCalendarCheck, FaClock, FaServer, FaCogs, FaTrello
} from 'react-icons/fa'
import { MdCloud } from 'react-icons/md'
import {
  SiFlutter, SiNextdotjs, SiLaravel, SiPhp, SiMysql, SiTypescript, SiSupabase,
  SiReact, SiVuedotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiVercel, SiGit,
  SiFigma, SiDart, SiPostgresql, SiLivewire, SiNestjs, SiExpress,
  SiHtml5, SiSlack, SiOpenai, SiGoogle, SiAnthropic, SiDocker, SiCloudflare, SiGithubactions,
  SiTerraform
} from 'react-icons/si'
import { SectionHeading } from '@/components/ui/SectionHeading'

// Monochrome / Neutral Tech Icons (No colored fonts)
const techIcons: Record<string, React.ReactNode> = {
  // AI Models & Agentic IDEs
  "Claude": <SiAnthropic aria-hidden="true" />,
  "Gemini": <SiGoogle aria-hidden="true" />,
  "OpenAI / Codex": <SiOpenai aria-hidden="true" />,
  "DeepSeek": <FaBrain aria-hidden="true" />,
  "Qwen": <FaBrain aria-hidden="true" />,
  "GLM": <FaBrain aria-hidden="true" />,
  "Ollama": <FaRobot aria-hidden="true" />,
  "Antigravity": <FaRocket aria-hidden="true" />,
  "Cursor": <FaTerminal aria-hidden="true" />,
  "Kiro": <FaCode aria-hidden="true" />,
  "OpenCode": <FaTerminal aria-hidden="true" />,

  // AI & Context Engineering
  "Context Engineering": <FaBrain aria-hidden="true" />,
  "Agentic Loops": <FaSyncAlt aria-hidden="true" />,
  "API Integration": <FaPlug aria-hidden="true" />,
  "LLM Orchestration": <FaRobot aria-hidden="true" />,
  "RAG Architectures": <FaNetworkWired aria-hidden="true" />,
  "Vector Search & Grounding": <FaBrain aria-hidden="true" />,
  "Prompt Engineering": <FaRocket aria-hidden="true" />,

  // Frontend & Mobile
  "TypeScript": <SiTypescript aria-hidden="true" />,
  "Next.js": <SiNextdotjs aria-hidden="true" />,
  "React": <SiReact aria-hidden="true" />,
  "Vue.js": <SiVuedotjs aria-hidden="true" />,
  "Flutter": <SiFlutter aria-hidden="true" />,
  "Dart": <SiDart aria-hidden="true" />,
  "Tailwind CSS": <SiTailwindcss aria-hidden="true" />,
  "HTML5 / Semantic Web": <SiHtml5 aria-hidden="true" />,

  // Backend & Databases
  "NestJS": <SiNestjs aria-hidden="true" />,
  "Express.js": <SiExpress aria-hidden="true" />,
  "Node.js": <SiNodedotjs aria-hidden="true" />,
  "Laravel": <SiLaravel aria-hidden="true" />,
  "Livewire": <SiLivewire aria-hidden="true" />,
  "PHP": <SiPhp aria-hidden="true" />,
  "PostgreSQL": <SiPostgresql aria-hidden="true" />,
  "MySQL": <SiMysql aria-hidden="true" />,
  "Supabase": <SiSupabase aria-hidden="true" />,
  "Firebase": <SiFirebase aria-hidden="true" />,
  "RESTful APIs": <FaPlug aria-hidden="true" />,

  // Cloud & Tooling
  "Docker": <SiDocker aria-hidden="true" />,
  "Terraform": <SiTerraform aria-hidden="true" />,
  "CI/CD Pipelines": <SiGithubactions aria-hidden="true" />,
  "AWS Cloud": <MdCloud aria-hidden="true" />,
  "Vercel": <SiVercel aria-hidden="true" />,
  "Hostinger": <FaServer aria-hidden="true" />,
  "Cloudflare": <SiCloudflare aria-hidden="true" />,
  "Git & GitHub": <SiGit aria-hidden="true" />,
  "Slack": <SiSlack aria-hidden="true" />,
  "Trello": <FaTrello aria-hidden="true" />,
  "Figma": <SiFigma aria-hidden="true" />,
}

const experienceStats = [
  { icon: <FaCalendarCheck className="text-foreground text-sm" />, value: '2+ Years', label: 'Active Engineering', sub: 'Production & Consulting' },
  { icon: <FaRocket className="text-foreground text-sm" />, value: '15+', label: 'Projects Shipped', sub: 'Live Deployments & Apps' },
  { icon: <FaAward className="text-foreground text-sm" />, value: '11+', label: 'Verified Badges', sub: 'IBM AI & AWS Cloud' },
  { icon: <FaClock className="text-foreground text-sm" />, value: '486 Hrs', label: 'Internship IT Ops', sub: 'Hospital System & Triage' },
]

const skillCategories = [
  {
    category: 'AI Models & Agentic IDEs',
    badge: 'Frontier AI',
    skills: [
      'Claude',
      'Gemini',
      'OpenAI / Codex',
      'DeepSeek',
      'Qwen',
      'GLM',
      'Ollama',
      'Antigravity',
      'Cursor',
      'Kiro',
      'OpenCode',
    ]
  },
  {
    category: 'AI & Context Engineering',
    badge: 'Context Architecture',
    skills: [
      'Context Engineering',
      'Agentic Loops',
      'LLM Orchestration',
      'RAG Architectures',
      'Vector Search & Grounding',
      'Prompt Engineering',
      'API Integration',
    ]
  },
  {
    category: 'Frontend & Cross-Platform Mobile',
    badge: 'UI & Native Apps',
    skills: [
      'TypeScript',
      'Next.js',
      'React',
      'Vue.js',
      'Flutter',
      'Dart',
      'Tailwind CSS',
      'HTML5 / Semantic Web',
    ]
  },
  {
    category: 'Backend & Database Engineering',
    badge: 'Services & Data',
    skills: [
      'NestJS',
      'Express.js',
      'Node.js',
      'Laravel',
      'Livewire',
      'PHP',
      'PostgreSQL',
      'MySQL',
      'Supabase',
      'Firebase',
      'RESTful APIs',
    ]
  },
  {
    category: 'Cloud, Infrastructure & Tooling',
    badge: 'Infra & Workflows',
    skills: [
      'AWS Cloud',
      'Terraform',
      'Docker',
      'CI/CD Pipelines',
      'Vercel',
      'Hostinger',
      'Cloudflare',
      'Git & GitHub',
      'Slack',
      'Trello',
      'Figma',
    ]
  }
]

export function SkillsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="skills" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="01"
        badge="TECHNICAL ARSENAL"
        title={<>Core Competencies &amp; <span className="italic font-light text-accent">Tech Stack</span></>}
        subtitle="Verifiable technical skills mapped by practical production experience and active deployment track record."
        accent="skills"
      />

      {/* 4 Clean Metric Stat Highlights (Clean & Card-less) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 pb-8 border-b border-border/40"
      >
        {experienceStats.map((stat, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="p-2 rounded-lg bg-muted text-foreground shrink-0 mt-0.5">
              {stat.icon}
            </span>
            <div>
              <div className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-foreground">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Clean Grouped Skills (Card-less & Container-less Layout) */}
      <div className="space-y-10">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="pb-8 border-b border-border/30 last:border-0 last:pb-0"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                {category.category}
              </h3>
              <span className="text-xs text-muted-foreground font-medium">
                &bull; {category.badge}
              </span>
            </div>

            {/* Clean Skill Items without card containers (Hero font-sans font-medium text) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-foreground hover:text-accent transition-colors"
                >
                  <span className="text-base shrink-0 opacity-80 text-foreground">
                    {techIcons[skill] || <FaCode aria-hidden="true" />}
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export default SkillsSection
