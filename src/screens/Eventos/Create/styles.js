import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {colors} from '../../../theme';
import InputForm from '../../../components/InputForm';
import ButtonForm from '../../../components/ButtonForm';
import {fonts} from '../../../theme/fonts';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 34,
})`
  flex: 1;

  background-color: ${colors.primary};
`;
export const TInput = styled(InputForm)`
  margin-horizontal: 16px;
`;
export const TButton = styled(ButtonForm)`
  margin-horizontal: 24px;
  margin-top: 16px;
`;
export const TError = styled.Text`
  font-size: 12px;
  color: ${colors.primaryMiddle};
  margin-horizontal: 16px;
`;

export const Separator = styled.View`
  align-self: stretch;
  height: 1px;
  background-color: ${colors.white};
  margin: 20px;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  height: 60px;
  align-self: stretch;
  border-bottom-width: 1px;
  border-color: white;
  align-items: center;
  padding: 8px;
  font-family: ${fonts.bold};
`;
export const InfoDescriptionContainer = styled.View`
  flex-direction: column;
  margin: 8px;
`;
export const Title = styled.Text`
  font-size: 21px;
  color: white;
  font-family: ${fonts.bold};
`;
export const Description = styled.Text`
  font-size: 15px;
  color: white;
  font-family: ${fonts.regular};
`;
