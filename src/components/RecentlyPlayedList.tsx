import React from 'react';
import { View } from 'react-native';
import RecentlyPlayedItem from './RecentlyPlayedItem';
import { DataItem } from '../types/DataItem';

interface RecentlyPlayedListProps {
  rows: DataItem[][];
  themeColors: any;
  styles: any;
  getImageSource: (image: string | number | undefined) => any;
}

const RecentlyPlayedList: React.FC<RecentlyPlayedListProps> = ({ rows, themeColors, styles, getImageSource }) => (
  <View style={styles.itemContainer}>
    {rows.map((row, rowIndex) => (
      <View style={styles.itemRow} key={rowIndex}>
        {row.map((item) => (
          <RecentlyPlayedItem
            key={item.id}
            item={item}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
        ))}
      </View>
    ))}
  </View>
);

export default RecentlyPlayedList; 