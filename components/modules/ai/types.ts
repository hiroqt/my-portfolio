import { AdaptivePersona, AgentAction, ChatMessageData } from '@/lib/ai/types';

export type AIStatusState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'navigating' | 'error';

export interface AssistantState {
  isOpen: boolean;
  isExpanded: boolean;
  status: AIStatusState;
  messages: ChatMessageData[];
  input: string;
  isStreaming: boolean;
  voiceEnabled: boolean;
  persona: AdaptivePersona;
  currentAction?: AgentAction | null;
  error?: string | null;
}
