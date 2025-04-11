import { StyleSheet, View, TouchableOpacity, StatusBar, ScrollView, Text, Image, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { CategoryCard } from '@/components/CategoryCard';
import { CategoryBlock } from '@/components/CategoryBlock';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import { AnimatedButton } from '@/components/AnimatedButton';
import { useState } from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // State for view type (list or grid)
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  
  // Determine gradient colors based on color scheme
  const headerGradient = colorScheme === 'dark' 
    ? ['#1B4552', '#0F2A3A'] 
    : ['#1F7A8C', '#1A6A7C'];

  // Toggle between list and grid view
  const toggleViewType = () => {
    setViewType(prev => prev === 'list' ? 'grid' : 'list');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <LinearGradient
          colors={headerGradient}
          style={styles.headerBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <Text style={styles.arabicAppTitle}>تطبيق الأذكار</Text>
            <Text style={styles.appTitle}>Adhkar App</Text>
          </View>
        </LinearGradient>
        
        <TouchableOpacity style={styles.settingsButton}>
          <BlurView intensity={30} tint={colorScheme} style={styles.blurButton}>
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </BlurView>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeContainer}>
          <ThemedView style={styles.welcomeCard}>
            <ThemedText style={styles.welcomeTextArabic}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </ThemedText>
            <ThemedText style={styles.welcomeTextTranslation}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </ThemedText>
          </ThemedView>
        </View>
        
        <ThemedView style={styles.introContainer}>
          <ThemedText style={styles.introTextArabic}>
            اختر فئة لعرض وقراءة الأذكار اليومية
          </ThemedText>
          <ThemedText style={styles.introText}>
            Select a category to view and read daily adhkar
          </ThemedText>
        </ThemedView>
        
        <View style={styles.categoriesHeader}>
          <View style={styles.categoryTitleContainer}>
            <Text style={[styles.categoryTitleArabic, { color: colors.arabicText }]}>
              فئات الأذكار
            </Text>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>
              Adhkar Categories
            </Text>
          </View>
          
          <TouchableOpacity style={styles.viewTypeButton} onPress={toggleViewType}>
            <BlurView 
              intensity={10} 
              tint={colorScheme} 
              style={[
                styles.viewTypeBlur,
                { borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
              ]}
            >
              <Ionicons 
                name={viewType === 'list' ? 'grid' : 'list'} 
                size={20} 
                color={colors.primary} 
              />
            </BlurView>
          </TouchableOpacity>
        </View>
        
        {viewType === 'list' ? (
          <View style={styles.categoriesContainer}>
            <CategoryCard 
              id="morning"
              title="Morning Adhkar"
              arabicTitle="أذكار الصباح"
              description="تقرأ بعد صلاة الفجر حتى شروق الشمس"
              icon="sunny"
            />
            
            <CategoryCard 
              id="evening"
              title="Evening Adhkar"
              arabicTitle="أذكار المساء"
              description="تقرأ بعد صلاة العصر حتى المغرب"
              icon="moon"
            />
            
            <CategoryCard 
              id="sleep"
              title="Before Sleep Adhkar"
              arabicTitle="أذكار النوم"
              description="تقرأ قبل النوم"
              icon="bed"
            />
          </View>
        ) : (
          <View style={styles.categoriesGrid}>
            <CategoryBlock 
              id="morning"
              title="Morning Adhkar"
              arabicTitle="أذكار الصباح"
              icon="sunny"
            />
            
            <CategoryBlock 
              id="evening"
              title="Evening Adhkar"
              arabicTitle="أذكار المساء"
              icon="moon"
            />
            
            <CategoryBlock 
              id="sleep"
              title="Before Sleep Adhkar"
              arabicTitle="أذكار النوم"
              icon="bed"
            />
            
            <CategoryBlock 
              id="prayer"
              title="Prayer Adhkar"
              arabicTitle="أذكار الصلاة"
              icon="apps"
            />
          </View>
        )}

        <View style={styles.actionButtonContainer}>
          <AnimatedButton
            title="View All Categories"
            arabicTitle="عرض جميع الفئات"
            icon="chevron-forward-circle"
            onPress={() => {}}
            variant="primary"
            size="medium"
          />
        </View>

        {/* Dua Section */}
        <View style={styles.duaHeader}>
          <View style={styles.duaTitleContainer}>
            <Text style={[styles.duaTitleArabic, { color: colors.arabicText }]}>
              الأدعية المأثورة
            </Text>
            <Text style={[styles.duaTitle, { color: colors.text }]}>
              Featured Duas
            </Text>
          </View>
        </View>

        <View style={styles.duaCardsContainer}>
          <LinearGradient
            colors={colorScheme === 'dark' ? ['#293341', '#1D242F'] : ['#E1EFF5', '#D1E5EF']}
            style={[styles.duaCard, {
              borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
            }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.duaIconContainer}>
              <View style={[styles.duaIconCircle, { backgroundColor: colorScheme === 'dark' ? '#1F7A8C' : '#1F7A8C' }]}>
                <Ionicons name="heart" size={24} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.duaArabicText}>
              اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى
            </Text>
            <Text style={styles.duaTranslationText}>
              O Allah, I ask You for guidance, piety, chastity and contentment
            </Text>
            <View style={styles.duaSource}>
              <Text style={styles.duaSourceText}>- رواه مسلم</Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={colorScheme === 'dark' ? ['#2D3546', '#1D2536'] : ['#DFE1EB', '#CFD1E1']}
            style={[styles.duaCard, {
              borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
            }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.duaIconContainer}>
              <View style={[styles.duaIconCircle, { backgroundColor: colorScheme === 'dark' ? '#595F85' : '#595F85' }]}>
                <Ionicons name="shield" size={24} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.duaArabicText}>
              اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ
            </Text>
            <Text style={styles.duaTranslationText}>
              O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being heavily in debt and from being overpowered by men
            </Text>
            <View style={styles.duaSource}>
              <Text style={styles.duaSourceText}>- رواه البخاري</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.actionButtonContainer}>
          <AnimatedButton
            title="View All Duas"
            arabicTitle="عرض جميع الأدعية"
            icon="book"
            onPress={() => {}}
            variant="secondary"
            size="medium"
          />
        </View>
      </ScrollView>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerTextArabic}>
          تم تطويره بمحبة لوجه الله تعالى
        </ThemedText>
        <ThemedText style={styles.footerText}>
          Made with love for Allah's sake
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    position: 'relative',
  },
  headerBackground: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 16,
    top: 24,
    zIndex: 10,
  },
  blurButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  arabicAppTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: 24,
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  welcomeTextArabic: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeTextTranslation: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  introContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  introTextArabic: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  introText: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitleArabic: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 2,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  viewTypeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  viewTypeBlur: {
    width: 36,
    height: 36, 
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  categoriesContainer: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  actionButtonContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  duaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  duaTitleContainer: {
    flex: 1,
  },
  duaTitleArabic: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 2,
  },
  duaTitle: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.7,
  },
  duaCardsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  duaCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  duaIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  duaIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duaArabicText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F7A8C',
    textAlign: 'right',
    marginBottom: 12,
    lineHeight: 32,
  },
  duaTranslationText: {
    fontSize: 14,
    color: '#546E7A',
    textAlign: 'left',
    marginBottom: 16,
    lineHeight: 22,
  },
  duaSource: {
    alignItems: 'flex-end',
  },
  duaSourceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777777',
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 200, 200, 0.1)',
  },
  footerTextArabic: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
  }
});
