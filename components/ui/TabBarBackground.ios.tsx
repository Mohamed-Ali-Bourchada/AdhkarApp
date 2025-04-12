import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  const blurIntensity = 85;
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colorScheme === 'dark' ? '#1A1D24' : '#FFFFFF',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }
        ]}
      />
      <BlurView 
        intensity={blurIntensity}
        tint={colorScheme === 'dark' ? 'dark' : 'light'}
        style={[
          StyleSheet.absoluteFill,
          {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          }
        ]}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
