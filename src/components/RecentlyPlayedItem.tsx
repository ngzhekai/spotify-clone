import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import { DataItem } from '../types/DataItem';

interface RecentlyPlayedItemProps {
  item: DataItem;
  themeColors: any;
  styles: any;
  getImageSource: (image: string | number | undefined) => any;
}

const RecentlyPlayedItem: React.FC<RecentlyPlayedItemProps> = ({ item, themeColors, styles, getImageSource }) => (
  <View
    style={[
      styles.item,
      { backgroundColor: themeColors.recentlyPlayedItem },
    ]}
    key={item.id}
  >
    <View style={styles.itemImageContainer}>
      <Image source={getImageSource(item.image)} style={styles.itemImage} />
    </View>
    <View style={styles.itemTextContainer}>
      <Text
        numberOfLines={2}
        style={[
          styles.itemText,
          { color: themeColors.primaryText },
        ]}
      >
        {item.title}
      </Text>
    </View>
  </View>
);

export default RecentlyPlayedItem; 