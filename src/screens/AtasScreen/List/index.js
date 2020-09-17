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
import FeatherIcon from 'react-native-vector-icons/Feather';
import {dimensions, colors, spacing} from '../../../theme';

import {format, parseISO} from 'date-fns';
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
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import Minutes from '../../../store/modules/minutes';
import {getProfile} from '../../../services/helper';
import atas_icon from '../../../assets/icons/atas-ico.png';
export default function AtasListScreen({navigation}) {
  const minutes = useSelector((state) => state.minutes);
  const profile = useSelector((state) => state.profile);
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    if (__DEV__) console.tron.log(getProfile(profile));
    getProfile(profile) === 'MASTER'
      ? dispatch(Minutes.getAllRequest())
      : dispatch(Minutes.loadMinuteRequest());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Atas ',
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
        <Image source={atas_icon} />
        <InfoDescriptionContainer>
          <Title>Atas</Title>
          <Description>Relação das assembleias de seu condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={minutes.items}
        renderItem={({item, index}) => (
          <Card>
            <ContainerInfo>
              <TitleEventText>{item.name}</TitleEventText>
              <InfoEventText>Descricao:{item.description}</InfoEventText>
              <InfoEventText>
                Data de modificação: {formatDate(item.updated_at)}
              </InfoEventText>
            </ContainerInfo>
            <OptionsContainer>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AtasShowScreen', {
                    id: item.id,
                  })
                }>
                <Ionicons
                  name="document-outline"
                  size={20}
                  style={{margin: 4, color: 'white'}}
                />
              </TouchableOpacity>
              {getProfile(profile) === 'MASTER' && (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Atas', 'O que deseja fazer?', [
                      {
                        text: 'Excluir',
                        onPress: () =>
                          dispatch(Minutes.destroyMinuteRequest(item.id)),
                      },
                      {
                        text: 'Editar',
                        onPress: () =>
                          navigation.navigate('AtasEditScreen', {minute: item}),
                      },
                      {
                        text: 'Cancelar',
                      },
                    ])
                  }>
                  <Ionicons
                    name="md-settings"
                    size={20}
                    style={{margin: 4, color: 'white'}}
                  />
                </TouchableOpacity>
              )}
            </OptionsContainer>
          </Card>
        )}
      />
      {(getProfile(profile) === 'SINDICO' ||
        getProfile(profile) === 'MASTER') && (
        <FAB
          onPress={() => navigation.navigate('AtasCreateScreen')}
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 50,
          }}
          small
          icon="plus"
        />
      )}
    </Container>
  );
}
