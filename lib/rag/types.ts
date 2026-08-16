export type KnowledgeCategory =
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'services'
  | 'achievements'
  | 'education'
  | 'faq';

export interface KnowledgeChunk {
  id: string;
  documentId: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  keywords: string[];
  metadata: {
    projectId?: string;
    section?: string;
    techStack?: string[];
    featured?: boolean;
    period?: string;
  };
  embeddingVector?: number[];
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
  semanticScore: number;
  keywordScore: number;
  matchedTerms: string[];
}

export interface SearchOptions {
  category?: KnowledgeCategory;
  projectId?: string;
  limit?: number;
  minScore?: number;
}
