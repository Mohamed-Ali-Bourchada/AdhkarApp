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
          height: 88,
          paddingBottom: 15,
          paddingTop: 5,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colorScheme === 'dark' ? '#1A1D24' : '#FFFFFF',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
          zIndex: 100,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0,
          fontWeight: '500',
        },
        tabBarItemStyle: {
          paddingVertical: 5,
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
        name="custom-texts"
        options={{
          title: 'My Texts',
          tabBarLabel: ({ color }) => (
            <View style={styles.tabLabelContainer}>
              <Text style={[styles.arabicLabel, { color }]}>نصوصي</Text>
              <Text style={[styles.englishLabel, { color }]}>My Texts</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} />,
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
    marginTop: 0,
    paddingBottom: 0,
  },
  arabicLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  englishLabel: {
    fontSize: 10,
    opacity: 0.9,
    fontWeight: '400',
    textAlign: 'center',
  },
});
