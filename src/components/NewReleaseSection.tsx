import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { getImageSource } from '../utils/image';
import { AlbumItem } from '../types/DataItem';

interface NewReleaseSectionProps {
  data: AlbumItem;
  themeColors: any;
  styles: any;
}

const NewReleaseSection: React.FC<NewReleaseSectionProps> = ({
  data,
  themeColors,
  styles,
}) => {
  return (
    <View style={styles.newReleaseSection}>
      <View style={styles.newReleaseArtistContainer}>
        <Image
          source={getImageSource(data.artistImage)}
          style={styles.newReleaseArtistImage}
        />
        <View style={styles.newReleaseArtistTextContainer}>
          <Text
            style={[
              { color: themeColors.secondaryText },
              styles.newReleaseArtistPlaceholder,
            ]}
          >
            New Release from
          </Text>
          <Text
            style={[
              { color: themeColors.primaryText },
              styles.newReleaseArtistName,
            ]}
          >
            {data.artists[0]}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.newReleaseAlbumContainer,
          { backgroundColor: themeColors.recentlyPlayedItem },
        ]}
      >
        <Image
          source={getImageSource(data.image)}
          style={styles.newReleaseAlbumImage}
        />
        <View style={styles.newReleaseRightContainer}>
          <View style={styles.newReleaseTextContainer}>
            <View style={styles.newReleaseInnerTextContainer}>
              <Text
                style={[
                  styles.newReleaseType,
                  { color: themeColors.secondaryText },
                ]}
              >
                {data.type}
              </Text>
              <Text
                style={[
                  styles.newReleaseTitle,
                  { color: themeColors.primaryText },
                ]}
              >
                {data.title}
              </Text>
              <Text
                style={[
                  styles.newReleaseAlbumArtist,
                  { color: themeColors.secondaryText },
                ]}
              >
                {data.artists?.join(', ')}
              </Text>
            </View>
            <Ionicons
              name="add-circle-outline"
              size={28}
              color={themeColors.secondaryText}
            />
          </View>
          <View style={styles.newReleaseMoreContainer}>
            <Feather
              name="more-horizontal"
              size={23}
              color={themeColors.secondaryText}
            />
            <Ionicons
              name="play-circle"
              size={34}
              color={themeColors.primaryText}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewReleaseSection;
