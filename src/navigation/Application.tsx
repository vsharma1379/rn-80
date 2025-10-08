import type {RootStackParamList} from '@/navigation/types';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Paths} from '@/navigation/paths';
import {useTheme} from '@/theme';
import BootSplash from 'react-native-bootsplash';

import {Example, Startup} from '@/screens';
import {Alert} from 'react-native';
import MainRootScreen from '@/screens/MainRootScreen/MainRootScreen';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const {navigationTheme, variant} = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={navigationTheme}
        onReady={() => {
          BootSplash.hide();
        }}>
        <Stack.Navigator
          key={variant}
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
            animationDuration: 0,
          }}
          initialRouteName={Paths.MainRootScreen}>
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen component={Example} name={Paths.Example} />
          <Stack.Screen
            component={MainRootScreen}
            name={Paths.MainRootScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
