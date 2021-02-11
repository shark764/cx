import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div`
  margin: 50px;
`;
const Wrapper = styled.div`
  height: 20px;
  background-color: #e0e0de;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50px;
`;
interface FillerProps {
  completed: number;
  bgColor?: string;
  primary?: boolean;
  secondary?: boolean;
}
const Filler = styled.div<FillerProps>`
  height: 100%;
  width: ${({ completed }) => completed}%;
  background-color: ${({ theme }) => theme.colors.brand};
  transition: width 1s ease-in-out;
  border-radius: inherit;
  text-align: right;

  ${({
    bgColor, primary, secondary, theme,
  }) => (bgColor
      && css`
        background-color: ${bgColor};
      `)
    || (primary
      && css`
        background-color: ${theme.colors.primary};
      `)
    || (secondary
      && css`
        background-color: ${theme.colors.secondary};
      `)};
`;
const Caption = styled.span`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 15px;
`;
const Label = styled.span`
  padding: 5px;
  color: white;
  font-weight: bold;
`;

interface ProgressBarProps {
  children?: React.ReactNode;
  completed?: number;
  bgColor?: string;
  primary?: boolean;
  secondary?: boolean;
  label?: string;
  caption?: string;
}
export function ProgressBar({
  completed = 0,
  bgColor,
  primary = false,
  secondary = false,
  label,
  caption,
  children,
}: ProgressBarProps) {
  return (
    <Container>
      <Caption>{caption}</Caption>
      <Wrapper>
        <Filler completed={completed} bgColor={bgColor} primary={primary} secondary={secondary}>
          <Label>
            {label || `${completed}%`}
            {children}
          </Label>
        </Filler>
      </Wrapper>
    </Container>
  );
}

ProgressBar.propTypes = {
  children: PropTypes.node,
  completed: PropTypes.number,
  bgColor: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  label: PropTypes.string,
  caption: PropTypes.string,
};
