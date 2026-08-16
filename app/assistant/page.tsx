'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTrash, FaPaperPlane, FaStop, FaArrowRight } from 'react-icons/fa';
import { JARVISAvatar } from '@/components/ai/JARVISAvatar';
import { AIStatus } from '@/components/ai/AIStatus';
import { ChatMessage } from '@/components/ai/ChatMessage';
import { VoiceController, speakText, unlockAudio } from '@/components/ai/VoiceController';
import ThemeToggle from '@/components/ThemeToggle';
import { HeroGraphicBackground } from '@/components/HeroGraphicBackground';
import { ChatMessageData, AgentAction, AdaptivePersona } from '@/lib/ai/types';
import { AIStatusState } from '@/components/ai/types';
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cancelSpeechRef = useRef<(() => void) | null>(null);

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
    if (!textToSend.trim() || isStreaming) return;

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
                if (parsed.type === 'delta' && parsed.content) {
                  assistantContent += parsed.content;
                  setMessages(prev => {
                    const updated = [...prev];
                    const lastIdx = updated.length - 1;
                    if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
                      updated[lastIdx] = { ...updated[lastIdx], content: assistantContent };
                    }
                    return updated;
                  });
                } else if (parsed.type === 'action' && parsed.action) {
                  collectedActions.push(parsed.action);
                  executeAction(parsed.action);
                } else if (parsed.type === 'error') {
                  setError(parsed.error || 'An error occurred.');
                }
              } catch {
                // Ignore
              }
            }
          }
        }
      }

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

      if (voiceEnabled && assistantContent) {
        setStatus('speaking');
        setIsSpeaking(true);
        cancelSpeechRef.current = speakText(
          assistantContent,
          () => {
            setIsSpeaking(false);
            setStatus('idle');
          }
        );
      } else {
        setStatus('idle');
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream aborted by user');
      } else {
        console.error('Chat error:', err);
        setError(err.message || 'Failed to communicate with AI model.');
      }
      setStatus('idle');
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      setIsSpeaking(false);
    }
    setIsStreaming(false);
    setStatus('idle');
  };

  const isThinking = isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && !messages[messages.length - 1].content;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-foreground selection:text-background relative overflow-hidden">
      {/* Ambient Synchronized Graphic Artwork in Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 overflow-hidden">
        <HeroGraphicBackground variant="ambient" className="h-full" />
      </div>

      {/* Editorial HUD Header */}
      <header className="px-6 sm:px-10 py-4 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]"
          >
            <FaArrowLeft /> Exit HUD
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2.5">
            <JARVISAvatar status={status} size="sm" />
            <span className="font-mono font-bold text-xs sm:text-sm tracking-tight text-foreground">
              ✦ yhelAI TERMINAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AIStatus status={status} activeActionLabel={currentAction?.label} />

          <button
            onClick={() => setMessages([])}
            title="Clear Terminal"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <FaTrash className="text-xs" />
          </button>

          <ThemeToggle variant="header" />
        </div>
      </header>

      {/* Main Terminal Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col relative z-10">
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.length === 0 ? (
            <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center">
              <JARVISAvatar status="idle" size="xl" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-apoc font-bold mt-6 mb-3 tracking-tight text-foreground">
                yhelAI ASSISTANT
              </h1>
              <p className="text-sm sm:text-base font-sans text-muted-foreground max-w-lg mb-10 leading-relaxed">
                Autonomous RAG knowledge retrieval and voice interface for Arnel Baylon&apos;s personal portfolio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl">
                <button
                  onClick={() => sendMessage('Give me a full overview of Arnel')}
                  className="p-4 rounded-3xl border border-border bg-background hover:bg-muted text-left transition-all duration-300 hover:scale-[1.02] shadow-sm flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                      01 · PROFILE
                    </span>
                    <FaArrowRight className="text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-1">
                    Full Engineering Profile
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Background, education, focus areas, and career highlights.
                  </p>
                </button>

                <button
                  onClick={() => sendMessage('What is e Buddy and how does it work?')}
                  className="p-4 rounded-3xl border border-border bg-background hover:bg-muted text-left transition-all duration-300 hover:scale-[1.02] shadow-sm flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                      02 · HACKATHON
                    </span>
                    <FaArrowRight className="text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-1">
                    e Buddy Hackathon Entry
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    AI government services platform built for eGov Hackathon 2026.
                  </p>
                </button>

                <button
                  onClick={() => sendMessage('Show me your best projects')}
                  className="p-4 rounded-3xl border border-border bg-background hover:bg-muted text-left transition-all duration-300 hover:scale-[1.02] shadow-sm flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                      03 · SHOWCASE
                    </span>
                    <FaArrowRight className="text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-1">
                    Top Featured Projects
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    PaceMentor, Present Po, TMRC, and other client systems.
                  </p>
                </button>

                <button
                  onClick={() => sendMessage('Explain Arnel\'s experience with Groq and RAG')}
                  className="p-4 rounded-3xl border border-border bg-background hover:bg-muted text-left transition-all duration-300 hover:scale-[1.02] shadow-sm flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                      04 · EXPERTISE
                    </span>
                    <FaArrowRight className="text-xs text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-1">
                    AI & Context Engineering
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    RAG architecture, agent loops, and LLM orchestration.
                  </p>
                </button>
              </div>
            </div>
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
                  <div className="flex flex-col gap-1 z-10">
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
                      Retrieving portfolio vector context & formulating response...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Dock */}
        <div className="sticky bottom-6 bg-background/90 backdrop-blur-xl border border-border rounded-3xl p-3 sm:p-4 shadow-2xl focus-within:border-foreground focus-within:ring-1 focus-within:ring-foreground/20 transition-all duration-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-3"
          >
            <VoiceController
              isListening={isListening}
              isSpeaking={isSpeaking}
              voiceEnabled={voiceEnabled}
              onTranscript={(t) => {
                setInput(t);
                if (t.length > 3) sendMessage(t);
              }}
              onToggleListening={() => setIsListening(prev => !prev)}
              onToggleVoiceEnabled={() => setVoiceEnabled(prev => !prev)}
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask yhelAI anything, or speak via microphone..."
              className="flex-1 bg-transparent text-sm sm:text-base outline-none text-foreground placeholder:text-muted-foreground font-sans"
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
                disabled={!input.trim()}
                className={`p-3 rounded-2xl transition-all duration-200 ${
                  input.trim()
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

