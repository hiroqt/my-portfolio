'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaRobot,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaCogs,
  FaShieldAlt,
  FaTachometerAlt,
  FaCube,
} from 'react-icons/fa'

const agentRoles = [
  { name: 'Creative Director', desc: 'Aesthetic Direction & Brand Concept', icon: <FaCube className="text-accent" /> },
  { name: 'UX Planner', desc: 'Information Architecture & Wireframes', icon: <FaCode className="text-accent" /> },
  { name: 'Frontend Engineer', desc: 'React 19, Next.js App Router, Tailwind', icon: <FaCode className="text-accent" /> },
  { name: 'Backend Engineer', desc: 'REST, GraphQL, WebSocket & Distributed APIs', icon: <FaCogs className="text-accent" /> },
  { name: 'Performance SRE', desc: 'CWV, Sub-second TTFB, k6 Load Testing', icon: <FaTachometerAlt className="text-accent" /> },
  { name: 'Security Sentinel', desc: 'Auth, RLS Policies, Token Sanitization', icon: <FaShieldAlt className="text-accent" /> },
]

export function PixelCrewSection() {
  const reduce = useReducedMotion()

  return (
    <section id="pixelcrew" className="py-12 scroll-mt-20">
      {/* ── Section Header ── */}
      <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-accent font-bold">06</span>
          <span className="text-muted-foreground font-mono text-xs">—</span>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Flagship Swarm Architecture
          </h2>
        </div>
        <a
          href="https://github.com/hiroqt/PixelCrew"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub Repo ↗
        </a>
      </div>

      {/* ── Main Technical Card ── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-7 hover:bg-muted/40 transition-colors shadow-xs"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-foreground text-background font-semibold">
            <FaRobot className="text-xs" />
            <span>23-Agent Swarm</span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
            Cross-IDE Engine
          </span>
        </div>

        <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
          Pixel Crew (PixelAgents)
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Autonomous multi-agent software engineering swarm and interactive pixel-art startup office visualizer. Runs 23 specialized agent roles in parallel DAG dependency graphs across Cursor, Kiro, and modern AI IDEs.
        </p>

        {/* Screenshot Showcase Frame */}
        <div className="mt-5 rounded-xl overflow-hidden border border-border bg-background shadow-xs">
          <img
            src="/images/pixelcrew.png"
            alt="Pixel Crew Multi-Agent Architecture"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* 6 Core Agent Personas Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {agentRoles.map((role) => (
            <div
              key={role.name}
              className="flex items-start gap-2.5 p-3 rounded-lg border border-border/70 bg-background shadow-2xs"
            >
              <span className="mt-0.5 shrink-0 text-xs p-1 rounded bg-muted">
                {role.icon}
              </span>
              <div>
                <div className="font-serif font-bold text-xs text-foreground">
                  {role.name}
                </div>
                <div className="text-[10.5px] font-mono text-muted-foreground leading-tight mt-0.5">
                  {role.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link Footer */}
        <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {['Swarm DAG', 'Cursor Rules', 'Kiro MCP', 'Next.js 15'].map((t) => (
              <span
                key={t}
                className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-background border border-border text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/hiroqt/PixelCrew"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline"
          >
            <span>Explore Pixel Crew on GitHub</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
export default PixelCrewSection
