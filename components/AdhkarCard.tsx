import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Dhikr } from '../data/adhkar';

interface AdhkarCardProps {
  dhikr: Dhikr;
  expanded?: boolean;
}

export function AdhkarCard({ dhikr, expanded = false }: AdhkarCardProps) {
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
    >
      <View style={styles.topRow}>
        <View style={[styles.countBadge, { backgroundColor: `${colors.primary}20` }]}>
          <Text style={[styles.countText, { color: colors.primary }]}>
            {dhikr.repeat && dhikr.repeat > 1 ? `${dhikr.repeat}×` : '١'}
          </Text>
        </View>
        
        <Animated.View style={[styles.expandIconContainer, { transform: [{ rotate: rotateIcon }] }]}>
          <Ionicons 
            name="chevron-down" 
            size={22} 
            color={colors.icon} 
          />
        </Animated.View>
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
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 18,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 15,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  arabicText: {
    fontSize: 26,
    lineHeight: 42,
    textAlign: 'right',
    fontWeight: '500',
    marginBottom: 16,
    fontFamily: 'System',
  },
  transliterationText: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  translationText: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
  },
  sourceContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    marginBottom: 12,
  },
  sourceText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  virtueContainer: {
    marginTop: 4,
    padding: 14,
    borderRadius: 10,
  },
  virtueText: {
    fontSize: 15,
    lineHeight: 22,
  },
  expandIconContainer: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  }
}); 