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
import Formik from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '../../store/modules/auth';
import {navigationRef} from '../../services/RootNavigation';
import logo from '../../assets/logo.png';
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /*   useEffect(() => {
    if (auth.signed) {
      navigation.navigate('AppStack');
    }
  }, [auth]); */
  const handleLogin = () => {
    dispatch(Auth.loginRequest(email, password));
  };
  return (
    <DismissKeyboard>
      <Container>
        <Logo source={logo} />

        <TInput
          value={email}
          textContentType="emailAddress"
          autoCapitalize="none"
          placeholder="Email"
          label="Email"
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
      </Container>
    </DismissKeyboard>
  );
}
