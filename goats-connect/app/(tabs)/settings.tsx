import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';
import { ThemeToggle } from '~/components/ThemeToggle';
import { UserMenu } from '~/components/UserMenu';

export default function SettingsScreen() {
  return (
    <ScrollView className="flex-1 p-4">
      {/* Account Section */}
      <Card className="p-4 mb-4">
        <Text className="text-lg font-semibold mb-4">Account</Text>
        <UserMenu showAsButton />
      </Card>

      {/* Appearance Section */}
      <Card className="p-4 mb-4">
        <Text className="text-lg font-semibold mb-4">Appearance</Text>
        <View className="flex-row items-center justify-between">
          <Text>Theme</Text>
          <ThemeToggle />
        </View>
      </Card>
    </ScrollView>
  );
} 