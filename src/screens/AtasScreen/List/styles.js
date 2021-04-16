import styled from 'styled-components/native';
import {dimensions, colors, spacing} from '../../../theme';
import {fonts} from '../../../theme/fonts';
import bg from '../../../assets/bg_app.jpg';
export const Container = styled.ImageBackground.attrs({
  source: bg,
})`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Card = styled.TouchableOpacity`
  align-self: stretch;

  height: 120px;
  border-bottom-width: 0.5px;
  border-color: ${colors.gray};
  flex-direction: row;
  justify-content: space-between;
`;
export const ContainerInfo = styled.View`
  flex-direction: column;
  margin: ${spacing.xs}px;
  flex-wrap: wrap;
`;
export const TitleEventText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin: 4px;
  color: ${colors.blue};
  font-family: ${fonts.bold};
`;
export const InfoEventText = styled.Text`
  font-size: 12px;
  margin: 4px;
  font-family: ${fonts.regular};
  color: ${colors.blue};
`;
export const OptionsContainer = styled.View`
  width: ${dimensions.width / 5}px;
  align-items: center;
  justify-content: center;

  flex-direction: row;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  height: 70px;
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
  font-family: ${fonts.bold};
  color: ${colors.blue};
`;
export const Description = styled.Text`
  font-size: 15px;
  font-family: ${fonts.regular};
  color: ${colors.blue};
`;
