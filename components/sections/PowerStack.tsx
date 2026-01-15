'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4">
      {stackItems.map((item, index) => (
        <ScrollReveal key={index}>
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
            className="glass-card rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6 group relative overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4 lg:mb-6">
                <div className="space-y-1 lg:space-y-2 flex-1">
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-${item.color} group-hover:text-white transition-colors duration-300`}>
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300 pr-2">
                    {item.description}
                  </p>
                </div>
                
                {/* Animated icon */}
                <motion.div
                  className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-${item.color}/10 flex items-center justify-center flex-shrink-0`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-${item.color} rounded-sm lg:rounded-md`} />
                </motion.div>
              </div>
              
              {/* Technologies grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                {item.technologies.map((tech, techIndex) => {
                  const IconComponent = getTechIcon(tech)
                  return (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: techIndex * 0.1 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)"
                      }}
                      className="glass-subtle rounded-lg lg:rounded-xl px-3 sm:px-4 py-2 lg:py-3 text-white/80 text-xs sm:text-sm font-medium cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {IconComponent && (
                        <IconComponent 
                          className="text-white/70 flex-shrink-0" 
                          size={14} 
                        />
                      )}
                      <span className="whitespace-nowrap">{tech}</span>
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
        </ScrollReveal>
      ))}
    </div>
  )
}