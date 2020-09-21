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
import atas_icon from '../../../assets/icons/atas-ico.png';
import Manuals from '../../../store/modules/manuals';

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

import StyledModalField from '../../../components/StyledModalField';
import {pickerFilterData} from '../../../services/helper';

export default function ManualsEditScreen({navigation, route}) {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);

  const {manual} = route.params;

  useEffect(() => {
    Condominiums.loadCondominiumRequest();
  }, []);
  const condominiums = useSelector((state) => state.condominiums);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar Manual',
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
          <Image source={atas_icon} />
          <InfoDescriptionContainer>
            <Title>Manual</Title>
            <Description>Editar Manuals </Description>
          </InfoDescriptionContainer>
        </ContainerTitle>
        <Formik
          onSubmit={(values) => {
            dispatch(
              Manuals.updateManualsRequest({
                description: values.description,
                name: values.name,
                id: manual.id,
                condominium_id: profile.data.profiles.condominium_id,
              }),
            );
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('O campo nome é obrigatório'),
            condominium_id: Yup.string().required(
              'O campo condomínio é obrigatório',
            ),

            description: Yup.string().required(
              'O campo descrição é obrigatório',
            ),
          })}
          validateOnChange={false}
          initialValues={{
            description: manual.description,
            name: manual.name,
            condominium_id: manual.condominium_id,
            file_id: manual.file_id,
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
