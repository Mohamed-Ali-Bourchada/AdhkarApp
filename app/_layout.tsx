import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import 'react-native-gesture-handler';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];

  const DrawerContent = (props: any) => {
    return (
      <View style={[styles.drawerContent, { backgroundColor: colors.background }]}>
        <View style={styles.drawerHeader}>
          <Text style={[styles.drawerTitle, { color: colors.text }]}>Adhkar App</Text>
          <Text style={[styles.drawerSubtitle, { color: colors.translationText }]}>v1.0.0</Text>
        </View>
        
        <View style={styles.drawerBody}>
          <TouchableOpacity 
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.closeDrawer();
              router.push('/(tabs)');
            }}
          >
            <Ionicons name="home" size={22} color={colors.primary} style={styles.drawerIcon} />
            <Text style={[styles.drawerItemText, { color: colors.text }]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.drawerItem}
            onPress={() => {
              props.navigation.closeDrawer();
              // Handle settings navigation
            }}
          >
            <Ionicons name="settings" size={22} color={colors.primary} style={styles.drawerIcon} />
            <Text style={[styles.drawerItemText, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.drawerFooter}>
          <Text style={[styles.drawerFooterText, { color: colors.translationText }]}>
            Made with love for Allah's sake
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            width: '75%',
          },
        }}
        drawerContent={DrawerContent}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
        <Drawer.Screen
          name="category/[id]"
          options={{
            drawerLabel: 'Category',
            title: 'Category',
            drawerItemStyle: { height: 0 },
          }}
        />
        <Drawer.Screen
          name="dhikr-reader/[categoryId]/[dhikrId]"
          options={{
            drawerLabel: 'Dhikr Reader',
            title: 'Dhikr Reader',
            drawerItemStyle: { height: 0 },
          }}
        />
      </Drawer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  drawerSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  drawerBody: {
    flex: 1,
    paddingTop: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  drawerIcon: {
    marginRight: 16,
  },
  drawerItemText: {
    fontSize: 16,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  drawerFooterText: {
    fontSize: 12,
    textAlign: 'center',
  }
});
