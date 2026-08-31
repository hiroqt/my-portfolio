'use client';

import React, { useRef, useEffect } from 'react';
import { FaPaperPlane, FaStop, FaLock } from 'react-icons/fa';
import { VoiceController } from './VoiceController';
import { ChatQuotaBadge } from './ChatBotGraphics';

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  voiceEnabled: boolean;
  remainingQuota?: number;
  totalQuota?: number;
  onInputChange: (val: string) => void;
  onSubmit: (text?: string) => void;
  onStop: () => void;
  onToggleListening: () => void;
  onToggleVoiceEnabled: () => void;
}

const SUGGESTIONS = [
  'Overview of Arnel',
  'Featured Projects',
  'e Buddy Details',
  'Technical Skills',
  'Experience Timeline',
  'Contact Channels'
];

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isStreaming,
  isListening,
  isSpeaking,
  voiceEnabled,
  remainingQuota = 15,
  totalQuota = 15,
  onInputChange,
  onSubmit,
  onStop,
  onToggleListening,
  onToggleVoiceEnabled
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isQuotaExhausted = remainingQuota <= 0;

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isStreaming && !isQuotaExhausted) {
        onSubmit();
      }
    }
  };

  const handleTranscript = (transcript: string) => {
    if (isQuotaExhausted) return;
    onInputChange(transcript);
    // Submit voice input automatically if it ends with punctuation or after short pause
    if (transcript.trim().length > 3) {
      onSubmit(transcript);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 pt-2 border-t border-border">
      {/* Quick Prompt Chips & Quota Indicator */}
      <div 
        role="region" 
        aria-label="Quick question suggestions" 
        className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar text-[11px] font-mono"
      >
        <div className="flex items-center gap-1.5 shrink-0">
          {SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              type="button"
              disabled={isQuotaExhausted}
              onClick={() => onSubmit(sug)}
              aria-label={`Ask suggested query: ${sug}`}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-background hover:bg-muted text-muted-foreground hover:text-foreground hover:border-accent/40 border border-border transition-all duration-200 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none min-h-[32px]"
            >
              {sug}
            </button>
          ))}
        </div>
        <div className="shrink-0 hidden sm:block">
          <ChatQuotaBadge remaining={remainingQuota} total={totalQuota} />
        </div>
      </div>

      {/* Input Box and Action Controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !isStreaming && !isQuotaExhausted) onSubmit();
        }}
        aria-label="Send message to yhelAI"
        className={`flex items-end gap-2 bg-muted border rounded-2xl p-1.5 transition-all duration-200 ${
          isQuotaExhausted
            ? 'border-rose-500/30 opacity-80'
            : 'border-border focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20'
        }`}
      >
        <VoiceController
          isListening={isListening}
          isSpeaking={isSpeaking}
          voiceEnabled={voiceEnabled}
          onTranscript={handleTranscript}
          onToggleListening={onToggleListening}
          onToggleVoiceEnabled={onToggleVoiceEnabled}
        />

        <label htmlFor="chat-user-textarea" className="sr-only">
          Message yhelAI Assistant
        </label>

        <textarea
          id="chat-user-textarea"
          ref={textareaRef}
          value={input}
          disabled={isQuotaExhausted}
          aria-label="Type your message to yhelAI Assistant"
          aria-disabled={isQuotaExhausted}
          aria-describedby="quota-status-description"
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isQuotaExhausted
              ? 'Limit of 15 requests reached for this session.'
              : isListening
              ? 'Listening to voice query...'
              : 'Ask yhelAI anything (Enter to send)...'
          }
          rows={1}
          className="flex-1 bg-transparent border-0 resize-none outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 py-2 px-1 max-h-32 min-h-[36px] disabled:cursor-not-allowed focus-visible:outline-none"
        />

        <span id="quota-status-description" className="sr-only">
          {remainingQuota} out of {totalQuota} queries remaining in this session.
        </span>

        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="p-2.5 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
            title="Stop AI generation"
            aria-label="Stop AI generation"
          >
            <FaStop aria-hidden="true" className="text-xs text-rose-400" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim() || isQuotaExhausted}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center min-w-[40px] min-h-[40px] focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none ${
              input.trim() && !isQuotaExhausted
                ? 'bg-foreground text-background hover:scale-105 shadow-sm'
                : 'bg-muted text-muted-foreground/40 cursor-not-allowed'
            }`}
            title={isQuotaExhausted ? 'Quota reached (15/15)' : 'Send message'}
            aria-label={isQuotaExhausted ? 'Quota reached (15/15 requests used)' : 'Send message'}
          >
            {isQuotaExhausted ? (
              <FaLock aria-hidden="true" className="text-xs" />
            ) : (
              <FaPaperPlane aria-hidden="true" className="text-xs" />
            )}
          </button>
        )}
      </form>
    </div>
  );
};
