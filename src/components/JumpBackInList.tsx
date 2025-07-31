import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import JumpBackInItem from './JumpBackInItem';
import { DataItem } from '../types/DataItem';

interface JumpBackInListProps {
  data: DataItem[];
  themeColors: any;
  styles: any;
  getImageSource: (image: string | number | undefined) => any;
}

const JumpBackInList: React.FC<JumpBackInListProps> = ({
  data,
  themeColors,
  styles,
  getImageSource,
}) => (
  <View style={styles.jumpBackInContainer}>
    <Text style={[styles.jumpBackInText, { color: themeColors.primaryText }]}>
      Jump back in
    </Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.jumpBackInItemContainer}>
        {data.map((item, index) => (
          <JumpBackInItem
            key={item.id}
            item={item}
            themeColors={themeColors}
            styles={styles}
            getImageSource={getImageSource}
          />
        ))}
      </View>
    </ScrollView>
  </View>
);

export default JumpBackInList;
