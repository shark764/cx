import * as React from 'react';
import { IFilter } from '@cx/types/table';

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: {
    filterValue, setFilter, preFilteredRows, id,
  },
}: IFilter): JSX.Element {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const filterOptions = new Set();
    preFilteredRows.forEach((row: any) => {
      filterOptions.add(row.values[id]);
    });
    return Array.from(filterOptions);
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      title="filtering"
    >
      <option value="">All</option>
      {options.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
