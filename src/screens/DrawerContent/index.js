import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {logoffRequest} from '../../store/modules/auth/actions';
import user_placeholder from '../../assets/user_placeholder.jpg';
import Condominiums from '../../store/modules/condominiums';
import {getProfile} from '../../services/helper';
import {fonts} from '../../theme/fonts';

Icon.loadFont();
export default function DrawContent(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Condominiums.loadCondominiumRequest());
  }, []);
  const condominiums = useSelector((state) => state.condominiums);
  const profile = useSelector((state) => state.profile);

  function handleGetNameCondominum(condominium_id) {
    return (
      condominiums &&
      condominiums.items &&
      condominiums.items.length &&
      condominiums.items.find(
        (condominium) => condominium.id === condominium_id,
      ).name
    );
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image source={user_placeholder} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{profile?.data?.name}</Title>

                {!!profile && !!profile.data && !!profile.data.roles.length && (
                  <Caption style={styles.caption}>
                    PERFIL - {profile.data.roles[0].name}
                  </Caption>
                )}
                {!!profile && !!profile.data && !!profile.data.condominium && (
                  <Caption style={styles.caption}>
                    {profile.data.condominium.name}
                  </Caption>
                )}
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('HomeStack');
              }}
            />
            {!!profile.data &&
              profile.data.roles
                .map((role) => role.name)
                .includes('MASTER') && (
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="warehouse" color={color} size={size} />
                  )}
                  label="Condominios"
                  onPress={() => {
                    props.navigation.navigate('CondominiumsStack');
                  }}
                />
              )}
            {!!profile.data &&
              profile.data.roles
                .map((role) => role.name)
                .includes('MASTER') && (
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="account-outline" color={color} size={size} />
                  )}
                  label="Usuários"
                  onPress={() => {
                    props.navigation.navigate('UserStack');
                  }}
                />
              )}
            {!!profile.data &&
              profile.data.roles
                .map((role) => role.name)
                .includes('MASTER') && (
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="calculator" color={color} size={size} />
                  )}
                  label="Prestação de Conta"
                  onPress={() => {
                    props.navigation.navigate('BalancesStack');
                  }}
                />
              )}
            {!!profile.data &&
              profile.data.roles
                .map((role) => role.name)
                .includes('MASTER') && (
                <DrawerItem
                  icon={({color, size}) => (
                    <Icon name="globe-model" color={color} size={size} />
                  )}
                  label="Convenções"
                  onPress={() => {
                    props.navigation.navigate('ConventionsStack');
                  }}
                />
              )}

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-edit-outline" color={color} size={size} />
              )}
              label="Minha-conta"
              onPress={() => {
                props.navigation.navigate('AccountStack', {
                  screen: 'AccountShowScreen',
                });
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="barcode" color={color} size={size} />
              )}
              label="Boletos"
              onPress={() => {
                props.navigation.navigate('BoletosStack');
              }}
            />
            <DrawerItem
              /*   icon={({color, size}) => (
                <Icon name='ios-add' color={color} size={size} />
              )} */
              label="Enquetes"
              onPress={() => {
                props.navigation.navigate('SurveyStack');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="calendar-month-outline" color={color} size={size} />
              )}
              label="Reservas"
              onPress={() => {
                props.navigation.navigate('EventosStack');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Informativos"
              onPress={() => {
                props.navigation.navigate('RegrasStack');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="card-text-outline" color={color} size={size} />
              )}
              label="Manuais"
              onPress={() => {
                props.navigation.navigate('ManualsStack');
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Sair"
              onPress={() => {
                dispatch(logoffRequest());
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {/* <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sair"
          onPress={() => {
            dispatch(logoffRequest());
          }}
        />
      </Drawer.Section> */}
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
