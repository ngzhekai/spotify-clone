// themes.ts
export const themes = {
  light: {
    background: '#ffffff',
    primaryText: '#121212',
    secondaryText: '#aaaaaa',
    accentText: '#1dc05c',
    // ...other light theme colors
    tabBarActiveTintColor: '#121212',
    tabBarInactiveTintColor: '#aaaaaa',
    tabBarStyle: {
      // backgroundColor: '#ffffff',
      borderBlockColor: '#b1b1b1',
      gradientTopColor: '#ffffff',
      gradientMiddleColor: 'rgba(255, 255, 255, 0.9)',
      gradientBottomColor: 'rgba(0,0,0,0)',
    },
    recentlyPlayedItem: '#aaaaaa',
    accentButton: '#1ed760',
  },
  dark: {
    background: '#121212',
    primaryText: '#ffffff',
    secondaryText: '#aaaaaa',
    accentText: '#1dc05c',
    // tabBarActiveTintColor: '#ffffff',
    // ...other dark theme colors
    title: '#ffffff',
    tabBarActiveTintColor: '#ffffff',
    tabBarInactiveTintColor: '#aaaaaa',
    tabBarStyle: {
      // backgroundColor: '#121212',
      borderBlockColor: 'transparent',
      gradientTopColor: '#121212',
      gradientMiddleColor: 'rgba(15, 15, 15, 0.9)',
      gradientBottomColor: 'rgba(0,0,0,0)',
    },
    recentlyPlayedItem: '#292929',
    accentButton: '#1ed760',
  },
};
