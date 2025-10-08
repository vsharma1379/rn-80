import {SafeScreen} from '@/components/templates';
import {Paths} from '@/navigation/paths';
import {RootScreenProps} from '@/navigation/types';
import React from 'react';
import WebView from 'react-native-webview';

function MainRootScreen({navigation}: RootScreenProps<Paths.MainRootScreen>) {
  return (
    <SafeScreen>
      <WebView
        style={{flex: 1}}
        source={{uri: 'https://www.ambitionbox.com'}}
      />
    </SafeScreen>
  );
}

export default MainRootScreen;
