'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaRobot, FaExternalLinkAlt, FaGithub, FaBrain, FaUsers, FaGamepad, FaBolt, FaLayerGroup, FaCheckCircle } from 'react-icons/fa'
import { SectionHeading } from '@/components/ui/SectionHeading'

const pixelCrewPillars = [
  {
    icon: <FaBolt className="text-accent text-lg" aria-hidden="true" />,
    title: 'DAG Task Engine & Swarm Parallelism',
    desc: 'Directed Acyclic Graph (DAG) task engine orchestrating 23 specialized agent personas working in parallel swarm loops to compile complete Next.js App Router applications.',
  },
  {
    icon: <FaLayerGroup className="text-accent text-lg" aria-hidden="true" />,
    title: 'Anti-AI-Slop Frontend Engine',
    desc: 'Enforces strict 64-pattern anti-slop rules, eliminating generic purple gradient blobs, nested card loops, and placeholder copy via fluid clamp typography and bespoke layouts.',
  },
  {
    icon: <FaBrain className="text-accent text-lg" aria-hidden="true" />,
    title: 'AST Symbol-Graph Context Extraction',
    desc: 'Extracts syntax trees and repo symbol graphs, slashing prompt context token overhead by 60%+ while maximizing code generation accuracy.',
  },
  {
    icon: <FaGamepad className="text-accent text-lg" aria-hidden="true" />,
    title: 'Interactive Pixel-Art Office UI',
    desc: 'Retro gamified visual startup office dashboard streaming live subagent activities, tasks, and state transitions in real time across the IDE workspace.',
  },
]

const supportedPlatforms = [
  { name: 'Claude Plugin', path: '.claude-plugin / .claude/skills' },
  { name: 'Cursor IDE', path: '.cursor/skills/pixelcrew' },
  { name: 'Google Gemini & Antigravity', path: '.gemini/skills / .agents' },
  { name: 'OpenAI Codex', path: '.codex/skills/pixelcrew' },
  { name: 'xAI Grok', path: '.grok/skills/pixelcrew' },
  { name: 'Kiro & Hermes', path: '.kiro/skills / .hermes/skills' },
  { name: 'OpenCode & Pi', path: '.opencode/skills / .pi/skills' },
]

export function PixelCrewSection() {
  const reduce = useReducedMotion()

  return (
    <section id="pixelcrew" className="relative z-10 pt-12 scroll-mt-20">
      <SectionHeading
        id="04"
        badge="FLAGSHIP OPEN-SOURCE AI"
        title={<>Featured Architecture — <span className="italic font-light text-accent">Pixel Crew</span></>}
        subtitle="Autonomous multi-agent software engineering swarm and interactive pixel-art startup office simulating 23 specialized agent roles."
        accent="projects"
        action={
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/hiroqt/PixelCrew"
              target="_blank"
              rel="noreferrer"
              aria-label="View Pixel Crew repository on GitHub (opens in new tab)"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-white transition-all shadow-sm group"
            >
              <FaGithub className="text-sm" aria-hidden="true" />
              <span>GitHub Repository</span>
              <FaExternalLinkAlt className="text-[10px] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </a>
          </div>
        }
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl border border-border/70 bg-muted/40 p-6 sm:p-10 hover:border-accent/40 backdrop-blur-xs transition-all duration-300 shadow-sm overflow-hidden group"
      >
        <div className="relative z-10">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/40">
            <div className="flex items-center gap-3.5">
              <span className="p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                <FaRobot className="text-2xl" aria-hidden="true" />
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-bold block">
                  Autonomous Multi-Agent Swarm Framework
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                  Pixel Crew (PixelAgents)
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider px-3.5 py-1 rounded-full bg-background border border-border text-foreground font-semibold">
                Open Source &bull; TypeScript &bull; Next.js App Router
              </span>
              <span className="text-xs font-mono uppercase tracking-wider px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold">
                23 Agent Personas
              </span>
              <span className="text-xs font-mono uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold">
                DAG Swarm Engine
              </span>
            </div>
          </div>

          {/* Screenshot Showcase Frame (Centered Image) */}
          <div className="mt-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 bg-background/90 shadow-lg group/img">
            <div className="px-4 py-3 bg-muted/80 border-b border-border/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-foreground font-semibold truncate">https://github.com/hiroqt/PixelCrew</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold hidden sm:inline">
                Interactive Multi-Agent Office
              </span>
            </div>
            <div className="relative aspect-[16/9] sm:aspect-[1.93/1] w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/images/pixelcrew.png"
                alt="PixelCrew Autonomous Multi-Agent Swarm and Retro Pixel-Art Startup Office UI"
                className="w-full h-full object-cover object-center group-hover/img:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Technical Overview Description */}
          <div className="mt-8 space-y-4 max-w-5xl">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-bold">
              Technical Architecture &amp; System Overview
            </h4>
            <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
              <strong>PixelCrew</strong> is an autonomous software synthesis framework designed to compile natural language instructions into full production Next.js App Router applications. The system leverages a <strong>Directed Acyclic Graph (DAG) task engine</strong> to orchestrate specialized agent personas working in swarm patterns and parallel execution loops, compiling structural specifications, design systems, API route handlers, and automated test coverage.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The framework enforces strict design principles, preventing common automated template structures (such as repeating card grids and placeholder copy) by utilizing mathematical fluid clamp typography scales, asymmetric grid layouts, the 64-pattern Impeccable slop catalog, and formal API error specifications.
            </p>
          </div>

          {/* 4 Core Architectural Pillars Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
            {pixelCrewPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-background/80 border border-border/70 flex flex-col justify-between hover:border-accent/40 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-xl bg-muted border border-border/60">
                    {pillar.icon}
                  </span>
                  <h4 className="font-serif font-semibold text-base text-foreground">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-1">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Supported IDEs & Coding Agents Ecosystem */}
          <div className="mt-8 pt-6 border-t border-border/40">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground font-bold">
                Supported IDEs &amp; Agent Ecosystem
              </h4>
              <a
                href="https://github.com/hiroqt/PixelCrew"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-accent hover:underline flex items-center gap-1.5"
              >
                <span>View Full Skill Catalog</span>
                <FaExternalLinkAlt className="text-[9px]" />
              </a>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {supportedPlatforms.map((plat) => (
                <div
                  key={plat.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-background border border-border/80 text-xs font-mono text-foreground shadow-2xs"
                >
                  <FaCheckCircle className="text-accent text-[10px]" aria-hidden="true" />
                  <span className="font-semibold">{plat.name}</span>
                  <span className="text-[10px] text-muted-foreground">({plat.path})</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
export default PixelCrewSection
