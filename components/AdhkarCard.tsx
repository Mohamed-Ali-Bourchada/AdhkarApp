import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Dhikr } from '../data/adhkar';
import { router } from 'expo-router';

interface AdhkarCardProps {
  dhikr: Dhikr;
  expanded?: boolean;
  categoryId?: string;
}

export function AdhkarCard({ dhikr, expanded = false, categoryId }: AdhkarCardProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [animation] = useState(new Animated.Value(expanded ? 1 : 0));

  const toggleExpand = () => {
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    
    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const navigateToReader = () => {
    if (categoryId) {
      router.push(`/dhikr-reader/${categoryId}/${dhikr.id}`);
    }
  };

  const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Pressable 
      style={[styles.container, { 
        backgroundColor: colors.card, 
        borderColor: colors.border,
        shadowColor: colorScheme === 'dark' ? '#000' : 'rgba(0,0,0,0.1)'
      }]} 
      onPress={toggleExpand}
      onLongPress={navigateToReader}
      delayLongPress={300}
    >
      <View style={styles.topRow}>
        <View style={[styles.countBadge, { backgroundColor: `${colors.primary}20` }]}>
          <Text style={[styles.countText, { color: colors.primary }]}>
            {dhikr.repeat && dhikr.repeat > 1 ? `${dhikr.repeat}×` : '١'}
          </Text>
        </View>
        
        <View style={styles.iconRow}>
          {categoryId && (
            <TouchableOpacity 
              style={styles.readerIconContainer}
              onPress={navigateToReader}
            >
              <Ionicons 
                name="book-outline" 
                size={20} 
                color={colors.icon} 
              />
            </TouchableOpacity>
          )}
          
          <Animated.View style={[styles.expandIconContainer, { transform: [{ rotate: rotateIcon }] }]}>
            <Ionicons 
              name="chevron-down" 
              size={22} 
              color={colors.icon} 
            />
          </Animated.View>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={[styles.arabicText, { color: colors.arabicText }]}>
          {dhikr.arabic}
        </Text>
        
        {dhikr.transliteration && isExpanded && (
          <Text style={[styles.transliterationText, { color: colors.text }]}>
            {dhikr.transliteration}
          </Text>
        )}
        
        {isExpanded && (
          <Animated.View style={{ opacity: animation }}>
            {dhikr.translation && (
              <Text style={[styles.translationText, { color: colors.translationText }]}>
                {dhikr.translation}
              </Text>
            )}
            
            {dhikr.source && (
              <View style={[styles.sourceContainer, { borderTopColor: colors.border }]}>
                <Text style={[styles.sourceText, { color: colors.secondary }]}>
                  {dhikr.source}
                </Text>
              </View>
            )}
            
            {dhikr.virtue && (
              <View style={[styles.virtueContainer, { backgroundColor: `${colors.accent}15` }]}>
                <Text style={[styles.virtueText, { color: colors.accent }]}>
                  {dhikr.virtue}
                </Text>
              </View>
            )}
          </Animated.View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readerIconContainer: {
    padding: 5,
    marginRight: 8,
  },
  expandIconContainer: {
    padding: 5,
  },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  arabicText: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'right',
    alignSelf: 'stretch',
    marginBottom: 8,
    fontFamily: 'Amiri',
  },
  transliterationText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  sourceContainer: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginBottom: 12,
    width: '100%',
  },
  sourceText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  virtueContainer: {
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  virtueText: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 