import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AppIcon } from './AppIcon';
import * as FileSystem from 'expo-file-system';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

// The sizes required for various app icons
const ICON_SIZES = [
  { name: 'App Icon (1024x1024)', size: 1024 },
  { name: 'iOS App Store (1024x1024)', size: 1024 },
  { name: 'iPhone (60x60@3x)', size: 180 },
  { name: 'iPhone (60x60@2x)', size: 120 },
  { name: 'iPad (76x76@2x)', size: 152 },
  { name: 'iPad Pro (83.5x83.5@2x)', size: 167 },
  { name: 'iOS Settings (29x29@3x)', size: 87 },
  { name: 'iOS Settings (29x29@2x)', size: 58 },
  { name: 'iOS Spotlight (40x40@3x)', size: 120 },
  { name: 'iOS Spotlight (40x40@2x)', size: 80 },
  { name: 'Android Adaptive Icon (108x108)', size: 108 },
  { name: 'Android Legacy Icon (48x48)', size: 48 },
  { name: 'Android Legacy Icon (72x72)', size: 72 },
  { name: 'Android Legacy Icon (96x96)', size: 96 },
  { name: 'Android Legacy Icon (144x144)', size: 144 },
  { name: 'Android Legacy Icon (192x192)', size: 192 },
];

export function AppIconExporter() {
  // Create refs for each icon size
  const refs = useRef<{ [key: number]: ViewShot | null }>({});

  // Function to capture and save an icon
  const captureIcon = async (size: number) => {
    if (!refs.current[size]) return;
    
    try {
      // Capture the view as a PNG
      const uri = await refs.current[size]!.capture();
      
      // Create a directory for the icons if it doesn't exist
      const dirUri = `${FileSystem.documentDirectory}icons/`;
      const dirInfo = await FileSystem.getInfoAsync(dirUri);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      }
      
      // Save the file
      const fileUri = `${dirUri}icon_${size}x${size}.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      
      // Share the file
      await Sharing.shareAsync(fileUri);
      
    } catch (error) {
      console.error('Error saving icon:', error);
    }
  };
  
  // Function to capture and share all icons
  const captureAllIcons = async () => {
    // Create a zip file of all icons (this would require additional libraries)
    // For now, just alert that icons should be captured individually
    alert('Please capture each icon size individually');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>App Icon Generator</Text>
      <Text style={styles.description}>
        Generate app icons for iOS and Android platforms. Tap on an icon to save it.
      </Text>
      
      <View style={styles.previewLarge}>
        <ViewShot 
          ref={ref => refs.current[1024] = ref} 
          options={{ format: 'png', quality: 1 }}
        >
          <AppIcon size={250} />
        </ViewShot>
        <TouchableOpacity 
          style={styles.captureButton} 
          onPress={() => captureIcon(1024)}
        >
          <Text style={styles.captureButtonText}>Save App Icon (1024x1024)</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.sectionTitle}>Platform Specific Icons</Text>
      
      <View style={styles.iconGrid}>
        {ICON_SIZES.slice(1).map((item) => (
          <View key={item.size} style={styles.iconItem}>
            <ViewShot 
              ref={ref => refs.current[item.size] = ref}
              options={{ format: 'png', quality: 1 }}
            >
              <AppIcon size={80} />
            </ViewShot>
            <Text style={styles.iconName}>{item.name}</Text>
            <TouchableOpacity 
              style={styles.smallCaptureButton}
              onPress={() => captureIcon(item.size)}
            >
              <Text style={styles.smallCaptureButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.captureAllButton} onPress={captureAllIcons}>
        <Text style={styles.captureAllButtonText}>Export All Icons</Text>
      </TouchableOpacity>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1F7A8C',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#546E7A',
  },
  previewLarge: {
    alignItems: 'center',
    marginBottom: 32,
  },
  captureButton: {
    marginTop: 16,
    backgroundColor: '#1F7A8C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    alignSelf: 'flex-start',
    color: '#2B3A42',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    color: '#546E7A',
  },
  smallCaptureButton: {
    backgroundColor: '#E1EFF5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  smallCaptureButtonText: {
    color: '#1F7A8C',
    fontSize: 12,
    fontWeight: '600',
  },
  captureAllButton: {
    marginTop: 16,
    backgroundColor: '#2B6777',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  captureAllButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
}); 