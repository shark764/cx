import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  outline: none;
`;
interface TooltipTipProps {
  direction: string;
}
const TooltipTip = styled.div<TooltipTipProps>`
  --tooltip-text-color: black;
  --tooltip-background-color: ${({ theme }) => theme.colors['accent-3']};
  --tooltip-margin: 30px;
  --tooltip-arrow-size: 6px;

  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px;
  color: var(--tooltip-text-color);
  background: var(--tooltip-background-color);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1;
  z-index: 100;
  white-space: nowrap;

  &:before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: var(--tooltip-arrow-size);
    margin-left: calc(var(--tooltip-arrow-size) * -1);
  }

  ${({ direction }) => (direction === 'top'
      && css`
        top: calc(var(--tooltip-margin) * -1);
        &:before {
          top: 100%;
          border-top-color: var(--tooltip-background-color);
        }
      `)
    || (direction === 'right'
      && css`
        left: calc(100% + var(--tooltip-margin));
        top: 50%;
        transform: translateX(0) translateY(-50%);
        &:before {
          left: calc(var(--tooltip-arrow-size) * -1);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-right-color: var(--tooltip-background-color);
        }
      `)
    || (direction === 'bottom'
      && css`
        bottom: calc(var(--tooltip-margin) * -1);
        &:before {
          bottom: 100%;
          border-bottom-color: var(--tooltip-background-color);
        }
      `)
    || (direction === 'left'
      && css`
        left: auto;
        right: calc(100% + var(--tooltip-margin));
        top: 50%;
        transform: translateX(0) translateY(-50%);
        &:before {
          left: auto;
          right: calc(var(--tooltip-arrow-size) * -2);
          top: 50%;
          transform: translateX(0) translateY(-50%);
          border-left-color: var(--tooltip-background-color);
        }
      `)};
`;

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delay?: number;
  direction?: string;
  trigger?: string;
}
export function Tooltip({
  children, content, delay = 400, direction = 'right', trigger = 'click',
}: TooltipProps) {
  let timeout: any;
  const [active, setActive] = React.useState(false);

  // console.log(
  //   'https://dev.to/vtrpldn/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-3pnk',
  // );

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  const toggleTip = () => {
    if (active) {
      hideTip();
    } else {
      showTip();
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Escape') {
      hideTip();
    }
  };

  let ttProps = {
    onClick: toggleTip,
  };
  if (trigger === 'hover') {
    ttProps = {
      // @ts-ignore
      onMouseEnter: showTip,
      onMouseLeave: hideTip,
    };
  }

  return (
    <TooltipWrapper
      role="button"
      // @ts-ignore
      tabIndex="0"
      onKeyDown={handleKeyDown}
      {...ttProps}
    >
      {children}
      {active && <TooltipTip direction={direction}>{content}</TooltipTip>}
    </TooltipWrapper>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  content: PropTypes.node,
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  trigger: PropTypes.oneOf(['click', 'hover']),
};
