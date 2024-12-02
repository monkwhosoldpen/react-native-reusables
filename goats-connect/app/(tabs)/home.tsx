import { ScrollView, RefreshControl, ActivityIndicator, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { GoatGrid } from '~/components/GoatGrid';
import { useGoats } from '~/contexts/goat-context';
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
    selectedCategory,
    refresh,
  } = useGoats();

  console.log('HomeScreen: Rendered with:', {
    selectedCategory,
    goatsCount: goats.length,
    isLoading,
    hasMore
  });

  useEffect(() => {
    console.log('HomeScreen: Effect triggered by selectedCategory change:', selectedCategory);
    loadGoats();
  }, [selectedCategory]);

  const handleGoatPress = (goat: Goat) => {
    router.push(`/chats/${goat.username}` as ExternalPathString);
  };

  return (
    <ScrollView 
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingVertical: 4 }}
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
      <View className="px-4 py-2 mb-2 flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-muted-foreground">
            Category
          </Text>
          <Text className="text-lg font-semibold">
            {selectedCategory.label}
          </Text>
        </View>
        <View className="bg-primary/10 px-3 py-1 rounded-full">
          <Text className="text-sm font-medium text-primary">
            {goats.length} goats
          </Text>
        </View>
      </View>

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
    </ScrollView>
  );
} 