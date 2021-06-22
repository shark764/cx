import * as React from 'react';
import {
  FormControl, MenuItem, TextField, Theme,
} from '@material-ui/core';
import styled from 'styled-components';
import { FilterOptions } from 'settings/types';

const StyledFormControl = styled(FormControl)`
  min-width: 220px;
  ${({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(1)};
  `};
`;

export function FilterSelect({
  name,
  label,
  options = [],
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: FilterOptions[];
  value: string | number;
  onChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void;
}) {
  return (
    <StyledFormControl>
      <TextField
        select
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </StyledFormControl>
  );
}
