import './config/ReactotronConfig';
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import Router from './routes/Router';
import {PersistGate} from 'redux-persist/integration/react';

export default function Main() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator animating />}
        persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
