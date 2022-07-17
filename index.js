/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

notifee.onBackgroundEvent(({type, detail}) => {
  console.log('Background event:', type, 'notifee:', detail.notification);
});
AppRegistry.registerComponent(appName, () => App);
