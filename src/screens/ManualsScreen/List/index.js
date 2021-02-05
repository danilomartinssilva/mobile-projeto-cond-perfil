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
  InfoDescriptionContainer,
  Title,
  Description,
} from './styles'
import {useSelector, useStore, useDispatch} from 'react-redux'
import Manuals from '../../../store/modules/manuals'
import {getProfile} from '../../../services/helper'
import atas_icon from '../../../assets/icons/atas-ico.png'
export default function ManualsListScreen ({navigation}) {
  const manuals = useSelector(state => state.manuals)
  const profile = useSelector(state => state.profile)
  const store = useStore()
  const dispatch = useDispatch()
  useEffect(() => {
    getProfile(profile) === 'MASTER'
      ? dispatch(Manuals.getAllRequest())
      : dispatch(Manuals.loadManualRequest())
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Manuais ',
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

  return (
    <Container>
      <ContainerTitle>
        <Image source={atas_icon} />
        <InfoDescriptionContainer>
          <Title>Manuais</Title>
          <Description>Relação dos manuais de seu condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={manuals.items}
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
                  navigation.navigate('ManualsShowScreen', {
                    id: item.id,
                  })
                }>
                <Ionicons
                  name='document-outline'
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
                          dispatch(Manuals.destroyManualRequest(item.id)),
                      },
                      {
                        text: 'Editar',
                        onPress: () =>
                          navigation.navigate('ManualsEditScreen', {
                            manual: item,
                          }),
                      },
                      {
                        text: 'Cancelar',
                      },
                    ])
                  }>
                  <Ionicons
                    name='md-settings'
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
          onPress={() => navigation.navigate('ManualsCreateScreen')}
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 50,
          }}
          small
          icon='plus'
        />
      )}
    </Container>
  )
}
