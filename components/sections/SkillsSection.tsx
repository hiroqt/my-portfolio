'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const stackGroups = [
  {
    category: 'Frontier AI & Agentic Loops',
    tags: [
      'Claude',
      'Gemini',
      'OpenAI / Codex',
      'DeepSeek',
      'Qwen',
      'Ollama',
      'Cursor Rules',
      'Agentic Loops',
      'LLM Orchestration',
      'RAG Architectures',
      'Vector Search & Grounding',
      'Prompt Optimization',
    ],
  },
  {
    category: 'Frontend & Mobile Engineering',
    tags: [
      'TypeScript',
      'Next.js 15 (App Router)',
      'React',
      'Vite',
      'ESLint',
      'Flutter',
      'Dart',
      'Vue.js',
      'Tailwind CSS',
      'Framer Motion',
      'HTML5 / Semantic Web',
    ],
  },
  {
    category: 'Backend & Database Architecture',
    tags: [
      'Node.js',
      'FastAPI',
      'Python',
      'NestJS',
      'Express.js',
      'Laravel & Livewire',
      'PHP',
      'JWT (JSON Web Tokens)',
      'OAuth 2.0',
      'PostgreSQL',
      'MySQL',
      'Supabase',
      'Firebase',
      'RESTful APIs',
      'GraphQL',
    ],
  },
  {
    category: 'Cloud, DevOps & Observability',
    tags: [
      'AWS Cloud',
      'AWS S3',
      'Terraform (IaC)',
      'Docker',
      'Grafana',
      'CI/CD Pipelines',
      'Amazon Quick Spaces & Flows',
      'Vercel',
      'Cloudflare',
      'Git & GitHub',
    ],
  },
]

export function SkillsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="skills" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">03</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Stack &amp; Arsenal
          </h2>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Technologies
        </span>
      </div>

      {/* ── Vertical Stacked Skill Categories with Title at Top ── */}
      <div className="rounded-2xl border border-border bg-muted/20 divide-y divide-border/60 overflow-hidden shadow-2xs">
        {stackGroups.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="p-5 sm:p-6 space-y-3 hover:bg-muted/30 transition-colors"
          >
            {/* Category Header at the TOP */}
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <h3 className="font-serif font-bold text-base text-foreground">
                {group.category}
              </h3>
              <span className="font-mono text-[11px] text-muted-foreground">
                {group.tags.length} Technologies &amp; Frameworks
              </span>
            </div>

            {/* Skills Badges Full-Width underneath */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {group.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-background border border-border/80 text-foreground font-mono text-xs hover:border-accent/40 hover:text-accent transition-colors shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
export default SkillsSection
