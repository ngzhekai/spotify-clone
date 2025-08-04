import { View } from 'react-native';
import { getImageSource } from '../../utils/image';
import RecentlyPlayedList from '../../components/RecentlyPlayedList';
import { chunkArray } from '../../utils/array';
import {
  jumpBackInData,
  newReleaseData,
  recentlyPlayedData,
} from '../../data/homeScreenData';
import NewReleaseSection from '../../components/NewReleaseSection';
import JumpBackInList from '../../components/JumpBackInList';
import RecentsSection from '../../components/RecentsSection';

interface AllProps {
    themeColors: any;
    styles: any;
}

const All:React.FC<AllProps> = ({themeColors, styles}) => {
  //   const { themeColors } = useTheme();
  const rows = chunkArray(recentlyPlayedData, 2);

  return (
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
    </View>
  );
}

export default All;
