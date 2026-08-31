'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessageData, AgentAction, AdaptivePersona } from '@/lib/ai/types';
import { AIStatusState } from './types';
import { JARVISAvatar } from './JARVISAvatar';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatWatermark, ChatEmptyState } from './ChatBotGraphics';
import { FaTimes, FaTrash, FaExpandAlt, FaCompressAlt, FaExclamationTriangle } from 'react-icons/fa';

interface ChatWindowProps {
  isOpen: boolean;
  isExpanded: boolean;
  status: AIStatusState;
  messages: ChatMessageData[];
  input: string;
  isStreaming: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  voiceEnabled: boolean;
  persona: AdaptivePersona;
  currentAction?: AgentAction | null;
  error?: string | null;
  remainingQuota?: number;
  totalQuota?: number;
  onClose: () => void;
  onToggleExpand: () => void;
  onClear: () => void;
  onInputChange: (val: string) => void;
  onSubmit: (text?: string) => void;
  onStop: () => void;
  onToggleListening: () => void;
  onToggleVoiceEnabled: () => void;
  onSelectPersona: (p: AdaptivePersona) => void;
  onExecuteAction: (action: AgentAction) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isExpanded,
  status,
  messages,
  input,
  isStreaming,
  isListening,
  isSpeaking,
  voiceEnabled,
  persona,
  currentAction,
  error,
  remainingQuota = 15,
  totalQuota = 15,
  onClose,
  onToggleExpand,
  onClear,
  onInputChange,
  onSubmit,
  onStop,
  onToggleListening,
  onToggleVoiceEnabled,
  onSelectPersona,
  onExecuteAction
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const isQuotaExhausted = remainingQuota <= 0;

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming, currentAction]);

  // Handle Escape key to close dialog (WCAG 2.1.2)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isThinking = isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && !messages[messages.length - 1].content;

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal={isExpanded}
        aria-label="yhelAI Chatbot Assistant"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className={`fixed z-[80] shadow-2xl bg-background border border-border flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded
            ? 'inset-3 sm:inset-6 md:inset-10 rounded-3xl'
            : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[440px] md:w-[470px] h-[580px] sm:h-[620px] rounded-3xl'
        }`}
      >
        {/* HUD Architectural Corner Brackets (aria-hidden) */}
        <div aria-hidden="true" className="absolute top-2 left-2 text-[10px] font-mono text-muted-foreground/30 pointer-events-none select-none">
          ⌜ HUD.SYS
        </div>
        <div aria-hidden="true" className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground/30 pointer-events-none select-none">
          ⌝
        </div>
        <div aria-hidden="true" className="absolute bottom-2 left-2 text-[10px] font-mono text-muted-foreground/30 pointer-events-none select-none">
          ⌞
        </div>
        <div aria-hidden="true" className="absolute bottom-2 right-2 text-[10px] font-mono text-muted-foreground/30 pointer-events-none select-none">
          ⌟
        </div>

        {/* Screen Reader Live Announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isThinking
            ? 'yhelAI is analyzing portfolio context.'
            : isSpeaking
            ? 'yhelAI is speaking response.'
            : isQuotaExhausted
            ? 'Usage limit reached (15/15 requests used).'
            : ''}
        </div>

        {/* Streamlined, Decluttered Header HUD (Solid Background) */}
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-background relative z-10">
          {/* Identity & Live Status Line */}
          <div className="flex items-center gap-2.5">
            <JARVISAvatar status={status} size="sm" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-handwriting font-bold text-xl sm:text-2xl text-foreground tracking-wide leading-none">
                  ✦ yhelAI
                </span>
                {status !== 'idle' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                )}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground tracking-tight flex items-center gap-1 mt-0.5">
                {status === 'thinking'
                  ? 'Analyzing context...'
                  : status === 'speaking'
                  ? 'Speaking response...'
                  : status === 'navigating'
                  ? (currentAction?.label || 'Navigating...')
                  : `${remainingQuota}/${totalQuota} queries remaining`}
              </span>
            </div>
          </div>

          {/* Clean Controls Suite */}
          <div className="flex items-center gap-1">
            <button
              onClick={onClear}
              title="Clear conversation history"
              aria-label="Clear conversation history"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none min-w-[34px] min-h-[34px] flex items-center justify-center"
            >
              <FaTrash aria-hidden="true" className="text-xs" />
            </button>

            <button
              onClick={onToggleExpand}
              title={isExpanded ? 'Minimize chat window' : 'Expand chat window'}
              aria-label={isExpanded ? 'Minimize chat window' : 'Expand chat window'}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors hidden sm:flex items-center justify-center focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none min-w-[34px] min-h-[34px]"
            >
              {isExpanded ? (
                <FaCompressAlt aria-hidden="true" className="text-xs" />
              ) : (
                <FaExpandAlt aria-hidden="true" className="text-xs" />
              )}
            </button>

            <button
              onClick={onClose}
              title="Close chat assistant"
              aria-label="Close chat assistant"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none min-w-[34px] min-h-[34px] flex items-center justify-center"
            >
              <FaTimes aria-hidden="true" className="text-sm" />
            </button>
          </div>
        </header>

        {/* Navigation / Action Indicator Banner */}
        {currentAction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="status"
            aria-live="polite"
            className="px-4 py-2 bg-muted border-b border-border flex items-center justify-between text-xs font-mono text-foreground relative z-10"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-foreground animate-ping" />
              <span>{currentAction.label || `Navigating to ${currentAction.destination || currentAction.projectId}`}</span>
            </span>
            <button
              onClick={() => onExecuteAction(currentAction)}
              aria-label={`Execute action: ${currentAction.label || 'Navigate'}`}
              className="px-3 py-1 rounded-full bg-foreground text-background text-[11px] font-bold font-mono uppercase hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none min-h-[32px]"
            >
              Execute
            </button>
          </motion.div>
        )}

        {/* Quota Exhausted Warning Banner */}
        {isQuotaExhausted && (
          <div 
            role="alert"
            className="px-4 py-2.5 bg-rose-500/15 border-b border-rose-500/30 text-xs font-mono text-rose-700 dark:text-rose-300 flex items-center gap-2 relative z-10"
          >
            <FaExclamationTriangle aria-hidden="true" className="text-xs shrink-0 text-rose-600 dark:text-rose-400" />
            <span>Usage limit reached (15/15 requests used). The session quota will reset shortly.</span>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div 
            role="alert"
            className="px-4 py-2.5 bg-rose-500/15 border-b border-rose-500/30 text-xs font-mono text-rose-700 dark:text-rose-300 relative z-10"
          >
            {error}
          </div>
        )}

        {/* Message Stream Scroll Area with Watermark Vector Canvas */}
        <main 
          role="log"
          aria-label="Chat messages history"
          aria-live="polite"
          className="relative flex-1 overflow-y-auto p-4 sm:p-5 space-y-2 bg-[image:radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:24px_24px]"
        >
          {/* Architectural Vector Watermark Graphics */}
          <ChatWatermark />

          {/* Message List or Empty State */}
          <div className="relative z-10">
            {messages.length === 0 ? (
              <ChatEmptyState onSelectPrompt={onSubmit} remaining={remainingQuota} />
            ) : (
              <>
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    message={msg}
                    isStreaming={isStreaming && index === messages.length - 1 && msg.role === 'assistant'}
                    isSpeaking={isSpeaking && index === messages.length - 1 && msg.role === 'assistant'}
                    onExecuteAction={onExecuteAction}
                  />
                ))}

                {/* Data Loading State */}
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    role="status"
                    aria-label="Analyzing portfolio context"
                    className="relative overflow-hidden flex items-center gap-3 p-3.5 my-2.5 rounded-2xl bg-muted/90 border border-border max-w-[88%] shadow-sm"
                  >
                    <JARVISAvatar status="thinking" size="sm" />
                    <div className="flex flex-col gap-0.5 z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-foreground font-semibold tracking-widest uppercase">
                          ANALYZING CONTEXT
                        </span>
                        <span className="flex gap-1" aria-hidden="true">
                          <motion.span
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            className="w-1.5 h-1.5 rounded-full bg-accent"
                          />
                          <motion.span
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-accent"
                          />
                          <motion.span
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="w-1.5 h-1.5 rounded-full bg-accent"
                          />
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground tracking-tight">
                        Retrieving portfolio vector context...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </main>

        {/* Input Footer (Solid Background) */}
        <footer className="p-3 sm:p-4 bg-background border-t border-border relative z-10">
          <ChatInput
            input={input}
            isStreaming={isStreaming}
            isListening={isListening}
            isSpeaking={isSpeaking}
            voiceEnabled={voiceEnabled}
            remainingQuota={remainingQuota}
            totalQuota={totalQuota}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onStop={onStop}
            onToggleListening={onToggleListening}
            onToggleVoiceEnabled={onToggleVoiceEnabled}
          />
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
