import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {
  Container,
  TInput,
  TButton,
  TError,
  Separator,
  Title,
  Description,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import Condominiums from '../../../store/modules/condominiums';
import DatePicker, {
  formatDate,
  parseDate,
} from '../../../components/DatePicker';
import {values} from 'lodash';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {getDate, format, parseISO} from 'date-fns';

export default function CondominiumsCreateScreen({navigation}) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Condominio',
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
    <Container>
      <Title>Condomínios</Title>
      <Separator />
      <Description>
        Para cadastrar um condomínio preencha os campos abaixo
      </Description>
      <Separator />
      <Formik
        onSubmit={(values) => {
          dispatch(Condominiums.AddCondominiumtRequest(values));
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('O campo descrição é obrigatório'),
        })}
        validateOnChange={false}
        initialValues={{
          name: '',
        }}>
        {(props) => (
          <>
            <TInput
              messageError={props.errors.name}
              label="Descricao"
              placeholder="Nome do Condominio"
              value={props.values.name}
              onChangeText={props.handleChange('name')}
            />

            <TButton onPress={() => props.handleSubmit()} type="submit">
              Cadastrar
            </TButton>
          </>
        )}
      </Formik>
    </Container>
  );
}
