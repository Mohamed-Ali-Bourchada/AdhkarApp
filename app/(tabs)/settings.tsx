import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // Example state for settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState('medium');
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.headerArabicTitle, { color: colors.arabicText }]}>الإعدادات</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          
          <View style={[styles.settingRow, { borderColor: colors.border }]}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Daily Reminders</Text>
              <Text style={[styles.settingDescription, { color: colors.translationText }]}>
                Receive notifications for morning and evening adhkar
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Display</Text>
          
          <View style={[styles.settingRow, { borderColor: colors.border }]}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Show Translations</Text>
              <Text style={[styles.settingDescription, { color: colors.translationText }]}>
                Display English translations for Arabic text
              </Text>
            </View>
            <Switch
              value={showTranslation}
              onValueChange={setShowTranslation}
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Arabic Font Size</Text>
              <Text style={[styles.settingDescription, { color: colors.translationText }]}>
                Adjust the font size for Arabic text
              </Text>
            </View>
            <View style={styles.fontSizeOptions}>
              {['small', 'medium', 'large'].map((size) => (
                <TouchableOpacity 
                  key={size}
                  style={[
                    styles.fontSizeOption,
                    arabicFontSize === size && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => setArabicFontSize(size)}
                >
                  <Text style={{
                    color: arabicFontSize === size ? '#FFFFFF' : colors.text,
                    fontSize: size === 'small' ? 12 : size === 'medium' ? 14 : 16,
                    fontWeight: '500',
                  }}>
                    {size.charAt(0).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          
          <TouchableOpacity 
            style={[styles.settingRow, { borderColor: colors.border }]}
          >
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>Version</Text>
              <Text style={[styles.settingDescription, { color: colors.translationText }]}>
                1.0.0
              </Text>
            </View>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerArabicTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  fontSizeOptions: {
    flexDirection: 'row',
  },
  fontSizeOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
}); 