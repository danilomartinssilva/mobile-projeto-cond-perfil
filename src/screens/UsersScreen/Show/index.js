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
import {useSelector, useStore, useDispatch} from 'react-redux';
import Users from '../../../store/modules/users';
import {getProfile} from '../../../services/helper';
import api from '../../../services/api';
import WebView from 'react-native-webview';

export default function ShowUserScreen({navigation, route}) {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const {id} = route.params;

  useEffect(() => {
    dispatch(Users.showUserRequest(id));
  }, []);
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
      {!!users.detail && (
        <>
          <ContainerTitle>
            <InfoDescriptionContainer>
              <Title>Dados de Usuário</Title>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Card>
            <ContainerInfo>
              <TitleEventText>Nome: {users.detail.name}</TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>Email: {users.detail.email}</TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>
                Perfil: {users.detail.roles[0].name}
              </TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>
                Condomínio: {users.detail.condominium.name}
              </TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>Status: {users.detail.status}</TitleEventText>
            </ContainerInfo>
          </Card>

          {users && users.detail && users.detail.status === 'waiting' ? (
            <TButton
              onPress={() =>
                dispatch(
                  Users.updateUsersRequest({
                    status: 'active',
                    id: users.detail.id,
                  }),
                )
              }>
              Ativar
            </TButton>
          ) : (
            <TButton
              onPress={() =>
                dispatch(
                  Users.updateUsersRequest({
                    status: 'inactive',
                    id: users.detail.id,
                  }),
                )
              }>
              Tornar inativo
            </TButton>
          )}
        </>
      )}
      <TButton
        onPress={() => {
          Alert.alert('Perfil', 'Deseja alterar o perfil deste usuário?', [
            {
              text: 'Condomino',
              onPress: () =>
                dispatch(
                  Users.updateUsersRequest({
                    role_id: 3,
                    id: users.detail.id,
                  }),
                ),
            },
            {
              text: 'Síndico',
              onPress: () =>
                dispatch(
                  Users.updateUsersRequest({
                    role_id: 2,
                    id: users.detail.id,
                  }),
                ),
            },
            {
              text: 'Master',
              onPress: () =>
                dispatch(
                  Users.updateUsersRequest({
                    role_id: 1,
                    id: users.detail.id,
                  }),
                ),
            },
            {
              text: 'Cancelar',
            },
          ]);
        }}>
        Alterar perfil
      </TButton>
    </Container>
  );
}
