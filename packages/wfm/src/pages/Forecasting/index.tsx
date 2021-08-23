import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import TextField from '@material-ui/core/TextField';
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
import { Ellipsis } from '@cx/components/Icons/Ellipsis';
import { Chevron } from '@cx/components/Icons/Chevron';
import { selectedRangeFn } from '@cx/utilities/date';
import { defaultForecastFormValues } from './forecastFormDefaultValues';
import { AdjustmentPanel } from './adjustmentPanel';
import { AdjustmentsTotal } from './adjustmentsTotal';
import {
  createForecastApi,
  deleteForecastScenario,
  createNewTimelineApi,
  fetchForecastScenarios,
} from '../../redux/thunks';
import { createForecastFormDefenition } from './forecastFormDefinition';
import { deleteForcastFormDefinition } from './deleteForcastFormDefinition';
import { createTimelineFormDefenition } from './newTimelineFormDefenition';
import { InProgress } from './inProgress';
import { Filters } from './filters';
import { forecasting } from '../../redux/reducers/forecasting';
// WFM Api Utilities and Services
import {
  useMemoLineChartData,
  useMemoTableData,
} from './forecastingHooks';
import {
  useTimelineAdjustments
} from './forecastApiQuerys';
import { useTimelineQuery } from '../../api/useTimelineQuery';
import { useTimelines } from '../../api/useTimelines';
import { createAdjustment } from './createAdjustment';
import { updateAdjustment } from './updateAdjustment';
import { SinglePointAdjustment } from './singlePointAdjustment';
import { deleteAdjustment } from './deleteAdjustment';
import { BulkAdjustmentPanel } from './bulkAdjustmentPanel';

const {
  setStartDate,
  setEndDate
} = forecasting.actions;

const ToggleView = styled(Chevron)`
  vertical-align: text-top;
  margin-left: 20px;
`;

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
  const channels = useSelector((state: RootState) => state.main.channels);

  // Local State
  const [selectedTimeline, setSelectedTimeline] = useState<any>();
  const [selectedScenario, setSelectedScenario] = useState<any>();
  const [createNewForecast, setCreateNewForecast] = useState(false);
  const [createNewTimeline, setCreateNewTimeline] = useState(false);
  const [showBulkAdjustments, setShowBulkAdjustments] = useState(false);
  const [deleteForecast, setDeleteForecast] = useState(false);
  const [singlePointAdjustment, setSinglePointAdjustment] = useState(true);
  const [latestAdjustmentId, setLatestAdjustmentId] = useState('');
  const [localBulkAdjustments, setLocalBulkAdjustemnts] = useState<any>([{}]);

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
    isFetching: timelinesIsFetching,
    refetch: refetchTimelines
  } = useTimelines(tenant_id);

  const {
    data: timelineQuery = [],
    isLoading: timelineQueryLoading,
    refetch: refetchTimeline,
    isFetching: timelineIsFetching,
  } = useTimelineQuery(tenant_id, historicalQueryParams, selectedTimeline, selectedCompetence, viewBy, channels);
  const {
    data: timelineAdjustments = [],
    refetch: refetchAdjustments,
  } = useTimelineAdjustments(tenant_id, historicalQueryParams, selectedTimeline?.id);

  const timelineQueryData = useMemoLineChartData(timelineQuery, intervalLength, selectedCompetence);
  const timelineQueryTableData = useMemoTableData(
    timelineQuery,
    viewBy,
    selectedCompetence,
    channels[0],
    timelineAdjustments,
    tenant_id,
    selectedTimeline?.id,
    setLatestAdjustmentId
  );

  const memoScenariosOptions = useMemo(() => allScenarios?.map(({ startDate, endDate, forecastScenarioId }: any) => ({
    label: `${startDate} - ${endDate}`,
    startDate,
    endDate,
    id: forecastScenarioId,
  })).sort(({startDate:a},{startDate:b}) =>
    a > b ? -1 : a < b ? 1 : 0
  ) || [], [allScenarios]);
  const linechartConfig = {
    xDataKey: 'timestamp',
    dataKeys: [
      { key: 'ncoVoice', lineType: 'monotone', yAxisId: 'left', name: 'NCO Voice', color: '#2a2af0', channelTag: 'voice' },
      { key: 'adjustedNcoVoice', lineType: 'monotone', yAxisId: 'left', name: 'Adjusted NCO Voice', lineStroke: 'dotted', color: '#2a2af0', channelTag: 'voice' },
      { key: 'ahtVoice', lineType: 'monotone', yAxisId: 'right', name: 'AHT Voice', color: 'lightgrey', channelTag: 'voice' },
      { key: 'adjustedAhtVoice', lineType: 'monotone', yAxisId: 'right', name: 'Adjusted AHT Voice', lineStroke: 'dotted', color: 'lightgrey', channelTag: 'voice' },

      { key: 'ncoSms', lineType: 'monotone', yAxisId: 'left', name: 'NCO SMS', color: '#9dd766', channelTag: 'sms' },
      { key: 'adjustedNcoSms', lineType: 'monotone', yAxisId: 'left', name: 'Adjusted NCO SMS', lineStroke: 'dotted', color: '#9dd766', channelTag: 'sms' },
      { key: 'ahtSms', lineType: 'monotone', yAxisId: 'right', name: 'AHT SMS', color: 'lightgrey', channelTag: 'sms' },
      { key: 'adjustedAhtSms', lineType: 'monotone', yAxisId: 'right', name: 'Adjusted AHT SMS', lineStroke: 'dotted', color: 'lightgrey' , channelTag: 'sms'},

      { key: 'ncoMessaging', lineType: 'monotone', yAxisId: 'left', name: 'NCO Messaging', color: '#ca472f', channelTag: 'messaging' },
      { key: 'adjustedNcoMessaging', lineType: 'monotone', yAxisId: 'left', name: 'Adjusted NCO Messaging', lineStroke: 'dotted', color: '#ca472f', channelTag: 'messaging' },
      { key: 'ahtMessaging', lineType: 'monotone', yAxisId: 'right', name: 'AHT Messaging', color: 'lightgrey' , channelTag: 'messaging'},
      { key: 'adjustedAhtMessaging', lineType: 'monotone', yAxisId: 'right', name: 'Adjusted AHT Messaging', lineStroke: 'dotted', color: 'lightgrey', channelTag: 'messaging' },

      { key: 'ncoEmail', lineType: 'monotone', yAxisId: 'left', name: 'NCO Email', color: '#f6c85f', channelTag: 'email' },
      { key: 'adjustedNcoEmail', lineType: 'monotone', yAxisId: 'left', name: 'Adjusted NCO Email', lineStroke: 'dotted', color: '#f6c85f', channelTag: 'email' },
      { key: 'ahtEmail', lineType: 'monotone', yAxisId: 'right', name: 'AHT Email', color: 'lightgrey', channelTag: 'email' },
      { key: 'adjustedAhtEmail', lineType: 'monotone', yAxisId: 'right', name: 'Adjusted AHT Email', lineStroke: 'dotted', color: 'lightgrey', channelTag: 'email' },

      { key: 'ncoWorkItem', lineType: 'monotone', yAxisId: 'left', name: 'NCO Work Item', color: '#6f4e7c' , channelTag: 'work-item'},
      { key: 'adjustedNcoWorkItem', lineType: 'monotone', yAxisId: 'left', name: 'Adjusted NCO Work Item', lineStroke: 'dotted', color: '#6f4e7c', channelTag: 'work-item' },
      { key: 'ahtWorkItem', lineType: 'monotone', yAxisId: 'right', name: 'AHT Work Item', color: 'lightgrey', channelTag: 'work-item'},
      { key: 'adjustedAhtWorkItem', lineType: 'monotone', yAxisId: 'right', name: 'Adjusted AHT Work Item', lineStroke: 'dotted', color: 'lightgrey', channelTag: 'work-item' },
    ].filter(({channelTag}) => channels.includes(channelTag)),
  };

  const multipleChannelsSelected = channels.length !== 1;

  const memoDataKeys = useMemo(() => {
    if(multipleChannelsSelected) {
      return linechartConfig.dataKeys.filter(({name}) => !name.includes('AHT') );
    } else {
      return linechartConfig.dataKeys;
    }
  }, [linechartConfig.dataKeys, multipleChannelsSelected]);

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

  useEffect(() => {
    refetchAdjustments();
    refetchTimeline();
  }, [latestAdjustmentId, refetchAdjustments, refetchTimeline]);

  const setLocalAdjustment = (value: number, key: string, timestamp: string) => {
    const keyConversion = (key: string) => key?.toLowerCase().includes('aht') ? 'aht' : 'nco';

    createAdjustment(
      tenant_id,
      selectedTimeline?.id,
      viewBy,
      selectedCompetence,
    )({
      timestamp: timestamp,
      value: value,
      metric: keyConversion(key),
      channel: channels[0]
    })
      // @ts-ignore
      .then(() => {
        refetchTimeline();
        refetchAdjustments();
      });
  };
  const setLocalBulkAdjustment = (data: any) => {

    const channelType = data?.[0].key
    setShowBulkAdjustments(true);

    const parseAndSort = (key: any) =>
      data.filter((adjustment: any) => adjustment.key === key)
        .sort((a: any, b: any) => a.timestamp - b.timestamp);

    const firstAndLast = (array: any) => ({ start: array[0], end: array.pop() });

    const adjusted = firstAndLast(parseAndSort(channelType));

    setLocalBulkAdjustemnts({ [channelType]: adjusted});
  };

  const scenariosValidation = (memoScenariosOptions: any) => (data: any) => {

    const { startDate, endDate } = data?.forecastRange[0];
    return memoScenariosOptions.map(({startDate: start_date, endDate: end_date}: any) => {
      const start = DateTime.fromISO(start_date);
      const end = DateTime.fromISO(end_date);
      const doesOverlap = (startDate <= end) && (endDate >= start);
      return doesOverlap? `Chosen date range overlaps with an existing forecasted range ${start_date}-${end_date}` : null
    }).filter(Boolean);

  };


  return (<>
    <Actions>
      {(timelines?.length === 0) && !timelinesIsFetching &&
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
          disableClearable
          onChange={(event: any, newValue: string | null) => setSelectedTimeline(newValue)}
        />
      }
      {(allScenarios?.length > 0) &&
        <Autocomplete
          id="choose_scenario"
          options={memoScenariosOptions}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          size="small"
          sx={{ width: 250, display: 'inline-block', marginLeft: '20px' }}
          renderInput={(params: any) => <TextField {...params} label="Forecasted Ranges" variant="outlined" />}
          value={selectedScenario}
          autoSelect
          disableClearable
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
            onSubmit={(data: any) => { setCreateNewTimeline(false); createNewTimelineApi(data, tenant_id, refetchTimelines) }}
            isFormSubmitting={false}
          ></DynamicForm>
        </FormDialog>
        <FormDialog open={createNewForecast} title='Create Forecast Scenario' close={() => setCreateNewForecast(false)} >
          <DynamicForm
            defaultValues={defaultForecastFormValues(memoScenariosOptions)}
            formDefenition={createForecastFormDefenition}
            onCancel={() => setCreateNewForecast(false)}
            onSubmit={(data: any) => { setCreateNewForecast(false); createForecastApi(data, tenant_id, selectedTimeline.id) }}
            externalFormError={ scenariosValidation(memoScenariosOptions) }
            isFormSubmitting={false}
          ></DynamicForm>
        </FormDialog>
        <FormDialog open={deleteForecast} title='Delete forecast' close={() => setDeleteForecast(false)} >
          <DynamicForm
            defaultValues={{}}
            formDefenition={deleteForcastFormDefinition}
            externalFormError={ () => [] }
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
        <Title> Forecasted Interaction Volume  {timelineIsFetching ? <span style={{ marginLeft: '15px' }} ><Ellipsis animated={true} /></span> : null} </Title>
        { !multipleChannelsSelected && <SinglePointAdjustment singlePointAdjustment={singlePointAdjustment} setSinglePointAdjustment={setSinglePointAdjustment} />}
      </ForecastGraphHeader>
      {timelineQueryLoading ?
        <LoadingWrapper><div><Loading size={60} /></div></LoadingWrapper> :
        <LineChart
          chartName="forecast"
          intervalLength={intervalLength}
          data={timelineQueryData}
          xDataKey={linechartConfig.xDataKey}
          dataKeys={memoDataKeys}
          adjustemntCallback={setLocalAdjustment}
          bulkAdjustemntCallback={setLocalBulkAdjustment}
          singlePointAdjustment={singlePointAdjustment}
          multipleChannelsSelected={multipleChannelsSelected}
        />
      }

      { !multipleChannelsSelected && <Title> Forecasted Adjustments <AdjustmentsTotal adjustments={timelineAdjustments} /> <ToggleView size={16} rotate={showBulkAdjustments ? -90 : 90} onClick={() => setShowBulkAdjustments(!showBulkAdjustments)} /> </Title>}
      {showBulkAdjustments && !multipleChannelsSelected && <BulkAdjustmentPanel crud={{
        create: createAdjustment(
          tenant_id,
          selectedTimeline?.id,
          viewBy,
          selectedCompetence,
        ),
        delete: deleteAdjustment(
          tenant_id,
          selectedTimeline?.id,
        ),
        update: updateAdjustment(
          tenant_id,
          selectedTimeline?.id,
          viewBy,
          selectedCompetence,
        ),
        refresh: setLatestAdjustmentId
      }}
        adjustments={timelineAdjustments}
        localBulkAdjustments={localBulkAdjustments}
        intervalLength={viewBy}
        refetchTimeline={refetchTimeline}
        timelineIsFetching={timelineIsFetching}
        selectedChannels={channels}
      />}
    </ChartsWrapper>

    { (intervalLength !== 'range') && <ChartsWrapper>
      <Title> Staffing Estimate Per Channel </Title>
      <BarChart
        chartName="staffingEstimate"
        statName="Staffing Estimate"
        data={timelineQueryData}
        stackId={'a'}
        xDataKey={'timestamp'}
        dataKeys={
          [
            {channelTag: 'voice', key: 'staffingEstimateVoice', name: 'Voice', color: '#2a2af0'},
            {channelTag: 'sms', key: 'staffingEstimateSms', name: 'SMS', color: '#9dd766'},
            {channelTag: 'messaging', key: 'staffingEstimateMessaging', name: 'Messaging', color: '#ca472f'},
            {channelTag: 'email', key: 'staffingEstimateEmail', name: 'Email', color: '#f6c85f'},
            {channelTag: 'work-item', key: 'staffingEstimateWork-item', name: 'Work-Item', color: '#6f4e7c'},
          ].filter(({channelTag}) => channels.includes(channelTag))
        }
        intervalLength={intervalLength}
      />
    </ChartsWrapper>}

    { !multipleChannelsSelected && <TableWrapper>
      <Title> Forecast table view </Title>

      <TableSpacer>
        <Table
          themeVariant='forecast'
          columnDefinitions={['timestamp', 'nco', 'adjustedNco', 'speculatedNco', 'aht', 'adjustedAht', 'speculatedAht']}
          tableData={timelineQueryTableData}
          viewMode={viewBy}
          rowComponent={AdjustmentPanel}
        />
      </TableSpacer>
    </TableWrapper>}

    {/* <Button
      style={{ color: '#4c4a4a', marginTop: '50px' }}
      variant="outlined"
      onClick={() => {
        timelineAdjustments.forEach(({ id }: any) => {
          deleteAdjustment(
            tenant_id,
            selectedTimeline?.id,
          )({ adjustment_id: id })
        });
      }}
      startIcon={<DeleteIcon />}
    >
      Reset Adjustments
    </Button> */}

  </>)
};
