import React from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { IconGenerator } from '@/components/IconGenerator';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useRef } from 'react';

export default function IconGeneratorScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const viewShotRef = useRef<ViewShot>(null);
  
  // Function to capture the icon and save it
  const captureIcon = async () => {
    if (!viewShotRef.current) return;
    
    try {
      // Capture the ViewShot
      const uri = await viewShotRef.current.capture();
      
      // Share the captured image
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error capturing icon:', error);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <Stack.Screen
        options={{
          title: 'App Icon',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Adhkar App Icon
        </Text>
        
        <Text style={[styles.description, { color: colors.translationText }]}>
          A modern Islamic-inspired app icon featuring geometric patterns and Arabic calligraphy.
        </Text>
        
        <View style={styles.iconPreviewContainer}>
          <ViewShot 
            ref={viewShotRef}
            options={{ format: 'png', quality: 1 }}
            style={styles.iconWrapper}
          >
            <IconGenerator size={250} />
          </ViewShot>
          
          <Text style={[styles.previewLabel, { color: colors.translationText }]}>
            Preview at 250×250px
          </Text>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Design Elements
        </Text>
        
        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="color-palette" size={24} color={colors.primary} />
          </View>
          <View style={styles.featureTextContainer}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Islamic Geometric Pattern
            </Text>
            <Text style={[styles.featureDescription, { color: colors.translationText }]}>
              Features an octagonal star pattern commonly found in Islamic art and architecture.
            </Text>
          </View>
        </View>
        
        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="text" size={24} color={colors.primary} />
          </View>
          <View style={styles.featureTextContainer}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              Arabic Calligraphy
            </Text>
            <Text style={[styles.featureDescription, { color: colors.translationText }]}>
              Includes a stylized Arabic letter "ذ" (Dhal), which is central to the word "Dhikr" (Remembrance).
            </Text>
          </View>
        </View>
        
        <View style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.featureIconContainer}>
            <Ionicons name="color-filter" size={24} color={colors.primary} />
          </View>
          <View style={styles.featureTextContainer}>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              App Color Scheme
            </Text>
            <Text style={[styles.featureDescription, { color: colors.translationText }]}>
              Uses the app's primary teal gradient that works beautifully in both light and dark modes.
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.exportButton, { backgroundColor: colors.primary }]}
          onPress={captureIcon}
        >
          <Ionicons name="download" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.exportButtonText}>
            Export Icon
          </Text>
        </TouchableOpacity>
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  iconPreviewContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconWrapper: {
    borderRadius: 48,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    marginBottom: 16,
  },
  previewLabel: {
    fontSize: 14,
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  featureCard: {
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(31, 122, 140, 0.1)',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
}); 