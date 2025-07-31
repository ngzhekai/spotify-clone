import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import { DataItem } from '../types/DataItem';

interface JumpBackInItemProps {
  item: DataItem;
  themeColors: any;
  styles: any;
  getImageSource: (image: string | number | undefined) => any;
}

const JumpBackInItem: React.FC<JumpBackInItemProps> = ({ item, themeColors, styles, getImageSource }) => (
  <View style={styles.jumpBackInItem}>
    <View style={styles.jumpBackInItemImageContainer}>
      <Image source={getImageSource(item.image)} style={styles.jumpBackInItemImage} />
    </View>
    <View style={styles.jumpBackInItemTextContainer}>
      <Text
        numberOfLines={1}
        style={[
          styles.jumpBackInItemTitle,
          { color: themeColors.primaryText },
        ]}
      >
        {item.title}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          styles.jumpBackInItemCreator,
          { color: themeColors.secondaryText },
        ]}
      >
        {item.creator}
      </Text>
    </View>
  </View>
);

export default JumpBackInItem; 