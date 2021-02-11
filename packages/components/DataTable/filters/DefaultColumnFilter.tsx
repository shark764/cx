import * as React from 'react';
import { FilterProps } from '../types';

export function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }: FilterProps) {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        // Set undefined to remove the filter entirely
        setFilter(e.target.value || undefined);
      }}
      placeholder="Search..."
    />
  );
}
