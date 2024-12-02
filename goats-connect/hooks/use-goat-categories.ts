import { useState } from 'react';

export type GoatCategory = {
  id: string;
  name: string;
  description: string;
};

const GOAT_CATEGORIES: GoatCategory[] = [
  { id: 'all', name: 'All Goats', description: 'View all goats' },
  { id: 'dairy', name: 'Dairy Goats', description: 'Goats bred for milk production' },
  { id: 'meat', name: 'Meat Goats', description: 'Goats bred for meat production' },
  { id: 'fiber', name: 'Fiber Goats', description: 'Goats bred for fiber production' },
  { id: 'pet', name: 'Pet Goats', description: 'Goats kept as pets' },
];

export function useGoatCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return {
    categories: GOAT_CATEGORIES,
    selectedCategory,
    setSelectedCategory,
  };
} 