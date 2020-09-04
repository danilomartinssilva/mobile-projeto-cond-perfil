import 'react-native-gesture-handler'
import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {navigationRef} from '../services/RootNavigation'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import {useStore} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const RootStack = createStackNavigator()

export default function Routes () {
  const store = useStore()
  const {auth} = store.getState()

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={auth.signed ? 'AppStack' : 'AuthStack'}>
        <RootStack.Screen
          name={'AuthStack'}
          component={AuthStack}
          options={{
            headerShown: false,
            animationTypeForReplace: auth.signed ? 'pop' : 'push',
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
  )
}
