import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  StatusBar, 
  ActivityIndicator, 
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { CustomTextInput } from '@/components/CustomTextInput';
import { TextCard } from '@/components/TextCard';
import { TextStorageService, TextEntry } from '@/services/TextStorage';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function CustomTextsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [inputText, setInputText] = useState('');
  const [entries, setEntries] = useState<TextEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState<{ id: string, text: string } | null>(null);
  
  // Load entries from storage when component mounts
  useEffect(() => {
    loadEntries();
  }, []);
  
  // Load all text entries
  const loadEntries = async () => {
    try {
      setLoading(true);
      const savedEntries = await TextStorageService.getAllEntries();
      setEntries(savedEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Handle refreshing the list
  const handleRefresh = () => {
    setRefreshing(true);
    loadEntries();
  };
  
  // Handle saving new text
  const handleSaveText = async () => {
    if (!inputText.trim()) return;
    
    try {
      if (editMode) {
        // Update existing entry
        await TextStorageService.updateEntry(editMode.id, inputText);
        setEditMode(null);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        // Save new entry
        await TextStorageService.saveText(inputText);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      
      // Clear input and reload entries
      setInputText('');
      loadEntries();
    } catch (error) {
      console.error('Error saving text:', error);
      Alert.alert('Error', 'Failed to save your text. Please try again.');
    }
  };
  
  // Handle deleting a text entry
  const handleDeleteEntry = (id: string) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await TextStorageService.deleteEntry(id);
              loadEntries();
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } catch (error) {
              console.error('Error deleting entry:', error);
              Alert.alert('Error', 'Failed to delete the entry. Please try again.');
            }
          },
        },
      ]
    );
  };
  
  // Handle editing a text entry
  const handleEditEntry = (id: string, text: string) => {
    setEditMode({ id, text });
    setInputText(text);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  
  // Clear all entries with confirmation
  const handleClearAll = () => {
    if (entries.length === 0) return;
    
    Alert.alert(
      'Clear All Entries',
      'Are you sure you want to delete all entries? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await TextStorageService.clearAllEntries();
              loadEntries();
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            } catch (error) {
              console.error('Error clearing entries:', error);
              Alert.alert('Error', 'Failed to clear entries. Please try again.');
            }
          },
        },
      ]
    );
  };
  
  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditMode(null);
    setInputText('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  // Render the empty state when there are no entries
  const renderEmptyState = () => {
    if (loading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons 
          name="document-text-outline" 
          size={64} 
          color={colors.translationText + '50'} 
          style={styles.emptyIcon}
        />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          No entries yet
        </Text>
        <Text style={[styles.emptySubtitle, { color: colors.translationText }]}>
          Add your first text using the input field above
        </Text>
        <Text style={[styles.arabicEmptyText, { color: colors.arabicText }]}>
          لا توجد نصوص حتى الآن
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Texts</Text>
        <Text style={[styles.headerArabicTitle, { color: colors.arabicText }]}>نصوصي</Text>
        
        {entries.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Ionicons name="trash-outline" size={18} color={colors.translationText} />
            <Text style={[styles.clearButtonText, { color: colors.translationText }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.inputContainer}>
          {editMode && (
            <View style={[styles.editModeBar, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.editModeText, { color: colors.primary }]}>
                Editing entry
              </Text>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              >
                <Text style={[styles.cancelButtonText, { color: colors.primary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
          
          <CustomTextInput
            value={inputText}
            onChangeText={setInputText}
            onSubmit={handleSaveText}
            placeholder="Type something..."
            arabicPlaceholder="اكتب شيئًا هنا..."
          />
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={entries}
            renderItem={({ item }) => (
              <TextCard
                id={item.id}
                text={item.text}
                timestamp={item.timestamp}
                onDelete={handleDeleteEntry}
                onEdit={handleEditEntry}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[
              styles.listContent, 
              // Add extra padding at the bottom for the tab bar
              { paddingBottom: Platform.OS === 'ios' ? 100 : 90 }
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerArabicTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 20,
  },
  clearButtonText: {
    fontSize: 14,
    marginLeft: 4,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  editModeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  editModeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 6,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 60,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  arabicEmptyText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 