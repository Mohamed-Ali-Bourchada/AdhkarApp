import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: colorScheme === 'dark' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(240, 240, 240, 0.8)',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        },
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
