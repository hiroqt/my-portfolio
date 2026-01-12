'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PageLoaderProps {
  onComplete: () => void
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 8 + 4
        const newProgress = Math.min(prev + increment, 100)
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 800)
          return 100
        }
        return newProgress
      })
    }, 150)

    // Fallback to ensure loader doesn't get stuck
    const fallbackTimeout = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        onComplete()
      }, 500)
    }, 5000) // 5 second maximum

    return () => {
      clearInterval(interval)
      clearTimeout(fallbackTimeout)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-zinc-950 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
          transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
      >
        {/* Main loader container */}
        <motion.div
          className="flex flex-col items-center space-y-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            exit: { duration: 1 }
          }}
        >
          {/* Loading text - bigger */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-white text-4xl sm:text-5xl md:text-6xl font-light tracking-wider">
              Loading
            </div>
            
            {/* Progress percentage - bigger */}
            <div className="text-white/60 text-xl sm:text-2xl font-mono tabular-nums">
              {Math.round(progress)}%
            </div>
          </motion.div>

          {/* Larger progress bar */}
          <motion.div
            className="w-80 sm:w-96 md:w-[500px] h-1 bg-zinc-800 relative overflow-hidden rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: `${progress - 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Subtle animated background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
        >
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}