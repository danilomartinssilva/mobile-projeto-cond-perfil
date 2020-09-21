import React, {useLayoutEffect, Profiler} from 'react'
import {View, Text} from 'react-native'
import {
  Container,
  TInput,
  TButton,
  TError,
  Separator,
  Title,
  Description,
} from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Formik} from 'formik'
import Sugestions from '../../../store/modules/sugestions'

import DatePicker, {formatDate, parseDate} from '../../../components/DatePicker'
import {values} from 'lodash'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {getDate, format, parseISO} from 'date-fns'

export default function SugestionsCreateScreen ({navigation}) {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Enviar sugestão',
      headerLeft: () => (
        <MaterialIcons
          name='menu'
          size={28}
          style={{margin: 8, paddingRight: 10}}
          onPress={() => navigation.openDrawer()}
        />
      ),
    })
  }, [navigation])
  return (
    <Container>
      <Title>Sugestões</Title>
      <Separator />
      <Description>Envia uma nova sugestão ou reclamação</Description>
      <Separator />
      <Formik
        onSubmit={values => {
          const data = {
            ...values,
            condominium_id: profile.data.profiles.condominium_id,
            user_id: profile.data.id,
          }
          dispatch(Sugestions.AddSugestionRequest(data))
        }}
        validationSchema={Yup.object().shape({
          subject: Yup.string().required('O campo assunto é obrigatório'),
          description: Yup.string().required('O campo descrição é obrigatório'),
        })}
        validateOnChange={false}
        initialValues={{
          subject: '',
        }}>
        {props => (
          <>
            <TInput
              messageError={props.errors.subject}
              label='Assunto'
              placeholder='Assunto'
              value={props.values.subject}
              onChangeText={props.handleChange('subject')}
            />
            <TInput
              messageError={props.errors.description}
              label='Mensagem'
              placeholder='Mensagem'
              value={props.values.description}
              onChangeText={props.handleChange('description')}
            />

            <TButton onPress={() => props.handleSubmit()} type='submit'>
              Cadastrar
            </TButton>
          </>
        )}
      </Formik>
    </Container>
  )
}
