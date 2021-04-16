import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from 'react-query';
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
import { BarChart } from '@cx/components/Charts/BarChart';
import { LineChart } from '@cx/components/Charts/LineChart';
import { Loading } from '@cx/components/Icons/Loading';

import { CreateUUID } from '@cx/utilities/uuid';

import { DateTime } from 'luxon';
import {
  createForecastApi,
  deleteForecastScenario,
  createNewTimelineApi,
  fetchForecastScenarios
} from '../../redux/thunks';

import { filters, barChart, tableData } from './fakeData';
import { wfm } from '../../api';
import { createForecastFormDefenition } from './forecastFormDefinition';
import { deleteForcastFormDefinition } from './deleteForcastFormDefinition';
import { createTimelineFormDefenition } from './newTimelineFormDefenition';
import { Filters } from './filters';

import { forecasting } from '../../redux/reducers/forecasting';

import { operations, components } from '@cx/wfmapi/forecast-schema';
const {
  setStartDate,
  setEndDate
} = forecasting.actions;
type HistoricalData = components["schemas"]["HistoricalDataDTO"];
type HistoricalPathParams = operations["get_tenants_tenant_competencies_competency_historical"]["parameters"]["path"];
type HistoricalQueryparams = operations["get_tenants_tenant_competencies_competency_historical"]["parameters"]["query"];
type HistoricalApiError = components["schemas"]["HTTPValidationError"];

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

export function Forecasting() {
  const dispatch = useDispatch();

  const [ selectedTimeline, setSelectedTimeline ] = useState<any>();

  const historicalPathParams = useSelector((state: RootState) => state.forecasting.historicalPathParams);
  const historicalQueryParams = useSelector((state: RootState) => state.forecasting.historicalQueryParams);
  const allScenarios = useSelector((state: RootState) => state.forecasting.scenarios);
  const selectedCompetence = useSelector((state: RootState) => state.forecasting.competence);

  const { data: timelines, isLoading: timelinesLoading, error: timelinesError, refetch } = useQuery<any, any>(
    ['timelinesData', historicalPathParams],
    () => wfm.forecasting.api.get_all_tenants_tenant_forecasttimelines({
      pathParams: { tenant_id: historicalPathParams.tenant_id },
    })
  );

  useEffect(() => { // set initial default timeline
    if (timelines?.data) {
      setSelectedTimeline( timelines.data.find(({name}:any) => name === 'notebook_temp') );
    }
  }, [timelines]);

  const { data, isLoading, error } = useQuery<any, any>(
    ['historicalData', historicalPathParams, historicalQueryParams, selectedTimeline],
    () => selectedTimeline && wfm.forecasting.api.timeline_series_queries_tenants_tenant_forecasttimelines_timeline_series_query({
      pathParams: { tenant_id: historicalPathParams.tenant_id, timeline_id: selectedTimeline.id},
      // queryString: historicalQueryParams
      body: {
        startDate: historicalQueryParams.startDateTime,
        endDate: historicalQueryParams.endDateTime,
        interval:
        // "quarter-hour",
        // "hour",
        "day",
        // "week",
        // "month",
        // "year",
        competencyIds: [ // TODO: pull these from main state instead?
          '64e27f30-7dd9-11e7-9441-d379301ec11d', // temp_mock2 supposedly has the most data? It's the Voice queue in stagepool1
          // '65d62e00-7dd9-11e7-9441-d379301ec11d', // temp_mock
          // '66c3e960-7dd9-11e7-9441-d379301ec11d', // temp_mock3
        ],
        channels: ['voice', 'messaging', 'sms', 'email', 'work_item'],
        // directions: ['inbound', 'outbound'],
        directions: ['inbound'],

        // ^^ required
        includeAdjustments: true,
        includeForecast: true,
      }
    },
    {
      refetchOnWindowFocus: false,
      // enabled: false
    })
  );

  React.useEffect(() => {
    if (!selectedTimeline) { return; }
    dispatch(fetchForecastScenarios(selectedTimeline));
  }, [dispatch, selectedTimeline]);

  const memoData = useMemo(() =>
    data
    ?.data
    ?.find(({competency}: any) => competency === '64e27f30-7dd9-11e7-9441-d379301ec11d')
    ?.data
    ?.[0]
    ?.series.map(({ timestamp, nco, aht, abandons }: any) => ({
      timestamp: DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED),
      nco: nco,
      aht: aht,
    })) || [], [data]);

  const memoTimelineOptions = useMemo(() => timelines?.data?.map(({ description, id, name }: any) => ({
    label: name,
    id: id,
  })) || [], [timelines]);

  const memoScenariosOptions = useMemo(() => allScenarios?.map(({ startDate, endDate, forecastScenarioId }: any) => ({
    label: `${startDate} - ${endDate}`,
    startDate,
    endDate,
    id: forecastScenarioId,
  })) || [], [allScenarios]);

  const linechartData = {
    xDataKey: 'timestamp',
    dataKeys: [
      { key: 'nco', lineType: 'monotone', lineStroke: 'dotted', yAxisId: 'left' },
      { key: 'aht', lineType: 'monotone', yAxisId: 'right', name: 'aht' },
    ],
  };

  const [viewBy, setViewBy] = useState('day');

  const [createNewForecast, setCreateNewForecast] = useState(false);
  const [createNewTimeline, setCreateNewTimeline] = useState(false);
  const [deleteForecast, setDeleteForecast] = useState(false);

  const uniqueFormName = CreateUUID();
  const defaultForecastFormValues = {
    name: uniqueFormName,
    description: uniqueFormName,
    algorithm: 'prophet',
    includeDayCurve: true,
    metrics: ['nco', 'tot', 'abandons'],
    algorithmOptions: [
      {option: 'include_history', value: false},
      {option: 'activate_filter', value: false},                              // save default si supposedly true,  but causes issues for now setting to false
      {option: 'distribution_weight', value: 'exponential'},
      {option: 'country_holidays', value: 'US'},
      {option: 'growth', value: '{"method":"linear","floor":20,"cap":"40"}'},
    ],
    scenarioType: 'temporary',
  };

  const showSpecificSenarioRange = (start: string, end: string) => {
    dispatch( setStartDate( start ) );
    dispatch( setEndDate( end ) );
  };

  return (
    <>
      <Actions>
        {timelines && (timelines.data.length === 0) &&
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
        {timelines && (timelines.data.length > 0) &&
          <Autocomplete
            id="choose_timeline"
            options={ memoTimelineOptions }
            getOptionLabel={({label}: any) => label || '' }
            size="small"
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 200, display: 'inline-block' }}
            renderInput={(params: any) => <TextField {...params} label="Timeline" variant="outlined" />}
            value={selectedTimeline}
            onChange={(event: any, newValue: string | null) => {
              setSelectedTimeline(newValue);
            }}
            defaultValue={memoTimelineOptions.find(({label}: any) => label === 'notebook_temp')}
          />
        }
        {allScenarios && (allScenarios.length > 0) &&
          <Autocomplete
            id="choose_scenario"
            options={ memoScenariosOptions }
            getOptionLabel={(option: any) => option.label}
            size="small"
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 275, display: 'inline-block', marginLeft: '20px' }}
            renderInput={(params: any) => <TextField {...params} label="Scenarios" variant="outlined" />}
            onChange={(e, {startDate, endDate}: any) => showSpecificSenarioRange(startDate, endDate)}
          />
        }
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
            style={{ color: 'white', background: '#07487a' }}
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
              onSubmit={(data: any) => { setCreateNewTimeline(false); createNewTimelineApi(data, historicalPathParams.tenant_id, refetch) }}
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
        {isLoading ?
          <LoadingWrapper><div><Loading size={60} /></div></LoadingWrapper> :
          <LineChart
            chartName="forecast"
            data={memoData}
            interval={viewBy === 'day' ? 2 : 0}
            xDataKey={linechartData.xDataKey}
            dataKeys={linechartData.dataKeys}
          />
        }
        <Title> Staffing Estimate Per Channel </Title>
        <BarChart
          chartName="staffingEstimate"
          statName="Staffing Estimate"
          data={barChart[viewBy].data}
          interval={viewBy === 'day' ? 2 : 0}
          stackId={viewBy === 'dateRange' ? 'a' : null}
          xDataKey={barChart[viewBy].xDataKey}
          dataKeys={barChart[viewBy].dataKeys}
        />
      </ChartsWrapper>

      <TableWrapper>
        <Title> Forecast table view </Title>
        <TableFilters>
          <span>
            <Label>Channel</Label>
            <StyledSelect
              className="choose-channel"
              classNamePrefix="select"
              defaultValue={filters.channel[0]}
              name="choose-channel"
              options={filters.channel}
              styles={customStyles}
            />
          </span>
        </TableFilters>
        <div style={{ marginTop: '40px' }}>
          <Table
            themeVariant='forecast'
            columnDefenitions={['col8', 'col9', 'col10', 'col11', 'col12', 'col13', 'col14', 'col15']}
            tableData={tableData[viewBy]}
          />
        </div>
      </TableWrapper>
    </>
  )
};
