import React, {useRef, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Container, Title, TInput, TButton, ContainerButton} from './styles';
import DismissKeyboard from '../../components/DismissKeyboard';
import {Formik} from 'formik';
import Auth from '../../store/modules/auth/';
import Condominiums from '../../store/modules/condominiums';
import {pickerFilterData} from '../../services/helper';

import * as Yup from 'yup';
import InputFormMask from '../../components/InputFormMask';
import {values} from 'lodash';
import {useDispatch, useStore, useSelector} from 'react-redux';
import StyledModalField from '../../components/StyledModalField';
export default function RegisterScreen() {
  const useEmail = useRef();
  const usePassword = useRef();
  const useCPF = useRef();
  const usePasswordRepeat = useRef();
  const dispatch = useDispatch();
  const store = useStore();
  const condominiums = useSelector((state) => state.condominiums);
  useEffect(() => {
    dispatch(Condominiums.loadCondominiumRequest());
  }, []);
  return (
    <DismissKeyboard>
      <Container>
        <Title>Preencha os campos abaixo</Title>
        <Formik
          validateOnChange={false}
          initialValues={{
            name: '',
          }}
          onSubmit={(values) => {
            const data = {...values, cpf: values.cpf.replace(/[.-]/g, '')};
            dispatch(Auth.registerRequest(data));
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('O campo nome é obrigatório'),
            email: Yup.string()
              .required('O camo email é obrigatório')
              .email('O campo deve obdecer o formato de email'),
            cpf: Yup.string().required('O campo cpf é obrigatório'),
            condominium_id: Yup.string().required(
              'O campo condomínio é obrigatório',
            ),
            password: Yup.string().required('O campo senha é obrigatório'),
            repeat_password: Yup.string().required(
              'O campo confirmacao de senha é obrigatório',
            ),
          })}>
          {({handleChange, values, errors, handleSubmit, setValues}) => (
            <ScrollView>
              <TInput
                label="Nome"
                onChangeText={handleChange('name')}
                keyboardType={'default'}
                placeholder="Nome *"
                messageError={errors.name}
                autoCorrect={false}
                autoCapitalize={'none'}
                value={values.name}
              />
              <TInput
                messageError={errors.username}
                autoCapitalize="none"
                autoCompleteType="username"
                onChangeText={handleChange('username')}
                placeholder="Username"
                label="Username *"
              />
              <TInput
                ref={useEmail}
                messageError={errors.email}
                autoCapitalize="none"
                autoCompleteType="email"
                onChangeText={handleChange('email')}
                placeholder="Email"
                label="Email *"
                keyboardType="email-address"
              />
              {/*   <InputFormMask
                messageError={errors.cpf}
                onChangeText={handleChange('cpf')}
                placeholder="CPF"
                label="CPF *"
                style={{marginHorizontal: 16}}
              /> */}
              <StyledModalField
                selectedValue={null}
                label="Condomínio"
                errors={errors.condominium_id}
                placeholder="Selecione um condomínio"
                title="Selecione um condomínio"
                onChangeValue={(condominium_id) =>
                  setValues({...values, condominium_id: condominium_id})
                }
                data={pickerFilterData(condominiums.items, 'id', 'name')}
              />

              <InputFormMask
                type={'cpf'}
                messageError={errors?.cpf}
                value={values.cpf}
                onChangeText={handleChange('cpf')}
                label={'CPF *:'}
                style={{marginHorizontal: 16}}
              />
              <TInput
                secureTextEntry
                placeholder="Senha"
                label="Senha *"
                messageError={errors.password}
                onChangeText={handleChange('password')}
              />
              <TInput
                secureTextEntry
                placeholder="Confirmar Senha"
                label="Confirmar Senha *"
                onChangeText={handleChange('repeat_password')}
                messageError={errors.repeat_password}
              />

              <ContainerButton>
                <TButton
                  onPress={() => {
                    handleSubmit();
                  }}
                  type="submit"
                  style={{margin: 16}}>
                  Cadastrar
                </TButton>
              </ContainerButton>
            </ScrollView>
          )}
        </Formik>
      </Container>
    </DismissKeyboard>
  );
}
