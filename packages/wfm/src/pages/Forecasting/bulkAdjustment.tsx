import { useState } from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import AdapterLuxon from '@material-ui/lab/AdapterLuxon';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { Loading } from '@cx/components/Icons/Loading';

const Container = styled.div`
  /* margin-bottom: 30px; */
  padding: 20px 45px;
`;

const DateTimeInput = styled.span`
  margin: 0px 10px;
`;

const Trashcan = styled(DeleteIcon)`
  color: lightgrey;
  float: right;
  cursor: pointer;
  margin-right: 20px;
`;

// export const SaveOrDe

export const BulkAdjustment = ({ adjustment, adjustmentKey, refetchTimeline, timelineIsFetching, crud, intervalLength }: any): any => {

  const [start, setStart] = useState<any>(DateTime.fromISO(adjustment?.start?.timestamp));
  const [end, setEnd] = useState<any>( DateTime.fromISO(adjustment?.end?.timestamp));
  const [value, setValue] = useState<number>(0);
  const [id, setId] = useState<string>('');

  const intervalConversion: {[key: string]: number} = {
    'quarter-hour': 15,
    'hour': 60,
    'day': 60 * 24,
  };

  const saveNewAdjustment = () => {
    const diffInMin = end.diff(start, 'minutes');
    const { minutes } = diffInMin.toObject();

    const totalIntervals = (minutes / intervalConversion[intervalLength])

    crud.create({
      timestamp: start,
      value: value,
      metric: adjustmentKey,
      intervals: totalIntervals,
    }).then((adjustment: any) => {
      setId(adjustment.id);
      refetchTimeline({});
    });
  };

  return (
    <Container className="multi-interval-adjustment">
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DateTimeInput>
          <DateTimePicker
            renderInput={(props) =>
              <TextField
                {...props}
                size="small"
                helperText={false}
              />}
            label={`Start ${adjustmentKey} adjustment `}
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
            label="Adjustment Value"
            variant="outlined"
            value={value}
            onChange={({target: { value }}) => setValue(parseInt(value))}
            sx={{width: '130px'}}
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
            label={`End ${adjustmentKey} adjustment`}
            value={end}
            minutesStep={15}
            onChange={(newValue: any) => {
              setEnd(newValue);
            }}
          />
        </DateTimeInput>
      </LocalizationProvider>

      <span style={{float: 'right', marginTop: '8px', marginRight: '15px'}}>
        { timelineIsFetching && id ?
          <Loading size={24} /> : null
        }
        { !timelineIsFetching && !id ?
          <SaveIcon sx={{color: 'lightgrey', cursor: 'pointer'}} onClick={() => saveNewAdjustment()} /> : null
        }
        {id && !timelineIsFetching ?
          <Trashcan onClick={() =>
            crud.delete({adjustment_id: id}).then(() => {
              setId('');
              refetchTimeline();
            })
          } /> : null
        }
      </span>

    </Container>
  )
};
