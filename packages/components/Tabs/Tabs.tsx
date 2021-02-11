import * as React from 'react';
import styled, { css } from 'styled-components';
import { ButtonProps } from '@cx/wfm/index.types';
import { Message } from '../Message';
import { Button } from '../Inputs/Button';
import { Wrapper } from '../Styled';

export interface ITab extends ButtonProps {
  id?: string;
  label?: string;
  active?: boolean;
  children?: React.ReactElement;
}

const TabList = styled(Wrapper)`
  margin-bottom: 30px;
`;

const TabItem = styled(Button)<ITab>`
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  outline: none;
  transition: all ease-in-out 0.2s;
  border-radius: 8px;

  ${({
    active, bgColor, primary, secondary, theme,
  }) => active
    && ((bgColor
      && css`
        background-color: ${bgColor};
      `)
      || (primary
        && css`
          color: ${theme.colors['accent-3']};
          background-color: ${theme.colors.primary};
        `)
      || (secondary
        && css`
          color: ${theme.colors['accent-3']};
          background-color: ${theme.colors.secondary};
        `))};

  ${({ disabled }) => disabled
    && css`
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    `}
`;

interface TProps {
  activeIndex?: number;
  children: React.ReactElement<any>[];
  primary?: boolean;
  secondary?: boolean;
  color?: string;
  bgColor?: string;
}

export function Tabs({ children, activeIndex = 0, ...parentRest }: TProps) {
  const [activeTab, setActiveTab] = React.useState(activeIndex);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  if (!children) {
    return <Message text="error" messageType="No tabs were added" />;
  }

  const content = React.useMemo(() => children[activeTab], [activeTab]);

  return (
    <>
      <TabList>
        {children.map((child: React.ReactElement, index: number) => {
          const {
            id, label, children, ...rest
          } = child.props;
          return (
            <TabItem
              type="button"
              active={index === activeTab}
              onClick={() => handleChange(index)}
              key={id || label}
              {...parentRest}
              {...rest}
            >
              {label}
            </TabItem>
          );
        })}
      </TabList>

      {content}
    </>
  );
}

export { Tab } from './Tab';
