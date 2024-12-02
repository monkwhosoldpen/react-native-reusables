import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { useAuth } from '~/providers/AuthProvider';
import { SignInModal } from '~/components/modals/SignInModal';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { Card } from '~/components/ui/card';

export default function SettingsScreen() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showSignInModal, setShowSignInModal] = React.useState(false);

  return (
    <ScrollView className="flex-1 p-4">
      <Card className="p-4 mb-4">
        {isAuthenticated ? (
          <View className="flex-row items-center">
            <Avatar className="h-16 w-16 rounded-full mr-4" alt={''}>
              <AvatarImage source={{ uri: user?.avatarUrl }} />
              <AvatarFallback>
                <Text className="text-lg">{user?.username?.[0]}</Text>
              </AvatarFallback>
            </Avatar>

            <View className="flex-1">
              <Text className="text-lg font-semibold">{user?.username}</Text>
              <Text className="text-muted-foreground">{user?.email}</Text>
              <Text className="text-sm text-primary capitalize">
                {user?.accountType} Account
              </Text>
            </View>
          </View>
        ) : (
          <View className="items-center py-4">
            <Text className="text-muted-foreground mb-4">
              Sign in to access all features
            </Text>
            <Button onPress={() => setShowSignInModal(true)}>
              <Text className="text-muted-foreground">
                Sign In
              </Text>
            </Button>

          </View>
        )}
      </Card>

      {isAuthenticated && (
        <Button
          variant="destructive"
          onPress={logout}
          className="w-full"
        >
          <Text className="text-muted-foreground">
            Sign out
          </Text>
        </Button>
      )}

      <SignInModal
        open={showSignInModal}
        onOpenChange={setShowSignInModal}
      />
    </ScrollView>
  );
} 