import React, {useLayoutEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {
  Container,
  TInput,
  TButton,
  TError,
  Title,
  Description,
  Separator,
  ContainerTitle,
  InfoDescriptionContainer,
  ContainerBackground,
} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import Events from '../../../store/modules/eventos';
import reservas_icon from '../../../assets/icons/reservas-ico.png';

import DatePicker, {
  formatDate,
  parseDate,
} from '../../../components/DatePicker';
import {values} from 'lodash';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {getDate, format, parseISO} from 'date-fns';

export default function EventosCreateScreen({navigation}) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Reserva',
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
        <ContainerTitle>
          <Image source={reservas_icon} />
          <InfoDescriptionContainer>
            <Title>Reservas</Title>
            <Description>Adicione uma nova reserva</Description>
          </InfoDescriptionContainer>
        </ContainerTitle>

        <Formik
          onSubmit={(values) => {
            const data = {
              ...values,
              start_date_event: format(
                new Date(parseDate(values.start_date_event)),
                'yyy-MM-dd HH:mm:ss',
              ),
            };
            dispatch(Events.addEventRequest(data));
          }}
          validationSchema={Yup.object().shape({
            description: Yup.string().required(
              'O campo descrição é obrigatório',
            ),
            ambient: Yup.string().required('O campo ambiente é obrigatório'),
            start_date_event: Yup.string().required(
              'O campo data do evento é obrigatório',
            ),
          })}
          validateOnChange={false}
          initialValues={{
            description: '',
          }}>
          {(props) => (
            <>
              <Text>{JSON.stringify(values)}</Text>
              <TInput
                messageError={props.errors.description}
                label="Descricao"
                placeholder="Nome do Evento"
                value={props.values.description}
                onChangeText={props.handleChange('description')}
              />
              <TInput
                messageError={props.errors.ambient}
                label="Ambiente"
                placeholder="Piscina, Quadra"
                value={props.values.ambient}
                onChangeText={props.handleChange('ambient')}
              />
              <DatePicker
                style={{marginHorizontal: 16}}
                label={'Data do evento'}
                value={props.values.start_date_event}
                error={props.errors && props.errors.start_date_event}
                minimumDate={new Date()}
                enabled={true}
                change={true}
                onChangeText={(val) => {
                  props.setValues({
                    ...props.values,
                    start_date_event: formatDate(val),
                  });
                }}
              />
              {props.errors.start_date_event && (
                <TError>{props.errors.start_date_event}</TError>
              )}
              <TButton onPress={() => props.handleSubmit()}>Cadastrar</TButton>
            </>
          )}
        </Formik>
      </ContainerBackground>
    </Container>
  );
}
