import * as React from 'react';
import {
  ColumnInstance,
  TableState,
  TableToggleHideAllColumnProps,
} from 'react-table';
import styled from 'styled-components';
import {
  Checkbox, ListItemText, MenuItem, TextField,
} from '@material-ui/core';

const CheckList = styled(TextField)`
  & .MuiInputBase-formControl {
    width: 150px;
  }
`;
const SelectAllText = styled(ListItemText)`
  & .MuiListItemText-primary {
    font-weight: 600;
  }
`;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

interface ColumnSwitcherProps {
  toggleHideAllColumns: (value?: boolean | undefined) => void;
  setHiddenColumns: (param: string[]) => void;
  onToggleHideColumn: (param: string[]) => void;
  state: TableState;
  getToggleHideAllColumnsProps: (
    props?: Partial<TableToggleHideAllColumnProps> | undefined
  ) => TableToggleHideAllColumnProps;
  allColumns: ColumnInstance[];
}

export function ColumnSwitcher({
  toggleHideAllColumns,
  setHiddenColumns,
  onToggleHideColumn,
  state,
  getToggleHideAllColumnsProps,
  allColumns,
}: ColumnSwitcherProps): JSX.Element {
  const { hiddenColumns } = state;
  const handleToggleHideColumns = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
      event: Event | React.SyntheticEvent<Element, Event>;
    }>,
  ) => {
    const { value } = event.target as { value: string[] };
    if (value[value.length - 1] === 'all') {
      toggleHideAllColumns();
      // If value contains only "all" item, then all columns
      // have been unselected, then we send all columns as new "hiddenColumns".
      // Otherwise an empty array is sent.
      onToggleHideColumn(
        value.length === 1
          ? allColumns.map((column: ColumnInstance) => column.id)
          : [],
      );
      return;
    }
    setHiddenColumns(value);
    onToggleHideColumn(value);
  };

  return (
    <CheckList
      select
      variant="outlined"
      size="small"
      SelectProps={{
        multiple: true,
        value: hiddenColumns,
        onChange: handleToggleHideColumns,
        displayEmpty: true,
        renderValue: (selected) => ((selected as string[]).length > 0 ? 'Columns: (...)' : 'Columns: All'),
        MenuProps,
      }}
    >
      <MenuItem value="all">
        <Checkbox
          {...getToggleHideAllColumnsProps({
            indeterminate:
              (getToggleHideAllColumnsProps().indeterminate as
                | number
                | boolean) > 0,
          })}
        />
        <SelectAllText primary="Select All" />
      </MenuItem>
      {allColumns.map((column: ColumnInstance) => (
        <MenuItem key={column.id} value={column.id}>
          <Checkbox {...column.getToggleHiddenProps()} />
          <ListItemText primary={column.Header} />
        </MenuItem>
      ))}
    </CheckList>
  );
}
