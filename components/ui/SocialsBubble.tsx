'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTimes,
  FaExternalLinkAlt,
  FaCopy,
  FaCheck,
  FaShareAlt,
} from 'react-icons/fa'

interface SocialChannel {
  id: string
  name: string
  handle: string
  description: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  iconClass: string
  badgeBg: string
}

const socialChannels: SocialChannel[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@hiroqt',
    description: 'Open-source repos, swarms & tools',
    url: 'https://github.com/hiroqt',
    icon: FaGithub,
    iconClass: 'text-zinc-900 dark:text-zinc-100',
    badgeBg: 'bg-zinc-200/70 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-white/15',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Arnel Baylon',
    description: 'Professional experience & network',
    url: 'https://www.linkedin.com/in/arnel-baylon-b05233189',
    icon: FaLinkedin,
    iconClass: 'text-[#0A66C2]',
    badgeBg: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/25',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Arnel Baylon',
    description: 'Personal network & direct outreach',
    url: 'https://www.facebook.com/arnel.baylon.1650',
    icon: FaFacebook,
    iconClass: 'text-[#1877F2]',
    badgeBg: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/25',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@yheellll',
    description: 'Stories, lifestyle & creative highlights',
    url: 'https://www.instagram.com/yheellll',
    icon: FaInstagram,
    iconClass: 'text-[#E1306C]',
    badgeBg: 'bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/25',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@yheelllls',
    description: 'Tech shorts & development clips',
    url: 'https://www.tiktok.com/@yheelllls',
    icon: FaTiktok,
    iconClass: 'text-zinc-900 dark:text-cyan-400',
    badgeBg: 'bg-zinc-900/10 dark:bg-cyan-500/10 text-zinc-900 dark:text-cyan-400 border-zinc-400/25 dark:border-cyan-500/25',
  },
]

interface SocialsBubbleProps {
  isOpen: boolean
  onClose: () => void
}

export function SocialsBubble({ isOpen, onClose }: SocialsBubbleProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleCopy = (e: React.MouseEvent, channel: SocialChannel) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(channel.url)
    setCopiedId(channel.id)
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Mobile Backdrop (lg:hidden) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* ── Desktop Floating Bubble Container (Beside Sidebar Rail) ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.7, scaleY: 0.92, x: -25, y: '-50%' }}
            animate={{ opacity: 1, scaleX: 1, scaleY: 1, x: 0, y: '-50%' }}
            exit={{ opacity: 0, scaleX: 0.7, scaleY: 0.92, x: -25, y: '-50%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 26, delay: 0.05 }}
            style={{ transformOrigin: 'left center' }}
            className="hidden lg:flex fixed left-[68px] xl:left-[84px] 2xl:left-[100px] top-1/2 z-50 w-[380px] xl:w-[410px] flex-col rounded-2xl bg-background dark:bg-[#0c0e18] border border-border/80 dark:border-white/12 shadow-[0_25px_70px_rgba(0,0,0,0.45)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.85)] overflow-hidden font-sans select-none"
          >
            {/* ── Speech Bubble Tail pointing to the Sidebar Socials icon ── */}
            <div className="absolute -left-[6px] top-[72%] -translate-y-1/2 w-3 h-3 bg-background dark:bg-[#0c0e18] border-l border-b border-border/80 dark:border-white/15 rotate-45 shadow-[-2px_2px_4px_rgba(0,0,0,0.06)] pointer-events-none z-10" />

            {/* ── Bubble Header ── */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-border dark:border-white/10 bg-muted/90 dark:bg-[#121624]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-accent/15 dark:bg-accent/25 border border-accent/40 flex items-center justify-center text-accent">
                  <FaShareAlt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold tracking-tight text-foreground">
                      Social Channels
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-accent/15 text-accent border border-accent/30 font-semibold">
                      5 Profiles
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground leading-none mt-0.5">
                    Connect & follow across platforms
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                title="Close socials (Esc)"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── Channels List ── */}
            <div className="p-3 space-y-2 max-h-[430px] overflow-y-auto scrollbar-thin">
              {socialChannels.map((channel) => {
                const Icon = channel.icon
                const isCopied = copiedId === channel.id

                return (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between p-2.5 rounded-xl border border-border/50 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02] hover:bg-accent/10 dark:hover:bg-accent/[0.12] hover:border-accent/40 dark:hover:border-accent/40 transition-all duration-200 cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${channel.badgeBg}`}
                      >
                        <Icon className={`w-4 h-4 ${channel.iconClass}`} />
                      </div>
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-foreground group-hover:text-accent transition-colors">
                            {channel.name}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground truncate">
                            {channel.handle}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-muted-foreground leading-tight truncate mt-0.5">
                          {channel.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 pl-1">
                      {/* Copy Link Button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopy(e, channel)}
                        title={`Copy ${channel.name} profile link`}
                        className={`p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-white/10 transition-all cursor-pointer ${
                          isCopied ? 'text-emerald-500 hover:text-emerald-500' : ''
                        }`}
                      >
                        {isCopied ? (
                          <FaCheck className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <FaCopy className="w-3 h-3" />
                        )}
                      </button>

                      {/* Open Link Arrow */}
                      <div className="p-1.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <FaExternalLinkAlt className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* ── Bubble Footer ── */}
            <div className="px-4 py-2.5 border-t border-border dark:border-white/10 bg-muted/70 dark:bg-[#121624] flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">
                Arnel Baylon • Software Engineer
              </span>
              <span className="text-[10px] font-mono text-accent font-medium">
                Open to Collabs ↗
              </span>
            </div>
          </motion.div>

          {/* ── Mobile Bottom Sheet (lg:hidden) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="lg:hidden fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-50 max-w-md mx-auto max-h-[72vh] flex flex-col rounded-2xl bg-background dark:bg-[#0c0e18] border border-border dark:border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden font-sans select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-white/10 bg-muted/90 dark:bg-[#121624]">
              <div className="flex items-center gap-2">
                <FaShareAlt className="text-accent w-3.5 h-3.5" />
                <span className="font-mono text-xs font-bold text-foreground">
                  Social Channels
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Channel Items */}
            <div className="p-3 space-y-2 overflow-y-auto max-h-[360px] scrollbar-thin bg-background dark:bg-[#0c0e18]">
              {socialChannels.map((channel) => {
                const Icon = channel.icon
                const isCopied = copiedId === channel.id

                return (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-border/70 dark:border-white/10 bg-muted/50 dark:bg-[#121624] hover:bg-muted/80 dark:hover:bg-[#181d2e] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${channel.badgeBg}`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${channel.iconClass}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-foreground">
                            {channel.name}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground truncate">
                            {channel.handle}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {channel.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleCopy(e, channel)}
                        className="p-1.5 text-muted-foreground"
                      >
                        {isCopied ? (
                          <FaCheck className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <FaCopy className="w-3 h-3" />
                        )}
                      </button>
                      <FaExternalLinkAlt className="w-2.5 h-2.5 text-muted-foreground mr-1" />
                    </div>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
