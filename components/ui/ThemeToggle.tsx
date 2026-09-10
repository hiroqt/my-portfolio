'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThemeToggleProps {
  variant?: 'header' | 'sidebar'
  onToggle?: () => void
}

export default function ThemeToggle({ variant = 'header', onToggle }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'dark'
      setTheme(initialTheme)
      document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)

    if (onToggle) onToggle()
  }

  // Sidebar variant (mobile)
  if (variant === 'sidebar') {
    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-background/20 mt-6">
        <div className="text-left">
          <div className="text-xs font-mono text-background/50 uppercase tracking-widest">Theme</div>
          <div className="text-sm font-medium text-background mt-1">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-150 active:scale-90 bg-background/10 border border-background/30 hover:border-background/50 shadow-xs backdrop-blur-sm cursor-pointer"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <motion.div
                key="moon"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              >
                <MoonIcon className="text-background" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              >
                <SunIcon className="text-background" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    )
  }

  // Header variant (desktop)
  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 active:scale-90 glass border border-border/50 hover:border-border shadow-2xs cursor-pointer"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            <MoonIcon />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -45, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            <SunIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

// Icon Components
function MoonIcon({ className = 'text-foreground' }: { className?: string }) {
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
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon({ className = 'text-foreground' }: { className?: string }) {
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
      className={className}
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
