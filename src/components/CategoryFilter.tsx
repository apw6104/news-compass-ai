
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useNewsContext } from '../contexts/NewsContext';

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useNewsContext();

  const categories = [
    { id: 'general', name: 'Top Stories' },
    { id: 'world', name: 'World' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'sports', name: 'Sports' },
    { id: 'science', name: 'Science' },
    { id: 'health', name: 'Health' }
  ];

  return (
    <div className="md:hidden w-full p-4">
      <Select
        value={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value as any)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>News Categories</SelectLabel>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
