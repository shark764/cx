import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { createForecastApi, deleteForecastApi, createNewTimelineApi } from '../../redux/thunks';

import { filters, barChart, tableData } from './fakeData';
import { wfm } from '../../api';
import { createForecastFormDefenition } from './forecastFormDefinition';
import { deleteForcastFormDefinition } from './deleteForcastFormDefinition';
import { createTimelineFormDefenition } from './newTimelineFormDefenition';
import { Filters } from './filters';

import { operations, components } from '@cx/wfmapi/forecast-schema';
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

  const historicalPathParams = useSelector((state: RootState) => state.forecasting.historicalPathParams);
  const historicalQueryParams = useSelector((state: RootState) => state.forecasting.historicalQueryParams);

  // const { data, isLoading, error } = useQuery<any, any>(
  //   ['historicalData', historicalPathParams, historicalQueryParams],
  //   () => wfm.forecasting.api.get_tenants_tenant_competencies_competency_historical({
  //     pathParams: historicalPathParams,
  //     queryString: historicalQueryParams
  //   })
  // );


  /**
   * we will need timelines to be able to get the list of competencies from planning api when its ready TODO:
   */
  const { data: timelines, isLoading: timelinesLoading, error: timelinesError, refetch } = useQuery<any, any>(
    ['timelinesData', historicalPathParams],
    () => wfm.forecasting.api.get_all_tenants_tenant_forecasttimelines({
      pathParams: { tenant_id: historicalPathParams.tenant_id },
    })
  );
  const { data, isLoading, error } = useQuery<any, any>(
    ['historicalData', historicalPathParams, historicalQueryParams, timelines],
    () => wfm.forecasting.api.timeline_series_queries_tenants_tenant_forecasttimelines_timeline_series_query({
      pathParams: { tenant_id: historicalPathParams.tenant_id, timeline_id: timelines.data[0].id },
      // queryString: historicalQueryParams
      body: {
        startDate: '2021-01-01', // .... to come from filter data in state
        endDate: '2021-01-30',
        interval: 'day',
        // "quarter-hour",
        // "hour",
        // "day",
        // "week",
        // "month",
        // "year"  ...interval Types  TODO: maybe make a smart assumption based on start and endDate?
        competencyIds: [
          '67b17db0-7dd9-11e7-9441-d379301ec11d',
          '4ec2baa0-36d5-11ea-b230-ac4e4c12c38d',
          '66c3e960-7dd9-11e7-9441-d379301ec11d',
          'a724e630-07c0-11ea-b0cf-fc8bc1552f59',
          '68c00780-7dd9-11e7-9441-d379301ec11d',
          '65d62e00-7dd9-11e7-9441-d379301ec11d',
          'ca7bf9b0-07bc-11ea-9bbb-c49f4396742b',
          '64e27f30-7dd9-11e7-9441-d379301ec11d',
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
  const { data: timeline, isLoading: timelineLoading, error: timelineError, refetch: refetchTimeline } = useQuery<any, any>(
    ['timelineData', historicalPathParams],
    () => wfm.forecasting.api.get_timeline_tenants_tenant_forecasttimelines_forecast_timeline({
      pathParams: { tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: timelines.data[0].id },
    }),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  const { data: scenarios, isLoading: scenariosLoading, error: scenariosError, refetch: scenariosRefetch } = useQuery<any, any>(
    ['scenariosData', historicalPathParams],
    () => wfm.forecasting.api.get_timeline_scenarios_tenants_tenant_forecasttimelines_forecast_timeline_scenarios({
      pathParams: { tenant_id: historicalPathParams.tenant_id, forecast_timeline_id: timelines.data[0].id },
    }),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  const { data: deleteHistorical, isLoading: deleteHistoricalLoading, error: deleteHistoricalError, refetch: refetchHistorical } = useQuery<any, any>(
    ['scenariosData', historicalPathParams],
    () => wfm.forecasting.api.delete_tenants_tenant_competencies_competency_historical({
      pathParams: { tenant_id: historicalPathParams.tenant_id, competency_id: '' },
    }),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  useEffect(() => {
    if (timelines?.data.length > 0) {
      scenariosRefetch();
      refetchTimeline();
    };
  }, [timelines, scenariosRefetch]);


  const memoData = useMemo(() => data?.data?.series?.map(({ timestamp, nco, aht, abandons }: any) => ({
    timestamp: DateTime.fromISO(timestamp).toLocaleString(DateTime.TIME_24_SIMPLE),
    nco: nco,
    aht: aht,
  })) || [], [data]);

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
    metrics: ['nco', 'aht'],
    algorithmOptions: [],
    scenarioType: 'temporary',
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
            options={timelines.data.map(({ name, id, description }: any) => ({ label: name, id: id }))}
            getOptionLabel={(option: any) => option.label}
            size="small"
            disabled
            style={{ width: 200, display: 'inline-block' }}
            renderInput={(params: any) => <TextField {...params} label="Timeline" variant="outlined" />}
            // TODO: format the options pre render
            defaultValue={timelines.data.map(({ name, id, description }: any) => ({ label: name, id: id }))[0]}
          />
        }
        {scenarios && (scenarios.data.length > 0) &&
          <Autocomplete
            id="choose_timeline"
            options={scenarios.data.map(({ name, id, description }: any) => ({ label: name, id: id }))}
            getOptionLabel={(option: any) => option.label}
            size="small"
            disabled
            style={{ width: 200, display: 'inline-block', marginLeft: '20px' }}
            renderInput={(params: any) => <TextField {...params} label="Scenarios" variant="outlined" />}
            // TODO: format the options pre render
            defaultValue={scenarios.data.map(({ name, id, description }: any) => ({ label: name, id: id }))[0]}
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
              onSubmit={(data: any) => { setCreateNewForecast(false); createForecastApi(data, historicalPathParams.tenant_id, timelines.data[0].id) }}
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
          <FormDialog open={deleteForecast} title='Delete forecast' close={() => setDeleteForecast(false)} >
            <DynamicForm
              defaultValues={{}}
              formDefenition={deleteForcastFormDefinition}
              onCancel={() => setDeleteForecast(false)}
              onSubmit={(data: any) => { setDeleteForecast(false); deleteForecastApi(data) }}
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
