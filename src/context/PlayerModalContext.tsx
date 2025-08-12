import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Dimensions } from 'react-native';
import Animated, { runOnJS, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface PlayerModalContextType {
  isPlayerModalVisible: boolean;
  /** Shared translateY for the full-screen player modal. 0 = open, screenHeight = closed */
  modalTranslateY: Animated.SharedValue<number>;
  /** Animate to open the modal */
  openPlayerModal: () => void;
  /** Animate to close the modal */
  closePlayerModal: () => void;
  /** Ensure the modal overlay is mounted without changing its position (for interactive drags) */
  ensureModalMounted: () => void;
}

const PlayerModalContext = createContext<PlayerModalContextType | undefined>(undefined);

export function PlayerModalProvider({ children }: { children: ReactNode }) {
  const [isPlayerModalVisible, setIsPlayerModalVisible] = useState(false);

  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const modalTranslateY = useSharedValue<number>(SCREEN_HEIGHT);

  const openPlayerModal = () => {
    // Ensure visible so backdrop/touches are enabled
    setIsPlayerModalVisible(true);
    modalTranslateY.value = withSpring(0, {
      damping: 40,
      stiffness: 200,
    });
  };

  const closePlayerModal = () => {
    modalTranslateY.value = withSpring(
      SCREEN_HEIGHT,
      {
        damping: 20,
        stiffness: 90,
      },
      () => {
        runOnJS(setIsPlayerModalVisible)(false);
      }
    );
  };

  const ensureModalMounted = () => {
    setIsPlayerModalVisible(true);
  };

  const value = useMemo(
    () => ({ isPlayerModalVisible, modalTranslateY, openPlayerModal, closePlayerModal, ensureModalMounted }),
    [isPlayerModalVisible]
  );

  return (
    <PlayerModalContext.Provider value={value}>{children}</PlayerModalContext.Provider>
  );
}

export function usePlayerModal() {
  const context = useContext(PlayerModalContext);
  if (context === undefined) {
    throw new Error('usePlayerModal must be used within a PlayerModalProvider');
  }
  return context;
} 