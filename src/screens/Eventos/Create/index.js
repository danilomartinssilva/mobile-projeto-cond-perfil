import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {Container, TInput} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';

export default function EventosCreateScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Evento',
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
  return (
    <Formik>
      <Container>
        <TInput label="Descricao" />
        <TInput label="Descricao" />
      </Container>
    </Formik>
  );
}
