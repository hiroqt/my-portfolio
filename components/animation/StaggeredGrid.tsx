'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggeredGridProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  gridCols?: string
}

export function StaggeredGrid({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
}: StaggeredGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`grid ${gridCols} gap-container-gap ${className}`}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}