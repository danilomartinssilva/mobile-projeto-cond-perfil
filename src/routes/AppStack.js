import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {View, Text} from 'react-native';
import DrawerContent from '../screens/DrawerContent';
import RegrasScreen from '../screens/RegrasScreen';
import BoletosScreen from '../screens/BoletosScreen';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const EnquetesScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Enquete Screen</Text>
  </View>
);
const ReservaScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Reserva Screen</Text>
  </View>
);
function RegrasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={RegrasScreen} name="RegrasScreen" />
    </Stack.Navigator>
  );
}
function BoletosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={BoletosScreen} name="BoletosScreen" />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName="RegrasStack"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="RegrasStack" component={RegrasStack} />
      <Drawer.Screen name="EnquetesScreen" component={EnquetesScreen} />
      <Drawer.Screen name="BoletosStack" component={BoletosStack} />

      <Drawer.Screen name="ReservaScreen" component={ReservaScreen} />
    </Drawer.Navigator>
  );
}
export default AppStack;
