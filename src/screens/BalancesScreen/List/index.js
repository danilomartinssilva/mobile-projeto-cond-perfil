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
import balances_icon from '../../../assets/icons/balancos-ico.png';

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
import Balances from '../../../store/modules/balances';
import {getProfile} from '../../../services/helper';

export default function BalancesListScreen({navigation}) {
  const balances = useSelector((state) => state.balances);
  const profile = useSelector((state) => state.profile);
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Balances.loadBalanceRequest());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Balanço Patrimonial ',
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
        <Image source={balances_icon} />
        <InfoDescriptionContainer>
          <Title>Balanços</Title>
          <Description>Prestação de Contas</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={balances.items}
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
                  navigation.navigate('BalancesShowScreen', {
                    id: item.id,
                  })
                }>
                <Ionicons
                  name="document-outline"
                  size={20}
                  style={{margin: 4, color: 'white'}}
                />
              </TouchableOpacity>
            </OptionsContainer>
            {getProfile(profile) === 'MASTER' && (
              <OptionsContainer>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Balanços', 'O que deseja fazer?', [
                      {
                        text: 'Excluir',
                        onPress: () => Balances.destroyBalanceRequest(item.id),
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
              </OptionsContainer>
            )}
          </Card>
        )}
      />
      {getProfile(profile) === 'MASTER' && (
        <FAB
          onPress={() => navigation.navigate('BalancesCreateScreen')}
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
