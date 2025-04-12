import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  arabicPlaceholder?: string;
}

export function CustomTextInput({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Add a new text...',
  arabicPlaceholder = 'أضف نصًا جديدًا...'
}: CustomTextInputProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { 
      backgroundColor: colors.card,
      borderColor: colors.border,
      shadowColor: colorScheme === 'dark' ? '#000' : 'rgba(0,0,0,0.1)'
    }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.translationText + '80'}
          multiline
          numberOfLines={Platform.OS === 'ios' ? 0 : 3}
          maxLength={500}
          returnKeyType="done"
          blurOnSubmit
          onSubmitEditing={onSubmit}
        />
        <Text style={[styles.arabicPlaceholder, { 
          color: colors.translationText + '80',
          opacity: value.length > 0 ? 0 : 1
        }]}>
          {arabicPlaceholder}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.submitButton, { 
          backgroundColor: colors.primary,
          opacity: value.trim().length > 0 ? 1 : 0.5
        }]}
        onPress={onSubmit}
        disabled={value.trim().length === 0}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  input: {
    fontSize: 16,
    padding: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  arabicPlaceholder: {
    fontSize: 16,
    position: 'absolute',
    right: 8,
    top: 8,
    textAlign: 'right',
  },
  submitButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  }
}); 