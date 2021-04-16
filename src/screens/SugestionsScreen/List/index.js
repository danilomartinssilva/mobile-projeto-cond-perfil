import React, {useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dimensions, colors, spacing} from '../../../theme';
import {format, parseISO} from 'date-fns';
import {FAB} from 'react-native-paper';
import {getProfile} from '../../../services/helper';

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
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import Sugestions from '../../../store/modules/sugestions';

export default function SugestionsListScreen({navigation}) {
  let sugestions = useSelector((state) => state.sugestions);
  const profile = useSelector((state) => state.profile);
  if (getProfile(profile) === 'MASTER') {
    sugestions = sugestions.items;
  } else {
    sugestions =
      sugestions.items && sugestions.items.length
        ? sugestions.items.filter((item) => item.user_id === profile.data.id)
        : [];
  }
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Sugestions.loadSugestionRequest());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sugestões/Reclamações',
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
      <ContainerTitle>
        {/*  <Image source={reservas_icon} /> */}
        <InfoDescriptionContainer>
          <Title>Sugestões/Reclamações</Title>
          <Description>Lista de Reclamações/Sugestões</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        data={sugestions}
        renderItem={({item, index}) => (
          <Card
            onPress={() =>
              navigation.navigate('SugestionShowScreen', {id: item.id})
            }>
            <ContainerInfo>
              <TitleEventText>{item.subject}</TitleEventText>
              <InfoEventText>{item.description}</InfoEventText>
            </ContainerInfo>
            <OptionsContainer>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Sugestões', 'O que deseja fazer?', [
                    {
                      text: 'Excluir',
                      onPress: () =>
                        dispatch(Sugestions.destroySugestionRequest(item.id)),
                    },
                    {
                      text: 'Editar',
                      onPress: () => {
                        navigation.navigate('SugestionEditScreen', {
                          sugestion: item,
                        });
                      },
                    },
                    {
                      text: 'Cancelar',
                    },
                  ]);
                }}>
                <Ionicons
                  name="settings"
                  size={20}
                  style={{margin: 4, color: 'white'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SugestionShowScreen', {id: item.id})
                }>
                <Ionicons
                  name="search"
                  size={20}
                  style={{margin: 4, color: 'white'}}
                />
              </TouchableOpacity>
            </OptionsContainer>
          </Card>
        )}
      />
      <FAB
        onPress={() => navigation.navigate('SugestionsCreateScreen')}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 50,
        }}
        small
        icon="plus"
      />
    </Container>
  );
}
