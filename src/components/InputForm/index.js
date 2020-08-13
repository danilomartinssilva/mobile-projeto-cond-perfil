import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {
  Container,
  TextInput,
  ErroMessage,
  DescriptionError,
  ContainerInput,
  Label,
} from './styles';

function InputForm({style, label, messageError, ...rest}) {
  return (
    <Container style={style}>
      {label && <Label>{label}</Label>}
      <ContainerInput>
        <TextInput {...rest} />
      </ContainerInput>

      {messageError && (
        <ErroMessage>
          <DescriptionError>{messageError}</DescriptionError>
        </ErroMessage>
      )}
    </Container>
  );
}
export default forwardRef(InputForm);
