import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
// @ts-ignore
import { DateTime } from 'luxon';
import styled from 'styled-components';
import Select from 'react-select';

import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';
import { Table } from '@cx/components/Table';
// import { BarChart } from '@cx/components/Charts/BarChart';
import { LineChart } from '@cx/components/Charts/LineChart';
import { Loading } from '@cx/components/Icons/Loading';
import { selectedRangeFn } from '@cx/utilities/date';

import { defaultForecastFormValues } from './forecastFormDefaultValues';

import {
  createForecastApi,
  deleteForecastScenario,
  createNewTimelineApi,
  fetchForecastScenarios
} from '../../redux/thunks';

import {
  filters,
  // tableData
} from './fakeData';
import { createForecastFormDefenition } from './forecastFormDefinition';
import { deleteForcastFormDefinition } from './deleteForcastFormDefinition';
import { createTimelineFormDefenition } from './newTimelineFormDefenition';
import { InProgress } from './inProgress';
import { Filters } from './filters';

import { forecasting } from '../../redux/reducers/forecasting';
import {
  useMemoLineChartData,
  useMemoTimelineAdjustments,
  // useMemoTableData
} from './forecastingHooks';

import {
  useTimelines,
  useTimelineQuery,
  useTimelineAdjustments,
  createAdjustment,
  // useUpdateAdjustment,
  // useDeleteAdjustment,
} from './forecastApiQuerys';


const {
  setStartDate,
  setEndDate
} = forecasting.actions;

const Title = styled.h4`
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
`;
const StyledSelect = styled(Select)`
  width: 150px;
  height: 35px;
  border-color: #07487a;
`;
const ForecastFilters = styled.section`
  margin-top: 30px;
`;
const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
    background: 'white',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
};
const ChartsWrapper = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #80808096;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
`;
const TableWrapper = styled.div`
  margin-top: 20px;
  background: white;
  border: 1px solid #80808096;
  padding: 10px;
  border-radius: 5px;
`;
const ButtonsWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: fit-content(100px) fit-content(200px);
  float: right;
`;
const Actions = styled.div`
  position: relative;
  height: 30px;
  width: 100%;
`;
const ProgressIcon = styled.span`
  position: absolute;
  margin-left: 20px;
  top: -4px;
`;
const Label = styled.span`
  font-size: 11px;
  color: grey;
  vertical-align: super;
  margin-left: 10px;
`;
const TableFilters = styled.div`
  padding: 0 10px;
`;
const LoadingWrapper = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TableSpacer = styled.div`
  margin-top: 40px;
`;

export function Forecasting() {
  // Global State
  const dispatch = useDispatch();
  const historicalPathParams = useSelector((state: RootState) => state.forecasting.historicalPathParams);
  const historicalQueryParams = useSelector((state: RootState) => state.forecasting.historicalQueryParams);
  const allScenarios = useSelector((state: RootState) => state.forecasting.scenarios);
  const selectedCompetence = useSelector((state: RootState) => state.forecasting.competence);

  // Local State
  const [selectedTimeline, setSelectedTimeline] = useState<any>();
  const [selectedScenario, setSelectedScenario] = useState<any>();
  const [createNewForecast, setCreateNewForecast] = useState(false);
  const [createNewTimeline, setCreateNewTimeline] = useState(false);
  const [deleteForecast, setDeleteForecast] = useState(false);
  // const [adjustments, setAdjustments] = useState<any>([]);
  // const [adjustment, setAdjustment] = useState<any>({});
  // const [tableData, setTableData] = useState([]);

  const intervalLength = selectedRangeFn(historicalQueryParams.startDateTime, historicalQueryParams.endDateTime);

  const viewBy = {
      day: 'hour',
      twoDays: 'hour',
      week: 'day', //'week' = Disallowed interval?
      range: 'day'
    }[intervalLength] || 'day';


  // React Queries
  const {
    data: timelines,
    // isLoading: timelinesLoading,
    // error: timelinesError
  } = useTimelines(historicalPathParams);

  const {
    data: timelineQuery,
    isLoading: timelineQueryLoading,
    // error: timelineQueryError
  } = useTimelineQuery(historicalPathParams, historicalQueryParams, selectedTimeline, selectedCompetence, viewBy);
  const timelineQueryData = useMemoLineChartData(timelineQuery, viewBy, selectedCompetence);
  // const timelineQueryTableData = useMemoTableData(timelineQuery, viewBy, selectedCompetence);

  const {
    data: timelineAdjustments,
    // isLoading: timelineAdjustmentsLoading,
    // error: timelineAdjustmentsError
  } = useTimelineAdjustments(historicalPathParams, historicalQueryParams, selectedTimeline, viewBy);
  const memoAdjustments = useMemoTimelineAdjustments(timelineAdjustments, selectedCompetence);

  console.log('memoAdjustments', memoAdjustments);

  // const {
  //   data: newDdjustment,
  //   isLoading: newAdjustmentLoading,
  //   error: newAdjustmentError,
  //   refetch: createNewAdjustment,
  // } = useCreateAdjustment(historicalPathParams, viewBy, selectedCompetence);

  const now = DateTime.now();
  const later = now.plus({days: 1});

  const temp = () => {
    console.log('View By, ', viewBy)
    createAdjustment(historicalPathParams, viewBy, selectedCompetence, {
      adjustmentStartDate: now.startOf('hour'),
      adjustmentEndDate: later.endOf('hour'),
      value: 4,
    })
  };

  // TODO: looks like may need to pass in timeline info to get all adjustments stuff???
  // will be able to tell once data comes back on the adjustments section
  // useEffect(() => {
  //   if (allAdjustments?.data) {
  //    // setAdjustments(allAdjustments.data.find(({ name }: any) => name === 'notebook_temp' || "Ruben's"));
  //   }
  // }, [allAdjustments]);



  // TODO: should instead be stored in state this way
  const memoScenariosOptions = useMemo(() => allScenarios?.map(({ startDate, endDate, forecastScenarioId }: any) => ({
    label: `${startDate} - ${endDate}`,
    startDate,
    endDate,
    id: forecastScenarioId,
  })) || [], [allScenarios]);


  // TODO: maybe rename this to lineCHartConfig or something instead
  const linechartData = {
    xDataKey: 'timestamp',
    dataKeys: [
      { key: 'nco', lineType: 'monotone', yAxisId: 'left' },
      { key: 'aht', lineType: 'monotone', yAxisId: 'right', name: 'aht', lineStroke: 'dotted' },
    ],
  };


  const showSpecificSenarioRange = (start: string, end: string) => {
    dispatch(setStartDate(start));
    dispatch(setEndDate(end));
  };

  /** Set a default timeline */
  useEffect(() => {
    if (timelines) {
      setSelectedTimeline(timelines.data[0]);
    }
  }, [timelines]);
  /** New timeline, reset scenario selections */
  useEffect(() => {
    if (selectedTimeline) {
      setSelectedScenario(null);
      dispatch(fetchForecastScenarios(selectedTimeline));
    }
  }, [dispatch, selectedTimeline]);

    // useEffect(() => {
  //   let tableData;
  //   if (memoAdjustments.length > 0) {
  //     tableData = memoData.map((dataRow: any) => {
  //       const recordFound = memoAdjustments.find((memoAdjustment: any) => DateTime.fromISO(memoAdjustment.startDateTime).toMillis() === DateTime.fromISO(dataRow.timestamp).toMillis());
  //       if (recordFound) {
  //         dataRow.adjustment = recordFound.adjustment;
  //         dataRow.adjustmentId = recordFound.id;
  //       }
  //       return dataRow;
  //     });
  //     setTableData(tableData);
  //   } else {
  //     setTableData(memoData);
  //   }
  // }, [viewBy, memoData, memoAdjustments]);

  return (<>
      <Actions>
        {(timelines?.data.length === 0) &&
          <Button
            style={{ color: '#4c4a4a' }}
            onClick={() => setCreateNewTimeline(true)}
            variant="outlined"
            color="primary"
            startIcon={<ScheduleIcon />}
          >
            Create Timeline
          </Button>
        }
        {(timelines?.data.length > 0) && selectedTimeline &&
          <Autocomplete
            id="choose_timeline"
            options={timelines.data}
            getOptionLabel={({ label }: any) => label}
            size="small"
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 200, display: 'inline-block' }}
            renderInput={(params: any) => <TextField {...params} label="Timeline" variant="outlined" />}
            value={selectedTimeline}
            autoSelect
            onChange={(event: any, newValue: string | null) => setSelectedTimeline(newValue) }
          />
        }
        {(allScenarios?.length > 0) &&
          <Autocomplete
            id="choose_scenario"
            options={memoScenariosOptions}
            getOptionLabel={(option: any) => option.label}
            size="small"
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 275, display: 'inline-block', marginLeft: '20px' }}
            renderInput={(params: any) => <TextField {...params} label="Forecasted Range" variant="outlined" />}
            value={selectedScenario}
            autoSelect
            onChange={(e, scenario: any) => {
                showSpecificSenarioRange(scenario.startDate, scenario.endDate);
                setSelectedScenario(scenario);
              }
            }
          />
        }
        <ProgressIcon>
          <InProgress selectedTimeline={selectedTimeline} />
        </ProgressIcon>
        <ButtonsWrapper>
          <Button
            style={{ color: '#4c4a4a' }}
            variant="outlined"
            onClick={() => setDeleteForecast(true)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            className="createForecast"
            onClick={() => setCreateNewForecast(true)}
            variant="contained"
            disableElevation
            color="primary"
            startIcon={<AddIcon />}
          >
            Create Forecast
          </Button>
          <FormDialog open={createNewTimeline} title='Create New Timeline' close={() => setCreateNewTimeline(false)} >
            <DynamicForm
              defaultValues={{}}
              formDefenition={createTimelineFormDefenition}
              onCancel={() => setCreateNewTimeline(false)}
              onSubmit={(data: any) => { setCreateNewTimeline(false); createNewTimelineApi(data, historicalPathParams.tenant_id, 'refetch') }}
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
          <FormDialog open={createNewForecast} title='Create Forecast Scenario' close={() => setCreateNewForecast(false)} >
            <DynamicForm
              defaultValues={defaultForecastFormValues}
              formDefenition={createForecastFormDefenition}
              onCancel={() => setCreateNewForecast(false)}
              onSubmit={(data: any) => { setCreateNewForecast(false); createForecastApi(data, historicalPathParams.tenant_id, selectedTimeline.id) }}
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
          <FormDialog open={deleteForecast} title='Delete forecast' close={() => setDeleteForecast(false)} >
            <DynamicForm
              defaultValues={{}}
              formDefenition={deleteForcastFormDefinition}
              onCancel={() => setDeleteForecast(false)}
              onSubmit={(data: any) => { setDeleteForecast(false); deleteForecastScenario(data, historicalPathParams.tenant_id, selectedTimeline.id) }}
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
        </ButtonsWrapper>
      </Actions>

      <ForecastFilters>
        <Filters />
      </ForecastFilters>


      <ChartsWrapper>
        <Title> Forecasted Interaction Volume </Title>
        {timelineQueryLoading ?
          <LoadingWrapper><div><Loading size={60} /></div></LoadingWrapper> :
          <LineChart
            chartName="forecast"
            intervalLength={intervalLength}
            data={timelineQueryData}
            xDataKey={linechartData.xDataKey}
            dataKeys={linechartData.dataKeys}
          // intervalType={intervalType}
          />
        }
        {/* TODO: api is not ready for staffing estimates just yet */}
        {/* <Title> Staffing Estimate Per Channel </Title>
        <BarChart
          chartName="staffingEstimate"
          statName="Staffing Estimate"
          data={barChart[viewBy].data}
          stackId={viewBy === 'dateRange' ? 'a' : null}
          xDataKey={barChart[viewBy].xDataKey}
          dataKeys={barChart[viewBy].dataKeys}
        /> */}
      </ChartsWrapper>

      <TableWrapper>
        <Title> Forecast table view </Title>
        <TableFilters>
          <span>
            <Label>Channel</Label>
            <StyledSelect
              className="choose-channel"
              classNamePrefix="select"
              value={filters.channel[0]}
              name="choose-channel"
              options={filters.channel}
              styles={customStyles}
              onChange={ () => {} }
            />
          </span>
        </TableFilters>
        <TableSpacer>
          <Table
            themeVariant='forecast'
            columnDefenitions={['timestamp', 'nco', 'adjustment2', 'anco', 'aht', 'adjustment', 'aaht']}
            tableData={[
              {
                timestamp: '7:00 AM',
                nco: '10',
                adjustment2: '20',
                anco: '30',
                aht: '40',
                adjustment: '50',
                aaht: '60',
              },
              {
                timestamp: '8:00 AM',
                nco: '10',
                adjustment2: '20',
                anco: '30',
                aht: '40',
                adjustment: '50',
                aaht: '60',
              },
              {
                timestamp: '9:00 AM',
                nco: '10',
                adjustment2: '20',
                anco: '30',
                aht: '40',
                adjustment: '50',
                aaht: '60',
              },
            ]}
            // tableData={tableData.day}
            viewMode={viewBy}
          />
        </TableSpacer>
      </TableWrapper>
      <button onClick={temp} >Apply adjustment now</button>
    </>)
};
