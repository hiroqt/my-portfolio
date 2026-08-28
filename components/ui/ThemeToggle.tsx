'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ThemeToggleProps {
  variant?: 'header' | 'sidebar'
  onToggle?: () => void
}

export default function ThemeToggle({ variant = 'header', onToggle }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isSlashing, setIsSlashing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Check system preference, default to dark mode if no preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'dark' // Keep dark as default
      setTheme(initialTheme)
      document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsSlashing(true)
    
    // Switch theme immediately when animation starts
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
    
    setTimeout(() => {
      setIsSlashing(false)
    }, 700)

    if (onToggle) onToggle()
  }

  // Sidebar variant (mobile)
  if (variant === 'sidebar') {
    return (
      <>
        {/* Sword Slash Animation Overlay - Rendered via Portal */}
        {mounted && isSlashing && createPortal(
          <SwordSlashEffect theme={theme} />,
          document.body
        )}

        {/* Sidebar Theme Toggle - Compact circular button */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-background/20 mt-6">
          <div className="text-left">
            <div className="text-xs font-mono text-background/50 uppercase tracking-widest">Theme</div>
            <div className="text-sm font-medium text-background mt-1">
              {theme === 'dark' ? 'Dark' : 'Light'}
            </div>
          </div>
          <motion.button
            onClick={toggleTheme}
            disabled={isSlashing}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed bg-background/10 border border-background/30 hover:border-background/50 shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-background"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-background"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </>
    )
  }

  // Header variant (desktop)
  return (
    <>
      {/* Sword Slash Animation Overlay - Rendered via Portal */}
      {mounted && isSlashing && createPortal(
        <SwordSlashEffect theme={theme} />,
        document.body
      )}

      {/* Header Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        disabled={isSlashing}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed glass border border-border/50 hover:border-border shadow-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <MoonIcon />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <SunIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

// Sword Slash Animation Effect Component
function SwordSlashEffect({ theme }: { theme: 'light' | 'dark' }) {
  // Theme is the OLD theme (before toggle), so we show the OLD theme color being "cut away"
  const oldTheme = theme === 'dark' ? 'light' : 'dark'
  
  // Determine slash direction based on the transition
  // light → dark = left to right (45deg)
  // dark → light = right to left (135deg, or -45deg from right)
  const isLightToDark = oldTheme === 'light'
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 99999 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Solid overlay of OLD theme that gets slashed away */}
        <motion.div
          className="absolute inset-0"
          style={{
            originX: isLightToDark ? 0 : 1,
            originY: 0,
          }}
          initial={{ 
            clipPath: isLightToDark 
              ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'  // Full screen
              : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',  // Full screen
          }}
          animate={{ 
            clipPath: isLightToDark
              ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'  // Wipe to right
              : 'polygon(0 0, 0 0, 0 100%, 0 100%)',  // Wipe to left
          }}
          transition={{ 
            duration: 0.7,
            ease: [0.87, 0, 0.13, 1]
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: oldTheme === 'dark' ? '#0E1013' : '#F8F9FA',
            }}
          />
        </motion.div>

        {/* Bright sword trail slash line */}
        <motion.div
          className="absolute w-3 h-[200%]"
          style={{
            originX: isLightToDark ? 0 : 1,
            originY: 0,
            background: oldTheme === 'dark'
              ? 'linear-gradient(to bottom, transparent 0%, rgba(241,243,245,1) 30%, rgba(241,243,245,1) 70%, transparent 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(18,19,22,1) 30%, rgba(18,19,22,1) 70%, transparent 100%)',
            filter: 'blur(2px)',
            boxShadow: oldTheme === 'dark'
              ? '0 0 40px rgba(241,243,245,1), 0 0 80px rgba(241,243,245,0.6), 0 0 120px rgba(241,243,245,0.4)'
              : '0 0 40px rgba(18,19,22,1), 0 0 80px rgba(18,19,22,0.6), 0 0 120px rgba(18,19,22,0.4)',
          }}
          initial={{ 
            x: isLightToDark ? -100 : '100vw',
            y: -100,
            rotate: isLightToDark ? 45 : 135,
            scaleY: 0
          }}
          animate={{ 
            x: isLightToDark ? ['0%', '120%'] : ['100%', '-20%'],
            y: ['-60%', '60%'],
            rotate: isLightToDark ? 45 : 135,
            scaleY: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 0.7,
            ease: [0.87, 0, 0.13, 1]
          }}
        />

        {/* Sharp edge highlight */}
        <motion.div
          className="absolute w-1 h-[200%]"
          style={{
            originX: isLightToDark ? 0 : 1,
            originY: 0,
            background: oldTheme === 'dark'
              ? 'linear-gradient(to bottom, transparent 0%, rgba(241,243,245,1) 40%, rgba(241,243,245,1) 60%, transparent 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(18,19,22,1) 40%, rgba(18,19,22,1) 60%, transparent 100%)',
            filter: 'blur(0px)',
            boxShadow: oldTheme === 'dark'
              ? '0 0 20px rgba(241,243,245,1)'
              : '0 0 20px rgba(18,19,22,1)',
          }}
          initial={{ 
            x: isLightToDark ? -100 : '100vw',
            y: -100,
            rotate: isLightToDark ? 45 : 135,
            scaleY: 0
          }}
          animate={{ 
            x: isLightToDark ? ['0%', '120%'] : ['100%', '-20%'],
            y: ['-60%', '60%'],
            rotate: isLightToDark ? 45 : 135,
            scaleY: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 0.7,
            ease: [0.87, 0, 0.13, 1]
          }}
        />

        {/* Sparkle effects along the slash */}
        {[...Array(20)].map((_, i) => {
          const baseLeft = isLightToDark ? 8 + i * 5.5 : 92 - i * 5.5
          const xDirection = isLightToDark ? (i % 2 ? 30 : -30) : (i % 2 ? -30 : 30)
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 3 === 0 ? '4px' : '3px',
                height: i % 3 === 0 ? '4px' : '3px',
                background: oldTheme === 'dark' ? '#F1F3F5' : '#121316',
                boxShadow: oldTheme === 'dark' 
                  ? '0 0 16px #F1F3F5, 0 0 28px rgba(241,243,245,0.8)'
                  : '0 0 16px #121316, 0 0 28px rgba(18,19,22,0.8)',
                left: `${baseLeft}%`,
                top: `${3 + i * 5}%`,
              }}
              initial={{ 
                opacity: 0,
                scale: 0,
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 2.5, 2.5, 0],
                x: [0, xDirection],
                y: [0, (i % 3 ? 30 : -30)],
                rotate: [0, 180]
              }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.02,
                ease: 'easeOut'
              }}
            />
          )
        })}

        {/* Energy burst particles */}
        {[...Array(8)].map((_, i) => {
          const baseLeft = isLightToDark ? 20 + i * 10 : 80 - i * 10
          const xDirection = isLightToDark ? (i % 2 ? -20 : 20) : (i % 2 ? 20 : -20)
          
          return (
            <motion.div
              key={`burst-${i}`}
              className="absolute"
              style={{
                width: '2px',
                height: '20px',
                background: oldTheme === 'dark' 
                  ? 'linear-gradient(to bottom, transparent, #F1F3F5, transparent)'
                  : 'linear-gradient(to bottom, transparent, #121316, transparent)',
                left: `${baseLeft}%`,
                top: `${15 + i * 8}%`,
                transformOrigin: 'center',
              }}
              initial={{ 
                opacity: 0,
                scale: 0,
                rotate: (isLightToDark ? 45 : 135) + (i * 45)
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: [xDirection],
                y: [(i % 3 ? -20 : 20)],
              }}
              transition={{ 
                duration: 0.6,
                delay: i * 0.025,
                ease: 'easeOut'
              }}
            />
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}

// Icon Components
function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}
