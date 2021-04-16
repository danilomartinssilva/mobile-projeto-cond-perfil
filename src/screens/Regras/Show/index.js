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
import Regras from '../../../store/modules/regras';
import {getProfile} from '../../../services/helper';
import api from '../../../services/api';
import WebView from 'react-native-webview';

export default function RegrasShowScreen({navigation, route}) {
  const regras = useSelector((state) => state.regras);
  const [detail, setDetail] = useState(undefined);
  const store = useStore();
  const dispatch = useDispatch();
  /*  useEffect(() => {
    dispatch(Regras.loadRegraRequest());
  }, []); */
  useEffect(() => {
    handleShow();
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
  async function handleShow() {
    const response = await api.get(`laws/${route.params.id}`);
    setDetail(response.data);
  }
  if (__DEV__) console.tron.log(detail);

  return (
    <Container>
      {!!detail && !!detail.file && !!detail.file.id && (
        /*   <PDFView
          source={{uri: 'http://165.227.83.46:3333/files/' + detail.file.id}}
        /> */
        <PDFView
          fadeInDuration={250.0}
          style={{flex: 1}}
          resource={'http://165.227.83.46:3333/files/' + detail.file.id}
          resourceType={'url'}
          onLoad={() => console.log(`PDF rendered from file`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      )}
    </Container>
  );
}
