'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AIStatusState } from './types';
import { FaMicrophone, FaCompass, FaExclamationCircle } from 'react-icons/fa';

interface AIStatusProps {
  status: AIStatusState;
  activeActionLabel?: string;
}

export const AIStatus: React.FC<AIStatusProps> = ({ status, activeActionLabel }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'listening':
        return {
          label: 'LISTENING',
          icon: <FaMicrophone className="animate-pulse text-amber-500 text-[10px]" />,
          style: 'border-amber-500/40 text-amber-500 bg-amber-500/10'
        };
      case 'thinking':
        return {
          label: 'PROCESSING',
          icon: (
            <span className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-ping" />
            </span>
          ),
          style: 'border-border text-foreground bg-muted'
        };
      case 'speaking':
        return {
          label: 'SPEAKING',
          icon: (
            <span className="flex items-end gap-0.5 h-2.5">
              <motion.span
                animate={{ height: ['20%', '100%', '30%'] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
                className="w-0.5 bg-amber-500 rounded-full"
              />
              <motion.span
                animate={{ height: ['60%', '20%', '90%'] }}
                transition={{ repeat: Infinity, duration: 0.35 }}
                className="w-0.5 bg-amber-500 rounded-full"
              />
              <motion.span
                animate={{ height: ['30%', '90%', '40%'] }}
                transition={{ repeat: Infinity, duration: 0.45 }}
                className="w-0.5 bg-amber-500 rounded-full"
              />
            </span>
          ),
          style: 'border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10'
        };
      case 'navigating':
        return {
          label: activeActionLabel ? `NAV: ${activeActionLabel.toUpperCase()}` : 'NAVIGATING',
          icon: <FaCompass className="animate-spin text-foreground text-[10px]" />,
          style: 'border-border text-foreground bg-muted'
        };
      case 'error':
        return {
          label: 'OFFLINE',
          icon: <FaExclamationCircle className="text-rose-500 text-[10px]" />,
          style: 'border-rose-500/40 text-rose-500 bg-rose-500/10'
        };
      default: // idle
        return {
          label: 'ONLINE',
          icon: <span className="w-1.5 h-1.5 rounded-full bg-foreground" />,
          style: 'border-border text-muted-foreground bg-background'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-mono tracking-widest uppercase font-medium backdrop-blur-sm transition-all duration-300 shadow-sm ${config.style}`}
    >
      <div className="flex items-center justify-center">{config.icon}</div>
      <span>{config.label}</span>
    </motion.div>
  );
};

