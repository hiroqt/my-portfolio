'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaBrain, FaSyncAlt, FaPlug, FaRobot, FaNetworkWired, FaRocket, FaTerminal, FaCode } from 'react-icons/fa'
import { MdCloud } from 'react-icons/md'
import {
  SiFlutter, SiNextdotjs, SiLaravel, SiPhp, SiMysql, SiTypescript, SiSupabase,
  SiReact, SiVuedotjs, SiTailwindcss, SiNodedotjs, SiFirebase, SiVercel, SiGit,
  SiFigma, SiTrello, SiDart, SiPostgresql, SiLivewire, SiNestjs, SiExpress,
  SiHtml5, SiSlack, SiOpenai, SiGoogle, SiAnthropic
} from 'react-icons/si'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionCardWatermark } from '@/components/ui/SectionCardWatermark'

const techIcons: Record<string, React.ReactNode> = {
  // AI & Context Engineering
  "Context Engineering": <FaBrain aria-hidden="true" />,
  "Agentic Loops": <FaSyncAlt aria-hidden="true" />,
  "API Integration": <FaPlug aria-hidden="true" />,
  "LLM Orchestration": <FaRobot aria-hidden="true" />,
  "RAG Architectures": <FaNetworkWired aria-hidden="true" />,
  "Vector Search & Grounding": <FaBrain aria-hidden="true" />,
  "Prompt Engineering": <FaRocket aria-hidden="true" />,

  // AI Models & Agentic IDEs
  "Claude": <SiAnthropic aria-hidden="true" />,
  "Gemini": <SiGoogle aria-hidden="true" />,
  "OpenAI / Codex": <SiOpenai aria-hidden="true" />,
  "DeepSeek": <FaBrain aria-hidden="true" />,
  "Qwen": <FaBrain aria-hidden="true" />,
  "GLM": <FaBrain aria-hidden="true" />,
  "Antigravity": <FaRocket aria-hidden="true" />,
  "Cursor": <FaTerminal aria-hidden="true" />,
  "Kiro": <FaCode aria-hidden="true" />,

  // Frontend & Mobile
  "TypeScript (Full-Stack)": <SiTypescript aria-hidden="true" />,
  "TypeScript": <SiTypescript aria-hidden="true" />,
  "Next.js": <SiNextdotjs aria-hidden="true" />,
  "React": <SiReact aria-hidden="true" />,
  "Vue.js": <SiVuedotjs aria-hidden="true" />,
  "HTML5 / Semantic Web": <SiHtml5 aria-hidden="true" />,
  "HTML": <SiHtml5 aria-hidden="true" />,
  "Tailwind CSS": <SiTailwindcss aria-hidden="true" />,
  "Flutter": <SiFlutter aria-hidden="true" />,
  "Dart": <SiDart aria-hidden="true" />,

  // Backend, APIs & Databases
  "NestJS": <SiNestjs aria-hidden="true" />,
  "Express.js": <SiExpress aria-hidden="true" />,
  "RESTful APIs": <FaPlug aria-hidden="true" />,
  "Node.js": <SiNodedotjs aria-hidden="true" />,
  "Laravel": <SiLaravel aria-hidden="true" />,
  "Livewire": <SiLivewire aria-hidden="true" />,
  "PHP": <SiPhp aria-hidden="true" />,
  "PostgreSQL": <SiPostgresql aria-hidden="true" />,
  "MySQL": <SiMysql aria-hidden="true" />,
  "Supabase": <SiSupabase aria-hidden="true" />,
  "Firebase": <SiFirebase aria-hidden="true" />,

  // Cloud, Tooling & Integrations
  "AWS Cloud": <MdCloud aria-hidden="true" />,
  "Vercel": <SiVercel aria-hidden="true" />,
  "Git & GitHub": <SiGit aria-hidden="true" />,
  "Slack API": <SiSlack aria-hidden="true" />,
  "Figma": <SiFigma aria-hidden="true" />,
  "Trello": <SiTrello aria-hidden="true" />
}

const experienceStats = [
  { value: '2+', label: 'Years Experience', sub: 'Production & Consulting (2025–Present)' },
  { value: '15+', label: 'Projects Built', sub: 'Client Deployments & Live Apps' },
  { value: '11+', label: 'Certifications', sub: 'IBM AI & AWS Cloud Topics' },
  { value: '480+', label: 'Internship Hours', sub: 'Hospital System & IT Ops' },
]

const skillCategories = [
  {
    category: 'AI Models & Agentic Toolchains',
    description: 'Frontier LLM foundation models, agentic reasoning architectures, and next-generation AI-assisted developer environments.',
    skills: [
      'Claude',
      'Gemini',
      'OpenAI / Codex',
      'DeepSeek',
      'Qwen',
      'GLM',
      'Antigravity',
      'Cursor',
      'Kiro',
    ]
  },
  {
    category: 'AI & Context Engineering',
    description: 'Autonomous decision loops, tool-calling pipelines, structured output enforcement, and zero-hallucination RAG retrieval architectures.',
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
    category: 'Frontend & Mobile Engineering',
    description: 'High-performance reactive interfaces, TypeScript type safety, semantic HTML, and cross-platform native apps.',
    skills: [
      'TypeScript',
      'Next.js',
      'React',
      'Vue.js',
      'HTML5 / Semantic Web',
      'Tailwind CSS',
      'Flutter',
      'Dart',
    ]
  },
  {
    category: 'Backend, APIs & Databases',
    description: 'Scalable NestJS and Express services, RESTful API design, relational data modeling, and enterprise MVC frameworks.',
    skills: [
      'NestJS',
      'Express.js',
      'RESTful APIs',
      'Node.js',
      'Laravel',
      'Livewire',
      'PHP',
      'PostgreSQL',
      'MySQL',
      'Supabase',
      'Firebase',
    ]
  },
  {
    category: 'Cloud, Integrations & Tooling',
    description: 'Continuous deployment, cloud compute, Slack workflow integrations, and collaborative product design.',
    skills: [
      'AWS Cloud',
      'Vercel',
      'Git & GitHub',
      'Slack API',
      'Figma',
      'Trello',
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
        subtitle="Verifiable technical skills mapped by practical production experience and active deployment track record. Zero estimated percentages."
        accent="skills"
      />

      {/* Experience & Velocity Spotlight Bar */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 sm:mb-12 p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border/70 backdrop-blur-xs relative overflow-hidden shadow-xs"
      >
        <SectionCardWatermark variant="skills" className="right-4 bottom-4" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <span>Hands-On Track Record</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-foreground">
                2+ Years of <span className="italic font-light text-accent">Active Software Engineering</span>
              </h3>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Active full-stack development, client consulting, and context engineering (2025 – Present) specializing in zero-hallucination agentic systems, enterprise operations, and civic platforms.
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6">
            {experienceStats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-2xl bg-background/80 border border-border/60 flex flex-col justify-between hover:border-accent/40 transition-all shadow-xs">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-foreground tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-2">
                  <div className="text-xs sm:text-sm font-semibold text-foreground">{stat.label}</div>
                  <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Categorized Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`p-6 sm:p-8 rounded-3xl border border-border/70 bg-muted/30 backdrop-blur-xs relative overflow-hidden flex flex-col justify-between hover:border-accent/50 transition-colors shadow-xs ${
              idx === skillCategories.length - 1 && skillCategories.length % 2 !== 0 ? 'md:col-span-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-foreground">
                  {category.category}
                </h3>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                {category.description}
              </p>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
              {category.skills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-foreground text-xs sm:text-sm font-mono hover:border-accent hover:text-accent transition-colors shadow-2xs"
                >
                  <span className="text-muted-foreground text-sm shrink-0">
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
