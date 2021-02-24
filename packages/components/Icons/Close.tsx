import * as React from 'react';
import styled, { css } from 'styled-components';

interface SvgWrapperProps {
    size?: string | number;
}

const SvgWrapper = styled.div<SvgWrapperProps>`
  display: inline-block;
  cursor: pointer;
  &:hover > svg > .icon {
    fill: darken(0.30, ${({ theme }) => theme.colors.primary});
  }
  ${({ size }) => size && `width: ${size}px;`}
`;

interface PathProps {
    closeIconType?: string;
}

const StyledPath = styled.path<PathProps>`
  fill: ${({theme}) => theme.colors.primary};
  ${({ closeIconType }) => closeIconType === 'secondary' && css`fill: rgb(153, 153, 153);`};
`;

interface CloseIconProps {
    size?: number;
    onClick?: any;
    closeIconType?: string;
};

export const CloseIcon = ({ size = 25, onClick, closeIconType }: CloseIconProps) => {
    return (
        <SvgWrapper
            size={size}
            onClick={onClick}
        >
            <svg viewBox="0 0 384 512">
                <StyledPath
                    className="icon"
                    closeIconType={closeIconType}
                    d="M323.1 441l53.9-53.9c9.4-9.4 9.4-24.5 0-33.9L279.8 256l97.2-97.2c9.4-9.4 9.4-24.5 0-33.9L323.1 71c-9.4-9.4-24.5-9.4-33.9 0L192 168.2 94.8 71c-9.4-9.4-24.5-9.4-33.9 0L7 124.9c-9.4 9.4-9.4 24.5 0 33.9l97.2 97.2L7 353.2c-9.4 9.4-9.4 24.5 0 33.9L60.9 441c9.4 9.4 24.5 9.4 33.9 0l97.2-97.2 97.2 97.2c9.3 9.3 24.5 9.3 33.9 0z"
                />
            </svg>
        </SvgWrapper>
    );
};
