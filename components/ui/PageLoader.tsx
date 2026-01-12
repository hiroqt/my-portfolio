'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const loadingTexts = [
    "INITIALIZING NEURAL NETWORKS...",
    "LOADING AI SYSTEMS...",
    "ESTABLISHING CONNECTIONS...",
    "PORTFOLIO READY"
  ]

  useEffect(() => {
    setIsMounted(true)
    
    // Small delay to ensure client-side rendering
    const startDelay = setTimeout(() => {
      // Simulate loading progress with phases
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 8 + (Math.floor(Date.now() / 100) % 5) // Deterministic "randomness"
          
          // Update loading phase based on progress
          if (newProgress > 25 && loadingPhase === 0) setLoadingPhase(1)
          if (newProgress > 60 && loadingPhase === 1) setLoadingPhase(2)
          if (newProgress > 90 && loadingPhase === 2) setLoadingPhase(3)
          
          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => setIsLoading(false), 800)
            return 100
          }
          return newProgress
        })
      }, 120)

      return () => clearInterval(interval)
    }, 100)

    return () => {
      clearTimeout(startDelay)
    }
  }, [loadingPhase])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
        >
          {/* Futuristic Grid Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-20">
              {/* Animated grid lines */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                  style={{ left: `${i * 5}%` }}
                  animate={{
                    opacity: [0.1, 0.5, 0.1],
                    scaleY: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent"
                  style={{ top: `${i * 6.67}%` }}
                  animate={{
                    opacity: [0.1, 0.4, 0.1],
                    scaleX: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Holographic Orbs */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className={`absolute w-32 h-32 rounded-full blur-xl ${
                  i % 3 === 0 ? 'bg-primary/20' : 
                  i % 3 === 1 ? 'bg-secondary/20' : 'bg-accent/20'
                }`}
                style={{
                  left: `${20 + (i * 15) % 60}%`,
                  top: `${10 + (i * 20) % 70}%`,
                }}
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.3, 0.8, 0.3],
                  x: [0, (i % 2 === 0 ? 50 : -50), 0],
                  y: [0, (i % 2 === 0 ? -30 : 30), 0],
                }}
                transition={{
                  duration: 6 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center space-y-12">
            {/* Futuristic Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent relative px-4"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                ARNEL A. BAYLON
                
                {/* Holographic scan line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeInOut"
                  }}
                />
              </motion.h1>
              
              {/* Glitch effect overlay */}
              <motion.div
                className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary/30 px-4"
                animate={{
                  x: [0, 2, -2, 0],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                ARNEL A. BAYLON
              </motion.div>
            </motion.div>

            {/* Advanced Loading Spinner */}
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-2 border-primary/30 rounded-full mx-auto relative"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Multiple rotating elements */}
                <motion.div
                  className="absolute inset-2 border-2 border-secondary/50 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute inset-4 border-2 border-accent/70 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Pulsing core */}
                <motion.div
                  className="absolute inset-6 bg-gradient-to-r from-primary to-secondary rounded-full"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Orbiting dots */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${50 + Math.cos(i * Math.PI / 4) * 50}%`,
                      top: `${50 + Math.sin(i * Math.PI / 4) * 50}%`,
                      transform: 'translate(-50%, -50%)',
                      transformOrigin: '0 0',
                    }}
                    animate={{
                      rotate: 360,
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5,
                      },
                      scale: {
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.125,
                      }
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Progress percentage */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span 
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono"
                  animate={{
                    textShadow: [
                      '0 0 10px rgba(124, 58, 237, 0.5)',
                      '0 0 20px rgba(124, 58, 237, 1)',
                      '0 0 10px rgba(124, 58, 237, 0.5)',
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </motion.div>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="w-64 sm:w-72 lg:w-80 mx-auto space-y-3 lg:space-y-4 px-4">
              <div className="relative h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden border border-primary/30">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                  initial={{ width: 0, x: '-100%' }}
                  animate={{ 
                    width: `${progress}%`,
                    x: 0
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Scanning light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-16 sm:w-20"
                  animate={{
                    x: ['-100%', '400%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Progress segments */}
              <div className="flex justify-between text-xs text-white/40 font-mono px-1">
                <span>00</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>FF</span>
              </div>
            </div>

            {/* Dynamic Loading Text */}
            <motion.div
              className="space-y-2 px-4"
              key={loadingPhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-white/80 text-sm sm:text-base lg:text-lg font-mono tracking-wider text-center"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {loadingTexts[loadingPhase]}
              </motion.p>
              
              {/* Typing cursor */}
              <motion.span
                className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-primary ml-1"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* System Status */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-xs font-mono text-white/50 max-w-xs sm:max-w-md mx-auto px-4">
              <motion.div
                className="flex items-center justify-center gap-1 sm:gap-2"
                animate={{
                  opacity: progress > 20 ? 1 : 0.3,
                }}
              >
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${progress > 20 ? 'bg-green-400' : 'bg-gray-600'}`} />
                <span>CORE</span>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-1 sm:gap-2"
                animate={{
                  opacity: progress > 50 ? 1 : 0.3,
                }}
              >
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${progress > 50 ? 'bg-green-400' : 'bg-gray-600'}`} />
                <span>UI</span>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-1 sm:gap-2"
                animate={{
                  opacity: progress > 80 ? 1 : 0.3,
                }}
              >
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${progress > 80 ? 'bg-green-400' : 'bg-gray-600'}`} />
                <span>NET</span>
              </motion.div>
            </div>
          </div>

          {/* Particle System */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-primary/60 rounded-full"
                style={{
                  left: `${(i * 3.33) % 100}%`,
                  top: `${(i * 2.5) % 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}