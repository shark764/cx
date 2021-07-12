import * as React from 'react';
import {
  useState,
} from 'react';

import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import TextField from '@material-ui/core/TextField';
import { Loading } from '@cx/components/Icons/Loading';
import { Plus } from '@cx/components/Icons/Plus';

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
  cursor: pointer;
`;

const Container = styled.div`
`;

const Header = styled.div`
  display: inline-block;
  height: 20px;
  width: 100%;
`;
const Footer = styled.div`
  display: inline-block;
  height: 50px;
  width: 100%;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(80px,200px)minmax(80px,200px)minmax(80px,200px)minmax(80px,200px)minmax(80px,200px)minmax(80px,200px)minmax(80px,200px);
`;

export const AdjustmentInput = ({ initValue }: any) => {
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
      onChange={({ target: { value } }) => setValue(value)}
    />
  </>);
};

const Cell = styled.div`
  margin-bottom: 10px;
`;
const CellOperations = styled.span`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-left: 12px;
  vertical-align: text-top;
`;
const Divider = styled.div`
  width: 80%;
  margin: 0 auto;
  border-bottom: 1px solid lightgrey;
  margin: 15px 0;
`;

export const AdjustmentComposition = ({ adjustments, crud, type, timestamp }: any) => {

  const deleteSavedAdjustment = (adjustment_id: string) => {
    return crud.delete({ adjustment_id });
  };
  const saveNewAdjustment = (value: string) => {
    return crud.create({
      timestamp: timestamp,
      value: value,
      metric: type,
    });
  };
  const updateSavedAdjustment = (value: string, adjustment_id: string) => {
    return crud.update({
      timestamp: timestamp,
      value: value,
      adjustment_id,
      metric: type,
    });
  };
  const adjustmentCrud = { create: saveNewAdjustment, update: updateSavedAdjustment, delete: deleteSavedAdjustment, refresh: crud.refresh };

  return <span>
    {
      <AdjustmentCell
        id={null}
        value={0}
        crud={adjustmentCrud}
      />
    }

    {adjustments.length > 0 ? <Divider /> : null}

    {adjustments.map(({ id, value }: any) =>
      <AdjustmentCell
        id={id}
        key={id}
        value={value}
        crud={ adjustmentCrud }
      />
    )}
  </span>
};

export const AdjustmentCell = ({ id, value, crud }: any) => {
  const [newVal, setNewValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const turnOffLoading = () => setIsLoading(false);
  const turnOnLoading = () => setIsLoading(true);

  const withLoading = (apiCall: any) => {
    turnOnLoading();
    apiCall()
      .then((data: any) => {
        const actionId = (data && data.id) || id;
        crud.refresh(actionId);
        turnOffLoading();
      });
  }

  return <Cell key={id}>
    <Input
      variant="outlined"
      title=' '
      placeholder=' '
      type="number"
      value={newVal}
      onBlur={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onChange={({ target: { value } }) => setNewValue(value)}
    />

    <CellOperations>
      {(!id && !isLoading) ? <Plus fill="lightgrey" size={20} onClick={() => withLoading(() => crud.create(newVal, id))} /> : null}

      {(id && !isLoading) ? <SaveIcon sx={{ color: 'lightgrey' }} onClick={() => withLoading(() => crud.update(newVal, id))} /> : null}

      {isLoading ? <Loading size={20} fill="grey" /> : null}

      {(id && !isLoading) ? <Trashcan onClick={() => withLoading(() => crud.delete(id))} /> : null}

      {(id && !isLoading) && (newVal !== value) ? <UndoIcon sx={{ color: 'lightgrey' }} onClick={() => setNewValue(value)} /> : null}
    </CellOperations>

  </Cell>
};

export const AdjustmentPanel = (props: any) => {
  return (<Container>
    <Header>
    </Header>
    <Grid>
      <span>
        Some adjustments may be automatically calculated based off of unevenly weighted NCO adjustments
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

      <span>
      </span>
    </Grid>
    <Footer>
    </Footer>

  </Container>)
};