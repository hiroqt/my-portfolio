import { KnowledgeChunk, RetrievalResult, SearchOptions } from './types';
import { portfolioChunks } from './knowledge';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does', 'doing',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more',
  'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through',
  'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your',
  'yours', 'yourself', 'yourselves'
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

// Compute Term Frequencies
function getTermFrequencies(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  return tf;
}

// Pre-calculate document frequencies for corpus
const totalDocs = portfolioChunks.length;
const docFrequencies = new Map<string, number>();
const chunkTokenIndex = new Map<string, { tokens: string[]; tf: Map<string, number>; length: number }>();

let totalTokensInCorpus = 0;

portfolioChunks.forEach(chunk => {
  const combinedText = `${chunk.title} ${chunk.content} ${chunk.keywords.join(' ')} ${chunk.category}`;
  const tokens = tokenize(combinedText);
  const tf = getTermFrequencies(tokens);
  
  chunkTokenIndex.set(chunk.id, {
    tokens,
    tf,
    length: tokens.length
  });
  
  totalTokensInCorpus += tokens.length;

  tf.forEach((_, term) => {
    docFrequencies.set(term, (docFrequencies.get(term) || 0) + 1);
  });
});

const avgDocLength = totalTokensInCorpus / Math.max(1, totalDocs);

// BM25 parameters
const k1 = 1.5;
const b = 0.75;

function computeBM25Score(queryTokens: string[], chunkId: string): { score: number; matchedTerms: string[] } {
  const docData = chunkTokenIndex.get(chunkId);
  if (!docData) return { score: 0, matchedTerms: [] };

  let score = 0;
  const matchedTerms: string[] = [];

  for (const token of queryTokens) {
    const termFreqInDoc = docData.tf.get(token) || 0;
    if (termFreqInDoc > 0) {
      matchedTerms.push(token);
      const df = docFrequencies.get(token) || 1;
      const idf = Math.log(1 + (totalDocs - df + 0.5) / (df + 0.5));
      const numerator = termFreqInDoc * (k1 + 1);
      const denominator = termFreqInDoc + k1 * (1 - b + b * (docData.length / avgDocLength));
      score += idf * (numerator / denominator);
    }
  }

  return { score, matchedTerms };
}

// Vector Cosine Similarity
function computeCosineSimilarity(queryTokens: string[], chunkId: string): number {
  const docData = chunkTokenIndex.get(chunkId);
  if (!docData) return 0;

  const queryTf = getTermFrequencies(queryTokens);
  let dotProduct = 0;
  let queryNormSq = 0;
  let docNormSq = 0;

  // Calculate query vector weights
  queryTf.forEach((freq, term) => {
    const df = docFrequencies.get(term) || 1;
    const idf = Math.log(1 + totalDocs / df);
    const weight = freq * idf;
    queryNormSq += weight * weight;

    const docFreq = docData.tf.get(term) || 0;
    if (docFreq > 0) {
      const docWeight = docFreq * idf;
      dotProduct += weight * docWeight;
    }
  });

  // Calculate doc vector weights
  docData.tf.forEach((freq, term) => {
    const df = docFrequencies.get(term) || 1;
    const idf = Math.log(1 + totalDocs / df);
    const docWeight = freq * idf;
    docNormSq += docWeight * docWeight;
  });

  if (queryNormSq === 0 || docNormSq === 0) return 0;
  return dotProduct / (Math.sqrt(queryNormSq) * Math.sqrt(docNormSq));
}

/**
 * Hybrid Semantic + BM25 Search across Portfolio Knowledge Base
 */
export function searchKnowledge(query: string, options: SearchOptions = {}): RetrievalResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    // If no valid tokens, return category match or top chunks
    return portfolioChunks
      .filter(c => !options.category || c.category === options.category)
      .slice(0, options.limit || 5)
      .map(c => ({
        chunk: c,
        score: 0.5,
        semanticScore: 0.5,
        keywordScore: 0.5,
        matchedTerms: []
      }));
  }

  const results: RetrievalResult[] = [];

  for (const chunk of portfolioChunks) {
    // Category filter
    if (options.category && chunk.category !== options.category) {
      continue;
    }
    // Project ID filter
    if (options.projectId && chunk.metadata.projectId !== options.projectId) {
      continue;
    }

    const { score: bm25Score, matchedTerms } = computeBM25Score(queryTokens, chunk.id);
    const cosineScore = computeCosineSimilarity(queryTokens, chunk.id);

    // Boost featured projects if query asks for "best" or "top"
    let featuredBoost = 0;
    if (chunk.metadata.featured && (query.includes('best') || query.includes('top') || query.includes('impressive') || query.includes('recommend'))) {
      featuredBoost = 0.25;
    }

    // Direct slug or keyword match boost
    let exactKeywordBoost = 0;
    const lowerQuery = query.toLowerCase();
    if (chunk.keywords.some(kw => lowerQuery.includes(kw.toLowerCase()))) {
      exactKeywordBoost = 0.2;
    }

    // Hybrid combined score
    const combinedScore = (cosineScore * 0.5) + (Math.min(bm25Score, 5) / 5 * 0.3) + featuredBoost + exactKeywordBoost;

    if (combinedScore > (options.minScore ?? 0.05) || matchedTerms.length > 0) {
      results.push({
        chunk,
        score: combinedScore,
        semanticScore: cosineScore,
        keywordScore: bm25Score,
        matchedTerms
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  const limit = options.limit || 6;
  return results.slice(0, limit);
}

/**
 * Helper to fetch a single project chunk by slug
 */
export function getProjectBySlug(slug: string): KnowledgeChunk | undefined {
  return portfolioChunks.find(c => c.metadata.projectId === slug);
}
