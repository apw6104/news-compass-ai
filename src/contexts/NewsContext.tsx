
import React, { createContext, useContext, useState, useEffect } from 'react';

export type NewsCategory = 
  | 'general' 
  | 'world' 
  | 'business' 
  | 'technology' 
  | 'entertainment' 
  | 'sports' 
  | 'science' 
  | 'health';

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  category: NewsCategory;
  summary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  fakeProbability?: number;
}

interface NewsContextType {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: NewsCategory;
  setSelectedCategory: (category: NewsCategory) => void;
  refreshNews: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
};

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('general');
  const [lastFetchTime, setLastFetchTime] = useState(0);

  // Function to fetch news data
  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call your API service
      // For now, we'll use mock data
      const mockArticles = await import('../services/mockNews').then(m => m.getMockNews(selectedCategory));
      setArticles(mockArticles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again later.');
    } finally {
      setIsLoading(false);
      setLastFetchTime(Date.now());
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews();
    
    // Set up hourly refresh
    const interval = setInterval(() => {
      fetchNews();
    }, 60 * 60 * 1000); // 1 hour in milliseconds
    
    return () => clearInterval(interval);
  }, [selectedCategory]);

  // Manual refresh function
  const refreshNews = () => {
    // Only refresh if at least 1 minute has passed since last fetch
    if (Date.now() - lastFetchTime > 60 * 1000) {
      fetchNews();
    }
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        isLoading,
        error,
        selectedCategory,
        setSelectedCategory,
        refreshNews
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
