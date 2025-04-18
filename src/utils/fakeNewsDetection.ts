
/**
 * Simple fake news detection algorithm
 * In a production app, this would use a more sophisticated ML model
 */

// Signs of potential fake news
const clickbaitPhrases = [
  'you won\'t believe', 'shocking', 'mind blowing', 'incredible', 'unbelievable',
  'shocking truth', 'what happened next', 'jaw dropping', 'scientists baffled',
  'doctors hate', 'one weird trick', 'this simple', 'secret they don\'t want you to know',
  'they don\'t want you to know', 'miracle', 'revolutionary', 'game-changing',
  'this will change your life', 'you\'ll never look at the same way again'
];

const emotionalLanguage = [
  'outrageous', 'terrible', 'horrific', 'disgusting', 'appalling', 'atrocious',
  'scandalous', 'sickening', 'devastating', 'horrendous', 'frightening', 'terrifying',
  'mind-numbing', 'insane', 'crazy', 'unbelievable', 'astonishing', 'astounding',
  'sensational', 'spectacular', 'remarkable', 'extraordinary', 'stupendous', 'tremendous'
];

const conspiracyTerms = [
  'conspiracy', 'coverup', 'cover up', 'cover-up', 'government is hiding',
  'they don\'t want you to know', 'what they don\'t tell you', 'secret agenda',
  'hidden agenda', 'shadow government', 'deep state', 'illuminati', 'new world order',
  'controlled by', 'puppet', 'puppets', 'orchestrated', 'propaganda', 'false flag'
];

// Detect potential clickbait in title
const detectClickbait = (title: string): number => {
  const lowerTitle = title.toLowerCase();
  let count = 0;
  
  clickbaitPhrases.forEach(phrase => {
    if (lowerTitle.includes(phrase.toLowerCase())) {
      count++;
    }
  });
  
  return count / clickbaitPhrases.length;
};

// Detect excessive emotional language
const detectEmotionalLanguage = (text: string): number => {
  const lowerText = text.toLowerCase();
  let count = 0;
  
  emotionalLanguage.forEach(term => {
    if (lowerText.includes(term.toLowerCase())) {
      count++;
    }
  });
  
  // Normalize based on text length
  const words = text.split(/\s+/).length;
  return count / Math.min(words / 10, emotionalLanguage.length);
};

// Detect conspiracy theory language
const detectConspiracyLanguage = (text: string): number => {
  const lowerText = text.toLowerCase();
  let count = 0;
  
  conspiracyTerms.forEach(term => {
    if (lowerText.includes(term.toLowerCase())) {
      count++;
    }
  });
  
  // Normalize based on text length
  const words = text.split(/\s+/).length;
  return count / Math.min(words / 20, conspiracyTerms.length);
};

// Check for source credibility indicators
const checkSourceCredibility = (source: string): number => {
  // List of credible news source keywords (this would be much more comprehensive in production)
  const credibleSources = ['times', 'post', 'news', 'bbc', 'reuters', 'associated press', 'ap', 'journal'];
  
  const lowerSource = source.toLowerCase();
  for (const credible of credibleSources) {
    if (lowerSource.includes(credible)) {
      return 0.3; // Reduce fake probability if from credible source
    }
  }
  
  return 0.6; // Higher starting point for unknown sources
};

// Check article length - very short articles are more suspicious
const checkArticleLength = (content: string): number => {
  const words = content.split(/\s+/).length;
  if (words < 100) {
    return 0.7; // Very short articles are suspicious
  } else if (words < 300) {
    return 0.5; // Short articles are somewhat suspicious
  } else {
    return 0.3; // Longer articles tend to be more credible
  }
};

// Main function to detect fake news probability
export const detectFakeNews = (
  title: string, 
  content: string,
  sourceName: string
): number => {
  // Calculate individual risk factors
  const clickbaitScore = detectClickbait(title) * 0.25;
  const emotionalScore = detectEmotionalLanguage(content) * 0.2;
  const conspiracyScore = detectConspiracyLanguage(content) * 0.3;
  const sourceScore = checkSourceCredibility(sourceName) * 0.15;
  const lengthScore = checkArticleLength(content) * 0.1;
  
  // Calculate weighted average
  const fakeProbability = 
    clickbaitScore + 
    emotionalScore + 
    conspiracyScore + 
    sourceScore + 
    lengthScore;
  
  // Return probability capped between 0 and 1
  return Math.min(Math.max(fakeProbability, 0), 1);
};
