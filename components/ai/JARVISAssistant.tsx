'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChatMessageData, AgentAction, AdaptivePersona, UIContext } from '@/lib/ai/types';
import { AIStatusState } from './types';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { speakText, unlockAudio } from './VoiceController';

export const JARVISAssistant: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState<AIStatusState>('idle');
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [persona, setPersona] = useState<AdaptivePersona>('default');
  const [currentAction, setCurrentAction] = useState<AgentAction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState<string>('top');
  const abortControllerRef = useRef<AbortController | null>(null);
  const cancelSpeechRef = useRef<(() => void) | null>(null);

  // Observe active visible section on page for UI context awareness
  useEffect(() => {
    const sections = ['education', 'experience', 'projects', 'skills', 'certifications', 'gallery', 'github', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Execute agentic action (Navigation / Project Opening / Contact Scroll)
  const executeAction = useCallback((action: AgentAction) => {
    setStatus('navigating');
    setCurrentAction(action);

    setTimeout(() => {
      if (action.type === 'open_project' && action.projectId) {
        router.push(`/projects/${action.projectId}`);
      } else if (action.type === 'navigate' || action.type === 'scroll_to_section' || action.type === 'open_contact') {
        const targetId = action.sectionId || action.destination || (action.type === 'open_contact' ? 'contact' : '');
        if (pathname !== '/') {
          router.push(`/#${targetId}`);
        } else if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
      setTimeout(() => {
        setStatus('idle');
        setCurrentAction(null);
      }, 1500);
    }, 500);
  }, [router, pathname]);

  // Send message to AI endpoint
  const sendMessage = useCallback(async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isStreaming) return;

    // Synchronously unlock browser audio context on user action if available
    if (typeof unlockAudio === 'function') {
      unlockAudio();
    }

    // Interrupt any ongoing speech
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      setIsSpeaking(false);
    }

    const userMsg: ChatMessageData = {
      role: 'user',
      content: textToSend.trim(),
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);
    setStatus('thinking');
    setError(null);

    const uiContext: UIContext = {
      currentPage: pathname,
      activeSection,
      activeProject: pathname.startsWith('/projects/') ? pathname.replace('/projects/', '') : undefined
    };

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          uiContext,
          persona
        }),
        signal: abortController.signal
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response stream not readable');

      const decoder = new TextDecoder();
      let assistantContent = '';
      let collectedActions: AgentAction[] = [];

      // Add placeholder assistant message
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '',
          timestamp: Date.now()
        }
      ]);

      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const rawEvents = buffer.split(/\n\n+/);
        buffer = rawEvents.pop() || '';

        for (const rawEvent of rawEvents) {
          const lines = rawEvent.split('\n');
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data:')) {
              const dataStr = trimmedLine.replace(/^data:\s*/, '');
              if (!dataStr || dataStr === '[DONE]') continue;

              try {
                const parsed = JSON.parse(dataStr);

                if (parsed.type === 'delta' && parsed.content) {
                  assistantContent += parsed.content;
                  setMessages(prev => {
                    const updated = [...prev];
                    const lastIdx = updated.length - 1;
                    if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
                      updated[lastIdx] = {
                        ...updated[lastIdx],
                        content: assistantContent
                      };
                    }
                    return updated;
                  });
                } else if (parsed.type === 'action' && parsed.action) {
                  collectedActions.push(parsed.action);
                  executeAction(parsed.action);
                } else if (parsed.type === 'error') {
                  setError(parsed.error || 'An error occurred during generation.');
                }
              } catch {
                // Ignore partial JSON parse errors
              }
            }
          }
        }
      }

      // Flush remaining buffer if present
      if (buffer.trim()) {
        const lines = buffer.split('\n');
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data:')) {
            const dataStr = trimmedLine.replace(/^data:\s*/, '');
            if (dataStr && dataStr !== '[DONE]') {
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.type === 'delta' && parsed.content) {
                  assistantContent += parsed.content;
                } else if (parsed.type === 'action' && parsed.action) {
                  collectedActions.push(parsed.action);
                  executeAction(parsed.action);
                }
              } catch {
                // Ignore
              }
            }
          }
        }
      }

      // Finalize assistant message with actions
      setMessages(prev => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
          updated[lastIdx] = {
            ...updated[lastIdx],
            content: assistantContent,
            actions: collectedActions
          };
        }
        return updated;
      });

      // Spoken voice response with automatic summarization if voice is enabled
      if (voiceEnabled && assistantContent) {
        setStatus('speaking');
        setIsSpeaking(true);
        cancelSpeechRef.current = speakText(assistantContent, () => {
          setIsSpeaking(false);
          setStatus('idle');
        });
      } else {
        setStatus('idle');
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('[Chat Error]:', err);
        setError(err.message || 'Failed to get response from yhelAI.');
        setStatus('error');
      } else {
        setStatus('idle');
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [input, isStreaming, messages, pathname, activeSection, persona, voiceEnabled, executeAction]);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      setStatus('idle');
    }
  };

  const clearMessages = () => {
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      setIsSpeaking(false);
    }
    setMessages([]);
    setError(null);
    setCurrentAction(null);
    setStatus('idle');
  };

  return (
    <>
      <ChatButton
        isOpen={isOpen}
        status={status}
        onClick={() => setIsOpen(true)}
      />

      <ChatWindow
        isOpen={isOpen}
        isExpanded={isExpanded}
        status={status}
        messages={messages}
        input={input}
        isStreaming={isStreaming}
        isListening={isListening}
        isSpeaking={isSpeaking}
        voiceEnabled={voiceEnabled}
        persona={persona}
        currentAction={currentAction}
        error={error}
        onClose={() => setIsOpen(false)}
        onToggleExpand={() => setIsExpanded(prev => !prev)}
        onClear={clearMessages}
        onInputChange={setInput}
        onSubmit={sendMessage}
        onStop={stopGeneration}
        onToggleListening={() => setIsListening(prev => !prev)}
        onToggleVoiceEnabled={() => setVoiceEnabled(prev => !prev)}
        onSelectPersona={setPersona}
        onExecuteAction={executeAction}
      />
    </>
  );
};
