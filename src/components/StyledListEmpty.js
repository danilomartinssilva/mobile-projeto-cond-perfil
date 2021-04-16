import React from 'react'
import {Caption, Subheading, Text} from 'react-native-paper'
import styled from 'styled-components/native'
import {spacing} from '../theme'

const Box = styled.View`
  margin: auto;
  align-items: center;
  width: 80%;
  justify-content: center;
`

const Picture = styled.Image.attrs({resizeMode: 'contain'})`
  margin-vertical: ${spacing.md};
`

const Title = styled(Subheading).attrs({numberOfLines: 2})`
  text-align: center;
`

const Body = styled(Caption).attrs({numberOfLines: 3})`
  margin-bottom: ${spacing.md};
  font-size: 14;
  text-align: center;
`

const Help = styled(Text).attrs({numberOfLines: 2})`
  text-align: center;
`

const StyledListEmpty = props => {
  const {image, title, body, help} = props

  return (
    <Box>
      {/*   {image && <Picture source={image} />} */}
      <Title>{title}</Title>
      {body && <Body>{body}</Body>}
      {help && <Help>{help}</Help>}
    </Box>
  )
}

export default StyledListEmpty
