import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login';
import React from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import {useStore} from 'react-redux';
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
