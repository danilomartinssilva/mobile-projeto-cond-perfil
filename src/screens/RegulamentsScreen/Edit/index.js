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
  ContainerBackground,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import convencoes_icon from '../../../assets/icons/convencoes-ico.png';

import Regulaments from '../../../store/modules/regulaments';
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

export default function RegulamentsEditScreen({navigation, route}) {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);

  const {regulament} = route.params;

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
        Regulaments.updateRegulamentRequest({
          file_id: response.data.id,
          description: description,
          name: name,
          id: regulament.id,
          condominium_id: profile.data.profiles.condominium_id,
        }),
      );
    } catch (err) {}
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar Convenção',
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
      <ContainerBackground>
        <ScrollView>
          <ContainerTitle>
            <Image source={convencoes_icon} />
            <InfoDescriptionContainer>
              <Title>Edição de regulamento</Title>
              <Description>
                Confira os regulamentos do seu condomínio
              </Description>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Formik
            onSubmit={(values) => {
              if (!values.file_id) {
                handleUploadFile(values);
              } else {
                dispatch(
                  Regulaments.updateRegulamentRequest({
                    ...values,
                    id: regulament.id,
                  }),
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
              description: regulament.description,
              name: regulament.name,
              condominium_id: regulament.condominium_id,
              file_id: regulament.file_id,
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
                  placeholder="Convenção"
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
      </ContainerBackground>
    </Container>
  );
}
