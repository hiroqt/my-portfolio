'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

const topProjects = [
  {
    title: 'PaceMentor',
    summary: 'AI-powered running coach with adaptive training plans and Strava integration.',
    tag: 'AI RUNNING COACH',
    image: '/images/pcaementor.png',
    link: '#projects'
  },
  {
    title: 'e Buddy',
    summary: 'Unified government services platform using an agentic AI named e Buddy.',
    tag: 'HACKATHON ENTRY',
    image: '/images/egov.png',
    link: '#projects'
  },
  {
    title: 'Present Po',
    summary: 'Workforce attendance and time-tracking platform with scheduling and presence monitoring.',
    tag: 'B2B SOLUTION',
    image: '/images/presentpo.png',
    link: '#projects'
  },
]

export function HeroProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[380px] sm:h-[450px] mx-auto perspective-1000 mt-8 lg:mt-0 group/container">
      {topProjects.map((project, i) => {
        const isHovered = hoveredIndex === i;
        const isAnyHovered = hoveredIndex !== null;
        
        let yOffset = i * 16;
        let scale = 1 - i * 0.05;
        let zIndex = topProjects.length - i;
        let rotate = 0;
        let opacity = 1 - i * 0.15; // fade out background cards slightly

        if (isAnyHovered) {
          if (isHovered) {
            yOffset = -20;
            scale = 1.05;
            zIndex = 50;
            opacity = 1;
          } else {
            // Push other cards down
            yOffset = 60 + i * 20;
            scale = 1 - i * 0.05;
            rotate = i % 2 === 0 ? 3 : -3;
            opacity = 0.4;
          }
        }

        return (
          <motion.a
            href={project.link}
            key={project.title}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: opacity, 
              y: yOffset, 
              scale: scale,
              rotate: rotate,
              zIndex: zIndex
            }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className="absolute inset-0 bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer block"
            style={{ transformOrigin: 'top center' }}
          >
            <div>
              <div className="flex gap-2 mb-4 relative z-10">
                <span className="bg-foreground text-background text-[9px] font-mono px-2 py-1 rounded-full flex items-center gap-1">
                  ✦ {project.tag} ❯
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground relative z-10">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground relative z-10 line-clamp-2">
                {project.summary}
              </p>
            </div>
            
            <motion.img 
              src={project.image} 
              alt={project.title} 
              animate={{ 
                y: isHovered ? -20 : 0,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute left-1/2 -bottom-20 sm:-bottom-24 w-[90%] h-auto rounded-t-xl shadow-2xl transform -translate-x-1/2 z-0" 
            />
          </motion.a>
        )
      })}
      
      {/* View all text below stack */}
      <div className="absolute -bottom-10 left-0 w-full text-center opacity-0 group-hover/container:opacity-100 transition-opacity duration-300">
         <a href="#projects" className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
           View all projects <FaArrowRight />
         </a>
      </div>
    </div>
  )
}
