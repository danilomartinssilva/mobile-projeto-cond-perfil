import styled from 'styled-components/native';
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
import {colors} from '../../theme';
import {fonts} from '../../theme/fonts';
export const Container = styled.TouchableOpacity`
  height: 40px;
  background: ${(props) =>
    props.type === 'submit' ? `${colors.primary}` : `${colors.white}`};
  align-self: stretch;
  justify-content: center;

  align-items: center;
  border-color: ${colors.gray};
  border-width: ${(props) => (props.type !== 'submit' ? `${0.8}px` : `1px`)};
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${fonts.bold};
  color: ${(props) =>
    props.type === 'submit' ? `${colors.white}` : '#999999'};
`;
