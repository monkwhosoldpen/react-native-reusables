import React, { createContext, useContext } from 'react';
import { useGoats as useGoatsHook } from '~/hooks/use-goats';

const GoatContext = createContext<ReturnType<typeof useGoatsHook> | undefined>(undefined);

export function GoatProvider({ children }: { children: React.ReactNode }) {
  const goatsState = useGoatsHook();
  
  console.log('GoatProvider: Current state:', {
    selectedCategory: goatsState.selectedCategory,
    goatsCount: goatsState.goats.length
  });

  return (
    <GoatContext.Provider value={goatsState}>
      {children}
    </GoatContext.Provider>
  );
}

export function useGoats() {
  console.log('useGoats: Hook called');
  const context = useContext(GoatContext);
  if (!context) {
    throw new Error('useGoats must be used within a GoatProvider');
  }
  return context;
} 