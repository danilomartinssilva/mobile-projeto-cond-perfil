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
import Notifications from '../../../store/modules/notifications';
import {getProfile} from '../../../services/helper';
import convencoes_icon from '../../../assets/icons/convencoes-ico.png';

export default function PrivateNoticeListScreen({navigation}) {
  const notifications = useSelector((state) => state.notifications);
  const profile = useSelector((state) => state.profile);
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile(profile) === 'MASTER'
      ? dispatch(Notifications.getAllRequest())
      : dispatch(Notifications.loadNotificationRequest());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Notificações ',
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
          <Title>Notificações</Title>
          <Description>Confira as notificações do seu condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={notifications.items}
        renderItem={({item, index}) => (
          <Card>
            <ContainerInfo>
              <TitleEventText>{item.name}</TitleEventText>
              <InfoEventText>Descricao:{item.description}</InfoEventText>
              <InfoEventText>
                Data de modificação: {formatDate(item.updated_at)}
              </InfoEventText>
              <InfoEventText>
                Status:{' '}
                {item.status === 'waiting'
                  ? 'Aguardando'
                  : item.status === 'active'
                  ? 'active'
                  : 'inativo'}
              </InfoEventText>
            </ContainerInfo>
            {getProfile(profile) === 'MASTER' && (
              <OptionsContainer>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Notificação',
                      'O que deseja fazer com a notificação?',
                      [
                        {
                          text: 'Tornar ativa',
                          onPress: () => {
                            dispatch(
                              Notifications.updateNotificationsRequest({
                                id: item.id,
                                status: 'active',
                              }),
                            );
                          },
                        },
                        {
                          text: 'Tornar inativa',
                          onPress: () => {
                            dispatch(
                              Notifications.updateNotificationsRequest({
                                id: item.id,
                                status: 'inactive',
                              }),
                            );
                          },
                        },
                        {
                          text: 'Excluir',
                          onPress: () => {
                            dispatch(
                              Notifications.destroyNotificationRequest(item.id),
                            );
                          },
                        },
                        {
                          text: 'Cancelar',
                        },
                      ],
                    )
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
          onPress={() => navigation.navigate('NotificationsCreateScreen')}
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
