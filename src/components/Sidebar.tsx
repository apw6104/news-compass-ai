
import React from 'react';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { useNewsContext } from '../contexts/NewsContext';
import { 
  Globe, 
  Briefcase, 
  Cpu, 
  Film, 
  Dumbbell, 
  Atom, 
  Heart,
  Newspaper 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryIcons = {
  general: Newspaper,
  world: Globe,
  business: Briefcase,
  technology: Cpu,
  entertainment: Film,
  sports: Dumbbell,
  science: Atom,
  health: Heart
};

const Sidebar = () => {
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
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <h1 className="font-bold text-xl">NewsCompass AI</h1>
        <SidebarTrigger />
      </div>
      
      <SidebarComponent className="hidden md:flex border-r">
        <SidebarHeader className="p-4">
          <h1 className="font-bold text-xl">NewsCompass AI</h1>
          <p className="text-sm text-muted-foreground">
            Smart news aggregator
          </p>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            {categories.map(category => {
              const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons];
              const isActive = selectedCategory === category.id;
              
              return (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    onClick={() => setSelectedCategory(category.id as any)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 rounded-md",
                      isActive 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "hover:bg-secondary"
                    )}
                  >
                    <IconComponent size={18} className="mr-2" />
                    <span>{category.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </SidebarComponent>
    </>
  );
};

export default Sidebar;
