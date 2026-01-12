'use client'

import { motion } from 'framer-motion'

interface SectionSeparatorProps {
  variant?: 'dots' | 'lines' | 'wave' | 'geometric'
  className?: string
}

export function SectionSeparator({ variant = 'dots', className = '' }: SectionSeparatorProps) {
  if (variant === 'dots') {
    return (
      <motion.div
        className={`py-element-gap w-screen -mx-[50vw] left-1/2 right-1/2 relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="flex items-center justify-center gap-3 w-full px-8">
          {/* Left dots */}
          <div className="flex-1 flex justify-end items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`left-${i}`}
                className="w-1.5 h-1.5 bg-white/20 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Center dots */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`center-${i}`}
                className="w-2 h-2 bg-white/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          {/* Right dots */}
          <div className="flex-1 flex justify-start items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`right-${i}`}
                className="w-1.5 h-1.5 bg-white/20 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (i + 3) * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'lines') {
    return (
      <motion.div
        className={`py-element-gap w-screen -mx-[50vw] left-1/2 right-1/2 relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="flex items-center justify-center w-full px-8">
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div
            className="w-4 h-4 border border-white/40 rotate-45 mx-8"
            initial={{ rotate: 0, scale: 0 }}
            whileInView={{ rotate: 45, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    )
  }

  if (variant === 'wave') {
    return (
      <motion.div
        className={`py-element-gap w-screen -mx-[50vw] left-1/2 right-1/2 relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="w-full px-8">
          <svg
            viewBox="0 0 1200 20"
            className="w-full h-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 10 Q300 0 600 10 T1200 10"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.circle
              cx="600"
              cy="10"
              r="3"
              fill="rgba(255, 255, 255, 0.5)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
            {/* Additional wave points */}
            <motion.circle
              cx="300"
              cy="10"
              r="2"
              fill="rgba(255, 255, 255, 0.3)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
            />
            <motion.circle
              cx="900"
              cy="10"
              r="2"
              fill="rgba(255, 255, 255, 0.3)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            />
          </svg>
        </div>
      </motion.div>
    )
  }

  // geometric variant (default fallback)
  return (
    <motion.div
      className={`py-element-gap w-screen -mx-[50vw] left-1/2 right-1/2 relative flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="flex items-center justify-center w-full px-8">
        <div className="flex items-center justify-center gap-8 flex-1">
          <motion.div
            className="w-3 h-3 border border-white/30"
            initial={{ rotate: 0, scale: 0 }}
            whileInView={{ rotate: 45, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-white/20 rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </div>
        
        <motion.div
          className="w-6 h-6 border border-white/40 rotate-45 mx-8"
          initial={{ rotate: 0, scale: 0 }}
          whileInView={{ rotate: 45, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        
        <div className="flex items-center justify-center gap-8 flex-1">
          <motion.div
            className="w-2 h-2 bg-white/20 rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.div
            className="w-3 h-3 border border-white/30"
            initial={{ rotate: 0, scale: 0 }}
            whileInView={{ rotate: 45, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          />
        </div>
      </div>
    </motion.div>
  )
}