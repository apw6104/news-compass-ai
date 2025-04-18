
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from '@/components/Sidebar';
import NewsList from '@/components/NewsList';
import { NewsProvider } from '@/contexts/NewsContext';
import CategoryFilter from '@/components/CategoryFilter';
import NewsAnalytics from '@/components/NewsAnalytics';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNewsContext } from '@/contexts/NewsContext';

const NewsContent = () => {
  const { refreshNews, isLoading } = useNewsContext();

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshNews}
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>
      
      <CategoryFilter />
      <NewsAnalytics />
      <NewsList />
    </div>
  );
};

const Index = () => {
  return (
    <NewsProvider>
      <div className="min-h-screen flex flex-col md:flex-row">
        <SidebarProvider>
          <Sidebar />
          <NewsContent />
        </SidebarProvider>
      </div>
    </NewsProvider>
  );
};

export default Index;
