import { View, Text, StyleSheet } from 'react-native';

interface MusicProps {
  themeColors: any;
}
const Music:React.FC<MusicProps> = ({themeColors}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: themeColors.primaryText}}>Tab [Music]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Music;