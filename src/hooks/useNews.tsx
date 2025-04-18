
import { useQuery } from '@tanstack/react-query';
import { NewsCategory, Article } from '../contexts/NewsContext';
import { getMockNews } from '../services/mockNews';
import { processArticleBatch } from '../services/aiService';

// GNews API configuration
const GNEWS_API_KEY = '3dde7ff938e5adaf1a80221f7d854cfa';

// Function to fetch real news from GNews API
const fetchRealNews = async (category: NewsCategory): Promise<Article[]> => {
  try {
    // Map our category to GNews topics
    const topicMap: Record<NewsCategory, string> = {
      'general': 'top-headlines',
      'world': 'world',
      'business': 'business',
      'technology': 'technology',
      'entertainment': 'entertainment',
      'sports': 'sports',
      'science': 'science',
      'health': 'health'
    };

    const apiCategory = topicMap[category] || 'top-headlines';
    
    const response = await fetch(
      `https://gnews.io/api/v4/${apiCategory}?apikey=${GNEWS_API_KEY}&lang=en&max=10`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news from GNews API');
    }
    
    const data = await response.json();
    
    // Transform the API response to match our Article type
    return data.articles.map((article: any, index: number) => ({
      id: `gnews-${category}-${index}-${Date.now()}`,
      title: article.title || 'No title available',
      description: article.description || 'No description available',
      content: article.content || article.description || 'No content available',
      url: article.url || '#',
      urlToImage: article.image || 'https://source.unsplash.com/random/800x600/?news',
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        id: null,
        name: article.source.name || 'GNews'
      },
      category: category
    }));
  } catch (error) {
    console.error('Error fetching real news:', error);
    // Fall back to mock data if the API fails
    console.log('Falling back to mock data');
    return getMockNews(category);
  }
};

export const useNews = (category: NewsCategory) => {
  return useQuery({
    queryKey: ['news', category],
    queryFn: async () => {
      // Fetch news data - use GNews API with fallback to mock data
      const articles = await fetchRealNews(category);
      
      // Process with AI for sentiment and fake news detection
      const processedArticles = processArticleBatch(articles);
      
      return processedArticles;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to get fresh news
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });
};

