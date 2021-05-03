import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

interface Props {
  control: Control;
  name: string;
  constraints: any;
  errors: any;
  clearErrors: any;
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

export const FloorAndCap: React.VFC<Props> = ({ control, name, constraints, errors, clearErrors, hidden }) => {
  const [floor, setFloor] = useState(20);
  const [cap, setCap] = useState(40);

  return (
    <Container hidden={hidden} >
      <div style={{ margin: '20px 0', width: '100%' }}>
        <Grid>
          <span>Cap</span>
          <span style={{ position: 'relative' }}>
            <Controller
              control={control}
              name={`${name}.cap`}
              defaultValue={40}
              rules={{
                validate: {
                  required: (value) => !!value || constraints[name]?.cap?.required,
                  min: (value) => (value > 0 ) || constraints[name]?.cap?.min,
                  lowerThanFloor: (value) => (value >= floor) || constraints[name]?.cap?.lowerThanFloor,
                }
              }}
              render={({ onChange }) => (
                <Input
                  error={ errors?.[name]?.cap }
                  helperText={errors[name]?.cap?.message}
                  value={cap}
                  type="number"
                  variant="outlined"
                  className={`${name}-cap`}
                  onChange={({ target: { value } }: any) => {
                    onChange(value);
                    setCap(parseInt(value));
                    if(value > floor && errors[name]?.floor?.type === 'higherThanCap') {
                      clearErrors(`${name}.floor`);
                    }
                  }}
                />
              )}
            />
            <IncrementControls>
              <Decrement className={name + '-decrement'} onClick={() => { setCap(cap - 1) }} fontSize="small" />
              <Increment className={name + '-increment'} onClick={() => { setCap(cap + 1) }} fontSize="small" />
            </IncrementControls>
          </span>
        </Grid>

        <Grid>
          <span>Floor</span>
          <span style={{ position: 'relative' }}>
            <Controller
              control={control}
              name={`${name}.floor`}
              defaultValue={20}
              rules={{
                validate: {
                  required: (value) => !!value || constraints[name]?.floor?.required,
                  min: (value) => (value > 0 ) || constraints[name]?.floor?.min,
                  higherThanCap: (value) => (value <= cap) ||  constraints[name]?.floor?.higherThanCap,
                }
              }}
              render={({ onChange }) => (
                <Input
                  error={ errors?.[name]?.floor }
                  helperText={errors[name]?.floor?.message}
                  value={floor}
                  type="number"
                  variant="outlined"
                  className={`${name}-floor`}
                  onChange={({ target: { value } }: any) => {
                    onChange(value);
                    setFloor(parseInt(value));
                    if(value < cap && errors[name]?.cap?.type === 'lowerThanFloor') {
                      clearErrors(`${name}.cap`);
                    }
                  }}
                />
              )}
            />
            <IncrementControls>
              <Decrement className={name + '-decrement'} onClick={() => { setFloor(floor - 1) }} fontSize="small" />
              <Increment className={name + '-increment'} onClick={() => { setFloor(floor + 1) }} fontSize="small" />
            </IncrementControls>
          </span>
        </Grid>
      </div>
    </Container>
  );
};