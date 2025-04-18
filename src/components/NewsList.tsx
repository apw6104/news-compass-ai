
import React from 'react';
import NewsCard from './NewsCard';
import { useNewsContext } from '../contexts/NewsContext';
import { Skeleton } from '@/components/ui/skeleton';

const NewsList = () => {
  const { articles, isLoading, error } = useNewsContext();

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg text-red-500 mx-auto my-8">
        <p>Failed to load news. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {articles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
