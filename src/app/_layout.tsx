import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const { theme, themeColors } = useTheme();
  return (
    <React.Fragment>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: themeColors.background }}
        // style={{ flex: 1 }}
        edges={['top']}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </React.Fragment>
  );
}
