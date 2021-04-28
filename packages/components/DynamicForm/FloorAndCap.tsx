import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
  optionName: string;
  hidden: boolean;
};

const IncrementControls = styled.span`
  position: absolute;
  right: 24px;
  top: 10px;
  width: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Input = styled(TextField)`
  width: 170px;
  .MuiInputBase-input {
    padding: 11px 14px;
  }
  .MuiOutlinedInput-adornedEnd {
    padding-right: 0px;
  }
`;

const Grid = styled.span`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: 5px 0;
`;
const Container = styled.div`
  display: ${({hidden}) => hidden ? 'none' : 'grid'};
  grid-template-columns: 1fr 50px;
  justify-items: center;
`;
const Decrement = styled(RemoveIcon)`
  color: #aeaaaa;
  cursor: pointer;
`;
const Increment = styled(AddIcon)`
  color: #aeaaaa;
  cursor: pointer;
`;

export const FloorAndCap: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue, optionName, hidden}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange }) => (
      <Inputs
        onChange={onChange}
        name={name}
        optionName={optionName}
        hidden={hidden}
      />
    )}
  />;

const Inputs = ({onChange, name, optionName, hidden}: any) => {
  const [floor, setFloor] = useState(20);
  const [cap, setCap] = useState(40);

  useEffect(() => {
    onChange({ floor, cap, method: optionName })
  }, [floor, cap]);

  return (
    <Container hidden={hidden} >
      <div style={{margin: '20px 0', width: '100%'}}>
        <Grid>
          <span>Cap</span>
          <span style={{position: 'relative'}}>
            <Input
              value={cap}
              type="number"
              variant="outlined"
              className={name}
              onChange={({target: { value }}: any) => { setCap(parseInt(value)) }}
            />
              <IncrementControls>
                <Decrement className={name + '-decrement'} onClick={() => { setCap(cap - 1) }}  fontSize="small" />
                <Increment className={name + '-increment'} onClick={() => { setCap(cap + 1) }} fontSize="small" />
              </IncrementControls>
          </span>
        </Grid>
        <Grid>
          <span>Floor</span>
          <span style={{position: 'relative'}}>
            <Input
              value={floor}
              type="number"
              variant="outlined"
              className={name}
              onChange={({target: { value }}: any) => { setFloor(parseInt(value)) }}
            />
              <IncrementControls>
                <Decrement className={name + '-decrement'} onClick={() => { setFloor(floor - 1) }}  fontSize="small" />
                <Increment className={name + '-increment'} onClick={() => { setFloor(floor + 1) }} fontSize="small" />
              </IncrementControls>
          </span>
        </Grid>
      </div>
    </Container>
  );
};