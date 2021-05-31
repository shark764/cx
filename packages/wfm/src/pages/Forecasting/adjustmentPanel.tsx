import * as React from 'react';
import {
  useState,
} from 'react';

import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
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
const MockIcon = styled.span<{visible: boolean}>`
  font-size: 16pt;
  font-weight: bold;
  color: lightgrey;
  visibility: ${({visible}) => visible ? 'default' : 'hidden' };
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
  grid-template-columns: 200px 200px 200px 200px 200px;
`;

export const AdjustmentInput = ({initValue}: any) => {
  const [value, setValue] = useState(initValue);
  const [type, setType] = useState('absolute');
  const [focus, setFocus] = useState(false);
  return (<>
    <Input
      variant="outlined"
      title=' '
      placeholder=' '
      type="number"
      value={value}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFocus(false);
      }}
      onChange={({target: {value}}) => setValue(value)}
    />
    <MockIcon
      onClick={() => setType('absolute')}
      visible={(focus || type === 'absolute') || (focus && type !== 'absolute')}
    > # </MockIcon>
    <MockIcon
    // @ts-ignore
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('???');
        setType('percent');
      }}
      visible={(focus || type === 'percent') || (focus && type !== 'percent')}
    > % </MockIcon>
  </>);
};

const Cell = styled.div`
  margin-left: 30px;
`;
export const AdjustmentComposition = ({adjustments}: any) => (
  <span> { adjustments.map((adjustment: any) => {

    return (<Cell key={adjustment.id}>
      <AdjustmentInput initValue={adjustment.value} />

      <Trashcan />
      <br />
    </Cell>)
  }) } </span>
);

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
        <AdjustmentComposition adjustments={props.original.ncoDerivedAdjustements} /><br />
        {props.original.ncoDerivedAdjustements.length > 0 && <Button
          style={{marginLeft: '30px'}}
          variant="outlined"
          className="dynamicFormCancel"
        >
          Apply Adjustments
        </Button>}
      </span>
      <span>

      </span>
      <span>
        <AdjustmentComposition adjustments={props.original.ahtDerivedAdjustements} /><br />
        {props.original.ahtDerivedAdjustements.length > 0 && <Button
          style={{marginLeft: '30px'}}
          variant="outlined"
          className="dynamicFormCancel"
        >
          Apply Adjustments
        </Button>}
      </span>
    </Grid>

  </Container>)
};