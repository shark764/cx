import * as React from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/core/Alert';
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 60px;
`;
const Header = styled.div`
  text-align: center;
  margin-right: 3px;
`;
interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
  hidden?: boolean;
  constraints?: any;
  errors?: any
};
const headers = ['M', 'T', 'W', 'T', 'F', 'S', 'S',];
export const DayTypes: React.VFC<Props> = ({ control, name, defaultValue, constraints, errors }) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={{
      validate: {
        required: (value) =>
        value.filter(Boolean).length > 0 || constraints?.[name]?.required
      }
    }}
    render={({ onChange, onBlur, value }) => <>
    <Grid>

      {value.map((day: number, index: number) => <span key={index}>
        <Header>{headers[index]}</Header>

        <Checkbox
          defaultChecked
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          onChange={() => {
            const newVal = [...value];
            newVal.splice(index, 1, newVal[index] ? null : (index + 1));
            onChange(newVal);
          }}
          onBlur={onBlur}
        />
      </span>)}

    </Grid>

    { errors?.[name] &&
      <div style={{marginTop: '20px'}}>
        <Alert severity="error">{ errors?.[name]?.message }</Alert>
      </div>
    }

    </>}
  />;