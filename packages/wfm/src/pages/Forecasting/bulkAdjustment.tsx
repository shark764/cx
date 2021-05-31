import * as React from 'react';
// import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';

export const BulkAdjustment = ({ adjustment, adjustmentKey, timestampOptions }: any): any => {
  const [start, setStart] = React.useState<any>(new Date());
  const [end, setEnd] = React.useState<any>(new Date());
  return (
    <span>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label={`Start ${adjustmentKey} adjustment `}
          value={start}
          minutesStep={15}
          onChange={(newValue: any) => {
            setStart(newValue);
          }}
        />

        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label={`End ${adjustmentKey} adjustment`}
          value={end}
          minutesStep={15}
          onChange={(newValue: any) => {
            setEnd(newValue);
          }}
        />
      </LocalizationProvider>

    </span>
  )
};
