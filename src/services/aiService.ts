
import { summarizeText } from '../utils/textRank';
import { analyzeSentiment } from '../utils/sentimentAnalysis';
import { detectFakeNews } from '../utils/fakeNewsDetection';
import { Article } from '../contexts/NewsContext';

// Process an article with all AI functions
export const processArticle = (article: Article): Article => {
  try {
    // Make sure we have content to analyze
    const contentToAnalyze = article.content || article.description || article.title;
    
    // Generate summary using TextRank (only if we have sufficient content)
    const summary = contentToAnalyze.length > 100 
      ? summarizeText(contentToAnalyze, 2)
      : contentToAnalyze;
    
    // Analyze sentiment of the article content
    const sentiment = analyzeSentiment(contentToAnalyze);
    
    // Calculate fake news probability
    const fakeProbability = detectFakeNews(
      article.title, 
      contentToAnalyze,
      article.source.name
    );
    
    // Return article with AI-enhanced properties
    return {
      ...article,
      summary,
      sentiment,
      fakeProbability
    };
  } catch (error) {
    console.error('Error processing article:', error, article);
    // Return the original article if processing fails
    return {
      ...article,
      summary: article.description || 'Summary unavailable',
      sentiment: 'neutral',
      fakeProbability: 0.5
    };
  }
};

// Process a batch of articles
export const processArticleBatch = (articles: Article[]): Article[] => {
  console.log(`Processing ${articles.length} articles with AI`);
  return articles.map(article => processArticle(article));
};
