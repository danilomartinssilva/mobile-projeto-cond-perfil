import styled from 'styled-components/native';
import {colors, spacing} from '../theme';

const StyledSearchBarGroup = styled.View`
  background-color: ${colors.primaryLight};
  width: 100%;
  height: 56;
  padding-horizontal: ${spacing.sm};
  padding-vertical: ${spacing.xs};
`;

export default StyledSearchBarGroup;
