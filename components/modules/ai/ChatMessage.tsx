'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChatMessageData, AgentAction } from '@/lib/ai/types';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: ChatMessageData;
  isStreaming?: boolean;
  isSpeaking?: boolean;
  onExecuteAction?: (action: AgentAction) => void;
}

export function ChatMessage({
  message,
  isStreaming = false,
  isSpeaking = false,
  onExecuteAction
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    setCopyState('idle');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(message.content);
      if (!isMountedRef.current) return;
      setCopyState('copied');
    } catch {
      if (!isMountedRef.current) return;
      setCopyState('error');
    }
    if (isMountedRef.current) {
      copyTimeoutRef.current = setTimeout(() => setCopyState('idle'), 2400);
    }
  };

  const copyFeedback = copyState === 'copied' ? 'Response copied.'
    : copyState === 'error' ? 'Could not copy. You can select and copy the response text.' : '';

  return (
    <article className={`${styles.message} ${isUser ? styles.user : styles.assistant}`} aria-label={isUser ? 'Your question' : 'Assistant response'}>
      <div className={styles.header}>
        <span className={styles.role}>{isUser ? 'You' : 'yhelAI'}{isSpeaking && <span className={styles.speaking}> · Speaking</span>}</span>
        {!isUser && message.content && (
          <button type="button" onClick={handleCopy} className={styles.copyButton} aria-label="Copy response">
            {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Try copying again' : 'Copy response'}
          </button>
        )}
      </div>
      <div className={styles.body}>
        <MarkdownContent content={message.content} isUser={isUser} className={styles.content} />
        {!isUser && isStreaming && <span className={styles.cursor} aria-hidden="true" />}
        {message.actions && message.actions.length > 0 && (
          <div className={styles.actions} aria-label="Suggested next steps">
            {message.actions.map((action, index) => (
              <button key={`${action.type}-${index}`} type="button" onClick={() => onExecuteAction?.(action)} className={styles.actionButton} disabled={!onExecuteAction}>
                <span>{action.label || action.destination || action.projectId || action.sectionId || 'Open'}</span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <span className={copyState === 'error' ? styles.copyError : styles.visuallyHidden} role="status">{copyFeedback}</span>
    </article>
  );
}
