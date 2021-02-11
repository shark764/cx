import * as React from 'react';
import { IFilter } from '@cx/types/table';
import { TextBox } from '../../Inputs/TextBox';

export function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }: IFilter) {
  return (
    <TextBox
      value={filterValue || ''}
      onChange={(e) => {
        // Set undefined to remove the filter entirely
        setFilter(e.target.value || undefined);
      }}
      placeholder="Search..."
    />
  );
}
