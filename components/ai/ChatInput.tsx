'use client';

import React, { useRef, useEffect } from 'react';
import { FaPaperPlane, FaStop } from 'react-icons/fa';
import { VoiceController } from './VoiceController';

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  voiceEnabled: boolean;
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
  onInputChange,
  onSubmit,
  onStop,
  onToggleListening,
  onToggleVoiceEnabled
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      if (input.trim() && !isStreaming) {
        onSubmit();
      }
    }
  };

  const handleTranscript = (transcript: string) => {
    onInputChange(transcript);
    // Submit voice input automatically if it ends with punctuation or after short pause
    if (transcript.trim().length > 3) {
      onSubmit(transcript);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 pt-2 border-t border-border">
      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px] font-mono">
        {SUGGESTIONS.map((sug, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSubmit(sug)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-background hover:bg-foreground hover:text-background text-muted-foreground hover:border-foreground border border-border transition-all duration-200 shadow-sm"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Box and Action Controls */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !isStreaming) onSubmit();
        }}
        className="flex items-end gap-2 bg-muted/40 border border-border rounded-2xl p-1.5 focus-within:border-foreground focus-within:ring-1 focus-within:ring-foreground/20 transition-all duration-200"
      >
        <VoiceController
          isListening={isListening}
          isSpeaking={isSpeaking}
          voiceEnabled={voiceEnabled}
          onTranscript={handleTranscript}
          onToggleListening={onToggleListening}
          onToggleVoiceEnabled={onToggleVoiceEnabled}
        />

        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? 'Listening to your voice...' : 'Ask yhelAI anything about Arnel...'}
          className="flex-1 max-h-32 bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none py-2 px-1 font-sans"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="p-2.5 rounded-xl bg-foreground text-background hover:opacity-80 transition-opacity"
            aria-label="Stop generation"
          >
            <FaStop className="text-xs" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              input.trim()
                ? 'bg-foreground text-background hover:opacity-90 hover:scale-105 shadow-sm'
                : 'bg-muted text-muted-foreground/40 cursor-not-allowed border border-border'
            }`}
            aria-label="Send message"
          >
            <FaPaperPlane className="text-xs" />
          </button>
        )}
      </form>
    </div>
  );
};

