'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AIStatusState } from './types';
import { JARVISAvatar } from './JARVISAvatar';

interface ChatButtonProps {
  isOpen: boolean;
  status: AIStatusState;
  onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, status, onClick }) => {
  if (isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-6 right-6 z-40 group print:hidden"
    >
      {/* Tooltip on hover */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background border border-border text-foreground shadow-xl whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        <span className="font-handwriting text-lg font-bold">✦ yhelAI Assistant</span>
      </div>

      {/* Floating Interactive Orb Button */}
      <button
        onClick={onClick}
        aria-label="Open yhelAI Assistant"
        className="relative p-2.5 rounded-full bg-background dark:bg-muted border border-border hover:border-foreground shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <JARVISAvatar status={status} size="md" />
      </button>
    </motion.div>
  );
};

