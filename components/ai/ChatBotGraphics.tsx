'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaBolt, FaProjectDiagram, FaEnvelopeOpenText, FaInfoCircle } from 'react-icons/fa';

interface ChatWatermarkProps {
  className?: string;
}

export function ChatWatermark({ className = '' }: ChatWatermarkProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.05] dark:opacity-[0.08] transition-opacity duration-300 z-0 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="chat-pat-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
          </pattern>
        </defs>

        {/* Drafting Grid */}
        <rect width="100%" height="100%" fill="url(#chat-pat-grid)" />

        {/* Neural Network Nodes & Pipeline Curves */}
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Central Orbit */}
          <circle cx="300" cy="380" r="140" strokeDasharray="6 4" />
          <circle cx="300" cy="380" r="80" strokeDasharray="3 3" />
          <ellipse cx="300" cy="380" rx="190" ry="60" strokeDasharray="4 4" transform="rotate(-25 300 380)" />

          {/* RAG Nodes */}
          <g transform="translate(100, 160)">
            <rect x="0" y="0" width="130" height="40" rx="6" />
            <text x="12" y="24" fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none">vec_search(query)</text>
          </g>
          <line x1="230" y1="180" x2="350" y2="180" strokeDasharray="3 2" />
          <circle cx="350" cy="180" r="4" fill="currentColor" />

          <g transform="translate(370, 160)">
            <rect x="0" y="0" width="130" height="40" rx="6" />
            <text x="12" y="24" fontSize="10" fontFamily="monospace" fill="currentColor" stroke="none">cosine_sim &gt; 0.88</text>
          </g>

          {/* Speech Synthesizer Waveform in Lower Watermark */}
          <path d="M 50,660 Q 110,610 170,660 T 290,660 T 410,660 T 530,660" strokeWidth="2" />
          <text x="50" y="700" fontSize="9" fontFamily="monospace" fill="currentColor" stroke="none">
            [TTS AUDIO STREAM // 24kHz HD NEURAL // LATENCY &lt;150ms]
          </text>
        </g>
      </svg>
    </div>
  );
}

interface ChatQuotaBadgeProps {
  remaining: number;
  total?: number;
  className?: string;
}

export function ChatQuotaBadge({ remaining, total = 15, className = '' }: ChatQuotaBadgeProps) {
  const percentage = Math.max(0, Math.min(100, (remaining / total) * 100));
  const isExhausted = remaining <= 0;
  const isLow = remaining <= 3 && !isExhausted;

  return (
    <div
      role="status"
      aria-label={`${remaining} of ${total} requests remaining in this session`}
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono border transition-all ${
        isExhausted
          ? 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300 font-semibold'
          : isLow
          ? 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 font-semibold'
          : 'bg-muted border-border text-foreground font-medium'
      } ${className}`}
      title={`${remaining} of ${total} requests remaining in this session`}
    >
      <FaBolt
        aria-hidden="true"
        className={`text-[9px] ${isExhausted ? 'text-rose-600 dark:text-rose-400' : 'text-accent'}`}
      />
      <span className="tracking-wide">
        <strong className="font-bold">{remaining}</strong> / {total} <span className="hidden sm:inline font-normal opacity-90">queries</span>
      </span>
      {/* Mini Progress Bar Gauge - with 3:1 Non-Text Contrast */}
      <div 
        role="progressbar"
        aria-valuenow={remaining}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Query quota meter"
        className="w-8 h-1.5 bg-border rounded-full overflow-hidden shrink-0"
      >
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isExhausted ? 'bg-rose-600 dark:bg-rose-400' : isLow ? 'bg-amber-600 dark:bg-amber-400' : 'bg-accent'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface ChatEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
  remaining: number;
}

export function ChatEmptyState({ onSelectPrompt, remaining }: ChatEmptyStateProps) {
  const samplePrompts = [
    {
      icon: <FaProjectDiagram aria-hidden="true" className="text-accent shrink-0" />,
      title: 'Featured Projects',
      prompt: 'What are your top featured projects and what tech stack did you use?'
    },
    {
      icon: <FaBrain aria-hidden="true" className="text-accent shrink-0" />,
      title: 'Context Engineering',
      prompt: 'Explain how you approach context engineering and LLM orchestration.'
    },
    {
      icon: <FaInfoCircle aria-hidden="true" className="text-accent shrink-0" />,
      title: 'Background & Skills',
      prompt: 'Can you summarize your background, experience, and core skills?'
    },
    {
      icon: <FaEnvelopeOpenText aria-hidden="true" className="text-accent shrink-0" />,
      title: 'Hire / Collaborate',
      prompt: 'How can I get in touch to collaborate on a project or hire you?'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 text-center select-none">
      {/* Animated AI Neural Core Graphic (aria-hidden) */}
      <div className="relative mb-5 flex items-center justify-center" aria-hidden="true">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-full border border-dashed border-accent/40 absolute motion-reduce:animate-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 rounded-full border border-dotted border-border/80 absolute motion-reduce:animate-none"
        />
        <div className="w-10 h-10 rounded-2xl bg-muted border border-border shadow-sm flex items-center justify-center relative z-10">
          <span className="text-xl text-accent select-none font-serif">✦</span>
        </div>
      </div>

      <h3 className="font-serif text-lg sm:text-xl text-foreground font-semibold mb-1">
        yhelAI Assistant
      </h3>
      <p className="text-xs font-mono text-muted-foreground tracking-wide mb-6 max-w-xs leading-relaxed">
        Context-engineered intelligence ready to answer questions about Arnel&apos;s portfolio and projects.
      </p>

      {/* Suggested Query Chips */}
      <div 
        role="region" 
        aria-label="Suggested initial conversation prompts"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md text-left"
      >
        {samplePrompts.map((item) => (
          <button
            key={item.title}
            type="button"
            disabled={remaining <= 0}
            onClick={() => onSelectPrompt(item.prompt)}
            aria-label={`Ask: ${item.prompt}`}
            className="group p-3 rounded-2xl bg-muted/70 hover:bg-muted border border-border hover:border-accent/60 transition-all duration-200 text-left flex flex-col justify-between shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none min-h-[44px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
                {item.title}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
              {item.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
