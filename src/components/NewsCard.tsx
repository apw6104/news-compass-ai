
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, AlertTriangle, ThumbsUp, Zap } from 'lucide-react';
import { Article } from '@/contexts/NewsContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const {
    title,
    description,
    summary,
    publishedAt,
    urlToImage,
    url,
    source,
    category,
    sentiment,
    fakeProbability
  } = article;

  // Format the date
  const formattedDate = format(new Date(publishedAt), 'MMM d, yyyy • h:mm a');

  // Determine badge color based on category
  const getCategoryColor = () => {
    switch (category) {
      case 'world': return 'bg-category-world';
      case 'business': return 'bg-category-business';
      case 'technology': return 'bg-category-technology';
      case 'entertainment': return 'bg-category-entertainment';
      case 'sports': return 'bg-category-sports';
      case 'science': return 'bg-category-science';
      case 'health': return 'bg-category-health';
      default: return 'bg-gray-500';
    }
  };

  // Get sentiment icon and color
  const getSentimentDetails = () => {
    switch (sentiment) {
      case 'positive':
        return { 
          icon: <ThumbsUp size={16} />, 
          color: 'text-sentiment-positive',
          label: 'Positive tone'
        };
      case 'negative':
        return { 
          icon: <ThumbsUp size={16} className="rotate-180" />, 
          color: 'text-sentiment-negative',
          label: 'Negative tone'
        };
      default:
        return { 
          icon: <ThumbsUp size={16} className="rotate-90" />, 
          color: 'text-sentiment-neutral',
          label: 'Neutral tone'
        };
    }
  };

  // Determine fake news level
  const getFakeNewsLevel = () => {
    if (!fakeProbability && fakeProbability !== 0) return null;
    
    if (fakeProbability > 0.7) {
      return {
        icon: <AlertTriangle size={16} />,
        color: 'text-red-500',
        label: 'High risk of misinformation'
      };
    } else if (fakeProbability > 0.4) {
      return {
        icon: <AlertTriangle size={16} />,
        color: 'text-yellow-500',
        label: 'Potential misinformation'
      };
    }
    return {
      icon: <Zap size={16} />,
      color: 'text-green-500',
      label: 'Likely reliable'
    };
  };

  const sentimentDetails = getSentimentDetails();
  const fakeNewsDetails = getFakeNewsLevel();

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col">
        {urlToImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={urlToImage}
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
            <Badge className={`absolute top-2 right-2 ${getCategoryColor()}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <span className="font-medium">{source.name}</span>
            <span className="mx-2">•</span>
            <CalendarIcon size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          <CardTitle className="text-xl leading-tight">{title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <CardDescription className="text-sm text-muted-foreground mb-4">
            {description}
          </CardDescription>
          
          {summary && (
            <div className="mt-2 text-sm border-l-2 border-primary/50 pl-3 italic text-muted-foreground">
              <h4 className="font-medium text-primary mb-1">AI Summary</h4>
              <p>{summary}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-4 text-xs border-t">
          <TooltipProvider>
            <div className="flex items-center space-x-3">
              {sentimentDetails && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center ${sentimentDetails.color}`}>
                      {sentimentDetails.icon}
                      <span className="ml-1">Sentiment</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{sentimentDetails.label}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {fakeNewsDetails && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center ${fakeNewsDetails.color}`}>
                      {fakeNewsDetails.icon}
                      <span className="ml-1">Credibility</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{fakeNewsDetails.label}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
          
          <span className="text-muted-foreground">Read more →</span>
        </CardFooter>
      </a>
    </Card>
  );
};

export default NewsCard;
