import styled from 'styled-components';
import { IIcon } from '@cx/types/icon';

export const IconContainer = styled.span<IIcon>`
  cursor: ${({ disabled, onClick }) => (disabled && 'not-allowed') || (onClick && 'pointer') || 'default'};
`;
