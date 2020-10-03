import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Images,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {dimensions, colors, spacing} from '../../../theme';
import {format, parseISO} from 'date-fns';
import PDFView from 'react-native-view-pdf';

import {FAB} from 'react-native-paper';
import {
  Container,
  Card,
  ContainerInfo,
  TitleEventText,
  InfoEventText,
  OptionsContainer,
  ContainerTitle,
  InfoDescriptionContainer,
  Title,
  Description,
  TButton,
} from './styles';
import {useSelector, useDispatch} from 'react-redux';

export default function AccountShowScreen({navigation}) {
  const profile = useSelector((state) => state.profile).data;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Realize sua votação',
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
  function formatDate(date) {
    let convertDate = format(parseISO(date), 'd-MM-yyyy');
    return convertDate;
  }

  return (
    <Container>
      {!!profile && (
        <>
          <ContainerTitle>
            <InfoDescriptionContainer>
              <Title>Minha conta</Title>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Card>
            <ContainerInfo>
              <TitleEventText>Nome: {profile.name}</TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>Cpf: {profile.cpf}</TitleEventText>
            </ContainerInfo>
          </Card>

          <Card>
            <ContainerInfo>
              <TitleEventText>Email: {profile.email}</TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            {profile && profile.roles && profile.roles.length && (
              <ContainerInfo>
                <TitleEventText>Perfil: {profile.roles[0].name}</TitleEventText>
              </ContainerInfo>
            )}
          </Card>
          <Card>
            <ContainerInfo>
              {profile && profile.condominium && (
                <TitleEventText>
                  Condomínio: {profile.condominium.name}
                </TitleEventText>
              )}
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>
                Numero do apartamento: {profile.apartament_number}
              </TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>Status: {profile.status}</TitleEventText>
            </ContainerInfo>
          </Card>
        </>
      )}
      <TButton onPress={() => navigation.navigate('AccountEditScreen')}>
        Alterar dados
      </TButton>
      <TButton onPress={() => navigation.goBack()}>Voltar</TButton>
    </Container>
  );
}
