import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer, useLinking} from '@react-navigation/native';
import {navigationRef} from '../services/RootNavigation';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useStore} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthLoadingStack from './AuthLoadingStack';
const RootStack = createStackNavigator();

export default function Routes() {
  const store = useStore();
  const {auth} = store.getState();
  const {getInitialState} = useLinking(navigationRef, {
    prefixes: ['https://perfil.com', 'perfil-mobile://'],
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then((state) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName={'AuthLoadingStack'}>
        <RootStack.Screen
          name={'AuthLoadingStack'}
          component={AuthLoadingStack}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={'AuthStack'}
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={'AppStack'}
          component={AppStack}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
