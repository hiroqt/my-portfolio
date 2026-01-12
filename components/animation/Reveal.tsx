'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
}

export function Reveal({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  y = 30,
  className 
}: RevealProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: y 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ 
        once: true, 
        margin: '-100px' 
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom easing for cinematic feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}