
/**
 * Simple sentiment analysis implementation
 * In a production app, this would typically use a more sophisticated ML model
 */

// Maps of positive and negative words for simple sentiment analysis
const positiveWords = new Set([
  'good', 'great', 'excellent', 'positive', 'wonderful', 'fantastic', 'amazing',
  'awesome', 'outstanding', 'superb', 'brilliant', 'terrific', 'remarkable',
  'exceptional', 'marvelous', 'splendid', 'fabulous', 'impressive', 'admirable',
  'success', 'successful', 'achieve', 'accomplished', 'achievement', 'progress',
  'breakthrough', 'innovative', 'innovation', 'solution', 'solved', 'resolved',
  'improve', 'improved', 'improvement', 'increasing', 'increase', 'growth',
  'growing', 'develop', 'developing', 'development', 'advance', 'advancing',
  'advantage', 'beneficial', 'benefit', 'helpful', 'effective', 'efficient',
  'gain', 'profit', 'prosperity', 'prosperous', 'promising', 'hopeful',
  'optimistic', 'hope', 'celebration', 'celebrate', 'congratulations', 'win',
  'winner', 'winning', 'victory', 'triumph', 'succeed', 'agreement', 'agree',
  'happy', 'happiness', 'joy', 'joyful', 'pleased', 'satisfying', 'satisfaction',
  'support', 'supporting', 'supported', 'approval', 'approve', 'approved'
]);

const negativeWords = new Set([
  'bad', 'terrible', 'awful', 'poor', 'negative', 'horrible', 'dreadful',
  'disappointing', 'disastrous', 'catastrophic', 'tragic', 'unfortunate',
  'miserable', 'appalling', 'atrocious', 'inadequate', 'inferior', 'deficient',
  'fail', 'failure', 'failing', 'failed', 'problem', 'issue', 'trouble',
  'crisis', 'emergency', 'disaster', 'catastrophe', 'danger', 'dangerous',
  'threat', 'threatening', 'warning', 'alarm', 'concerning', 'concern',
  'worried', 'worry', 'anxious', 'anxiety', 'fear', 'fearful', 'scared',
  'afraid', 'panic', 'terror', 'horrific', 'horrifying', 'shocking', 'shocked',
  'upset', 'angry', 'anger', 'furious', 'outraged', 'hostile', 'aggression',
  'aggressive', 'violent', 'violence', 'attack', 'conflict', 'dispute',
  'argument', 'controversy', 'contentious', 'debatable', 'protest', 'protesting',
  'opposition', 'oppose', 'opposing', 'rejection', 'reject', 'rejected',
  'decline', 'declining', 'decrease', 'decreasing', 'loss', 'losing', 'lose',
  'lost', 'damage', 'damaged', 'harmful', 'hurt', 'suffering', 'suffer',
  'painful', 'pain', 'illness', 'sick', 'disease', 'infection', 'infected',
  'contaminated', 'contamination', 'pollution', 'polluted', 'corruption',
  'corrupt', 'scandal', 'controversial', 'criticism', 'criticize', 'blamed',
  'blame', 'fault', 'guilty', 'accusation', 'accuse', 'accused'
]);

// Analyze text sentiment
export const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
  // Convert to lowercase and tokenize
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Count positive and negative words
  for (const word of words) {
    if (positiveWords.has(word)) {
      positiveCount++;
    } else if (negativeWords.has(word)) {
      negativeCount++;
    }
  }
  
  // Calculate overall sentiment
  const totalWords = words.length;
  const positiveRatio = positiveCount / totalWords;
  const negativeRatio = negativeCount / totalWords;
  
  // Thresholds for sentiment classification
  const threshold = 0.02; // 2% of words need to be positive/negative for classification
  
  if (positiveRatio > threshold && positiveRatio > negativeRatio) {
    return 'positive';
  } else if (negativeRatio > threshold && negativeRatio > positiveRatio) {
    return 'negative';
  } else {
    return 'neutral';
  }
};
