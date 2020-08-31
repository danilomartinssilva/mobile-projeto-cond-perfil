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
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import Regulaments from '../../../store/modules/regulaments';
import {getProfile} from '../../../services/helper';
import api from '../../../services/api';
import WebView from 'react-native-webview';

export default function RegulamentosShowScreen({navigation, route}) {
  const regulaments = useSelector((state) => state.regulaments);

  const dispatch = useDispatch();
  const {id} = route.params;
  useEffect(() => {
    dispatch(Regulaments.showRegulamentRequest(id));
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
      {!!regulaments.detail && !!regulaments.detail.file && (
        <PDFView
          fadeInDuration={250.0}
          style={{flex: 1}}
          resource={regulaments.detail.file.url}
          resourceType={'url'}
          onLoad={() => console.log(`PDF rendered from file`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      )}
    </Container>
  );
}
