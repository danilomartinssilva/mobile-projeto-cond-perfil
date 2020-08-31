import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../theme';
const {width} = Dimensions.get('window');
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  justify-content: center;
  align-items: flex-start;
  height: 90px;

  flex-direction: column;
  padding: 10px;
`;
export const ContainerInput = styled.View`
  height: 40px;
  padding: 0px;
  flex-direction: row;
  background-color: #f0f3f4;
`;
export const TextInputWithMask = styled(TextInputMask).attrs({
  placeHolderTextColor: 'rgba(153,153,153,1)',
})`
  color: ${colors.dark};
  flex: 1;

  font-size: 15px;
  margin-left: 10px;
`;

export const TextInput = styled.TextInput.attrs({
  placeHolderTextColor: 'rgba(153,153,153,1)',
})`
  color: ${colors.dark};
  flex: 1;

  font-size: 15px;
  margin-left: 10px;
`;
export const ErroMessage = styled.View`
  align-self: flex-start;
  margin-top: 4;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
  color: ${colors.white};
`;

export const DescriptionError = styled.Text`
  font-size: 12px;
  
  /* color: ${colors.primaryMiddle}; */
  color:${colors.primaryMiddle}
`;
