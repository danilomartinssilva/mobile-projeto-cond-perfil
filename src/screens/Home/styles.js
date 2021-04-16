import styled from 'styled-components/native'
import {colors, dimensions} from '../../theme'
import {fonts} from '../../theme/fonts'
import bg from '../../assets/bg_app.jpg'

export const Container = styled.ImageBackground.attrs({
  source: bg,
})`
  flex: 1;

  justify-content: flex-start;
  padding-horizontal: 8px;
  align-items: flex-end
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-vertical:16px;
`

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 50px;
  width: 180px;
  align-self: center;
  margin: 16px;
`

export const ContainerItemMenuInfo = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  height: 60;
`

export const Title = styled.Text`
  color: ${colors.white};
  margin: 16px;

  font-size: 18px;
  font-family: ${fonts.bold};

  margin-bottom: 8px;
  margin-left: 16px;
`
export const Description = styled.Text`
  color: ${colors.white};
  margin-left: 16px;
  font-family: ${fonts.regular};

  font-size: 12px;
`
export const Separator = styled.View`
  width: ${dimensions.width * 0.8}px;
  height: 1px;
  background-color: ${colors.white};
  margin: 20px;
`

export const Button = styled.TouchableOpacity`
  height: 100px;

  width: ${dimensions.width / 3.5}px;

  margin: 4px;
  align-items: center;
  justify-content: center;
`
