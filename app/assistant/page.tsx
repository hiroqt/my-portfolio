'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChatMessage } from '@/components/modules/ai/ChatMessage';
import { VoiceController, speakText, unlockAudio } from '@/components/modules/ai/VoiceController';
import { useTheme } from '@/components/ThemeProvider';
import styles from './Assistant.module.css';
import { ChatMessageData, AgentAction, AdaptivePersona } from '@/lib/ai/types';
import { AIStatusState } from '@/components/modules/ai/types';
import { useRouter } from 'next/navigation';

export default function AssistantPage() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [status, setStatus] = useState<AIStatusState>('idle');
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [persona, setPersona] = useState<AdaptivePersona>('default');
  const [error, setError] = useState<string | null>(null);

  // Rate Limiting (15 requests per user)
  const [remainingQuota, setRemainingQuota] = useState<number>(15);
  const [totalQuota, setTotalQuota] = useState<number>(15);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatViewportRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cancelSpeechRef = useRef<(() => void) | null>(null);

  // Fetch initial rate limit status on mount
  useEffect(() => {
    fetch('/api/ai/chat')
      .then(res => res.json())
      .then(data => {
        if (typeof data.remaining === 'number') {
          setRemainingQuota(data.remaining);
          setTotalQuota(data.total || 15);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const viewport = chatViewportRef.current;
    if (!viewport || !shouldAutoScrollRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    viewport.scrollTo({ top: messages.length ? viewport.scrollHeight : 0, behavior: reduceMotion || isStreaming ? 'auto' : 'smooth' });
  }, [messages, isStreaming]);

  useEffect(() => () => {
    abortControllerRef.current?.abort();
    cancelSpeechRef.current?.();
  }, []);

  const executeAction = (action: AgentAction) => {
    let destination: string | null = null;
    if (action.type === 'open_project' && action.projectId) {
      destination = `/projects/${action.projectId}`;
    } else if (action.type === 'navigate' || action.type === 'scroll_to_section' || action.type === 'open_contact') {
      const requestedTarget = action.sectionId || action.destination || (action.type === 'open_contact' ? 'contact' : 'home');
      const targetId = action.destination === 'about' ? 'about' : requestedTarget === 'home' ? 'hero' : requestedTarget;
      destination = `/#${targetId}`;
    }
    if (destination) {
      setStatus('navigating');
      router.push(destination);
    }
  };

  const sendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isStreaming || remainingQuota <= 0) return;

    // Synchronously unlock browser audio context on user action if available
    if (typeof unlockAudio === 'function') {
      unlockAudio();
    }

    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      setIsSpeaking(false);
    }

    shouldAutoScrollRef.current = true;

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

    const botMsg: ChatMessageData = {
      role: 'assistant',
      content: '',
      timestamp: Date.now()
    };
    setMessages([...newMessages, botMsg]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          persona,
          voiceEnabled
        }),
        signal: controller.signal
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        if (res.status === 429) {
          setRemainingQuota(0);
        }
        throw new Error(errJson.error || `Server responded with ${res.status}`);
      }

      if (!res.body) throw new Error('No readable stream available.');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      const collectedActions: AgentAction[] = [];
      let buffer = '';

      const applyStreamEvent = (dataStr: string) => {
        if (!dataStr || dataStr === '[DONE]') return;
        try {
          const parsed = JSON.parse(dataStr);
          if (parsed.type === 'meta') {
            if (typeof parsed.remaining === 'number') setRemainingQuota(parsed.remaining);
            if (typeof parsed.total === 'number') setTotalQuota(parsed.total);
          } else if (parsed.type === 'delta' && parsed.content) {
            assistantContent += parsed.content;
            const content = assistantContent;
            setMessages(previous => {
              const updated = [...previous];
              const lastIndex = updated.length - 1;
              if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
                updated[lastIndex] = { ...updated[lastIndex], content };
              }
              return updated;
            });
          } else if (parsed.type === 'action' && parsed.action) {
            const action = parsed.action as AgentAction;
            const alreadyAdded = collectedActions.some(existing =>
              existing.type === action.type && existing.projectId === action.projectId &&
              existing.sectionId === action.sectionId && existing.destination === action.destination &&
              existing.skillName === action.skillName
            );
            if (!alreadyAdded) collectedActions.push(action);
            const actions = [...collectedActions];
            setMessages(previous => {
              const updated = [...previous];
              const lastIndex = updated.length - 1;
              if (lastIndex >= 0 && updated[lastIndex].role === 'assistant') {
                updated[lastIndex] = { ...updated[lastIndex], actions };
              }
              return updated;
            });
          } else if (parsed.type === 'error') {
            setError(parsed.error || 'Generation error.');
          }
        } catch {}
      };

      const applyRawEvent = (rawEvent: string) => {
        for (const line of rawEvent.split('\n')) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data:')) applyStreamEvent(trimmedLine.replace(/^data:\s*/, ''));
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const rawEvents = buffer.split(/\n\n+/);
        buffer = rawEvents.pop() || '';
        for (const rawEvent of rawEvents) applyRawEvent(rawEvent);
      }
      buffer += decoder.decode();
      if (buffer.trim()) applyRawEvent(buffer);

      setStatus('idle');

      if (voiceEnabled && assistantContent.trim()) {
        setIsSpeaking(true);
        setStatus('speaking');
        cancelSpeechRef.current = speakText(
          assistantContent,
          () => {
            setIsSpeaking(false);
            setStatus('idle');
          }
        );
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An error occurred.');
        setStatus('error');
      } else {
        setStatus('idle');
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const isThinking = isStreaming && messages.length > 0 && !messages[messages.length - 1].content;
  const isQuotaExhausted = remainingQuota <= 0;
  const statusLabel = isListening ? 'Listening' : isSpeaking ? 'Speaking' : status === 'navigating'
    ? 'Opening the portfolio'
    : isThinking ? 'Thinking' : isStreaming ? 'Writing' : status === 'error' ? 'Needs attention' : 'Ready when you are';
  const suggestedPrompts = [
    { label: 'Explore the projects', detail: 'What I built, and the tools behind it.', prompt: 'What projects has Arnel built?' },
    { label: 'How I approach AI', detail: 'Context engineering, explained simply.', prompt: 'Explain how you approach context engineering and LLM orchestration.' },
    { label: 'Work together', detail: 'A good starting point for your idea.', prompt: 'How can I get in touch to collaborate on a project or hire you?' }
  ];

  const clearConversation = () => {
    abortControllerRef.current?.abort();
    cancelSpeechRef.current?.();
    setMessages([]);
    setInput('');
    setError(null);
    setIsStreaming(false);
    setIsSpeaking(false);
    setIsListening(false);
    setStatus('idle');
    shouldAutoScrollRef.current = true;
  };

  return (
    <div className={`portfolio-grain ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.backLink}><span aria-hidden="true">←</span> Arnel Baylon</Link>
          <span className={styles.headerLabel}>AI assistant</span>
          <div className={styles.headerActions}>
            <button type="button" onClick={clearConversation} disabled={messages.length === 0 && !error} className={styles.clearButton}>Clear chat</button>
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className={styles.themeButton}
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <span aria-hidden="true">{resolvedTheme === 'dark' ? '☀' : '◐'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="About this assistant">
          <div>
            <span className={styles.eyebrow}>A conversation with yhelAI</span>
            <h2>A shortcut to<br />knowing my work.</h2>
            <p>Projects, the thinking behind them, and how we could work together.</p>
          </div>
          <div className={styles.capabilities}>
            <span className={styles.eyebrow}>Good places to start</span>
            <ul><li>Project walkthroughs</li><li>Experience & skills</li><li>Contact & collaboration</li></ul>
          </div>
          <label className={styles.stylePicker}>
            <span className={styles.eyebrow}>Answer style</span>
            <select value={persona} onChange={event => setPersona(event.target.value as AdaptivePersona)} disabled={isStreaming}>
              <option value="default">Natural</option>
              <option value="concise">Brief</option>
              <option value="developer">Technical</option>
              <option value="recruiter">Hiring</option>
              <option value="client">Collaboration</option>
            </select>
          </label>
          <div className={styles.sidebarFoot}>
            <div className={styles.quota}><strong>{remainingQuota}</strong><span>of {totalQuota} questions left</span></div>
            <p>Conversation history stays in this tab. Clearing the chat keeps your request limit.</p>
            <Link href="/#contact" className={styles.contactLink}>Prefer a real conversation? <span aria-hidden="true">↗</span></Link>
          </div>
        </aside>

        <main id="main-content" className={styles.main} tabIndex={-1}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>Ask away</span>
            <h1>A little more about me.</h1>
            <p>Ask about my work, projects, or how we could work together.</p>
          </div>

          <div className={styles.conversation}>
            <div className={styles.conversationHeader}>
              <span>Current conversation</span>
              <span className={styles.status} role="status"><span className={styles.statusDot} data-error={status === 'error'} aria-hidden="true" />{statusLabel}</span>
            </div>
            <div
              ref={chatViewportRef}
              className={styles.chatViewport}
              role="region"
              aria-label="Conversation messages"
              tabIndex={0}
              onScroll={event => {
                const viewport = event.currentTarget;
                shouldAutoScrollRef.current = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 100;
              }}
            >
              {messages.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.startLabel}>Start wherever you’re curious.</p>
                  <div className={styles.suggestions} aria-label="Suggested questions">
                    {suggestedPrompts.map((suggestion, index) => (
                      <button key={suggestion.label} type="button" disabled={isQuotaExhausted || isStreaming} onClick={() => sendMessage(suggestion.prompt)} className={styles.suggestion}>
                        <span className={styles.promptNumber} aria-hidden="true">0{index + 1}</span>
                        <span><strong>{suggestion.label}</strong><small>{suggestion.detail}</small></span>
                        <span className={styles.promptArrow} aria-hidden="true">↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.messages}>
                  {messages.map((message, index) => (
                    <div key={message.timestamp ? `${message.timestamp}-${index}` : index} className={styles.message}>
                      <ChatMessage
                        message={message}
                        isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
                        isSpeaking={isSpeaking && index === messages.length - 1 && message.role === 'assistant'}
                        onExecuteAction={executeAction}
                      />
                    </div>
                  ))}
                  {isThinking && <p className={styles.thinking} role="status">Looking through my work…</p>}
                  <div ref={messagesEndRef} />
                </div>
              )}
              {error && <div className={styles.error} role="alert">{error}</div>}
              {isQuotaExhausted && <p className={styles.limitNotice} role="status">You’ve reached the question limit. Try again when the quota resets, or <Link href="/#contact">contact me directly</Link>.</p>}
            </div>
          </div>

          <div className={styles.composerArea}>
            <form
              onSubmit={event => {
                event.preventDefault();
                if (!isQuotaExhausted) sendMessage();
              }}
              className={styles.composer}
              data-exhausted={isQuotaExhausted}
            >
              <label htmlFor="assistant-question" className={styles.visuallyHidden}>Your question</label>
              <input
                id="assistant-question"
                type="text"
                value={input}
                disabled={isQuotaExhausted}
                onChange={event => setInput(event.target.value)}
                placeholder={isQuotaExhausted ? 'Question limit reached.' : 'What would you like to know?'}
                autoComplete="off"
                className={styles.input}
              />
              <div className={styles.composerControls}>
                <div className={styles.voiceControls}>
                  <VoiceController
                    isListening={isListening}
                    isSpeaking={isSpeaking}
                    voiceEnabled={voiceEnabled}
                    onTranscript={transcript => {
                      if (isQuotaExhausted) return;
                      setInput(transcript);
                      if (transcript.length > 3) sendMessage(transcript);
                    }}
                    onToggleListening={() => setIsListening(previous => !previous)}
                    onToggleVoiceEnabled={() => setVoiceEnabled(previous => !previous)}
                  />
                </div>
                {isStreaming ? (
                  <button type="button" className={styles.sendButton} onClick={() => {
                    abortControllerRef.current?.abort();
                    setIsStreaming(false);
                    setStatus('idle');
                  }} aria-label="Stop response"><span aria-hidden="true">■</span></button>
                ) : (
                  <button type="submit" disabled={!input.trim() || isQuotaExhausted} className={styles.sendButton} aria-label="Send question"><span aria-hidden="true">↑</span></button>
                )}
              </div>
            </form>
            <div className={styles.composerHint}><span>Type a question or use the voice controls.</span><span>{remainingQuota}/{totalQuota} questions</span></div>
          </div>
        </main>
      </div>
    </div>
  );
}
