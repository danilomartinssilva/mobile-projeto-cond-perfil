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
  margin-horizontal: 16px;
`;
export const TError = styled.Text`
  font-size: 12px;
  color: ${colors.primaryMiddle};
  margin-horizontal: 16px;
  font-family: ${fonts.bold};
`;
export const UploadContainer = styled.View`
  margin-horizontal: 24px;
  margin-bottom: 16px;
  align-self: stretch;
  background-color: ${colors.white};
  border-width:.5px
  border-color:${colors.gray}
  height: 50px;
  flex-direction:row;
  align-items:center;
  justify-content:flex-start;

`;
export const ButtonRoundUpload = styled.TouchableOpacity`
  border-radius: 20px;
`;
export const TUpload = styled.Text`
  font-size: 15px;
  color: ${colors.dark};
  margin: 8px;
  font-family: ${fonts.regular};
`;
export const TUploadFile = styled.Text`
  font-size: 12px;
  color: ${colors.dark};
  margin: 8px;
  font-weight: bold;
`;

export const Title = styled.Text`
  color: ${colors.white};

  font-size: 18px;
  font-family: ${fonts.bold};
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
