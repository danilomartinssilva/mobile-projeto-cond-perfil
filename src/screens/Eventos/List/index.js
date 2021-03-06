import React, {useLayoutEffect, useEffect} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {dimensions, colors, spacing} from '../../../theme'
import {format, parseISO} from 'date-fns'
import {FAB} from 'react-native-paper'
import {
  Container,
  Card,
  ContainerInfo,
  TitleEventText,
  InfoEventText,
  OptionsContainer,
  ContainerTitle,
  Title,
  InfoDescriptionContainer,
  Description,
} from './styles'
import {useSelector, useStore, useDispatch} from 'react-redux'
import Events from '../../../store/modules/eventos'
import {getProfile} from '../../../services/helper'
import reservas_icon from '../../../assets/icons/reservas-ico.png'

export default function EventosListScreen ({navigation}) {
  const events = useSelector(state => state.events)
  const profile = useSelector(state => state.profile)
  const store = useStore()

  const dispatch = useDispatch()
  useEffect(() => {
    if (
      !store.getState().events ||
      !store.getState().events.items ||
      !store.getState().events.items.length
    ) {
      dispatch(Events.loadEventRequest())
    }
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Reservas',
      headerLeft: () => (
        <MaterialIcons
          name='menu'
          size={28}
          style={{margin: 8, paddingRight: 10}}
          onPress={() => navigation.openDrawer()}
        />
      ),
    })
  }, [navigation])
  function formatDate (date) {
    let convertDate = format(parseISO(date), 'd-MM-yyyy')
    return convertDate
  }
  function renderStatusItem (item) {
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Eventos', 'O que deseja fazer?', [
            {
              text: 'Aprovar Evento',
              onPress: () => {
                dispatch(
                  Events.updateEventRequest({
                    id: item.id,
                    status: 'approved',
                  }),
                )
              },
            },
            {
              text: 'Excluir Evento',
              onPress: () => {
                dispatch(Events.destroyEventRequest(item.id))
              },
            },
            {
              text: 'Cancelar Evento',
              onPress: () => {
                dispatch(
                  Events.updateEventRequest({
                    id: item.id,
                    status: 'cancelled',
                  }),
                )
              },
            },
            {
              text: 'Modificar para aguardando',
              onPress: () => {
                dispatch(
                  Events.updateEventRequest({
                    id: item.id,
                    status: 'waiting',
                  }),
                )
              },
            },
            {
              text: 'Sair',
              onPress: () => {},
            },
          ])
        }}>
        <FeatherIcon
          name={
            item.status === 'waiting'
              ? 'clock'
              : item.status == 'cancelled'
              ? 'x-circle'
              : 'check-circle'
          }
          size={20}
          style={{margin: 4, color: colors.white}}
        />
      </TouchableOpacity>
    )
  }

  return (
    <Container>
      <ContainerTitle>
        <Image source={reservas_icon} />
        <InfoDescriptionContainer>
          <Title>Reservas</Title>
          <Description>Confira as reservas do seu condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
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

              <InfoEventText>Status: {item.status}</InfoEventText>
            </ContainerInfo>
            <OptionsContainer>
              {getProfile(profile) === 'MASTER' ? (
                <>{renderStatusItem(item)}</>
              ) : (
                <FeatherIcon
                  name={
                    item.status === 'waiting'
                      ? 'clock'
                      : item.status == 'cancelled'
                      ? 'x-circle'
                      : 'check-circle'
                  }
                  size={20}
                  style={{color: colors.white}}
                />
              )}

              <TouchableOpacity>
                <Ionicons
                  name='ios-trash'
                  onPress={() => {
                    Alert.alert(
                      'Remover agendamento',
                      'Tem certeza que deseja remover este agendamento?',
                      [
                        {
                          text: 'Sim',
                          onPress: () => {
                            dispatch(Events.destroyEventRequest(item.id))
                          },
                        },
                        {
                          text: 'Cancelar',
                          onPress: () => {},
                        },
                      ],
                    )
                  }}
                  size={20}
                  style={{color: colors.white}}
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
        icon='plus'
      />
    </Container>
  )
}
