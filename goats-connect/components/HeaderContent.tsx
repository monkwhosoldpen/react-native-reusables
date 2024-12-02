import React from 'react';
import { View, Platform } from 'react-native';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useGoats } from '~/contexts/goat-context';
import { GOAT_CATEGORIES } from '~/lib/constants';

export function HeaderContent() {
  const { selectedCategory, setSelectedCategory } = useGoats();
  
  return (
    <View className="mr-4">
      <Select 
        value={selectedCategory}
        onValueChange={(value) => {
          const category = GOAT_CATEGORIES.find(cat => cat === value);
          if (category) {
            setSelectedCategory(category);
          }
        }}
      >
        <SelectTrigger className="w-[140px] h-8 bg-background">
          <SelectValue placeholder="Select Category">
            {selectedCategory.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {GOAT_CATEGORIES.map(category => (
            <SelectItem 
              key={category.id}
              value={category.value}
              label={category.label}
              className="py-3 px-4"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  );
} 