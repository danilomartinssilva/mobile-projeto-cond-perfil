import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {View, Text} from 'react-native';
import DrawerContent from '../screens/DrawerContent';
import BoletosScreen from '../screens/BoletosScreen';
import EventosListScreen from '../screens/Eventos/List';
import EventosCreateScreen from '../screens/Eventos/Create';
import {useStore, useSelector} from 'react-redux';
import CondominiumsListScreen from '../screens/CondominiumScreen/List';
import CondominiumsCreateScreen from '../screens/CondominiumScreen/Create';
import RegrasCreateScreen from '../screens/Regras/Create';
import RegrasListScreen from '../screens/Regras/List';
import RegrasShowScreen from '../screens/Regras/Show';

import HomeScreen from '../screens/Home';
import BalancesCreateScreen from '../screens/BalancesScreen/Create';
import BalancesListScreen from '../screens/BalancesScreen/List';
import BalancesShowScreen from '../screens/BalancesScreen/Show';
import ConventionsListScreen from '../screens/ConventionsScreen/List';
import ConventionsCreateScreen from '../screens/ConventionsScreen/Create';
import ConventionsShowScreen from '../screens/ConventionsScreen/Show';
import RegulamentsCreateScreen from '../screens/RegulamentsScreen/Create';
import RegulamentsListScreen from '../screens/RegulamentsScreen/List';
import RegulamentosShowScreen from '../screens/RegulamentsScreen/Show';
import AtasListScreen from '../screens/AtasScreen/List';
import AtasShowScreen from '../screens/AtasScreen/Show';
import AtasCreateScreen from '../screens/AtasScreen/Create';
import SurveysCreateScreen from '../screens/Surveys/Create';
import SurveysListScreen from '../screens/Surveys/List';
import SurveyShowScreen from '../screens/Surveys/Show';
import NotificationsCreateScreen from '../screens/NotificationsScreen/Create';
import NotificationsListScreen from '../screens/NotificationsScreen/List';
import NoticeCreateScreen from '../screens/PrivateNoticesScreen/Create';
import UsersListScreen from '../screens/UsersScreen/List';
import ShowUserScreen from '../screens/UsersScreen/Show';
import AtasEditScreen from '../screens/AtasScreen/Edit';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const PrivateNoticeStack = () => {
  return (
    <Stack.Navigator initialRouteName="NoticeCreateScreen">
      <Stack.Screen component={NoticeCreateScreen} name="NoticeCreateScreen" />
    </Stack.Navigator>
  );
};
const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="UsersListScreen">
      <Stack.Screen component={UsersListScreen} name="UsersListScreen" />
      <Stack.Screen component={ShowUserScreen} name="ShowUserScreen" />
    </Stack.Navigator>
  );
};
const NotificationStack = () => {
  return (
    <Stack.Navigator initialRouteName="NotificationsListScreen">
      <Stack.Screen
        component={NotificationsCreateScreen}
        name="NotificationsCreateScreen"
      />
      <Stack.Screen
        component={NotificationsListScreen}
        name="NotificationsListScreen"
      />
    </Stack.Navigator>
  );
};
const SurveyStack = () => (
  <Stack.Navigator initialRouteName="SurveysListScreen">
    <Stack.Screen component={SurveysCreateScreen} name="SurveysCreateScreen" />
    <Stack.Screen component={SurveysListScreen} name="SurveysListScreen" />
    <Stack.Screen component={SurveyShowScreen} name="SurveyShowScreen" />
  </Stack.Navigator>
);

const BalancesStack = () => (
  <Stack.Navigator initialRouteName="BalancesListScreen">
    <Stack.Screen
      component={BalancesCreateScreen}
      name="BalancesCreateScreen"
    />
    <Stack.Screen component={BalancesListScreen} name="BalancesListScreen" />
    <Stack.Screen component={BalancesShowScreen} name="BalancesShowScreen" />
  </Stack.Navigator>
);
const AtasStack = () => (
  <Stack.Navigator initialRouteName="AtasListScreen">
    <Stack.Screen component={AtasCreateScreen} name="AtasCreateScreen" />
    <Stack.Screen component={AtasListScreen} name="AtasListScreen" />
    <Stack.Screen component={AtasShowScreen} name="AtasShowScreen" />
    <Stack.Screen component={AtasEditScreen} name="AtasEditScreen" />
  </Stack.Navigator>
);
const RegulamentsStack = () => (
  <Stack.Navigator initialRouteName="RegulamentsListScreen">
    <Stack.Screen
      component={RegulamentsCreateScreen}
      name="RegulamentsCreateScreen"
    />
    <Stack.Screen
      component={RegulamentsListScreen}
      name="RegulamentsListScreen"
    />
    <Stack.Screen
      component={RegulamentosShowScreen}
      name="RegulamentosShowScreen"
    />
  </Stack.Navigator>
);
const ConventionsStack = () => (
  <Stack.Navigator
    initialRouteName="ConventionsListScreen"
    screenOptions={{
      title: 'Convenções',
      headerTitleAlign: 'center',
    }}>
    <Stack.Screen
      component={ConventionsCreateScreen}
      name="ConventionsCreateScreen"
    />
    <Stack.Screen
      component={ConventionsListScreen}
      name="ConventionsListScreen"
    />
    <Stack.Screen
      component={ConventionsShowScreen}
      name="ConventionsShowScreen"
    />
  </Stack.Navigator>
);

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
    <Stack.Navigator
      initialRouteName="RegrasListScreen"
      screenOptions={{
        title: 'Regras',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen component={RegrasCreateScreen} name="RegrasCreateScreen" />
      <Stack.Screen component={RegrasListScreen} name="RegrasListScreen" />
      <Stack.Screen component={RegrasShowScreen} name="RegrasShowScreen" />
    </Stack.Navigator>
  );
}
function BoletosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Boletos',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen component={BoletosScreen} name="BoletosScreen" />
    </Stack.Navigator>
  );
}
function CondominiumsStack() {
  return (
    <Stack.Navigator
      initialRouteName="CondominiumsListScreen"
      screenOptions={{
        title: 'Condominio',
        headerTitleAlign: 'center',
      }}>
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
    <Stack.Navigator
      initialRouteName="EventosListScreen"
      screenOptions={{
        title: 'Eventos',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen component={EventosListScreen} name="EventosListScreen" />
      <Stack.Screen
        component={EventosCreateScreen}
        name="EventosCreateScreen"
      />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{
          headerTitleAlign: 'center',
          title: 'Principal',
        }}
      />
    </Stack.Navigator>
  );
}
function AppStack() {
  const profile = useSelector((state) => state.profile);
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="RegrasStack" component={RegrasStack} />
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="SurveyStack" component={SurveyStack} />
      <Drawer.Screen name="BalancesStack" component={BalancesStack} />
      <Drawer.Screen name="ConventionsStack" component={ConventionsStack} />
      <Drawer.Screen name="RegulamentsStack" component={RegulamentsStack} />
      <Drawer.Screen name="EnquetesScreen" component={EnquetesScreen} />
      <Drawer.Screen name="BoletosStack" component={BoletosStack} />
      <Drawer.Screen name="EventosStack" component={EventosStack} />
      <Drawer.Screen name="AtasStack" component={AtasStack} />
      <Drawer.Screen name="PrivateNoticeStack" component={PrivateNoticeStack} />
      <Drawer.Screen name="NotificationStack" component={NotificationStack} />
      <Drawer.Screen name="UserStack" component={UserStack} />
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
