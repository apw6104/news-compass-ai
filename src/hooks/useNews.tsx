
import { useQuery } from '@tanstack/react-query';
import { NewsCategory } from '../contexts/NewsContext';
import { getMockNews } from '../services/mockNews';
import { processArticleBatch } from '../services/aiService';

export const useNews = (category: NewsCategory) => {
  return useQuery({
    queryKey: ['news', category],
    queryFn: async () => {
      // Fetch news data
      const articles = await getMockNews(category);
      
      // Process with AI
      const processedArticles = processArticleBatch(articles);
      
      return processedArticles;
    },
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
    staleTime: 30 * 60 * 1000, // Consider data stale after 30 minutes
  });
};
