'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '../animation/ScrollReveal'
import { ReactIcon, LaravelIcon, MySQLIcon, GitHubIcon, FigmaIcon } from '../icons/TechIcons'
import { CodeIcon, DatabaseIcon, APIIcon, AIIcon, SecurityIcon, PerformanceIcon, DesignIcon, ArchitectureIcon } from '../icons/MoreTechIcons'

export function SummarySection() {
  const stats = [
    { number: "40%", label: "Reduction in Manual Processing" },
    { number: "2+", label: "Years of Development Experience" },
    { number: "100%", label: "Project Success Rate" },
    { number: "24/7", label: "System Reliability" }
  ]

  const competencies = [
    { skill: "Full-Stack Development", icon: CodeIcon },
    { skill: "AI-Augmented Engineering", icon: AIIcon },
    { skill: "PHP Laravel", icon: LaravelIcon },
    { skill: "React/Next.js", icon: ReactIcon },
    { skill: "MySQL Architecture", icon: MySQLIcon },
    { skill: "Supabase Integration", icon: DatabaseIcon },
    { skill: "OpenAI APIs", icon: AIIcon },
    { skill: "Groq LLM", icon: AIIcon },
    { skill: "LangChain", icon: APIIcon },
    { skill: "GitHub Copilot", icon: GitHubIcon },
    { skill: "Cursor IDE", icon: CodeIcon },
    { skill: "System Architecture", icon: ArchitectureIcon },
    { skill: "UI/UX Design", icon: DesignIcon },
    { skill: "Figma Prototyping", icon: FigmaIcon },
    { skill: "Database Optimization", icon: DatabaseIcon },
    { skill: "API Development", icon: APIIcon },
    { skill: "Security Implementation", icon: SecurityIcon },
    { skill: "Performance Tuning", icon: PerformanceIcon }
  ]

  return (
    <section className="section-padding relative">
      <div className="container-spacing px-4">
        <ScrollReveal>
          <div className="text-center space-y-6 lg:space-y-element-gap">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-heading-lg font-bold text-white mb-6 lg:mb-element-gap px-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="block sm:inline">Full-Stack Developer</span>
              <span className="block sm:inline"> & </span>
              <span className="block sm:inline">AI-Augmented Engineer</span>
            </motion.h2>
            
            <motion.div
              className="max-w-4xl mx-auto space-y-4 lg:space-y-6 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed space-y-3 lg:space-y-4">
                <p>
                  I am a Full-Stack Developer and "vibe coder" specializing in building scalable web systems 
                  through a fusion of deep technical logic and advanced AI orchestration. By leveraging tools 
                  like Cursor, GitHub Copilot, and LLMs, I rapidly architect high-performance applications in 
                  PHP Laravel 12, React.js, and Next.js.
                </p>
                
                <p>
                  I don't just write code; I engineer solutions that move the needle—recently delivering a 
                  real-world system that achieved a 40% reduction in manual data processing. Whether I am 
                  designing interactive prototypes in Figma or optimizing complex MySQL architectures, my 
                  focus is on speed, security, and seamless user experiences.
                </p>
                
                <p className="text-white/70 font-medium text-sm sm:text-base">
                  <span className="text-primary">Tech Stack:</span> PHP Laravel, React/Next.js, MySQL, Supabase, 
                  and AI Integration (OpenAI, Groq, LangChain).
                </p>
              </div>
            </motion.div>
            
            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-8 lg:mt-element-gap px-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 text-center space-y-1 lg:space-y-2 group hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-xs sm:text-sm font-medium leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Core Competencies - Horizontal Scrolling */}
            <motion.div
              className="mt-8 lg:mt-element-gap px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 lg:mb-6">Core Competencies</h3>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
        
      {/* Full viewport width scrolling competencies - breaks out of all containers */}
      <motion.div
        className="relative overflow-hidden w-screen -mx-[50vw] left-1/2 right-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* First scrolling row */}
        <div className="flex animate-scroll-left whitespace-nowrap mb-3 lg:mb-4">
          {[...competencies, ...competencies].map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={`row1-${index}`}
                className="glass-subtle rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 mx-1 sm:mx-1.5 lg:mx-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 flex-shrink-0 flex items-center gap-2 lg:gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <IconComponent className="text-white/70" size={14} />
                <span className="whitespace-nowrap">{item.skill}</span>
              </motion.div>
            )
          })}
        </div>
        
        {/* Second scrolling row (reverse direction) */}
        <div className="flex animate-scroll-right whitespace-nowrap">
          {[...competencies.slice().reverse(), ...competencies.slice().reverse()].map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={`row2-${index}`}
                className="glass-subtle rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 mx-1 sm:mx-1.5 lg:mx-2 text-xs sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 flex-shrink-0 flex items-center gap-2 lg:gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <IconComponent className="text-white/70" size={14} />
                <span className="whitespace-nowrap">{item.skill}</span>
              </motion.div>
            )
          })}
        </div>
        
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </motion.div>
    </section>
  )
}