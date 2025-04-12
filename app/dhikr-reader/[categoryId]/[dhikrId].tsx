import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Vibration, Animated, PanResponder } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { adhkarData, Dhikr } from '@/data/adhkar';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function DhikrReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoryId = params.categoryId as string;
  const dhikrId = params.dhikrId as string;
  
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme] || {};
  
  // Ensure colors has default values
  const safeColors = {
    text: colors.text || (colorScheme === 'dark' ? '#FFFFFF' : '#000000'),
    background: colors.background || (colorScheme === 'dark' ? '#121212' : '#FFFFFF'),
    primary: colors.primary || '#3498db',
    translationText: colors.translationText || (colorScheme === 'dark' ? '#BBBBBB' : '#444444'),
  };
  
  const [currentDhikr, setCurrentDhikr] = useState<Dhikr | null>(null);
  const [dhikrIndex, setDhikrIndex] = useState(0);
  const [totalDhikrs, setTotalDhikrs] = useState(0);
  const [category, setCategory] = useState<any>(null);
  
  // Counter state for tracking repetitions
  const [counter, setCounter] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Enhanced animations
  const [countAnimation] = useState(new Animated.Value(1));
  const [progressAnimation] = useState(new Animated.Value(0));
  const [completedAnimation] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Reference for scroll view
  const scrollViewRef = useRef(null);
  
  // Setup swipe gesture for navigation
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to horizontal swipes larger than 20 pixels
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 80;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120 && dhikrIndex > 0) {
          // Swipe right - go to previous
          navigateToPrevious();
        } else if (gestureState.dx < -120 && dhikrIndex < totalDhikrs - 1) {
          // Swipe left - go to next
          navigateToNext();
        }
      },
    })
  ).current;
  
  useEffect(() => {
    if (categoryId) {
      const foundCategory = adhkarData.find(cat => cat.id === categoryId);
      if (foundCategory) {
        setCategory(foundCategory);
        setTotalDhikrs(foundCategory.adhkar.length);
        
        if (dhikrId) {
          const foundIndex = foundCategory.adhkar.findIndex(dhikr => dhikr.id === dhikrId);
          
          if (foundIndex !== -1) {
            setDhikrIndex(foundIndex);
            setCurrentDhikr(foundCategory.adhkar[foundIndex]);
            // Reset counter and completion state when dhikr changes
            setCounter(0);
            setIsCompleted(false);
            progressAnimation.setValue(0);
            completedAnimation.setValue(0);
            
            // Fade in animation
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }).start();
          } else if (foundCategory.adhkar.length > 0) {
            // If dhikr not found, default to the first dhikr in category
            setDhikrIndex(0);
            setCurrentDhikr(foundCategory.adhkar[0]);
            router.replace(`/dhikr-reader/${categoryId}/${foundCategory.adhkar[0].id}`);
          }
        } else if (foundCategory.adhkar.length > 0) {
          // If no dhikrId is provided, default to the first dhikr
          setDhikrIndex(0);
          setCurrentDhikr(foundCategory.adhkar[0]);
          router.replace(`/dhikr-reader/${categoryId}/${foundCategory.adhkar[0].id}`);
        }
      }
    }
  }, [categoryId, dhikrId]);

  // Update progress animation when counter changes
  useEffect(() => {
    if (currentDhikr && currentDhikr.repeat) {
      const progress = counter / currentDhikr.repeat;
      Animated.timing(progressAnimation, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [counter, currentDhikr]);

  // Animate completion state
  useEffect(() => {
    Animated.timing(completedAnimation, {
      toValue: isCompleted ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isCompleted]);

  const navigateToPrevious = () => {
    if (dhikrIndex > 0 && category) {
      try {
        const prevIndex = dhikrIndex - 1;
        const prevDhikr = category.adhkar[prevIndex];
        if (prevDhikr && prevDhikr.id) {
          router.replace(`/dhikr-reader/${categoryId}/${prevDhikr.id}`);
        }
      } catch (error) {
        console.error("Error navigating to previous:", error);
      }
    }
  };

  const navigateToNext = () => {
    if (dhikrIndex < totalDhikrs - 1 && category) {
      try {
        const nextIndex = dhikrIndex + 1;
        const nextDhikr = category.adhkar[nextIndex];
        if (nextDhikr && nextDhikr.id) {
          router.replace(`/dhikr-reader/${categoryId}/${nextDhikr.id}`);
        }
      } catch (error) {
        console.error("Error navigating to next:", error);
      }
    }
  };
  
  const goToHomeScreen = () => {
    router.push('/');
  };
  
  const incrementCounter = () => {
    if (currentDhikr && currentDhikr.repeat && counter < currentDhikr.repeat) {
      // Enhanced animation
      Animated.sequence([
        Animated.timing(countAnimation, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(countAnimation, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
      
      setCounter(counter + 1);
      
      // Use simple vibration instead of haptics
      Vibration.vibrate(20);
      
      // Check if completed
      if (counter + 1 >= (currentDhikr.repeat || 1)) {
        setIsCompleted(true);
        Vibration.vibrate([0, 50, 50, 100]);
      }
    }
  };
  
  const decrementCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      setIsCompleted(false);
      Vibration.vibrate(20); // Short vibration feedback
    }
  };
  
  const resetCounter = () => {
    setCounter(0);
    setIsCompleted(false);
    progressAnimation.setValue(0);
    Vibration.vibrate(30); // Short vibration feedback
  };
  
  // Determine background colors based on category and color scheme
  let gradientColors: readonly [string, string] = ['#000000', '#000000'];
  let accentColor = '#1F7A8C';
  
  if (categoryId === 'morning') {
    gradientColors = colorScheme === 'dark' 
      ? ['#1F3A52', '#0F2A42'] 
      : ['#77A5CC', '#5791C2'];
    accentColor = colorScheme === 'dark' ? '#77A5CC' : '#1F3A52';
  } else if (categoryId === 'evening') {
    gradientColors = colorScheme === 'dark' 
      ? ['#2D3546', '#1D2536'] 
      : ['#595F85', '#424675'];
    accentColor = colorScheme === 'dark' ? '#595F85' : '#2D3546';
  } else if (categoryId === 'sleep') {
    gradientColors = colorScheme === 'dark' 
      ? ['#2A2D40', '#1A1D30'] 
      : ['#454869', '#353859'];
    accentColor = colorScheme === 'dark' ? '#454869' : '#2A2D40';
  }
  
  // Calculate counter width for circular progress
  const progressInterpolate = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Scale animation for count
  const scaleTransform = {
    transform: [{ scale: countAnimation }]
  };

  // Opacity for completed state
  const completedOpacity = completedAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Create the styles inside the component so colors is available
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: 'center',
    },
    errorSubText: {
      fontSize: 16,
      textAlign: 'center',
    },
    errorButton: {
      backgroundColor: '#3498db',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 20,
    },
    errorButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerBlur: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
      zIndex: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    actionButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    pageIndicatorContainer: {
      alignItems: 'center',
      paddingVertical: 10,
    },
    pageIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicatorDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    activeDot: {
      width: 24,
      borderRadius: 4,
    },
    compactIndicator: {
      width: '80%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    indicatorBar: {
      width: '100%',
      height: 6,
      borderRadius: 3,
      marginBottom: 8,
      overflow: 'hidden',
    },
    indicatorProgress: {
      height: '100%',
      borderRadius: 3,
    },
    indicatorText: {
      fontSize: 13,
      fontWeight: '600',
    },
    scrollView: {
      flex: 1,
      paddingTop: 50,
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingBottom: 180,
      paddingTop: 10,
    },
    dhikrTouchable: {
      width: '100%',
    },
    dhikrCard: {
      padding: 24,
      borderRadius: 20,
      minHeight: height * 0.5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 12,
      overflow: 'hidden',
    },
    patternOverlay: {
      position: 'absolute',
      right: -30,
      bottom: -30,
      opacity: 0.5,
    },
    patternIcon: {
      transform: [{ rotate: '-15deg' }],
    },
    completedCard: {
      borderWidth: 2,
      borderColor: '#4BB543',
    },
    completionGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderWidth: 4,
      borderRadius: 20,
    },
    repeatBadge: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 14,
      paddingVertical: 5,
      borderRadius: 30,
    },
    repeatText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    arabicText: {
      fontSize: 28,
      lineHeight: 50,
      textAlign: 'right',
      color: '#fff',
      fontWeight: '600',
      marginBottom: 24,
      fontFamily: 'Amiri',
    },
    transliterationText: {
      fontSize: 18,
      lineHeight: 28,
      color: 'rgba(255,255,255,0.9)',
      textAlign: 'center',
      fontStyle: 'italic',
      marginBottom: 16,
    },
    translationText: {
      fontSize: 18,
      lineHeight: 26,
      color: 'rgba(255,255,255,0.85)',
      marginBottom: 16,
    },
    sourceText: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)',
      textAlign: 'right',
      marginTop: 8,
      fontStyle: 'italic',
    },
    virtueContainer: {
      marginTop: 16,
      padding: 16,
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderRadius: 12,
    },
    virtueText: {
      fontSize: 16,
      lineHeight: 24,
      color: 'rgba(255,255,255,0.9)',
      textAlign: 'right',
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.05)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 12,
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    navButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
      marginHorizontal: 4,
    },
    pageNumberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    pageNumber: {
      fontSize: 16,
      fontWeight: '700',
    },
    pageNumberDivider: {
      width: 10,
      height: 1,
      marginHorizontal: 6,
    },
    pageNumberTotal: {
      fontSize: 14,
      opacity: 0.6,
    },
    counterCircleContainer: {
      alignItems: 'center',
      marginBottom: 25,
    },
    counterCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: 'rgba(255,255,255,0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.3)',
    },
    counterProgress: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '100%',
      backgroundColor: 'white',
      opacity: 0.3,
    },
    counterTextContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    counterValue: {
      fontSize: 40,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    counterTotal: {
      fontSize: 20,
      color: 'rgba(255,255,255,0.7)',
      marginLeft: 2,
    },
    counterCheckmark: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.9)',
      width: '100%',
      height: '100%',
    },
    counterControlsBlur: {
      marginTop: 20,
      borderRadius: 16,
      overflow: 'hidden',
      alignSelf: 'center',
    },
    counterControls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
      paddingVertical: 6,
    },
    counterButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    disabledCounterButton: {
      backgroundColor: 'rgba(150,150,150,0.1)',
    },
    counterDisplay: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
      marginHorizontal: 8,
    },
    counterDisplayText: {
      fontSize: 15,
      fontWeight: '600',
    },
    resetButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: 'rgba(255,255,255,0.1)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    resetText: {
      fontSize: 14,
      fontWeight: '600',
    },
    completedBadge: {
      position: 'absolute',
      top: 16,
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.9)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    completedText: {
      color: '#4BB543',
      fontSize: 14,
      fontWeight: '700',
      marginLeft: 4,
    },
    swipeHintContainer: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: 'center',
      opacity: 0.7,
    },
    swipeHintText: {
      fontSize: 13,
      marginBottom: 8,
    },
    swipeIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    swipeHintLine: {
      width: 30,
      height: 2,
      marginHorizontal: 4,
    },
    scrollIndicator: {
      alignItems: 'center',
      marginTop: 10,
    },
    modernNavigationContainer: {
      position: 'absolute',
      bottom: 120,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingBottom: 10,
      zIndex: 20,
    },
    navGradient: {
      width: '90%',
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10,
    },
    navControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    modernNavButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    pageIndicatorPill: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 25,
      backgroundColor: 'rgba(255,255,255,0.2)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    pageIndicatorText: {
      fontSize: 14,
      fontWeight: '600',
    },
    pageIndicatorSeparator: {
      fontSize: 14,
      opacity: 0.7,
    },
    fabContainer: {
      display: 'none', // Hide the original FAB since we're improving the navigation
    },
  });

  if (!currentDhikr || !category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: safeColors.background }]}>
        <StatusBar style="light" />
        <Stack.Screen
          options={{
            title: 'Adhkar',
            headerStyle: {
              backgroundColor: safeColors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: safeColors.text }]}>
            الذكر غير موجود
          </Text>
          <Text style={[styles.errorSubText, { color: safeColors.translationText }]}>
            Dhikr not found
          </Text>
          <TouchableOpacity 
            style={styles.errorButton} 
            onPress={goToHomeScreen}
          >
            <Text style={styles.errorButtonText}>العودة للرئيسية</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: safeColors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      {/* Enhanced Header with Frosted Glass Effect */}
      <View
        style={[
          styles.headerBlur,
          { backgroundColor: safeColors.background, borderBottomColor: 'rgba(0,0,0,0.1)' }
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: `${accentColor}30` }]}
            onPress={goToHomeScreen}
          >
            <Ionicons name="home" size={22} color={accentColor} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: safeColors.text }]}>
            {category?.arabicTitle || getCategoryArabicTitle(categoryId as string)}
          </Text>
          
          {/* Action button on right */}
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: `${accentColor}30` }]}
            onPress={() => {
              if (isCompleted) {
                resetCounter();
              } else {
                incrementCounter();
              }
            }}
          >
            <Ionicons 
              name={isCompleted ? "refresh" : "add-circle"} 
              size={22} 
              color={accentColor} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced dots indicator with labels */}
      <View style={styles.pageIndicatorContainer}>
        <View style={styles.pageIndicator}>
          {totalDhikrs > 10 ? (
            // For many dhikrs, show simplified indicator
            <View style={styles.compactIndicator}>
              <View style={[styles.indicatorBar, { backgroundColor: `${accentColor}30` }]}>
                <View
                  style={[
                    styles.indicatorProgress,
                    {
                      backgroundColor: accentColor,
                      width: `${(dhikrIndex / (totalDhikrs - 1)) * 100}%`
                    }
                  ]}
                />
              </View>
              <Text style={[styles.indicatorText, { color: safeColors.text }]}>
                {dhikrIndex + 1} / {totalDhikrs}
              </Text>
            </View>
          ) : (
            // For fewer dhikrs, show individual dots
            Array.from({ length: totalDhikrs }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (index !== dhikrIndex && category) {
                    const targetDhikr = category.adhkar[index];
                    router.replace(`/dhikr-reader/${categoryId}/${targetDhikr.id}`);
                  }
                }}
              >
                <View 
                  style={[
                    styles.indicatorDot,
                    index === dhikrIndex 
                      ? [styles.activeDot, { backgroundColor: accentColor }]
                      : { backgroundColor: `${accentColor}30` }
                  ]} 
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        {...panResponder.panHandlers}
      >
        {/* Animated Card Container */}
        <Animated.View
          style={[
            styles.dhikrTouchable,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={incrementCounter}
          >
            <LinearGradient
              colors={gradientColors}
              style={[
                styles.dhikrCard,
                isCompleted && styles.completedCard
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Background pattern for visual interest */}
              <View style={styles.patternOverlay}>
                <MaterialCommunityIcons 
                  name="mosque" 
                  size={120} 
                  color="rgba(255,255,255,0.03)" 
                  style={styles.patternIcon}
                />
              </View>
              
              {/* Completion indicator */}
              <Animated.View 
                style={[
                  styles.completionGlow, 
                  { opacity: completedOpacity, borderColor: '#4BB543' }
                ]}
              />
              
              {currentDhikr.repeat && currentDhikr.repeat > 1 && (
                <View style={styles.repeatBadge}>
                  <Text style={styles.repeatText}>
                    {currentDhikr.repeat}×
                  </Text>
                </View>
              )}
              
              {/* Enhanced Counter display */}
              {currentDhikr?.repeat && currentDhikr.repeat > 1 && (
                <View style={styles.counterCircleContainer}>
                  <Animated.View 
                    style={[
                      styles.counterCircle,
                      isCompleted && { borderColor: '#4BB543' }
                    ]}
                  >
                    <Animated.View 
                      style={[
                        styles.counterProgress, 
                        { 
                          width: progressInterpolate,
                          backgroundColor: isCompleted ? '#4BB543' : '#FFFFFF' 
                        }
                      ]}
                    />
                    <View style={styles.counterTextContainer}>
                      <Animated.Text style={[styles.counterValue, scaleTransform]}>
                        {counter}
                      </Animated.Text>
                      <Text style={styles.counterTotal}>/{currentDhikr.repeat}</Text>
                    </View>
                    
                    {/* Completion checkmark that appears when done */}
                    {isCompleted && (
                      <Animated.View 
                        style={[
                          styles.counterCheckmark,
                          { opacity: completedOpacity }
                        ]}
                      >
                        <Ionicons name="checkmark" size={40} color="#4BB543" />
                      </Animated.View>
                    )}
                  </Animated.View>
                </View>
              )}
              
              {isCompleted && (
                <Animated.View style={[styles.completedBadge, { opacity: completedOpacity }]}>
                  <Ionicons name="checkmark-circle" size={24} color="#4BB543" />
                  <Text style={styles.completedText}>أتممت</Text>
                </Animated.View>
              )}
              
              <Text style={styles.arabicText}>
                {currentDhikr?.arabic || ''}
              </Text>
              
              {/* Add a scroll indicator after the Arabic text for long texts */}
              {currentDhikr?.arabic && currentDhikr.arabic.length > 400 && (
                <View style={styles.scrollIndicator}>
                  <Ionicons name="chevron-down" size={24} color="rgba(255,255,255,0.5)" />
                </View>
              )}
              
              {currentDhikr?.transliteration && (
                <Text style={styles.transliterationText}>
                  {currentDhikr.transliteration}
                </Text>
              )}
              
              {currentDhikr?.translation && (
                <Text style={styles.translationText}>
                  {currentDhikr.translation}
                </Text>
              )}
              
              {currentDhikr?.source && (
                <Text style={styles.sourceText}>
                  {currentDhikr.source}
                </Text>
              )}
              
              {currentDhikr?.virtue && (
                <View style={styles.virtueContainer}>
                  <Text style={styles.virtueText}>
                    {currentDhikr.virtue}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Counter controls with floating appearance */}
        {currentDhikr?.repeat && currentDhikr.repeat > 1 && (
          <View
            style={[
              styles.counterControlsBlur,
              { backgroundColor: `${safeColors.background}E0` }
            ]}
          >
            <View style={styles.counterControls}>
              <TouchableOpacity 
                style={[
                  styles.counterButton, 
                  counter <= 0 ? styles.disabledCounterButton : { backgroundColor: `${accentColor}30` }
                ]}
                onPress={decrementCounter}
                disabled={counter <= 0}
              >
                <Ionicons 
                  name="remove" 
                  size={24} 
                  color={counter <= 0 ? '#888888' : accentColor} 
                />
              </TouchableOpacity>
              
              <View style={[styles.counterDisplay, { backgroundColor: `${accentColor}15` }]}>
                <Text style={[styles.counterDisplayText, { color: safeColors.text }]}>
                  {counter}/{currentDhikr.repeat}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.counterButton, 
                  (counter >= (currentDhikr.repeat || 1)) 
                    ? styles.disabledCounterButton 
                    : { backgroundColor: `${accentColor}30` }
                ]}
                onPress={incrementCounter}
                disabled={counter >= (currentDhikr.repeat || 1)}
              >
                <Ionicons 
                  name="add" 
                  size={24} 
                  color={counter >= (currentDhikr.repeat || 1) ? '#888888' : accentColor} 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Swipe instruction hint */}
        <View style={styles.swipeHintContainer}>
          <Text style={[styles.swipeHintText, { color: `${safeColors.text}80` }]}>
            اسحب لتنقل بين الأذكار
          </Text>
          <View style={styles.swipeIconsContainer}>
            <Ionicons name="chevron-back" size={16} color={`${safeColors.text}60`} />
            <View style={[styles.swipeHintLine, { backgroundColor: `${safeColors.text}40` }]} />
            <Ionicons name="chevron-forward" size={16} color={`${safeColors.text}60`} />
          </View>
        </View>
      </ScrollView>
      
      {/* Modern Floating Navigation */}
      <View style={styles.modernNavigationContainer}>
        <LinearGradient
          colors={gradientColors}
          style={styles.navGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.navControls}>
            <TouchableOpacity 
              style={[
                styles.modernNavButton,
                { opacity: dhikrIndex === 0 ? 0.5 : 1 }
              ]}
              onPress={navigateToPrevious}
              disabled={dhikrIndex === 0}
            >
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.pageIndicatorPill}
              onPress={isCompleted ? resetCounter : incrementCounter}
            >
              <Ionicons 
                name={isCompleted ? "refresh" : "add"} 
                size={28} 
                color="#fff" 
              />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.modernNavButton,
                { opacity: dhikrIndex === totalDhikrs - 1 ? 0.5 : 1 }
              ]}
              onPress={navigateToNext}
              disabled={dhikrIndex === totalDhikrs - 1}
            >
              <Ionicons name="chevron-forward" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

// Add a function to get the Arabic title based on category ID
const getCategoryArabicTitle = (id: string) => {
  switch(id) {
    case 'morning':
      return 'أذكار الصباح';
    case 'evening':
      return 'أذكار المساء';
    case 'sleep':
      return 'أذكار النوم';
    default:
      return 'الأذكار';
  }
}; 