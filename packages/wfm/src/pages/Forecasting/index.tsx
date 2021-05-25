import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

import { AdjustmentPanel } from './adjustmentPanel';

import {
  createForecastApi,
  deleteForecastScenario,
  createNewTimelineApi,
  fetchForecastScenarios,
  // competence
} from '../../redux/thunks';

import {
  // filters,
  // tableData
} from './fakeData';
import { createForecastFormDefenition } from './forecastFormDefinition';
import { deleteForcastFormDefinition } from './deleteForcastFormDefinition';
import { createTimelineFormDefenition } from './newTimelineFormDefenition';
import { InProgress } from './inProgress';
import { Filters } from './filters';

import { forecasting } from '../../redux/reducers/forecasting';

// WFM Api Utilities and Services
import {
  useMemoLineChartData,
  // useMemoTimelineAdjustments,
  useMemoTableData
} from './forecastingHooks';
import {
  // useTimelineAdjustments,
  // createAdjustment,
  // useUpdateAdjustment,
  // useDeleteAdjustment,
  useTimelineAdjustments
} from './forecastApiQuerys';
import { useTimelineQuery } from '../../api/useTimelineQuery';
import { useTimelines } from '../../api/useTimelines';
import { createAdjustment } from './createAdjustment';

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
const ForecastFilters = styled.section`
  margin-top: 30px;
`;
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
  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  const historicalQueryParams = useSelector((state: RootState) => state.forecasting.historicalQueryParams);
  const allScenarios = useSelector((state: RootState) => state.forecasting.scenarios);
  const selectedCompetence = useSelector((state: RootState) => state.forecasting.competence);

  // Local State
  const [selectedTimeline, setSelectedTimeline] = useState<any>();
  const [selectedScenario, setSelectedScenario] = useState<any>();
  const [createNewForecast, setCreateNewForecast] = useState(false);
  const [createNewTimeline, setCreateNewTimeline] = useState(false);
  const [deleteForecast, setDeleteForecast] = useState(false);
  // const [localAdjustedData, setLocalAdjustedData] = useState([]);
  const [localAdjustments, setLocalAdjustemnts] = useState({});

  const intervalLength = selectedRangeFn(historicalQueryParams.startDateTime, historicalQueryParams.endDateTime);

  // @ts-ignore
  const viewBy: any = {
      day: 'hour',
      twoDays: 'hour',
      week: 'hour', //'week' = Disallowed interval?
      range: 'day'
    }[intervalLength] || 'day';


  // React Queries
  const {
    data: timelines = [],
    // isLoading: timelinesLoading,
    // error: timelinesError
  } = useTimelines(tenant_id);

  const {
    data: timelineQuery = [],
    isLoading: timelineQueryLoading,
    // error: timelineQueryError
  } = useTimelineQuery(tenant_id, historicalQueryParams, selectedTimeline, selectedCompetence, viewBy);

  const {
    data: timelineAdjustments = [],
    // isLoading: timelineAdjustmentsLoading,
    // error: timelineQueryError
  } = useTimelineAdjustments(tenant_id, historicalQueryParams, selectedTimeline,  viewBy);

  const timelineQueryData = useMemoLineChartData(timelineQuery, intervalLength, selectedCompetence, localAdjustments, timelineAdjustments);
  const timelineQueryTableData = useMemoTableData(timelineQuery, intervalLength, selectedCompetence, localAdjustments, timelineAdjustments);


  const memoScenariosOptions = useMemo(() => allScenarios?.map(({ startDate, endDate, forecastScenarioId }: any) => ({
    label: `${startDate} - ${endDate}`,
    startDate,
    endDate,
    id: forecastScenarioId,
  })) || [], [allScenarios]);


  const linechartConfig = {
    xDataKey: 'timestamp',
    dataKeys: [
      { key: 'nco', lineType: 'monotone', yAxisId: 'left', name: 'NCO', color: '#07487a' },
      { key: 'adjustedNco', lineType: 'monotone', yAxisId: 'left', name: 'Adjusted NCO', lineStroke: 'dotted', color: '#07487a' },

      { key: 'aht', lineType: 'monotone', yAxisId: 'right', name: 'AHT', color: 'lightgrey' },
      { key: 'adjustedAht', lineType: 'monotone', yAxisId: 'right', name: 'Adjusted AHT', lineStroke: 'dotted', color: 'lightgrey' },
    ],
  };


  const showSpecificSenarioRange = (start: string, end: string) => {
    dispatch(setStartDate(start));
    dispatch(setEndDate(end));
  };

  /** Set a default timeline */
  useEffect(() => {
    if (timelines) {
      setSelectedTimeline(timelines[0]);
    }
  }, [timelines]);
  /** New timeline, reset scenario selections */
  useEffect(() => {
    if (selectedTimeline) {
      setSelectedScenario(null);
      dispatch(fetchForecastScenarios(selectedTimeline));
    }
  }, [dispatch, selectedTimeline]);

  const setLocalAdjustment = (value: number, key: string, timestamp: string) => {
    setLocalAdjustemnts({
      ...localAdjustments,
      [key]: {
        // @ts-ignore
        ...localAdjustments[key],
        [timestamp]: value
      }
    });
  };


  return (<>
      <Actions>
        {(timelines?.length === 0) &&
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
        {(timelines?.length > 0) && selectedTimeline &&
          <Autocomplete
            id="choose_timeline"
            options={timelines || []}
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
              onSubmit={(data: any) => { setCreateNewTimeline(false); createNewTimelineApi(data, tenant_id, 'refetch') }}
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
          <FormDialog open={createNewForecast} title='Create Forecast Scenario' close={() => setCreateNewForecast(false)} >
            <DynamicForm
              defaultValues={defaultForecastFormValues()}
              formDefenition={createForecastFormDefenition}
              onCancel={() => setCreateNewForecast(false)}
              onSubmit={(data: any) => { setCreateNewForecast(false); createForecastApi(data, tenant_id, selectedTimeline.id) }}
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
          <FormDialog open={deleteForecast} title='Delete forecast' close={() => setDeleteForecast(false)} >
            <DynamicForm
              defaultValues={{}}
              formDefenition={deleteForcastFormDefinition}
              onCancel={() => setDeleteForecast(false)}
              onSubmit={(data: any) => { setDeleteForecast(false); deleteForecastScenario(data, tenant_id, selectedTimeline.id) }}
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
            xDataKey={linechartConfig.xDataKey}
            dataKeys={linechartConfig.dataKeys}
            adjustemntCallback={setLocalAdjustment}
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
          {/* <span>
            <TextField
              select
              label="Channel"
              // value={filters.channel[0]}
              // onChange={() => { }}
              variant="outlined"
              style={{ width: '180px' }}
            >
              {filters.channel.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </span> */}
        </TableFilters>
        <TableSpacer>
          <Table
            themeVariant='forecast'
            columnDefenitions={['timestamp', 'nco', 'adjustedNco', 'aht', 'adjustedAht']}
            tableData={timelineQueryTableData}
            viewMode={viewBy}
            adjustmentCellMethod={createAdjustment(
              tenant_id,
              selectedTimeline?.id,
              viewBy,
              selectedCompetence,
            )}
            rowComponent={AdjustmentPanel}
          />
        </TableSpacer>
      </TableWrapper>
    </>)
};
