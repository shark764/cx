import * as React from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Note from '@material-ui/icons/NoteAdd';

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
  hidden?: boolean;
  constraints?: any;
  errors?: any
};
const Wrapper = styled.div`
  height: 400px;
`;

const columns = [
  { width: 120, field: 'paid', headerName: 'Paid', type: 'boolean', editable: true },
  { width: 120, field: 'intervalStart', headerName: 'Min time before break', type: 'number', editable: true },
  { width: 120, field: 'intervalEnd', headerName: 'Max time before break', type: 'number', editable: true },
  { width: 120, field: 'length', headerName: 'Duration in minutes', type: 'number', editable: true },
];

export const BreakSettings: React.VFC<Props> = ({control, name, defaultValue, constraints, errors}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={{
      validate: {
        required: (value) => !!value || constraints?.[name]?.required,
      }
    }}
    render={({ onChange, onBlur, value }) => (

      <Wrapper>
        <DataGrid
          rows={value}
          columns={columns}
          density={'compact'}
          onCellEditCommit={(prop) => {
            const newVal = [...value];
            const editedRow = newVal.findIndex(({id}) => id === prop.id );
            const newCellValue = {...newVal[editedRow], [prop.field]: prop.value}
            newVal.splice(editedRow, 1, newCellValue);
            onChange(newVal);
          }}
        />
        <Button
          onClick={() => onChange([{ id: value.length + 1,paid: true,intervalStart: 0,intervalEnd: 0,length: 15 },...value])}
          variant="outlined"
          disableElevation
          color="primary"
          startIcon={<Note />}
          sx={{marginTop: '20px', marginBottom: '40px'}}
        >
          Add Break
        </Button>
      </Wrapper>
    )}
  />;
