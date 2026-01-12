'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animation/ScrollReveal'
import { 
  LaravelIcon, 
  MySQLIcon, 
  TailwindIcon, 
  AlpineJSIcon, 
  ViteIcon 
} from '@/components/icons/TechIcons'
import { SpatieIcon, MobileIcon, CodeIcon, PerformanceIcon, DatabaseIcon, APIIcon } from '@/components/icons/MoreTechIcons'
import { useState } from 'react'

// Link icon component
const LinkIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
  </svg>
)

// Tab icons
const OverviewIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z"/>
  </svg>
)

const FeaturesIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
  </svg>
)

const StatsIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z"/>
  </svg>
)

// Technology icon mapping for HRIS project
const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string; size?: number }> } = {
    'Laravel 11.x': LaravelIcon,
    'MySQL/SQLite': MySQLIcon,
    'Spatie Laravel-Permission': SpatieIcon,
    'Role-based Auth': SpatieIcon,
    'Tailwind CSS': TailwindIcon,
    'Alpine.js': AlpineJSIcon,
    'Vite': ViteIcon,
    'Mobile Responsive': MobileIcon
  }
  
  return iconMap[tech] || null
}

export function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', IconComponent: OverviewIcon },
    { id: 'features', label: 'Features', IconComponent: FeaturesIcon },
    { id: 'tech', label: 'Tech Stack', IconComponent: CodeIcon },
    { id: 'stats', label: 'Impact', IconComponent: StatsIcon }
  ]

  const features = [
    { feature: "QR Code Attendance", desc: "Dual scanner system" },
    { feature: "Employee Management", desc: "Complete HR workflow" },
    { feature: "Payroll System", desc: "Automated calculations" },
    { feature: "Leave Management", desc: "Request & approval" },
    { feature: "Profile Management", desc: "Secure file handling" },
    { feature: "Mobile Responsive", desc: "All device support" }
  ]

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="relative">
        {/* Enhanced timeline line - shorter for mobile */}
        <div className="absolute left-4 sm:left-6 lg:left-8 top-0 h-32 sm:h-40 lg:h-48 w-0.5 sm:w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-60"></div>
        
        {/* Timeline item - more compact */}
        <div className="relative pl-12 sm:pl-16 lg:pl-24 pb-8">
          {/* Enhanced timeline dot */}
          <motion.div 
            className="absolute left-2.5 sm:left-4 lg:left-6 top-8 sm:top-10 lg:top-12 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-secondary rounded-full border-2 sm:border-3 lg:border-4 border-background shadow-2xl"
            whileInView={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-30"></div>
          </motion.div>
          
          <ScrollReveal>
            <motion.div 
              className="glass-premium rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6 group"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Compact Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <motion.h3 
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-500"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Full-Stack Web Developer
                  </motion.h3>
                  <motion.p 
                    className="text-secondary font-semibold text-sm sm:text-base lg:text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    HRIS Capstone Project
                  </motion.p>
                  <motion.a
                    href="https://vcm-cavite.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-light text-xs sm:text-sm font-medium transition-colors duration-300 inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LinkIcon size={12} className="text-accent" />
                    vcm-cavite.online
                  </motion.a>
                </div>
                <motion.div 
                  className="glass-subtle rounded-lg px-3 sm:px-4 py-2 self-start sm:self-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-white/80 font-medium text-xs sm:text-sm">2024 - Present</span>
                </motion.div>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-1 sm:gap-2 p-1 glass-subtle rounded-xl">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-0 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 ${
                      activeTab === tab.id
                        ? 'bg-primary text-black shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <tab.IconComponent 
                      className={activeTab === tab.id ? 'text-black' : 'text-white/70'} 
                      size={14} 
                    />
                    {/* Show text only on sm and larger screens */}
                    <span className="truncate hidden sm:inline">{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[200px] sm:min-h-[250px]"
              >
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-secondary">Complete HR Management System</h4>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      Developed a comprehensive Human Resource Information System with advanced features 
                      including QR code attendance tracking, automated payroll calculations, and complete 
                      employee lifecycle management with role-based access control.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
                      <div className="text-center p-3 glass-subtle rounded-lg">
                        <div className="text-xl sm:text-2xl font-bold text-primary">40%</div>
                        <div className="text-white/70 text-xs">Manual Reduction</div>
                      </div>
                      <div className="text-center p-3 glass-subtle rounded-lg">
                        <div className="text-xl sm:text-2xl font-bold text-accent">100%</div>
                        <div className="text-white/70 text-xs">Automated</div>
                      </div>
                      <div className="text-center p-3 glass-subtle rounded-lg">
                        <div className="text-xl sm:text-2xl font-bold text-secondary">24/7</div>
                        <div className="text-white/70 text-xs">Available</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-secondary">Core Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {features.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="glass-subtle rounded-lg p-3 space-y-1 group/feature hover:bg-secondary/10 transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <h5 className="text-primary font-semibold text-sm group-hover/feature:text-secondary transition-colors duration-300">
                            {item.feature}
                          </h5>
                          <p className="text-white/60 text-xs leading-relaxed">
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'tech' && (
                  <div className="space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-secondary">Technology Stack</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-accent font-semibold text-sm mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          Backend & Database
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {['Laravel 11.x', 'MySQL/SQLite', 'Spatie Laravel-Permission'].map((tech, idx) => {
                            const IconComponent = getTechIcon(tech)
                            return (
                              <motion.span 
                                key={tech}
                                className="glass-subtle rounded-lg px-3 py-2 text-xs text-white/80 font-medium hover:bg-accent/20 transition-colors duration-300 flex items-center gap-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {IconComponent && (
                                  <IconComponent 
                                    className="text-accent flex-shrink-0" 
                                    size={12} 
                                  />
                                )}
                                <span className="whitespace-nowrap">{tech}</span>
                              </motion.span>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-primary font-semibold text-sm mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          Frontend & Tools
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {['Tailwind CSS', 'Alpine.js', 'Vite', 'Mobile Responsive'].map((tech, idx) => {
                            const IconComponent = getTechIcon(tech)
                            return (
                              <motion.span 
                                key={tech}
                                className="glass-subtle rounded-lg px-3 py-2 text-xs text-white/80 font-medium hover:bg-primary/20 transition-colors duration-300 flex items-center gap-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {IconComponent && (
                                  <IconComponent 
                                    className="text-primary flex-shrink-0" 
                                    size={12} 
                                  />
                                )}
                                <span className="whitespace-nowrap">{tech}</span>
                              </motion.span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-secondary">Project Impact</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <motion.div 
                        className="glass-subtle rounded-lg p-4 text-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">40%</div>
                        <div className="text-white/70 text-sm">Reduction in Manual Data Processing</div>
                        <div className="text-white/50 text-xs mt-1">Automated workflows eliminated repetitive tasks</div>
                      </motion.div>
                      <motion.div 
                        className="glass-subtle rounded-lg p-4 text-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">100%</div>
                        <div className="text-white/70 text-sm">Automated Payroll & Attendance</div>
                        <div className="text-white/50 text-xs mt-1">Complete digitization of HR processes</div>
                      </motion.div>
                      <motion.div 
                        className="glass-subtle rounded-lg p-4 text-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">24/7</div>
                        <div className="text-white/70 text-sm">System Availability</div>
                        <div className="text-white/50 text-xs mt-1">Reliable cloud-based infrastructure</div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}