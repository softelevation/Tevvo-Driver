/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
