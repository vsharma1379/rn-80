import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';

import ApplicationNavigator from '@/navigation/Application';
import { ThemeProvider } from '@/theme';
import BootSplash from 'react-native-bootsplash';
import '@/translations';
//import { verifyInstallation } from 'nativewind';

//import SplashScreen from 'react-native-splash-screen';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

function App() {
  //BootSplash.isVisible().then((value) => Alert.alert(value.toString()));
  //verifyInstallation();
  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });

    // SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <ApplicationNavigator />
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
