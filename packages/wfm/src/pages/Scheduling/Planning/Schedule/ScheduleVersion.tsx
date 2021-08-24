import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { planning } from '../../../../redux/reducers/planning';
const { setPlan } = planning.actions;
interface Props {
  plans: any[];
};

export const ScheduleVersion: React.FC<Props> = ({plans}) => {
  const plan = useSelector((state: RootState) => state.planning.plan);
  const dispatch = useDispatch();

  return <>
    <Autocomplete
      id="choose_plan"
      options={plans.map(({name, id}) => ({label: name, id}))}
      size="small"
      sx={{ width: 300, display: 'inline-block' }}
      renderInput={(params: any) => <TextField {...params} label="Plans" variant="outlined" />}
      value={plan}
      isOptionEqualToValue={(a, b) => a.id === b.id }
      autoSelect
      disableClearable
      onChange={(event: any, newValue: any) => dispatch(setPlan(newValue))}
    />
  </>
};
