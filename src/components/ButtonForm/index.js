import React from 'react';
import {View} from 'react-native';
import {Container, Title} from './styles';

export default function ButtonForm({children, style, type, ...rest}) {
  return (
    <Container type={type} style={style} {...rest}>
      <Title type={type}>{children}</Title>
    </Container>
  );
}
