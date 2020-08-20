import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
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
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import Events from '../../../store/modules/eventos';
import {getProfile} from '../../../services/helper';

export default function EventosListScreen({navigation}) {
  const events = useSelector((state) => state.events);
  const profile = useSelector((state) => state.profile);
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !store.getState().events ||
      !store.getState().events.items ||
      !store.getState().events.items.length
    ) {
      dispatch(Events.loadEventRequest());
    }
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Eventos',
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
  function renderStatusItem(item) {
    if (item.status === 'waiting') {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Aprovacao de evento', 'Deseja aprovar este evento', [
              {
                text: 'Sim, aprovar',
                onPress: () => {
                  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'approved',
                    }),
                  );
                },
              },
              {
                text: 'Nao, alterar',
                onPress: () => {},
              },
              {
                text: 'Cancelar Evento',
                onPress: () => {
                  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  );
                },
              },
            ]);
          }}>
          <FeatherIcon name="clock" size={20} style={{margin: 4}} />
        </TouchableOpacity>
      );
    } else if (item.status === 'approved') {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Cancelar Evento', 'Deseja cancelar este evento', [
              {
                text: 'Sim, cancelar',
                onPress: () => {
                  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  );
                },
              },
              {
                text: 'Nao, alterar',
                onPress: () => {},
              },
              {
                text: 'Cancelar Evento',
                onPress: () => {
                  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  );
                },
              },
            ]);
          }}>
          <FeatherIcon name="check-circle" size={20} style={{margin: 4}} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Aprovar Evento', 'Deseja aprovar este evento', [
              {
                text: 'Sim, cancelar',
                onPress: () => {
                  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'approved',
                    }),
                  );
                },
              },
              {
                text: 'Nao, alterar',
                onPress: () => {},
              },
              {
                text: 'Aprovar Evento',
                onPress: () => {
                  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  );
                },
              },
            ]);
          }}>
          <FeatherIcon name="x-circle" size={20} style={{margin: 4}} />
        </TouchableOpacity>
      );
    }
  }

  return (
    <Container>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={events.items}
        renderItem={({item, index}) => (
          <Card>
            <ContainerInfo>
              <TitleEventText>{item.description}</TitleEventText>
              <InfoEventText>
                Data:{formatDate(item.start_date_event)}
              </InfoEventText>
              <InfoEventText>Ambiente:{item.ambient}</InfoEventText>
              {(getProfile(profile) === 'SINDICO' ||
                getProfile(profile) === 'MASTER') && (
                <InfoEventText>Morador: {item.user.name}</InfoEventText>
              )}

              <InfoEventText>Status:{item.status}</InfoEventText>
            </ContainerInfo>
            <OptionsContainer>
              {(getProfile(profile) === 'SINDICO' ||
                getProfile(profile) === 'MASTER') && (
                <>{renderStatusItem(item)}</>
              )}
              {/* {item.status === 'waiting' ? (
                <TouchableOpacity onPress = {()=>{
                  dispatch(Events.updateEventRequest({...item,status:"approved"}))
                }}>
                  <FeatherIcon name="circle" size={20} style={{margin: 4}} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress = {()=>{
                  dispatch(Events.updateEventRequest({...item,status:"approved"}))
                }}>
                  <FeatherIcon
                    name="check-circle"
                    size={20}
                    style={{margin: 4}}
                  /> */}

              <TouchableOpacity>
                <Ionicons name="search" size={20} style={{margin: 4}} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="ios-trash"
                  onPress={() => {
                    Alert.alert(
                      'Remover agendamento',
                      'Tem certeza que deseja remover este agendamento?',
                      [
                        {
                          text: 'Sim',
                          onPress: () => {
                            dispatch(Events.destroyEventRequest(item.id));
                          },
                        },
                        {
                          text: 'Cancelar',
                          onPress: () => {},
                        },
                      ],
                    );
                  }}
                  size={20}
                  style={{margin: 4}}
                />
              </TouchableOpacity>
            </OptionsContainer>
          </Card>
        )}
      />
      <FAB
        onPress={() => navigation.navigate('EventosCreateScreen')}
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
