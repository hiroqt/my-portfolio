'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArchitectureIcon, AIIcon, CodeIcon, LinkedInIcon, GmailIcon } from '@/components/icons/MoreTechIcons'
import { GitHubIcon } from '@/components/icons/TechIcons'

export function EnhancedHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // Typewriter effect state
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const typewriterTexts = [
    "Architecting Scalable Systems",
    "AI-Driven Solutions",
    "Full-Stack Innovation"
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX - innerWidth / 2) / 50)
      mouseY.set((clientY - innerHeight / 2) / 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Typewriter effect
  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      // Typing phase
      if (displayedText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1))
        }, 100) // Typing speed
      } else {
        // Finished typing, wait before erasing
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, 5000) // 5 second interval
      }
    } else {
      // Erasing phase
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 50) // Erasing speed (faster)
      } else {
        // Finished erasing, move to next text
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayedText, isTyping, currentTextIndex, typewriterTexts])

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90">
      <div ref={ref} className="relative z-10 w-full">
        
        <motion.div 
          style={{ y, opacity, scale }}
          className="text-center space-y-element-gap px-6 w-full max-w-7xl mx-auto"
        >
          {/* Enhanced name with particle effects */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-micro-gap relative"
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-display font-bold text-shimmer relative px-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              style={{ x: springX, y: springY }}
            >
              ARNEL A. BAYLON
              
              {/* Enhanced animated background glow */}
              <motion.div
                className="absolute -inset-12 bg-gradient-to-r from-primary/30 via-secondary/25 to-accent/30 rounded-full blur-3xl"
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.h1>
            
            {/* Enhanced divider with multiple animations */}
            <motion.div 
              className="relative mx-auto w-60 h-2 overflow-hidden rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent" />
            </motion.div>
          </motion.div>
          
          {/* Enhanced main headline with typewriter effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative py-8"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-heading-lg font-bold text-white/95 leading-tight relative z-10 min-h-[150px] sm:min-h-[180px] md:min-h-[200px] flex items-center justify-center px-4">
              <div className="text-center">
                <motion.span
                  className="block text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {displayedText}
                  {/* Typing cursor */}
                  <motion.span
                    className="inline-block w-0.5 sm:w-1 h-8 sm:h-12 md:h-16 bg-primary ml-1 sm:ml-2"
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.span>
              </div>
            </div>
            
            {/* Enhanced floating code symbols with more variety */}
            {['</>', '{...}', '()', '[]', '&&', '||', '=>', '++'].map((symbol, i) => (
              <motion.div
                key={i}
                className="absolute text-primary/20 text-3xl font-mono pointer-events-none"
                style={{
                  left: `${5 + (i * 12) % 90}%`,
                  top: `${-30 + (i % 4) * 25}%`,
                }}
                animate={{
                  y: [-10, 15, -10],
                  x: [0, (i % 2 === 0 ? 10 : -10), 0],
                  rotate: [-10, 10, -10],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              >
                {symbol}
              </motion.div>
            ))}
            
            {/* Background matrix effect */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary font-mono text-xs"
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${(i * 7) % 100}%`,
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    y: [0, -100],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear"
                  }}
                >
                  {(i * 123).toString(36).substring(0, 3)}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced description with advanced typewriter effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative max-w-5xl mx-auto px-4"
          >
            <div className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed">
              <span className="block sm:inline">
                Full-Stack Developer specializing in PHP Laravel and Next.js, with a proven track record of{' '}
              </span>
              <motion.span 
                className="text-primary font-semibold relative inline-block"
                whileHover={{ 
                  scale: 1.1,
                  textShadow: "0 0 30px rgba(124, 58, 237, 0.8)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                reducing manual processing by 40%
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                />
              </motion.span>
              <span className="block sm:inline mt-2 sm:mt-0">
                {' '}through{' '}
              </span>
              <motion.span 
                className="text-secondary font-semibold relative inline-block"
                whileHover={{ 
                  scale: 1.1,
                  textShadow: "0 0 30px rgba(6, 182, 212, 0.8)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                AI automation
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                />
              </motion.span>
            </div>
          </motion.div>
          
          {/* Enhanced skill badges with advanced 3D effects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-element-gap px-4"
          >
            {[
              { label: "Systems Architecture", color: "primary", delay: 0, IconComponent: ArchitectureIcon },
              { label: "AI Integration", color: "secondary", delay: 0.1, IconComponent: AIIcon },
              { label: "Full-Stack Development", color: "accent", delay: 0.2, IconComponent: CodeIcon }
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 1.5 + badge.delay,
                  type: "spring",
                  stiffness: 150
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotateY: 15,
                  rotateX: 5,
                  boxShadow: `0 25px 50px rgba(124, 58, 237, 0.5)`,
                  z: 100
                }}
                className="glass-premium rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 group cursor-pointer relative overflow-hidden transform-gpu w-full sm:w-auto"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Multiple animated backgrounds */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${badge.color}/30 via-${badge.color}/20 to-transparent opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-tl from-transparent via-${badge.color}/10 to-${badge.color}/20 opacity-0 group-hover:opacity-100`}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
                
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 relative z-10">
                  <div className="flex items-center justify-center">
                    <badge.IconComponent 
                      className={`text-${badge.color} group-hover:text-white transition-colors duration-300`}
                      size={20}
                    />
                  </div>
                  <span className={`text-${badge.color} font-bold text-sm sm:text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300 text-center sm:text-left`}>
                    {badge.label}
                  </span>
                </div>
                
                {/* Enhanced shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-200%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex justify-center gap-6 mt-element-gap px-4"
          >
            {[
              { 
                name: "GitHub", 
                url: "https://github.com/hiroqt", 
                IconComponent: GitHubIcon,
                color: "text-white hover:text-primary"
              },
              { 
                name: "LinkedIn", 
                url: "https://www.linkedin.com/in/arnel-baylon-b05233189", 
                IconComponent: LinkedInIcon,
                color: "text-white hover:text-secondary"
              },
              { 
                name: "Gmail", 
                url: "mailto:arnelbaylon15@gmail.com", 
                IconComponent: GmailIcon,
                color: "text-white hover:text-accent"
              }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target={social.name === "Gmail" ? "_self" : "_blank"}
                rel={social.name === "Gmail" ? "" : "noopener noreferrer"}
                className={`glass-premium rounded-full p-4 group cursor-pointer relative overflow-hidden transform-gpu transition-all duration-300 ${social.color}`}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.8 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-full"
                  transition={{ duration: 0.3 }}
                />
                
                <social.IconComponent 
                  className="relative z-10 transition-colors duration-300"
                  size={24}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-200%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Subtle static background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-secondary/8 via-secondary/4 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-radial from-accent/6 via-accent/3 to-transparent rounded-full blur-3xl opacity-15" />
      </div>
    </div>
  )
}