import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {dimensions} from '../../theme';
import ButtonForm from '../../components/ButtonForm';
import InputForm from '../../components/InputForm';
import {colors} from '../../theme';
import {fonts} from '../../theme/fonts';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  enabled: true,
  keyboardVerticalOffset: 64,
})`
  flex: 1;
  width: ${dimensions.width}px;
  justify-content: center;
  background-color: ${colors.white};
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 16px;
  line-height: 36px;
  font-family: ${fonts.bold};
`;

export const TButton = styled(ButtonForm)`
  margin-horizontal: 50px;
`;
export const TInput = styled(InputForm)`
  margin-horizontal: 16px;
`;
export const ContainerButton = styled.View`
  flex-direction: column;
`;
