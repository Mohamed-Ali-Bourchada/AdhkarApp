import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface CategoryCardProps {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export function CategoryCard({ id, title, arabicTitle, description, icon }: CategoryCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const navigateToCategory = () => {
    router.push(`/category/${id}`);
  };

  // Determine background colors based on category and color scheme
  let gradientColors = ['#000', '#000'];
  
  if (id === 'morning') {
    gradientColors = colorScheme === 'dark' 
      ? ['#1F3A52', '#0F2A42'] 
      : ['#77A5CC', '#5791C2'];
  } else if (id === 'evening') {
    gradientColors = colorScheme === 'dark' 
      ? ['#2D3546', '#1D2536'] 
      : ['#595F85', '#424675'];
  } else if (id === 'sleep') {
    gradientColors = colorScheme === 'dark' 
      ? ['#2A2D40', '#1A1D30'] 
      : ['#454869', '#353859'];
  }

  // Make sure the icon is valid
  const safeIcon: keyof typeof Ionicons.glyphMap = 
    typeof icon === 'string' && icon in Ionicons.glyphMap
      ? icon 
      : 'bookmark-outline';

  return (
    <Pressable 
      style={[styles.container, { 
        backgroundColor: colors.card, 
        borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        shadowColor: colorScheme === 'dark' ? '#000' : 'rgba(0,0,0,0.1)'
      }]} 
      onPress={navigateToCategory}
      android_ripple={{color: 'rgba(0,0,0,0.1)'}}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.iconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={safeIcon} size={28} color="#FFFFFF" />
      </LinearGradient>
      
      <View style={styles.textContainer}>
        <Text style={[styles.arabicTitle, { color: colors.arabicText }]}>
          {arabicTitle}
        </Text>
        <Text style={[styles.description, { color: colors.translationText }]}>
          {description}
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      
      <View style={styles.chevronContainer}>
        <Ionicons 
          name="chevron-forward-circle" 
          size={26} 
          color={colorScheme === 'dark' ? '#3D5A72' : '#6899BF'} 
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    borderWidth: 1,
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  arabicTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'right',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'right',
    fontWeight: '400',
  },
  chevronContainer: {
    padding: 6,
  }
}); 