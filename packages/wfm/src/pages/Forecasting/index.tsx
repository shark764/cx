import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/core/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';
import { Table } from '@cx/components/Table';
import { BarChart } from '@cx/components/Charts/BarChart';
import { LineChart } from '@cx/components/Charts/LineChart';
import { Loading } from '@cx/components/Icons/Loading';
import { selectedRangeFn } from '@cx/utilities/date';
import { BulkAdjustment } from './bulkAdjustment';

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
  useMemoTableData,
  useMemoStaffingData,
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
import { SinglePointAdjustment } from './singlePointAdjustment';
import { deleteAdjustment } from './deleteAdjustment';

const {
  setStartDate,
  setEndDate
} = forecasting.actions;

type ConversionMap = {[key: string]: any};

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
const LoadingWrapper = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TableSpacer = styled.div`
  margin-top: 40px;
`;
const ForecastGraphHeader = styled.span`
  display: flex;
  justify-content: space-between;
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
  const [singlePointAdjustment, setSinglePointAdjustment] = useState(false);
  // const [localAdjustedData, setLocalAdjustedData] = useState([]);
  const [localAdjustments, setLocalAdjustemnts] = useState({});
  const [localBulkAdjustments, setLocalBulkAdjustemnts] = useState<any>(null);

  const intervalLength = selectedRangeFn(historicalQueryParams.startDateTime, historicalQueryParams.endDateTime);

  const viewBy: any = {
      day: 'quarter-hour',
      twoDays: 'hour',
      week: 'hour',
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
    refetch: refetchTimeline,
    isFetching: timelineIsFetching,
  } = useTimelineQuery(tenant_id, historicalQueryParams, selectedTimeline, selectedCompetence, viewBy);
  const {
    data: timelineAdjustments = [],
    // isLoading: timelineAdjustmentsLoading,
    // error: timelineQueryError
    refetch: refetchAdjustments,
  } = useTimelineAdjustments(tenant_id, historicalQueryParams, selectedTimeline,  viewBy);

  const timelineQueryData = useMemoLineChartData(timelineQuery, intervalLength, selectedCompetence, localAdjustments, timelineAdjustments);
  const timelineQueryTableData = useMemoTableData(timelineQuery, viewBy, selectedCompetence, localAdjustments, timelineAdjustments, tenant_id, selectedTimeline?.id);
  const timelineQueryStaffingEstimate = useMemoStaffingData(timelineQuery, intervalLength, selectedCompetence);


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
    const keyConversion: ConversionMap = {
      'adjustedNco': 'nco',
      'adjustedAht': 'aht',
    };
    createAdjustment(
      tenant_id,
      selectedTimeline?.id,
      viewBy,
      selectedCompetence,
    )({
      timestamp: timestamp,
      value: value,
      metric: keyConversion[key],
    })
    // @ts-ignore
    .then(() => {
      refetchAdjustments();
    });
  };
  const setLocalBulkAdjustment = (data: any) => {
    const parseAndSort = (key: any) =>
      data.filter((adjustment: any) => adjustment.key === key )
      .sort((a: any,b: any) => a.timestamp - b.timestamp);
    const firstAndLast = (array: any) => ({start: array[0], end: array.pop()});

    const adjustedNco = firstAndLast(parseAndSort('adjustedNco'));
    const adjustedAht = firstAndLast(parseAndSort('adjustedAht'));

    setLocalBulkAdjustemnts({adjustedNco,adjustedAht});
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
            size="small"
            sx={{ width: 250, display: 'inline-block' }}
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
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size="small"
            sx={{ width: 250, display: 'inline-block', marginLeft: '20px' }}
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
        <ForecastGraphHeader>
          <Title> Forecasted Interaction Volume </Title>
          <SinglePointAdjustment singlePointAdjustment={singlePointAdjustment} setSinglePointAdjustment={setSinglePointAdjustment} />
        </ForecastGraphHeader>
        {timelineQueryLoading ?
          <LoadingWrapper><div><Loading size={60} /></div></LoadingWrapper> :
          <LineChart
            chartName="forecast"
            intervalLength={intervalLength}
            data={timelineQueryData}
            xDataKey={linechartConfig.xDataKey}
            dataKeys={linechartConfig.dataKeys}
            adjustemntCallback={setLocalAdjustment}
            bulkAdjustemntCallback={setLocalBulkAdjustment}
            singlePointAdjustment={singlePointAdjustment}
          />
        }
        {localBulkAdjustments?.adjustedNco?.start?.timestamp &&
          <BulkAdjustment
            adjustmentKey="nco"
            adjustment={localBulkAdjustments?.adjustedNco}
            refetchTimeline={refetchTimeline}
            timelineIsFetching={timelineIsFetching}
            intervalLength={viewBy}
            crud={
              {
                create: createAdjustment(
                  tenant_id,
                  selectedTimeline?.id,
                  viewBy,
                  selectedCompetence,
                ),
                delete: deleteAdjustment(
                  tenant_id,
                  selectedTimeline?.id,
                )
              }
            }
          />
        }
        {localBulkAdjustments?.adjustedAht?.start?.timestamp &&
          <BulkAdjustment
            adjustmentKey="aht"
            adjustment={localBulkAdjustments?.adjustedAht}
            refetchTimeline={refetchTimeline}
            timelineIsFetching={timelineIsFetching}
            intervalLength={viewBy}
            crud={
              {
                create: createAdjustment(
                  tenant_id,
                  selectedTimeline?.id,
                  viewBy,
                  selectedCompetence,
                ),
                delete: deleteAdjustment(
                  tenant_id,
                  selectedTimeline?.id,
                )
              }
            }
          />
        }
      </ChartsWrapper>

      <ChartsWrapper>
        <Title> Staffing Estimate Per Channel </Title>
        <BarChart
          chartName="staffingEstimate"
          statName="Staffing Estimate"
          data={timelineQueryStaffingEstimate}
          stackId={viewBy === 'dateRange' ? 'a' : null}
          xDataKey={'timestamp'}
          dataKeys={['staffing_estimate']}
          intervalLength={intervalLength}
        />
      </ChartsWrapper>

      <TableWrapper>
        <Title> Forecast table view </Title>

        <TableSpacer>
          <Table
            themeVariant='forecast'
            columnDefenitions={['timestamp', 'nco', 'adjustedNco', 'speculatedNco', 'aht', 'adjustedAht', 'speculatedAht']}
            tableData={timelineQueryTableData}
            viewMode={viewBy}
            adjustmentCellMethod={
              {
                create: createAdjustment(
                  tenant_id,
                  selectedTimeline?.id,
                  viewBy,
                  selectedCompetence,
                ),
                delete: deleteAdjustment(
                  tenant_id,
                  selectedTimeline?.id,
                )
              }
            }
            rowComponent={AdjustmentPanel}
          />
        </TableSpacer>
      </TableWrapper>

      <Button
        style={{ color: '#4c4a4a', marginTop: '50px' }}
        variant="outlined"
        onClick={() => {
          timelineAdjustments.forEach(({id}: any) => {
            deleteAdjustment(
              tenant_id,
              selectedTimeline?.id,
            )({adjustment_id: id })
          });
        }}
        startIcon={<DeleteIcon />}
      >
        Reset Adjustments
      </Button>

    </>)
};
