import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {colors} from '../../../theme';
import InputForm from '../../../components/InputForm';
import ButtonForm from '../../../components/ButtonForm';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 34,
})`
  flex: 1;
  background-color: ${colors.white};
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
`;
export const TUploadFile = styled.Text`
  font-size: 12px;
  color: ${colors.dark};
  margin: 8px;
  font-weight: bold;
`;
