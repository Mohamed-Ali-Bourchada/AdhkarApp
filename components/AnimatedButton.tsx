import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Pressable,
  ViewStyle,
  TextStyle,
  StyleProp
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolate 
} from 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

interface AnimatedButtonProps {
  title: string;
  arabicTitle?: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function AnimatedButton({
  title,
  arabicTitle,
  onPress,
  icon,
  variant = 'primary',
  size = 'medium',
  containerStyle,
  textStyle
}: AnimatedButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Animation values
  const pressed = useSharedValue(0);
  
  // Get proper gradient based on variant and color scheme
  const getGradient = () => {
    if (variant === 'primary') {
      return colorScheme === 'dark' 
        ? ['#1F7A8C', '#1B4552'] 
        : ['#1F7A8C', '#2B6777'];
    }
    if (variant === 'secondary') {
      return colorScheme === 'dark' 
        ? ['#2B3A42', '#1B262C'] 
        : ['#546E7A', '#455A64'];
    }
    return ['transparent', 'transparent'];
  };
  
  // Get button padding based on size
  const getPadding = () => {
    switch (size) {
      case 'small': return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large': return { paddingVertical: 16, paddingHorizontal: 24 };
      default: return { paddingVertical: 12, paddingHorizontal: 20 };
    }
  };
  
  // Get font size based on size
  const getFontSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };
  
  // Get border if outline variant
  const getBorder = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 2,
        borderColor: colors.primary,
      };
    }
    return {};
  };
  
  // Get text color based on variant
  const getTextColor = () => {
    if (variant === 'outline') {
      return colors.primary;
    }
    return '#FFFFFF';
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
    const scale = interpolate(pressed.value, [0, 1], [1, 0.97]);
    
    return {
      transform: [{ scale }],
    };
  });
  
  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, containerStyle]}
    >
      <Animated.View style={[styles.buttonContainer, getBorder(), animatedStyle]}>
        {variant !== 'outline' ? (
          <LinearGradient
            colors={getGradient()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, getPadding()]}
          >
            {arabicTitle && (
              <Text style={[styles.arabicTitle, { color: getTextColor(), fontSize: getFontSize() + 2 }, textStyle]}>
                {arabicTitle}
              </Text>
            )}
            <View style={styles.contentContainer}>
              {icon && <Ionicons name={icon} size={getFontSize() + 4} color={getTextColor()} style={styles.icon} />}
              <Text style={[styles.title, { color: getTextColor(), fontSize: getFontSize() }, textStyle]}>
                {title}
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={[styles.outlineButton, getPadding()]}>
            {arabicTitle && (
              <Text style={[styles.arabicTitle, { color: getTextColor(), fontSize: getFontSize() + 2 }, textStyle]}>
                {arabicTitle}
              </Text>
            )}
            <View style={styles.contentContainer}>
              {icon && <Ionicons name={icon} size={getFontSize() + 4} color={getTextColor()} style={styles.icon} />}
              <Text style={[styles.title, { color: getTextColor(), fontSize: getFontSize() }, textStyle]}>
                {title}
              </Text>
            </View>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  buttonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradient: {
    alignItems: 'center',
  },
  outlineButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
  arabicTitle: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  }
}); 