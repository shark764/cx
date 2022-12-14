import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { Loading } from '@cx/components/Icons/Loading';
import South from '@material-ui/icons/South';
import { Day } from '@cx/components/Icons/Day';
import { FullHour } from '@cx/components/Icons/FullHour';
import { QuarterHour } from '@cx/components/Icons/QuarterHour';
import { Week } from '@cx/components/Icons/Week';
import Tooltip, { tooltipClasses } from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 1px 3px 0px grey',
    fontSize: '13px',
    maxWidth: 300,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'white',
  },
}));

const Trashcan = styled(DeleteIcon)`
  color: lightgrey;
  cursor: pointer;
`;

const Container = styled.span`
  padding: 20px 45px;
  display: inline-block;
  margin: 0 auto;
`;
const TooltipContainer = styled.span`
  padding: 20px;
  display: inline-block;
  margin: 0 auto;
`;
const DateTimeInput = styled.span`
  margin: 0px 10px;
`;
const SelectedInterval = styled.span`
  margin-right: 20px;
  vertical-align: bottom;
`;
const IntervalText = styled.span`
  margin-left: 20px;
  vertical-align: super;
  cursor: default;
`;
const Actions = styled.span`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
  margin-left: 12px;
  vertical-align: text-top;
`;

export const BulkAdjustment = ({ adjustmentKey, refetchTimeline, timelineIsFetching, crud, intervalLength , starting, ending, initValue, id}: any): any => {
  const channel = useSelector((state: RootState) => state.main.channels[0]);
  const withoutSeconds = (newValue: any) =>
    DateTime.fromISO(newValue).set({second: 0, millisecond: 0});

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
      metric: metric,
      channel: channel,
    });
  };
  const updateSavedAdjustment = () => {
    return crud.update({
      timestamp: start,
      intervals: calcIntervals(start, end),
      value: value,
      adjustment_id: id,
      metric: metric,
      channel: channel,
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

  const intervalIconMap = {
    'quarter-hour': <QuarterHour size={25} ></QuarterHour>,
    'hour': <FullHour size={25} ></FullHour>,
    'day': <Day size={25} ></Day>,
    'week': <Week size={25} ></Week>,
  } as any;

  return (
    <Container className="multi-interval-adjustment">

        <LightTooltip
          TransitionComponent={Zoom}
          arrow
          title={
            <TooltipContainer>
              <div>
                <QuarterHour size={25} ></QuarterHour> <IntervalText>Quarter Hour</IntervalText>
              </div>
              <div>
                <FullHour size={25} ></FullHour> <IntervalText>Hour</IntervalText>
              </div>
              <div>
                <Day size={25} ></Day> <IntervalText>Day</IntervalText>
              </div>
              {/* <div>
                <Week size={25} ></Week> <IntervalText>Week</IntervalText>
              </div> */}
            </TooltipContainer>
          }
        >
          <SelectedInterval>{intervalIconMap[intervalLength]}</SelectedInterval>
        </LightTooltip>

        { metric && <TextField
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
              setStart(withoutSeconds(newValue));
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
              setEnd(withoutSeconds(newValue));
            }}
          />
        </DateTimeInput>

    <Actions>
      { (!id && !isLoading) ? <South sx={{fill: 'grey', cursor: 'pointer'}} onClick={() => withLoading(() => saveNewAdjustment(), value) }  /> : null}

      { (id && !isLoading ) ? <SaveIcon sx={{color: 'lightgrey', cursor: 'pointer'}} onClick={() => withLoading(() => updateSavedAdjustment(), value)  }  /> : null}

      { isLoading ? <Loading size={20} fill="grey" /> : null}

      { (id && !isLoading ) ? <Trashcan onClick={() =>  withLoading(() => deleteSavedAdjustment(), value)  } /> : null }

      { (id && !isLoading ) && (initValue !== value) ? <UndoIcon sx={{color: 'lightgrey', cursor: 'pointer'}}  onClick={() => setValue(initValue) } /> : null }
    </Actions>

    </Container>
  )
};
