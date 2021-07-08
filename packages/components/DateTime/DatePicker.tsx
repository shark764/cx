import * as React from 'react';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import TextField from '@material-ui/core/TextField';
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
      <DesktopDatePicker
        mask="____ / __ / __"
        inputFormat="yyyy / MM / dd"
        minDate={minDate}
        value={selected}
        onChange={onChange}
        disabled={disabled}

        renderInput={(props) =>
          <TextField
            {...props}
            size="small"
            error={error}
            helperText={helperText}
          />
        }
      />
  );
