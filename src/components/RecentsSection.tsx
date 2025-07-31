import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';

interface RecentsSectionProps {
  recentlyPlayedData: any[];
  themeColors: any;
  styles: any;
  getImageSource: (image: string | number | undefined) => any;
}

const RecentsSection: React.FC<RecentsSectionProps> = ({ recentlyPlayedData, themeColors, styles, getImageSource }) => {
  return (
    <View style={styles.recentsContainer}>
      <View style={styles.recentsHeader}>
        <Text
          style={[
            styles.recentsTitleText,
            { color: themeColors.primaryText },
          ]}
        >
          Recents
        </Text>
        <Text
          style={[
            styles.recentsShowAllText,
            { color: themeColors.secondaryText },
          ]}
        >
          Show all
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.recentsList}>
          {recentlyPlayedData.map((item) => {
            return (
              <View style={styles.recentsItem} key={item.id}>
                <Image
                  source={getImageSource(item.image)}
                  style={styles.recentsItemImage}
                />
                <View style={styles.recentsItemTextContainer}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.recentsItemTitle,
                      { color: themeColors.primaryText },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.recentsItemCreator,
                      { color: themeColors.secondaryText },
                    ]}
                  >
                    {item.type} &bull; {item.creator}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentsSection; 