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
import atas_icon from '../../../assets/icons/atas-ico.png';
import Minutes from '../../../store/modules/minutes';
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
import Profile from '../../../store/modules/profile';
import InputFormMask from '../../../components/InputFormMask';

export default function AccountEditScreen({navigation}) {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Meus dados',
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
            {/*   <Image source={atas_icon} /> */}
            <InfoDescriptionContainer>
              <Title>Meus dados</Title>
              <Description>Editar Perfil</Description>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Formik
            onSubmit={(values) => {
              const data = {...values, cpf: values.cpf.replace(/[.-]/g, '')};
              dispatch(Profile.updateRequest(data));
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('O campo nome é obrigatório'),
              email: Yup.string()
                .required('O campo email é obrigatório')
                .email('O campo email é inválido'),

              cpf: Yup.string().required('O campo cpf é obrigatório'),
            })}
            validateOnChange={false}
            initialValues={{
              name: profile.data.name,
              email: profile.data.email,
              cpf: profile.data.cpf,
            }}>
            {(props) => (
              <>
                <TInput
                  messageError={props.errors.name}
                  label="Nome"
                  placeholder="Nome"
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                />

                <InputFormMask
                  type={'cpf'}
                  messageError={props.errors.cpf}
                  value={props.values.cpf}
                  onChangeText={props.handleChange('cpf')}
                  label={'CPF *:'}
                  style={{marginHorizontal: 16}}
                />
                <TInput
                  messageError={props.errors.email}
                  label="Email"
                  placeholder="Email"
                  value={props.values.email}
                  onChangeText={props.handleChange('email')}
                />

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
