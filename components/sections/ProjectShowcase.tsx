'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
import { useState } from 'react'
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

  return (
    <div className="space-y-16">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glass-premium rounded-3xl p-12 group relative overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Project Info */}
          <div className="space-y-6 lg:space-y-8 px-4 lg:px-0">
            <div className="space-y-3 lg:space-y-4">
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 bg-${project.color} rounded-full animate-pulse`} />
                  <span className="text-white/60 text-xs sm:text-sm font-medium tracking-wider uppercase">
                    Featured Project
                  </span>
                </div>
                {project.url && (
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-light text-xs font-medium transition-colors duration-300 ml-auto"
                    whileHover={{ scale: 1.05 }}
                  >
                    View Live →
                  </motion.a>
                )}
              </motion.div>
              
              <motion.h3 
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-${project.color} group-hover:text-white transition-colors duration-500`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {project.title}
              </motion.h3>
            </div>
            
            <motion.div 
              className="text-white/80 text-base sm:text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.description}
            </motion.div>
            
            {/* Key Features */}
            <div className="space-y-3 lg:space-y-4">
              <motion.h4 
                className="text-white font-semibold text-base sm:text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Key Features
              </motion.h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                {project.highlights.map((highlight: string, idx: number) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-2 lg:gap-3 group/item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  >
                    <motion.div 
                      className={`w-2 h-2 bg-${project.color} rounded-full group-hover/item:scale-125 transition-transform duration-300 flex-shrink-0`}
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
              className="flex flex-wrap gap-2 lg:gap-3"
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
                    className={`glass-subtle rounded-full px-3 sm:px-4 lg:px-6 py-2 lg:py-3 text-xs sm:text-sm font-medium text-${project.color} border border-${project.color}/20 hover:border-${project.color}/40 transition-all duration-300 flex items-center gap-1 sm:gap-2`}
                  >
                    {IconComponent && (
                      <IconComponent 
                        className={`text-${project.color}`} 
                        size={12} 
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
            <div className="space-y-4">
              {/* Tab Buttons */}
              <div className="flex gap-2 justify-center">
                <motion.button
                  onClick={() => setActiveView('desktop')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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
              <div className="glass-card rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 h-64 sm:h-80 lg:h-96 flex items-center justify-center relative overflow-hidden group/visual">
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
                
                {/* Image Content */}
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={project.images[activeView]}
                      alt={`${project.title} - ${activeView} view`}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                  className={`absolute top-4 right-4 lg:top-6 lg:right-6 w-3 h-3 lg:w-4 lg:h-4 bg-${project.color}/30 rounded-full`}
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
                  className={`absolute bottom-4 left-4 lg:bottom-6 lg:left-6 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-${project.color}/20 rounded-full`}
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
    </ScrollReveal>
  )
}