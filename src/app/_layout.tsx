import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { SelectedButtonProvider } from '../context/SelectedButtonContext';
import { PlayerModalProvider } from '../context/PlayerModalContext';
import { PlayerProvider } from '../context/PlayerContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomPlayerModal from '../components/CustomPlayerModal';
import PlayerBarOverlay from '../components/PlayerBarOverlay';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SelectedButtonProvider>
        <PlayerProvider>
          <PlayerModalProvider>
            <RootLayoutContent />
          </PlayerModalProvider>
        </PlayerProvider>
      </SelectedButtonProvider>
    </ThemeProvider>
  );
}

function RootLayoutContent() {
  const { theme, themeColors } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: themeColors.background }}
          edges={['top']}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>

        {/* Custom Player Modal - always mounted, controlled by shared translateY */}
        <CustomPlayerModal />

        {/* Mini Player Overlay - placed after modal to ensure it stacks above */}
        <PlayerBarOverlay />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
