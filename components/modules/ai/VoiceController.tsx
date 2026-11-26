'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface VoiceControllerProps {
  isListening: boolean;
  isSpeaking: boolean;
  voiceEnabled: boolean;
  onTranscript: (text: string) => void;
  onToggleListening: () => void;
  onToggleVoiceEnabled: () => void;
}

// Global active audio & utterance references to prevent garbage collection and deadlock in Chrome
let activeAudioElement: HTMLAudioElement | null = null;
let activeAudioUrl: string | null = null;
let activeTtsAbortController: AbortController | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];
let sharedAudioContext: AudioContext | null = null;

function ensureVoicesLoaded(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
    return cachedVoices;
  }
  if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
  }
  return cachedVoices;
}

/**
 * Filter and select exclusively JARVIS-like male AI voices (excluding female voicepacks)
 */
function getJarvisVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  const englishVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
  
  // Female keywords and names to strictly filter out
  const femaleFilter = /(samantha|karen|victoria|zira|susan|hazel|siri|female|jenny|aria|moira|fiona|tessa|ava|serena|kate|allison|veena|stephanie|helena|catherine|emma|amy|olivia|clara|zoe|alice|shelley|linda)/i;
  
  const maleVoices = englishVoices.filter(v => !femaleFilter.test(v.name));

  // Prioritized list of high-fidelity JARVIS-style male voices
  const priorityMaleKeywords = [
    'brian',
    'ryan',
    'daniel',
    'george',
    'arthur',
    'guy',
    'oliver',
    'thomas',
    'david',
    'alex',
    'google uk english male',
    'google us english',
    'natural',
    'fred',
    'male'
  ];

  for (const keyword of priorityMaleKeywords) {
    const match = maleVoices.find(v => v.name.toLowerCase().includes(keyword));
    if (match) return match;
  }

  // Fallback to any non-female voice, or first available male candidate
  return maleVoices[0] || englishVoices.find(v => !femaleFilter.test(v.name)) || voices.find(v => !femaleFilter.test(v.name));
}

/**
 * Prime and unlock browser audio playback and AudioContext on initial user gesture (click/touch/key)
 */
export function unlockAudio(): void {
  if (typeof window === 'undefined') return;
  try {
    ensureVoicesLoaded();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      if (!sharedAudioContext) {
        sharedAudioContext = new AudioCtx();
      }
      if (sharedAudioContext.state === 'suspended') {
        sharedAudioContext.resume();
      }
      // Play 1ms silent buffer to establish trusted audio user activation
      const buffer = sharedAudioContext.createBuffer(1, 1, 22050);
      const source = sharedAudioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(sharedAudioContext.destination);
      source.start(0);
    }
  } catch {
    // Safe ignore
  }
}

export const VoiceController: React.FC<VoiceControllerProps> = ({
  isListening,
  isSpeaking,
  voiceEnabled,
  onTranscript,
  onToggleListening,
  onToggleVoiceEnabled
}) => {
  const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(isListening);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ensureVoicesLoaded();

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setHasSpeechRecognition(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          let isFinal = false;
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              isFinal = true;
            }
          }
          if (isFinal || event.results[event.results.length - 1]?.isFinal) {
            onTranscript(currentTranscript);
          }
        };

        recognition.onend = () => {
          if (isListeningRef.current) {
            onToggleListening();
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('[SpeechRecognition Error]:', event.error);
          if (isListeningRef.current) {
            onToggleListening();
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [onTranscript, onToggleListening]);

  // Handle listening state change
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        unlockAudio();
        recognitionRef.current.start();
      } catch {
        // Recognition might already be running
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch {
        // Safe ignore
      }
    }
  }, [isListening]);

  return (
    <div className="flex items-center gap-1">
      {/* Speech-to-Text Trigger */}
      {hasSpeechRecognition && (
        <button
          type="button"
          onClick={() => {
            unlockAudio();
            onToggleListening();
          }}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          className={`relative p-2 rounded-xl transition-all duration-200 ${
            isListening
              ? 'bg-amber-500 text-black shadow-sm scale-105'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          {isListening ? (
            <FaMicrophone className="text-xs animate-pulse" />
          ) : (
            <FaMicrophoneSlash className="text-xs" />
          )}

          {isListening && (
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute inset-0 rounded-xl border border-amber-500"
            />
          )}
        </button>
      )}

      {/* Text-to-Speech Output Mute Toggle */}
      <button
        type="button"
        onClick={() => {
          unlockAudio();
          onToggleVoiceEnabled();
        }}
        aria-label={voiceEnabled ? 'Mute AI voice output' : 'Enable AI voice output'}
        className={`p-2 rounded-xl transition-all duration-200 ${
          voiceEnabled
            ? isSpeaking
              ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30'
              : 'text-foreground hover:bg-muted'
            : 'text-muted-foreground/60 hover:text-foreground hover:bg-muted'
        }`}
      >
        {voiceEnabled ? (
          <FaVolumeUp className={`text-xs ${isSpeaking ? 'animate-pulse' : ''}`} />
        ) : (
          <FaVolumeMute className="text-xs" />
        )}
      </button>
    </div>
  );
};

/**
 * Summarize and naturalize responses for voice output,
 * ensuring complete, fluent spoken sentences without getting truncated prematurely.
 */
function summarizeForVoice(text: string): string {
  if (!text) return '';

  // 1. Strip emojis and special unicode symbols
  let clean = text
    .replace(/[\uD83C-\uD83E][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\u2300-\u23FF]|[\u2B50-\u2B55]/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/https?:\/\/\S+/gi, '');

  // 2. Transform metadata labels and acronyms into fluent natural speech
  clean = clean
    .replace(/\btech\s*stack\s*:\s*/gi, 'The tech stack includes ')
    .replace(/\bkey\s*(highlights|features)\s*:\s*/gi, 'Key highlights include ')
    .replace(/\b(project\s*name|slug|featured|abstract|category|tags|coursework|institution|institution\s*name)\s*:\s*/gi, '')
    .replace(/(^|\n|\.\s+)(project|summary|details)\s*:\s*/gi, '$1')
    .replace(/\((project|client project|hackathon entry|production|featured|lead architect & developer|486-hour internship)\)/gi, '')
    .replace(/\bGEAMH\b/g, 'G-E-A-M-H')
    .replace(/\bRAG\b/g, 'R-A-G')
    .replace(/\bHRIS\b/g, 'H-R-I-S')
    .replace(/\bSSO\b/g, 'S-S-O')
    .replace(/\bLLMs\b/gi, 'large language models')
    .replace(/\bLLM\b/gi, 'large language model')
    .replace(/\bB2B\b/gi, 'B to B')
    .replace(/\bQR\b/gi, 'Q-R');

  // 3. Remove navigation status cues from voice synthesis
  clean = clean
    .replace(/(opening the project showcase for you|opening the project details for you|navigating to the projects section|navigating to the skills section|taking you to the skills breakdown|navigating to the experience timeline|navigating to the education section|navigating to verified certifications|opening the contact form for you now|opening the contact form)\.?/gi, '');

  // 4. Strip markdown formatting characters and bullet markers
  clean = clean
    .replace(/[*_#~>\[\]\(\)]/g, '')
    .replace(/^\s*[-*•]\s+/gm, ', ')
    .replace(/\s*,\s*,\s*/g, ', ')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) return '';

  // Extract sentences while combining short exclamation openers (e.g., "Hello! Welcome...")
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) || [clean];

  let accumulated = '';
  let sentenceCount = 0;

  for (const s of sentences) {
    accumulated += (accumulated ? ' ' : '') + s.trim();
    sentenceCount++;
    // Keep accumulating until we have at least 2 full informative sentences or around 140+ chars
    if (accumulated.length >= 140 && sentenceCount >= 2) {
      break;
    }
    if (sentenceCount >= 3) {
      break;
    }
  }

  if (accumulated.length > 280) {
    accumulated = accumulated.substring(0, 270) + '...';
  }

  return accumulated || clean;
}

/**
 * High-Reliability Browser Speech Synthesis with Chrome deadlock fix
 */
function playWebSpeech(text: string, onEnd?: () => void): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return () => {};
  }

  const voiceText = summarizeForVoice(text);
  if (!voiceText) {
    onEnd?.();
    return () => {};
  }

  try {
    window.speechSynthesis.cancel();
  } catch {
    // Safe ignore
  }

  let isCancelled = false;

  // Small delay after cancel() to prevent Chrome speech synthesizer worker deadlock
  const timer = setTimeout(() => {
    if (isCancelled) return;

    try {
      window.speechSynthesis.resume();
      const utterance = new SpeechSynthesisUtterance(voiceText);
      utterance.rate = 1.05;
      utterance.pitch = 1.02;

      const voices = ensureVoicesLoaded();
      const preferredVoice = getJarvisVoice(voices);

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onend = () => {
        onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('[WebSpeech Error]:', e);
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('[WebSpeech Execution Failed]:', err);
      onEnd?.();
    }
  }, 25);

  return () => {
    isCancelled = true;
    clearTimeout(timer);
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Safe ignore
    }
  };
}

/**
 * Play Ultra-Realistic Microsoft Edge Neural TTS audio via /api/ai/tts,
 * with immediate automatic fallback to playWebSpeech if audio streaming is unavailable.
 */
function playNeuralSpeech(
  text: string,
  onEnd?: () => void,
  voice?: string
): () => void {
  if (typeof window === 'undefined') {
    onEnd?.();
    return () => {};
  }

  // Stop any currently playing speech or audio
  stopAllSpeech();

  const voiceText = summarizeForVoice(text);
  if (!voiceText) {
    onEnd?.();
    return () => {};
  }

  let isCancelled = false;
  let fallbackCancel: (() => void) | null = null;
  const abortController = new AbortController();
  activeTtsAbortController = abortController;

  fetch('/api/ai/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: voiceText, ...(voice ? { voice } : {}) }),
    signal: abortController.signal
  })
    .then(async res => {
      if (!res.ok) throw new Error(`Neural TTS API failed: ${res.status}`);
      const blob = await res.blob();
      if (isCancelled) return;

      stopAllSpeech();

      activeAudioUrl = URL.createObjectURL(blob);
      const audio = new Audio(activeAudioUrl);
      audio.preload = 'auto';
      activeAudioElement = audio;

      audio.onended = () => {
        if (activeAudioUrl) {
          URL.revokeObjectURL(activeAudioUrl);
          activeAudioUrl = null;
        }
        if (activeAudioElement === audio) {
          activeAudioElement = null;
        }
        onEnd?.();
      };

      audio.onerror = (e) => {
        console.warn('[Audio Playback Error, falling back to WebSpeech]:', e);
        if (activeAudioUrl) {
          URL.revokeObjectURL(activeAudioUrl);
          activeAudioUrl = null;
        }
        if (activeAudioElement === audio) {
          activeAudioElement = null;
        }
        fallbackCancel = playWebSpeech(voiceText, onEnd);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('[Autoplay blocked or playback error, falling back to WebSpeech]:', err);
          if (activeAudioUrl) {
            URL.revokeObjectURL(activeAudioUrl);
            activeAudioUrl = null;
          }
          if (activeAudioElement === audio) {
            activeAudioElement = null;
          }
          fallbackCancel = playWebSpeech(voiceText, onEnd);
        });
      }
    })
    .catch(err => {
      if (isCancelled) return;
      console.warn('[Neural TTS Fallback to WebSpeech]:', err.message);
      fallbackCancel = playWebSpeech(voiceText, onEnd);
    });

  return () => {
    isCancelled = true;
    abortController.abort();
    if (activeTtsAbortController === abortController) {
      activeTtsAbortController = null;
    }
    if (fallbackCancel) {
      fallbackCancel();
    }
    stopAllSpeech();
  };
}

/**
 * Stop any active audio and speech synthesis immediately
 */
function stopAllSpeech(): void {
  if (typeof window === 'undefined') return;

  if (activeTtsAbortController) {
    try {
      activeTtsAbortController.abort();
    } catch {
      // Safe ignore
    }
    activeTtsAbortController = null;
  }

  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement.src = '';
    } catch {
      // Safe ignore
    }
    activeAudioElement = null;
  }

  if (activeAudioUrl) {
    try {
      URL.revokeObjectURL(activeAudioUrl);
    } catch {
      // Safe ignore
    }
    activeAudioUrl = null;
  }

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Safe ignore
    }
  }
}

/**
 * Speak assistant responses using ElevenLabs or Microsoft Edge Neural TTS with automatic summarization
 */
export function speakText(text: string, onEnd?: () => void, voice?: string): () => void {
  unlockAudio();
  return playNeuralSpeech(text, onEnd, voice);
}
