'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
import { useState, useEffect } from 'react'
import { 
  LaravelIcon, 
  MySQLIcon, 
  TailwindIcon, 
  AlpineJSIcon, 
  ViteIcon,
  GitHubIcon
} from '@/components/icons/TechIcons'
import { 
  QRCodeIcon, 
  PayrollIcon, 
  LeaveIcon, 
  RoleIcon,
  ComposerIcon,
  NPMIcon,
  ArtisanIcon,
  SpatieIcon,
  APIIcon,
  MobileIcon
} from '@/components/icons/MoreTechIcons'

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string; size?: number }> } = {
    'Laravel 12.x': LaravelIcon,
    'MySQL/SQLite': MySQLIcon,
    'Spatie Permissions': SpatieIcon,
    'RESTful APIs': APIIcon,
    'Tailwind CSS': TailwindIcon,
    'Alpine.js': AlpineJSIcon,
    'Vite': ViteIcon,
    'Mobile Responsive': MobileIcon,
    'QR Attendance': QRCodeIcon,
    'Payroll System': PayrollIcon,
    'Leave Management': LeaveIcon,
    'Role-based Access': RoleIcon,
    'Git/GitHub': GitHubIcon,
    'Composer': ComposerIcon,
    'NPM/Yarn': NPMIcon,
    'Laravel Artisan': ArtisanIcon
  }
  
  return iconMap[tech] || null
}

export function PowerStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const stackItems = [
    {
      title: "Backend Architecture",
      description: "Robust server-side solutions with modern PHP framework",
      technologies: ["Laravel 12.x", "MySQL/SQLite", "Spatie Permissions", "RESTful APIs"],
      color: "primary",
      gradient: "from-primary/20 to-primary-light/10"
    },
    {
      title: "Frontend Excellence",
      description: "Modern, responsive interfaces with utility-first CSS",
      technologies: ["Tailwind CSS", "Alpine.js", "Vite", "Mobile Responsive"],
      color: "secondary",
      gradient: "from-secondary/20 to-secondary-light/10"
    },
    {
      title: "Core Features",
      description: "Comprehensive HR management capabilities",
      technologies: ["QR Attendance", "Payroll System", "Leave Management", "Role-based Access"],
      color: "accent",
      gradient: "from-accent/20 to-accent-light/10"
    },
    {
      title: "Development Tools",
      description: "Professional development and deployment ecosystem",
      technologies: ["Git/GitHub", "Composer", "NPM/Yarn", "Laravel Artisan"],
      color: "neutral",
      gradient: "from-neutral/20 to-neutral-light/10"
    }
  ]

  const currentItem = stackItems[currentIndex]

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = stackItems.length - 1
      if (nextIndex >= stackItems.length) nextIndex = 0
      return nextIndex
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1)
      } else if (e.key === 'ArrowRight') {
        paginate(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  return (
    <ScrollReveal>
      <div className="relative px-4">
        {/* Stack Counter */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-white/40 text-sm font-mono">
            STACK {currentIndex + 1} / {stackItems.length}
          </span>
        </motion.div>

        {/* Main Stack Display */}
        <div className="relative perspective-1000 pb-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="w-full"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="glass-card rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 space-y-6 lg:space-y-8 group relative overflow-hidden max-w-4xl mx-auto"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentItem.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6 lg:mb-8">
                    <div className="space-y-2 lg:space-y-3 flex-1">
                      <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-${currentItem.color} group-hover:text-white transition-colors duration-300`}>
                        {currentItem.title}
                      </h3>
                      <p className="text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-300 pr-2">
                        {currentItem.description}
                      </p>
                    </div>
                    
                    {/* Animated icon */}
                    <motion.div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-${currentItem.color}/10 flex items-center justify-center flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-${currentItem.color} rounded-md lg:rounded-lg`} />
                    </motion.div>
                  </div>
                  
                  {/* Technologies grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    {currentItem.technologies.map((tech, techIndex) => {
                      const IconComponent = getTechIcon(tech)
                      return (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: techIndex * 0.1 
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.1)"
                          }}
                          className="glass-subtle rounded-lg lg:rounded-xl px-3 sm:px-4 py-3 lg:py-4 text-white/80 text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
                        >
                          {IconComponent && (
                            <IconComponent 
                              className="text-white/70 flex-shrink-0" 
                              size={16} 
                            />
                          )}
                          <span className="text-center break-words">{tech}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8">
          {/* Previous Button */}
          <motion.button
            onClick={() => paginate(-1)}
            className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Pagination Dots */}
          <div className="flex gap-1.5 sm:gap-2">
            {stackItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 sm:w-8 bg-white'
                    : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={() => paginate(1)}
            className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </ScrollReveal>
  )
}