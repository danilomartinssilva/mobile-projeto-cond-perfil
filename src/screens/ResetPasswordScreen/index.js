import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  Container,
  Title,
  TInput,
  TButton,
  ContainerButton,
  Logo,
} from './styles';
import DismissKeyboard from '../../components/DismissKeyboard';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '../../store/modules/auth';
import {navigationRef} from '../../services/RootNavigation';
import logo from '../../assets/logo.png';
import * as Yup from 'yup';

export default function ResetPasswordScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {token} = route.params;

  return (
    <DismissKeyboard>
      <Container>
        <Logo source={logo} />
        <Title>Preencha os campos abaixo</Title>
        <Formik
          validateOnChange={false}
          onSubmit={(values) => {
            dispatch(Auth.resetPasswordRequest(values.password, token));
          }}
          initialValues={{
            password: '',
            repeat_password: '',
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .required('O campo senha é obrigatório')
              .matches(
                /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                'Mínimo de nove caracteres, pelo menos uma letra maiúscula, uma maiúscula, um número e um caractere especial',
              ),
            repeat_password: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais')
              .required('O campo confirmar de senha é obrigatório'),
          })}>
          {({handleChange, values, errors, handleSubmit, setValues}) => (
            <>
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
            </>
          )}
        </Formik>
      </Container>
    </DismissKeyboard>
  );
}
