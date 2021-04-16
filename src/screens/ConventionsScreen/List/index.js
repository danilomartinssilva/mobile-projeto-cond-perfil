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
import Conventions from '../../../store/modules/conventions';
import {getProfile} from '../../../services/helper';
import convencoes_icon from '../../../assets/icons/convencoes-ico.png';

export default function ConventionsListScreen({navigation}) {
  const conventions = useSelector((state) => state.conventions);
  const profile = useSelector((state) => state.profile);
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Conventions.loadConventionRequest());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Convenções',
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
        <Image source={convencoes_icon} />
        <InfoDescriptionContainer>
          <Title>Convenções</Title>
          <Description>Confira as convenções do seu condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={conventions.items}
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
                  navigation.navigate('ConventionsShowScreen', {
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
                    Alert.alert('Convenções', 'O que deseja fazer?', [
                      {
                        text: 'Excluir',
                        onPress: () => {
                          dispatch(
                            Conventions.destroyConventionRequest(item.id),
                          );
                        },
                      },
                      {
                        text: 'Editar',
                        onPress: () => {
                          navigation.navigate('ConventionsEditScreen', {
                            convention: item,
                          });
                        },
                      },
                      {
                        text: 'Cancelar',
                        onPress: () => {},
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
      {getProfile(profile) === 'MASTER' && (
        <FAB
          onPress={() => navigation.navigate('ConventionsCreateScreen')}
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
