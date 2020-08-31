import styled from 'styled-components/native';
import {dimensions, colors, spacing} from '../../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
  padding: 8px;
`;

export const Card = styled.TouchableOpacity`
  width: ${dimensions.width}px;
  height: 120px;
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
  margin: 4px;
  color: ${colors.white};
`;
export const InfoEventText = styled.Text`
  font-size: 12px;
  margin: 4px;
  color: ${colors.white};
`;
export const OptionsContainer = styled.View`
  width: ${dimensions.width / 5}px;
  align-items: center;
  justify-content: center;

  flex-direction: row;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  height: 60px;
  align-self: stretch;
  border-bottom-width: 1px;
  border-color: white;
  align-items: center;
  padding: 8px;
`;
export const InfoDescriptionContainer = styled.View`
  flex-direction: column;
  margin: 8px;
`;
export const Title = styled.Text`
  font-size: 21px;
  color: white;
`;
export const Description = styled.Text`
  font-size: 15px;
  color: white;
`;
