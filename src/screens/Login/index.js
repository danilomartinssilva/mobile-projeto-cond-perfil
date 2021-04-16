import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Text, TouchableOpacity, Animated, Linking} from 'react-native';

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
import {dimensions} from '../../theme';
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const opacity = useState(new Animated.Value(0));
  const [visible, setVisible] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(Auth.loginRequest(email, password));
  };
  const urlSupport = 'https://www.perfilempresarial.com.br/contato/';
  const handlePress = useCallback(async () => {
    await Linking.openURL(urlSupport);
  });
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
            icon={'person'}
            onChangeText={(email) => setEmail(email)}
          />
          <TInput
            icon={visible ? 'eye-off' : 'eye'}
            onPressIcon={() => setVisible(!visible)}
            value={password}
            placeholder="Senha"
            label="Senha"
            secureTextEntry={visible}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            style={{
              width: dimensions.width / 2,
              alignSelf: 'flex-end',
              marginRight: 0,
              marginTop: -20,
            }}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <TitleEsqueceuSenha>Esqueci minha senha</TitleEsqueceuSenha>
          </TouchableOpacity>
          <ContainerButton>
            <TButton
              onPress={() => handleLogin()}
              type="submit"
              style={{margin: 8}}>
              Login
            </TButton>
            <TButton
              type="submit"
              style={{margin: 8}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              Registrar
            </TButton>
            <TButton
              iconColor={'white'}
              icon="chatbox-outline"
              type="submit"
              style={{margin: 8}}
              onPress={() => handlePress()}>
              Fale Conosco
            </TButton>
          </ContainerButton>
        </ContainerBackground>
      </Container>
    </DismissKeyboard>
  );
}
