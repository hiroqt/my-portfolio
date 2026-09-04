'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatMessageData, AgentAction } from '@/lib/ai/types';
import { JARVISAvatar } from './JARVISAvatar';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import { FaUser, FaCheck, FaCopy, FaExternalLinkAlt, FaCompass } from 'react-icons/fa';

interface ChatMessageProps {
  message: ChatMessageData;
  isStreaming?: boolean;
  isSpeaking?: boolean;
  onExecuteAction?: (action: AgentAction) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isStreaming = false,
  isSpeaking = false,
  onExecuteAction
}) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group flex gap-2.5 my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 pt-0.5">
        {isUser ? (
          <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-[11px] shadow-sm">
            <FaUser />
          </div>
        ) : (
          <JARVISAvatar status={isSpeaking ? 'speaking' : isStreaming ? 'thinking' : 'idle'} size="sm" />
        )}
      </div>

      {/* Message Bubble Container */}
      <div className={`max-w-[88%] sm:max-w-[82%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Header (Role + Copy + Audio indicator) */}
        <div className="flex items-center gap-2 mb-1 px-1 text-[10px] font-mono text-muted-foreground">
          <span className="font-medium">
            {isUser ? 'YOU' : '✦ yhelAI'}
          </span>

          {!isUser && message.content && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-0.5 rounded"
              aria-label="Copy message"
            >
              {copied ? <FaCheck className="text-emerald-500 text-[10px]" /> : <FaCopy className="text-[10px]" />}
            </button>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm border transition-all duration-200 ${
            isUser
              ? 'bg-foreground text-background border-transparent rounded-tr-sm'
              : 'bg-muted border-border text-foreground rounded-tl-sm'
          }`}
        >
          <MarkdownContent content={message.content} isUser={isUser} />

          {/* Streaming Cursor Pulse */}
          {!isUser && isStreaming && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-3.5 ml-1 bg-foreground rounded-sm align-middle"
            />
          )}

          {/* Action Chips */}
          {message.actions && message.actions.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-border flex flex-wrap gap-2">
              {message.actions.map((act, idx) => (
                <button
                  key={idx}
                  onClick={() => onExecuteAction?.(act)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-medium bg-background hover:bg-foreground hover:text-background text-foreground border border-border hover:border-foreground transition-all duration-200 shadow-sm hover:scale-105"
                >
                  <FaCompass className="text-[10px]" />
                  <span>{act.label || act.destination || act.projectId || 'Open'}</span>
                  <FaExternalLinkAlt className="text-[9px] opacity-70" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

