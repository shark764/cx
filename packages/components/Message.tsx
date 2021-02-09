import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

interface ContentProps {
  messageType: string;
}
const Content = styled.span<ContentProps>`
  color: ${({ messageType, theme }) => theme.colors[messageType]};
`;

interface MessageProps {
  messageType?: string;
  text: string;
}
export function Message({ text, messageType = 'info' }: MessageProps) {
  return <Content messageType={messageType}>{text}</Content>;
}

Message.propTypes = {
  text: PropTypes.string,
  messageType: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
};
