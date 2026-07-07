'use client';

import { useEffect, useState } from 'react';

export function TerminalIntro({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const terminalCommands = [
    '$ cd ~/portfolio',
    '$ git init',
    'Initialized empty Git repository in ~/portfolio/.git/',
    '$ npm install',
    '⠋ Installing dependencies...',
    '✓ Dependencies installed successfully',
    '$ npm run dev',
    '',
    '> portfolio@1.0.0 dev',
    '> next dev',
    '',
    '  ▲ Next.js 14.0.0',
    '  - Local:        http://localhost:3000',
    '  - Network:      http://192.168.1.1:3000',
    '',
    '✓ Ready in 2.1s',
    '$ open http://localhost:3000',
    'Loading portfolio...',
  ];

  useEffect(() => {
    if (currentLine < terminalCommands.length) {
      const isCommand = terminalCommands[currentLine].startsWith('$');
      const delay = isCommand ? 800 : 400; // Commands take longer to "type"

      const timer = setTimeout(() => {
        setLines(prev => [...prev, terminalCommands[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      // All lines shown, wait a moment then fade out
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentLine, terminalCommands, isComplete, onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-terminal-bg z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-4xl px-4">
        <div className="border-2 border-terminal-border bg-terminal-bg p-6 font-mono">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 pb-4 border-b border-terminal-border mb-4">
            <div className="w-3 h-3 border border-terminal-fg"></div>
            <div className="w-3 h-3 border border-terminal-fg"></div>
            <div className="w-3 h-3 border border-terminal-fg"></div>
            <span className="ml-4 text-terminal-gray text-sm">terminal</span>
          </div>

          {/* Terminal Content */}
          <div className="space-y-2 text-sm md:text-base">
            {lines.map((line, index) => (
              <div 
                key={index} 
                className={`${
                  line.startsWith('$') 
                    ? 'text-terminal-fg' 
                    : line.startsWith('✓') || line.startsWith('▲')
                    ? 'text-terminal-fg'
                    : line.startsWith('>')
                    ? 'text-terminal-gray'
                    : line.includes('http://') || line.includes('Loading')
                    ? 'text-terminal-fg'
                    : 'text-terminal-gray'
                }`}
              >
                {line}
                {index === lines.length - 1 && currentLine < terminalCommands.length && (
                  <span className="inline-block w-2 h-4 bg-terminal-fg ml-1 animate-pulse"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
