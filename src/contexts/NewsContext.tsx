
import React, { createContext, useContext, useState } from 'react';
import { useNews } from '../hooks/useNews';
import { toast } from '@/components/ui/use-toast';

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
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('general');
  const { data: articles = [], isLoading, error, refetch } = useNews(selectedCategory);

  // Manual refresh function with feedback toast
  const refreshNews = async () => {
    toast({
      title: "Refreshing news",
      description: `Fetching the latest ${selectedCategory} news...`,
    });
    
    await refetch();
    
    toast({
      title: "News refreshed",
      description: "The latest news has been loaded",
    });
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        isLoading,
        error: error ? String(error) : null,
        selectedCategory,
        setSelectedCategory,
        refreshNews
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
