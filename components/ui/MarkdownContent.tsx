'use client';

import React from 'react';

interface MarkdownContentProps {
  content: string;
  isUser?: boolean;
  className?: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  isUser = false,
  className = '',
}) => {
  if (!content) return null;

  // Render inline markdown: bold, italic, inline code, links, strikethrough
  const renderInline = (text: string, keyPrefix: string | number): React.ReactNode => {
    // Regex matching: ***bold italic***, **bold**, __bold__, `inline code`, [link](url), ~~strikethrough~~, *italic*
    const INLINE_REGEX =
      /(\*\*\*[^*]+?\*\*\*|\*\*[^*]+?\*\*|__[^_]+?__|`[^`]+`|\[[^\]]+\]\([^)]+\)|~~[^~]+?~~|\*[^*\s][^*]*?\*)/g;

    const parts = text.split(INLINE_REGEX);

    return parts.map((part, idx) => {
      const key = `${keyPrefix}-${idx}`;

      if (!part) return null;

      // Bold + Italic: ***text***
      if (part.startsWith('***') && part.endsWith('***') && part.length > 6) {
        return (
          <strong
            key={key}
            className={isUser ? 'font-bold text-white' : 'font-bold text-foreground dark:text-white'}
          >
            <em className="italic">{part.slice(3, -3)}</em>
          </strong>
        );
      }

      // Bold: **text** or __text__
      if (
        (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
        (part.startsWith('__') && part.endsWith('__') && part.length >= 4)
      ) {
        return (
          <strong
            key={key}
            className={isUser ? 'font-bold text-white' : 'font-bold text-foreground dark:text-white'}
          >
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline code: `code`
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code
            key={key}
            className={
              isUser
                ? 'px-1 py-0.5 rounded bg-white/20 text-white font-mono text-[11px]'
                : 'px-1.5 py-0.5 rounded bg-background/80 dark:bg-white/10 border border-border/70 dark:border-white/10 text-foreground font-mono text-[11px]'
            }
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Strikethrough: ~~text~~
      if (part.startsWith('~~') && part.endsWith('~~') && part.length >= 4) {
        return (
          <del key={key} className="line-through opacity-80">
            {part.slice(2, -2)}
          </del>
        );
      }

      // Links: [title](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={key}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isUser
                ? 'underline underline-offset-2 text-white hover:opacity-90 font-medium'
                : 'text-accent underline underline-offset-2 hover:brightness-110 font-medium'
            }
          >
            {linkMatch[1]}
          </a>
        );
      }

      // Italic: *text*
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return (
          <em key={key} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }

      return <React.Fragment key={key}>{part}</React.Fragment>;
    });
  };

  // Block-level parsing
  const rawLines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent: string[] = [];

  rawLines.forEach((line, index) => {
    // Check for code block fences ```
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
        codeBlockContent = [];
        return;
      } else {
        inCodeBlock = false;
        elements.push(
          <pre
            key={`codeblock-${index}`}
            className="my-2 p-2.5 rounded-xl bg-black/85 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-white/10 leading-relaxed"
          >
            <code>{codeBlockContent.join('\n')}</code>
          </pre>
        );
        codeBlockContent = [];
        return;
      }
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h4
          key={`h4-${index}`}
          className={
            isUser
              ? 'font-bold text-xs uppercase tracking-wider text-white mt-2 mb-1'
              : 'font-mono text-xs font-bold uppercase tracking-wider text-foreground mt-2 mb-1'
          }
        >
          {renderInline(line.replace('### ', ''), index)}
        </h4>
      );
      return;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h3
          key={`h3-${index}`}
          className={
            isUser
              ? 'font-bold text-sm text-white mt-2 mb-1'
              : 'font-bold text-sm text-foreground mt-2 mb-1'
          }
        >
          {renderInline(line.replace('## ', ''), index)}
        </h3>
      );
      return;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h2
          key={`h2-${index}`}
          className={
            isUser
              ? 'font-bold text-base text-white mt-2 mb-1'
              : 'font-bold text-base text-foreground mt-2.5 mb-1'
          }
        >
          {renderInline(line.replace('# ', ''), index)}
        </h2>
      );
      return;
    }

    // Bullet lists: - item, * item, • item
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      elements.push(
        <div key={`bullet-${index}`} className="flex items-start gap-2 my-0.5 pl-0.5">
          <span className={`shrink-0 text-xs mt-0.5 ${isUser ? 'text-white' : 'text-accent'}`}>•</span>
          <span className="flex-1 leading-relaxed">{renderInline(bulletMatch[1], index)}</span>
        </div>
      );
      return;
    }

    // Numbered lists: 1. item, 2. item, etc.
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      elements.push(
        <div key={`num-${index}`} className="flex items-start gap-1.5 my-0.5 pl-0.5">
          <span
            className={`shrink-0 font-mono text-[11px] font-semibold mt-0.5 ${
              isUser ? 'text-white/80' : 'text-accent'
            }`}
          >
            {numMatch[1]}.
          </span>
          <span className="flex-1 leading-relaxed">{renderInline(numMatch[2], index)}</span>
        </div>
      );
      return;
    }

    // Empty lines (paragraph separation)
    if (!line.trim()) {
      elements.push(<div key={`blank-${index}`} className="h-1.5" />);
      return;
    }

    // Standard paragraph line
    elements.push(
      <p key={`p-${index}`} className="leading-relaxed my-0.5">
        {renderInline(line, index)}
      </p>
    );
  });

  // If unclosed code block during streaming
  if (inCodeBlock && codeBlockContent.length > 0) {
    elements.push(
      <pre
        key="unclosed-code"
        className="my-2 p-2.5 rounded-xl bg-black/85 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-white/10 leading-relaxed"
      >
        <code>{codeBlockContent.join('\n')}</code>
      </pre>
    );
  }

  return <div className={`space-y-0.5 ${className}`}>{elements}</div>;
};
