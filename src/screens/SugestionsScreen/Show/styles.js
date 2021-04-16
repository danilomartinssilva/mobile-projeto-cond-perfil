import styled from 'styled-components/native'
import {dimensions, colors, spacing} from '../../../theme'
import {fonts} from '../../../theme/fonts'
import ButtonForm from '../../../components/ButtonForm'

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`

export const Card = styled.TouchableOpacity`
  align-self: stretch;
  height: 40px;
  border-bottom-width: 0.5px;
  border-color: ${colors.gray};
  flex-direction: row;
  justify-content: flex-start;
  margin: 8px;
`
export const ContainerInfo = styled.View`
  flex-direction: column;
  margin: ${spacing.xs}px;
`
export const TitleEventText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin: 8px;
  color: ${colors.white};
  font-family: ${fonts.bold};
`
export const InfoEventText = styled.Text`
  font-size: 14px;
  margin: 4px;
  font-family: ${fonts.regular};
`
export const OptionsContainer = styled.View`
  width: ${dimensions.width / 5}px;
  align-items: center;
  justify-content: center;

  flex-direction: row;
`

export const ContainerTitle = styled.View`
  flex-direction: row;
  height: 80px;
  flex-wrap: wrap;
  align-self: stretch;
  border-bottom-width: 1px;
  border-color: white;
  align-items: center;
  padding: 8px;
`
export const InfoDescriptionContainer = styled.View`
  flex-direction: column;
  margin: 8px;
`
export const Title = styled.Text`
  font-size: 21px;
  color: white;
  font-family: ${fonts.bold};
`
export const Description = styled.Text`
  font-size: 15px;
  color: white;
  font-family: ${fonts.regular};
`
export const TButton = styled(ButtonForm)`
  margin-horizontal: 16px;
  margin-bottom: 16px;
`
