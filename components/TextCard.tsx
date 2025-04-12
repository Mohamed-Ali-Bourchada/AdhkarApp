import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface TextCardProps {
  id: string;
  text: string;
  timestamp: number;
  onDelete: (id: string) => void;
  onEdit?: (id: string, text: string) => void;
}

const MAX_PREVIEW_LENGTH = 120;
const { width } = Dimensions.get('window');

export function TextCard({ id, text, timestamp, onDelete, onEdit }: TextCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [modalVisible, setModalVisible] = useState(false);
  
  // Format the date
  const date = new Date(timestamp);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  
  // Check if we need to truncate the text for preview
  const isLongText = text.length > MAX_PREVIEW_LENGTH;
  const previewText = isLongText 
    ? text.substring(0, MAX_PREVIEW_LENGTH) + '...' 
    : text;
    
  // Determine gradient colors based on the colorScheme
  const gradientColors = colorScheme === 'dark' 
    ? ['#1F3A52', '#0F2A42'] 
    : ['#77A5CC', '#5791C2'];
    
  // Function to check if text contains Arabic characters
  const containsArabic = (text: string) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };
  
  // Determine text alignment based on content
  const hasArabic = containsArabic(text);
  
  return (
    <>
      <TouchableOpacity
        style={[styles.card, { 
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colorScheme === 'dark' ? '#000' : 'rgba(0,0,0,0.1)'
        }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.cardHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.dateText}>{formattedDate}</Text>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => onDelete(id)}
          >
            <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
        
        <View style={styles.cardBody}>
          <Text 
            style={[
              styles.previewText, 
              { 
                color: colors.text,
                textAlign: hasArabic ? 'right' : 'left',
              }
            ]}
            numberOfLines={5}
          >
            {previewText}
          </Text>
          
          {isLongText && (
            <Text style={[styles.readMoreText, { color: colors.primary }]}>
              Tap to read more...
            </Text>
          )}
        </View>
      </TouchableOpacity>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setModalVisible(false)}
        >
          <BlurView 
            intensity={40} 
            tint={colorScheme} 
            style={StyleSheet.absoluteFillObject} 
          />
          
          <Pressable 
            style={[styles.modalContent, { 
              backgroundColor: colors.card,
              borderColor: colors.border
            }]}
            onPress={(e) => e.stopPropagation()}
          >
            <LinearGradient
              colors={gradientColors}
              style={styles.modalHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.modalHeaderText}>Full Text</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>
            
            <View style={styles.modalBody}>
              <Text 
                style={[
                  styles.fullText, 
                  { 
                    color: colors.text,
                    textAlign: hasArabic ? 'right' : 'left'
                  }
                ]}
              >
                {text}
              </Text>
              
              <Text style={[styles.dateInfo, { color: colors.translationText }]}>
                Added on {formattedDate}
              </Text>
            </View>
            
            <View style={styles.modalFooter}>
              {onEdit && (
                <TouchableOpacity 
                  style={[styles.editButton, { backgroundColor: colors.primary }]}
                  onPress={() => {
                    setModalVisible(false);
                    if (onEdit) onEdit(id, text);
                  }}
                >
                  <Ionicons name="create-outline" size={18} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.deleteFullButton, { backgroundColor: '#e74c3c' }]}
                onPress={() => {
                  setModalVisible(false);
                  onDelete(id);
                }}
              >
                <Ionicons name="trash-outline" size={18} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: 16,
  },
  previewText: {
    fontSize: 16,
    lineHeight: 22,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: '80%',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  modalHeaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 20,
    maxHeight: '70%',
  },
  fullText: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 20,
  },
  dateInfo: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
  },
  deleteFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  }
}); 