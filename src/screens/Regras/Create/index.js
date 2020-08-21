import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {
  Container,
  TInput,
  TButton,
  TError,
  UploadContainer,
  ButtonRoundUpload,
  TUploadFile,
  TUpload,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import Regras from '../../../store/modules/regras';
import _ from 'lodash';
import DatePicker, {
  formatDate,
  parseDate,
} from '../../../components/DatePicker';
import * as DocumentPicker from 'expo-document-picker';
import {values} from 'lodash';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {getDate, format, parseISO} from 'date-fns';
import api from '../../../services/api';
import Axios from 'axios';

export default function RegrasCreateScreen({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  async function handleSelectFile(props) {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    props.setFieldValue('file', file);
    if (__DEV__) console.tron.log(props.values);
  }
  async function handleUploadFile({file}) {
    try {
      const data = {
        ...file,
        uri: file.uri,
        type: 'application/pdf',
      };

      const formData = new FormData();

      formData.append('file', data, 'arquivo.pdf');
      await api({
        url: 'files',
        method: 'POST',
        data: {...formData},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
      });

      /*  dispatch(Regras.addDocumentRequest(data)); */
    } catch (err) {
      if (__DEV__) console.tron.log(err);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Regra',
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
      <Formik
        onSubmit={(values) => {
          /*  const data = {
            ...values,
            start_date_event: format(
              new Date(parseDate(values.start_date_event)),
              'yyy-MM-dd HH:mm:ss',
            ),
          }; */

          handleUploadFile(values);

          /*  dispatch(Events.addEventRequest(data)); */
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('O campo nome é obrigatório'),
          file: Yup.string().required('O campo arquivo é obrigatório'),

          description: Yup.string().required('O campo descrição é obrigatório'),
        })}
        validateOnChange={false}
        initialValues={{
          description: '',
        }}>
        {(props) => (
          <>
            <Text>{JSON.stringify(values)}</Text>
            <TInput
              messageError={props.errors.name}
              label="Nome"
              placeholder="Regra"
              value={props.values.name}
              onChangeText={props.handleChange('name')}
            />

            <TInput
              messageError={props.errors.description}
              label="Descrição"
              placeholder="..."
              value={props.values.description}
              onChangeText={props.handleChange('description')}
            />
            <UploadContainer>
              <ButtonRoundUpload
                onPress={() => {
                  handleSelectFile(props);
                }}>
                {!!props.values.file ? (
                  <TUpload>{_.last(props.values.file.uri.split('/'))}</TUpload>
                ) : (
                  <TUpload>Selecionar arquivo</TUpload>
                )}
              </ButtonRoundUpload>
            </UploadContainer>
            {props.errors.file && <TError>{props.errors.file}</TError>}
            <TButton onPress={() => props.handleSubmit()} type="submit">
              Cadastrar
            </TButton>
          </>
        )}
      </Formik>
    </Container>
  );
}
