import * as React from 'react';
import styled from 'styled-components';
import { Plus } from '../Icons/Plus';

const Wrapper = styled.div`
  display: flex;
  margin: 15px 0;
`;

const Header = styled.h4<{fontSize}>`
  font-size: ${props => props.fontSize ? props.fontSize : '14px'};
  font-weight: 700;
`;

const handleLineSpacer = lineSpacer => lineSpacer !== undefined ? lineSpacer : "border-top: 1px solid #dadada; flex-grow: 1; margin: 10px 10px 0;";

const LineSpacer = styled.div<{customLineSpacer}>`
  ${({ customLineSpacer }) => handleLineSpacer(customLineSpacer)};
`;

const ActionButton = styled.button`
  background-color: #f9f9f9;
  border: 1px solid #cccccc;
  border-radius: 4px;
  color: #07487a;
  cursor: pointer;
  font-size: 14px;
  margin-top: -2px;
  padding: 3px 10px;
  min-height: 26px;
  :hover {
    box-shadow: inset 0px 1px 2px rgba(175, 175, 175, 0.4);
  }
`;

export const DetailHeader = (props) => {
  return (
    <Wrapper id={props.id} className={props.className}>
      <Header fontSize={props.fontSize}>{props.text}</Header>
      <LineSpacer customLineSpacer={props.customLineSpacer} />
      {props.onActionButtonClick &&
        props.userHasUpdatePermission &&
        !props.inherited &&
        props.open && (
          <ActionButton
            type="button"
            onClick={props.onActionButtonClick}
            id="sdpanel-add-item"
            title="Add new item"
            data-automation="sdpanelAddItem"
          >
            <Plus size={12} />
          </ActionButton>
        )}
    </Wrapper>
  );
}
