import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
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
import Surveys from '../../../store/modules/surveys';
import reservas_icon from '../../../assets/icons/reservas-ico.png';

import DatePicker, {
  formatDate,
  parseDate,
} from '../../../components/DatePicker';
import {values} from 'lodash';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {getDate, format, parseISO} from 'date-fns';
import StyledModalField from '../../../components/StyledModalField';

import Condominiums from '../../../store/modules/condominiums';
import {pickerFilterData} from '../../../services/helper';

export default function SurveysCreateScreen({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const condominiums = useSelector((state) => state.condominiums);

  useEffect(() => {
    dispatch(Condominiums.loadCondominiumRequest());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Adicionar Enquete',
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
            <Title>Enquetes</Title>
            <Description>Cadastre aqui as enquetes:</Description>
          </InfoDescriptionContainer>
        </ContainerTitle>
        <ScrollView>
          <Formik
            onSubmit={(values) => {
              const questions = [];
              questions.push({question: values.alternative_1});
              questions.push({question: values.alternative_2});
              if (
                String(values.alternative_3).trim() &&
                String(values.alternative_3).length >= 2
              ) {
                questions.push({question: values.alternative_3});
              }
              if (
                String(values.alternative_4).trim() &&
                String(values.alternative_4).length >= 2
              ) {
                questions.push({question: values.alternative_4});
              }
              if (
                String(values.alternative_5).trim() &&
                String(values.alternative_5).length >= 2
              ) {
                questions.push({question: values.alternative_5});
              }
              dispatch(
                Surveys.addSurveyRequest({
                  header: values.header,
                  condominium_id: values.condominium_id,
                  questions: questions,
                }),
              );
              //dispatch(Surveys.addSurveyRequest(values))
            }}
            validationSchema={Yup.object().shape({
              header: Yup.string().required('O campo descrição é obrigatório'),
              alternative_1: Yup.string().required(
                'O campo alternativa 1 é obrigatório',
              ),
              alternative_2: Yup.string().required(
                'O campo alternativa 2 é obrigatório',
              ),
            })}
            validateOnChange={false}
            initialValues={{
              header: '',
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
                  messageError={props.errors.header}
                  label="Pergunta"
                  placeholder="Pergunta"
                  value={props.values.header}
                  onChangeText={props.handleChange('header')}
                />
                <TInput
                  messageError={props.errors.alternative_1}
                  label="* Alternativa 1"
                  placeholder="Alternativa 1"
                  value={props.values.alternative_1}
                  onChangeText={props.handleChange('alternative_1')}
                />
                <TInput
                  messageError={props.errors.alternative_2}
                  label="* Alternativa 2"
                  placeholder="Alternativa 2"
                  value={props.values.alternative_2}
                  onChangeText={props.handleChange('alternative_2')}
                />
                <TInput
                  messageError={props.errors.alternative_3}
                  label=" Alternativa 3"
                  placeholder="Alternativa 3"
                  value={props.values.alternative_3}
                  onChangeText={props.handleChange('alternative_3')}
                />
                <TInput
                  messageError={props.errors.alternative_4}
                  label=" Alternativa 4"
                  placeholder="Alternativa 4"
                  value={props.values.alternative_4}
                  onChangeText={props.handleChange('alternative_4')}
                />
                <TInput
                  messageError={props.errors.alternative_3}
                  label=" Alternativa 5"
                  placeholder="Alternativa 5"
                  value={props.values.alternative_5}
                  onChangeText={props.handleChange('alternative_5')}
                />

                <TButton type="submit" onPress={() => props.handleSubmit()}>
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
