
import { summarizeText } from '../utils/textRank';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { detectFakeNews } from '../utils/fakeNewsDetection';
import { Article } from '../contexts/NewsContext';

// Process an article with all AI functions
export const processArticle = (article: Article): Article => {
  // Generate summary using TextRank
  const summary = summarizeText(article.content, 2);
  
  // Analyze sentiment of the article content
  const sentiment = analyzeSentiment(article.content);
  
  // Calculate fake news probability
  const fakeProbability = detectFakeNews(
    article.title, 
    article.content,
    article.source.name
  );
  
  // Return article with AI-enhanced properties
  return {
    ...article,
    summary,
    sentiment,
    fakeProbability
  };
};

// Process a batch of articles
export const processArticleBatch = (articles: Article[]): Article[] => {
  return articles.map(article => processArticle(article));
};
