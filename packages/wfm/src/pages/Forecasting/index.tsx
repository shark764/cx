import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled, { useTheme } from 'styled-components';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { addDays, disableDays } from '@cx/utilities/date';
import { FormDialog } from '@cx/components/FormDialog';
import { DynamicForm } from '@cx/components/DynamicForm';

import BarChart from '@cx/components/Charts/BarChart';
import LineChart from '@cx/components/Charts/LineChart';
import { ForecastingTable } from './Components/table';
import { filters, barChart, lineChart, tableData } from './fakeData';
import { wfm } from '../../api';
import { operations, components } from '@cx/wfmapi/forecast-schema';

import { createForecastFormDefenition } from './forecastFormDefinition';
import { deleteForcastFormDefinition } from './deleteForcastFormDefinition';
import { Filters } from './filters';

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

export function Forecasting() {

  // const theme: any = useTheme();
  // TODO: use selector here to pull these out of state....
  const historicalPathParams: HistoricalPathParams = {
    tenant_id: '00000000-0000-0000-0000-000000000000',
    competency_id: '00000000-0000-0000-0000-000000000000',
  };
  const historicalQueryParams: HistoricalQueryparams = {
    channel: 'voice',
    direction: 'inbound',
    startDateTime: '2021-01-01T00:00:00Z',
    endDateTime: '2021-01-30T00:00:00Z',
  };
  // TODO: ... move these items into the forecast state

  const { data, isLoading, error } = useQuery<HistoricalData, HistoricalApiError>(
    ['historicalData', historicalPathParams, historicalQueryParams],
    () => wfm.forecasting.api.get_tenants_tenant_competencies_competency_historical({
      pathParams: historicalPathParams,
      queryString: historicalQueryParams
    })
    );


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
          <FormDialog open={createNewForecast} title='Create forecast' close={ () => setCreateNewForecast(false)  } >
            <DynamicForm
              defaultValues={{}}
              formDefenition={createForecastFormDefenition}
              onCancel={ () => setCreateNewForecast(false) }
              onSubmit={ (data: any) => { setCreateNewForecast(false); console.log('submission: ', data); } }
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
          <FormDialog open={deleteForecast} title='Delete forecast' close={ () => setDeleteForecast(false)  } >
            <DynamicForm
              defaultValues={{}}
              formDefenition={deleteForcastFormDefinition}
              onCancel={ () => setDeleteForecast(false) }
              onSubmit={ (data: any) => { setDeleteForecast(false); console.log('submission: ', data); } }
              isFormSubmitting={false}
            ></DynamicForm>
          </FormDialog>
        </ButtonsWrapper>
      </Actions>

      <ForecastFilters>
        <Filters />
      </ForecastFilters>


      <ChartsWrapper>
        <Title> Forecast </Title>
        <LineChart
          chartName="staffingEstimate"
          data={lineChart[viewBy].data}
          interval={viewBy === 'day' ? 2 : 0}
          xDataKey={lineChart[viewBy].xDataKey}
          dataKeys={lineChart[viewBy].dataKeys}
        />
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
        <ForecastingTable tableData={tableData[viewBy]} />
      </TableWrapper>
    </>
  )
};
