import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import React from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import {useStore} from 'react-redux';
import ForgotPasswordScreen from '../screens/ForgoPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
const Stack = createStackNavigator();

function AuthStack() {
  const store = useStore();
  const {auth} = store.getState();

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: auth.signed ? 'pop' : 'push',
        }}
      />

      <Stack.Screen
        name="ResetPasswordScreen"
        options={{
          headerShown: true,
          title: 'Nova senha',
        }}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          title: 'Confirmação de e-mail',
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default AuthStack;
