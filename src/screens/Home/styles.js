import styled from 'styled-components/native';
import {colors, dimensions} from '../../theme';
import {fonts} from '../../theme/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 50px;
  width: 180px;
  align-self: center;
  margin: 16px;
`;

export const ContainerItemMenuInfo = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  height: 60;
`;

export const Title = styled.Text`
  color: ${colors.white};
  margin: 16px;

  font-size: 18px;
  font-family: ${fonts.bold};

  margin-bottom: 8px;
  margin-left: 16px;
`;
export const Description = styled.Text`
  color: ${colors.white};
  margin-left: 16px;
  font-family: ${fonts.regular};

  font-size: 12px;
`;
export const Separator = styled.View`
  width: ${dimensions.width * 0.8}px;
  height: 1px;
  background-color: ${colors.white};
  margin: 20px;
`;
export const ContainerMenu = styled.View`
  flex-direction: row;
  align-self: stretch;
  height: 70px;
  margin: 16px;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${colors.white};
`;
