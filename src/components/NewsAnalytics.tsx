
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewsContext } from '../contexts/NewsContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Article } from '../contexts/NewsContext';

const NewsAnalytics = () => {
  const { articles, selectedCategory } = useNewsContext();

  // Skip analytics if no articles
  if (!articles || articles.length === 0) {
    return null;
  }

  // Calculate sentiment distribution
  const sentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0
  };

  articles.forEach(article => {
    if (article.sentiment) {
      sentimentCounts[article.sentiment]++;
    }
  });

  const sentimentData = [
    { name: 'Positive', value: sentimentCounts.positive, color: '#10B981' },
    { name: 'Neutral', value: sentimentCounts.neutral, color: '#6B7280' },
    { name: 'Negative', value: sentimentCounts.negative, color: '#EF4444' }
  ].filter(item => item.value > 0);

  // Calculate reliability metrics
  const reliability = {
    reliable: 0,
    questionable: 0,
    unreliable: 0
  };

  articles.forEach((article: Article) => {
    if (article.fakeProbability !== undefined) {
      if (article.fakeProbability < 0.4) {
        reliability.reliable++;
      } else if (article.fakeProbability < 0.7) {
        reliability.questionable++;
      } else {
        reliability.unreliable++;
      }
    }
  });

  const reliabilityData = [
    { name: 'Reliable', value: reliability.reliable, color: '#10B981' },
    { name: 'Questionable', value: reliability.questionable, color: '#F59E0B' },
    { name: 'Unreliable', value: reliability.unreliable, color: '#EF4444' }
  ].filter(item => item.value > 0);

  const categoryTitle = selectedCategory === 'general' 
    ? 'Top Stories' 
    : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            Sentiment Analysis: {categoryTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {sentimentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No sentiment data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            Reliability Analysis: {categoryTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {reliabilityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reliabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {reliabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No reliability data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsAnalytics;
