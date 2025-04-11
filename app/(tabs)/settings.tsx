import React from 'react';
import { StyleSheet, View, Switch, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [isReminderEnabled, setIsReminderEnabled] = React.useState(false);
  const headerBgColor = colorScheme === 'dark' ? '#1B4552' : '#1F7A8C';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View
        style={[styles.headerBackground, { backgroundColor: headerBgColor }]}
      >
        <Text style={styles.arabicHeaderTitle}>الإعدادات</Text>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsContainer}>
          <View style={[styles.settingCard, { 
            backgroundColor: colors.card, 
            borderColor: colors.border,
            shadowColor: colorScheme === 'dark' ? '#000' : 'rgba(0,0,0,0.1)'
          }]}>
            <View style={styles.settingHeader}>
              <Ionicons name="notifications" size={24} color={colors.primary} />
              <View style={styles.settingTitleContainer}>
                <Text style={[styles.arabicSettingTitle, { color: colors.arabicText }]}>
                  التذكيرات
                </Text>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Reminders
                </Text>
              </View>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.arabicSettingLabel, { color: colors.arabicText }]}>
                  تفعيل التذكيرات اليومية
                </Text>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  Enable daily reminders
                </Text>
                <Text style={[styles.settingDescription, { color: colors.translationText }]}>
                  الحصول على إشعارات لقراءة أذكار الصباح والمساء والنوم
                </Text>
              </View>
              <Switch
                value={isReminderEnabled}
                onValueChange={setIsReminderEnabled}
                trackColor={{ false: '#767577', true: `${colors.primary}80` }}
                thumbColor={isReminderEnabled ? colors.primary : '#f4f3f4'}
              />
            </View>
            
            {isReminderEnabled && (
              <View style={[styles.reminderTimesContainer, { backgroundColor: `${colors.secondary}15` }]}>
                <Text style={[styles.arabicReminderTimesTitle, { color: colors.arabicText }]}>
                  قريباً
                </Text>
                <Text style={[styles.reminderTimesTitle, { color: colors.text }]}>
                  Coming Soon
                </Text>
                <Text style={[styles.reminderTimesDescription, { color: colors.translationText }]}>
                  في تحديث قادم، سيمكنك تخصيص أوقات التذكير لكل فئة من الأذكار
                </Text>
              </View>
            )}
          </View>
          
          <View style={[styles.settingCard, { 
            backgroundColor: colors.card, 
            borderColor: colors.border,
            shadowColor: colorScheme === 'dark' ? '#000' : 'rgba(0,0,0,0.1)'
          }]}>
            <View style={styles.settingHeader}>
              <Ionicons name="information-circle" size={24} color={colors.primary} />
              <View style={styles.settingTitleContainer}>
                <Text style={[styles.arabicSettingTitle, { color: colors.arabicText }]}>
                  حول التطبيق
                </Text>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  About
                </Text>
              </View>
            </View>
            
            <Text style={[styles.aboutTextArabic, { color: colors.arabicText }]}>
              تم تصميم هذا التطبيق لمساعدة المسلمين على تذكر تلاوة أذكارهم اليومية. الأذكار المضمنة أصلية ومستمدة من القرآن والسنة.
            </Text>
            <Text style={[styles.aboutText, { color: colors.translationText }]}>
              This app is designed to help Muslims remember to recite their daily adhkar. The adhkar included are authentic and sourced from the Quran and Sunnah.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  arabicHeaderTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  scrollView: {
    flex: 1,
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
  settingCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingTitleContainer: {
    marginLeft: 12,
  },
  arabicSettingTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  arabicSettingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    textAlign: 'left',
  },
  settingLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  settingDescription: {
    fontSize: 14,
    textAlign: 'right',
  },
  reminderTimesContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  arabicReminderTimesTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'right',
  },
  reminderTimesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  reminderTimesDescription: {
    fontSize: 14,
    textAlign: 'right',
    lineHeight: 20,
  },
  aboutTextArabic: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'right',
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 