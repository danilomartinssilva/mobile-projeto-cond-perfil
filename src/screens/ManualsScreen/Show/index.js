import React, {useLayoutEffect, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {dimensions, colors, spacing} from '../../../theme';
import {format, parseISO} from 'date-fns';
import PDFView from 'react-native-view-pdf';

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
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import Manuals from '../../../store/modules/manuals';
import {getProfile} from '../../../services/helper';
import api from '../../../services/api';
import WebView from 'react-native-webview';

export default function ManualsShowScreen({navigation, route}) {
  const manuals = useSelector((state) => state.manuals);

  const dispatch = useDispatch();
  const {id} = route.params;
  useEffect(() => {
    dispatch(Manuals.showManualRequest(id));
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Visualização de Documento',
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
      {!!manuals.detail && (
        <>
          <ContainerTitle>
            <InfoDescriptionContainer>
              <Title>Manuais</Title>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Card>
            <ContainerInfo>
              <TitleEventText>Nome: {manuals.detail.name}</TitleEventText>
              <TitleEventText>
                Descricao: {manuals.detail.description}
              </TitleEventText>
            </ContainerInfo>
          </Card>
        </>
      )}
    </Container>
  );
}
