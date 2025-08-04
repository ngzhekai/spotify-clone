import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function Tab() {
  const { theme, themeColors, toggleTheme } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={{ color: themeColors.primaryText }}>
        Current Theme: {theme}
      </Text>

      <Button
        title={theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        onPress={toggleTheme}
        color={themeColors.accentButton}
      />
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
