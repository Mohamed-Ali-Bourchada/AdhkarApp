import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

// TabBarBackground component for Android and web
export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  
  return (
    <View 
      style={[
        styles.container,
        { 
          backgroundColor: colorScheme === 'dark' ? '#1A1D24' : '#FFFFFF',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        }
      ]} 
    />
  );
}

export function useBottomTabOverflow() {
  // Return a value to create margin between content and tab bar
  return 75;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
});
