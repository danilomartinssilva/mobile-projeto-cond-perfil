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

import _ from 'lodash';

import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import convencoes_icon from '../../../assets/icons/convencoes-ico.png';
import StyledModalField from '../../../components/StyledModalField';
import {pickerFilterData} from '../../../services/helper';
export default function NoticeCreateScreen({navigation}) {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const files = useSelector((state) => state.files);
  const condominiums = useSelector((state) => state.condominiums);

  useEffect(() => {
    dispatch(Condominiums.loadCondominiumRequest());
  }, []);

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
