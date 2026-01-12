'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { LinkedInIcon, GmailIcon } from '@/components/icons/MoreTechIcons'
import { GitHubIcon } from '@/components/icons/TechIcons'

export function EnhancedHero() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // Typewriter effect state
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const typewriterTexts = [
    "Full-Stack Developer",
    "Vibe Coder",
    "AI Integrator", 
    "Systems Architect"
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    const element = ref.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      return () => element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Terminal typewriter effect
  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      if (displayedText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1))
        }, 80)
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 40)
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayedText, isTyping, currentTextIndex, typewriterTexts])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div 
      ref={ref}
      className="min-h-screen w-full relative overflow-hidden bg-zinc-950 flex flex-col"
    >
      {/* Interactive Grid Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Interactive glow effect */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            x: useTransform(springX, (x) => x - 192),
            y: useTransform(springY, (y) => y - 192),
          }}
        />
      </div>

      {/* System Status Bar */}
      <motion.div
        className="w-full py-3 px-6 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>STATUS: 200 OK</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>API: IDEMPOTENT</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span>LOCATION: CAVITE, PH</span>
            </span>
          </div>
          <div className="hidden sm:block text-zinc-500">
            SYSTEM ONLINE
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          
          {/* Main Headline */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              <span className="block">Arnel Baylon:</span>
              <span className="block text-zinc-300 mt-2">
                Architecting Scalable Web Systems
              </span>
              <span className="block text-zinc-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                with AI
              </span>
            </h1>
          </motion.div>

          {/* Dynamic Sub-headline with Terminal Effect */}
          <motion.div
            className="h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="text-xl sm:text-2xl md:text-3xl font-mono text-zinc-300 flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <span className="text-white">{displayedText}</span>
              <motion.span
                className="inline-block w-0.5 h-6 sm:h-8 bg-green-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Impact Badge */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.div
              className="glass-premium rounded-2xl px-6 py-4 max-w-md mx-auto backdrop-blur-md bg-white/5 border border-white/10"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  40% Reduction
                </div>
                <div className="text-sm text-zinc-400">
                  in Manual Data Processing achieved in latest HRIS build
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            {/* Primary CTA - View Impact */}
            <motion.button
              onClick={() => scrollToSection('experience')}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white via-zinc-100 to-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center space-x-2">
                <span>View Impact</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </span>
            </motion.button>

            {/* Secondary CTA - Project Stack */}
            <motion.button
              onClick={() => scrollToSection('power-stack')}
              className="group px-8 py-4 border-2 border-zinc-600 text-white font-semibold rounded-xl hover:border-white hover:bg-white/5 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>Project Stack</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="flex justify-center gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            {[
              { 
                name: "GitHub", 
                url: "https://github.com/hiroqt", 
                IconComponent: GitHubIcon,
                color: "hover:text-white"
              },
              { 
                name: "LinkedIn", 
                url: "https://www.linkedin.com/in/arnel-baylon-b05233189", 
                IconComponent: LinkedInIcon,
                color: "hover:text-blue-400"
              },
              { 
                name: "Gmail", 
                url: "mailto:arnelbaylon15@gmail.com", 
                IconComponent: GmailIcon,
                color: "hover:text-red-400"
              }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target={social.name === "Gmail" ? "_self" : "_blank"}
                rel={social.name === "Gmail" ? "" : "noopener noreferrer"}
                className={`p-3 rounded-full border border-zinc-700 text-zinc-400 transition-all duration-300 ${social.color} hover:border-current hover:bg-current/10`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.8 + index * 0.1 }}
              >
                <social.IconComponent size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}