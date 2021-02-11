import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { Message } from '../Message';
import { ButtonProps } from '@cx/wfm/index.types';

export interface ITab extends ButtonProps {
  id?: string;
  label?: string;
  active?: boolean;
  children?: React.ReactElement;
}

const TabContent = styled.div`
  margin: 25px;
`;
const TabList = styled.div`
  margin-bottom: 50px;
`;

const TabItem = styled.button<ITab>`
  cursor: pointer;
  color: ${({ color }) => (color ? color : 'inherit')};

  ${({ active, bgColor, primary, secondary, theme }) =>
    active &&
    ((bgColor &&
      css`
        background-color: ${bgColor};
      `) ||
      (primary &&
        css`
          background-color: ${theme.colors.primary};
        `) ||
      (secondary &&
        css`
          background-color: ${theme.colors.secondary};
        `))};

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    `}
`;

interface TProps {
  activeIndex?: number;
  children: React.ReactElement<any>[];
}

export function Tabs({ children, activeIndex = 0 }: TProps) {
  const [activeTab, setActiveTab] = React.useState(activeIndex);

  const handleChange = (index: number) => {
    setActiveTab(index);
  };

  if (!children) {
    return <Message text="error" messageType="No tabs were added" />;
  }

  let tabs = React.useMemo(
    () =>
      children.map((child: React.ReactElement) => {
        return child.props.label;
      }),
    []
  );

  let content = React.useMemo(() => children[activeTab], [activeTab]);

  return (
    <div>
      <TabList className="tab-buttons">
        {children.map((child: React.ReactElement, index: number) => {
          let { id, label, children, ...rest } = child.props;
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

      <TabContent>{content}</TabContent>
    </div>
  );
}

export { Tab } from './Tab';
