import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { IconProps } from '../../wfm/index.types';

interface ContainerProps {
  size?: number;
  disabled?: boolean;
  direction?: string;
}
const Container = styled.div<ContainerProps>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ size }) => size}px;

  svg {
    ${({ direction }) =>
      direction === 'left' &&
      css`
        transform: rotate(180deg);
      `};
  }
`;
interface PathProps {
  fillColor?: string;
  strokeColor?: string;
  primary?: boolean;
  secondary?: boolean;
}
const Path1 = styled.path<PathProps>`
  ${({ strokeColor, primary, secondary, theme }) =>
    (strokeColor &&
      css`
        stroke: ${strokeColor};
      `) ||
    (primary &&
      css`
        stroke: ${theme.colors.primary};
      `) ||
    (secondary &&
      css`
        stroke: ${theme.colors.secondary};
      `)};
`;
const Path2 = styled.path<PathProps>`
  ${({ fillColor, primary, secondary, theme }) =>
    (fillColor &&
      css`
        fill: ${fillColor};
      `) ||
    (primary &&
      css`
        fill: ${theme.colors.primary};
      `) ||
    (secondary &&
      css`
        fill: ${theme.colors.secondary};
      `)};
`;

interface IconProps2 extends IconProps {
  direction: string;
}
export function Play({
  onClick,
  size = 25,
  direction = 'right',
  fill,
  primary = false,
  secondary = false,
  className,
  disabled = false,
  ...rest
}: IconProps2) {
  return (
    <Container
      size={size}
      className={className}
      onClick={onClick}
      direction={direction}
      disabled={disabled}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0"
        y="0"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
      >
        <Path1
          d="M74.026 88H25.974C18.256 88 12 81.744 12 74.026V25.974C12 18.256 18.256 12 25.974 12h48.052C81.744 12 88 18.256 88 25.974v48.052C88 81.744 81.744 88 74.026 88z"
          strokeMiterlimit="10"
          fill="#fff"
          strokeWidth="8"
          strokeColor={fill}
          primary={primary}
          secondary={secondary}
        />
        <Path2
          d="M73.265 51.254l-35.594 20.55A1.447 1.447 0 0 1 35.5 70.55v-41.1a1.448 1.448 0 0 1 2.171-1.254l35.594 20.55c.965.558.965 1.95 0 2.508z"
          fillColor={fill}
          primary={primary}
          secondary={secondary}
          direction={direction}
        />
      </svg>
    </Container>
  );
}

Play.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.number,
  fill: PropTypes.string,
  direction: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
};
