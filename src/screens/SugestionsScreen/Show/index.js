import React, {useLayoutEffect, useEffect, useState} from 'react'
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {dimensions, colors, spacing} from '../../../theme'
import {format, parseISO} from 'date-fns'
import PDFView from 'react-native-view-pdf'

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
  Description,
  Title,
} from './styles'
import {useSelector, useStore, useDispatch} from 'react-redux'
import Sugestions from '../../../store/modules/sugestions'
import {getProfile} from '../../../services/helper'
import api from '../../../services/api'
import WebView from 'react-native-webview'

export default function SugestionShowScreen ({navigation, route}) {
  const sugestions = useSelector(state => state.sugestions)

  const dispatch = useDispatch()
  const {id} = route.params
  /*  useEffect(() => {
    dispatch(Regras.loadRegraRequest());
  }, []); */
  useEffect(() => {
    dispatch(Sugestions.ShowSugestionRequest(id))
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Visualização da Sugestão',
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
        {/*     <Image source={reservas_icon} /> */}
        <InfoDescriptionContainer>
          <Title>Mensagems</Title>
          <Description>
            Confira as reclamações e sugestões do seu condomínio
          </Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      {!!sugestions.detail && (
        <>
          <Card>
            <ContainerInfo>
              <TitleEventText>
                Nome: {sugestions.detail.user.name}
              </TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>
                Condomínio: {sugestions.detail.condominium.name}
              </TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>
                Assunto: {sugestions.detail.subject}
              </TitleEventText>
            </ContainerInfo>
          </Card>
          <Card>
            <ContainerInfo>
              <TitleEventText>
                Mensagem: {sugestions.detail.description}
              </TitleEventText>
            </ContainerInfo>
          </Card>
        </>
      )}
    </Container>
  )
}
