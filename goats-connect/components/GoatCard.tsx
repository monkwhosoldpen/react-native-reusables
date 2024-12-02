import { View, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';
import { Goat } from '~/types/goat';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react-native';
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
  const imageHeight = width * 0.75; // 4:3 aspect ratio

  const imageSource = React.useMemo(() => {
    if (isValidImageUrl(goat.image)) {
      return { uri: goat.image };
    }
    return require('./../assets/images/goat-placeholder.png');
  }, [goat.image]);

  React.useEffect(() => {
    // Test the URL
    fetch(goat.image)
      .then(response => {
        if (!response.ok) {
        }
      })
      .catch(error => console.error('Failed to fetch image:', error));
  }, [goat.image]);

  return (
    <Pressable 
      onPress={() => onPress?.(goat)}
      className="active:opacity-70"
    >
      <Card className="mb-4 border-b border-border">
        <View className="p-4">
          <View className="flex-row">
            <Avatar className="h-10 w-10 rounded-full mr-3" alt={''}>
              <AvatarImage source={{ uri: `https://placehold.co/100x100/4287f5/ffffff?text=${goat.name[0]}` }} />
              <AvatarFallback>
                <Text>{goat.name[0]}</Text>
              </AvatarFallback>
            </Avatar>
            
            <View className="flex-1">
              <View className="flex-row items-center flex-wrap">
                <Text className="font-semibold">{goat.name}</Text>
                <Text className="text-muted-foreground ml-2">@{goat.username}</Text>
                <Text className="text-muted-foreground ml-2">•</Text>
                <Text className="text-muted-foreground ml-2">2h</Text>
              </View>
              
              <Text className="text-base mt-1 mb-3" numberOfLines={3}>
                {goat.description}
              </Text>
            </View>
          </View>

          <View className="rounded-xl overflow-hidden mb-3 relative">
            <Image 
              source={imageSource}
              style={{ width: width - 32, height: imageHeight }}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={(e) => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
            {imageLoading && (
              <View style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#f0f0f0'
              }}>
                <ActivityIndicator size="large" />
              </View>
            )}
            {imageError && (
              <View style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#f0f0f0'
              }}>
                <Image 
                  source={require('../assets/images/goat-placeholder.png')}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
                <Text className="mt-2">Image unavailable</Text>
              </View>
            )}
          </View>

          <View className="flex-row justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex-row items-center flex-1"
            >
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <Text className="text-muted-foreground ml-2">24</Text>
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              className="flex-row items-center flex-1"
            >
              <Repeat2 className="w-4 h-4 text-muted-foreground" />
              <Text className="text-muted-foreground ml-2">12</Text>
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              className="flex-row items-center flex-1"
            >
              <Heart className="w-4 h-4 text-muted-foreground" />
              <Text className="text-muted-foreground ml-2">148</Text>
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              className="flex-row items-center flex-1"
            >
              <Share className="w-4 h-4 text-muted-foreground" />
            </Button>
          </View>

          <View className="flex-row items-center mt-3">
            <Text className="text-muted-foreground font-medium">
              ${goat.price.toLocaleString()}
            </Text>
            <Text className="text-muted-foreground mx-2">•</Text>
            <Text className="text-primary font-medium">
              View Details
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
} 