import { View, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useSelectedButton } from '../../context/SelectedButtonContext';
// import RecentlyPlayedList from '../../components/RecentlyPlayedList';
// import NewReleaseSection from '../../components/NewReleaseSection';
// import {
//   recentlyPlayedData,
//   jumpBackInData,
//   newReleaseData,
// } from '../../data/homeScreenData';
// import { chunkArray } from '../../utils/array';
// import { getImageSource } from '../../utils/image';
import styles from '../../styles/HomeScreenStyles';
// import RecentsSection from '../../components/RecentsSection';
// import JumpBackInList from '../../components/JumpBackInList';
import All from '../../app/home/all';
import Music from '../home/music';
import Podcasts from '../home/podcasts';

export default function Tab() {
  const { themeColors } = useTheme();
  const { selectedButton } = useSelectedButton();
  // const rows = chunkArray(recentlyPlayedData, 2);

  const renderSelectedContent = () => {
    switch (selectedButton) {
      case 'All':
        return <All themeColors={themeColors} styles={styles} />;
      case 'Music':
        return <Music themeColors={themeColors} />;
      case 'Podcasts':
        return <Podcasts />;
      default:
        return <All themeColors={themeColors} styles={styles} />;
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        style={{ paddingTop: 10 }}
      >
        {renderSelectedContent()}
      </ScrollView>
    </View>
  );
}
