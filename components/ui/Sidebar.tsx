'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFilePdf, FaBars, FaTimes, FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'

const contactLinks = [
  { label: 'Email', href: 'mailto:arnelbaylon15@gmail.com', icon: <FaEnvelope /> },
  { label: 'GitHub', href: 'https://github.com/hiroqt', icon: <FaGithub /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnel-baylon-b05233189', icon: <FaLinkedin /> },
  { label: 'Facebook', href: 'https://www.facebook.com/arnel.baylon.1650', icon: <FaFacebook /> },
  { label: 'Instagram', href: 'https://www.instagram.com/yheellll?igsh=MWYxMDZlMzYzNXA2dw', icon: <FaInstagram /> },
]

const navItems = [
  { id: '01', label: 'skills & arsenal', href: '#skills' },
  { id: '02', label: 'certifications', href: '#certifications' },
  { id: '03', label: 'experience', href: '#experience' },
  { id: '04', label: 'pixel crew swarm', href: '#pixelcrew' },
  { id: '05', label: 'featured work', href: '#projects' },
  { id: '06', label: 'other systems', href: '#other-projects' },
  { id: '07', label: 'education', href: '#education' },
  { id: '08', label: 'visual gallery', href: '#gallery' },
  { id: '09', label: 'get in touch', href: '#contact' },
  { id: '✦', label: 'yhelAI Assistant', href: '/assistant' },
]

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent scroll when sidebar is open & add Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      {/* Top Header Controls: Theme Toggle & Sidebar Trigger */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2 sm:gap-3 print:hidden">
        <ThemeToggle variant="header" />
        <button
          onClick={() => setIsOpen(true)}
          className="p-2.5 rounded-full glass border border-border/50 hover:border-border text-foreground hover:text-muted-foreground transition-all duration-300 hover:scale-110 shadow-sm"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
          aria-controls="sidebar-navigation"
        >
          <FaBars className="text-lg" aria-hidden="true" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[90]"
            />
            
            {/* Sidebar Content */}
            <motion.aside
              id="sidebar-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l border-border z-[100] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <a href="#main-content" onClick={() => setIsOpen(false)} className="font-handwriting font-bold text-foreground text-4xl hover:text-accent transition-colors tracking-tight">
                  Nel.
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close Navigation Menu"
                >
                  <FaTimes className="text-2xl" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <nav className="flex flex-col gap-3" aria-label="Sidebar Sections">
                  <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Navigation</h2>
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-3 py-1 text-foreground hover:text-accent transition-colors"
                    >
                      <span className="text-xs font-mono text-muted-foreground tabular-nums group-hover:text-accent transition-colors">{item.id}</span>
                      <span className="font-handwriting font-bold text-2xl sm:text-3xl capitalize tracking-wide group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </a>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-6 pt-6 border-t border-border">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Connect</h2>
                    <div className="flex gap-5">
                      {contactLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                          rel="noreferrer"
                          aria-label={item.href.startsWith('mailto:') ? item.label : `${item.label} (opens in new tab)`}
                          className="text-foreground hover:text-accent transition-all duration-300 text-xl hover:scale-110"
                        >
                          {item.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Theme</span>
                    <ThemeToggle variant="header" />
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
