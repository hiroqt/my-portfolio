'use client'

import { motion } from 'framer-motion'

export function CertificationMarquee() {
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

  return (
    <div className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16 px-4">
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
      
      {/* Enhanced Certification Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="glass-premium rounded-2xl p-6 lg:p-8 group hover:bg-white/5 transition-all duration-300 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
      </div>
      
      {/* Background Enhancement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}