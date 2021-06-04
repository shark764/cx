import * as React from 'react';
import {
  useState,
} from 'react';

import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Input = styled(TextField)`
  width: 70px;
  .MuiInputBase-input {
    padding: 5px 10px;
    font-size: 10pt;
  }
  .MuiOutlinedInput-adornedEnd {
    padding-right: 0px;
  }
`;

const Trashcan = styled(DeleteIcon)`
  color: lightgrey;
  float: right;
  cursor: pointer;
  margin-right: 20px;
`;

const Container = styled.div`
`;

const Header = styled.div`
  display: inline-block;
  height: 20px;
  width: 100%;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px 200px 200px 200px;
`;

export const AdjustmentInput = ({initValue}: any) => {
  const [value, setValue] = useState(initValue);

  return (<>
    <Input
      variant="outlined"
      title=' '
      placeholder=' '
      type="number"
      value={value}
      onBlur={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onChange={({target: {value}}) => setValue(value)}
    />
  </>);
};

const Cell = styled.div`
  margin-left: 30px;
  margin-bottom: 10px;
`;
export const AdjustmentComposition = ({ adjustments, crud, type, timestamp }: any) => {
  const [tempAdjustments, setTempAdjustments] = useState<any>([]);

  const immutableSplice = (array: any[], index: number, value: unknown) => [
    ...array.slice(0, index),
    value,
    ...array.slice(index + 1, array.length),
  ];

  const changeVal = (index: number, value: any) =>
    setTempAdjustments(
      immutableSplice(tempAdjustments, index, value)
    );

  const immutableRemoveItem = (array: any[], index: number) => {
    const { [index]: itemToRemove, ...restOfArray } = array;
    return Object.values(restOfArray);
  };

  const removeTempAdjustment = (index: number) =>
    setTempAdjustments(
      immutableRemoveItem(tempAdjustments, index)
    );

  const deleteSavedAdjustment = (adjustment_id: string) => {
    crud.delete({adjustment_id});
  };
  const saveNewAdjustment = (value: string) => {
    crud.create({
      timestamp: timestamp,
      value: value,
      metric: type,
    });
  };
  // const updateSavedAdjustment = (adjustment_id: string) => {
  //   // crud.delete({adjustment_id}); // TODO:
  // };

  return <span>
    <Button
      style={{marginLeft: '30px'}}
      variant="outlined"
      className="dynamicFormCancel"
      onClick={() => setTempAdjustments([...tempAdjustments, {value: 0}])}
      size="small"
      sx={{marginBottom: '10px'}}
    >
      Add
    </Button>

    { adjustments.map((adjustment: any) =>
      <Cell key={adjustment.id}>
        <AdjustmentInput initValue={adjustment.value} />
        <SaveIcon sx={{color: 'lightgrey'}} />
        <Trashcan onClick={() => deleteSavedAdjustment(adjustment.id)} />
      </Cell>
    )}

    { tempAdjustments.map((adjustment: any, index: number) =>
      <Cell key={index}>
        <Input
          variant="outlined"
          title=' '
          placeholder=' '
          type="number"
          value={adjustment.value}
          onBlur={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={({target: { value }}: any) => changeVal(index, {value})}
        />
        <SaveIcon sx={{color: 'lightgrey'}} onClick={() => saveNewAdjustment(adjustment.value)} />
        <Trashcan onClick={() => removeTempAdjustment(index)} />
      </Cell>
    )}
  </span>
};

export const AdjustmentPanel = (props: any) => {

  return (<Container>
    <Header>

    </Header>
    <Grid>
      <span>
      </span>
      <span>
      </span>
      <span>
        <AdjustmentComposition
          adjustments={props.original.ncoDerivedAdjustments}
          crud={props.original.crud}
          type="nco"
          timestamp={props.original.timestamp}
        />
      </span>
      <span>
      </span>
      <span>
      </span>
      <span>
        <AdjustmentComposition
          adjustments={props.original.ahtDerivedAdjustments}
          crud={props.original.crud}
          type="aht"
          timestamp={props.original.timestamp}
        />
      </span>
    </Grid>

  </Container>)
};