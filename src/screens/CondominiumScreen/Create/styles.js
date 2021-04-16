import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {colors, dimensions} from '../../../theme';
import InputForm from '../../../components/InputForm';
import ButtonForm from '../../../components/ButtonForm';
import {fonts} from '../../../theme/fonts';
import bg from '../../../assets/bg_app.jpg';
export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 34,
})`
  flex: 1;
  background-color: ${colors.primary};
`;
export const ContainerBackground = styled.ImageBackground.attrs({
  source: bg,
})`
  flex: 1;
  width: ${dimensions.width}px;
  justify-content: center;
`;
export const TInput = styled(InputForm)`
  margin-horizontal: 16px;
`;
export const TButton = styled(ButtonForm)`
  margin-horizontal: 16px;
`;
export const TError = styled.Text`
  font-size: 12px;
  color: ${colors.primaryMiddle};
  margin-horizontal: 16px;
  font-family: ${fonts.bold};
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.bold};

  font-size: 18px;

  margin: 16px;
`;
export const Description = styled.Text`
  color: ${colors.white};
  margin-left: 16px;
  font-family: ${fonts.regular};

  font-size: 15px;
`;
export const Separator = styled.View`
  align-self: stretch;
  height: 1px;
  background-color: ${colors.white};
  margin: 20px;
`;
