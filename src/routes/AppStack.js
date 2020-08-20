import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {View, Text} from 'react-native';
import DrawerContent from '../screens/DrawerContent';
import RegrasScreen from '../screens/RegrasScreen';
import BoletosScreen from '../screens/BoletosScreen';
import EventosListScreen from '../screens/Eventos/List';
import EventosCreateScreen from '../screens/Eventos/Create';
import {useStore, useSelector} from 'react-redux';
import CondominiumsListScreen from '../screens/CondominiumScreen/List';
import CondominiumsCreateScreen from '../screens/CondominiumScreen/Create';
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
function CondominiumsStack() {
  return (
    <Stack.Navigator initialRouteName="CondominiumsListScreen">
      <Stack.Screen
        component={CondominiumsListScreen}
        name="CondominiumsListScreen"
      />
      <Stack.Screen
        component={CondominiumsCreateScreen}
        name="CondominiumsCreateScreen"
      />
    </Stack.Navigator>
  );
}
function EventosStack() {
  return (
    <Stack.Navigator initialRouteName="EventosListScreen">
      <Stack.Screen component={EventosListScreen} name="EventosListScreen" />
      <Stack.Screen
        component={EventosCreateScreen}
        name="EventosCreateScreen"
      />
    </Stack.Navigator>
  );
}
function AppStack() {
  const profile = useSelector((state) => state.profile);
  return (
    <Drawer.Navigator
      initialRouteName="RegrasStack"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="RegrasStack" component={RegrasStack} />

      <Drawer.Screen name="EnquetesScreen" component={EnquetesScreen} />
      <Drawer.Screen name="BoletosStack" component={BoletosStack} />
      <Drawer.Screen name="EventosStack" component={EventosStack} />
      {profile &&
        profile.data &&
        profile.data.roles &&
        profile.data.roles.length &&
        profile.data.roles.map((role) => role.name).includes('MASTER') && (
          <Drawer.Screen
            name="CondominiumsStack"
            component={CondominiumsStack}
          />
        )}

      <Drawer.Screen name="ReservaScreen" component={ReservaScreen} />
    </Drawer.Navigator>
  );
}
export default AppStack;
