'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  LaravelIcon, 
  MySQLIcon, 
  TailwindIcon, 
  AlpineJSIcon, 
  ViteIcon, 
  NextJSIcon, 
  GroqIcon, 
  SupabaseIcon, 
  FramerMotionIcon 
} from '@/components/icons/TechIcons'
import { SQLiteIcon, MobileIcon } from '@/components/icons/MoreTechIcons'

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string; size?: number }> } = {
    'Laravel 11.x': LaravelIcon,
    'MySQL/SQLite': MySQLIcon,
    'Tailwind CSS': TailwindIcon,
    'Alpine.js': AlpineJSIcon,
    'Vite': ViteIcon,
    'Next.js': NextJSIcon,
    'Groq LLM': GroqIcon,
    'Supabase': SupabaseIcon,
    'Real-time Chat': SupabaseIcon,
    'Framer Motion': FramerMotionIcon,
    'Mobile Responsive': MobileIcon
  }
  
  return iconMap[tech] || null
}

export function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const projects = [
    {
      title: "HRIS Management System",
      description: "Comprehensive Human Resource Information System with QR code attendance, automated payroll, and complete employee lifecycle management",
      technologies: ["Laravel 11.x", "MySQL/SQLite", "Tailwind CSS", "Alpine.js", "Vite"],
      highlights: [
        "QR Code dual scanner attendance system",
        "Automated payroll calculations with breakdowns", 
        "Role-based access control with Spatie",
        "Mobile-responsive design for all devices"
      ],
      color: "primary",
      gradient: "from-primary/30 via-primary/20 to-transparent",
      url: "https://vcm-cavite.online",
      images: {
        desktop: "/images/vcm_desktop.png",
        mobile: "/images/vcm_mobile.png"
      }
    },
    {
      title: "Elite Fitness - Gym Management System",
      description: "Modern full-stack fitness platform with real-time booking and membership management",
      technologies: ["Next.js", "Supabase", "Tailwind CSS", "Framer Motion"],
      highlights: [
        "Real-time class booking with live availability",
        "Multi-role authentication (Member, Coach, Admin)",
        "Personal trainer marketplace with scheduling",
        "Interactive dashboard with live statistics",
        "Membership tier management (Basic, Premium, Elite)",
        "Email verification with magic link authentication",
        "Responsive full-screen UI with mobile optimization"
      ],
      color: "secondary",
      gradient: "from-secondary/30 via-secondary/20 to-transparent",
      images: {
        desktop: "/images/gym_desktop.png",
        mobile: "/images/gym_mobile.png"
      }
    },
    {
      title: "AI Habit Tracker",
      description: "Gamified habit tracking with AI-driven suggestions and real-time community features",
      technologies: ["Next.js", "Groq LLM", "Supabase", "Real-time Chat"],
      highlights: [
        "AI-powered habit recommendations",
        "Real-time community interactions", 
        "Gamification mechanics",
        "Progress analytics dashboard"
      ],
      color: "accent",
      gradient: "from-accent/30 via-accent/20 to-transparent",
      images: {
        desktop: "/images/habit_desktop.png",
        mobile: "/images/habit_mobile.png"
      }
    }
  ]

  const currentProject = projects[currentIndex]

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = projects.length - 1
      if (nextIndex >= projects.length) nextIndex = 0
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
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  }

  return (
    <ScrollReveal>
      <div className="relative">
        {/* Project Counter */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-white/40 text-sm font-mono">
            PROJECT {currentIndex + 1} / {projects.length}
          </span>
        </motion.div>

        {/* Main Project Display */}
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
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 }
              }}
              className="w-full"
            >
              <ProjectCard project={currentProject} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 lg:mt-12">
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
            {projects.map((_, index) => (
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

        {/* Keyboard Hint */}
        <motion.div
          className="hidden sm:block text-center mt-6 text-white/30 text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Use arrow keys to navigate
        </motion.div>
      </div>
    </ScrollReveal>
  )
}

function ProjectCard({ project }: { project: any }) {
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass-premium rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 group relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">
        {/* Project Info */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-${project.color} rounded-full animate-pulse`} />
                <span className="text-white/60 text-xs sm:text-sm font-medium tracking-wider uppercase">
                  Featured Project
                </span>
              </div>
              {project.url && (
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-light text-xs font-medium transition-colors duration-300 sm:ml-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  View Live →
                </motion.a>
              )}
            </motion.div>
            
            <motion.h3 
              className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-${project.color} group-hover:text-white transition-colors duration-500 leading-tight`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {project.title}
            </motion.h3>
          </div>
          
          <motion.div 
            className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {project.description}
          </motion.div>
          
          {/* Key Features */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <motion.h4 
              className="text-white font-semibold text-sm sm:text-base lg:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Key Features
            </motion.h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3">
              {project.highlights.slice(0, 4).map((highlight: string, idx: number) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-2 group/item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                >
                  <motion.div 
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${project.color} rounded-full group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0`}
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-white/70 text-xs sm:text-sm group-hover/item:text-white/90 transition-colors duration-300">
                    {highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Technologies */}
          <motion.div 
            className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {project.technologies.map((tech: string, idx: number) => {
              const IconComponent = getTechIcon(tech)
              return (
                <motion.span 
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`glass-subtle rounded-full px-2 sm:px-3 lg:px-4 xl:px-6 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm font-medium text-${project.color} border border-${project.color}/20 hover:border-${project.color}/40 transition-all duration-300 flex items-center gap-1 sm:gap-2`}
                >
                  {IconComponent && (
                    <IconComponent 
                      className={`text-${project.color}`} 
                      size={10} 
                    />
                  )}
                  <span className="whitespace-nowrap">{tech}</span>
                </motion.span>
              )
            })}
          </motion.div>
        </div>
        
        {/* Project Visual with Tabs */}
        <motion.div 
          className="relative order-first xl:order-last"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="space-y-3 sm:space-y-4">
            {/* Tab Buttons */}
            <div className="flex gap-2 justify-center">
              <motion.button
                onClick={() => setActiveView('desktop')}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeView === 'desktop'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Desktop
              </motion.button>
              <motion.button
                onClick={() => setActiveView('mobile')}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeView === 'mobile'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mobile
              </motion.button>
            </div>

            {/* Image Preview */}
            <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center relative overflow-hidden group/visual">
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
              
              {/* Device Mockup */}
              <motion.div
                key={activeView}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full flex items-center justify-center py-4"
              >
                {activeView === 'desktop' ? (
                  // Laptop Mockup
                  <div className="relative w-full max-w-2xl lg:max-w-3xl">
                    {/* Laptop Screen */}
                    <div className="relative bg-zinc-900 rounded-t-lg sm:rounded-t-xl border-2 sm:border-4 border-zinc-800 shadow-2xl">
                      {/* Screen bezel */}
                      <div className="bg-black p-1 sm:p-2 rounded-t-md sm:rounded-t-lg">
                        <div className="relative aspect-video bg-zinc-950 rounded overflow-hidden">
                          <Image
                            src={project.images.desktop}
                            alt={`${project.title} - desktop view`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                      {/* Laptop notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-0.5 sm:h-1 bg-zinc-700 rounded-b-lg" />
                    </div>
                    {/* Laptop Base */}
                    <div className="relative h-2 sm:h-3 bg-gradient-to-b from-zinc-800 to-zinc-700 rounded-b-lg sm:rounded-b-xl shadow-lg">
                      <div className="absolute inset-x-0 top-0 h-px bg-zinc-600" />
                    </div>
                    {/* Laptop Bottom */}
                    <div className="relative h-1 sm:h-1.5 bg-zinc-700 rounded-b-sm mx-auto w-[95%]" />
                  </div>
                ) : (
                  // Phone Mockup
                  <div className="relative w-40 h-80 sm:w-48 sm:h-96 lg:w-64 lg:h-[500px]">
                    {/* Phone Frame */}
                    <div className="absolute inset-0 bg-zinc-900 rounded-[2rem] sm:rounded-[2.5rem] border-4 sm:border-[8px] border-zinc-800 shadow-2xl">
                      {/* Screen */}
                      <div className="relative w-full h-full bg-black rounded-[1.5rem] sm:rounded-[1.8rem] overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-32 h-4 sm:h-6 bg-zinc-900 rounded-b-2xl sm:rounded-b-3xl z-10" />
                        {/* Screen Content */}
                        <div className="relative w-full h-full">
                          <Image
                            src={project.images.mobile}
                            alt={`${project.title} - mobile view`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 160px, 256px"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Power Button */}
                    <div className="absolute right-0 top-20 sm:top-24 w-0.5 sm:w-1 h-8 sm:h-12 bg-zinc-800 rounded-l" />
                    {/* Volume Buttons */}
                    <div className="absolute left-0 top-16 sm:top-20 w-0.5 sm:w-1 h-6 sm:h-8 bg-zinc-800 rounded-r" />
                    <div className="absolute left-0 top-24 sm:top-32 w-0.5 sm:w-1 h-6 sm:h-8 bg-zinc-800 rounded-r" />
                  </div>
                )}
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                className={`absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-${project.color}/30 rounded-full`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className={`absolute bottom-2 left-2 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-${project.color}/20 rounded-full`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  )
}