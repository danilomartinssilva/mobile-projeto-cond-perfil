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

export default function PrivateNoticeNoticeCreateScreen({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const files = useSelector((state) => state.files);
  const condominiums = useSelector((state) => state.condominiums);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(Condominiums.loadCondominiumRequest());
  }, []);

  function handlePickerUsers(condominium_id) {
    const filtered = users.items.filter(
      (user) =>
        user.profiles &&
        user.profiles.condominium_id &&
        user.profiles.condominium_id === condominium_id,
    );

    return filtered;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Notificações',
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
          <Image source={convencoes_icon} />
          <InfoDescriptionContainer>
            <Title>Notificações</Title>
            <Description>Confira as notificações do seu condomínio</Description>
          </InfoDescriptionContainer>
        </ContainerTitle>
        <Formik
          onSubmit={(values) => {
            dispatch(Notifications.addNotificationRequest(values));
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('O campo título é obrigatório'),
            condominium_id: Yup.string().required(
              'O campo selecao do condomínio é obrigatório',
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
                data={pickerFilterData(
                  handlePickerUsers(props.values.condominium_id),
                  'id',
                  'name',
                )}
              />

              <TButton onPress={() => props.handleSubmit()} type="submit">
                Cadastrar
              </TButton>
            </>
          )}
        </Formik>
      </ScrollView>
    </Container>
  );
}
