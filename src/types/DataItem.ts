export interface DataItem {
  id: string;
  title: string;
  image?: string | number;
  type: 'playlist' | 'album' | 'single';
  creator: string;
  artists?: string[];
  artistImage?: string | number;
}

export interface AlbumItem {
  id: string;
  title: string;
  image?: string | number;
  artistImage?: string | number;
  type: 'album' | 'single';
  artists: string[];
}

export interface NowPlayingItem {
  id: string;
  trackName: string;
  artists: string[];
  image: string;
  outputDevice: string;
}
