export type AdaptivePersona = 'recruiter' | 'client' | 'developer' | 'casual' | 'concise' | 'default';

export interface ChatMessageData {
  id?: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  name?: string;
  tool_call_id?: string;
  tool_calls?: any[];
  actions?: AgentAction[];
  timestamp?: number;
}

export type ActionType =
  | 'navigate'
  | 'open_project'
  | 'open_contact'
  | 'scroll_to_section'
  | 'highlight_skill';

export interface AgentAction {
  type: ActionType;
  destination?: string;
  projectId?: string;
  sectionId?: string;
  skillName?: string;
  label?: string;
}

export interface UIContext {
  currentPage?: string;
  activeSection?: string;
  activeProject?: string;
}

export interface ChatRequestPayload {
  messages: ChatMessageData[];
  uiContext?: UIContext;
  persona?: AdaptivePersona;
}

export interface ChatStreamChunk {
  type: 'delta' | 'action' | 'done' | 'error';
  content?: string;
  action?: AgentAction;
  persona?: AdaptivePersona;
  error?: string;
}
