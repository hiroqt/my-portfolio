'use client';

import { useEffect, useState, useRef } from 'react';

interface RotatingTypingTextProps {
  words: string[];
  delay?: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  onFirstComplete?: () => void;
}

export function RotatingTypingText({
  words,
  delay = 0,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = '',
  onFirstComplete
}: RotatingTypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const onFirstCompleteRef = useRef(onFirstComplete);

  useEffect(() => {
    onFirstCompleteRef.current = onFirstComplete;
  }, [onFirstComplete]);

  useEffect(() => {
    let isActive = true;
    let hasCalledFirstComplete = false;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const animate = async () => {
      if (delay > 0) {
        await sleep(delay);
      }

      let currentIndex = 0;

      while (isActive) {
        const currentWord = words[currentIndex];

        // Type word
        for (let i = 0; i <= currentWord.length; i++) {
          if (!isActive) return;
          setDisplayedText(currentWord.substring(0, i));
          if (i < currentWord.length) {
            await sleep(typingSpeed);
          }
        }

        // Trigger onFirstComplete when the first word finishes typing
        if (currentIndex === 0 && !hasCalledFirstComplete) {
          hasCalledFirstComplete = true;
          onFirstCompleteRef.current?.();
        }

        // Pause at the end of word
        await sleep(pauseDuration);

        if (!isActive) return;

        // Delete word
        for (let i = currentWord.length; i >= 0; i--) {
          if (!isActive) return;
          setDisplayedText(currentWord.substring(0, i));
          if (i > 0) {
            await sleep(deletingSpeed);
          }
        }

        // Move to next word
        currentIndex = (currentIndex + 1) % words.length;
        
        // Small pause before typing next word
        await sleep(200);
      }
    };

    animate();

    return () => {
      isActive = false;
    };
  }, [words, delay, typingSpeed, deletingSpeed, pauseDuration]);


  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-[3px] h-[0.9em] bg-terminal-fg ml-[2px] animate-pulse align-middle"></span>
    </span>
  );
}
