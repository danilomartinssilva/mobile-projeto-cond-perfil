import React, {useLayoutEffect} from 'react';
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
  Separator,
  Title,
  Description,
  ContainerTitle,
  InfoDescriptionContainer,
  ContainerBackground,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import Conventions from '../../../store/modules/conventions';
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
import api from '../../../services/api';
import Axios from 'axios';
import convencoes_icon from '../../../assets/icons/convencoes-ico.png';
import StyledModalField from '../../../components/StyledModalField';
import Condominiums from '../../../store/modules/condominiums';

import {pickerFilterData} from '../../../services/helper';
export default function ConventionsCreateScreen({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const files = useSelector((state) => state.files);
  const condominiums = useSelector((state) => state.condominiums);

  async function handleSelectFile(props) {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    props.setFieldValue('file', file);
  }
  async function handleUploadFile({file, name, description, condominium_id}) {
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
        Conventions.addConventionRequest({
          file_id: response.data.id,
          description: description,
          name: name,
          condominium_id: condominium_id,
        }),
      );
    } catch (err) {}
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Convenção',
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
              <Title>Convenções</Title>
              <Description>Confira as convenções do seu condomínio</Description>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Formik
            onSubmit={(values) => {
              handleUploadFile(values);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('O campo nome é obrigatório'),
              file: Yup.string().required('O campo arquivo é obrigatório'),

              description: Yup.string().required(
                'O campo descrição é obrigatório',
              ),
              condominium_id: Yup.string().required(
                'O campo de condomínio é obrigatório',
              ),
            })}
            validateOnChange={false}
            initialValues={{
              description: '',
            }}>
            {(props) => (
              <>
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
                <StyledModalField
                  selectedValue={null}
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
                <UploadContainer>
                  <ButtonRoundUpload
                    onPress={() => {
                      handleSelectFile(props);
                    }}>
                    {!!props.values.file ? (
                      <TUpload>
                        {_.last(props.values.file.name.split('/'))}
                      </TUpload>
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
        </ScrollView>
      </ContainerBackground>
    </Container>
  );
}
