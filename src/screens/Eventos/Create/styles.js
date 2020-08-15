import styled from 'styled-components/native'
import {Platform} from 'react-native'
import {colors} from '../../../theme'
import InputForm from '../../../components/InputForm'
import ButtonForm from '../../../components/ButtonForm'

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 34,
})`
  flex: 1;
  background-color: ${colors.white};
`
export const TInput = styled(InputForm)`
  margin-horizontal: 16px;
`
export const TButton = styled(ButtonForm)`
  margin-horizontal: 16px;
`
