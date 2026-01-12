'use client'

import { motion } from 'framer-motion'

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary/30 rounded-full"
        animate={{
          y: [-30, 30, -30],
          x: [-15, 15, -15],
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-secondary/40 rounded-full"
        animate={{
          y: [25, -25, 25],
          x: [12, -12, 12],
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent/25 rounded-full"
        animate={{
          y: [-40, 40, -40],
          x: [-20, 20, -20],
          scale: [1, 0.5, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute top-2/3 right-1/4 w-2.5 h-2.5 bg-primary/35 rounded-full"
        animate={{
          y: [20, -20, 20],
          x: [-10, 10, -10],
          scale: [1, 1.8, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Enhanced gradient orbs with new colors */}
      <motion.div
        className="absolute top-1/2 left-1/6 w-40 h-40 bg-gradient-to-r from-primary/15 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/6 w-32 h-32 bg-gradient-to-l from-secondary/12 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.2, 0.6, 0.2],
          rotate: [0, -120, -240],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
      
      <motion.div
        className="absolute top-1/6 right-1/2 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.5, 0.15],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6
        }}
      />
      
      {/* Animated lines/connections */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-px h-20 bg-gradient-to-b from-primary/20 to-transparent"
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 0.6, 0],
          rotate: [0, 45, 90],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute bottom-1/2 right-1/3 w-16 h-px bg-gradient-to-r from-secondary/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0],
          rotate: [0, -30, -60],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  )
}