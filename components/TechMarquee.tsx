'use client'

import { motion } from 'framer-motion'
import {
  SiFlutter, SiNextdotjs, SiTypescript, SiReact, SiTailwindcss, SiNodedotjs, 
  SiMysql, SiFirebase, SiDart, SiSupabase, SiVercel, SiGit, SiFigma, SiTrello, 
  SiPhp, SiLaravel
} from 'react-icons/si'

const techStack = [
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'React', icon: <SiReact /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Flutter', icon: <SiFlutter /> },
  { name: 'Dart', icon: <SiDart /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'Firebase', icon: <SiFirebase /> },
  { name: 'Supabase', icon: <SiSupabase /> },
  { name: 'Vercel', icon: <SiVercel /> },
  { name: 'Git', icon: <SiGit /> },
  { name: 'Figma', icon: <SiFigma /> },
  { name: 'Trello', icon: <SiTrello /> },
  { name: 'PHP', icon: <SiPhp /> },
  { name: 'Laravel', icon: <SiLaravel /> },
]

export function TechMarquee() {
  return (
    <div className="w-[100vw] relative left-[calc(-50vw+50%)] overflow-hidden py-6 sm:py-8 my-8 border-y border-border/40 bg-muted/10">
      <div className="flex w-[250%] gap-4">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 30,
          }}
          className="flex flex-1 justify-around items-center"
        >
          {techStack.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group px-8">
              <span className="text-3xl sm:text-4xl group-hover:text-accent transition-colors">{tech.icon}</span>
              <span className="font-mono text-sm sm:text-base font-medium uppercase tracking-widest">{tech.name}</span>
            </div>
          ))}
          {/* Duplicate set for seamless scrolling */}
          {techStack.map((tech) => (
            <div key={`${tech.name}-dup`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group px-8">
              <span className="text-3xl sm:text-4xl group-hover:text-accent transition-colors">{tech.icon}</span>
              <span className="font-mono text-sm sm:text-base font-medium uppercase tracking-widest">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
