import { format, parseISO } from 'date-fns';
import React, { useEffect, useLayoutEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PDFView from 'react-native-view-pdf';
import { useDispatch, useSelector } from 'react-redux';
import Manuals from '../../../store/modules/manuals';
import { Container } from './styles';


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
      {!!manuals.detail && !!manuals.detail.file &&  (
        <>
          <PDFView
          fadeInDuration={250.0}
          style={{flex: 1}}
          resource={manuals.detail.file.url}
          resourceType={'url'}
          onLoad={() => console.log(`PDF rendered from file`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
        </>
      )}
    </Container>
  );
}
