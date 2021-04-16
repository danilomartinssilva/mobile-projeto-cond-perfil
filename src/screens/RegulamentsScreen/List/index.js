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

import regulamento_icon from '../../../assets/icons/regulamento-ico.png';

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
import Regulamentos from '../../../store/modules/regulaments';
import {getProfile} from '../../../services/helper';

export default function RegulamentsListScreen({navigation}) {
  const regulaments = useSelector((state) => state.regulaments);
  const profile = useSelector((state) => state.profile);
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Regulamentos.loadRegulamentRequest());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Regulamentos ',
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
        <Image source={regulamento_icon} />
        <InfoDescriptionContainer>
          <Title>Regulamentos</Title>
          <Description>Normas e regulamentos de condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={regulaments.items}
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
                  navigation.navigate('RegulamentosShowScreen', {
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
                  onPress={() => {
                    Alert.alert('Regulamentos', 'O que deseja fazer?', [
                      {
                        text: 'Excluir',
                        onPress: () =>
                          dispatch(
                            Regulamentos.destroyRegulamentRequest(item.id),
                          ),
                      },
                      {
                        text: 'Editar',
                        onPress: () =>
                          navigation.navigate('RegulamentsEditScreen', {
                            regulament: item,
                          }),
                      },
                      {
                        text: 'Cancelar',
                      },
                    ]);
                  }}>
                  <Ionicons
                    name="settings-outline"
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
          onPress={() => navigation.navigate('RegulamentsCreateScreen')}
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
