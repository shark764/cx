import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 15px;
  width: 100%;
`;
const Message = styled.p<{type}>`
  color: ${props => messageColor(props.type)};
  font-style: italic;
  font-size: 14px;
  width: 100%;
  text-align: center;
`;

const messageColor = type => {
  switch (type) {
    case 'info':
      return '#3498db';
    case 'success':
      return '#54b84f';
    case 'warning':
      return '#f58c00';
    case 'error':
      return 'red';
    case 'default':
    default:
      return '#656565';
  }
};

export const DetailsPanelMessage = (props: any): any => {
  return (
    <Wrapper id={props.id} className={props.className}>
      <Message type={props.type}>{props.text}</Message>
    </Wrapper>
  );
}
