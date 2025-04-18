
import { useQuery } from '@tanstack/react-query';
import { NewsCategory, Article } from '../contexts/NewsContext';
import { getMockNews } from '../services/mockNews';
import { processArticleBatch } from '../services/aiService';

// NewsAPI.org API key - Note: This is a sample key and should be replaced with a real one
const NEWS_API_KEY = '1234567890abcdef1234567890abcdef'; // Replace with your actual API key

// Function to fetch real news based on category
const fetchRealNews = async (category: NewsCategory): Promise<Article[]> => {
  try {
    // Map our category to NewsAPI categories
    const apiCategory = category === 'general' ? '' : `&category=${category}`;
    
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us${apiCategory}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    
    // Transform the API response to match our Article type
    return data.articles.map((article: any, index: number) => ({
      id: `${category}-${index}-${Date.now()}`,
      title: article.title || 'No title available',
      description: article.description || 'No description available',
      content: article.content || article.description || 'No content available',
      url: article.url || '#',
      urlToImage: article.urlToImage || 'https://source.unsplash.com/random/800x600/?news',
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        id: article.source?.id || null,
        name: article.source?.name || 'Unknown Source'
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
      // Fetch news data - use real news API with fallback to mock data
      const articles = await fetchRealNews(category);
      
      // Process with AI for sentiment and fake news detection
      const processedArticles = processArticleBatch(articles);
      
      return processedArticles;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to get fresh news
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });
};
