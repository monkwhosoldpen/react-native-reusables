import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/lib/constants';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? NAV_THEME.dark.text : NAV_THEME.light.text,
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background,
        },
        headerStyle: {
          backgroundColor: isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background,
        },
        headerTintColor: isDarkColorScheme ? NAV_THEME.dark.text : NAV_THEME.light.text,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          headerShown: true,
          header: ({ options }) => (
            <View 
              className="px-4 py-3 border-b border-border"
              style={{ 
                backgroundColor: isDarkColorScheme ? NAV_THEME.dark.background : NAV_THEME.light.background 
              }}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold">
                  {options.title}
                </Text>
                <View className="flex-row items-center gap-4">
                  <Ionicons 
                    name="create" 
                    size={24} 
                    color={isDarkColorScheme ? NAV_THEME.dark.text : NAV_THEME.light.text} 
                  />
                </View>
              </View>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 