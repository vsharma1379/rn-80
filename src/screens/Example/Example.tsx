import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useI18n, useUser } from '@/hooks';
import { useTheme } from '@/theme';

import { AssetByVariant, IconByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import WebView from 'react-native-webview';
import { getBuildNumber } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNetInfo } from '@react-native-community/netinfo';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import appsFlyer from 'react-native-appsflyer';
import Modal from 'react-native-modal';
import * as Clarity from '@microsoft/react-native-clarity';
import clsx from 'clsx';

const MAX_RANDOM_ID = 9;

function Example() {
  const { t } = useTranslation();
  const { useFetchOneQuery } = useUser();
  const { toggleLanguage } = useI18n();

  const {
    backgrounds,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);
  const [buildNumber, setBuildNumber] = useState('');
  const { isConnected } = useNetInfo();
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchOneUserQuery = useFetchOneQuery(currentId);

  const getAppsFlyerUID = async (): Promise<string | null> => {
    return new Promise((resolve) => {
      appsFlyer.getAppsFlyerUID((err, uid) => {
        if (err) {
          return resolve(null);
        }
        resolve(uid);
      });
    });
  };

  const getAppBuildNumber = async () => {
    // const res = await getUniqueId();
    const appBuildNumber = getBuildNumber();

    setBuildNumber(appBuildNumber);
    await AsyncStorage.setItem('showModal', 'false');
    await CookieManager.clearAll();

    const appsFlyerId = await getAppsFlyerUID();

    Alert.alert(clsx('foo', true && 'bar', 'baz'));

    Clarity.initialize('j9v42rtxxx', {
      /* logLevel: Clarity.LogLevel.Verbose, */
    });
    // Alert.alert(appsFlyerId?.toString());
  };

  useEffect(() => {
    getAppBuildNumber();
  }, []);

  useEffect(() => {
    if (fetchOneUserQuery.isSuccess) {
      Alert.alert(
        t('screen_example.hello_user', { name: fetchOneUserQuery.data.name }),
      );
    }
  }, [fetchOneUserQuery.isSuccess, fetchOneUserQuery.data, t]);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleResetError = () => {
    void fetchOneUserQuery.refetch();
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={() => {
        handleResetError();
      }}
    >
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={{ height: 300 }}>
            <WebView
              style={{ flex: 1 }}
              source={{ uri: 'https://www.google.com' }}
            />
            <Text style={[fonts.size_16, fonts.red500]}>
              {process.env.API_URL}
            </Text>

            <View className="flex-1 items-center justify-center bg-gray-500">
              <Text className="text-xl font-bold text-green-700">
                Welcome to Nativewind!
              </Text>
            </View>
            <Text style={[fonts.size_16, fonts.red500]}>
              vivek is {isConnected?.toString()}
            </Text>

            <Modal isVisible={isModalVisible}>
              <View style={{ flex: 1 }}>
                <Text>Hello!</Text>

                <Button title="Hide modal" onPress={toggleModal} />
              </View>
            </Modal>
            <Button
              onPress={async () => {
                toggleModal();
                var granted;
                if (Number(Platform.Version) >= 33) {
                  granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                  );
                } else {
                  Alert.alert(Platform.Version.toString());
                  granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  );
                }

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  Alert.alert(granted.toString());
                } else {
                  Alert.alert(granted.toString());
                }
                await GoogleSignin.hasPlayServices();
                await GoogleSignin.signIn();
              }}
              testID="change-btn"
              title="button"
            />
            <Text style={[fonts.size_16, fonts.gray50]}>{buildNumber}</Text>
          </View>

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path="tom"
              resizeMode="contain"
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              {t('screen_example.title')}
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              {t('screen_example.description')}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <Skeleton
              height={64}
              loading={fetchOneUserQuery.isLoading}
              style={{ borderRadius: components.buttonCircle.borderRadius }}
              width={64}
            >
              <TouchableOpacity
                onPress={() => {
                  setCurrentId(Math.ceil(Math.random() * MAX_RANDOM_ID + 1));
                }}
                style={[components.buttonCircle, gutters.marginBottom_16]}
                testID="fetch-user-button"
              >
                <IconByVariant path="send" stroke={colors.purple500} />
              </TouchableOpacity>
            </Skeleton>

            <TouchableOpacity
              onPress={onChangeTheme}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant path="theme" stroke={colors.purple500} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleLanguage}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <IconByVariant path="language" stroke={colors.purple500} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
