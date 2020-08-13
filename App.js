/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Routes from './src/Routes';
import {store, persistor} from './src/store';
import './src/config/ReactotronConfig';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store} persistor={persistor}>
      <Routes />
    </Provider>
  );
}
