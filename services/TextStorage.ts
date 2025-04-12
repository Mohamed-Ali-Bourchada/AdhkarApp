import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TextEntry {
  id: string;
  text: string;
  timestamp: number;
}

const STORAGE_KEY = '@adhkar_app_text_entries';

export class TextStorageService {
  /**
   * Save a new text entry
   */
  static async saveText(text: string): Promise<TextEntry> {
    try {
      // Get existing entries
      const entries = await this.getAllEntries();
      
      // Create new entry
      const newEntry: TextEntry = {
        id: Date.now().toString(),
        text,
        timestamp: Date.now(),
      };
      
      // Add to existing entries
      const updatedEntries = [newEntry, ...entries];
      
      // Save to storage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      
      return newEntry;
    } catch (error) {
      console.error('Error saving text:', error);
      throw error;
    }
  }
  
  /**
   * Get all text entries
   */
  static async getAllEntries(): Promise<TextEntry[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error retrieving entries:', error);
      return [];
    }
  }
  
  /**
   * Update an existing text entry
   */
  static async updateEntry(id: string, newText: string): Promise<boolean> {
    try {
      // Get existing entries
      const entries = await this.getAllEntries();
      
      // Find and update the specific entry
      const updatedEntries = entries.map(entry => 
        entry.id === id 
          ? { ...entry, text: newText, timestamp: Date.now() } 
          : entry
      );
      
      // Save to storage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      
      return true;
    } catch (error) {
      console.error('Error updating entry:', error);
      return false;
    }
  }
  
  /**
   * Delete a text entry
   */
  static async deleteEntry(id: string): Promise<boolean> {
    try {
      // Get existing entries
      const entries = await this.getAllEntries();
      
      // Filter out the entry to delete
      const updatedEntries = entries.filter(entry => entry.id !== id);
      
      // Save to storage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      
      return true;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  }
  
  /**
   * Delete all entries
   */
  static async clearAllEntries(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing entries:', error);
      return false;
    }
  }
} 