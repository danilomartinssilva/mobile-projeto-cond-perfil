import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {
  Container,
  TInput,
  TButton,
  TError,
  UploadContainer,
  ButtonRoundUpload,
  TUploadFile,
  TUpload,
  Title,
  Description,
  ContainerTitle,
  InfoDescriptionContainer,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import balances_icon from '../../../assets/icons/balancos-ico.png';
import Balances from '../../../store/modules/balances';
import Files from '../../../store/modules/files';
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
import Condominiums from '../../../store/modules/condominiums';
import api from '../../../services/api';
import Axios from 'axios';
import StyledModalField from '../../../components/StyledModalField';
import {pickerFilterData} from '../../../services/helper';

export default function BalancesEditScreen({navigation, route}) {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);

  const {balance} = route.params;

  useEffect(() => {
    Condominiums.loadCondominiumRequest();
  }, []);
  const condominiums = useSelector((state) => state.condominiums);

  async function handleSelectFile(props) {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    props.setFieldValue('file', file);
  }
  async function handleUploadFile({file, name, description}) {
    try {
      const data = {
        ...file,
        uri: file.uri,
        type: 'application/pdf',
      };
      const formData = new FormData();
      formData.append('file', data, 'arquivo.pdf');
      const response = await api({
        url: 'files',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;',
        },
      });

      dispatch(
        Balances.updateBalancesRequest({
          file_id: response.data.id,
          description: description,
          name: name,
          id: balance.id,
          condominium_id: profile.data.profiles.condominium_id,
        }),
      );
    } catch (err) {}
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar Balanço',
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
      <ScrollView>
        <ContainerTitle>
          <Image source={balances_icon} />
          <InfoDescriptionContainer>
            <Title>Balanços</Title>
            <Description>Prestação de Contas</Description>
          </InfoDescriptionContainer>
        </ContainerTitle>
        <Formik
          onSubmit={(values) => {
            if (!values.file_id) {
              handleUploadFile(values);
            } else {
              dispatch(
                Balances.updateBalancesRequest({...values, id: balance.id}),
              );
            }
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('O campo nome é obrigatório'),
            file: Yup.string().when('file_id', {
              is: false,
              then: Yup.string().required('O campo arquivo é obrigatório'),
            }),

            description: Yup.string().required(
              'O campo descrição é obrigatório',
            ),
          })}
          validateOnChange={false}
          initialValues={{
            description: balance.description,
            name: balance.name,
            condominium_id: balance.condominium_id,
            file_id: balance.file_id,
          }}>
          {(props) => (
            <>
              <StyledModalField
                selectedValue={props.values.condominium_id}
                label="Condomínio"
                errors={props.errors.condominium_id}
                placeholder="Selecione um condomínio"
                title="Selecione um condomínio"
                onChangeValue={(condominium_id) =>
                  props.setValues({
                    ...props.values,
                    condominium_id: condominium_id,
                  })
                }
                data={pickerFilterData(condominiums.items, 'id', 'name')}
              />

              <TInput
                messageError={props.errors.name}
                label="Nome"
                placeholder="Regulamento"
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
                  <>
                    {props.values.file ? (
                      <TUpload>
                        {_.last(props.values.file.name.split('/'))}
                      </TUpload>
                    ) : props.values.file_id ? (
                      <TUpload>1 arquivo selecionado</TUpload>
                    ) : (
                      <TUpload>Selecionar arquivo</TUpload>
                    )}
                  </>
                </ButtonRoundUpload>
              </UploadContainer>
              {props.errors.file && <TError>{props.errors.file}</TError>}
              <TButton onPress={() => props.handleSubmit()} type="submit">
                Salvar
              </TButton>
            </>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
}
