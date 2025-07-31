import { View, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecentlyPlayedList from '../../components/RecentlyPlayedList';
import NewReleaseSection from '../../components/NewReleaseSection';
import {
  recentlyPlayedData,
  jumpBackInData,
  newReleaseData,
} from '../../data/homeScreenData';
import { chunkArray } from '../../utils/array';
import { getImageSource } from '../../utils/image';
import styles from '../../styles/HomeScreenStyles';
import RecentsSection from '../../components/RecentsSection';
import JumpBackInList from '../../components/JumpBackInList';

export default function Tab() {
  const { themeColors } = useTheme();
  const rows = chunkArray(recentlyPlayedData, 2);

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* <SafeAreaView> */}
      <ScrollView
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        style={{ paddingTop: 10 }}
      >
        <View style={styles.scrollViewContainer}>
          <RecentlyPlayedList
            rows={rows}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <NewReleaseSection
            data={newReleaseData}
            themeColors={themeColors}
            styles={styles}
          />
          <JumpBackInList
            data={jumpBackInData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
          <RecentsSection
            recentlyPlayedData={recentlyPlayedData}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
}
