import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Title,
  Logo,
  Description,
  Separator,
  ContainerItemMenuInfo,
  ContainerMenu,
  Button,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../assets/logo.png';
import atas_icon from '../../assets/icons/atas.jpg';
import balancos_icon from '../../assets/icons/balancos.jpg';
import convencoes_icon from '../../assets/icons/convencoes.jpg';
import enquete_icon from '../../assets/icons/enquete.jpg';
import regras_icon from '../../assets/icons/informativos.jpg';
import regulamentos_icon from '../../assets/icons/regulamento.jpg';
import reservas_icon from '../../assets/icons/reservas.jpg';

import caixa_entrada from '../../assets/icons/caixa-entrada.jpg';
import notifcacoes_icons from '../../assets/icons/notificacoes.jpg';
import sugestoes from '../../assets/icons/sugestoes.jpg';
import home_icon from '../../assets/icons/home-ico.png';

export default function HomeScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      /*     title: 'Adicionar Regra', */
      headerLeft: () => (
        <MaterialIcons
          name="menu"
          size={28}
          style={{margin: 8, paddingRight: 10}}
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, [navigation]);
  return (
    <Container>
      <Button
        onPress={() =>
          navigation.navigate('AtasStack', {
            screen: 'AtasListScreen',
          })
        }>
        <Image
          source={atas_icon}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('BalancesStack', {
            screen: 'BalancesListScreen',
          })
        }>
        <Image
          source={balancos_icon}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('ConventionsStack', {
            screen: 'ConventionsListScreen',
          })
        }>
        <Image
          source={convencoes_icon}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('SurveyStack', {
            screen: 'SurveysListScreen',
          });
        }}>
        <Image
          source={enquete_icon}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('RegrasStack', {
            screen: 'RegrasListScreen',
          })
        }>
        <Image
          source={regras_icon}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('RegulamentsStack', {
            screen: 'RegulamentsListScreen',
          });
        }}>
        <Image
          source={regulamentos_icon}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('PrivateNoticeStack', {
            screen: 'PrivateNoticeListScreen',
          });
        }}>
        <Image
          source={caixa_entrada}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('SugestionStack', {
            screen: 'SugestionsListScreen',
          });
        }}>
        <Image
          source={sugestoes}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('NotificationStack', {
            screen: 'NotificationsListScreen',
          });
        }}>
        <Image
          source={notifcacoes_icons}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('EventosStack', {
            screen: 'EventosStack',
          })
        }>
        <Image
          source={reservas_icon}
          style={{width: '100%', height: 100}}
          resizeMode="contain"
        />
      </Button>
    </Container>
  );
}
