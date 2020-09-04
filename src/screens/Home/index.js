import React, {useLayoutEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {
  Container,
  Title,
  Logo,
  Description,
  Separator,
  ContainerItemMenuInfo,
  ContainerMenu,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../assets/logo.png';
import atas_icon from '../../assets/icons/atas-ico.png';
import balancos_icon from '../../assets/icons/balancos-ico.png';
import convencoes_icon from '../../assets/icons/convencoes-ico.png';
import enquete_icon from '../../assets/icons/enquete-ico.png';
import home_icon from '../../assets/icons/home-ico.png';
import regras_icon from '../../assets/icons/regras-ico.png';
import regulamentos_icon from '../../assets/icons/regulamento-ico.png';
import reservas_icon from '../../assets/icons/reservas-ico.png';
import usuario_icon from '../../assets/icons/usuario-ico.png';
import barcode_icon from '../../assets/icons/barcode-ico.png';

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
      <ScrollView>
        <Logo source={logo} />
        <ContainerMenu>
          <Image source={atas_icon} />
          <ContainerItemMenuInfo
            onPress={() => navigation.navigate('AtasStack')}>
            <Title>Atas</Title>
            <Description>
              Relação de atas de assembleia do seu condomínio
            </Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={balancos_icon} />
          <ContainerItemMenuInfo
            onPress={() =>
              navigation.navigate('BalancesStack', {
                screen: 'BalancesListScreen',
              })
            }>
            <Title>Balanços</Title>
            <Description>
              Confira abaixo os balances do seu condomínio.
            </Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={barcode_icon} />

          <ContainerItemMenuInfo
            onPress={() =>
              navigation.navigate('BoletosStack', {
                screen: 'BoletosScreen',
              })
            }>
            <Title>Boletos</Title>
            <Description>Emissão de segunda via de boletos aqui</Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={convencoes_icon} />
          <ContainerItemMenuInfo
            onPress={() =>
              navigation.navigate('ConventionsStack', {
                screen: 'ConventionsListScreen',
              })
            }>
            <Title>Convenções</Title>
            <Description>Confira as convenções do seu condomínio</Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={reservas_icon} />
          <ContainerItemMenuInfo
            onPress={() =>
              navigation.navigate('EventosStack', {
                screen: 'EventosStack',
              })
            }>
            <Title>Reservas</Title>
            <Description>Reserva para utilização de áreas comuns</Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={regras_icon} />
          <ContainerItemMenuInfo
            onPress={() =>
              navigation.navigate('RegrasStack', {
                screen: 'RegrasListScreen',
              })
            }>
            <Title>Regras</Title>
            <Description>Regras comuns de todo o condomínio</Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={regulamentos_icon} />
          <ContainerItemMenuInfo
            onPress={() => {
              navigation.navigate('RegulamentsStack', {
                screen: 'RegulamentsListScreen',
              });
            }}>
            <Title>Regulamentos</Title>
            <Description>Normas e regulamentos de condomínio</Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={enquete_icon} />
          <ContainerItemMenuInfo
            onPress={() => {
              navigation.navigate('SurveyStack', {
                screen: 'SurveysListScreen',
              });
            }}>
            <Title>Enquete</Title>
            <Description>Dados de cadastro</Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
        <ContainerMenu>
          <Image source={usuario_icon} />
          <ContainerItemMenuInfo>
            <Title>Minha conta</Title>
            <Description>Dados de cadastro</Description>
          </ContainerItemMenuInfo>
        </ContainerMenu>
      </ScrollView>
    </Container>
  );
}
