import * as React from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'react-datepicker/dist/react-datepicker.css';

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  width: ${
  /* @ts-ignore */
  ({ width }) => width
  };
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  .MuiInputBase-input {
    padding: 11px 14px;
  }
  .MuiOutlinedInput-adornedEnd {
    padding-right: 0px;
  }
`;
interface DatePickerProps {
  label?: string;
  disabled?: boolean;
  onChange?: any;
  selected?: Date;
  width?: string;
  error?: boolean;
  helperText?: string;
  minDate?: Date;
};

export const DatePicker: React.VFC<DatePickerProps> = ({ label, disabled = false, onChange, selected, width = '170px', error, helperText, minDate }) =>
  (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledKeyboardDatePicker
        // @ts-ignore
        width={width}
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        format="yyyy-MM-dd"
        margin="normal"
        minDate={minDate}
        // id="date-picker-inline"
        // label={label || 'Date'}
        value={selected}
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        disabled={disabled}
        error={error}
        helperText={helperText}
        autoOk={true}
      />
    </MuiPickersUtilsProvider>
  );
