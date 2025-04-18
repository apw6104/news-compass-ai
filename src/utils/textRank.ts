
/**
 * TextRank algorithm implementation for text summarization
 * This is a simplified version of the algorithm for demonstration purposes
 */

// Split text into sentences
const splitIntoSentences = (text: string): string[] => {
  // Basic sentence splitting by punctuation followed by space
  // In a production app, this would be more sophisticated
  return text.split(/[.!?]+\s+/).filter(sentence => sentence.trim().length > 0);
};

// Calculate similarity between two sentences (simple word overlap method)
const calculateSimilarity = (sentence1: string, sentence2: string): number => {
  const words1 = new Set(sentence1.toLowerCase().split(/\s+/).filter(word => word.length > 3));
  const words2 = new Set(sentence2.toLowerCase().split(/\s+/).filter(word => word.length > 3));
  
  if (words1.size === 0 || words2.size === 0) {
    return 0;
  }
  
  // Count common words
  let commonWords = 0;
  for (const word of words1) {
    if (words2.has(word)) {
      commonWords++;
    }
  }
  
  // Normalize by the average length
  return commonWords / ((words1.size + words2.size) / 2);
};

// Build similarity matrix between all sentences
const buildSimilarityMatrix = (sentences: string[]): number[][] => {
  const n = sentences.length;
  const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        matrix[i][j] = calculateSimilarity(sentences[i], sentences[j]);
      }
    }
  }
  
  return matrix;
};

// PageRank algorithm to rank sentences
const pageRank = (matrix: number[][], damping = 0.85, iterations = 10): number[] => {
  const n = matrix.length;
  let scores = Array(n).fill(1 / n);
  
  for (let iter = 0; iter < iterations; iter++) {
    const newScores = Array(n).fill((1 - damping) / n);
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          // Get sum of outgoing links from j
          const outSum = matrix[j].reduce((sum, val, idx) => idx !== j ? sum + val : sum, 0);
          if (outSum > 0) {
            // Add weighted score
            newScores[i] += damping * scores[j] * (matrix[j][i] / outSum);
          }
        }
      }
    }
    
    scores = newScores;
  }
  
  return scores;
};

// Get top sentences
const getTopSentences = (sentences: string[], scores: number[], count: number): string[] => {
  // Pair sentences with their scores
  const sentenceScores = sentences.map((sentence, index) => ({
    sentence,
    score: scores[index],
    index
  }));
  
  // Sort by score (highest first)
  sentenceScores.sort((a, b) => b.score - a.score);
  
  // Take top 'count' sentences
  const topSentences = sentenceScores.slice(0, count);
  
  // Sort by original order
  topSentences.sort((a, b) => a.index - b.index);
  
  // Return just the sentences
  return topSentences.map(item => item.sentence);
};

// Main TextRank function for summarization
export const summarizeText = (text: string, sentenceCount = 3): string => {
  // If the text is too short, return it as is
  if (text.length < 200) {
    return text;
  }
  
  const sentences = splitIntoSentences(text);
  
  // If we don't have enough sentences, return the original text
  if (sentences.length <= sentenceCount) {
    return text;
  }
  
  const similarityMatrix = buildSimilarityMatrix(sentences);
  const scores = pageRank(similarityMatrix);
  const summary = getTopSentences(sentences, scores, sentenceCount);
  
  return summary.join('. ') + '.';
};
