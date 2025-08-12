import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated as RNAnimated,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useSelectedButton } from '../../context/SelectedButtonContext';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { NowPlayingItem } from '../../types/DataItem';
import { getImageSource } from '../../utils/image';
import { useRef, ReactNode, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { usePlayerModal } from '../../context/PlayerModalContext';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  Extrapolation,
  useAnimatedReaction,
} from 'react-native-reanimated';

// import { getColors } from 'react-native-image-colors';

const nowPlayingData: NowPlayingItem = {
  id: '1',
  trackName: 'Thunder',
  artists: ['Imagine Dragons'],
  outputDevice: "Gilbert's AirPods",
  image: 'https://i.scdn.co/image/ab67616d00001e025a43918ea90bf1e44b7bdcfd',
  //   image: 'https://i.scdn.co/image/ab67616d00001e025675e83f707f1d7271e5cf8a',
  //   image: 'https://i.scdn.co/image/ab67616d00001e026224d1236b0e0a0e1586efbb',
};

const profileData = {
  image: 'https://i.scdn.co/image/ab6775700000ee859b14428e97a956c276470156',
};

// const initialState = {
//   colorOne: { value: '', name: '' },
//   colorTwo: { value: '', name: '' },
//   colorThree: { value: '', name: '' },
//   colorFour: { value: '', name: '' },
//   rawResult: '',
// };

// Shared header component that includes the profile image
const SharedHeader = ({ children }: { children?: ReactNode }) => {
  const { themeColors } = useTheme();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <Image
        source={getImageSource(profileData.image)}
        style={{
          width: 32,
          height: 32,
          borderRadius: 20,
          overflow: 'hidden',
        }}
      />
      {children}
    </View>
  );
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT;

export default function TabsLayout() {
  const { themeColors } = useTheme();
  const { modalTranslateY, openPlayerModal, ensureModalMounted, isPlayerModalVisible } =
    usePlayerModal();

  // Drag context for the modal; we drive modalTranslateY directly for perfect sync
  const modalDragContextY = useSharedValue(0);

  // Keep overlay always interactive; modal overlay above will capture when visible

  // Pan gesture: drag on the mini player bar directly drives the modal's translateY
  const panGesture = Gesture.Pan()
    .onStart(() => {
      modalDragContextY.value = modalTranslateY.value;
      // Ensure the modal overlay is mounted so it can follow the drag even before threshold
      runOnJS(ensureModalMounted)();
    })
    .onUpdate((event) => {
      // Drive modal top edge to the finger's Y position for perfect sync
      const y = Math.max(0, Math.min(event.absoluteY, MODAL_HEIGHT));
      modalTranslateY.value = y;
    })
    .onEnd((event) => {
      const progress = 1 - modalTranslateY.value / MODAL_HEIGHT; // 0 closed, 1 fully open
      const shouldOpen =
        event.translationY < -40 || // small upward drag
        event.velocityY < -400 || // fling up
        progress > 0.35; // if at least 35% revealed, complete opening

      if (shouldOpen) {
        runOnJS(openPlayerModal)();
      } else {
        // Return modal to closed if not enough
        modalTranslateY.value = withSpring(MODAL_HEIGHT, {
          damping: 20,
          stiffness: 300,
        });
      }
    });
  // const allFadeAnim = useRef(new Animated.Value(1)).current;

  /*           
    Bug: Cannot find native module 'ImageColors' for react-native-image-colors on ios
    Will have to use static colors for now
    */

  //   const [colors, setColors] = useState(initialState);
  //   const [loading, setLoading] = useState(true);

  //   const fetchColors = async (imageUrl: string) => {
  //     const result = await getColors(imageUrl, {
  //       fallback: '#000000',
  //       pixelSpacing: 5,
  //     });
  //     switch (result.platform) {
  //       case 'android':
  //       case 'web':
  //         setColors({
  //           colorOne: { value: result.lightVibrant, name: 'lightVibrant' },
  //           colorTwo: { value: result.dominant, name: 'dominant' },
  //           colorThree: { value: result.vibrant, name: 'vibrant' },
  //           colorFour: { value: result.darkVibrant, name: 'darkVibrant' },
  //           rawResult: JSON.stringify(result),
  //         });
  //         break;
  //       case 'ios':
  //         setColors({
  //           colorOne: { value: result.background, name: 'background' },
  //           colorTwo: { value: result.detail, name: 'detail' },
  //           colorThree: { value: result.primary, name: 'primary' },
  //           colorFour: { value: result.secondary, name: 'secondary' },
  //           rawResult: JSON.stringify(result),
  //         });
  //         break;
  //       default:
  //         throw new Error('Unexpected platform');
  //     }

  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchColors(nowPlayingData.image);
  //   }, [nowPlayingData]);

  const { selectedButton, setSelectedButton } = useSelectedButton();

  // Config for header buttons
  const headerButtons = [
    { key: 'All', label: 'All' },
    { key: 'Music', label: 'Music' },
    { key: 'Podcasts', label: 'Podcasts' },
  ];

  // Animated values for each button
  const colorAnims = useRef(
    headerButtons.reduce((acc, btn) => {
      acc[btn.key] = new RNAnimated.Value(btn.key === 'All' ? 1 : 0);
      return acc;
    }, {} as Record<string, RNAnimated.Value>)
  ).current;

  // Interpolated colors for each button
  const getButtonColors = (key: string) => {
    const color = colorAnims[key].interpolate({
      inputRange: [0, 1],
      outputRange: [
        themeColors.headerButtonStyle.inactiveTintColor,
        themeColors.headerButtonStyle.activeTintColor,
      ],
    });
    const textColor = colorAnims[key].interpolate({
      inputRange: [0, 1],
      outputRange: [
        themeColors.headerButtonStyle.inactivateTextColor,
        themeColors.headerButtonStyle.activeTextColor,
      ],
    });
    return { color, textColor };
  };

  // Animate all buttons, activating the selected one
  const handleButtonPress = (button: string) => {
    if (selectedButton !== button) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      headerButtons.forEach(({ key }) => {
        RNAnimated.timing(colorAnims[key], {
          toValue: key === button ? 1 : 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
      });
      setSelectedButton(button);
    }
  };

  // Overlay moved to root; no animated style needed here
  const containerAnimatedStyle = useAnimatedStyle(() => ({ }));

  return (
    <View style={styles.mainContainer}>
      {/* Tab Screens - This will render the actual screen content */}
      <View style={styles.tabContainer}>
        <Tabs
          screenOptions={{
            headerShown: true,
            headerTintColor: themeColors.primaryText,
            tabBarActiveTintColor: themeColors.tabBarActiveTintColor,
            tabBarInactiveTintColor: themeColors.tabBarInactiveTintColor,
            tabBarStyle: {
              position: 'absolute',
              height: 95,
              paddingTop: 10,
              borderBlockColor: themeColors.tabBarStyle.borderBlockColor,
            },
            // header: () => <SharedHeader />,
            tabBarBackground: () => (
              <LinearGradient
                colors={[
                  themeColors.tabBarStyle.gradientTopColor,
                  themeColors.tabBarStyle.gradientMiddleColor,
                  themeColors.tabBarStyle.gradientBottomColor,
                ]}
                start={{ x: 1, y: 0.8 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  //   height: 95,
                  height: 155, // height with player overlay
                  bottom: 0,
                  width: '100%',
                }}
              />
            ),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <View style={{ alignItems: 'center' }}>
                  <Ionicons name="home" color={color} size={size} />
                  <View style={{ height: 6 }} />
                </View>
              ),
              header: () => (
                <SharedHeader>
                  <View style={styles.headerButtonContainer}>
                    {headerButtons.map(({ key, label }) => {
                      const { color, textColor } = getButtonColors(key);
                      return (
                        <Pressable
                          key={key}
                          onPress={() => handleButtonPress(key)}
                        >
                          <RNAnimated.View
                            style={[
                              styles.headerButton,
                              { backgroundColor: color },
                            ]}
                          >
                            <RNAnimated.Text
                              style={[
                                styles.headerButtonText,
                                { color: textColor },
                              ]}
                            >
                              {label}
                            </RNAnimated.Text>
                          </RNAnimated.View>
                        </Pressable>
                      );
                    })}
                  </View>
                </SharedHeader>
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Search',
              tabBarIcon: ({ color, size }) => (
                <>
                  <Ionicons name="search" color={color} size={size} />
                  <View style={{ height: 6 }} />
                </>
              ),
              header: () => (
                <SharedHeader>
                  <View>
                    <Text
                      style={{
                        color: themeColors.primaryText,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      Search
                    </Text>
                  </View>
                </SharedHeader>
              ),
            }}
          />
          <Tabs.Screen
            name="library"
            options={{
              title: 'Your Library',
              tabBarIcon: ({ color, size }) => (
                <>
                  <Ionicons name="library" color={color} size={size} />
                  <View style={{ height: 6 }} />
                </>
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: 'Create',
              tabBarIcon: ({ color, size }) => (
                <>
                  <Ionicons name="add" color={color} size={size} />
                  <View style={{ height: 6 }} />
                </>
              ),
            }}
          />
        </Tabs>
      </View>

      {/* Player Bar Overlay moved to root layout to ensure it stacks above modal */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
  },
  playerBarOverlay: {
    position: 'absolute',
    bottom: 95,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  playerBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginHorizontal: 9,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  playerBarImageContainer: {
    width: 40,
    height: 40,
  },
  playerBarImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  trackInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 3,
    marginHorizontal: 10,
    height: '100%',
  },
  trackInfoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackNameText: {
    fontSize: 12,
  },
  trackInfoSeparator: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 2,
  },
  artistText: {
    fontSize: 12,
  },
  outputDeviceText: {
    fontSize: 12,
  },
  playerBarControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  /* Header */
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 8,
    gap: 12,
    width: '100%',
  },
  headerButtonContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  headerButton: {
    paddingHorizontal: 16,
    borderRadius: 15,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  headerButtonText: {
    fontSize: 12,
  },
});
