import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
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

import StyledModalField from '../../../components/StyledModalField';

import Condominiums from '../../../store/modules/condominiums';
import {pickerFilterData} from '../../../services/helper';

export default function SurveysUpdateScreen({navigation}) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const condominiums = useSelector((state) => state.condominiums);
  const survey_detail = useSelector((state) => state.surveys);

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
  if (__DEV__) console.tron.log(survey_detail?.detail?.header);
  if (survey_detail.loading) {
    return <ActivityIndicator animating />;
  } else {
    return (
      <Container>
        <ContainerBackground>
          <ContainerTitle>
            <Image source={reservas_icon} />
            <InfoDescriptionContainer>
              <Title>Enquetes</Title>
              <Description>Editar enquete:</Description>
            </InfoDescriptionContainer>
          </ContainerTitle>
          <ScrollView>
            <Formik
              onSubmit={(values) => {
                const questions = [];
                questions.push({question: values.alternative_1});
                questions.push({question: values.alternative_2});

                questions.push({question: values.alternative_3});

                questions.push({question: values.alternative_4});

                questions.push({question: values.alternative_5});

                dispatch(
                  Surveys.updateSurveysRequest({
                    ...values,
                    header: values.header,
                    condominium_id: values.condominium_id,
                    questions,
                  }),
                );
                //dispatch(Surveys.addSurveyRequest(values))
              }}
              validationSchema={Yup.object().shape({
                header: Yup.string().required(
                  'O campo descrição é obrigatório',
                ),
                alternative_1: Yup.string().required(
                  'O campo alternativa 1 é obrigatório',
                ),
                alternative_2: Yup.string().required(
                  'O campo alternativa 2 é obrigatório',
                ),
              })}
              validateOnChange={false}
              initialValues={{
                id: survey_detail?.detail?.id,
                alternative_1:
                  survey_detail?.detail?.questions.length &&
                  survey_detail?.detail?.questions[0].question,
                alternative_2:
                  survey_detail?.detail?.questions.length &&
                  survey_detail?.detail?.questions[1].question,
                alternative_3:
                  survey_detail?.detail?.questions.length &&
                  survey_detail?.detail?.questions[2]?.question,
                alternative_4:
                  (survey_detail?.detail?.questions.length &&
                    survey_detail?.detail?.questions[3]?.question) ||
                  '',
                alternative_5:
                  (survey_detail?.detail?.questions.length &&
                    survey_detail?.detail?.questions[4]?.question) ||
                  '',

                header: survey_detail?.detail?.header,
                condominium_id: survey_detail?.detail?.condominium_id,
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
                    messageError={props.errors.alternative_5}
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
}
