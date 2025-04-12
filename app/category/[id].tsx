import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { adhkarData } from '@/data/adhkar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const category = adhkarData.find(cat => cat.id === id);
  
  useEffect(() => {
    // Navigate to the first dhikr in the category when the component mounts
    if (category && category.adhkar.length > 0) {
      const firstDhikr = category.adhkar[0];
      router.replace(`/dhikr-reader/${id}/${firstDhikr.id}`);
    }
  }, [id, category]);
  
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

  // Show loading screen while redirecting to the dhikr reader
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <Stack.Screen
        options={{
          title: category.title,
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
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          جاري تحميل الأذكار...
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  }
}); 