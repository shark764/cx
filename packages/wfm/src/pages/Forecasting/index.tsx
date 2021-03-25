import * as React from 'react';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';
import { Table } from '@cx/components/Table';
import { DateTime } from 'luxon';

import { BarChart } from '@cx/components/Charts/BarChart';
import { LineChart } from '@cx/components/Charts/LineChart';
import { filters, barChart, tableData } from './fakeData';
import { wfm } from '../../api';
import { operations, components } from '@cx/wfmapi/forecast-schema';

import { createForecastFormDefenition } from './forecastFormDefinition';
import { deleteForcastFormDefinition } from './deleteForcastFormDefinition';
import { Filters } from './filters';
import { Loading } from '@cx/components/Icons/Loading';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

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
  grid-template-columns: fit-content(100px) fit-content(100px);
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

  const { data, isLoading, error } = useQuery<any, any>(
    ['historicalData', historicalPathParams, historicalQueryParams],
    () => wfm.forecasting.api.get_tenants_tenant_competencies_competency_historical({
      pathParams: historicalPathParams,
      queryString: historicalQueryParams
    })
  );

  const memoData = useMemo(() => data?.data?.series?.map(({timestamp, nco, aht, abandons}: any) => ({
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
  const [deleteForecast, setDeleteForecast] = useState(false);

  return (
    <>
      <Actions>
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
            style={{ color: 'white', background: '#07487a' }}
            onClick={() => setCreateNewForecast(true)}
            variant="contained"
            disableElevation
            color="primary"
            startIcon={<AddIcon />}
          >
            Create
          </Button>
          <FormDialog open={createNewForecast} title='Create forecast' close={() => setCreateNewForecast(false)} >
            <DynamicForm
              defaultValues={{}}
              formDefenition={createForecastFormDefenition}
              onCancel={() => setCreateNewForecast(false)}
              onSubmit={(data: any) => { setCreateNewForecast(false); console.log('submission: ', data); }}
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
          <FormDialog open={deleteForecast} title='Delete forecast' close={() => setDeleteForecast(false)} >
            <DynamicForm
              defaultValues={{}}
              formDefenition={deleteForcastFormDefinition}
              onCancel={() => setDeleteForecast(false)}
              onSubmit={(data: any) => { setDeleteForecast(false); console.log('submission: ', data); }}
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
        <div style={{marginTop: '40px'}}>
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
