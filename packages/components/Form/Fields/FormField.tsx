import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 15px;
  margin: 0.5rem;

  label {
    text-align: right;
  }
`;

interface FieldProps {
  label: string;
  children: React.ReactNode;
}
export function FormField({ label, children, ...rest }: FieldProps) {
  return (
    <Field>
      <label {...rest}>{label}</label>
      {children}
    </Field>
  );
}

FormField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};
