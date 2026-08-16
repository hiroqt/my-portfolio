'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessageData, AgentAction, AdaptivePersona } from '@/lib/ai/types';
import { AIStatusState } from './types';
import { JARVISAvatar } from './JARVISAvatar';
import { AIStatus } from './AIStatus';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { FaTimes, FaTrash, FaExpandAlt, FaCompressAlt, FaArrowRight } from 'react-icons/fa';

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

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming, currentAction]);

  if (!isOpen) return null;

  const isThinking = isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && !messages[messages.length - 1].content;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className={`fixed z-[80] shadow-2xl backdrop-blur-2xl bg-background/95 border border-border flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded
            ? 'inset-3 sm:inset-6 md:inset-10 rounded-3xl'
            : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[440px] md:w-[480px] h-[580px] sm:h-[620px] rounded-3xl'
        }`}
      >
        {/* Header HUD */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <JARVISAvatar status={status} size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs sm:text-sm text-foreground tracking-tight flex items-center gap-1.5">
                  ✦ yhelAI
                </span>
                <AIStatus status={status} activeActionLabel={currentAction?.label} />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={onClear}
              title="Clear conversation"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <FaTrash className="text-xs" />
            </button>

            <button
              onClick={onToggleExpand}
              title={isExpanded ? 'Minimize' : 'Expand'}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors hidden sm:block"
            >
              {isExpanded ? <FaCompressAlt className="text-xs" /> : <FaExpandAlt className="text-xs" />}
            </button>

            <button
              onClick={onClose}
              title="Close Assistant"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>

        {/* Navigation / Action Indicator Banner */}
        {currentAction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 bg-muted border-b border-border flex items-center justify-between text-xs font-mono text-foreground"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-ping" />
              <span>{currentAction.label || `Navigating to ${currentAction.destination || currentAction.projectId}`}</span>
            </span>
            <button
              onClick={() => onExecuteAction(currentAction)}
              className="px-2.5 py-0.5 rounded-full bg-foreground text-background text-[10px] font-bold font-mono uppercase hover:opacity-80 transition-opacity"
            >
              Execute
            </button>
          </motion.div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="px-4 py-2 bg-rose-500/10 border-b border-rose-500/30 text-xs font-mono text-rose-500">
            {error}
          </div>
        )}

        {/* Message Stream Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2 bg-[image:radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:24px_24px]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground">
              <JARVISAvatar status="idle" size="lg" />
              <h3 className="font-display text-lg text-foreground font-bold mt-4 mb-1">
                Greetings. I am yhelAI.
              </h3>
              <p className="text-xs max-w-xs text-muted-foreground leading-relaxed mb-6">
                Ask me about Arnel&apos;s projects, engineering background, technical skills, or tell me where you&apos;d like to navigate.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-sm">
                <button
                  onClick={() => onSubmit('What projects have you built?')}
                  className="p-3 rounded-2xl border border-border bg-background hover:bg-muted text-left text-xs font-mono text-foreground hover:border-foreground transition-all duration-200 shadow-sm hover:scale-[1.02] flex items-center justify-between group"
                >
                  <span>Explore Projects</span>
                  <FaArrowRight className="text-[9px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-muted-foreground" />
                </button>
                <button
                  onClick={() => onSubmit('Tell me about e Buddy')}
                  className="p-3 rounded-2xl border border-border bg-background hover:bg-muted text-left text-xs font-mono text-foreground hover:border-foreground transition-all duration-200 shadow-sm hover:scale-[1.02] flex items-center justify-between group"
                >
                  <span>eGov Hackathon 2026</span>
                  <FaArrowRight className="text-[9px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-muted-foreground" />
                </button>
                <button
                  onClick={() => onSubmit('What is your tech stack?')}
                  className="p-3 rounded-2xl border border-border bg-background hover:bg-muted text-left text-xs font-mono text-foreground hover:border-foreground transition-all duration-200 shadow-sm hover:scale-[1.02] flex items-center justify-between group"
                >
                  <span>Technical Skills</span>
                  <FaArrowRight className="text-[9px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-muted-foreground" />
                </button>
                <button
                  onClick={() => onSubmit('How can I contact Arnel?')}
                  className="p-3 rounded-2xl border border-border bg-background hover:bg-muted text-left text-xs font-mono text-foreground hover:border-foreground transition-all duration-200 shadow-sm hover:scale-[1.02] flex items-center justify-between group"
                >
                  <span>Contact Channels</span>
                  <FaArrowRight className="text-[9px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-muted-foreground" />
                </button>
              </div>
            </div>
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

              {/* Minimalist Data Loading State */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative overflow-hidden flex items-center gap-3 p-3.5 my-2.5 rounded-2xl bg-muted/80 border border-border max-w-[88%] shadow-sm"
                >
                  <JARVISAvatar status="thinking" size="sm" />
                  <div className="flex flex-col gap-0.5 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-foreground font-semibold tracking-widest uppercase">
                        ANALYZING CONTEXT
                      </span>
                      <span className="flex gap-1">
                        <motion.span
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                          className="w-1.5 h-1.5 rounded-full bg-foreground"
                        />
                        <motion.span
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-foreground"
                        />
                        <motion.span
                          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          className="w-1.5 h-1.5 rounded-full bg-foreground"
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

        {/* Input Footer */}
        <div className="p-3 sm:p-4 bg-background/90 backdrop-blur-md border-t border-border">
          <ChatInput
            input={input}
            isStreaming={isStreaming}
            isListening={isListening}
            isSpeaking={isSpeaking}
            voiceEnabled={voiceEnabled}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onStop={onStop}
            onToggleListening={onToggleListening}
            onToggleVoiceEnabled={onToggleVoiceEnabled}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

