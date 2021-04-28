import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export interface SelectOptions {
  label: string;
  id: string;
};
interface SelectorProps {
  value?: string;
  defaultValue?: string;
  onChange: any;
  label?: string;
  options: SelectOptions[];
  style?: any;
};

export const Selector: React.VFC<SelectorProps> = ({label, options, ...selectProps}) => {
  return (
    <FormControl
      variant="outlined"
    >
      <InputLabel id="Select">{label}</InputLabel>
      <Select {...selectProps}
        style={{
          ...selectProps.style,
          height: '40px',
        }}
      >
        {options.map(({label, id}: SelectOptions) => (
          <MenuItem key={id} value={id}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};