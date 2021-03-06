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
import PrivateNotifications from '../../../store/modules/privatenotices';
import Condominiums from '../../../store/modules/condominiums';
import Users from '../../../store/modules/users';
import _ from 'lodash';

import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import convencoes_icon from '../../../assets/icons/convencoes-ico.png';
import StyledModalField from '../../../components/StyledModalField';
import {pickerFilterData} from '../../../services/helper';

export default function PrivateNoticeCreateScreen({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const files = useSelector((state) => state.files);
  const condominiums = useSelector((state) => state.condominiums);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(Users.getAllRequest());
  }, []);

  function handlePickerUsers() {
    const filtered = users.items.filter(
      (user) =>
        profile &&
        profile.data &&
        profile.data.id !== user.id &&
        user.profiles &&
        user.profiles.condominium_id &&
        user.profiles.condominium_id === profile.data.profiles.condominium_id,
    );

    return filtered;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Nova Mensagem',
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
              <Title>Mensagem</Title>
              <Description>Envia uma nova mensagem para um usuário</Description>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <Formik
            onSubmit={(values) => {
              const data = {
                ...values,
                condominium_id: profile.data.profiles.condominium_id,
              };
              dispatch(PrivateNotifications.addPrivateNoticeRequest(data));
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required('O campo título é obrigatório'),

              user_id: Yup.string().required(
                'O campo selecao do usuário é obrigatório',
              ),

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
                <TInput
                  messageError={props.errors.title}
                  label="Título"
                  placeholder="Titulo"
                  value={props.values.title}
                  onChangeText={props.handleChange('title')}
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
                  label="Usuário"
                  errors={props.errors.user_id}
                  placeholder="Selecione um usuário"
                  title="Selecione um usuário"
                  onChangeValue={(user_id) =>
                    props.setValues({
                      ...props.values,
                      user_id: user_id,
                    })
                  }
                  data={pickerFilterData(handlePickerUsers(), 'id', 'name')}
                />

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
