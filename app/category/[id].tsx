import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { adhkarData } from '@/data/adhkar';
import { AdhkarCard } from '@/components/AdhkarCard';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const category = adhkarData.find(cat => cat.id === id);
  
  if (!category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            الفئة غير موجودة
          </Text>
          <Text style={[styles.errorSubText, { color: colors.translationText }]}>
            Category not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  let iconName: keyof typeof Ionicons.glyphMap = 'book';
  let arabicTitle = '';
  let headerBgColor = '';
  
  if (id === 'morning') {
    iconName = 'sunny';
    arabicTitle = 'أذكار الصباح';
    headerBgColor = colorScheme === 'dark' ? '#1F3A52' : '#77A5CC';
  } else if (id === 'evening') {
    iconName = 'moon';
    arabicTitle = 'أذكار المساء';
    headerBgColor = colorScheme === 'dark' ? '#2D3546' : '#595F85';
  } else if (id === 'sleep') {
    iconName = 'bed';
    arabicTitle = 'أذكار النوم';
    headerBgColor = colorScheme === 'dark' ? '#2A2D40' : '#454869';
  }

  // Function to get the title based on the category ID
  const getCategoryTitle = (categoryId: string) => {
    switch(categoryId) {
      case 'morning':
        return {
          arabic: 'أذكار الصباح',
          english: 'Morning Adhkar'
        };
      case 'evening':
        return {
          arabic: 'أذكار المساء',
          english: 'Evening Adhkar'
        };
      case 'sleep':
        return {
          arabic: 'أذكار النوم',
          english: 'Before Sleep Adhkar'
        };
      case 'prayer':
        return {
          arabic: 'أذكار الصلاة',
          english: 'Prayer Adhkar'
        };
      default:
        return {
          arabic: 'الأذكار',
          english: 'Adhkar'
        };
    }
  };
  
  const categoryTitle = getCategoryTitle(id as string);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <Stack.Screen
        options={{
          title: categoryTitle.english,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerBackImage: ({ tintColor }) => (
            <Ionicons name="chevron-back" size={24} color={tintColor} style={{ marginLeft: 8 }} />
          ),
        }}
      />
      
      <View style={styles.content}>
        <Text style={[styles.arabicTitle, { color: colors.arabicText }]}>
          {categoryTitle.arabic}
        </Text>
        <Text style={[styles.englishTitle, { color: colors.text }]}>
          {categoryTitle.english}
        </Text>
        
        <Text style={[styles.placeholder, { color: colors.translationText }]}>
          This screen would display the list of adhkar for the {categoryTitle.english} category.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubText: {
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arabicTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  englishTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
  },
  placeholder: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.7,
  }
}); 