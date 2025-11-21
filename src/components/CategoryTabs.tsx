import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState } from "react";

// Categories for the marketplace
const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'art', label: 'Art' },
  { id: 'music', label: 'Music' },
  { id: 'photography', label: 'Photography' },
  { id: 'pfp', label: 'PFP' },
  { id: 'collectibles', label: 'Collectibles' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'memberships', label: 'Memberships' },
  { id: 'domains', label: 'Domains' }
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
  };

  return (
    <Tabs 
      value={activeCategory} 
      className="w-full" 
      onValueChange={handleCategoryChange}
    >
      <div className="border-b mb-4 overflow-x-auto">
        <TabsList className="h-10 bg-transparent space-x-2 px-1 py-1 w-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
} 