import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {
  Container,
  TextInput,
  ErroMessage,
  DescriptionError,
  ContainerInput,
  Label,
  TextInputWithMask,
} from './styles';

function InputFormMask({style, type, label, messageError, ...rest}) {
  return (
    <Container style={style}>
      {label && <Label>{label}</Label>}
      <ContainerInput>
        {type ? (
          <TextInputWithMask type={type} {...rest} />
        ) : (
          <TextInput {...rest} />
        )}
      </ContainerInput>

      {messageError && (
        <ErroMessage>
          <DescriptionError>{messageError}</DescriptionError>
        </ErroMessage>
      )}
    </Container>
  );
}
export default forwardRef(InputFormMask);
