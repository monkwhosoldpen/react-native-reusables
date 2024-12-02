import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View, Image, ImageErrorEventData, NativeSyntheticEvent } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Providers } from '~/components/Providers';
import { UserMenu } from '~/components/UserMenu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { HeaderContent } from '~/components/HeaderContent';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [splashState, setSplashState] = React.useState<'first' | 'second' | 'done'>('first');

  React.useEffect(() => {
    (async () => {
      console.log('Splash screen starting...');
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      console.log('Splash screen ending...');
      SplashScreen.hideAsync();

      setTimeout(() => {
        setSplashState('second');
        setTimeout(() => {
          setSplashState('done');
        }, 500);
      }, 500);
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  const handleImageError = (e: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.error('Image loading error:', e.nativeEvent.error);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
  };

  if (splashState === 'first') {
    return (
      <View style={{ flex: 1, backgroundColor: isDarkColorScheme ? '#000' : '#fff' }}>
        <Image
          source={{ uri: 'https://placehold.co/600x400/png?text=First+Image' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </View>
    );
  }

  if (splashState === 'second') {
    return (
      <View style={{ flex: 1, backgroundColor: isDarkColorScheme ? '#000' : '#fff' }}>
        <Image
          source={{ uri: 'https://placehold.co/600x400/png?text=Second+Image' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </View>
    );
  }

  return (
    <Providers>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerRight: () => <HeaderContent />,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              title: 'Goats Connect',
              headerShown: true,
            }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </Providers>
  );
}
