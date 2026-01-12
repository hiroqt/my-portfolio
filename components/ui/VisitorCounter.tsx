'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate visitor count - in production, this would come from your analytics API
    const getVisitorCount = () => {
      // For demo purposes, using localStorage to simulate persistent count
      const stored = localStorage.getItem('portfolio-visitors')
      let count = stored ? parseInt(stored) : Math.floor(Math.random() * 1000) + 500
      
      // Increment count for this visit
      count += 1
      localStorage.setItem('portfolio-visitors', count.toString())
      
      return count
    }

    // Simulate loading delay
    setTimeout(() => {
      setVisitorCount(getVisitorCount())
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <motion.div
      className="flex items-center space-x-2 text-zinc-500 text-xs font-mono"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex items-center space-x-1">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span>VISITORS:</span>
      </div>
      <motion.span
        className="text-white font-semibold tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        {isLoading ? '---' : visitorCount.toLocaleString()}
      </motion.span>
    </motion.div>
  )
}