import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

import {
  Container,
  Title,
  TInput,
  TButton,
  ContainerButton,
  TitleEsqueceuSenha,
  Logo,
  ContainerBackground,
} from './styles';
import DismissKeyboard from '../../components/DismissKeyboard';
import Formik from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '../../store/modules/auth';
import {navigationRef} from '../../services/RootNavigation';
import logo from '../../assets/logo.png';
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const opacity = useState(new Animated.Value(0));

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(Auth.loginRequest(email, password));
  };

  return (
    <DismissKeyboard>
      <Container>
        <ContainerBackground>
          <Logo source={logo} />
          <TInput
            value={email}
            textContentType="emailAddress"
            autoCapitalize="none"
            placeholder="Email"
            label="Email"
            secureTextEntry={false}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email)}
          />
          <TInput
            value={password}
            placeholder="Senha"
            label="Senha"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <ContainerButton>
            <TButton
              onPress={() => handleLogin()}
              type="submit"
              style={{margin: 16}}>
              Login
            </TButton>
            <TButton onPress={() => navigation.navigate('RegisterScreen')}>
              Registrar
            </TButton>
          </ContainerButton>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <TitleEsqueceuSenha>Esqueci a senha</TitleEsqueceuSenha>
          </TouchableOpacity>
        </ContainerBackground>
      </Container>
    </DismissKeyboard>
  );
}
