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
  
  // Calculate columns based on screen width
  const columns = windowWidth < 640 ? 1 : 
                 windowWidth < 1024 ? 2 :
                 windowWidth < 1536 ? 3 : 4;

  // Calculate gaps and content width
  const gap = 16;
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
      <View className="flex-row" style={{ gap }}>
        {columnedGoats.map((column, colIndex) => (
          <View key={colIndex} style={{ flex: 1 }}>
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