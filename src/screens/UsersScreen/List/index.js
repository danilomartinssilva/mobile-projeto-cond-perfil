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
import Users from '../../../store/modules/users'
import {getProfile} from '../../../services/helper'
import convencoes_icon from '../../../assets/icons/convencoes-ico.png'

export default function UsersListScreen ({navigation}) {
  const users = useSelector(state => state.users)
  const profile = useSelector(state => state.profile)
  const store = useStore()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Users.getAllRequest())
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Usuários ',
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
        <Image source={convencoes_icon} />
        <InfoDescriptionContainer>
          <Title>Usuários</Title>
          <Description>Gerencie os usuários abaixo</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={users.items}
        renderItem={({item, index}) => (
          <Card>
            <ContainerInfo>
              <TitleEventText>{item.name}</TitleEventText>
              <InfoEventText>Descricao:{item.name}</InfoEventText>
              <InfoEventText>Email: {item.email}</InfoEventText>
              <InfoEventText>Status: {item.status}</InfoEventText>
            </ContainerInfo>
            <OptionsContainer>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShowUserScreen', {
                    id: item.id,
                  })
                }>
                <Ionicons
                  name='document-outline'
                  size={20}
                  style={{margin: 4}}
                />
              </TouchableOpacity>
            </OptionsContainer>
          </Card>
        )}
      />
      {(getProfile(profile) === 'SINDICO' ||
        getProfile(profile) === 'MASTER') && (
        <FAB
          onPress={() => navigation.navigate('ConventionsCreateScreen')}
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
