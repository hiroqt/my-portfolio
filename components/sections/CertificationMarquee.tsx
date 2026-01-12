'use client'

import { motion } from 'framer-motion'

export function CertificationMarquee() {
  const certifications = [
    "Cisco Networking Academy: Ethical Hacker",
    "Digital Literacy Webinar: AI Tools & Applications",
    "Blockchain Campus Conference 2025",
    "Computer Programming Graduate",
    "Full-Stack Web Developer",
    "Laravel Framework Specialist",
    "Database Management Systems"
  ]

  return (
    <div className="py-6 sm:py-8 border-t border-white/5 relative overflow-hidden">
      <div className="container-spacing mb-6 sm:mb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Certifications & Training
          </h3>
        </motion.div>
      </div>
      
      <div className="relative">
        {/* Single line marquee */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...certifications, ...certifications, ...certifications].map((cert, index) => (
            <motion.div 
              key={`cert-${index}`}
              className="glass-subtle rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 mx-2 sm:mx-3 lg:mx-4 min-w-max group hover:scale-105 transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse flex-shrink-0" />
                <span className="text-white/80 font-medium text-xs sm:text-sm group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {cert}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 lg:w-24 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </div>
  )
}