import { View, Image, Pressable, ActivityIndicator } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';
import { Goat } from '~/types/goat';
import React from 'react';

type GoatCardProps = {
  goat: Goat;
  width: number;
  onPress?: (goat: Goat) => void;
};

const isValidImageUrl = (url: string) => {
  return url && (url.startsWith('http://') || url.startsWith('https://'));
};

export function GoatCard({ goat, width, onPress }: GoatCardProps) {
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);
  const imageHeight = width; // Square aspect ratio

  const imageSource = React.useMemo(() => {
    if (isValidImageUrl(goat.image)) {
      return { uri: goat.image };
    }
    return require('./../assets/images/goat-placeholder.png');
  }, [goat.image]);

  // Reset states when image source changes
  React.useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [imageSource]);

  return (
    <Pressable 
      onPress={() => onPress?.(goat)}
      className="active:opacity-90 mb-1"
    >
      <Card className="overflow-hidden bg-card border-0">
        <View className="relative">
          {!imageError && (
            <Image 
              source={imageSource}
              style={{ width: '100%', height: imageHeight }}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                console.error('Failed to load image:', goat.image);
                setImageError(true);
                setImageLoading(false);
              }}
            />
          )}

          {/* Loading Overlay */}
          {imageLoading && !imageError && (
            <View 
              className="absolute inset-0 items-center justify-center bg-muted/10"
              style={{ width: '100%', height: imageHeight }}
            >
              <ActivityIndicator size="small" />
            </View>
          )}

          {/* Error State */}
          {imageError && (
            <View 
              className="absolute inset-0 items-center justify-center bg-muted"
              style={{ width: '100%', height: imageHeight }}
            >
              <Text className="text-sm text-muted-foreground">
                Failed to load image
              </Text>
            </View>
          )}
        </View>

        {/* Username */}
        <View className="p-2">
          <Text className="text-sm text-muted-foreground" numberOfLines={1}>
            @{goat.username}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
} 