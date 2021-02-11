import * as React from 'react';
import styled, { css } from 'styled-components';
import { IContainer, IIcon, IPath } from '@cx/types/icon';

const Container = styled.div<IContainer>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ size }) => size}px;
`;

const Path = styled.path<IPath>`
  ${({
    fillColor, primary, secondary, theme,
  }) => (fillColor
      && css`
        fill: ${fillColor};
      `)
    || (primary
      && css`
        fill: ${theme.colors.primary};
      `)
    || (secondary
      && css`
        fill: ${theme.colors.secondary};
      `)};
`;

export function CheckMark({
  onClick,
  size = 25,
  fill,
  primary = false,
  secondary = false,
  className,
  disabled = false,
  ...rest
}: IIcon) {
  return (
    <Container size={size} className={className} onClick={onClick} disabled={disabled} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        version="1.1"
        viewBox="0 0 122.877 101.052"
        xmlSpace="preserve"
      >
        <Path
          d="M4.43 63.63A14.383 14.383 0 01.003 53.52a14.393 14.393 0 014.015-10.281 14.372 14.372 0 0110.106-4.425 14.373 14.373 0 0110.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 01.479-.466A14.383 14.383 0 01109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 013.662 10.412h.004l-.016.176a14.362 14.362 0 01-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 01-.372.368 14.392 14.392 0 01-9.757 3.569 14.381 14.381 0 01-9.741-4.016L4.43 63.63z"
          fillColor={fill}
          primary={primary}
          secondary={secondary}
        />
      </svg>
    </Container>
  );
}
