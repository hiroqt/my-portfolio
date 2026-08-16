'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AIStatusState } from './types';

interface JARVISAvatarProps {
  status: AIStatusState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  sm: { container: 'w-7 h-7', core: 'w-3.5 h-3.5', ring1: 'w-6 h-6', ring2: 'w-7 h-7' },
  md: { container: 'w-10 h-10', core: 'w-5 h-5', ring1: 'w-8 h-8', ring2: 'w-10 h-10' },
  lg: { container: 'w-16 h-16', core: 'w-8 h-8', ring1: 'w-13 h-13', ring2: 'w-16 h-16' },
  xl: { container: 'w-24 h-24', core: 'w-12 h-12', ring1: 'w-20 h-20', ring2: 'w-24 h-24' },
};

export const JARVISAvatar: React.FC<JARVISAvatarProps> = ({
  status,
  size = 'md',
  interactive = false,
  onClick
}) => {
  const s = sizeMap[size];

  // Refined theme-aligned color dynamics based on status
  const getColorScheme = () => {
    switch (status) {
      case 'listening':
        return {
          core: 'bg-amber-500 text-black',
          glow: 'bg-amber-500/20',
          ring1: 'border-amber-500/40',
          ring2: 'border-dashed border-amber-500/60',
          wave: 'border-amber-500/40'
        };
      case 'thinking':
        return {
          core: 'bg-foreground text-background',
          glow: 'bg-foreground/15',
          ring1: 'border-foreground/60',
          ring2: 'border-dashed border-foreground/40',
          wave: 'border-foreground/30'
        };
      case 'speaking':
        return {
          core: 'bg-foreground text-background',
          glow: 'bg-amber-500/20',
          ring1: 'border-amber-500/50',
          ring2: 'border-dashed border-foreground/50',
          wave: 'border-amber-500/40'
        };
      case 'navigating':
        return {
          core: 'bg-foreground text-background',
          glow: 'bg-foreground/20',
          ring1: 'border-foreground/70',
          ring2: 'border-dashed border-foreground/50',
          wave: 'border-foreground/30'
        };
      case 'error':
        return {
          core: 'bg-rose-500 text-white',
          glow: 'bg-rose-500/20',
          ring1: 'border-rose-500/50',
          ring2: 'border-dashed border-rose-500/60',
          wave: 'border-rose-500/40'
        };
      default: // idle
        return {
          core: 'bg-foreground text-background',
          glow: 'bg-foreground/10',
          ring1: 'border-border',
          ring2: 'border-dashed border-foreground/30',
          wave: 'border-border'
        };
    }
  };

  const colors = getColorScheme();

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center ${s.container} ${interactive ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
    >
      {/* Soundwave Ripples (Active when speaking / thinking / listening) */}
      {(status === 'speaking' || status === 'thinking' || status === 'listening') && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.5, 1.9],
              opacity: [0.7, 0.25, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: status === 'speaking' ? 1.1 : 1.6,
              ease: 'easeOut'
            }}
            className={`absolute inset-0 rounded-full border ${colors.wave} pointer-events-none`}
          />
          <motion.div
            animate={{
              scale: [1, 1.7, 2.2],
              opacity: [0.5, 0.15, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: status === 'speaking' ? 1.1 : 1.6,
              delay: status === 'speaking' ? 0.35 : 0.6,
              ease: 'easeOut'
            }}
            className={`absolute inset-0 rounded-full border ${colors.wave} pointer-events-none`}
          />
        </>
      )}

      {/* Subtle background ambient halo */}
      <motion.div
        animate={{
          scale: status === 'listening' || status === 'speaking' ? [1, 1.3, 1] : status === 'thinking' ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: status === 'idle' ? 0.25 : 0.6
        }}
        transition={{
          repeat: Infinity,
          duration: status === 'thinking' ? 1 : status === 'speaking' ? 0.7 : 3,
          ease: 'easeInOut'
        }}
        className={`absolute inset-0 rounded-full blur-md ${colors.glow}`}
      />

      {/* Outer Rotating Dashed Geometric Ring */}
      <motion.div
        animate={{
          rotate: status === 'thinking' ? [0, 360] : status === 'speaking' ? [0, 180, 360] : [0, 360],
          scale: status === 'listening' ? [1, 1.08, 1] : status === 'speaking' ? [1, 1.04, 1] : 1
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: status === 'thinking' ? 2 : status === 'speaking' ? 4 : 12,
            ease: 'linear'
          },
          scale: {
            repeat: Infinity,
            duration: 0.8
          }
        }}
        className={`absolute ${s.ring2} rounded-full border ${colors.ring2}`}
      />

      {/* Inner Precision Arc */}
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: status === 'speaking' ? [0.94, 1.08, 0.94] : status === 'thinking' ? [0.92, 1.06, 0.92] : [0.96, 1.02, 0.96]
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: status === 'thinking' ? 2.5 : 14,
            ease: 'linear'
          },
          scale: {
            repeat: Infinity,
            duration: status === 'speaking' ? 0.4 : 2,
            ease: 'easeInOut'
          }
        }}
        className={`absolute ${s.ring1} rounded-full border ${colors.ring1}`}
      />

      {/* Minimalist Solid Core Orb */}
      <motion.div
        animate={{
          scale: status === 'speaking' ? [0.9, 1.15, 0.9] : status === 'thinking' ? [0.92, 1.08, 0.92] : status === 'listening' ? [1, 1.2, 1] : [1, 1.05, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: status === 'speaking' ? 0.35 : status === 'thinking' ? 0.8 : status === 'listening' ? 0.6 : 2.5,
          ease: 'easeInOut'
        }}
        className={`${s.core} rounded-full ${colors.core} flex items-center justify-center relative shadow-sm transition-colors duration-300`}
      >
        {/* Core spark icon / center dot */}
        <span className="text-[7px] leading-none font-mono font-bold select-none">✦</span>
      </motion.div>
    </div>
  );
};

