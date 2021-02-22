import * as React from 'react';
import styled, { css } from 'styled-components';
import { IThemed } from '@cx/types';
import { IButton } from '@cx/types/form';
import { Message } from '../Message';
import { Button } from '../Inputs/Button';
import { Wrapper } from '../Styled';

export interface ITab extends IButton {
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

interface ITabs extends IThemed {
  activeIndex?: number;
  children: React.ReactElement<any>[];
  bgColor?: string;
}

export function Tabs({ children, activeIndex = 0, ...rest }: ITabs) {
  const [activeTab, setActiveTab] = React.useState(activeIndex);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  const content = React.useMemo(() => children[activeTab], [activeTab, children]);

  if (!children) {
    return <Message text="error" messageType="No tabs were added" />;
  }

  return (
    <>
      <TabList>
        {children.map((child: React.ReactElement, index: number) => {
          const { id, label } = child.props;

          return (
            <TabItem
              type="button"
              active={index === activeTab}
              onClick={() => handleChange(index)}
              key={id || label}
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
