import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { IThemed } from '@cx/types';

interface IDivider extends IThemed {
  size?: number;
  direction?: string;
  className?: string;
}
export const VerticalDivider = styled.div<IDivider>`
  border-radius: 6px;
  border-left: 2px solid;
  height: ${({ size }) => size}px;
  margin: 0 8px;
  line-height: 28px;
`;

export const HorizontalDivider = styled.hr<IDivider>`
  border-radius: 6px;
  border-top: 2px solid;
  width: ${({ size }) => size}px;
  height: 0;
  margin: 10px 15px;
`;

export function Divider({ direction = 'vertical', ...rest }: IDivider) {
  return direction === 'vertical' ? <VerticalDivider {...rest} /> : <HorizontalDivider {...rest} />;
}

Divider.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
};
