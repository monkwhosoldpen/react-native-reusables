import { useState, useCallback, useEffect } from 'react';
import { Goat, GoatCategory, GoatType } from '~/types/goat';
import { GoatService } from '~/services/goat-service';
import { GOAT_CATEGORIES } from '~/lib/constants';

export function useGoats() {
  const [selectedCategory, setSelectedCategory] = useState<GoatCategory>(GOAT_CATEGORIES[0]);
  const [goats, setGoats] = useState<Goat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadGoats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await GoatService.getGoats({
        category: selectedCategory.value === 'all' ? undefined : selectedCategory.value,
        limit: 20,
      });

      setGoats(result.goats);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load goats');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadGoats();
  }, [selectedCategory, loadGoats]);

  return {
    goats,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
    hasMore,
    refresh: loadGoats,
    loadGoats,
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