import * as React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const BoxDiv = styled.div`
  border: 1px solid #80808096;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  height: 80px;
`;

const dateOptions = [
  { label: 'Day', id: 23425 },
  { label: 'Week', id: 4564576 },
  { label: 'Month', id: 456 },
  { label: 'Year', id: 34534 },
  { label: 'Date Range', id: 34536 },
];

const timeZonesOptions = [
  { label: 'America/Chigago', id: 23425 },
  { label: 'Canada/Halifax', id: 4564576 },
];

const competenceOptions = [
  { label: 'Booking', id: 23425 },
];




export function Filters() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <BoxDiv>
      <Autocomplete
        id="combo-box-demo"
        options={dateOptions}
        getOptionLabel={(option: any) => option.label}
        size="small"
        style={{ width: 300, display: 'inline-block' }}
        renderInput={(params: any) => <TextField {...params} label="Time Span" />}
        defaultValue={dateOptions[0]}
      />
      <Autocomplete
        id="combo-box-demo"
        options={timeZonesOptions}
        getOptionLabel={(option: any) => option.label}
        size="small"
        style={{ width: 300, display: 'inline-block' }}
        renderInput={(params: any) => <TextField {...params} label="Time Zone" />}
        defaultValue={timeZonesOptions[0]}
      />
      <Autocomplete
        id="combo-box-demo"
        options={competenceOptions}
        getOptionLabel={(option: any) => option.label}
        size="small"
        style={{ width: 300, display: 'inline-block' }}
        renderInput={(params: any) => <TextField {...params} label="Competence" />}
        defaultValue={competenceOptions[0]}
      />
    </BoxDiv>
  );
}
