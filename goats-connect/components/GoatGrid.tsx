import { View, useWindowDimensions } from 'react-native';
import { GoatCard } from './GoatCard';
import { Goat } from '~/types/goat';
import { useMemo } from 'react';

type GoatGridProps = {
  goats: Goat[];
  onGoatPress?: (goat: Goat) => void;
};

export function GoatGrid({ goats, onGoatPress }: GoatGridProps) {
  const { width: windowWidth } = useWindowDimensions();
  const padding = 16;
  const gap = 8;
  
  // Show more columns
  const columns = windowWidth < 640 ? 3 : // 3 columns on phones
                 windowWidth < 1024 ? 4 : // 4 columns on tablets
                 windowWidth < 1536 ? 5 : // 5 columns on small desktop
                 6; // 6 columns on large screens

  // Calculate card width
  const totalGaps = columns - 1;
  const availableWidth = windowWidth - (padding * 2) - (totalGaps * gap);
  const cardWidth = availableWidth / columns;

  // Distribute goats into columns
  const columnedGoats = useMemo(() => {
    const cols: Goat[][] = Array.from({ length: columns }, () => []);
    goats.forEach((goat, idx) => {
      cols[idx % columns].push(goat);
    });
    return cols;
  }, [goats, columns]);

  return (
    <View className="px-4">
      <View 
        className="flex-row" 
        style={{ 
          gap,
          paddingTop: 4,
          paddingBottom: 16
        }}
      >
        {columnedGoats.map((column, colIndex) => (
          <View key={colIndex} style={{ flex: 1, gap }}>
            {column.map((goat) => (
              <GoatCard
                key={goat.id}
                goat={goat}
                width={cardWidth}
                onPress={onGoatPress}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
} 