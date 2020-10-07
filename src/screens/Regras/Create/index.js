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
  Separator,
  Title,
  Description,
  ContainerTitle,
  InfoDescriptionContainer,
  ContainerBackground,
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
import Condominiums from '../../../store/modules/condominiums';
import StyledModalField from '../../../components/StyledModalField';
import {pickerFilterData} from '../../../services/helper';
import regras_icons from '../../../assets/icons/regras-ico.png';

export default function RegrasCreateScreen({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
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
    s;
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
        Regras.addRegraRequest({
          file_id: response.data.id,
          description: description,
          name: name,
          condominium_id,
        }),
      );
    } catch (err) {
      if (__DEV__) console.tron.log(err);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Informativo',
      headerLeft: () => (
        <MaterialIcons
          name="menu"
          size={28}
          style={{
            margin: 8,
            paddingRight: 10,
          }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, [navigation]);
  return (
    <Container>
      <ContainerBackground>
        <ContainerTitle>
          <Image source={regras_icons} />
          <InfoDescriptionContainer>
            <Title> Informativos </Title>
            <Description> Informativos do condomínio </Description>
          </InfoDescriptionContainer>
        </ContainerTitle>
        <ScrollView>
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
            })}
            validateOnChange={false}
            initialValues={{
              description: '',
            }}>
            {(props) => (
              <>
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
                <TInput
                  messageError={props.errors.name}
                  label="Nome"
                  placeholder="Informativos"
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
                      <TUpload>
                        {_.last(props.values.file.name.split('/'))}
                      </TUpload>
                    ) : (
                      <TUpload> Selecionar arquivo </TUpload>
                    )}
                  </ButtonRoundUpload>
                </UploadContainer>
                {props.errors.file && <TError> {props.errors.file} </TError>}
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
