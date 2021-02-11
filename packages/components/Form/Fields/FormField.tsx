import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { IField, IFormField } from '@cx/types/form';

const Field = styled.div<IField>`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 15px;
  margin: 0.5rem;

  label {
    text-align: ${({ align }) => align};
  }

  select {
    width: 100%;
  }
`;

export function FormField({
  label, align = 'left', children, ...rest
}: IFormField) {
  return (
    <Field align={align}>
      <label {...rest}>{label}</label>
      {children}
    </Field>
  );
}

FormField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
};
