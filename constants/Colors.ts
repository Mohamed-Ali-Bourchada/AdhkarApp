/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Color palette for the Adhkar App featuring a modern, professional design
 * with colors inspired by contemporary Islamic design aesthetics.
 */

const primaryLight = '#1F7A8C'; // Modern teal
const secondaryLight = '#2B6777'; // Deep blue-teal
const accentLight = '#CF8E80'; // Soft terracotta

const primaryDark = '#2F5D6C'; // Deep teal for dark mode
const secondaryDark = '#1B4552'; // Dark blue-teal
const accentDark = '#C37D6F'; // Warm terracotta for dark mode

export const Colors = {
  light: {
    text: '#2C3539', // Near black for regular text
    background: '#F7FBFC', // Very light blue-gray
    card: '#FFFFFF', // Pure white
    primary: primaryLight,
    secondary: secondaryLight,
    accent: accentLight,
    border: '#E8EAEC', // Light gray border
    arabicText: '#121212', // Almost black for Arabic text
    translationText: '#546E7A', // Medium gray-blue for translations
    tint: primaryLight,
    icon: '#62778C',
    tabIconDefault: '#97A9B9',
    tabIconSelected: primaryLight,
  },
  dark: {
    text: '#E0E6ED', // Light gray text
    background: '#0E171B', // Very dark blue-gray
    card: '#152228', // Dark blue-gray
    primary: primaryDark,
    secondary: secondaryDark,
    accent: accentDark,
    border: '#283840', // Dark blue-gray border
    arabicText: '#FFFFFF', // White for Arabic text
    translationText: '#A7B6C1', // Light blue-gray for translations
    tint: primaryDark,
    icon: '#8299AA',
    tabIconDefault: '#607D8B',
    tabIconSelected: primaryDark,
  },
};
