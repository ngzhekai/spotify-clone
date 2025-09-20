import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { usePlayerModal } from '../context/PlayerModalContext';
import { getImageSource } from '../utils/image';
import { usePlayer } from '../context/PlayerContext';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT;

export default function PlayerBarOverlay() {
  const { themeColors } = useTheme();
  const { modalTranslateY, openPlayerModal, ensureModalMounted } =
    usePlayerModal();
  const { current, isPlaying, togglePlay } = usePlayer();

  const [overlayInteractive, setOverlayInteractive] = useState(true);

  useAnimatedReaction(
    () => modalTranslateY.value,
    (value) => {
      const enabled = value >= MODAL_HEIGHT - 1; // fully offscreen
      runOnJS(setOverlayInteractive)(enabled);
    }
  );

  const containerAnimatedStyle = useAnimatedStyle(() => {
    // Pixels the modal has moved up from the bottom
    const progressPx = MODAL_HEIGHT - modalTranslateY.value;
    // Move the overlay up in lockstep with the modal's upward motion
    const offset = -progressPx;
    // Fade quickly as it starts moving so it visually blends into the modal
    const opacity = interpolate(
      progressPx,
      [0, 200, MODAL_HEIGHT],
      [1, 0, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY: offset }],
      opacity,
    };
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(ensureModalMounted)();
    })
    .onUpdate((event) => {
      const y = Math.max(0, Math.min(event.absoluteY, MODAL_HEIGHT));
      modalTranslateY.value = y;
    })
    .onEnd((event) => {
      const progress = 1 - modalTranslateY.value / MODAL_HEIGHT;
      const shouldOpen =
        event.translationY < -40 || event.velocityY < -400 || progress > 0.35;
      if (shouldOpen) {
        runOnJS(openPlayerModal)();
      } else {
        modalTranslateY.value = withSpring(MODAL_HEIGHT, {
          damping: 20,
          stiffness: 300,
        });
      }
    });

  // Tap gesture for the play/pause control
  const playTapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(togglePlay)();
  });

  // Separate tap gesture for opening the modal, which should fail if playTap recognizes
  const openTapGesture = Gesture.Tap()
    .maxDuration(300)
    .hitSlop(12)
    .requireExternalGestureToFail(playTapGesture)
    .onEnd(() => {
      runOnJS(openPlayerModal)();
    });

  return (
    <Animated.View
      style={[styles.playerBarOverlay, containerAnimatedStyle]}
      pointerEvents={overlayInteractive ? 'auto' : 'none'}
      collapsable={false}
    >
      <GestureDetector
        gesture={Gesture.Race(openTapGesture, panGesture.activeOffsetY([-3, 3]))}
      >
        <View style={[styles.playerBar, { backgroundColor: '#282828' }]}>
          <View style={styles.playerBarImageContainer}>
            <Image source={getImageSource(current.image)} style={styles.playerBarImage} />
          </View>
          <View style={styles.trackInfo}>
            <View style={styles.trackInfoTextContainer}>
              <Text
                style={[
                  styles.trackNameText,
                  { color: themeColors.primaryText },
                ]}
              >
                {current.trackName}
              </Text>
              <Text
                style={[
                  styles.trackInfoSeparator,
                  { color: themeColors.primaryText },
                ]}
              >
                &bull;
              </Text>
              <Text
                style={[
                  styles.artistText,
                  { color: themeColors.secondaryText },
                ]}
              >
                {current.artists.join(', ')}
              </Text>
            </View>
            <Text
              style={[
                styles.outputDeviceText,
                { color: themeColors.accentText },
              ]}
            >
              {current.outputDevice}
            </Text>
          </View>
          <View style={styles.playerBarControls}>
            <Ionicons
              name="headset-outline"
              size={26}
              color={themeColors.accentText}
            />
            <GestureDetector gesture={playTapGesture}>
              <View>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  color={themeColors.primaryText}
                  size={26}
                />
              </View>
            </GestureDetector>
          </View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  playerBarOverlay: {
    position: 'absolute',
    bottom: 95,
    left: 0,
    right: 0,
    zIndex: 10000,
    elevation: 10000,
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
});
