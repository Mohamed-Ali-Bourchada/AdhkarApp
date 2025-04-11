import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolate 
} from 'react-native-reanimated';
import { router } from 'expo-router';

interface CategoryBlockProps {
  id: string;
  title: string;
  arabicTitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium' | 'large';
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - (CARD_MARGIN * 6)) / 2; // 2 cards per row with margins

export function CategoryBlock({ 
  id, 
  title, 
  arabicTitle, 
  icon,
  size = 'medium'
}: CategoryBlockProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Animation values
  const pressed = useSharedValue(0);
  
  const navigateToCategory = () => {
    router.push(`/category/${id}`);
  };

  // Determine background colors based on category and color scheme
  let gradientColors = ['#000', '#000'];
  let shadowColor = 'rgba(0,0,0,0.3)';
  
  if (id === 'morning') {
    gradientColors = colorScheme === 'dark' 
      ? ['#1F3A52', '#0F2A42'] 
      : ['#77A5CC', '#5791C2'];
    shadowColor = colorScheme === 'dark' ? '#131E29' : '#395C73';
  } else if (id === 'evening') {
    gradientColors = colorScheme === 'dark' 
      ? ['#2D3546', '#1D2536'] 
      : ['#595F85', '#424675'];
    shadowColor = colorScheme === 'dark' ? '#191D29' : '#33364A';
  } else if (id === 'sleep') {
    gradientColors = colorScheme === 'dark' 
      ? ['#2A2D40', '#1A1D30'] 
      : ['#454869', '#353859'];
    shadowColor = colorScheme === 'dark' ? '#181A26' : '#2C2E42';
  }
  
  // Get size dimensions
  const getDimensions = () => {
    switch (size) {
      case 'small': return { width: CARD_WIDTH * 0.8, height: CARD_WIDTH * 0.8 };
      case 'large': return { width: CARD_WIDTH * 1.2, height: CARD_WIDTH * 1.2 };
      default: return { width: CARD_WIDTH, height: CARD_WIDTH };
    }
  };
  
  // Handle press in/out for animation
  const handlePressIn = () => {
    pressed.value = withSpring(1, { damping: 15, stiffness: 150 });
  };
  
  const handlePressOut = () => {
    pressed.value = withSpring(0, { damping: 15, stiffness: 150 });
  };
  
  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, 0.95]);
    const translateY = interpolate(pressed.value, [0, 1], [0, -2]);
    
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  return (
    <Pressable
      onPress={navigateToCategory}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.card, 
          getDimensions(),
          {
            shadowColor: shadowColor,
            backgroundColor: colors.card,
            borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          },
          animatedStyle
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={icon} size={size === 'small' ? 28 : 32} color="#FFFFFF" />
        </LinearGradient>
        
        <View style={styles.textContainer}>
          <Text style={[styles.arabicTitle, { color: colors.arabicText }]}>
            {arabicTitle}
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            {title}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: CARD_MARGIN,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
  },
  arabicTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
    textAlign: 'center',
  }
}); 