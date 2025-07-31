import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    gap: 22,
    paddingBottom: 180,
  },
  itemContainer: {
    gap: 8,
    paddingHorizontal: 20,
    width: '100%',
  },
  itemRow: {
    flexDirection: 'row',
    gap: 8,
    height: 56,
    justifyContent: 'center',
  },
  item: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  itemImageContainer: {
    width: 56,
    height: '100%',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  itemTextContainer: {
    width: '70%',
    paddingLeft: 8,
    paddingRight: 10,
  },
  itemText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jumpBackInContainer: {
    gap: 20,
  },
  jumpBackInText: {
    fontSize: 22,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  jumpBackInItemContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
  },
  jumpBackInItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 140,
    gap: 2,
  },
  jumpBackInItemImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
  },
  jumpBackInItemImage: {
    width: 140,
    height: 140,
    borderRadius: 5,
  },
  jumpBackInItemTextContainer: {
    gap: 5,
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  jumpBackInItemTitle: {
    fontSize: 16,
  },
  jumpBackInItemCreator: {
    fontSize: 13,
  },
  recentsContainer: {
    gap: 18,
    // marginBottom: 125,
  },
  recentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  recentsTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  recentsShowAllText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  recentsList: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
  },
  recentsItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    width: 90,
  },
  recentsItemImage: {
    width: 90,
    height: 90,
    borderRadius: 3,
  },
  recentsItemTextContainer: {
    gap: 4,
    width: '100%',
  },
  recentsItemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  recentsItemCreator: {
    fontSize: 11,
    textTransform: 'capitalize',
  },
  newReleaseSection: {
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 20,
  },
  newReleaseArtistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  newReleaseArtistImage: {
    width: 56,
    height: 56,
    borderRadius: 30,
  },
  newReleaseArtistTextContainer: {
    gap: 5,
  },
  newReleaseArtistPlaceholder: {
    fontSize: 12,
  },
  newReleaseArtistName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  newReleaseAlbumContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
    height: 140,
  },
  newReleaseAlbumImage: {
    width: 140,
    height: 140,
  },
  newReleaseRightContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  newReleaseTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  newReleaseInnerTextContainer: {
    gap: 2,
  },
  newReleaseType: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  newReleaseTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  newReleaseAlbumArtist: {
    fontSize: 12,
  },
  newReleaseMoreContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
