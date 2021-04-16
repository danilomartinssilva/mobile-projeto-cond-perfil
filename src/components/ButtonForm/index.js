import React from 'react';
import {View} from 'react-native';
import {Container, Title} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function ButtonForm({
  children,
  style,
  type,
  icon,
  iconColor,
  onPressIcon,
  ...rest
}) {
  return (
    <Container type={type} style={style} {...rest}>
      {icon && (
        <Ionicons
          onPress={onPressIcon}
          name={icon}
          color={iconColor}
          style={{margin: 6}}
          size={20}
        />
      )}
      <Title type={type}>{children}</Title>
    </Container>
  );
}
