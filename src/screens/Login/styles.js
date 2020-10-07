import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {dimensions} from '../../theme';
import ButtonForm from '../../components/ButtonForm';
import InputForm from '../../components/InputForm';
import {colors} from '../../theme';
import {fonts} from '../../theme/fonts';
import bg from '../../assets/bg_app.jpg';
export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  enabled: true,
  keyboardVerticalOffset: 64,
})`
  flex: 1;
  width: ${dimensions.width}px;
  justify-content: center;
  background-color: ${colors.primary};
`;
export const ContainerBackground = styled.ImageBackground.attrs({
  source: bg,
})`
  flex: 1;
  width: ${dimensions.width}px;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 16px;
  line-height: 36px;
  color: ${colors.white};
  font-family: ${fonts.bold};
`;
export const TitleEsqueceuSenha = styled.Text`
  font-size: 14px;

  margin-top: 16px;

  color: ${colors.white};
  text-decoration: underline white;
  align-self: center;
  font-family: ${fonts.light};
`;

export const TButton = styled(ButtonForm)`
  margin-horizontal: 24px;
`;
export const TInput = styled(InputForm)`
  margin-horizontal: 16px;
`;
export const ContainerButton = styled.View`
  flex-direction: column;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 50px;
  width: 180px;
  align-self: center;
  margin: 16px;
`;
