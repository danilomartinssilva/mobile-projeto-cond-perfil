import styled from 'styled-components/native';
import {dimensions, colors, spacing} from '../../../theme';
import {fonts} from '../../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Card = styled.TouchableOpacity`
  width: ${dimensions.width}px;
  height: 100px;
  border-bottom-width: 0.5px;
  border-color: ${colors.gray};
  flex-direction: row;
  justify-content: space-between;
`;
export const ContainerInfo = styled.View`
  flex-direction: column;
  margin: ${spacing.xs}px;
`;
export const TitleEventText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.white};
  margin: 4px;
  font-family: ${fonts.bold};
`;
export const InfoEventText = styled.Text`
  font-size: 12px;
  margin: 4px;
  color: ${colors.white};
  font-family: ${fonts.regular};
`;
export const OptionsContainer = styled.View`
  width: ${dimensions.width / 5}px;
  align-items: center;
  justify-content: center;

  flex-direction: row;
`;
