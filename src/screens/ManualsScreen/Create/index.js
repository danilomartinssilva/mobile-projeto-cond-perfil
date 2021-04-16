import * as DocumentPicker from 'expo-document-picker';
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useLayoutEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import atas_icon from '../../../assets/icons/atas-ico.png';
import StyledModalField from '../../../components/StyledModalField';
import api from '../../../services/api';
import { pickerFilterData } from '../../../services/helper';
import Condominiums from '../../../store/modules/condominiums';
import Manuals from '../../../store/modules/manuals';
import {
  ButtonRoundUpload,
  Container,
  ContainerBackground,
  ContainerTitle,
  InfoDescriptionContainer,
  TButton,
  TError,
  TInput,
  Title,
  TUpload,
  UploadContainer
} from './styles';

export default function ManualsCreateScreen({navigation}) {
  const dispatch = useDispatch();

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
    if(file){

      props.setFieldValue('file', file);
    }
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
        Manuals.addManualRequest({
          file_id: response.data.id,
          description,
          name,
          condominium_id,
        }),
      );
    } catch (err) {
      if (__DEV__) {
        console.log(err);
      }
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Manual',
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
            <Image source={atas_icon} />
            <InfoDescriptionContainer>
              <Title>Manual do Condomínio</Title>
              {/*     <Description>Adicione as Atas do condomínio</Description> */}
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Formik
            onSubmit={(values) => {
              handleUploadFile(values);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('O campo nome é obrigatório'),
              file: Yup.string().required('O campo arquivo é obrigatório'),
              condominium_id: Yup.string().required(
                'O campo condomínio é obrigatório',
              ),

              description: Yup.string().required(
                'O campo descrição é obrigatório',
              ),
            })}
            validateOnChange={false}
            initialValues={{
              description: '',
              title: '',
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
                  label="Titulo"
                  placeholder="Nome"
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
                    {props && props.values && props.values.file && props.values.file.name  ? (
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
