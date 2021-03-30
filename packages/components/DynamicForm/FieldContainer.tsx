import * as React from 'react';
import styled from 'styled-components';

const Field = styled.div`
  display: ${({hidden}) => hidden? 'none' : 'grid'};
  grid-template-columns: 1fr 2fr;
  gap: 15px;
  margin: 0.5rem;
  font-family: Arial;
  align-items: ceneter;
`;
const Label = styled.label`
  align-self: center;
`;

interface Props {
  label: string;
  children: React.ReactNode;
  hidden?: boolean;
};

export const FieldContainer: React.VFC<Props> = ({ label = '', hidden, children }) => {
  return (
    <Field hidden={hidden} >
      {/* Error message will go here */}
      <Label> { label } </Label>
      <span> { children } </span>
    </Field>
  );
}
