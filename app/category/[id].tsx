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

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={[styles.headerBackground, { backgroundColor: headerBgColor }]}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={styles.arabicTitle}>
              {arabicTitle}
            </Text>
            <Text style={styles.englishTitle}>
              {category.title}
            </Text>
            
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={24} color="#FFFFFF" />
            </View>
          </View>
        </View>
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.descriptionContainer, { 
            backgroundColor: colors.card,
            borderColor: colors.border 
          }]}>
            <Text style={[styles.arabicDescription, { color: colors.arabicText }]}>
              {category.arabicDescription}
            </Text>
            <Text style={[styles.description, { color: colors.translationText }]}>
              {category.description}
            </Text>
          </View>
          
          {category.adhkar.map((dhikr) => (
            <AdhkarCard key={dhikr.id} dhikr={dhikr} />
          ))}
          
          <View style={styles.footer}>
            <Text style={[styles.footerArabicText, { color: colors.text }]}>
              نهاية {id === 'morning' 
                ? 'أذكار الصباح' 
                : id === 'evening' 
                ? 'أذكار المساء'
                : 'أذكار النوم'}
            </Text>
            <Text style={[styles.footerText, { color: colors.translationText }]}>
              End of {category.title.toLowerCase()}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
  headerBackground: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 24,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 12,
  },
  arabicTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  englishTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  descriptionContainer: {
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  arabicDescription: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerArabicText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  }
}); 