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
import Regras from '../../../store/modules/regras'
import {getProfile} from '../../../services/helper'
import regras_icons from '../../../assets/icons/regras-ico.png'

export default function RegrasListScreen ({navigation}) {
  const regras = useSelector(state => state.regras)
  const profile = useSelector(state => state.profile)
  const store = useStore()
  const dispatch = useDispatch()
  useEffect(() => {
    getProfile(profile) === 'MASTER'
      ? dispatch(Regras.getAllRequest())
      : dispatch(Regras.loadRegraRequest())
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Informativos do Condomínio',
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
        <Image source={regras_icons} />
        <InfoDescriptionContainer>
          <Title>Informativos</Title>
          <Description>Informativos do condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={regras.items}
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
                  navigation.navigate('RegrasShowScreen', {
                    id: item.id,
                  })
                }>
                <Ionicons
                  name='document-outline'
                  size={20}
                  style={{margin: 4, color: 'white'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Informativos', 'O que deseja fazer?', [
                    {
                      text: 'Excluir Informativo',
                      onPress: () =>
                        dispatch(Regras.destroyRegraRequest(item.id)),
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
            </OptionsContainer>
          </Card>
        )}
      />
      {getProfile(profile) === 'MASTER' && (
        <FAB
          onPress={() => navigation.navigate('RegrasCreateScreen')}
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
