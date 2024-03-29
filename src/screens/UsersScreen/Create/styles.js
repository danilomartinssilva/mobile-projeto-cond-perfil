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
  font-family: ${fonts.regular};
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  height: 60px;
  align-self: stretch;
  border-bottom-width: 1px;
  border-color: white;
  align-items: center;
  padding: 8px;
  margin: 20px;
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
  font-size: 12px;
  font-style: italic;
  color: white;

  font-family: ${fonts.regular};
`;
