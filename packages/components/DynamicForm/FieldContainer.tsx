import * as React from 'react';
import styled from 'styled-components';

const Field = styled.div<{fullWidth?: boolean, hidden?: boolean}>`
  display: ${({hidden}) => hidden? 'none' : 'grid'};
  grid-template-columns: ${({fullWidth}) => fullWidth ? '1fr' : '1fr 2fr'};
  gap: 15px;
  margin: 0.5rem;
  font-family: Arial;
  align-items: ceneter;
`;
const Label = styled.div`
  align-self: center;
`;

interface Props {
  label: string;
  children: React.ReactNode;
  hidden?: boolean;
  fullWidth?: boolean;
};

export const FieldContainer: React.VFC<Props> = ({ label = '', hidden, fullWidth, children }) => {
  return (
    <Field hidden={hidden} fullWidth={fullWidth} >

      <Label > { label } </Label>
      <span> { children } </span>
    </Field>
  );
}
