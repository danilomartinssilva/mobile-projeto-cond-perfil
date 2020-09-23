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
export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(Auth.confirmMailRequest(email));
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
          label="Confirme seu e-mail"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />

        <ContainerButton>
          <TButton
            onPress={() => handleLogin()}
            type="submit"
            style={{margin: 16}}>
            Enviar Solicitação
          </TButton>
        </ContainerButton>
      </Container>
    </DismissKeyboard>
  );
}
