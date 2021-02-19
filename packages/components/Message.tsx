import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

interface IContent {
  messageType: string;
}
const Content = styled.span<IContent>`
  color: ${({ messageType, theme }) => theme.colors[messageType]};
`;

interface IMessage {
  messageType?: string;
  text: string;
}
export function Message({ text, messageType = 'info' }: IMessage) {
  return <Content messageType={messageType}>{text}</Content>;
}

Message.propTypes = {
  text: PropTypes.string,
  messageType: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
};
