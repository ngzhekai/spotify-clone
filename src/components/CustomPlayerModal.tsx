import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  useSharedValue,
  useAnimatedReaction,
  Extrapolation,
} from "react-native-reanimated";
import { usePlayerModal } from "../context/PlayerModalContext";
import { Image } from "expo-image";
import { getImageSource } from "../utils/image";
import { nowPlayingData } from "../data/nowPlayingData";
import { Repeat2, Shuffle } from "lucide-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MODAL_HEIGHT = SCREEN_HEIGHT;

export default function CustomPlayerModal() {
  const { themeColors } = useTheme();
  const { modalTranslateY, closePlayerModal, isPlayerModalVisible } =
    usePlayerModal();
  const insets = useSafeAreaInsets();

  // Ensure touches are enabled whenever the modal is even partially onscreen
  const [pointerEnabled, setPointerEnabled] = useState(false);

  useEffect(() => {
    if (isPlayerModalVisible) setPointerEnabled(true);
  }, [isPlayerModalVisible]);

  useAnimatedReaction(
    () => modalTranslateY.value,
    (value) => {
      // Enable if the modal is at least 1px onscreen; disable when fully offscreen
      const enabled = value < MODAL_HEIGHT - 1;
      runOnJS(setPointerEnabled)(enabled);
    }
  );

  // Animation values
  const context = useSharedValue({ y: 0 });

  // Pan gesture
  const panGesture = Gesture.Pan()
    // Require a small vertical movement so taps don't get hijacked by the pan
    .activeOffsetY([-10, 10])
    .onStart(() => {
      context.value = { y: modalTranslateY.value };
    })
    .onUpdate((event) => {
      const next = event.translationY + context.value.y;
      //   modalTranslateY.value = Math.min(Math.max(next, 0), MODAL_HEIGHT);
      modalTranslateY.value = Math.max(0, Math.min(next, MODAL_HEIGHT));
    })
    .onEnd((event) => {
      const shouldDismiss =
        event.translationY > 100 ||
        event.velocityY > 500 ||
        modalTranslateY.value > MODAL_HEIGHT * 0.25;

      if (shouldDismiss) {
        runOnJS(closePlayerModal)();
      } else {
        modalTranslateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
      }
    });

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      modalTranslateY.value,
      [MODAL_HEIGHT - 180, MODAL_HEIGHT],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      //   transform: [{ translateY: offset }],
      opacity: opacity,
      transform: [{ translateY: modalTranslateY.value }],
    };
  });

  const handleClose = useCallback(() => {
    closePlayerModal();
  }, [closePlayerModal]);

  return (
    <GestureHandlerRootView
      style={StyleSheet.absoluteFill}
      pointerEvents={pointerEnabled ? "auto" : "none"}
    >
      {/* Modal Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <View
            style={[
              styles.container,
              {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                backgroundColor: "#282828",
              },
            ]}
          >
            <View style={styles.topBar}>
              <Pressable onPress={handleClose}>
                <Feather
                  name="chevron-down"
                  size={28}
                  color={themeColors.primaryText}
                />
              </Pressable>
              <Text
                style={[
                  styles.playlistName,
                  { color: themeColors.primaryText },
                ]}
              >
                Chinese Playlists
              </Text>
              <Feather
                name="more-horizontal"
                size={20}
                color={themeColors.primaryText}
              />
            </View>
            <View style={styles.playerImageContainer}>
              <Image
                source={getImageSource(nowPlayingData.image)}
                style={styles.playerImage}
              />
            </View>

            <View style={styles.bottomContainer}>
              <View style={styles.trackInfoContainer}>
                <View>
                  <Text
                    style={[
                      styles.trackNameText,
                      { color: themeColors.primaryText },
                    ]}
                  >
                    {nowPlayingData.trackName}
                  </Text>
                  <Text
                    style={[
                      styles.artistsNameText,
                      { color: themeColors.secondaryText },
                    ]}
                  >
                    {nowPlayingData.artists.join(", ")}
                  </Text>
                </View>
                <Ionicons
                  name="add-circle-outline"
                  size={28}
                  color={themeColors.secondaryText}
                />
              </View>
              <View style={styles.playerControls}>
                <Shuffle size={25} color={themeColors.primaryText} />
                <Ionicons
                  name="play-skip-back"
                  size={30}
                  color={themeColors.primaryText}
                />
                <Ionicons
                  name={
                    nowPlayingData.isPlaying ? "pause-circle" : "play-circle"
                  }
                  size={80}
                  color={themeColors.primaryText}
                />
                <Ionicons
                  name="play-skip-forward"
                  size={30}
                  color={themeColors.primaryText}
                />
                <Repeat2 size={25} color={themeColors.primaryText} />
              </View>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropPressable: {
    flex: 1,
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: MODAL_HEIGHT,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    rowGap: 60,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  playlistName: {
    fontWeight: "bold",
    fontSize: 12,
  },
  playerImageContainer: { width: "100%", alignItems: "center" },
  playerImage: {
    width: 340,
    height: 340,
    borderRadius: 8,
  },
  bottomContainer: {
    flexDirection: "column",
    rowGap: 20,
  },
  trackInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  trackNameText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  artistsNameText: {
    fontSize: 14,
  },
  playerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
