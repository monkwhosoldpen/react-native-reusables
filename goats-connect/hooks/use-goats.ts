import { useState, useCallback, useEffect } from 'react';
import { Goat, GoatCategory } from '~/types/goat';
import { GoatService } from '~/services/goat-service';

export function useGoats() {
  const [goats, setGoats] = useState<Goat[]>([]);
  const [categories, setCategories] = useState<GoatCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GoatCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadGoats = useCallback(async (reset = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const newPage = reset ? 1 : page;
      const result = await GoatService.getGoats({
        category: selectedCategory?.id,
        page: newPage,
        limit: 20,
      });

      setGoats(prevGoats => (reset ? result.goats : [...prevGoats, ...result.goats]));
      setHasMore(result.hasMore);
      setPage(newPage + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load goats');
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedCategory]);

  const loadCategories = useCallback(async () => {
    try {
      const result = await GoatService.getCategories();
      setCategories(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    }
  }, []);

  const selectCategory = useCallback(async (category: GoatCategory | null) => {
    setSelectedCategory(category);
    setPage(1);
    setGoats([]);
    setHasMore(true);
  }, []);

  const refresh = useCallback(async () => {
    setPage(1);
    await loadGoats(true);
  }, [loadGoats]);

  return {
    goats,
    categories,
    selectedCategory,
    isLoading,
    error,
    hasMore,
    loadGoats,
    loadCategories,
    selectCategory,
    refresh,
  };
}

export function useGoatByUsername(username?: string) {
  const [goat, setGoat] = useState<Goat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGoat() {
      if (!username) {
        setError('No username provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await GoatService.getGoatByUsername(username);
        setGoat(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load goat');
      } finally {
        setIsLoading(false);
      }
    }

    loadGoat();
  }, [username]);

  return { goat, isLoading, error };
} 