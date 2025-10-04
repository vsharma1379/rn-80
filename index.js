import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';
import "./global.css"

// if (__DEV__) {
//   void import('@/reactotron.config');
// }

AppRegistry.registerComponent(appName, () => App);
