import React from 'react';
import {View, Text} from 'react-native';
import {Container, Title, TInput, TButton, ContainerButton} from './styles';
import DismissKeyboard from '../../components/DismissKeyboard';
import Formik from 'formik';
export default function AgendaScreen() {
  return (
    <DismissKeyboard>
      <Container>
        <Title>Cadastrar Evento</Title>

        <TInput placeholder="Evento" label="Nome" />
        <TInput placeholder="Data de realização" label="Email" />
        <TInput placeholder="03:00" label="Duração" />
        <TInput placeholder="Ambiente " label="Ambiente" />
        <ContainerButton>
          <TButton onPress={() => {}} type="submit" style={{margin: 16}}>
            Cadastrar
          </TButton>
        </ContainerButton>
      </Container>
    </DismissKeyboard>
  );
}
