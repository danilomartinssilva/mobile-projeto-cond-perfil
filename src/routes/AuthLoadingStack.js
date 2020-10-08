import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import React from 'react';

import {useStore} from 'react-redux';
import AuthLoading from '../screens/AuthLoading';

const Stack = createStackNavigator();

function AuthLoadingStack() {
  const store = useStore();
  const {auth} = store.getState();

  return (
    <Stack.Navigator initialRouteName="AuthLoading">
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default AuthLoadingStack;
