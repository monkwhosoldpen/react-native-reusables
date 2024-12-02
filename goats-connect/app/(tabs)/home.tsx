import { View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Text } from '~/components/ui/text';
import { GoatGrid } from '~/components/GoatGrid';
import { useGoats } from '~/hooks/use-goats';
import { useEffect } from 'react';
import { ExternalPathString, router } from 'expo-router';
import type { Goat } from '~/types/goat';

export default function HomeScreen() {
  const {
    goats,
    isLoading,
    error,
    hasMore,
    loadGoats,
    loadCategories,
    refresh,
  } = useGoats();

  useEffect(() => {
    loadCategories();
    loadGoats();
  }, []);
  const handleGoatPress = (goat: Goat) => {
    router.push(`/chats/${goat.username}` as ExternalPathString);
  };

  return (
    <ScrollView 
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={isLoading && !hasMore} onRefresh={refresh} />
      }
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        
        if (isEndReached && !isLoading && hasMore) {
          loadGoats();
        }
      }}
      scrollEventThrottle={400}
    >
      <View className="py-6">
        {error ? (
          <View className="p-6">
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : (
          <GoatGrid 
            goats={goats}
            onGoatPress={handleGoatPress}
          />
        )}

        {isLoading && hasMore && (
          <View className="py-4">
            <ActivityIndicator />
          </View>
        )}
      </View>
    </ScrollView>
  );
} 