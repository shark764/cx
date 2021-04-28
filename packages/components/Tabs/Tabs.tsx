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

const TabContainer = styled.div<{ direction?: 'horizontal' | 'vertical' }>`
  ${({ direction }) => direction === 'vertical'
    && css`
      display: grid;
      grid-auto-columns: min-content auto;
      ${TabList} {
        grid-column: 1;
        ${TabItem} {
          display: block;
          width: 200px;
        }
      }
      ${Content} {
        grid-column: 2;
      }
    `};
`;

const TabList = styled(Wrapper)`
  border: 0;
  background-color: transparent;
  padding: 20px 0;
`;

const TabItem = styled(Button)<ITab>`
  cursor: pointer;
  display: inline-block;
  margin: 0 10px 10px 0;

  background: transparent;
  border: none;
  outline: none;
  transition: all ease-in-out 0.2s;
  border-radius: 4px;
  background-color: hsl(0, 0%, 95%);

  ${({ disabled }) => disabled
    && css`
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    `};
`;

const Content = styled.div``;

interface ITabs extends IThemed {
  activeIndex?: number;
  children: React.ReactElement<any>[];
  bgColor?: string;
  direction?: 'horizontal' | 'vertical';
}

export function Tabs({
  children, activeIndex = 0, direction = 'horizontal', ...rest
}: ITabs): React.ReactElement {
  const [activeTab, setActiveTab] = React.useState(activeIndex);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  const content = React.useMemo(() => children[activeTab], [activeTab, children]);

  if (!children) {
    return <Message text="error" messageType="No tabs were added" />;
  }

  return (
    <TabContainer direction={direction}>
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

      <Content>{content}</Content>
    </TabContainer>
  );
}

export { Tab } from './Tab';
