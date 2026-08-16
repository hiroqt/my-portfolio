import Groq from 'groq-sdk';
import { AdaptivePersona, AgentAction, ChatMessageData, UIContext } from './types';
import { buildSystemPrompt } from './prompt';
import { AI_TOOL_DEFINITIONS, executeTool } from './tools';
import { searchKnowledge } from '../rag/retrieval';
import { projectsData } from '../data/projects';

/**
 * Infer the user's communication style automatically if none is provided
 */
export function inferPersona(userText: string): AdaptivePersona {
  const text = userText.toLowerCase();

  if (text.includes('recruiter') || text.includes('hiring') || text.includes('interview') || text.includes('salary') || text.includes('resume') || text.includes('cv') || text.includes('open to work') || text.includes('hire him')) {
    return 'recruiter';
  }
  if (text.includes('client') || text.includes('quote') || text.includes('cost') || text.includes('price') || text.includes('build my') || text.includes('freelance') || text.includes('proposal') || text.includes('contract')) {
    return 'client';
  }
  if (text.includes('architecture') || text.includes('schema') || text.includes('latency') || text.includes('api') || text.includes('state') || text.includes('orm') || text.includes('docker') || text.includes('algorithm') || text.includes('sql') || text.includes('rag')) {
    return 'developer';
  }
  if (text.includes('short') || text.includes('brief') || text.includes('tldr') || text.includes('quick summary') || text.includes('in 1 sentence')) {
    return 'concise';
  }
  if (text.includes('yo') || text.includes('hey man') || text.includes('sup') || text.includes('cool') || text.includes('dude') || text.includes('bro')) {
    return 'casual';
  }

  return 'default';
}

import { synthesizeDynamicResponse } from './synthesizer';

/**
 * Local Grounded Dynamic Engine when Groq API Key is not provided
 */
export async function* runLocalHeuristicAgent(
  userQuery: string,
  persona: AdaptivePersona,
  uiContext?: UIContext,
  history: ChatMessageData[] = []
): AsyncGenerator<{ type: 'delta' | 'action' | 'done'; content?: string; action?: AgentAction }> {
  // 1. Realistic knowledge retrieval & processing delay (400ms - 600ms)
  const initialDelay = Math.floor(Math.random() * 200) + 400;
  await new Promise(r => setTimeout(r, initialDelay));

  const result = synthesizeDynamicResponse(userQuery, persona, uiContext, history);

  if (result.action) {
    yield { type: 'action', action: result.action };
  }

  // 2. Stream synthesized dynamic text with natural human-like cadence & punctuation pauses
  // Tokenize preserving word boundaries and newlines cleanly
  const tokens = result.text.match(/\S+|\n+/g) || [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isNewline = token.includes('\n');
    const chunk = (i === 0 || isNewline ? '' : ' ') + token;
    yield { type: 'delta', content: chunk };

    let delay = 22 + Math.floor(Math.random() * 10);
    if (isNewline) {
      delay += 80; // Paragraph / line break pause
    } else if (token.endsWith('.') || token.endsWith('!') || token.endsWith('?')) {
      delay += 120; // Sentence boundary pause
    } else if (token.endsWith(',') || token.endsWith(':') || token.endsWith(';')) {
      delay += 60; // Clause boundary pause
    }

    await new Promise(r => setTimeout(r, delay));
  }

  yield { type: 'done' };
}

/**
 * Orchestrate Agent Execution using Groq SDK with tool-calling loops
 */
export async function* streamAgentResponse(
  messages: ChatMessageData[],
  persona: AdaptivePersona = 'default',
  uiContext?: UIContext
): AsyncGenerator<{ type: 'delta' | 'action' | 'done' | 'error'; content?: string; action?: AgentAction; error?: string }> {
  const apiKey = process.env.GROQ_API_KEY;
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.content || '';

  // Fallback to local heuristic RAG agent if no Groq API key is configured
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    yield* runLocalHeuristicAgent(lastUserMsg, persona, uiContext, messages);
    return;
  }

  const groq = new Groq({ apiKey });
  const systemPrompt = buildSystemPrompt(persona, uiContext);

  // Format messages for Groq API
  const formattedMessages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt }
  ];

  for (const m of messages) {
    if (m.role === 'user') {
      formattedMessages.push({ role: 'user', content: m.content });
    } else if (m.role === 'assistant') {
      formattedMessages.push({
        role: 'assistant',
        content: m.content || '',
        tool_calls: m.tool_calls as any
      });
    } else if (m.role === 'tool' && m.tool_call_id) {
      formattedMessages.push({
        role: 'tool',
        tool_call_id: m.tool_call_id,
        content: m.content
      });
    }
  }

  try {
    // Step 1: Initial call to check for tool calls
    const initialCompletion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMessages,
      tools: AI_TOOL_DEFINITIONS,
      tool_choice: 'auto',
      temperature: 0.3,
      max_tokens: 1024
    });

    const choice = initialCompletion.choices[0];
    const message = choice.message;

    if (message.tool_calls && message.tool_calls.length > 0) {
      // Execute all tool calls
      formattedMessages.push(message as any);

      for (const toolCall of message.tool_calls) {
        const fnName = toolCall.function.name;
        let fnArgs: Record<string, any> = {};
        try {
          fnArgs = JSON.parse(toolCall.function.arguments);
        } catch {
          fnArgs = {};
        }

        const toolResult = executeTool(fnName, fnArgs);

        if (toolResult.action) {
          yield { type: 'action', action: toolResult.action };
        }

        formattedMessages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: toolResult.output
        });
      }

      // Step 2: Stream final synthesized response with tool context
      const stream = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 1024,
        stream: true
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          yield { type: 'delta', content: delta };
        }
      }

      yield { type: 'done' };
    } else {
      // No tool calls needed, stream directly or yield content
      if (message.content) {
        const words = message.content.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? '' : ' ') + words[i];
          yield { type: 'delta', content: chunk };
          await new Promise(r => setTimeout(r, 10));
        }
      }
      yield { type: 'done' };
    }
  } catch (err: any) {
    console.error('[yhelAI Agent Error]:', err);
    // Graceful fallback to local heuristic agent on API failure
    yield* runLocalHeuristicAgent(lastUserMsg, persona, uiContext);
  }
}
