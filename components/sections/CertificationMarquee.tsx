'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function CertificationMarquee() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const certifications = [
    {
      title: "Cisco Networking Academy",
      subtitle: "Ethical Hacker Certification",
      year: "2025"
    },
    {
      title: "Digital Literacy Webinar",
      subtitle: "AI Tools & Applications",
      year: "2025"
    },
    {
      title: "Blockchain Campus Conference",
      subtitle: "Web3 & Blockchain Technology",
      year: "2025"
    },
    {
      title: "Bachelor of Science in IT",
      subtitle: "Current Student",
      year: "Ongoing"
    },
    {
      title: "Computer Programming",
      subtitle: "Current Student",
      year: "Ongoing"
    },
    {
      title: "Laravel Framework",
      subtitle: "Intermediate Developer",
      year: "2024"
    }
  ]

  // Group certifications into pages - 1 per page on mobile, 3 on desktop
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const itemsPerPage = isMobile ? 1 : 3
  const pages = []
  for (let i = 0; i < certifications.length; i += itemsPerPage) {
    pages.push(certifications.slice(i, i + itemsPerPage))
  }

  const currentPage = pages[currentIndex]

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = pages.length - 1
      if (nextIndex >= pages.length) nextIndex = 0
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
    <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Certifications & Training
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Professional certifications and continuous learning in cutting-edge technologies
          </p>
        </motion.div>
      </div>

      {/* Page Counter */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-white/40 text-sm font-mono">
          PAGE {currentIndex + 1} / {pages.length}
        </span>
      </motion.div>
      
      {/* Certification Grid with Pagination */}
      <div className="max-w-7xl mx-auto px-4">
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
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
                {currentPage.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    className="glass-premium rounded-2xl p-6 lg:p-8 group hover:bg-white/5 transition-all duration-300 border border-white/10 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                  >
                    {/* Year Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <motion.div
                        className="glass-subtle rounded-full px-3 py-1 text-xs font-mono text-white/70"
                        whileHover={{ scale: 1.05 }}
                      >
                        {cert.year}
                      </motion.div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                    
                    {/* Certification Content */}
                    <div className="space-y-2">
                      <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                        {cert.subtitle}
                      </p>
                    </div>
                    
                    {/* Hover Effect Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
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
            {pages.map((_, index) => (
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
      
      {/* Background Enhancement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}