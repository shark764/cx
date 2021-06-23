import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AdapterLuxon from '@material-ui/lab/AdapterLuxon';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { Loading } from '@cx/components/Icons/Loading';
import { Plus } from '@cx/components/Icons/Plus';

const Trashcan = styled(DeleteIcon)`
  color: lightgrey;
  cursor: pointer;
`;

const Container = styled.div`
  padding: 20px 45px;
`;

const DateTimeInput = styled.span`
  margin: 0px 10px;
`;
const Actions = styled.span`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-left: 12px;
  vertical-align: text-top;
`;

export const BulkAdjustment = ({ adjustmentKey, refetchTimeline, timelineIsFetching, crud, intervalLength , starting, ending, initValue, id}: any): any => {

  const [metric, setMetric] = useState<any>(adjustmentKey);
  const [start, setStart] = useState<any>(starting);
  const [end, setEnd] = useState<any>(ending);
  const [value, setValue] = useState<number>(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const turnOffLoading = () => setIsLoading(false);
  const turnOnLoading = () => setIsLoading(true);

  useEffect(() => {
    setStart(starting);
  }, [starting])
  useEffect(() => {
    setEnd(ending);
  }, [ending])

  const intervalConversion: {[key: string]: number} = {
    'quarter-hour': 15,
    'hour': 60,
    'day': 60 * 24,
  };

  const calcIntervals = (start: any, end: any) => {
    const startDate = DateTime.fromISO(start);
    const endDate = DateTime.fromISO(end);
    const diffInMin = endDate.diff(startDate, 'minutes');
    const { minutes } = diffInMin.toObject();
    // @ts-ignore
    const totalIntervals = (minutes / intervalConversion[intervalLength])

    return totalIntervals;
  };

  const deleteSavedAdjustment = () => {
    return crud.delete({adjustment_id: id}).then(() => id);
  };
  const saveNewAdjustment = () => {
    return crud.create({
      timestamp: start,
      intervals: calcIntervals(start, end),
      value: value,
      metric: adjustmentKey,
    });
  };
  const updateSavedAdjustment = () => {
    return crud.update({
      timestamp: start,
      intervals: calcIntervals(start, end),
      value: value,
      adjustment_id: id,
      metric: adjustmentKey,
    });
  };

  const withLoading = (apiCall: any, value: number) => {
    turnOnLoading();
    apiCall()
      .then((data: any) => {
        crud.refresh(`${data.id}${value}`);
        turnOffLoading()
      });
  }

  return (
    <Container className="multi-interval-adjustment">
      <LocalizationProvider dateAdapter={AdapterLuxon}>

        { metric && <TextField
          id="outlined-select-currency"
          select
          label="Metric"
          value={metric}
          onChange={({target: { value }}: any) => setMetric(value)}
          variant="outlined"
          style={{ width: '80px' }}
          size="small"
        >
          <MenuItem value='nco'>
            nco
          </MenuItem>
          <MenuItem value='aht'>
            aht
          </MenuItem>
        </TextField>}

        <DateTimeInput>
          <DateTimePicker
            renderInput={(props) =>
              <TextField
                {...props}
                size="small"
                helperText={false}
              />}
            label={`Start`}
            value={start}
            minutesStep={15}
            onChange={(newValue: any) => {
              setStart(newValue);
            }}
          />
        </DateTimeInput>

        <span>
          <TextField
            size="small"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            label="Value"
            variant="outlined"
            value={value}
            onChange={({target: { value }}) => setValue(parseInt(value))}
            sx={{width: '80px'}}
          />
        </span>

        <DateTimeInput>
          <DateTimePicker
            renderInput={(props) =>
              <TextField
                {...props}
                size="small"
                helperText={false}
              />}
            label={`End`}
            value={end}
            minutesStep={15}
            onChange={(newValue: any) => {
              setEnd(newValue);
            }}
          />
        </DateTimeInput>
      </LocalizationProvider>

    <Actions>
      { (!id && !isLoading) ? <Plus fill="lightgrey" size={20} onClick={() => withLoading(() => saveNewAdjustment(), value) }  /> : null}

      { (id && !isLoading ) ? <SaveIcon sx={{color: 'lightgrey', cursor: 'pointer'}} onClick={() => withLoading(() => updateSavedAdjustment(), value)  }  /> : null}

      { isLoading ? <Loading size={20} fill="grey" /> : null}

      { (id && !isLoading ) ? <Trashcan onClick={() =>  withLoading(() => deleteSavedAdjustment(), value)  } /> : null }

      { (id && !isLoading ) && (initValue !== value) ? <UndoIcon sx={{color: 'lightgrey', cursor: 'pointer'}}  onClick={() => setValue(initValue) } /> : null }
    </Actions>

    </Container>
  )
};
