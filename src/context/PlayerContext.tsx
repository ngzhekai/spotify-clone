import React, { createContext, useContext, useMemo, useState, ReactNode, useCallback } from 'react';
import { NowPlayingItem } from '../types/DataItem';
import { nowPlayingData } from '../data/nowPlayingData';

interface PlayerContextType {
  current: NowPlayingItem;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setTrack: (track: NowPlayingItem) => void;
  setOutputDevice: (device: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<NowPlayingItem>(nowPlayingData);
  const [isPlaying, setIsPlaying] = useState<boolean>(nowPlayingData.isPlaying ?? false);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);

  const setTrack = useCallback((track: NowPlayingItem) => {
    setCurrent(track);
  }, []);

  const setOutputDevice = useCallback((device: string) => {
    setCurrent(prev => ({ ...prev, outputDevice: device }));
  }, []);

  const value = useMemo(
    () => ({ current, isPlaying, play, pause, togglePlay, setTrack, setOutputDevice }),
    [current, isPlaying, play, pause, togglePlay, setTrack, setOutputDevice]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within a PlayerProvider');
  return ctx;
}


