import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: colorScheme === 'dark' ? '#000' : 'rgba(0,0,0,0.2)',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          position: Platform.OS === 'ios' ? 'absolute' : undefined,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: ({ color }) => (
            <View style={styles.tabLabelContainer}>
              <Text style={[styles.arabicLabel, { color }]}>الرئيسية</Text>
              <Text style={[styles.englishLabel, { color }]}>Home</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: ({ color }) => (
            <View style={styles.tabLabelContainer}>
              <Text style={[styles.arabicLabel, { color }]}>الإعدادات</Text>
              <Text style={[styles.englishLabel, { color }]}>Settings</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabLabelContainer: {
    alignItems: 'center',
    marginTop: -4,
  },
  arabicLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 1,
  },
  englishLabel: {
    fontSize: 10,
    opacity: 0.8,
  },
});
