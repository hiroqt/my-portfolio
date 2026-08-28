'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTrash, FaPaperPlane, FaStop, FaArrowRight } from 'react-icons/fa';
import { JARVISAvatar } from '@/components/modules/ai/JARVISAvatar';
import { AIStatus } from '@/components/modules/ai/AIStatus';
import { ChatMessage } from '@/components/modules/ai/ChatMessage';
import { VoiceController, speakText, unlockAudio } from '@/components/modules/ai/VoiceController';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { HeroGraphicBackground } from '@/components/ui/HeroGraphicBackground';
import { ChatWatermark, ChatQuotaBadge, ChatEmptyState } from '@/components/modules/ai/ChatBotGraphics';
import { ChatMessageData, AgentAction, AdaptivePersona } from '@/lib/ai/types';
import { AIStatusState } from '@/components/modules/ai/types';
import { useRouter } from 'next/navigation';

export default function AssistantPage() {
  const router = useRouter();
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

  // Rate Limiting (15 requests per user)
  const [remainingQuota, setRemainingQuota] = useState<number>(15);
  const [totalQuota, setTotalQuota] = useState<number>(15);

  const messagesEndRef = useRef<HTMLDivElement>(null);
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const executeAction = (action: AgentAction) => {
    setStatus('navigating');
    setCurrentAction(action);

    setTimeout(() => {
      if (action.type === 'open_project' && action.projectId) {
        router.push(`/projects/${action.projectId}`);
      } else if (action.type === 'navigate' || action.type === 'scroll_to_section' || action.type === 'open_contact') {
        const targetId = action.sectionId || action.destination || (action.type === 'open_contact' ? 'contact' : '');
        router.push(`/#${targetId}`);
      }
      setTimeout(() => {
        setStatus('idle');
        setCurrentAction(null);
      }, 1500);
    }, 500);
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
                if (parsed.type === 'meta') {
                  if (typeof parsed.remaining === 'number') {
                    setRemainingQuota(parsed.remaining);
                  }
                  if (typeof parsed.total === 'number') {
                    setTotalQuota(parsed.total);
                  }
                } else if (parsed.type === 'delta' && parsed.content) {
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
                  setError(parsed.error || 'Generation error.');
                }
              } catch {}
            }
          }
        }
      }

      if (buffer.trim()) {
        const trimmedLine = buffer.trim();
        if (trimmedLine.startsWith('data:')) {
          const dataStr = trimmedLine.replace(/^data:\s*/, '');
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.type === 'delta' && parsed.content) {
              assistantContent += parsed.content;
            }
          } catch {}
        }
      }

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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background relative">
      {/* Background Graphic HUD Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <HeroGraphicBackground variant="ambient" />
      </div>

      {/* Top Header Deck */}
      <header className="px-6 py-4 border-b border-border flex items-center justify-between backdrop-blur-md bg-background/80 relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Portfolio</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2.5">
            <JARVISAvatar status={status} size="sm" />
            <div className="flex flex-col">
              <span className="font-mono font-bold text-xs sm:text-sm tracking-tight text-foreground">
                ✦ yhelAI
              </span>
              <span className="text-[10px] font-mono text-muted-foreground tracking-tight">
                {status === 'thinking' ? 'Analyzing...' : status === 'speaking' ? 'Speaking...' : `${remainingQuota}/${totalQuota} queries`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages([])}
            title="Clear Terminal"
            aria-label="Clear Terminal messages"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <FaTrash className="text-xs" />
          </button>

          <ThemeToggle variant="header" />
        </div>
      </header>

      {/* Main Terminal Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col relative z-10">
        <div className="relative flex-1 overflow-y-auto space-y-4 mb-6 p-4 sm:p-6 rounded-3xl bg-background/60 border border-border/60 shadow-sm">
          {/* Architectural Watermark Graphics */}
          <ChatWatermark />

          <div className="relative z-10">
            {messages.length === 0 ? (
              <ChatEmptyState onSelectPrompt={sendMessage} remaining={remainingQuota} />
            ) : (
              <>
                {messages.map((m, idx) => (
                  <ChatMessage
                    key={idx}
                    message={m}
                    isStreaming={isStreaming && idx === messages.length - 1 && m.role === 'assistant'}
                    isSpeaking={isSpeaking && idx === messages.length - 1 && m.role === 'assistant'}
                    onExecuteAction={executeAction}
                  />
                ))}

                {/* Minimalist Data Loading State */}
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative overflow-hidden flex items-center gap-3.5 p-4 my-2.5 rounded-2xl bg-muted/80 border border-border max-w-[88%] shadow-sm"
                  >
                    <JARVISAvatar status="thinking" size="sm" />
                    <div className="flex flex-col gap-0.5 z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-foreground font-semibold tracking-widest uppercase">
                          PROCESSING QUERY
                        </span>
                        <span className="flex gap-1">
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
                        Retrieving portfolio vector context & formulating response...
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Input Dock */}
        <div className={`sticky bottom-6 bg-background/90 backdrop-blur-xl border rounded-3xl p-3 sm:p-4 shadow-2xl transition-all duration-200 ${
          isQuotaExhausted ? 'border-rose-500/30' : 'border-border focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20'
        }`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isQuotaExhausted) sendMessage();
            }}
            className="flex items-center gap-3"
          >
            <VoiceController
              isListening={isListening}
              isSpeaking={isSpeaking}
              voiceEnabled={voiceEnabled}
              onTranscript={(t) => {
                if (isQuotaExhausted) return;
                setInput(t);
                if (t.length > 3) sendMessage(t);
              }}
              onToggleListening={() => setIsListening(prev => !prev)}
              onToggleVoiceEnabled={() => setVoiceEnabled(prev => !prev)}
            />

            <input
              type="text"
              value={input}
              disabled={isQuotaExhausted}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isQuotaExhausted
                  ? 'Limit of 15 requests reached for this session.'
                  : 'Ask yhelAI anything, or speak via microphone...'
              }
              className="flex-1 bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground font-sans disabled:cursor-not-allowed"
            />

            {isStreaming ? (
              <button
                type="button"
                onClick={() => {
                  abortControllerRef.current?.abort();
                  setIsStreaming(false);
                  setStatus('idle');
                }}
                className="p-3 rounded-2xl bg-foreground text-background hover:opacity-80 transition-opacity"
                aria-label="Stop response"
              >
                <FaStop />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || isQuotaExhausted}
                className={`p-3 rounded-2xl transition-all duration-200 ${
                  input.trim() && !isQuotaExhausted
                    ? 'bg-foreground text-background hover:opacity-90 hover:scale-105 shadow-sm'
                    : 'bg-muted text-muted-foreground/40 cursor-not-allowed border border-border'
                }`}
                aria-label="Send query"
              >
                <FaPaperPlane />
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

