import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const options = [
  { label: 'Published', id: 23425 },
  { label: 'Draft 1', id: 4564576 },
  { label: 'Draft 2', id: 456 },
  { label: 'Draft 3', id: 34534 },
  { label: 'Draft 4', id: 34536 },
  { label: 'Draft 5', id: 3455 },
];

export const ScheduleVersion: React.FC<any> = () => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option: any) => option.label}
      size="small"
      style={{ width: 300, display: 'inline-block' }}
      renderInput={(params: any) => <TextField {...params} label="Schedule Version" variant="outlined" />}
    />
  );
}